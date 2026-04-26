import { VehiculoEntity } from '../../Microservicio.Inventory.DataAccess/Entities/VehiculoEntity';
import { VehiculoDataModel } from '../Models/VehiculoDataModel';

export class VehiculoDataMapper {
  static toDataModel(entity: VehiculoEntity): VehiculoDataModel {
    return {
      vehiculoId: entity.veh_id,
      modeloId: entity.mod_id,
      categoriaId: entity.cat_id,
      combustibleId: entity.com_id,
      transmisionId: entity.tra_id,
      estadoId: entity.est_id,
      placa: entity.veh_placa,
      anio: entity.veh_anio,
      color: entity.veh_color,
      precioDia: entity.veh_precio_dia,
      kilometraje: entity.veh_kilometraje,
      createdAt: entity.veh_created_at,
    };
  }

  static toEntity(model: VehiculoDataModel): VehiculoEntity {
    return {
      veh_id: model.vehiculoId,
      mod_id: model.modeloId,
      cat_id: model.categoriaId,
      com_id: model.combustibleId,
      tra_id: model.transmisionId,
      est_id: model.estadoId,
      veh_placa: model.placa,
      veh_anio: model.anio,
      veh_color: model.color,
      veh_precio_dia: model.precioDia,
      veh_kilometraje: model.kilometraje,
      veh_created_at: model.createdAt,
    };
  }

  static toDataModelList(entities: VehiculoEntity[]): VehiculoDataModel[] {
    return entities.map((e) => VehiculoDataMapper.toDataModel(e));
  }
}
