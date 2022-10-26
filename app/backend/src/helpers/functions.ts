import { sign, SignOptions } from 'jsonwebtoken';
import { ITeamperformance, IRawTeamperformance } from '../interfaces/Teamperformance';
import { Index } from '../api/types/Index';
import MatchModel from '../database/models/MatchModel';
import { POINTS_PER_DRAW, POINTS_PER_WIN, SECRET } from './constants';

const jwtConfig: SignOptions = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

function getGoalsReport(matches: MatchModel[], team1: Index, team2: Index) {
  const team1Goals: number[] = [];
  const team2Goals: number[] = [];

  matches.forEach((match) => {
    team1Goals.push(match[team1] as unknown as number);
  });

  matches.forEach((match) => {
    team2Goals.push(match[team2] as unknown as number);
  });

  const goalsFavor = team1Goals.reduce((pV, cV) => pV + cV, 0);
  const goalsOwn = team2Goals.reduce((pV, cV) => pV + cV, 0);
  return { goalsFavor, goalsOwn };
}

export function getToken(email: string, id: number) {
  const token = sign({ data: { email, id } }, SECRET, jwtConfig);
  return token;
}

export function convertToBoolean(string: string): boolean {
  if (string === 'true') return true;
  return false;
}

export function getPerformanceByTeamId(matches: MatchModel[], id: number, homeOrAway: string) {
  const index = homeOrAway as Index;
  const team1Goals = `${homeOrAway}Goals` as Index;
  const team2Goals: Index = team1Goals === 'homeTeamGoals' ? 'awayTeamGoals' : 'homeTeamGoals';

  const matchesPlayedByTeam = matches.filter((match) => +match[index] === id);
  const wins = matchesPlayedByTeam.filter((match) =>
    +match[team1Goals] > +match[team2Goals]);
  const draws = matchesPlayedByTeam.filter((match) =>
    +match[team1Goals] === +match[team2Goals]);
  const points = (wins.length * POINTS_PER_WIN) + (draws.length * POINTS_PER_DRAW);

  const goalsReport = getGoalsReport(matchesPlayedByTeam, team1Goals, team2Goals);

  return {
    points, wins: wins.length, draws: draws.length, games: matchesPlayedByTeam.length, goalsReport,
  };
}

export function generateLeaderboard(performanceReport: IRawTeamperformance[]) {
  const leaderboard: ITeamperformance[] = [];

  performanceReport.forEach((report) => {
    const teamReport = {
      name: report.name,
      totalPoints: report.points,
      totalGames: report.games,
      totalVictories: report.wins,
      totalDraws: report.draws,
      totalLosses: report.games - report.wins - report.draws,
      goalsFavor: report.goalsReport.goalsFavor,
      goalsOwn: report.goalsReport.goalsOwn,
      goalsBalance: report.goalsReport.goalsFavor - report.goalsReport.goalsOwn,
      efficiency: parseFloat(((report.points / (report.games * 3)) * 100).toFixed(2)),
    };
    leaderboard.push(teamReport);
  });
  return leaderboard;
}
