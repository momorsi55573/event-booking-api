/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { CreateTicketDTO, EventQueryParams, EventRequestDTO } from 'src/utils/dto';
import * as fs from 'fs';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private eventModel: Model<EventRequestDTO>,
    @InjectModel('Ticket') private ticketModel: Model<CreateTicketDTO>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async createEvent(dto: EventRequestDTO): Promise<{ description: 'Created', eventId: string }> {
    const event = await this.eventModel.create(dto);
    return {description: 'Created', eventId: event.id };
  }

  async getEvents(params: EventQueryParams):Promise<EventRequestDTO[]> | null{
    try {
      if (params.name) {
        const events = await this.eventModel.find({
         name: params.name
        })
        return events;
       }
       if (params.startDate && params.endDate) {
         const events = await this.eventModel.find({
           date: {
             $gte: params.startDate,
             $lte: params.endDate
           }
         })
         return events;
       }
       if (params.category) {
         const events = await this.eventModel.find({
           category: params.category
         })
         return events;
       }
       if (params.name && params.category && params.startDate && params.endDate) {
       const events =  await this.eventModel.find({
           name: params.name,
           date: {
             $gte: params.startDate,
             $lte: params.endDate,
           },
           category: params.category,
         })
         return events;
       }
   
       if (params.startDate && params.endDate && params.category) {
         const events = await this.eventModel.find({date:{$gt: params.startDate, $lt: params.endDate}})
         return events;
       }
   
       if (params.name && params.category) {
         const events = await this.eventModel.find({name: params.name, category: params.category})
         return events;
       }
   
       if (params.name && params.startDate && params.endDate) {
         const events = await this.eventModel.find({name: params.name, date: {$gt: params.startDate, $lt: params.endDate}})
         return events;
       }
      const events = await this.eventModel.find()
       return events;
    } catch (error) {
      throw error;
    }


  }

  async createTicket(dto: CreateTicketDTO, eventId: string, userId: string): Promise<string> {
    await this.ticketModel.create({
      availableAttendeesCount: dto.availableAttendeesCount,
      eventId: eventId,
      userId: userId,
    });
    return 'created';
  }

  async viewUserEvents(userId): Promise<Event[]> {
    const tickets = await this.ticketModel.find({
      userId,
    });
    const events = [];
for (let i = 0; i < tickets.length; i++) {
 events.push( await this.eventModel.findById(tickets[i].eventId))
  
}
    return  events;
  }

  async cancel(ticketId: string): Promise<void> {
   return await this.ticketModel.findByIdAndDelete(ticketId);
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async handleCron() {
    const now = new Date();
    const today = String(now.getDate()).padStart(2, '0');

    const tickets = await this.ticketModel.find({
      date: today
    })
    this.eventEmitter.emit('notifications', tickets)
    fs.writeFileSync('../../history/audit.json', JSON.stringify(tickets))
    return tickets 
  }

}
