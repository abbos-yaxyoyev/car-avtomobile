import {
  Controller, Get, Param, Query, UseInterceptors
} from '@nestjs/common';
import { CategoryEntity } from '../../../common/core/entities/category/category.entity';
import { CategoryDtoGroup, PagingDto } from '../../../common/core/validation/dtos';
import { MyValidationPipe } from '../../../common/core/validation/validate';
import { ResponseInterceptor } from '../../../common/interceptor/response';
import { CategoryUseCases } from '../../../common/use-case/category/category.use-case';


@Controller('category')
export class CategoryController {

  constructor(private categoryService: CategoryUseCases) { }

  @Get(':id')
  async getCategory(@Param(new MyValidationPipe([CategoryDtoGroup.GET_BY_ID])) data: { _id: string }): Promise<CategoryEntity> {
    return await this.categoryService.getCategoryById(data._id);
  }

  @Get()
  @UseInterceptors(ResponseInterceptor)
  async getAllCategoryPaging(@Query(new MyValidationPipe([CategoryDtoGroup.PAGENATION])) dto: PagingDto): Promise<{ total: number, data: any[] }> {
    dto.limit = 1 * dto.limit;
    dto.page = 1 * dto.page;

    return await this.categoryService.getAllCategory(dto);
  }

}