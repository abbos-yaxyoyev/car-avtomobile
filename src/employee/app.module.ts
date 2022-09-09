import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataServicesModule } from '../common/framework/mongodb/data-service/data-service.module';
import { ResponseInterceptor } from '../common/interceptor/response';
import { CarModule } from './module/car.module';
import { CategoryModule } from './module/category.module';
import { EmployeeModule } from './module/employee.module';
import { FileModule } from './module/file.module';
import { RoleModule } from './module/role.module';


@Module({
  imports: [

    DataServicesModule,

    EmployeeModule,

    CarModule,

    CategoryModule,

    RoleModule,

    FileModule,

  ],


  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }
  ],


})
export class AppModule { }