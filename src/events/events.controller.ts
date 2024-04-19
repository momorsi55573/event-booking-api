/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query, UseGuards, Sse } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateTicketDTO, EventQueryParams, EventRequestDTO } from 'src/utils/dto';
import { JwtGuard } from 'src/utils/guards';
import { GetUser } from 'src/utils/decorators';
import { Observable, fromEvent, map } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @UseGuards(JwtGuard)
  @Post('events')
  async createEvent(
    @Body() dto: EventRequestDTO,
  ): Promise<{description: 'Created', eventId: string }> {
    return await this.eventsService.createEvent(dto);
  }

  @Get('events')
 async getEvents(@Query() params: EventQueryParams): Promise<EventRequestDTO[]> | null{
    return await this.eventsService.getEvents(params);
  }

  @UseGuards(JwtGuard)
  @Post('events/:eventId/tickets')
  async createTicket(
    @GetUser() user,
    @Param('eventId') eventId: string,
    @Body() dto: CreateTicketDTO,
  ): Promise<string> {
    return await this.eventsService.createTicket(dto, eventId, user.userId);
  }


  @UseGuards(JwtGuard)
  @Get('viewUserEvents')
  async viewUserEvents(
    @GetUser() user,
  ): Promise<Event[]> {
    return await this.eventsService.viewUserEvents(user.userId);
  }
  
  @UseGuards(JwtGuard)
  @Get('cancel/:ticketId')
  async cancel(
    @Param('ticketId') eventId: string,
  ): Promise<void> {
    return await this.eventsService.cancel(eventId);
  }

  @Sse('sse')
  async sse(): Promise<Observable<any>> {
    return fromEvent(this.eventEmitter, 'notifications').pipe(
      map((payload) => ({
        data: JSON.stringify(payload),
      })),
    );
  }
  
}
