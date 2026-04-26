import { TipoTransmisionEntity } from '../../Microservicio.Inventory.DataAccess/Entities/TipoTransmisionEntity';
import { TipoTransmisionDataModel } from '../Models/TipoTransmisionDataModel';

export class TipoTransmisionDataMapper {
  static toDataModel(entity: TipoTransmisionEntity): TipoTransmisionDataModel {
    return { tipoTransmisionId: entity.tra_id, nombre: entity.tra_nombre };
  }

  static toEntity(model: TipoTransmisionDataModel): TipoTransmisionEntity {
    return { tra_id: model.tipoTransmisionId, tra_nombre: model.nombre };
  }

  static toDataModelList(entities: TipoTransmisionEntity[]): TipoTransmisionDataModel[] {
    return entities.map((e) => TipoTransmisionDataMapper.toDataModel(e));
  }
}
