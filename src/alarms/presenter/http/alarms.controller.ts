import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AlarmsService } from '../../application/alarms.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { UpdateAlarmDto } from './dto/update-alarm.dto';
import { CreateAlarmCommand } from '../../application/commands/create-alarm.command';
import { UpdateAlarmCommand } from '../../application/commands/update-alarm.command';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  create(@Body() createAlarmDto: CreateAlarmDto) {
    return this.alarmsService.create(
      new CreateAlarmCommand(createAlarmDto.name, createAlarmDto.severity),
    );
  }

  @Get()
  findAll() {
    return this.alarmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alarmsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlarmDto: UpdateAlarmDto) {
    return this.alarmsService.update(
      id,
      new UpdateAlarmCommand(+id, updateAlarmDto.name, updateAlarmDto.severity),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alarmsService.remove(id);
  }
}
