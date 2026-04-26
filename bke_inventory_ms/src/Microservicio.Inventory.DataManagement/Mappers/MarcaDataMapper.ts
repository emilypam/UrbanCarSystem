import { MarcaEntity } from '../../Microservicio.Inventory.DataAccess/Entities/MarcaEntity';
import { MarcaDataModel } from '../Models/MarcaDataModel';

export class MarcaDataMapper {
  static toDataModel(entity: MarcaEntity): MarcaDataModel {
    return { marcaId: entity.mar_id, nombre: entity.mar_nombre };
  }

  static toEntity(model: MarcaDataModel): MarcaEntity {
    return { mar_id: model.marcaId, mar_nombre: model.nombre };
  }

  static toDataModelList(entities: MarcaEntity[]): MarcaDataModel[] {
    return entities.map((e) => MarcaDataMapper.toDataModel(e));
  }
}
