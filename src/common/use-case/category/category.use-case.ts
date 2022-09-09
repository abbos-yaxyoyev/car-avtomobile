
import { Inject, Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../core/entities/category/category.entity';
import { PagingDto } from '../../core/validation/dtos/paging.dto';
import { ICategoryRepository } from '../../framework/mongodb/repoisitory/category/interface';

@Injectable()
export class CategoryUseCases {

  constructor(
    @Inject(ICategoryRepository)
    private _categoryRepository: ICategoryRepository<CategoryEntity>,
  ) { }

  public async createCategory(data: CategoryEntity): Promise<CategoryEntity> {
    try {

      const result = await this._categoryRepository.createCategory(data);

      return result;

    } catch (error) {
      throw error;
    }
  }


  public async getAllCategory(dto: PagingDto): Promise<{ total: number, data: any }> {
    return await this._categoryRepository.getCategoryPaging(dto);
  }


  public async getCategoryById(id: string): Promise<CategoryEntity> {
    return await this._categoryRepository.getCategory(id);
  }


  public async updateCategory(id: string, data: CategoryEntity): Promise<CategoryEntity> {
    return await this._categoryRepository.updateCategory(id, data);
  }


  public async deleteCategory(id: string): Promise<string> {
    return await this._categoryRepository.markDeleteCategory(id);
  }

}
