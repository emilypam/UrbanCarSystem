import { PagedResult } from '../../Common/PagedResult';
import { TipoCombustibleEntity } from '../../Entities/TipoCombustibleEntity';

export interface ITipoCombustibleQueryRepository {
  findAll(page: number, pageSize: number): Promise<PagedResult<TipoCombustibleEntity>>;
  searchByNombre(nombre: string): Promise<TipoCombustibleEntity[]>;
}
