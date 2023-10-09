import { Controller, Inject, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsecasesProxyModule } from "../usecases-proxy/usecases-proxy.module";
import { UseCaseProxy } from "../usecases-proxy/usecases-proxy";
import { CreateClientUsecase } from "src/usecases/client/createClientUsecase.usecase";

@Controller("clients")
@ApiTags("clients")
export class ClientController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_CLIENT_USECASE_PROXY)
    private readonly createClientProxy: UseCaseProxy<CreateClientUsecase>
  ) {}

  @Post()
  @ApiOperation({ summary: "Create new client" })
  async createClient() {
    return await this.createClientProxy.getInstance().execute();
  }
}
