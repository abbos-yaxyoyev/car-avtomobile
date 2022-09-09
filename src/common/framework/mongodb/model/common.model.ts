import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';



export class CommonSchema {

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({
    type: Types.ObjectId,
  })
  createdBy: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
  })
  updatedBy: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
  })
  deletedBy: Types.ObjectId;

  @Prop({ default: undefined })
  deletedAt?: Date;

  createdAt: Date;

  updatedAt: Date;
}
