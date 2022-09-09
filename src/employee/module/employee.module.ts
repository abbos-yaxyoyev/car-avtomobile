import { Module } from '@nestjs/common';
import { EmployeeAuthRepository } from '../../common/framework/mongodb/repoisitory/employee/employee.auth.repository';
import { EmployeeRepository } from '../../common/framework/mongodb/repoisitory/employee/employee.repository';
import { IEmployeeAuthRepository, IEmployeeRepository } from '../../common/framework/mongodb/repoisitory/employee/interface';
import { EmployeeUseCases } from '../../common/use-case/employee/employee.use-case';
import { EmployeeController } from '../controller/employee/employee.controller';

@Module({
  controllers: [
    EmployeeController
  ],
  providers: [
    {
      provide: IEmployeeRepository,
      useClass: EmployeeRepository
    },
    {
      provide: IEmployeeAuthRepository,
      useClass: EmployeeAuthRepository
    },
    EmployeeUseCases,
  ],
  exports: [EmployeeUseCases],
})
export class EmployeeModule { }