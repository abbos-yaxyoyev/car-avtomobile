import { PagingDto } from "../../../../core/validation/dtos/paging.dto";
import { RoleEntity } from './../../../../core/entities/employee/role/role.entity';


export type Tokens = {
  accessToken: string;
  refreshToken: string;
};


export abstract class IRoleRepository<T> {

  abstract createRole(item: T): Promise<RoleEntity>

  abstract getRolePaging(item: PagingDto): Promise<{ total: number, data: any }>;

  abstract getRole(id: string): Promise<RoleEntity>;

  abstract updateRole(id: string, item: T): Promise<RoleEntity>;

  abstract markDeleteRole(id: string): Promise<string>;

  abstract hasAccess(id: string, access: string): Promise<any>

}
