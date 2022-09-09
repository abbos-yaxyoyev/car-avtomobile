import {
  Body,
  Controller, Delete, Get,
  Param, Post, Put, Query, UseInterceptors
} from '@nestjs/common';
import { EmployeeEntity } from '../../../common/core/entities/employee/employee.entity';
import { EmployeeDto, EmployeeDtoGroup, PagingDto } from '../../../common/core/validation/dtos';
import { MyValidationPipe } from '../../../common/core/validation/validate';
import { getCurrentUser } from '../../../common/decorator/getCurrentUser';
import { ILogin, Tokens } from '../../../common/framework/mongodb/repoisitory/employee/interface';
import { ResponseInterceptor } from '../../../common/interceptor/response';
import { EmployeeUseCases } from '../../../common/use-case/employee/employee.use-case';


@Controller('employee')
export class EmployeeController {

  constructor(private employeeService: EmployeeUseCases) { }

  // @UseGuards(new ATGuard('name'))
  @Post()
  async createEmployee(@Body(new MyValidationPipe([EmployeeDtoGroup.CREATE])) data: EmployeeDto): Promise<EmployeeEntity> {
    return await this.employeeService.createEmployee(data);
  }

  @Post('/login')
  async login(@Body(new MyValidationPipe([EmployeeDtoGroup.LOGIN])) data: EmployeeDto): Promise<ILogin> {
    return await this.employeeService.login(data.password, data.phoneNumber);
  }

  /* --- buni to'girlash kerak --- */
  // @UseGuards(RTGuard)
  @Post('/refresh-token')
  async refreshToken(
    @getCurrentUser('id') id: string,
    @getCurrentUser('refresh_token') refresh_token: string,
  ): Promise<Tokens> {
    return await this.employeeService.refreshToken(id, refresh_token);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Post('/logout')
  async logout(@getCurrentUser('_id') id: string,): Promise<string> {
    return await this.employeeService.logout(id);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Get(':id')
  async getEmployee(@Param(new MyValidationPipe([EmployeeDtoGroup.GET_BY_ID])) data: { _id: string }): Promise<EmployeeEntity> {
    return await this.employeeService.getEmployeeById(data._id);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Get()
  @UseInterceptors(ResponseInterceptor)
  async getAllEmployeePaging(@Query(new MyValidationPipe([EmployeeDtoGroup.PAGENATION])) dto: PagingDto): Promise<{ total: number, data: any[] }> {
    dto.limit = 1 * dto.limit;
    dto.page = 1 * dto.page;

    console.log('get paging request');

    return await this.employeeService.getAllEmployee(dto);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Put()
  async updateEmployee(@Body(new MyValidationPipe([EmployeeDtoGroup.UPDATE])) data: EmployeeDto): Promise<EmployeeEntity> {
    return await this.employeeService.updateEmployee(data._id, data);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Put('/accaunt')
  async updateAccount(
    @getCurrentUser('_id') id: string,
    @Body(new MyValidationPipe([EmployeeDtoGroup.UPDATE])) data: EmployeeDto
  ): Promise<EmployeeEntity> {
    return await this.employeeService.updateEmployee(id, data);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Delete()
  async deleteAccaunt(@getCurrentUser('_id') id: string,): Promise<string> {
    return await this.employeeService.deleteEmployee(id);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Delete(':id')
  async deleteEmployee(@Param(new MyValidationPipe([EmployeeDtoGroup.DELETE])) data: { _id: string }): Promise<string> {
    return await this.employeeService.deleteEmployee(data._id);
  }

}