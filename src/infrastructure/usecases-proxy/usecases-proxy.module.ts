import { DynamicModule, Module } from "@nestjs/common";

import { RepositoriesModule } from "../repositories/repositories.module";
@Module({
  imports: [RepositoriesModule],
})
export class UsecasesProxyModule {
  //?--------------User---------------
  // static REGISTER_USER_USECASE_PROXY = 'registerUserUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        // {
        //   inject: [AddressInfoReporitory],
        //   provide: UsecasesProxyModule.DELETE_ADDRESS_BY_USER_PROXY,
        //   useFactory: (addressInfoRepository: AddressInfoReporitory) =>
        //     new UseCaseProxy(
        //       new DeleteAddressInfoUsecase(addressInfoRepository),
        //     ),
        // },
      ],
      exports: [
        // UsecasesProxyModule.REGISTER_USER_USECASE_PROXY,
      ],
    };
  }
}
