import { Module } from '@nestjs/common';
import { CategoryRepository } from '../../common/framework/mongodb/repoisitory/category/category.repository';
import { ICategoryRepository } from '../../common/framework/mongodb/repoisitory/category/interface';
import { CategoryUseCases } from '../../common/use-case/category/category.use-case';
import { CategoryController } from '../controller/category/category.controller';



@Module({
  controllers: [
    CategoryController
  ],
  providers: [
    {
      provide: ICategoryRepository,
      useClass: CategoryRepository
    },
    CategoryUseCases,
  ],
  exports: [CategoryUseCases],
})
export class CategoryModule { }