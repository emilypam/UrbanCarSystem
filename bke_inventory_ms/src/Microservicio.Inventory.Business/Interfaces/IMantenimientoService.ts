import { PagedResult } from '../Common/PagedResult';
import { ActualizarMantenimientoDto } from '../DTOs/Mantenimiento/ActualizarMantenimientoDto';
import { CrearMantenimientoDto } from '../DTOs/Mantenimiento/CrearMantenimientoDto';
import { MantenimientoResponseDto } from '../DTOs/Mantenimiento/MantenimientoResponseDto';

export interface IMantenimientoService {
  getAll(page: number, pageSize: number, vehiculoId?: string): Promise<PagedResult<MantenimientoResponseDto>>;
  getById(id: string): Promise<MantenimientoResponseDto>;
  create(dto: CrearMantenimientoDto): Promise<MantenimientoResponseDto>;
  update(id: string, dto: ActualizarMantenimientoDto): Promise<MantenimientoResponseDto>;
  delete(id: string): Promise<void>;
}
