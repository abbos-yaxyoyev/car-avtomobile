import { CarEntity, CategoryEntity, EmployeeEntity, FileEntity, RoleEntity } from '../entities';
import { IGenericRepository } from './generic.repository.abstract';

export abstract class IDataServices {

  abstract employee: IGenericRepository<EmployeeEntity>;

  abstract car: IGenericRepository<CarEntity>;

  abstract category: IGenericRepository<CategoryEntity>;

  abstract file: IGenericRepository<FileEntity>;

  abstract role: IGenericRepository<RoleEntity>;

}
