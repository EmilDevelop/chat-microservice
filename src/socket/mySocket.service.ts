import { Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class MySocketService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  logger: Logger = new Logger(MySocketService.name);

  handleConnection(client: any, ...args: any[]): any {
    this.logger.debug(`🙋🏻‍♂️ ${client.id} connect to socket...`);
  }

  handleDisconnect(client: any): any {
    this.logger.debug(`🙋🏻‍♂️ ${client.id} disconnect from socket...`);
  }

  @SubscribeMessage("chat")
  handleMessage(client: any, payload: any): void {
    console.log(payload);
    client.broadcast.emit("chat", payload); // используйте broadcast, чтобы исключить отправителя
  }
}
