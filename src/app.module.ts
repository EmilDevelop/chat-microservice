import { DatabaseModule } from "@database/database.module";
import { Module } from "@nestjs/common";

import { RepositoriesModule } from "./infrastructure/repositories/repositories.module";
import { MySocketModule } from "./socket/mySocket.module";
import { SocketAdapter } from "./socket/adapter";
import { ControllerModule } from "./infrastructure/controllers/controller.module";
import { UsecasesProxyModule } from "./infrastructure/usecases-proxy/usecases-proxy.module";

@Module({
  imports: [
    UsecasesProxyModule.register(),
    MySocketModule,
    DatabaseModule,
    ControllerModule,
    // DatabaseModule,
    // RepositoriesModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
