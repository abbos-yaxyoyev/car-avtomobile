import { Types } from 'mongoose';
import { IDataServices } from '../../../../core/abstract/data.servise.abstract';
import { FileException } from '../../../../core/entities/file/exception';
import { FileEntity } from '../../../../core/entities/file/file.entity';
import { IFileRepository } from './interface';

export class FileRepository implements IFileRepository<FileEntity> {

  constructor(private dataServices: IDataServices) {
  }


  public async createFile(data: FileEntity): Promise<FileEntity> {

    const result = await this.dataServices.file.insertOne(data);

    return result;

  }


  public async updateFile(id: string, data: FileEntity): Promise<FileEntity> {

    const result = await this.dataServices.file.updateById(id, data);

    return result;
  }


  public async getFile(id: string): Promise<FileEntity> {

    try {

      const $match: any = {
        $match: {
          _id: new Types.ObjectId(id),
          isDeleted: false
        },
      };


      const $projection = {
        $project: {
          __v: 0,
          createdBy: 0,
          updatedBy: 0,
          deletedBy: 0
        },
      };

      const $pipline = [$match, $projection];

      const data = (await this.dataServices.file.aggregate($pipline)).shift();

      if (!data) throw FileException.NotFound(id)

      return data;

    } catch (error) {
      throw FileException.UnknownError(error);
    }
  }


  public async deleteFile(id: string): Promise<string> {

    await this.dataServices.file.deleteOne(id);

    return id;

  }


}
