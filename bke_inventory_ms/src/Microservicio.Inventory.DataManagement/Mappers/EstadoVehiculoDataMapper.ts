import { EstadoVehiculoEntity } from '../../Microservicio.Inventory.DataAccess/Entities/EstadoVehiculoEntity';
import { EstadoVehiculoDataModel } from '../Models/EstadoVehiculoDataModel';

export class EstadoVehiculoDataMapper {
  static toDataModel(entity: EstadoVehiculoEntity): EstadoVehiculoDataModel {
    return { estadoVehiculoId: entity.est_id, nombre: entity.est_nombre };
  }

  static toEntity(model: EstadoVehiculoDataModel): EstadoVehiculoEntity {
    return { est_id: model.estadoVehiculoId, est_nombre: model.nombre };
  }

  static toDataModelList(entities: EstadoVehiculoEntity[]): EstadoVehiculoDataModel[] {
    return entities.map((e) => EstadoVehiculoDataMapper.toDataModel(e));
  }
}
