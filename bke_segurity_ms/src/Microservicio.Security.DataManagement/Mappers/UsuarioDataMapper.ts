import { UsuarioEntity } from '../../Microservicio.Security.DataAccess/Entities/UsuarioEntity';
import { UsuarioDataModel } from '../Models/UsuarioDataModel';

export class UsuarioDataMapper {
  static toDataModel(entity: UsuarioEntity): UsuarioDataModel {
    return {
      usuarioId: entity.usu_id,
      email: entity.usu_email,
      nombre: entity.usu_nombre,
      createdAt: entity.usu_created_at,
      password: entity.usu_password ?? null,
    };
  }

  static toEntity(model: UsuarioDataModel): UsuarioEntity {
    return {
      usu_id: model.usuarioId,
      usu_email: model.email,
      usu_nombre: model.nombre,
      usu_created_at: model.createdAt,
      usu_password: model.password ?? null,
    };
  }

  static toDataModelList(entities: UsuarioEntity[]): UsuarioDataModel[] {
    return entities.map((e) => UsuarioDataMapper.toDataModel(e));
  }
}
