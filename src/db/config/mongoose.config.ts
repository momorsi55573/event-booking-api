/* eslint-disable prettier/prettier */
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export async function getConfig(): Promise<MongooseModuleOptions> {
  const mongod = await MongoMemoryServer.create();

  const uri =  mongod.getUri();

  return {
    uri
  };
}
