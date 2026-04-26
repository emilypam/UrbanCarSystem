import { PagedResult } from '../Common/PagedResult';
import { ActualizarMarcaDto } from '../DTOs/Marca/ActualizarMarcaDto';
import { CrearMarcaDto } from '../DTOs/Marca/CrearMarcaDto';
import { MarcaResponseDto } from '../DTOs/Marca/MarcaResponseDto';

export interface IMarcaService {
  getAll(page: number, pageSize: number): Promise<PagedResult<MarcaResponseDto>>;
  getById(id: string): Promise<MarcaResponseDto>;
  create(dto: CrearMarcaDto): Promise<MarcaResponseDto>;
  update(id: string, dto: ActualizarMarcaDto): Promise<MarcaResponseDto>;
  delete(id: string): Promise<void>;
}
