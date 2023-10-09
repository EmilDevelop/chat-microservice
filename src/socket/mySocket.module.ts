import { Module } from "@nestjs/common";
import { MySocketService } from "./mySocket.service";
import { SocketAdapter } from "./adapter";
import { UsecasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";

@Module({
  imports: [UsecasesProxyModule.register()],
  providers: [MySocketService, SocketAdapter],
  exports: [MySocketService, SocketAdapter],
})
export class MySocketModule {}
