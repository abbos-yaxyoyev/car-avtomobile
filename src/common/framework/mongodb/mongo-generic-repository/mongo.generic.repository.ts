import { Injectable } from '@nestjs/common';
import { Model, QueryOptions } from 'mongoose';
import { IGenericRepository } from '../../../core/abstract/generic.repository.abstract';
import { PagingDto } from '../../../core/validation/dtos/paging.dto';


@Injectable()
export class MongoGenericRepository<T> implements IGenericRepository<T>{

  private _repository: Model<T & any>;

  constructor(repository: Model<T & any>) {
    this._repository = repository;
  }

  async count(query: any): Promise<number> {
    try {
      return await this._repository.countDocuments(query);
    } catch (error) {
      throw error;
    }
  }


  async findPaging(
    query: any,
    dto: PagingDto,
    additional_pipeline: any = [
      {
        $project: {
          __v: 0,
        },
      },
    ],
    sort = null,
  ): Promise<{ total: number, data: any }> {
    try {
      const { limit, page, sortBy, asc } = dto;

      const total = await this._repository.countDocuments(query);

      const $match = {
        $match: query,
      };

      const $sort = {
        $sort: {
          createdAt: -1,
        },
      };

      if (sortBy) {
        $sort.$sort = {} as any;
        $sort.$sort[`${sortBy}`] = asc > 0 ? 1 : -1;
      } else if (sort) {
        $sort.$sort = sort;
      }

      const $skip = {
        $skip: limit * (page - 1),
      };

      const $limit = {
        $limit: limit,
      };

      let pipeline: Array<any> = [$match, $sort, $skip, $limit];

      if (additional_pipeline.length > 0) {
        pipeline = [...pipeline, ...additional_pipeline];
      }

      const data = await this._repository.aggregate(pipeline).allowDiskUse(true).exec();

      return {
        total,
        data,
      };
    } catch (error) {
      throw error;
    }
  }


  async findOne(
    query,
    options?: QueryOptions,
    projection: any = { __v: 0 }
  ): Promise<T | any> {
    try {
      return await this._repository.findOne(query, projection, options);
    } catch (error) {
      throw error;
    }
  }


  async findById(id: string, options?: QueryOptions, projection: any = { __v: 0 }): Promise<T | any> {
    try {
      return await this._repository.findOne({ _id: id, isDeleted: false }, projection, options);
    } catch (error) {
      throw error;
    }
  }


  async aggregate<t>(pipeline: Array<any>, options?): Promise<t[]> {
    try {
      return await this._repository.aggregate(pipeline, options).allowDiskUse(true).exec();
    } catch (error) {
      throw error;
    }
  }


  async insertOne(data, options?): Promise<T> {
    try {
      const saved = await this._repository.create([data], options);
      return await this._repository.findById(saved[0]._id, {}, options);
    } catch (error) {
      throw error
    }
  }


  async insertMany<t>(data, options?): Promise<any> {
    try {
      return await this._repository.insertMany(data, options);
    } catch (error) {
      throw error;
    }
  }


  async updateById(id, data, options?: QueryOptions): Promise<T | any> {
    try {
      await this._repository.findOneAndUpdate({ _id: id, isDeleted: false }, data, options);
      return await this._repository.findById(id);
    } catch (error) {
      throw error;
    }
  }


  async updateByQuery(query, data, options?: QueryOptions): Promise<T | any> {
    try {
      return await this._repository.findOneAndUpdate(query, data, options);
    } catch (error) {
      throw error;
    }
  }


  async updateMany<t>(query, data, options?: QueryOptions): Promise<any> {
    try {
      return await this._repository.updateMany(query, data, options);
    } catch (error) {
      throw error;
    }
  }


  async deleteOne(query, options?: QueryOptions) {
    try {
      return await this._repository.deleteOne(query, options);
    } catch (error) {
      throw error;
    }
  }


  async markDeleted(id: string) {
    try {
      return await this._repository.findByIdAndUpdate(id, { isDeleted: true })
    } catch (error) {
      throw error;
    }
  }

}