import { Types } from 'mongoose';
import { IDataServices } from '../../../../core/abstract/data.servise.abstract';
import { CategoryEntity } from '../../../../core/entities/category/category.entity';
import { CategoryException } from '../../../../core/entities/category/exception';
import { PagingDto } from '../../../../core/validation/dtos/paging.dto';
import { ICategoryRepository } from './interface';

export class CategoryRepository implements ICategoryRepository<CategoryEntity> {

  constructor(private dataServices: IDataServices) {
  }


  public async createCategory(data: CategoryEntity): Promise<CategoryEntity> {

    const result = await this.dataServices.category.insertOne(data);

    return result;

  }


  public async updateCategory(id: string, data: CategoryEntity): Promise<CategoryEntity> {

    const query = {
      isDeletd: false,
      _id: id
    }

    const result = await this.dataServices.category.updateByQuery(query, data);

    return result;
  }


  public async getCategoryPaging(dto: PagingDto): Promise<{ total: number, data: any }> {
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

      return await this.dataServices.category.findPaging(query, dto, $pipline);

    } catch (error) {
      console.log("error pagingCategory: ", error);
      throw new Error(error)
    }
  }


  public async getCategory(id: string): Promise<CategoryEntity> {

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

      const data = await this.dataServices.category.aggregate($pipline);

      if (!data || !data[0]) throw CategoryException.NotFound(id)

      return data[0];

    } catch (error) {
      throw CategoryException.UnknownError(error);
    }
  }


  public async markDeleteCategory(id: string): Promise<string> {

    await this.dataServices.category.markDeleted(id);

    return id;

  }

}
