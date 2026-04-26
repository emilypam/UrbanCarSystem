import { UsuarioRolEntity } from '../../Microservicio.Security.DataAccess/Entities/UsuarioRolEntity';
import { UsuarioRolDataModel } from '../Models/UsuarioRolDataModel';

export class UsuarioRolDataMapper {
  static toDataModel(entity: UsuarioRolEntity): UsuarioRolDataModel {
    return {
      usuarioId: entity.usu_id,
      rolId: entity.rol_id,
    };
  }

  static toEntity(model: UsuarioRolDataModel): UsuarioRolEntity {
    return {
      usu_id: model.usuarioId,
      rol_id: model.rolId,
    };
  }

  static toDataModelList(entities: UsuarioRolEntity[]): UsuarioRolDataModel[] {
    return entities.map((e) => UsuarioRolDataMapper.toDataModel(e));
  }
}
