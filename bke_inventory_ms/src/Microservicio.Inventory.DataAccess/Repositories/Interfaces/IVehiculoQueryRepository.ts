import { PagedResult } from '../../Common/PagedResult';
import { VehiculoEntity } from '../../Entities/VehiculoEntity';

export interface VehiculoFiltros {
  marcaId?: string;
  categoriaId?: string;
  estadoId?: string;
}

export interface IVehiculoQueryRepository {
  findAll(page: number, pageSize: number, filtros?: VehiculoFiltros): Promise<PagedResult<VehiculoEntity>>;
  findByEstado(estadoId: string): Promise<VehiculoEntity[]>;
  searchByPlaca(placa: string): Promise<VehiculoEntity[]>;
}
