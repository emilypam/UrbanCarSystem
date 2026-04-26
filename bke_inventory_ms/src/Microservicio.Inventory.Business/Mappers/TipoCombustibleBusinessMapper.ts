import { TipoCombustibleDataModel } from '../../Microservicio.Inventory.DataManagement/Models/TipoCombustibleDataModel';
import { CrearTipoCombustibleDto } from '../DTOs/TipoCombustible/CrearTipoCombustibleDto';
import { TipoCombustibleResponseDto } from '../DTOs/TipoCombustible/TipoCombustibleResponseDto';

export class TipoCombustibleBusinessMapper {
  static toDataModel(dto: CrearTipoCombustibleDto, id?: string): TipoCombustibleDataModel {
    return { tipoCombustibleId: id ?? '', nombre: dto.nombre };
  }

  static toResponseDto(model: TipoCombustibleDataModel): TipoCombustibleResponseDto {
    return { tipoCombustibleId: model.tipoCombustibleId, nombre: model.nombre };
  }

  static toResponseDtoList(models: TipoCombustibleDataModel[]): TipoCombustibleResponseDto[] {
    return models.map((m) => TipoCombustibleBusinessMapper.toResponseDto(m));
  }
}
