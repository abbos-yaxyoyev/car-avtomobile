import { Inject, Injectable } from '@nestjs/common';
import { RoleEntity } from '../../core/entities/employee/role/role.entity';
import { PagingDto } from '../../core/validation/dtos/paging.dto';
import { IRoleRepository } from '../../framework/mongodb/repoisitory/Role/interface';

@Injectable()
export class RoleUseCases {

  constructor(
    @Inject('IRoleRepository')
    private _roleRepository: IRoleRepository<RoleEntity>,
  ) { }

  public async createRole(data: RoleEntity): Promise<RoleEntity> {
    try {

      const result = await this._roleRepository.createRole(data);

      return result;

    } catch (error) {
      throw error;
    }
  }


  public async getAllRole(dto: PagingDto): Promise<{ total: number, data: any }> {
    return await this._roleRepository.getRolePaging(dto);
  }


  public async getRoleById(id: string): Promise<RoleEntity> {
    return await this._roleRepository.getRole(id);
  }


  public async updateRole(id: string, data: RoleEntity): Promise<RoleEntity> {
    return await this._roleRepository.updateRole(id, data);
  }


  public async deleteRole(id: string): Promise<string> {
    return await this._roleRepository.markDeleteRole(id);
  }


  public async hasAccess(id: string, access: string): Promise<any> {
    return await this._roleRepository.hasAccess(id, access);
  }

}
