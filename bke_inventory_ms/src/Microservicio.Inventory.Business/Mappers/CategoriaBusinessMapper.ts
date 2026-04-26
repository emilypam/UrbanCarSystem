import { CategoriaDataModel } from '../../Microservicio.Inventory.DataManagement/Models/CategoriaDataModel';
import { CrearCategoriaDto } from '../DTOs/Categoria/CrearCategoriaDto';
import { CategoriaResponseDto } from '../DTOs/Categoria/CategoriaResponseDto';

export class CategoriaBusinessMapper {
  static toDataModel(dto: CrearCategoriaDto, id?: string): CategoriaDataModel {
    return { categoriaId: id ?? '', nombre: dto.nombre };
  }

  static toResponseDto(model: CategoriaDataModel): CategoriaResponseDto {
    return { categoriaId: model.categoriaId, nombre: model.nombre };
  }

  static toResponseDtoList(models: CategoriaDataModel[]): CategoriaResponseDto[] {
    return models.map((m) => CategoriaBusinessMapper.toResponseDto(m));
  }
}
