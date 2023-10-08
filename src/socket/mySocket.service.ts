import { Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { randomUUID } from "crypto";
import { Server, Socket } from "socket.io";
import { MsgInrerface } from "src/domain/interface/msg/privateMsg.interaface";

@WebSocketGateway()
export class MySocketService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger(MySocketService.name);

  private rooms: Record<string, Socket[]> = {};

  handleConnection(client: Socket, ...args: any[]): any {
    this.logger.debug(`🙋🏻‍♂️ ${client.id} connected to socket...`);
  }

  handleDisconnect(client: Socket): any {
    this.logger.debug(`🙋🏻‍♂️ ${client.id} disconnected from socket...`);
    // Leave all rooms when a user disconnects
    this.leaveAllRooms(client);
  }

  @SubscribeMessage("verbose")
  async verbose(client: Socket, data: any) {
    console.log(`Client ${client.id} => ${data}`);
  }

  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: Socket, room: string): void {
    client.join(room);
    this.logger.debug(`🚪 ${client.id} joined room: ${JSON.stringify(room)}`);
    this.rooms[room] = this.rooms[room] || [];
    this.rooms[room].push(client);
  }

  @SubscribeMessage("chat")
  handleChat(client: Socket, msg: MsgInrerface) {
    const targetClient = this.server.sockets.sockets.get(msg.to_user_socket_id);
    targetClient.emit("chat", msg);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, room: string): void {
    client.leave(room);
    this.logger.debug(`🚪 ${client.id} left room: ${room}`);
    this.rooms[room] = this.rooms[room].filter((c) => c !== client);
  }

  @SubscribeMessage("messageToRoom")
  handleMessageToRoom(
    client: Socket,
    payload: { room: string; message: string }
  ): void {
    const { room, message } = payload;
    if (this.rooms[room]) {
      this.rooms[room].forEach((participant) => {
        if (participant !== client) {
          const newMsg: MsgInrerface = {
            from_user_socket_id: client.id,
            to_user_socket_id: participant.id,
            to_room: room,
            author: "Authon nickname",
            msg: message,
            uuid: randomUUID(),
            date: new Date(),
          };
          participant.emit("chat", newMsg);
        }
      });
    } else {
      console.log("Room was undefined!");
    }
  }

  @SubscribeMessage("privateMessage")
  handlePrivateMessage(
    client: Socket,
    payload: { to: string; message: string }
  ): void {
    const { to, message } = payload;
    const targetClient = this.server.sockets.sockets.get(to);
    if (targetClient) {
      const newMsg: MsgInrerface = {
        from_user_socket_id: client.id,
        to_room: null,
        author: "",
        msg: "",
        uuid: "",
        date: undefined,
      };
      targetClient.emit(
        "privateMessage",
        `Private message from ${client.id}: ${message}`
      );
    } else {
      client.emit("privateMessage", `User ${to} not found or offline.`);
    }
  }

  private leaveAllRooms(client: Socket): void {
    Object.keys(this.rooms).forEach((room) => {
      if (this.rooms[room].includes(client)) {
        this.handleLeaveRoom(client, room);
      }
    });
  }
}
