/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from 'src/utils/enums';
@Schema()
export class Event {
  @Prop()
  name: string;
  @Prop()
  date: string;
  @Prop()
  availableAttendeesCount: number;
  @Prop()
  description: string;
  @Prop()
  category: Category
}
export const EventSchema = SchemaFactory.createForClass(Event);
