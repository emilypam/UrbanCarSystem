import { MantenimientoEntity } from '../../Microservicio.Inventory.DataAccess/Entities/MantenimientoEntity';
import { MantenimientoDataModel } from '../Models/MantenimientoDataModel';

export class MantenimientoDataMapper {
  static toDataModel(entity: MantenimientoEntity): MantenimientoDataModel {
    return {
      mantenimientoId: entity.man_id,
      vehiculoId: entity.veh_id,
      fecha: entity.man_fecha,
      descripcion: entity.man_descripcion,
      costo: entity.man_costo,
      siguienteKm: entity.man_siguiente_km,
    };
  }

  static toEntity(model: MantenimientoDataModel): MantenimientoEntity {
    return {
      man_id: model.mantenimientoId,
      veh_id: model.vehiculoId,
      man_fecha: model.fecha,
      man_descripcion: model.descripcion,
      man_costo: model.costo,
      man_siguiente_km: model.siguienteKm,
    };
  }

  static toDataModelList(entities: MantenimientoEntity[]): MantenimientoDataModel[] {
    return entities.map((e) => MantenimientoDataMapper.toDataModel(e));
  }
}
