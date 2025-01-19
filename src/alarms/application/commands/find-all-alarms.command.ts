import { PaginationCommand } from '../../../common/commands/pagination.command';

export class FindAllAlarmsCommand extends PaginationCommand {
  constructor(
    public readonly name: string,
    public readonly severity: string,
    public readonly page?: number,
    public readonly limit?: number,
    public readonly populate?: string[],
    public readonly orderBy?: Record<string, 'ASC' | 'DESC'>,
    public readonly having?: Record<string, any>,
  ) {
    super(page, limit, populate, orderBy, having);
  }
}
