import { Module } from '@nestjs/common';
import { RoleRepository } from '../../common/framework/mongodb/repoisitory/role/role.repository';
import { RoleUseCases } from '../../common/use-case/role/role.use-case';
import { RoleController } from '../controller/role/role.controller';


@Module({
  controllers: [
    RoleController
  ],
  providers: [
    {
      provide: "IRoleRepository",
      useClass: RoleRepository
    },
    RoleUseCases,
  ],
  exports: [RoleUseCases],
})
export class RoleModule { }