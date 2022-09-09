import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsMongoId, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { Types } from "mongoose";
import { BaseDto, BaseDtoGroup } from "../base.dto";

export class CarDtoGroup extends BaseDtoGroup {

}

export class CarDto extends BaseDto {

  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    {
      groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE,]
    }
  )
  card: number;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    {
      groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE,]
    }
  )
  price: number;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    {
      groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE,]
    }
  )
  year: number;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  description: string;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  marka: string;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  tonirovka: string;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  motor: string;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  color: string;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  distance: string;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  gearbok: string;


  @IsOptional({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE],
  })
  @ValidateIf((data, value) => value != null)
  @IsDateString(
    { strict: true },
    { groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE] }
  )
  broneDate: Date;


  @IsBoolean({
    groups: [CarDtoGroup.SET_STATE]
  })
  isBrone: boolean;


  @IsOptional({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  @IsBoolean({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  isAvailable: boolean;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsMongoId(
    {
      groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE],
    }
  )
  @Transform(({ value }) => new Types.ObjectId(value))
  categoryId: Types.ObjectId;
}