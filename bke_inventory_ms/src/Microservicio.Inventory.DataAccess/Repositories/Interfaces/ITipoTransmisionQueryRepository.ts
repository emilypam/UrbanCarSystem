import { PagedResult } from '../../Common/PagedResult';
import { TipoTransmisionEntity } from '../../Entities/TipoTransmisionEntity';

export interface ITipoTransmisionQueryRepository {
  findAll(page: number, pageSize: number): Promise<PagedResult<TipoTransmisionEntity>>;
  searchByNombre(nombre: string): Promise<TipoTransmisionEntity[]>;
}
