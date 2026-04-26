import { PagedResult } from '../../Common/PagedResult';
import { ModeloEntity } from '../../Entities/ModeloEntity';

export interface IModeloQueryRepository {
  findAll(page: number, pageSize: number, marcaId?: string): Promise<PagedResult<ModeloEntity>>;
  findByMarcaId(marcaId: string): Promise<ModeloEntity[]>;
  searchByNombre(nombre: string): Promise<ModeloEntity[]>;
}
