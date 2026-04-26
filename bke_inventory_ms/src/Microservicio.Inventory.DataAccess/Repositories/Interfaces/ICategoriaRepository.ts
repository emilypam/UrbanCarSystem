import { CategoriaEntity } from '../../Entities/CategoriaEntity';

export interface ICategoriaRepository {
  findById(id: string): Promise<CategoriaEntity | null>;
  findByNombre(nombre: string): Promise<CategoriaEntity | null>;
  findAll(): Promise<CategoriaEntity[]>;
  create(entity: Omit<CategoriaEntity, 'cat_id'>): Promise<CategoriaEntity>;
  update(id: string, entity: Partial<CategoriaEntity>): Promise<CategoriaEntity>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
