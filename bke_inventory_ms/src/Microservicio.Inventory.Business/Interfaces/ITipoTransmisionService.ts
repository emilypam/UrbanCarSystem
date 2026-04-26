import { PagedResult } from '../Common/PagedResult';
import { ActualizarTipoTransmisionDto } from '../DTOs/TipoTransmision/ActualizarTipoTransmisionDto';
import { CrearTipoTransmisionDto } from '../DTOs/TipoTransmision/CrearTipoTransmisionDto';
import { TipoTransmisionResponseDto } from '../DTOs/TipoTransmision/TipoTransmisionResponseDto';

export interface ITipoTransmisionService {
  getAll(page: number, pageSize: number): Promise<PagedResult<TipoTransmisionResponseDto>>;
  getById(id: string): Promise<TipoTransmisionResponseDto>;
  create(dto: CrearTipoTransmisionDto): Promise<TipoTransmisionResponseDto>;
  update(id: string, dto: ActualizarTipoTransmisionDto): Promise<TipoTransmisionResponseDto>;
  delete(id: string): Promise<void>;
}
