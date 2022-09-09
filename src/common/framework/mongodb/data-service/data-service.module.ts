import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from '../mongo-generic-repository/mongo.database-service.module';

@Module({
  imports: [MongoDataServicesModule],
  exports: [MongoDataServicesModule],
})
export class DataServicesModule { }