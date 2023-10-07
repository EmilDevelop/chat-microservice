import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MySocketService } from "./socket/mySocket.service";
import { SocketAdapter } from "./socket/adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3007);
}
bootstrap();
