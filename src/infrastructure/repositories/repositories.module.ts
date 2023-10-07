import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      //!Entities
    ]),
  ],
  providers: [
    //!Repositories
  ],
  exports: [
    //!Repositories
  ],
})
export class RepositoriesModule {}
