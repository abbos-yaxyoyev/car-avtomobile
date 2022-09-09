import { Injectable } from '@nestjs/common';
import { EmployeeEntity } from '../../core/entities/employee/employee.entity';
import { PagingDto } from '../../core/validation/dtos/paging.dto';
import { IEmployeeAuthRepository, IEmployeeRepository, ILogin, Tokens } from '../../framework/mongodb/repoisitory/employee/interface';

@Injectable()
export class EmployeeUseCases {

  constructor(
    private _employeeRepository: IEmployeeRepository<EmployeeEntity>,
    private _authRepository: IEmployeeAuthRepository<EmployeeEntity>,
  ) { }

  public async createEmployee(data: EmployeeEntity): Promise<EmployeeEntity> {
    try {

      const employee = await this._authRepository.createEmployee(data);

      return employee;

    } catch (error) {
      throw error;
    }
  }


  public async login(password: string, phoneNumber: string): Promise<ILogin> {
    try {

      const employee = await this._authRepository.login(password, phoneNumber);

      return employee;

    } catch (error) {
      throw error;
    }
  }


  public async refreshToken(id: string, refreshToken: string): Promise<Tokens> {
    try {

      const refreshToekn = await this._authRepository.refreshToken(id, refreshToken);

      return refreshToekn;

    } catch (error) {
      throw error;
    }
  }


  public async logout(id: string): Promise<string> {
    try {

      await this._authRepository.logout(id);

      return id;

    } catch (error) {
      throw error;
    }
  }


  public async getAllEmployee(dto: PagingDto): Promise<{ total: number, data: any }> {
    return await this._employeeRepository.getEmployeePaging(dto);
  }

  public async getEmployeeById(id: string): Promise<EmployeeEntity> {
    return await this._employeeRepository.getEmployee(id);
  }

  public async updateEmployee(id: string, data: EmployeeEntity): Promise<EmployeeEntity> {
    return await this._employeeRepository.updateEmployee(id, data);
  }

  public async deleteEmployee(id: string): Promise<string> {
    return await this._employeeRepository.markDeleteEmployee(id);
  }

}
