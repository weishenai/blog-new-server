import { Controller } from '@nestjs/common';
import { PageHeaderService } from './page-header.service';

@Controller('page-header')
export class PageHeaderController {
  constructor(private readonly pageHeaderService: PageHeaderService) {}
}
