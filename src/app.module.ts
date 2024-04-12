import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

let envFilePath = '.env';

if (process.env.NODE_ENV === 'test') {
  envFilePath = '.env.test';
} else if (process.env.NODE_ENV === 'production') {
  envFilePath = '.env.prod';
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
