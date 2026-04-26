import { ModeloEntity } from '../../Entities/ModeloEntity';

export interface IModeloRepository {
  findById(id: string): Promise<ModeloEntity | null>;
  findByMarcaId(marcaId: string): Promise<ModeloEntity[]>;
  create(entity: Omit<ModeloEntity, 'mod_id'>): Promise<ModeloEntity>;
  update(id: string, entity: Partial<ModeloEntity>): Promise<ModeloEntity>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
