import { UsuarioDataModel } from '../../Microservicio.Security.DataManagement/Models/UsuarioDataModel';
import { UsuarioResponse } from '../DTOs/Usuario/UsuarioResponse';
import { CrearUsuarioRequest } from '../DTOs/Usuario/CrearUsuarioRequest';

export class UsuarioBusinessMapper {
  static toResponse(model: UsuarioDataModel): UsuarioResponse {
    return {
      usuarioId: model.usuarioId,
      email: model.email,
      nombre: model.nombre,
      createdAt: model.createdAt,
    };
  }

  static toDataModel(request: CrearUsuarioRequest): UsuarioDataModel {
    return {
      usuarioId: request.usuarioId,
      email: request.email,
      nombre: request.nombre ?? null,
      createdAt: null,
    };
  }

  static toResponseList(models: UsuarioDataModel[]): UsuarioResponse[] {
    return models.map((m) => UsuarioBusinessMapper.toResponse(m));
  }
}
