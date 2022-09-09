import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { COLLECTIONS } from '../../../../constant/collection';
import { CommonSchema } from '../common.model';


export type RoleDocument = Role & Document;

@Schema({ collection: COLLECTIONS.ROLE, timestamps: true })
export class Role extends CommonSchema {

  @Prop({
    trim: true,
    required: true,
  })
  name: string;

  /* --- role --- */
  @Prop({
    default: false
  })
  role: boolean;

  @Prop({
    default: false
  })
  roleCreate: boolean;

  @Prop({
    default: false
  })
  roleUpdate: boolean;

  @Prop({
    default: false
  })
  roleDelete: boolean;


  /* --- employee --- */
  @Prop({
    default: true
  })
  employee: boolean;

  @Prop({
    default: true
  })
  employeeCreate: boolean;

  @Prop({
    default: true
  })
  employeeUpdate: boolean;

  @Prop({
    default: true
  })
  employeeDelete: boolean;


  /* --- car --- */
  @Prop({
    default: true
  })
  car: boolean;

  @Prop({
    default: true
  })
  carCreate: boolean;

  @Prop({
    default: true
  })
  carUpdate: boolean;

  @Prop({
    default: true
  })
  carDelete: boolean;

}

export const RoleSchema = SchemaFactory.createForClass(Role);