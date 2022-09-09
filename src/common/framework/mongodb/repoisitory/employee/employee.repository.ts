import { Types } from 'mongoose';
import { COLLECTIONS } from '../../../../constant/collection';
import { EmployeeException } from '../../../../constant/exceptions';
import { IDataServices } from '../../../../core/abstract/data.servise.abstract';
import { EmployeeEntity } from '../../../../core/entities/employee/employee.entity';
import { PagingDto } from '../../../../core/validation/dtos/paging.dto';
import { IEmployeeRepository } from './interface';

export class EmployeeRepository implements IEmployeeRepository<EmployeeEntity> {

  constructor(private dataServices: IDataServices) {
  }


  public async updateEmployee(id: string, data: EmployeeEntity): Promise<EmployeeEntity> {

    const result = await this.dataServices.employee.updateById(id, data);

    return result;
  }


  public async getEmployeePaging(dto: PagingDto): Promise<{ total: number, data: any }> {
    try {

      const query: any = { isDeleted: false };

      const $lookupRole = {
        $lookup: {
          from: COLLECTIONS.ROLE,
          foreignField: '_id',
          localField: 'roleId',
          as: 'role',
        },
      };

      const $unwindRole = {
        $unwind: {
          path: '$role',
          preserveNullAndEmptyArrays: true,
        },
      };

      const $projection = {
        $project: {
          _id: 1,
          fullName: 1,
          phoneNumber: 1,
          biography: 1,
          isBlock: 1,
          role: {
            _id: 1,
            name: 1,
          },
        },
      };

      const $pipline = [$lookupRole, $unwindRole, $projection];

      return await this.dataServices.employee.findPaging(query, dto, $pipline);

    } catch (error) {
      console.log("error paging admin: ", error);
      throw new Error(error)
    }
  }


  public async getEmployee<t>(id: string): Promise<t> {

    try {

      const $match: any = {
        $match: {
          _id: new Types.ObjectId(id),
          isDeleted: false
        },
      };

      const $lookupRole = {
        $lookup: {
          from: COLLECTIONS.ROLE,
          foreignField: '_id',
          localField: 'roleId',
          as: 'role',
        },
      };

      const $unwindRole = {
        $unwind: {
          path: '$role',
          preserveNullAndEmptyArrays: true,
        },
      };

      const $projection = {
        $project: {
          _id: 1,
          fullName: 1,
          phoneNumber: 1,
          biography: 1,
          isBlock: 1,
          role: {
            _id: 1,
            name: 1,
          },
        },
      };

      const $pipline = [$match, $lookupRole, $unwindRole, $projection];

      const data = (await this.dataServices.employee.aggregate($pipline)).shift();

      if (!data) throw EmployeeException.NotFound(id)

      return data;

    } catch (error) {
      throw EmployeeException.UnknownError(error);
    }
  }


  public async markDeleteEmployee(id: string): Promise<string> {

    await this.dataServices.employee.markDeleted(id);

    return id;

  }

}
