import { Inject, Injectable } from '@nestjs/common';
import { FileEntity } from '../../core/entities/file/file.entity';
import { IFileRepository } from '../../framework/mongodb/repoisitory/File/interface';

@Injectable()
export class FileUseCases {

  constructor(
    @Inject("IFileRepository")
    private _fileRepository: IFileRepository<FileEntity>,
  ) { }

  public async createFile(data: FileEntity): Promise<FileEntity> {
    try {

      const result = await this._fileRepository.createFile(data);

      return result;

    } catch (error) {

      throw error;

    }
  }


  public async getFileById(id: string): Promise<FileEntity> {
    return await this._fileRepository.getFile(id);
  }


  public async updateFile(id: string, data: FileEntity): Promise<FileEntity> {
    return await this._fileRepository.updateFile(id, data);
  }


  public async deleteFile(id: string): Promise<string> {
    return await this._fileRepository.deleteFile(id);
  }

}
