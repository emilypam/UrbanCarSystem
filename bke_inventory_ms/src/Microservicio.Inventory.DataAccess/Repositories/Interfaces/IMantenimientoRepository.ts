import { MantenimientoEntity } from '../../Entities/MantenimientoEntity';

export interface IMantenimientoRepository {
  findById(id: string): Promise<MantenimientoEntity | null>;
  findByVehiculoId(vehiculoId: string): Promise<MantenimientoEntity[]>;
  create(entity: Omit<MantenimientoEntity, 'man_id'>): Promise<MantenimientoEntity>;
  update(id: string, entity: Partial<MantenimientoEntity>): Promise<MantenimientoEntity>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
