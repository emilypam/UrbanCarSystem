import { TipoCombustibleEntity } from '../../Entities/TipoCombustibleEntity';

export interface ITipoCombustibleRepository {
  findById(id: string): Promise<TipoCombustibleEntity | null>;
  findByNombre(nombre: string): Promise<TipoCombustibleEntity | null>;
  findAll(): Promise<TipoCombustibleEntity[]>;
  create(entity: Omit<TipoCombustibleEntity, 'com_id'>): Promise<TipoCombustibleEntity>;
  update(id: string, entity: Partial<TipoCombustibleEntity>): Promise<TipoCombustibleEntity>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
