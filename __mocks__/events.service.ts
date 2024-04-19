/* eslint-disable prettier/prettier */
import { CreateEventDTOStubs, CreateTicketDTOStubs } from 'test/stubs';

/* eslint-disable prettier/prettier */
export const EventsService = jest.fn().mockReturnValue({
    createEvent: jest.fn().mockResolvedValue(CreateEventDTOStubs()),
    getEvents: jest.fn().mockResolvedValue({}),
    createTicket: jest.fn().mockResolvedValue(CreateTicketDTOStubs()),
});
