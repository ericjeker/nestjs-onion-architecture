import { PaginationDto } from '../../../../common/dtos/pagination.dto';

export class FindAllAlarmsDto extends PaginationDto {
  name?: string;
  severity?: string;
}
