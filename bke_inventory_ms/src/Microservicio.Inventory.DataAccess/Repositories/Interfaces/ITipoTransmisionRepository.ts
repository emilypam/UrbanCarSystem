import { TipoTransmisionEntity } from '../../Entities/TipoTransmisionEntity';

export interface ITipoTransmisionRepository {
  findById(id: string): Promise<TipoTransmisionEntity | null>;
  findByNombre(nombre: string): Promise<TipoTransmisionEntity | null>;
  findAll(): Promise<TipoTransmisionEntity[]>;
  create(entity: Omit<TipoTransmisionEntity, 'tra_id'>): Promise<TipoTransmisionEntity>;
  update(id: string, entity: Partial<TipoTransmisionEntity>): Promise<TipoTransmisionEntity>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
