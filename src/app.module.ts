import { DatabaseModule } from "@database/database.module";
import { Module } from "@nestjs/common";
import { ControllerModule } from "./infrastructure/controllers/controller.module";
import { RepositoriesModule } from "./infrastructure/repositories/repositories.module";
import { MySocketModule } from "./socket/mySocket.module";
import { SocketAdapter } from "./socket/adapter";

@Module({
  imports: [
    MySocketModule,
    // DatabaseModule,
    // RepositoriesModule,
    // ControllerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
