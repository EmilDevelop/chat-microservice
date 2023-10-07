import { DatabaseModule } from "@database/database.module";
import { Module } from "@nestjs/common";
import { ControllerModule } from "./infrastructure/controllers/controller.module";
import { RepositoriesModule } from "./infrastructure/repositories/repositories.module";

@Module({
  imports: [DatabaseModule, RepositoriesModule, ControllerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
