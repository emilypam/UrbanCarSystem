import { PrismaClient } from '../../generated/prisma';

// Los tipos del cliente generado se actualizan al correr: npx prisma generate
type PrismaLogLevel = 'query' | 'info' | 'warn' | 'error';

export class SecurityDbContext {
  private static instance: SecurityDbContext;
  public readonly client: PrismaClient;

  private constructor() {
    const logLevels: PrismaLogLevel[] =
      process.env['NODE_ENV'] === 'development'
        ? ['query', 'warn', 'error']
        : ['error'];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.client = new PrismaClient({ log: logLevels } as any);
  }

  public static getInstance(): SecurityDbContext {
    if (!SecurityDbContext.instance) {
      SecurityDbContext.instance = new SecurityDbContext();
    }
    return SecurityDbContext.instance;
  }

  public async connect(): Promise<void> {
    await this.client.$connect();
  }

  public async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
