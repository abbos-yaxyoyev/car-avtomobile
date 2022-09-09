import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { COLLECTIONS } from '../../../../constant/collection';
import { CommonSchema } from '../common.model';


export type CarDocument = Car & Document;

@Schema({ collection: COLLECTIONS.CAR, timestamps: true })
export class Car extends CommonSchema {

  @Prop({ required: true, })
  public card: number;

  @Prop({ required: true, })
  public price: number;

  @Prop({ required: true, })
  public year: number;

  @Prop({ trim: true, required: true })
  public description: string;

  @Prop({ trim: true, required: true })
  public marka: string;

  @Prop({ trim: true, required: true })
  public tonirovka: string;

  @Prop({ trim: true, required: true })
  public motor: string;

  @Prop({ trim: true, required: true })
  public color: string;

  @Prop({ trim: true, required: true })
  public distance: string;

  @Prop({ trim: true, required: true })
  public gearbok: string;

  @Prop({ default: undefined })
  broneDate: Date;

  @Prop({ default: false })
  public isBrone: boolean;

  @Prop({
    required: true,
    type: Types.ObjectId,
  })
  categoryId: Types.ObjectId;
}

export const CarSchema = SchemaFactory.createForClass(Car);