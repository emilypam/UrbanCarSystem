import { RolPermisoEntity } from '../../Microservicio.Security.DataAccess/Entities/RolPermisoEntity';
import { RolPermisoDataModel } from '../Models/RolPermisoDataModel';

export class RolPermisoDataMapper {
  static toDataModel(entity: RolPermisoEntity): RolPermisoDataModel {
    return {
      rolId: entity.rol_id,
      nombre: entity.rol_nombre,
      descripcion: entity.rol_descripcion,
    };
  }

  static toEntity(model: RolPermisoDataModel): RolPermisoEntity {
    return {
      rol_id: model.rolId,
      rol_nombre: model.nombre,
      rol_descripcion: model.descripcion,
    };
  }

  static toDataModelList(entities: RolPermisoEntity[]): RolPermisoDataModel[] {
    return entities.map((e) => RolPermisoDataMapper.toDataModel(e));
  }
}
