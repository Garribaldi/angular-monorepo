import { NbaTeam } from "../models/nba-team.model";
import { Employee } from "../models/employee.model";
import { Inventory } from "../models/inventory.model";
import { City } from "../models/city.model";
import { Country } from "../models/country.model";

export const employees: Employee[] = [
  {firstName: 'Employee', lastName: 'One', city: 'Boston'},
  {firstName: 'Employee', lastName: 'Two'},
  {firstName: 'Employee', lastName: 'Three'},
  {firstName: 'Employee', lastName: 'Four'},
  {firstName: 'Employee', lastName: 'Five'}
];
export const inventory: Inventory[] = [
  {plu: 110, supplier: 'W Corp', name: 'Electric plug', inStock: 500, price: 50, currency: 'GBP'},
  {plu: 120, supplier: 'X Corp', name: 'Heated toilet seat', inStock: 2, price: 80, currency: 'EUR'},
  {plu: 120, supplier: 'X Corp', name: 'Heat pump', inStock: 0, price: 10800, currency: 'EUR'},
  {plu: 155, supplier: 'Y Corp', name: 'Golden pencil', inStock: 4, price: 4500, currency: 'AUD'},
  {plu: 165, supplier: 'Z Corp', name: 'iPhone 20', inStock: 0, price: 8000, currency: 'USD'}
];

export const cities: City[] = [
  {name: 'Miami'},
  {name: 'New York'},
  {name: 'Boston'},
  {name: 'Chicago'}
];

export const countries: Country[] = [
  {name: 'Hungary', iso: 'HUN'},
  {name: 'Germany', iso: 'DEU'},
  {name: 'Jamaica', iso: 'JAM'},
  {name: 'Switzerland', iso: 'CHE'},
  {name: 'Korea', iso: 'KOR'},
  {name: 'Greece', iso: 'GRC'},
  {name: 'Croatia', iso: 'HRV'},
  {name: 'Nepal', iso: 'NPL'},
  {name: 'Paraguay', iso: 'PRY'},
  {name: 'Vietnam', iso: 'VNM'},
  {name: 'Sweden', iso: 'SWE'},
  {name: 'United States', iso: 'USA'},
  {name: 'Zambia', iso: 'ZMB'},
  {name: 'Slovenia', iso: 'SVN'},
  {name: 'Thailand', iso: 'THA'},
  {name: 'United Kingdom', iso: 'GBR'},
  {name: 'Serbia', iso: 'SRB'},
  {name: 'Bulgaria', iso: 'BGR'}
];

export const nbaTeams: NbaTeam[] = [
  {
    teamId: 1610612737,
    abbreviation: "ATL",
    teamName: "Atlanta Hawks",
    simpleName: "Hawks",
    location: "Atlanta",
    date: new Date()
  },
  {
    teamId: 1610612738,
    abbreviation: "BOS",
    teamName: "Boston Celtics",
    simpleName: "Celtics",
    location: "Boston",
    date: new Date()
  },
  {
    teamId: 1610612751,
    abbreviation: "BKN",
    teamName: "Brooklyn Nets",
    simpleName: "Nets",
    location: "Brooklyn",
    date: new Date()
  },
  {
    teamId: 1610612766,
    abbreviation: "CHA",
    teamName: "Charlotte Hornets",
    simpleName: "Hornets",
    location: "Charlotte",
    date: new Date()
  },
  {
    teamId: 1610612741,
    abbreviation: "CHI",
    teamName: "Chicago Bulls",
    simpleName: "Bulls",
    location: "Chicago",
    date: new Date()
  },
  {
    teamId: 1610612739,
    abbreviation: "CLE",
    teamName: "Cleveland Cavaliers",
    simpleName: "Cavaliers",
    location: "Cleveland",
    date: new Date()
  },
  {
    teamId: 1610612742,
    abbreviation: "DAL",
    teamName: "Dallas Mavericks",
    simpleName: "Mavericks",
    location: "Dallas",
    date: new Date()
  },
  {
    teamId: 1610612743,
    abbreviation: "DEN",
    teamName: "Denver Nuggets",
    simpleName: "Nuggets",
    location: "Denver",
    date: new Date()
  },
  {
    teamId: 1610612765,
    abbreviation: "DET",
    teamName: "Detroit Pistons",
    simpleName: "Pistons",
    location: "Detroit",
    date: new Date()
  },
  {
    teamId: 1610612744,
    abbreviation: "GSW",
    teamName: "Golden State Warriors",
    simpleName: "Warriors",
    location: "Golden State",
    date: new Date()
  },
  {
    teamId: 1610612745,
    abbreviation: "HOU",
    teamName: "Houston Rockets",
    simpleName: "Rockets",
    location: "Houston",
    date: new Date()
  },
  {
    teamId: 1610612754,
    abbreviation: "IND",
    teamName: "Indiana Pacers",
    simpleName: "Pacers",
    location: "Indiana",
    date: new Date()
  },
  {
    teamId: 1610612746,
    abbreviation: "LAC",
    teamName: "Los Angeles Clippers",
    simpleName: "Clippers",
    location: "Los Angeles",
    date: new Date()
  },
  {
    teamId: 1610612747,
    abbreviation: "LAL",
    teamName: "Los Angeles Lakers",
    simpleName: "Lakers",
    location: "Los Angeles",
    date: new Date()
  },
  {
    teamId: 1610612763,
    abbreviation: "MEM",
    teamName: "Memphis Grizzlies",
    simpleName: "Grizzlies",
    location: "Memphis",
    date: new Date()
  },
  {
    teamId: 1610612748,
    abbreviation: "MIA",
    teamName: "Miami Heat",
    simpleName: "Heat",
    location: "Miami",
    date: new Date()
  },
  {
    teamId: 1610612749,
    abbreviation: "MIL",
    teamName: "Milwaukee Bucks",
    simpleName: "Bucks",
    location: "Milwaukee",
    date: new Date()
  },
  {
    teamId: 1610612750,
    abbreviation: "MIN",
    teamName: "Minnesota Timberwolves",
    simpleName: "Timberwolves",
    location: "Minnesota",
    date: new Date()
  },
  {
    teamId: 1610612740,
    abbreviation: "NOP",
    teamName: "New Orleans Pelicans",
    simpleName: "Pelicans",
    location: "New Orleans",
    date: new Date()
  },
  {
    teamId: 1610612752,
    abbreviation: "NYK",
    teamName: "New York Knicks",
    simpleName: "Knicks",
    location: "New York",
    date: new Date()
  },
  {
    teamId: 1610612760,
    abbreviation: "OKC",
    teamName: "Oklahoma City Thunder",
    simpleName: "Thunder",
    location: "Oklahoma City",
    date: new Date()
  },
  {
    teamId: 1610612753,
    abbreviation: "ORL",
    teamName: "Orlando Magic",
    simpleName: "Magic",
    location: "Orlando",
    date: new Date()
  },
  {
    teamId: 1610612755,
    abbreviation: "PHI",
    teamName: "Philadelphia 76ers",
    simpleName: "76ers",
    location: "Philadelphia",
    date: new Date()
  },
  {
    teamId: 1610612756,
    abbreviation: "PHX",
    teamName: "Phoenix Suns",
    simpleName: "Suns",
    location: "Phoenix",
    date: new Date()
  },
  {
    teamId: 1610612757,
    abbreviation: "POR",
    teamName: "Portland Trail Blazers",
    simpleName: "Trail Blazers",
    location: "Portland",
    date: new Date()
  },
  {
    teamId: 1610612758,
    abbreviation: "SAC",
    teamName: "Sacramento Kings",
    simpleName: "Kings",
    location: "Sacramento",
    date: new Date()
  },
  {
    teamId: 1610612759,
    abbreviation: "SAS",
    teamName: "San Antonio Spurs",
    simpleName: "Spurs",
    location: "San Antonio",
    date: new Date()
  },
  {
    teamId: 1610612761,
    abbreviation: "TOR",
    teamName: "Toronto Raptors",
    simpleName: "Raptors",
    location: "Toronto",
    date: new Date()
  },
  {
    teamId: 1610612762,
    abbreviation: "UTA",
    teamName: "Utah Jazz",
    simpleName: "Jazz",
    location: "Utah",
    date: new Date()
  },
  {
    teamId: 1610612764,
    abbreviation: "WAS",
    teamName: "Washington Wizards",
    simpleName: "Wizards",
    location: "Washington",
    date: new Date()
  }
];
