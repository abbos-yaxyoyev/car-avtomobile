import { PagingDto } from "../../../../core/validation/dtos/paging.dto";


export abstract class ICategoryRepository<T> {

  abstract createCategory(item: T): Promise<T>

  abstract getCategoryPaging(item: PagingDto): Promise<{ total: number, data: any }>;

  abstract getCategory(id: string): Promise<T>;

  abstract updateCategory(id: string, item: T): Promise<T>;

  abstract markDeleteCategory(id: string): Promise<string>;

}
