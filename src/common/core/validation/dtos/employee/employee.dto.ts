import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsMongoId, IsOptional, IsPhoneNumber, IsString, ValidateIf } from "class-validator";
import { Types } from "mongoose";
import { BaseDto, BaseDtoGroup } from "../base.dto";

export class EmployeeDtoGroup extends BaseDtoGroup {

  static LOGIN = 'login';

  static VERIFY_OTP = 'verify-otp';
}

export class EmployeeDto extends BaseDto {

  @IsOptional({
    groups: [EmployeeDtoGroup.UPDATE]
  })
  @IsString({
    groups: [EmployeeDtoGroup.CREATE, EmployeeDtoGroup.UPDATE]
  })
  fullName: string;


  @IsOptional({
    groups: [EmployeeDtoGroup.UPDATE]
  })
  @IsString({
    groups: [EmployeeDtoGroup.CREATE, EmployeeDtoGroup.UPDATE]
  })
  password: string;


  @IsOptional({
    groups: [EmployeeDtoGroup.UPDATE]
  })
  @IsString({
    groups: [EmployeeDtoGroup.UPDATE, EmployeeDtoGroup.LOGIN]
  })
  refreshToken: string;


  @IsOptional({
    groups: [EmployeeDtoGroup.UPDATE]
  })
  @IsString({
    groups: [EmployeeDtoGroup.UPDATE]
  })
  biography: string;

  @IsOptional({
    groups: [EmployeeDtoGroup.UPDATE]
  })
  @IsString({
    groups: [EmployeeDtoGroup.UPDATE]
  })
  imgUrl: string;


  @IsOptional({ groups: [EmployeeDtoGroup.UPDATE] })
  @Transform(({ value }) => `+${value?.replace(/[^0-9]/g, '')}`)
  @IsPhoneNumber(null, {
    groups: [EmployeeDtoGroup.CREATE, EmployeeDtoGroup.UPDATE, EmployeeDtoGroup.LOGIN, EmployeeDtoGroup.VERIFY_OTP],
  })
  phoneNumber: string;


  @IsOptional({
    groups: [EmployeeDtoGroup.CREATE, EmployeeDtoGroup.UPDATE],
  })
  @ValidateIf((data, value) => value != null)
  @IsDateString({ strict: true }, { groups: [EmployeeDtoGroup.CREATE, EmployeeDtoGroup.UPDATE] })
  birthday: Date;


  @IsBoolean({ groups: [EmployeeDtoGroup.SET_STATE,] })
  isBlock: boolean;


  @IsOptional({
    groups: [EmployeeDtoGroup.CREATE, EmployeeDtoGroup.UPDATE]
  })
  @IsMongoId(
    {
      groups: [EmployeeDtoGroup.CREATE, EmployeeDtoGroup.UPDATE],
    }
  )
  @Transform(({ value }) => new Types.ObjectId(value))
  roleId: Types.ObjectId;
}