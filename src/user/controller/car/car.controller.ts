import {
  Controller, Get, Param, Query, UseInterceptors
} from '@nestjs/common';
import { CarEntity } from '../../../common/core/entities/car/car.entity';
import { CarDtoGroup, PagingDto } from '../../../common/core/validation/dtos';
import { MyValidationPipe } from '../../../common/core/validation/validate';
import { ResponseInterceptor } from '../../../common/interceptor/response';
import { CarUseCases } from '../../../common/use-case/car/car.use-case';


@Controller('car')
export class CarController {

  constructor(private carService: CarUseCases) { }

  // @UseGuards(new ATGuard('must_auth'))
  @Get(':id')
  async getCar(@Param(new MyValidationPipe([CarDtoGroup.GET_BY_ID])) data: { _id: string }): Promise<CarEntity> {
    return await this.carService.getCarById(data._id);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Get()
  @UseInterceptors(ResponseInterceptor)
  async getAllCarPaging(@Query(new MyValidationPipe([CarDtoGroup.PAGENATION])) dto: PagingDto): Promise<{ total: number, data: any[] }> {
    dto.limit = 1 * dto.limit;
    dto.page = 1 * dto.page;

    console.log('get paging request');

    return await this.carService.getAllCar(dto);
  }

}