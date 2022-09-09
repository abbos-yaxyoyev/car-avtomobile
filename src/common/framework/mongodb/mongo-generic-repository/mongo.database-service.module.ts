import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from '../../../../common/core/abstract/data.servise.abstract';
import { ENV } from '../../../config/config';
import { Car, CarSchema } from '../model/car/car.model';
import { Category, CategorySchema } from '../model/category/category.model';
import { Employee, EmployeeSchema } from '../model/employee/employee.model';
import { File, FileSchema } from '../model/file/file.model';
import { Role, RoleSchema } from '../model/role/role.model';
import { MongoDataServices } from './mongo-data-service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: File.name, schema: FileSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Car.name, schema: CarSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    MongooseModule.forRoot(ENV.DB_URL),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule { }