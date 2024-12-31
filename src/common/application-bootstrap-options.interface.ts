export enum PersistenceDrivers {
  Sqlite = 'sqlite',
  InMemory = 'in-memory',
}

export interface ApplicationBootstrapOptions {
  driver: PersistenceDrivers;
}
