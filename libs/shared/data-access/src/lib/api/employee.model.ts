export interface EmployeeDto {
  firstName: string;
  lastName: string;
  email: string | null;
  password: string | null;
  city: string | null;
  country: string | null;
}

export interface Employee {
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  city?: string;
  country?: string;
}
