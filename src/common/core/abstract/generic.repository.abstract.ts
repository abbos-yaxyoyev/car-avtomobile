import { QueryOptions } from 'mongoose';
import { PagingDto } from "../validation/dtos";


export abstract class IGenericRepository<T> {

  abstract count(query: any): Promise<number>;

  abstract findPaging(query: any, dto: PagingDto, additional_pipeline?: any, sort?: any,): Promise<{ total: number, data: any }>;

  abstract findOne(query: any, options?: QueryOptions, projection?: any): Promise<T | any>;

  abstract findById(id: string, options?: QueryOptions, projection?: any): Promise<T | any>;

  abstract aggregate(pipeline: Array<any>, options?): Promise<T[] | any[]>;

  abstract insertOne(item: T, options?): Promise<T>;

  abstract insertMany(item: T[]): Promise<{ acknowledged: boolean, insertedIds: any[] }>;

  abstract updateById(id: string, item, options?: QueryOptions): Promise<T | any>;

  abstract updateByQuery(query, item: T, options?: QueryOptions): Promise<T | any>;

  abstract updateMany<t>(query, data, options?: QueryOptions): Promise<t>;

  abstract deleteOne(query, options?: QueryOptions): Promise<any>;

  abstract markDeleted(id: string): Promise<any>;
}
