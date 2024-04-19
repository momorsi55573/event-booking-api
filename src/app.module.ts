/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { getConfig } from './db/config/mongoose.config';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';


@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({async useFactory() {
    return getConfig();
  }}), UsersModule, EventsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
