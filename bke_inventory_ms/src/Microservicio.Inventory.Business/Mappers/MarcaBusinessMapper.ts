import { MarcaDataModel } from '../../Microservicio.Inventory.DataManagement/Models/MarcaDataModel';
import { CrearMarcaDto } from '../DTOs/Marca/CrearMarcaDto';
import { MarcaResponseDto } from '../DTOs/Marca/MarcaResponseDto';

export class MarcaBusinessMapper {
  static toDataModel(dto: CrearMarcaDto, id?: string): MarcaDataModel {
    return { marcaId: id ?? '', nombre: dto.nombre };
  }

  static toResponseDto(model: MarcaDataModel): MarcaResponseDto {
    return { marcaId: model.marcaId, nombre: model.nombre };
  }

  static toResponseDtoList(models: MarcaDataModel[]): MarcaResponseDto[] {
    return models.map((m) => MarcaBusinessMapper.toResponseDto(m));
  }
}
