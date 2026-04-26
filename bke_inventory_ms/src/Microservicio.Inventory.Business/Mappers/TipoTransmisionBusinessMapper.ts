import { TipoTransmisionDataModel } from '../../Microservicio.Inventory.DataManagement/Models/TipoTransmisionDataModel';
import { CrearTipoTransmisionDto } from '../DTOs/TipoTransmision/CrearTipoTransmisionDto';
import { TipoTransmisionResponseDto } from '../DTOs/TipoTransmision/TipoTransmisionResponseDto';

export class TipoTransmisionBusinessMapper {
  static toDataModel(dto: CrearTipoTransmisionDto, id?: string): TipoTransmisionDataModel {
    return { tipoTransmisionId: id ?? '', nombre: dto.nombre };
  }

  static toResponseDto(model: TipoTransmisionDataModel): TipoTransmisionResponseDto {
    return { tipoTransmisionId: model.tipoTransmisionId, nombre: model.nombre };
  }

  static toResponseDtoList(models: TipoTransmisionDataModel[]): TipoTransmisionResponseDto[] {
    return models.map((m) => TipoTransmisionBusinessMapper.toResponseDto(m));
  }
}
