import { Module } from '@nestjs/common';
import { FileRepository } from '../../common/framework/mongodb/repoisitory/file/file.repository';
import { FileUseCases } from '../../common/use-case/file/file.use-case';
import { FileController } from '../controller/file/file.controller';


@Module({

  controllers: [
    FileController
  ],

  providers: [

    {
      provide: "IFileRepository",
      useClass: FileRepository
    },

    FileUseCases,

  ],
  exports: [FileUseCases],
})
export class FileModule { }