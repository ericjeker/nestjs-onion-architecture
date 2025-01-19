export abstract class PaginationCommand {
  protected constructor(
    public readonly page?: number,
    public readonly limit?: number,
    public readonly populate?: string[],
    public readonly orderBy?: Record<string, 'ASC' | 'DESC'>,
    public readonly having?: Record<string, any>,
  ) {}
}
