import { ModeloEntity } from '../../Microservicio.Inventory.DataAccess/Entities/ModeloEntity';
import { ModeloDataModel } from '../Models/ModeloDataModel';

export class ModeloDataMapper {
  static toDataModel(entity: ModeloEntity): ModeloDataModel {
    return { modeloId: entity.mod_id, marcaId: entity.mar_id, nombre: entity.mod_nombre };
  }

  static toEntity(model: ModeloDataModel): ModeloEntity {
    return { mod_id: model.modeloId, mar_id: model.marcaId, mod_nombre: model.nombre };
  }

  static toDataModelList(entities: ModeloEntity[]): ModeloDataModel[] {
    return entities.map((e) => ModeloDataMapper.toDataModel(e));
  }
}
