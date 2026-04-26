import { MantenimientoDataModel } from '../../Microservicio.Inventory.DataManagement/Models/MantenimientoDataModel';
import { CrearMantenimientoDto } from '../DTOs/Mantenimiento/CrearMantenimientoDto';
import { MantenimientoResponseDto } from '../DTOs/Mantenimiento/MantenimientoResponseDto';

export class MantenimientoBusinessMapper {
  static toDataModel(dto: CrearMantenimientoDto, id?: string): MantenimientoDataModel {
    return {
      mantenimientoId: id ?? '',
      vehiculoId: dto.vehiculoId ?? null,
      fecha: new Date(dto.fecha),
      descripcion: dto.descripcion,
      costo: dto.costo ?? null,
      siguienteKm: dto.siguienteKm ?? null,
    };
  }

  static toResponseDto(model: MantenimientoDataModel): MantenimientoResponseDto {
    return {
      mantenimientoId: model.mantenimientoId,
      vehiculoId: model.vehiculoId,
      fecha: model.fecha,
      descripcion: model.descripcion,
      costo: model.costo,
      siguienteKm: model.siguienteKm,
    };
  }

  static toResponseDtoList(models: MantenimientoDataModel[]): MantenimientoResponseDto[] {
    return models.map((m) => MantenimientoBusinessMapper.toResponseDto(m));
  }
}
