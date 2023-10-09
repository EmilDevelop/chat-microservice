import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MySocketService } from "./socket/mySocket.service";
import { SocketAdapter } from "./socket/adapter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //!Swagger-----
  const config = new DocumentBuilder()
    .setTitle("1C SCANER〄")
    .setDescription(
      "Created by Emil Batyrgareev & Robert Bulator & Andrew Leontiev"
    )
    .setVersion("0.0.1")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
        description: "Enter JWT token",
      },
      "JWT"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    // extraModels: [ResponseFormat],
    deepScanRoutes: true,
  });
  SwaggerModule.setup("api", app, document);
  //!Swagger-----

  await app.listen(3007);
}
bootstrap();
