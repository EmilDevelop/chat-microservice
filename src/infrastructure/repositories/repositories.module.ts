import { Module, Session } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientsEntity } from "../entities/clients.entity";
import { DatabaseClientRepository } from "./clients.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ClientsEntity])],
  providers: [DatabaseClientRepository],
  exports: [DatabaseClientRepository],
})
export class RepositoriesModule {}
