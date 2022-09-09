import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { COLLECTIONS } from '../../../../constant/collection';
import { CommonSchema } from '../common.model';


export type FileDocument = File & Document;

@Schema({ collection: COLLECTIONS.FILE, timestamps: true })
export class File extends CommonSchema {

  @Prop({ trim: true, required: true })
  public url: string;


  @Prop({
    required: true,
    type: Types.ObjectId,

  })
  carId: Types.ObjectId;

}

export const FileSchema = SchemaFactory.createForClass(File);