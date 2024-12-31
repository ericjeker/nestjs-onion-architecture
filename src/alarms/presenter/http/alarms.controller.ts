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
import { FindAllAlarmsDto } from './dto/find-all-alarms.dto';
import { FindAllAlarmsCommand } from '../../application/commands/find-all-alarms.command';
import { MarkAsResolvedUseCase } from '../../application/use-cases/mark-as-resolved.use-case';
import { MarkAlarmAsResolvedCommand } from '../../application/commands/mark-as-resolved.command';
import { Alarm } from '../../domain/alarm';

@Controller('alarms')
export class AlarmsController {
  constructor(
    private readonly alarmsService: AlarmsService,
    private readonly markAsResolvedUseCase: MarkAsResolvedUseCase,
  ) {}

  @Post()
  create(@Body() createAlarmDto: CreateAlarmDto) {
    return this.alarmsService.create(
      new CreateAlarmCommand(createAlarmDto.name, createAlarmDto.severity),
    );
  }

  @Get()
  findAll(@Body() findAllAlarmsDto: FindAllAlarmsDto) {
    return this.alarmsService.findAll(
      new FindAllAlarmsCommand(
        findAllAlarmsDto.name,
        findAllAlarmsDto.severity,
        findAllAlarmsDto.page,
        findAllAlarmsDto.limit,
      ),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alarmsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlarmDto: UpdateAlarmDto) {
    return this.alarmsService.update(
      new UpdateAlarmCommand(id, updateAlarmDto.name, updateAlarmDto.severity),
    );
  }

  @Patch(':id')
  markAsResolved(@Param('id') id: string): Promise<Alarm> {
    return this.markAsResolvedUseCase.execute(
      new MarkAlarmAsResolvedCommand(id),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alarmsService.remove(id);
  }
}
