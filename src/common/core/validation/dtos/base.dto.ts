import { Transform } from "class-transformer";
import { IsMongoId, IsOptional } from "class-validator";
import { Types } from 'mongoose';

export class BaseDtoGroup {
  static CREATE = 'create';
  static UPDATE = 'update';
  static DELETE = 'delete';
  static GET_BY_ID = 'getById';
  static NUMBER = 'number';
  static PAGENATION = 'pagination';
  static SET_STATE = 'state';
  static POSITION = 'position';
  static CREATE_WEB = 'web';
}

export class BaseDto {
  @IsOptional({
    groups: [BaseDtoGroup.PAGENATION,]
  })
  @IsMongoId({
    groups: [BaseDtoGroup.UPDATE, BaseDtoGroup.DELETE, BaseDtoGroup.GET_BY_ID, BaseDtoGroup.SET_STATE]
  })
  _id: string;


  @IsOptional({
    groups: [BaseDtoGroup.CREATE,]
  })
  @IsMongoId({
    groups: [BaseDtoGroup.DELETE]
  })
  @Transform(({ value }) => new Types.ObjectId(value))
  createdBy: Types.ObjectId;


  @IsOptional({
    groups: [BaseDtoGroup.UPDATE]
  })
  @IsMongoId({
    groups: [BaseDtoGroup.UPDATE,]
  }
  )
  @Transform(({ value }) => new Types.ObjectId(value))
  updatedBy: Types.ObjectId;


  @IsOptional({
    groups: [BaseDtoGroup.DELETE,]
  })
  @IsMongoId({
    groups: [BaseDtoGroup.DELETE,]
  })
  @Transform(({ value }) => new Types.ObjectId(value))
  deletedBy: Types.ObjectId;;
}