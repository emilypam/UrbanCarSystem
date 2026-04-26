import { RolPermisoDataModel } from '../../Microservicio.Security.DataManagement/Models/RolPermisoDataModel';
import { RolPermisoResponse } from '../DTOs/RolPermiso/RolPermisoResponse';
import { CrearRolPermisoRequest } from '../DTOs/RolPermiso/CrearRolPermisoRequest';

export class RolPermisoBusinessMapper {
  static toResponse(model: RolPermisoDataModel): RolPermisoResponse {
    return {
      rolId: model.rolId,
      nombre: model.nombre,
      descripcion: model.descripcion,
    };
  }

  static toDataModel(request: CrearRolPermisoRequest): Omit<RolPermisoDataModel, 'rolId'> {
    return {
      nombre: request.nombre,
      descripcion: request.descripcion ?? null,
    };
  }

  static toResponseList(models: RolPermisoDataModel[]): RolPermisoResponse[] {
    return models.map((m) => RolPermisoBusinessMapper.toResponse(m));
  }
}
