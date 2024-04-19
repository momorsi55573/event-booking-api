/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { Event, EventSchema } from 'src/db/schemas/event.schema';
import { getModelToken } from '@nestjs/mongoose';
import { EventsService } from './events.service';
import { CreateEventDTOStubs } from 'test/stubs';

jest.mock('../events/events.service.ts')

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let eventModel: Model<Event>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    eventModel = mongoConnection.model(Event.name, EventSchema);
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        EventsService,
        {provide: getModelToken(Event.name), useValue: eventModel},
      ],
    }).compile();
    controller = app.get<EventsController>(EventsController);
    service = app.get<EventsService>(EventsService);
    jest.clearAllMocks();
  })

  test('', () => {
    expect(controller.createEvent(CreateEventDTOStubs())).toBe({
      description: 'Created',
       eventId: String,
    })
  })

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

});
