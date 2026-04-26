import { PagedResult } from '../../Common/PagedResult';
import { CategoriaEntity } from '../../Entities/CategoriaEntity';

export interface ICategoriaQueryRepository {
  findAll(page: number, pageSize: number): Promise<PagedResult<CategoriaEntity>>;
  searchByNombre(nombre: string): Promise<CategoriaEntity[]>;
}
