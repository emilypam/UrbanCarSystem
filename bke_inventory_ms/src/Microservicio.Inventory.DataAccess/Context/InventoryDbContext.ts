import { PrismaClient } from '@prisma/client';
type PrismaLogLevel = 'query' | 'info' | 'warn' | 'error';

export class InventoryDbContext {
  private static instance: InventoryDbContext;
  public readonly client: PrismaClient;

  private constructor() {
    const logLevels: PrismaLogLevel[] =
      process.env['NODE_ENV'] === 'development' ? ['query', 'warn', 'error'] : ['error'];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.client = new PrismaClient({ log: logLevels } as any);
  }

  public static getInstance(): InventoryDbContext {
    if (!InventoryDbContext.instance) {
      InventoryDbContext.instance = new InventoryDbContext();
    }
    return InventoryDbContext.instance;
  }

  public async connect(): Promise<void> {
    await this.client.$connect();
  }

  public async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
