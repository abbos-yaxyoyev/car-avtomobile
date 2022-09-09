import { Types } from 'mongoose';
import { IDataServices } from '../../../../core/abstract/data.servise.abstract';
import { RoleException } from '../../../../core/entities/employee/role/exception';
import { RoleEntity } from '../../../../core/entities/employee/role/role.entity';
import { PagingDto } from '../../../../core/validation/dtos/paging.dto';
import { IRoleRepository } from './interface';

export class RoleRepository implements IRoleRepository<RoleEntity> {

  constructor(private dataServices: IDataServices) {
  }


  public async createRole(data: RoleEntity): Promise<RoleEntity> {

    const result = await this.dataServices.role.insertOne(data);

    return result;

  }


  public async updateRole(id: string, data: RoleEntity): Promise<RoleEntity> {

    const result = await this.dataServices.role.updateById(id, data);

    return result;
  }


  public async getRolePaging(dto: PagingDto): Promise<{ total: number, data: any }> {
    try {

      const query: any = { isDeleted: false };

      const $projection = {
        $project: {
          __v: 0,
          createdBy: 0,
          updatedBy: 0,
          deletedBy: 0
        },
      };

      const $pipline = [$projection];

      return await this.dataServices.role.findPaging(query, dto, $pipline);

    } catch (error) {
      console.log("error paging role: ", error);
      throw new Error(error)
    }
  }


  public async getRole(id: string): Promise<RoleEntity> {

    try {

      const $match: any = {
        $match: {
          _id: new Types.ObjectId(id),
          isDeleted: false
        },
      };


      const $projection = {
        $project: {
          __v: 0,
          createdBy: 0,
          updatedBy: 0,
          deletedBy: 0
        },
      };

      const $pipline = [$match, $projection];

      const data = await this.dataServices.role.aggregate($pipline);

      if (!data || !data[0]) throw RoleException.NotFound(id)

      return data[0];

    } catch (error) {
      throw RoleException.UnknownError(error);
    }
  }


  public async markDeleteRole(id: string): Promise<string> {

    await this.dataServices.role.markDeleted(id);

    return id;

  }

  public async hasAccess(id: string, access: string): Promise<any> {
    console.log("roleId: ", id);
    const role = await this.dataServices.role.findById(id);
    if (!role[access] || role.isDeleted) throw RoleException.NotEnoughPermission({ id, access });
  }


}
