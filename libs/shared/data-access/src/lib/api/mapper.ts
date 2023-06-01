import { Employee, EmployeeDto } from "./employee.model";
import { NbaTeam, NbaTeamDto } from "./nba-team.model";

export function mapToEmployee(employeeDto: EmployeeDto): Employee {
  return {
    firstName: employeeDto.firstName,
    lastName: employeeDto.lastName,
    email: employeeDto.email ?? undefined,
    password: employeeDto.password ?? undefined,
    city: employeeDto.city ?? undefined,
    country: employeeDto.country ?? undefined
  }
}

export function mapToNbaTeam(team: NbaTeamDto): NbaTeam {
  return {...team, date: new Date(team.date)};
}
