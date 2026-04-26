import { PagedResult } from '../Common/PagedResult';
import { ActualizarTipoCombustibleDto } from '../DTOs/TipoCombustible/ActualizarTipoCombustibleDto';
import { CrearTipoCombustibleDto } from '../DTOs/TipoCombustible/CrearTipoCombustibleDto';
import { TipoCombustibleResponseDto } from '../DTOs/TipoCombustible/TipoCombustibleResponseDto';

export interface ITipoCombustibleService {
  getAll(page: number, pageSize: number): Promise<PagedResult<TipoCombustibleResponseDto>>;
  getById(id: string): Promise<TipoCombustibleResponseDto>;
  create(dto: CrearTipoCombustibleDto): Promise<TipoCombustibleResponseDto>;
  update(id: string, dto: ActualizarTipoCombustibleDto): Promise<TipoCombustibleResponseDto>;
  delete(id: string): Promise<void>;
}
