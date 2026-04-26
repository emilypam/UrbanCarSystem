import { PagedResult } from '../../Common/PagedResult';
import { EstadoVehiculoEntity } from '../../Entities/EstadoVehiculoEntity';

export interface IEstadoVehiculoQueryRepository {
  findAll(page: number, pageSize: number): Promise<PagedResult<EstadoVehiculoEntity>>;
  searchByNombre(nombre: string): Promise<EstadoVehiculoEntity[]>;
}
