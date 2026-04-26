import { IUsuarioRolService } from '../Interfaces/IUsuarioRolService';
import { IUsuarioRolDataService } from '../../Microservicio.Security.DataManagement/Interfaces/IUsuarioRolDataService';
import { IUsuarioDataService } from '../../Microservicio.Security.DataManagement/Interfaces/IUsuarioDataService';
import { IRolPermisoDataService } from '../../Microservicio.Security.DataManagement/Interfaces/IRolPermisoDataService';
import { AsignarRolRequest } from '../DTOs/UsuarioRol/AsignarRolRequest';
import { UsuarioRolResponse } from '../DTOs/UsuarioRol/UsuarioRolResponse';
import { UsuarioRolBusinessMapper } from '../Mappers/UsuarioRolBusinessMapper';
import { NotFoundException } from '../Exceptions/NotFoundException';
import { BusinessException } from '../Exceptions/BusinessException';

export class UsuarioRolService implements IUsuarioRolService {
  constructor(
    private readonly usuarioRolDataService: IUsuarioRolDataService,
    private readonly usuarioDataService: IUsuarioDataService,
    private readonly rolPermisoDataService: IRolPermisoDataService
  ) {}

  async getByUsuarioId(usuarioId: string): Promise<UsuarioRolResponse[]> {
    const exists = await this.usuarioDataService.exists(usuarioId);
    if (!exists) throw new NotFoundException('Usuario', usuarioId);
    const models = await this.usuarioRolDataService.getByUsuarioId(usuarioId);
    return UsuarioRolBusinessMapper.toResponseList(models);
  }

  async asignarRol(request: AsignarRolRequest): Promise<UsuarioRolResponse> {
    const usuarioExists = await this.usuarioDataService.exists(request.usuarioId);
    if (!usuarioExists) throw new NotFoundException('Usuario', request.usuarioId);

    const rolExists = await this.rolPermisoDataService.exists(request.rolId);
    if (!rolExists) throw new NotFoundException('RolPermiso', request.rolId);

    const alreadyAssigned = await this.usuarioRolDataService.exists(request.usuarioId, request.rolId);
    if (alreadyAssigned) {
      throw new BusinessException('El usuario ya tiene asignado este rol.', 409);
    }

    const model = await this.usuarioRolDataService.assign(request.usuarioId, request.rolId);
    return UsuarioRolBusinessMapper.toResponse(model);
  }

  async removerRol(usuarioId: string, rolId: string): Promise<void> {
    const exists = await this.usuarioRolDataService.exists(usuarioId, rolId);
    if (!exists) throw new NotFoundException('UsuarioRol', `${usuarioId}/${rolId}`);
    await this.usuarioRolDataService.remove(usuarioId, rolId);
  }
}
