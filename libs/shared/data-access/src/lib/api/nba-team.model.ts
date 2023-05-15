export interface NbaTeamDto {
  teamId: number;
  abbreviation: string;
  teamName: string;
  simpleName: string;
  location: string;
  date: string;
}

export interface NbaTeam {
  teamId: number;
  abbreviation: string;
  teamName: string;
  simpleName: string;
  location: string;
  date: Date;
}
