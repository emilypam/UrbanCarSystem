import { MarcaEntity } from '../../Entities/MarcaEntity';

export interface IMarcaRepository {
  findById(id: string): Promise<MarcaEntity | null>;
  findByNombre(nombre: string): Promise<MarcaEntity | null>;
  findAll(): Promise<MarcaEntity[]>;
  create(entity: Omit<MarcaEntity, 'mar_id'>): Promise<MarcaEntity>;
  update(id: string, entity: Partial<MarcaEntity>): Promise<MarcaEntity>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
