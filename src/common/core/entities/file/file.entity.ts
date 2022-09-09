import { Types } from "mongoose";
import { BaseEntity } from "../base.entity";

export class FileEntity extends BaseEntity {

  url: string;

  carId: Types.ObjectId;

}