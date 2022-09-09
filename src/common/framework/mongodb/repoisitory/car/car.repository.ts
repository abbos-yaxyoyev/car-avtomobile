import { Types } from 'mongoose';
import { COLLECTIONS } from '../../../../constant/collection';
import { IDataServices } from '../../../../core/abstract/data.servise.abstract';
import { CarEntity } from '../../../../core/entities/car/car.entity';
import { CarException } from '../../../../core/entities/car/exception';
import { PagingDto } from '../../../../core/validation/dtos/paging.dto';
import { ICarRepository } from './interface';

export class CarRepository implements ICarRepository<CarEntity> {

  constructor(private dataServices: IDataServices) {
  }


  public async createCar(data: CarEntity): Promise<CarEntity> {

    const result = await this.dataServices.car.insertOne(data);

    return result;

  }


  public async updateCar(id: string, data: CarEntity): Promise<CarEntity> {

    const query = {
      isDeletd: false,
      _id: id
    }

    const result = await this.dataServices.car.updateByQuery(query, data);

    return result;
  }


  public async getCarPaging(dto: PagingDto): Promise<{ total: number, data: any }> {
    try {

      const query: any = { isDeleted: false };

      const $lookupFile = {
        $lookup: {
          from: COLLECTIONS.FILE,
          foreignField: 'carId',
          localField: '_id',
          as: 'files',
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

      const $pipline = [$lookupFile, $projection];

      return await this.dataServices.car.findPaging(query, dto, $pipline);

    } catch (error) {
      console.log("error paging Car: ", error);
      throw new Error(error)
    }
  }


  public async getCar(id: string): Promise<CarEntity> {

    try {

      const $match: any = {
        $match: {
          _id: new Types.ObjectId(id),
          isDeleted: false
        },
      };


      const $lookupFile = {
        $lookup: {
          from: COLLECTIONS.FILE,
          foreignField: 'carId',
          localField: '_id',
          as: 'files',
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

      const $pipline = [$match, $lookupFile, $projection];

      const data = await this.dataServices.car.aggregate($pipline);

      if (!data || !data[0]) throw CarException.NotFound(id)

      return data[0];

    } catch (error) {
      throw CarException.UnknownError(error);
    }
  }


  public async markDeleteCar(id: string): Promise<string> {

    await this.dataServices.car.markDeleted(id);

    return id;

  }

}
