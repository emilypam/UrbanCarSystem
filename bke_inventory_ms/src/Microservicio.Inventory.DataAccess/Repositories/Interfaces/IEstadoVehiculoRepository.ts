import { EstadoVehiculoEntity } from '../../Entities/EstadoVehiculoEntity';

export interface IEstadoVehiculoRepository {
  findById(id: string): Promise<EstadoVehiculoEntity | null>;
  findByNombre(nombre: string): Promise<EstadoVehiculoEntity | null>;
  findAll(): Promise<EstadoVehiculoEntity[]>;
  create(entity: Omit<EstadoVehiculoEntity, 'est_id'>): Promise<EstadoVehiculoEntity>;
  update(id: string, entity: Partial<EstadoVehiculoEntity>): Promise<EstadoVehiculoEntity>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
