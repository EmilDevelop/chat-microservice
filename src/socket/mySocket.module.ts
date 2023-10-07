import { Module } from "@nestjs/common";
import { MySocketService } from "./mySocket.service";
import { SocketAdapter } from "./adapter";

@Module({
  imports: [],
  providers: [MySocketService, SocketAdapter],
  exports: [MySocketService, SocketAdapter],
})
export class MySocketModule {}
