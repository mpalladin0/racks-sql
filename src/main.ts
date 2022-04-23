import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import AdminJS from 'adminjs';
import { Database, Resource} from '@adminjs/sequelize'
// import { WinstonModule, utilities } from 'nest-winston';
// import * as winston from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //   logger: WinstonModule.createLogger({
  //     transports: [
  //       new winston.transports.Console({
  //         format: winston.format.combine(
  //           winston.format.timestamp(),
  //           winston.format.ms(),
  //           utilities.format.nestLike('MyApp', { prettyPrint: true }),
  //         ),
  //       }),
  //       // other transports...
  //     ],
  //     // options (same as WinstonModule.forRoot() options)
  //   })    
  // });
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

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



  await app.listen(process.env.PORT || 3030);
}
bootstrap();
