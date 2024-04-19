/* eslint-disable prettier/prettier */
import { EventRequestDTO } from 'src/utils/dto';
import { Category } from 'src/utils/enums';

export const CreateEventDTOStubs = (): EventRequestDTO => {
    return {
        name: 'test',
        description: 'test',
        date: new Date().toISOString(),
        availableAttendeesCount: 1,
        category: Category.Concert
        };
};
