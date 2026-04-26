import { VehiculoDataModel } from '../../Microservicio.Inventory.DataManagement/Models/VehiculoDataModel';
import { CrearVehiculoDto } from '../DTOs/Vehiculo/CrearVehiculoDto';
import { VehiculoResponseDto } from '../DTOs/Vehiculo/VehiculoResponseDto';

export class VehiculoBusinessMapper {
  static toDataModel(dto: CrearVehiculoDto, id?: string): VehiculoDataModel {
    return {
      vehiculoId: id ?? '',
      modeloId: dto.modeloId ?? null,
      categoriaId: dto.categoriaId ?? null,
      combustibleId: dto.combustibleId ?? null,
      transmisionId: dto.transmisionId ?? null,
      estadoId: dto.estadoId ?? null,
      placa: dto.placa,
      anio: dto.anio,
      color: dto.color ?? null,
      precioDia: dto.precioDia,
      kilometraje: dto.kilometraje ?? null,
      createdAt: null,
    };
  }

  static toResponseDto(model: VehiculoDataModel): VehiculoResponseDto {
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

  static toResponseDtoList(models: VehiculoDataModel[]): VehiculoResponseDto[] {
    return models.map((m) => VehiculoBusinessMapper.toResponseDto(m));
  }
}
