import { PrismaClient } from '@prisma/client';
import { SecurityDbContext } from '../../Microservicio.Security.DataAccess/Context/SecurityDbContext';
import { UsuarioQueryRepository } from '../../Microservicio.Security.DataAccess/Queries/UsuarioQueryRepository';
import { RolPermisoQueryRepository } from '../../Microservicio.Security.DataAccess/Queries/RolPermisoQueryRepository';
import { UsuarioRolQueryRepository } from '../../Microservicio.Security.DataAccess/Queries/UsuarioRolQueryRepository';
import { UnitOfWork } from '../../Microservicio.Security.DataManagement/Services/UnitOfWork';
import { UsuarioDataService } from '../../Microservicio.Security.DataManagement/Services/UsuarioDataService';
import { RolPermisoDataService } from '../../Microservicio.Security.DataManagement/Services/RolPermisoDataService';
import { UsuarioRolDataService } from '../../Microservicio.Security.DataManagement/Services/UsuarioRolDataService';
import { UsuarioService } from '../../Microservicio.Security.Business/Services/UsuarioService';
import { RolPermisoService } from '../../Microservicio.Security.Business/Services/RolPermisoService';
import { UsuarioRolService } from '../../Microservicio.Security.Business/Services/UsuarioRolService';
import { AuthService } from '../../Microservicio.Security.Business/Services/AuthService';

export interface ServiceContainer {
  usuarioService: UsuarioService;
  rolPermisoService: RolPermisoService;
  usuarioRolService: UsuarioRolService;
  authService: AuthService;
  prisma: PrismaClient;
}

export function buildServiceContainer(): ServiceContainer {
  const dbContext = SecurityDbContext.getInstance();
  const prisma = dbContext.client;

  // DataAccess — Queries (CQRS read side)
  const usuarioQueryRepo = new UsuarioQueryRepository(prisma);
  const rolPermisoQueryRepo = new RolPermisoQueryRepository(prisma);
  const usuarioRolQueryRepo = new UsuarioRolQueryRepository(prisma);

  // DataManagement — Unit of Work + Data Services
  const unitOfWork = new UnitOfWork(prisma);
  const usuarioDataService = new UsuarioDataService(unitOfWork, usuarioQueryRepo);
  const rolPermisoDataService = new RolPermisoDataService(unitOfWork, rolPermisoQueryRepo);
  const usuarioRolDataService = new UsuarioRolDataService(unitOfWork);

  // Business — Services
  const usuarioService = new UsuarioService(usuarioDataService);
  const rolPermisoService = new RolPermisoService(rolPermisoDataService);
  const usuarioRolService = new UsuarioRolService(
    usuarioRolDataService,
    usuarioDataService,
    rolPermisoDataService
  );
  const authService = new AuthService(usuarioDataService, usuarioRolQueryRepo);

  return { usuarioService, rolPermisoService, usuarioRolService, authService, prisma };
}
