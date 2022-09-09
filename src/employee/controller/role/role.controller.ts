import {
  Body,
  Controller, Delete, Get,
  Param, Post, Put, Query, UseInterceptors
} from '@nestjs/common';
import { RoleEntity } from '../../../common/core/entities/employee/role/role.entity';
import { PagingDto, RoleDto, RoleDtoGroup } from '../../../common/core/validation/dtos';
import { MyValidationPipe } from '../../../common/core/validation/validate';
import { ResponseInterceptor } from '../../../common/interceptor/response';
import { RoleUseCases } from '../../../common/use-case/role/role.use-case';


@Controller('role')
export class RoleController {

  constructor(private roleService: RoleUseCases) { }

  // @UseGuards(new ATGuard('name'))
  @Post()
  async createRole(@Body(new MyValidationPipe([RoleDtoGroup.CREATE])) data: RoleDto): Promise<RoleEntity> {
    return await this.roleService.createRole(data);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Get(':id')
  async getRole(@Param(new MyValidationPipe([RoleDtoGroup.GET_BY_ID])) data: { _id: string }): Promise<RoleEntity> {
    return await this.roleService.getRoleById(data._id);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Get()
  @UseInterceptors(ResponseInterceptor)
  async getAllRolePaging(@Query(new MyValidationPipe([RoleDtoGroup.PAGENATION])) dto: PagingDto): Promise<{ total: number, data: any[] }> {
    dto.limit = 1 * dto.limit;
    dto.page = 1 * dto.page;

    console.log('get paging request');

    return await this.roleService.getAllRole(dto);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Put()
  async updateRole(@Body(new MyValidationPipe([RoleDtoGroup.UPDATE])) data: RoleDto): Promise<RoleEntity> {
    return await this.roleService.updateRole(data._id, data);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Delete(':id')
  async deleteRole(@Param(new MyValidationPipe([RoleDtoGroup.DELETE])) data: { _id: string }): Promise<string> {
    return await this.roleService.deleteRole(data._id);
  }

}