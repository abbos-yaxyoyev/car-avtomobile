import { Transform } from "class-transformer";
import { IsMongoId, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
import { BaseDto, BaseDtoGroup } from "../base.dto";

export class FileDtoGroup extends BaseDtoGroup {

}

export class FileDto extends BaseDto {

  @IsOptional({
    groups: [FileDtoGroup.UPDATE]
  })
  @IsString({
    groups: [FileDtoGroup.CREATE, FileDtoGroup.UPDATE]
  })
  url: string;


  @IsOptional({
    groups: [FileDtoGroup.UPDATE]
  })
  @IsMongoId(
    {
      groups: [FileDtoGroup.CREATE, FileDtoGroup.UPDATE],
    }
  )
  @Transform(({ value }) => new Types.ObjectId(value))
  carId: Types.ObjectId;

}