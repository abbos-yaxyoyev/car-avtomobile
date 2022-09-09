import { EmployeeEntity } from "../../../../core/entities/employee/employee.entity";
import { PagingDto } from "../../../../core/validation/dtos/paging.dto";


export type Tokens = {
  accessToken: string;
  refreshToken: string;
};


export type ILogin = {
  tokens: Tokens,
  employee: {
    _id: string,
    fullName: string,
    phoneNumber: string,
    biography: string,
    birthday: Date,
    createdAt: Date
  }
}


export abstract class IEmployeeAuthRepository<T> {

  abstract createEmployee(item: T): Promise<EmployeeEntity>;

  abstract login(password: string, phoneNumber: string): Promise<ILogin>;

  abstract logout(id: string): Promise<string>;

  abstract refreshToken(id: string, refreshToken: string): Promise<Tokens>;

}


export abstract class IEmployeeRepository<T> {

  abstract getEmployeePaging(item: PagingDto): Promise<{ total: number, data: any }>;

  abstract getEmployee(id: string): Promise<EmployeeEntity>;

  abstract updateEmployee(id: string, item: T): Promise<EmployeeEntity>;

  abstract markDeleteEmployee(id: string): Promise<string>;

}
