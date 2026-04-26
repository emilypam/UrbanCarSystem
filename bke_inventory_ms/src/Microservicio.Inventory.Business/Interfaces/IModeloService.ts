import { PagedResult } from '../Common/PagedResult';
import { ActualizarModeloDto } from '../DTOs/Modelo/ActualizarModeloDto';
import { CrearModeloDto } from '../DTOs/Modelo/CrearModeloDto';
import { ModeloResponseDto } from '../DTOs/Modelo/ModeloResponseDto';

export interface IModeloService {
  getAll(page: number, pageSize: number, marcaId?: string): Promise<PagedResult<ModeloResponseDto>>;
  getById(id: string): Promise<ModeloResponseDto>;
  create(dto: CrearModeloDto): Promise<ModeloResponseDto>;
  update(id: string, dto: ActualizarModeloDto): Promise<ModeloResponseDto>;
  delete(id: string): Promise<void>;
}
