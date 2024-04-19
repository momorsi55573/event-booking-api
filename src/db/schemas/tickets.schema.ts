/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schem';
@Schema()
export class Ticket {

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }] })
  eventId: Event
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  userId: User
  @Prop()
  attendeesCount: number;

}
export const TicketSchema = SchemaFactory.createForClass(Ticket);
