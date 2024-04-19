/* eslint-disable prettier/prettier */

import { IsOptional } from "class-validator";
import { Category } from "../enums";



export class EventQueryParams {
  @IsOptional()
 name: string;
 @IsOptional()
 startDate: string;
 @IsOptional()
 endDate: string;
 @IsOptional()
 category: Category
}
