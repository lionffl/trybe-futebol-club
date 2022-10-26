import { sign, SignOptions } from 'jsonwebtoken';
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

export function getTotalPointsByTeamId(matches: MatchModel[], id: number, isHome: boolean) {
  if (isHome) {
    const matchesPlayedByTeam = matches.filter((match) => +match.homeTeam === id);
    const wins = matchesPlayedByTeam.filter((match) =>
      match.homeTeamGoals > match.awayTeamGoals);
    const draws = matchesPlayedByTeam.filter((match) =>
      match.homeTeamGoals === match.awayTeamGoals);
    const points = (wins.length * POINTS_PER_WIN) + (draws.length * POINTS_PER_DRAW);
    return points;
  }
  return 'a';
}
