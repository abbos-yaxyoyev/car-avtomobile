import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { COLLECTIONS } from '../../../../constant/collection';
import { CommonSchema } from '../common.model';

export type EmployeeDocument = Employee & Document;

@Schema({ collection: COLLECTIONS.EMPLOYEE, timestamps: true })
export class Employee extends CommonSchema {

  @Prop({ trim: true, required: true })
  public fullName: string;

  @Prop({ trim: true, required: true })
  public phoneNumber: string;

  @Prop({ trim: true, required: true })
  public password: string;

  @Prop({ trim: true, })
  public refreshToken?: string;

  @Prop({ trim: true })
  public imgUrl?: string;

  @Prop({ default: undefined })
  birthday: Date;

  @Prop({ trim: true })
  public biography?: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
  })
  roleId: Types.ObjectId;

  @Prop({ default: true })
  public isBlock: boolean;
}


export const EmployeeSchema = SchemaFactory.createForClass(Employee);