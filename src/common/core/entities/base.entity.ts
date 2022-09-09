import { Types } from "mongoose";

export class BaseEntity {

  _id?: string;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  createdBy?: Types.ObjectId;

  updatedBy?: Types.ObjectId;

  deletedBy?: Types.ObjectId;

  isDeleted?: boolean;
}