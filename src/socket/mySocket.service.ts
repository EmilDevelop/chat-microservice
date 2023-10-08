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
import {
  PrivateMsgInrerface,
  RoomMsgInrerface,
} from "src/domain/interface/msg/privateMsg.interaface";

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
  handleChat(client: Socket, msg: PrivateMsgInrerface) {
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
    payload: { to_room: string; text: string }
  ): void {
    const { to_room, text } = payload;
    console.log(to_room, text);
    if (this.rooms[to_room]) {
      //! DELETE ME
      const client_in_room = this.rooms[to_room].length;
      this.logger.warn(`Room ${to_room} have ${client_in_room} clients...`);

      const room_names = this.rooms.length;
      this.logger.warn(`Socket have ${room_names} rooms!`);
      //!_-------
      this.rooms[to_room].forEach((participant) => {
        console.log(participant.id, client.id);
        if (participant !== client) {
          const newMsg: PrivateMsgInrerface = {
            id: randomUUID(),
            from_user_socket_id: client.id,
            to_user_socket_id: participant.id,
            to_room: to_room,
            author: {
              id: "SOME_USER_ID",
              firstName: "SOME_USER_FIRST_NAME",
              lastName: "SOME_USER_SECOND_NAME",
            },
            text: text,
            createdAt: Date.now(),
          };
          console.log(`sended to chat => ${participant.id} \n${newMsg}`);
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
      // targetClient.emit("chat", newMsg);
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
