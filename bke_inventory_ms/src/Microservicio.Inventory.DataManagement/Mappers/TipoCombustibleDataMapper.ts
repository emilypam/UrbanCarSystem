import { TipoCombustibleEntity } from '../../Microservicio.Inventory.DataAccess/Entities/TipoCombustibleEntity';
import { TipoCombustibleDataModel } from '../Models/TipoCombustibleDataModel';

export class TipoCombustibleDataMapper {
  static toDataModel(entity: TipoCombustibleEntity): TipoCombustibleDataModel {
    return { tipoCombustibleId: entity.com_id, nombre: entity.com_nombre };
  }

  static toEntity(model: TipoCombustibleDataModel): TipoCombustibleEntity {
    return { com_id: model.tipoCombustibleId, com_nombre: model.nombre };
  }

  static toDataModelList(entities: TipoCombustibleEntity[]): TipoCombustibleDataModel[] {
    return entities.map((e) => TipoCombustibleDataMapper.toDataModel(e));
  }
}
