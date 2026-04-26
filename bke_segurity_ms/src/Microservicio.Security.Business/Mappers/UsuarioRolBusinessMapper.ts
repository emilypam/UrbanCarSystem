import { UsuarioRolDataModel } from '../../Microservicio.Security.DataManagement/Models/UsuarioRolDataModel';
import { UsuarioRolResponse } from '../DTOs/UsuarioRol/UsuarioRolResponse';

export class UsuarioRolBusinessMapper {
  static toResponse(model: UsuarioRolDataModel): UsuarioRolResponse {
    return {
      usuarioId: model.usuarioId,
      rolId: model.rolId,
    };
  }

  static toResponseList(models: UsuarioRolDataModel[]): UsuarioRolResponse[] {
    return models.map((m) => UsuarioRolBusinessMapper.toResponse(m));
  }
}
