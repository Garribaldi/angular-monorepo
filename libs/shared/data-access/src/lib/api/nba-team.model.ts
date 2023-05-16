export interface NbaTeamDto {
  teamId: number;
  abbreviation: string;
  teamName: string;
  simpleName: string;
  location: string;
  date: string;
}

export type NbaTeam = Omit<NbaTeamDto, 'date'> & { date: Date };
