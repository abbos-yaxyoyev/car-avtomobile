import {
  Body,
  Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors
} from '@nestjs/common';
import { CategoryEntity } from '../../../common/core/entities/category/category.entity';
import { CategoryDto, CategoryDtoGroup, PagingDto } from '../../../common/core/validation/dtos';
import { MyValidationPipe } from '../../../common/core/validation/validate';
import { ResponseInterceptor } from '../../../common/interceptor/response';
import { CategoryUseCases } from '../../../common/use-case/category/category.use-case';


@Controller('category')
export class CategoryController {

  constructor(private categoryService: CategoryUseCases) { }

  // @UseGuards(new ATGuard('name'))
  @Post()
  async createCategory(@Body(new MyValidationPipe([CategoryDtoGroup.CREATE])) data: CategoryDto): Promise<CategoryEntity> {
    return await this.categoryService.createCategory(data);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Get(':id')
  async getCategory(@Param(new MyValidationPipe([CategoryDtoGroup.GET_BY_ID])) data: { _id: string }): Promise<CategoryEntity> {
    return await this.categoryService.getCategoryById(data._id);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Get()
  @UseInterceptors(ResponseInterceptor)
  async getAllCategoryPaging(@Query(new MyValidationPipe([CategoryDtoGroup.PAGENATION])) dto: PagingDto): Promise<{ total: number, data: any[] }> {
    dto.limit = 1 * dto.limit;
    dto.page = 1 * dto.page;

    return await this.categoryService.getAllCategory(dto);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Put()
  async updateCategory(@Body(new MyValidationPipe([CategoryDtoGroup.UPDATE])) data: CategoryDto): Promise<CategoryEntity> {
    return await this.categoryService.updateCategory(data._id, data);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Delete(':id')
  async deleteCategory(@Param(new MyValidationPipe([CategoryDtoGroup.DELETE])) data: { _id: string }): Promise<string> {
    return await this.categoryService.deleteCategory(data._id);
  }

}