export interface EmployeeDto {
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  city?: string;
  country?: string;
}

export type Employee = EmployeeDto;
