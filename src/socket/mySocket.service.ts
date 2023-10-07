import { INestApplicationContext, Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server } from "socket.io";

@WebSocketGateway()
export class MySocketService
  extends IoAdapter
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  logger: Logger = new Logger(MySocketService.name);

  async handleConnection(client: any, ...args: any[]) {
    this.logger.debug(`🙋🏻‍♂️ ${client.id} connect to socket...`);
  }
  async handleDisconnect(client: any) {
    this.logger.debug(`🙋🏻‍♂️ ${client.id} disconect to socket...`);
  }

  @SubscribeMessage("chat")
  async handleMessage(client: any, payload: any): Promise<void> {
    this.server.emit("chat", payload);
  }
}
