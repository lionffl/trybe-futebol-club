import { sign, SignOptions } from 'jsonwebtoken';
import { ITeamperformance, IRawTeamperformance } from '../interfaces/Teamperformance';
import { Index } from '../api/types/Index';
import MatchModel from '../database/models/MatchModel';
import { POINTS_PER_DRAW, POINTS_PER_WIN, SECRET } from './constants';

const jwtConfig: SignOptions = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

export function getToken(email: string, id: number) {
  const token = sign({ data: { email, id } }, SECRET, jwtConfig);
  return token;
}

export function convertToBoolean(string: string): boolean {
  if (string === 'true') return true;
  return false;
}

export function getGoalsReport(matches: MatchModel[], team1: Index, team2: Index) {
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

function createLeaderboard(rawLeaderboard: ITeamperformance[]) {
  const leaderboard = rawLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);
  return leaderboard;
}

function sumPerformances(homeTeam: ITeamperformance, awayTeam: ITeamperformance) {
  const performance = { name: homeTeam.name,
    totalPoints: homeTeam.totalPoints + awayTeam.totalPoints,
    totalGames: homeTeam.totalGames + awayTeam.totalGames,
    totalVictories: homeTeam.totalVictories + awayTeam.totalVictories,
    totalDraws: homeTeam.totalDraws + awayTeam.totalDraws,
    totalLosses: homeTeam.totalLosses + awayTeam.totalLosses,
    goalsFavor: homeTeam.goalsFavor + awayTeam.goalsFavor,
    goalsOwn: homeTeam.goalsOwn + awayTeam.goalsOwn,
    goalsBalance: homeTeam.goalsBalance + awayTeam.goalsBalance,
    efficiency: 0,
  };
  performance.efficiency = parseFloat(
    ((performance.totalPoints / (performance.totalGames * 3)) * 100).toFixed(2),
  );
  return performance;
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
  const rawLeaderboard: ITeamperformance[] = [];

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
    rawLeaderboard.push(teamReport);
  });

  const leaderboard = createLeaderboard(rawLeaderboard);
  return leaderboard;
}

export function mergeLeaderboards(hTeamLb: ITeamperformance[], aTeamLb: ITeamperformance[]) {
  const rawLeaderboard: ITeamperformance[] = [];
  for (let i = 0; i < hTeamLb.length; i += 1) {
    for (let j = 0; j < aTeamLb.length; j += 1) {
      const homeTeam = hTeamLb[i];
      const awayTeam = aTeamLb[j];
      if (homeTeam.name === awayTeam.name) {
        const teamPerformance = sumPerformances(homeTeam, awayTeam);
        rawLeaderboard.push(teamPerformance);
      }
    }
  }
  const leaderboard = createLeaderboard(rawLeaderboard);
  return leaderboard;
}
