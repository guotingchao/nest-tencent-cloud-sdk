import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const host = configService.get('HOST');

  await app.listen(port, host, () => {
    console.debug(`🚀 Server ready at http://${host}:${port}`);
  });
}

bootstrap();
