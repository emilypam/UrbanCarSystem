import { EstadoVehiculoDataModel } from '../../Microservicio.Inventory.DataManagement/Models/EstadoVehiculoDataModel';
import { CrearEstadoVehiculoDto } from '../DTOs/EstadoVehiculo/CrearEstadoVehiculoDto';
import { EstadoVehiculoResponseDto } from '../DTOs/EstadoVehiculo/EstadoVehiculoResponseDto';

export class EstadoVehiculoBusinessMapper {
  static toDataModel(dto: CrearEstadoVehiculoDto, id?: string): EstadoVehiculoDataModel {
    return { estadoVehiculoId: id ?? '', nombre: dto.nombre };
  }

  static toResponseDto(model: EstadoVehiculoDataModel): EstadoVehiculoResponseDto {
    return { estadoVehiculoId: model.estadoVehiculoId, nombre: model.nombre };
  }

  static toResponseDtoList(models: EstadoVehiculoDataModel[]): EstadoVehiculoResponseDto[] {
    return models.map((m) => EstadoVehiculoBusinessMapper.toResponseDto(m));
  }
}
