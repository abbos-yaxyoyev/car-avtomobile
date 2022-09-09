import { PagingDto } from "../../../../core/validation/dtos/paging.dto";
import { CarEntity } from './../../../../core/entities/car/car.entity';


export abstract class ICarRepository<T> {

  abstract createCar(item: T): Promise<CarEntity>

  abstract getCarPaging(item: PagingDto): Promise<{ total: number, data: any }>;

  abstract getCar(id: string): Promise<CarEntity>;

  abstract updateCar(id: string, item: T): Promise<CarEntity>;

  abstract markDeleteCar(id: string): Promise<string>;

}
