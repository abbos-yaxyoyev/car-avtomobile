import { BaseEntity } from "../../base.entity";

export class RoleEntity extends BaseEntity {

  /* --- role name --- */
  name: string;

  /* --- employee --- */
  employee: boolean;
  employeeCreate?: boolean;
  employeeUpdate?: boolean;
  employeeDelete?: boolean;

  /* --- role --- */
  role: boolean;
  roleCreate?: boolean;
  roleUpdate?: boolean;
  roleDelete?: boolean;

  /* --- car --- */
  car: boolean;
  carCreate?: boolean;
  carUpdate?: boolean;
  carDelete?: boolean;

}