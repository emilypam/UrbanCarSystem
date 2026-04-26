import { PagedResult } from '../../Common/PagedResult';
import { MarcaEntity } from '../../Entities/MarcaEntity';

export interface IMarcaQueryRepository {
  findAll(page: number, pageSize: number): Promise<PagedResult<MarcaEntity>>;
  searchByNombre(nombre: string): Promise<MarcaEntity[]>;
}
