import { IUsuarioRolDataService } from '../Interfaces/IUsuarioRolDataService';
import { IUnitOfWork } from '../Interfaces/IUnitOfWork';
import { UsuarioRolDataModel } from '../Models/UsuarioRolDataModel';
import { UsuarioRolDataMapper } from '../Mappers/UsuarioRolDataMapper';

export class UsuarioRolDataService implements IUsuarioRolDataService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async getByUsuarioId(usuarioId: string): Promise<UsuarioRolDataModel[]> {
    const entities = await this.unitOfWork.usuarioRoles.findByUsuarioId(usuarioId);
    return UsuarioRolDataMapper.toDataModelList(entities);
  }

  async getByRolId(rolId: string): Promise<UsuarioRolDataModel[]> {
    const entities = await this.unitOfWork.usuarioRoles.findByRolId(rolId);
    return UsuarioRolDataMapper.toDataModelList(entities);
  }

  async assign(usuarioId: string, rolId: string): Promise<UsuarioRolDataModel> {
    const entity = await this.unitOfWork.usuarioRoles.assign(usuarioId, rolId);
    return UsuarioRolDataMapper.toDataModel(entity);
  }

  async remove(usuarioId: string, rolId: string): Promise<void> {
    await this.unitOfWork.usuarioRoles.remove(usuarioId, rolId);
  }

  async exists(usuarioId: string, rolId: string): Promise<boolean> {
    return this.unitOfWork.usuarioRoles.exists(usuarioId, rolId);
  }
}
