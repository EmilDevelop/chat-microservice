import { DynamicModule, Module } from "@nestjs/common";

import { RepositoriesModule } from "../repositories/repositories.module";
import { DatabaseClientRepository } from "../repositories/clients.repository";
import { CreateClientUsecase } from "src/usecases/client/createClientUsecase.usecase";
import { UseCaseProxy } from "./usecases-proxy";
@Module({
  imports: [RepositoriesModule],
})
export class UsecasesProxyModule {
  //?--------------User---------------
  // static REGISTER_USER_USECASE_PROXY = 'registerUserUsecaseProxy';
  static CREATE_CLIENT_USECASE_PROXY = "createClientUsecaseProxy";

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseClientRepository],
          provide: UsecasesProxyModule.CREATE_CLIENT_USECASE_PROXY,
          useFactory: (clientRepository: DatabaseClientRepository) =>
            new UseCaseProxy(new CreateClientUsecase(clientRepository)),
        },
      ],
      exports: [UsecasesProxyModule.CREATE_CLIENT_USECASE_PROXY],
    };
  }
}
