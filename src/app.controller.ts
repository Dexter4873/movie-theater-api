import { Controller, Get } from '@nestjs/common';
import { apiDescription, ApiDescription } from "./common/types/api-description.type";

@Controller()
export class AppController {
  @Get()
  getHello(): ApiDescription {
    return apiDescription;
  }
}
