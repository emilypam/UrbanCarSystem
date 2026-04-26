import { ModeloDataModel } from '../../Microservicio.Inventory.DataManagement/Models/ModeloDataModel';
import { CrearModeloDto } from '../DTOs/Modelo/CrearModeloDto';
import { ModeloResponseDto } from '../DTOs/Modelo/ModeloResponseDto';

export class ModeloBusinessMapper {
  static toDataModel(dto: CrearModeloDto, id?: string): ModeloDataModel {
    return { modeloId: id ?? '', marcaId: dto.marcaId ?? null, nombre: dto.nombre };
  }

  static toResponseDto(model: ModeloDataModel): ModeloResponseDto {
    return { modeloId: model.modeloId, marcaId: model.marcaId, nombre: model.nombre };
  }

  static toResponseDtoList(models: ModeloDataModel[]): ModeloResponseDto[] {
    return models.map((m) => ModeloBusinessMapper.toResponseDto(m));
  }
}
