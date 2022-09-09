import {
  Body,
  Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors
} from '@nestjs/common';
import { CarEntity } from '../../../common/core/entities/car/car.entity';
import { CarDto, CarDtoGroup, PagingDto } from '../../../common/core/validation/dtos';
import { MyValidationPipe } from '../../../common/core/validation/validate';
import { ResponseInterceptor } from '../../../common/interceptor/response';
import { CarUseCases } from '../../../common/use-case/car/car.use-case';


@Controller('car')
export class CarController {

  constructor(private carService: CarUseCases) { }

  // @UseGuards(new ATGuard('name'))
  @Post()
  async createCar(@Body(new MyValidationPipe([CarDtoGroup.CREATE])) data: CarDto): Promise<CarEntity> {
    return await this.carService.createCar(data);
  }

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

  // @UseGuards(new ATGuard('must_auth'))
  @Put()
  async updateCar(@Body(new MyValidationPipe([CarDtoGroup.UPDATE])) data: CarDto): Promise<CarEntity> {
    return await this.carService.updateCar(data._id, data);
  }

  // @UseGuards(new ATGuard('must_auth'))
  @Delete(':id')
  async deleteCar(@Param(new MyValidationPipe([CarDtoGroup.DELETE])) data: { _id: string }): Promise<string> {
    return await this.carService.deleteCar(data._id);
  }

}