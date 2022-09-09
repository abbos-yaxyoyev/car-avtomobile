import { IsBoolean, IsOptional, IsString } from "class-validator";
import { BaseDto, BaseDtoGroup } from "../../base.dto";

export class RoleDtoGroup extends BaseDtoGroup {

}

export class RoleDto extends BaseDto {

  @IsOptional({
    groups: [RoleDtoGroup.UPDATE]
  })
  @IsString({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  name: string;

  /* --- employee --- */
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employee: boolean;

  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employeeCreate: boolean;

  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employeeUpdate: boolean;

  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employeeDelete: boolean;

  /* --- role --- */
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  role: boolean;

  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  roleCreate: boolean;

  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  roleUpdate: boolean;

  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  roleDelete: boolean;

  /* --- car --- */
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  car: boolean;

  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  carCreate: boolean;

  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  carUpdate: boolean;

  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  carDelete: boolean;

}