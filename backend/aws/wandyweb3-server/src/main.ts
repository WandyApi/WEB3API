import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import logger from './common/logger/logger.config';
import Moralis from 'moralis';

async function bootstrap() {
  //inject moralis apikey at frist!
  Moralis.start({
    apiKey: 'vpg6w1I6EpOQmC5pG598XnzyLS57rpKYVej2iFJeuSixLXUYxYGZElWoGkWhZQhe',
  });

  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: logger,
  });
  const options = new DocumentBuilder()
    .setTitle('Wandy Web3 Open API')
    .setDescription('Wandy Web3 Open API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  await app.listen(9988, '0.0.0.0');
  Logger.log(`🚀 Server running on: ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
