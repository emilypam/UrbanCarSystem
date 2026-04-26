import { PagedResult } from '../Common/PagedResult';
import { ActualizarCategoriaDto } from '../DTOs/Categoria/ActualizarCategoriaDto';
import { CrearCategoriaDto } from '../DTOs/Categoria/CrearCategoriaDto';
import { CategoriaResponseDto } from '../DTOs/Categoria/CategoriaResponseDto';

export interface ICategoriaService {
  getAll(page: number, pageSize: number): Promise<PagedResult<CategoriaResponseDto>>;
  getById(id: string): Promise<CategoriaResponseDto>;
  create(dto: CrearCategoriaDto): Promise<CategoriaResponseDto>;
  update(id: string, dto: ActualizarCategoriaDto): Promise<CategoriaResponseDto>;
  delete(id: string): Promise<void>;
}
