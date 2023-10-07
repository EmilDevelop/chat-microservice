import { IoAdapter } from "@nestjs/platform-socket.io";
import * as socketIo from "socket.io";

export class SocketAdapter extends IoAdapter {
  createIOServer(
    port: number,
    options?: socketIo.ServerOptions
  ): socketIo.Server {
    console.log(port);
    return super.createIOServer(port, { ...options, cors: true });
  }
}
