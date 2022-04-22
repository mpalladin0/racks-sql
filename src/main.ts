import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import AdminJS from 'adminjs';
import { Database, Resource} from '@adminjs/sequelize'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Racks API')
    .setDescription('Documentation on how to interact with the Racks API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  AdminJS.registerAdapter({
    Database, Resource
  })



  await app.listen(3030);
}
bootstrap();
