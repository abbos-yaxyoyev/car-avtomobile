import { Module } from "@nestjs/common";
import { CarRepository } from "../../common/framework/mongodb/repoisitory/car/car.repository";
import { CarUseCases } from "../../common/use-case/car/car.use-case";
import { CarController } from "../controller/car/car.controller";


@Module({
  controllers: [CarController],
  providers: [
    {
      provide: 'ICarRepository',
      useClass: CarRepository
    },
    CarUseCases,
  ],
})
export class CarModule { }