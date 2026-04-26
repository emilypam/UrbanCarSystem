import { PagedResult } from '../../Common/PagedResult';
import { MantenimientoEntity } from '../../Entities/MantenimientoEntity';

export interface IMantenimientoQueryRepository {
  findAll(page: number, pageSize: number): Promise<PagedResult<MantenimientoEntity>>;
  findByVehiculoId(vehiculoId: string, page: number, pageSize: number): Promise<PagedResult<MantenimientoEntity>>;
}
