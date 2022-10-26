export interface IRawTeamperformance {
  name: string,
  points: number;
  wins: number;
  draws: number;
  games: number;
  goalsReport: {
    goalsFavor: number;
    goalsOwn: number;
  };
}

export interface ITeamperformance {
  name: string,
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}
