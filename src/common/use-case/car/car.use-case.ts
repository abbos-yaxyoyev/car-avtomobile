import { Inject, Injectable } from '@nestjs/common';
import { CarEntity } from '../../core/entities/car/car.entity';
import { PagingDto } from '../../core/validation/dtos/paging.dto';
import { ICarRepository } from '../../framework/mongodb/repoisitory/Car/interface';

@Injectable()
export class CarUseCases {

  constructor(
    @Inject("ICarRepository")
    private _carRepository: ICarRepository<CarEntity>,
  ) { }

  public async createCar(data: CarEntity): Promise<CarEntity> {
    try {

      const result = await this._carRepository.createCar(data);

      return result;

    } catch (error) {
      throw error;
    }
  }


  public async getAllCar(dto: PagingDto): Promise<{ total: number, data: any }> {
    return await this._carRepository.getCarPaging(dto);
  }


  public async getCarById(id: string): Promise<CarEntity> {
    return await this._carRepository.getCar(id);
  }


  public async updateCar(id: string, data: CarEntity): Promise<CarEntity> {
    return await this._carRepository.updateCar(id, data);
  }


  public async deleteCar(id: string): Promise<string> {
    return await this._carRepository.markDeleteCar(id);
  }

}
