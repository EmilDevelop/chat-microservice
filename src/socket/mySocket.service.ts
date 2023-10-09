import { Inject, Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ClientTypesEnum } from "src/domain/enums/client.enum";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { CreateClientUsecase } from "src/usecases/client/createClientUsecase.usecase";

@WebSocketGateway()
export class MySocketService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(UsecasesProxyModule.CREATE_CLIENT_USECASE_PROXY)
    private readonly createClientProxy: UseCaseProxy<CreateClientUsecase>
  ) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger(MySocketService.name);

  private rooms: Record<string, Socket[]> = {};

  async handleConnection(client: Socket, args) {
    this.logger.debug(`🫥 ${client.id} connected to socket...`);
    const newClient = await this.createClientProxy.getInstance().execute();
    const clientType: ClientTypesEnum = client.handshake.auth["auth"];
    console.log(`New connection to socket is => ${clientType}`);
  }

  handleDisconnect(client: Socket): any {
    this.logger.debug(`🫥 ${client.id} disconnected from socket...`);
    // Leave all rooms when a user disconnects
    // this.leaveAllRooms(client);
  }

  // @SubscribeMessage("verbose")
  // async verbose(client: Socket, data: any) {
  //   console.log(`Client ${client.id} => ${data}`);
  // }

  // @SubscribeMessage("joinRoom")
  // handleJoinRoom(client: Socket, room: string): void {
  //   client.join(room);
  //   this.logger.debug(`🚪 ${client.id} joined room: ${room}`);
  //   this.rooms[room] = this.rooms[room] || [];
  //   this.rooms[room].push(client);
  // }

  // @SubscribeMessage("leaveRoom")
  // handleLeaveRoom(client: Socket, room: string): void {
  //   client.leave(room);
  //   this.logger.debug(`🚪 ${client.id} left room: ${room}`);
  //   this.rooms[room] = this.rooms[room].filter((c) => c !== client);
  // }

  // @SubscribeMessage("messageToRoom")
  // handleMessageToRoom(
  //   client: Socket,
  //   payload: { to_room: string; text: string }
  // ): void {
  //   const { to_room, text } = payload;
  //   console.log(to_room, text);
  //   if (this.rooms[to_room]) {
  //     this.rooms[to_room].forEach((participant) => {
  //       console.log(participant.id, client.id);
  //       if (participant !== client) {
  //         const newMsg: PrivateMsgInrerface = {
  //           id: randomUUID(),
  //           from_user_socket_id: client.id,
  //           to_user_socket_id: participant.id,
  //           to_room: to_room,
  //           author: {
  //             id: "SOME_USER_ID",
  //             firstName: "Emil",
  //             lastName: "North",
  //           },
  //           text: text,
  //           createdAt: Date.now(),
  //         };
  //         participant.emit("chat", newMsg);
  //       }
  //     });
  //   } else {
  //     console.log("Room was undefined!");
  //   }
  // }
  // @SubscribeMessage("chat")
  // handleChat(client: Socket, msg: PrivateMsgInrerface) {
  //   const targetClient = this.server.sockets.sockets.get(msg.to_user_socket_id);
  //   targetClient.emit("chat", msg);
  //   this.logger.debug(JSON.stringify(msg));
  // }

  // @SubscribeMessage("privateMessage")
  // handlePrivateMessage(
  //   client: Socket,
  //   payload: { to: string; message: string }
  // ): void {
  //   const { to, message } = payload;
  //   const targetClient = this.server.sockets.sockets.get(to);
  //   if (targetClient) {
  //     // targetClient.emit("chat", newMsg);
  //   } else {
  //     client.emit("privateMessage", `User ${to} not found or offline.`);
  //   }
  // }

  // private leaveAllRooms(client: Socket): void {
  //   Object.keys(this.rooms).forEach((room) => {
  //     if (this.rooms[room].includes(client)) {
  //       this.handleLeaveRoom(client, room);
  //     }
  //   });
  // }
}
