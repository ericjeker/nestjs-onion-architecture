import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Alarm } from '../../domain/alarm';
import { AlarmStatus } from '../../domain/value-objects/status';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { UpdateAlarmDto } from './dto/update-alarm.dto';
import { FindAllAlarmsDto } from './dto/find-all-alarms.dto';
import { AlarmsService } from '../../application/alarms.service';
import { CreateAlarmCommand } from '../../application/commands/create-alarm.command';
import { UpdateAlarmCommand } from '../../application/commands/update-alarm.command';
import { FindAllAlarmsCommand } from '../../application/commands/find-all-alarms.command';
import { AlarmUpdateStatusUseCase } from '../../application/use-cases/update-status-use.case';
import { AlarmUpdateStatusCommand } from '../../application/commands/update-status.command';

@Controller('alarms')
export class AlarmsController {
  constructor(
    private readonly alarmsService: AlarmsService,
    private readonly alarmUpdateStatusUseCase: AlarmUpdateStatusUseCase,
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlarmDto: UpdateAlarmDto) {
    return this.alarmsService.update(
      new UpdateAlarmCommand(id, updateAlarmDto.name, updateAlarmDto.severity),
    );
  }

  @Patch(':id/status/:status')
  updateStatus(
    @Param('id') id: string,
    @Param('status') status: AlarmStatus,
  ): Promise<Alarm> {
    return this.alarmUpdateStatusUseCase.execute(
      new AlarmUpdateStatusCommand(id, status),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alarmsService.remove(id);
  }
}
