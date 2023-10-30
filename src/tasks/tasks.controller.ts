import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() body: any) {
    return this.tasksService.create(body);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }
  @Get('/trash')
  findTrash() {
    return this.tasksService.findTrash();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.tasksService.update(+id,body);
  }

  @Post(':id')
  remove(@Param('id') id: any,@Body() body:any) {
    return this.tasksService.remove(+id,body);
  }
  @Post('recover/:id')
  recover(@Param('id') id: any) {
    return this.tasksService.recover(+id);
  }
}
