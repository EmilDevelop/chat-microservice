import { Module } from "@nestjs/common";
import { MySocketService } from "src/socket/mySocket.service";
import { UsecasesProxyModule } from "../usecases-proxy/usecases-proxy.module";
import { ClientController } from "./client.controller";
import { SocketAdapter } from "src/socket/adapter";

@Module({
  imports: [UsecasesProxyModule.register(), UsecasesProxyModule],
  controllers: [ClientController],
  providers: [],
  exports: [],
})
export class ControllerModule {}
