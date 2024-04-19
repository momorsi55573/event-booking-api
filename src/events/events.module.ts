import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from 'src/db/schemas/event.schema';
import { TicketSchema } from 'src/db/schemas/tickets.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Event', schema: EventSchema },
      { name: 'Ticket', schema: TicketSchema },
    ]),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({
      global: true,
    }),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
