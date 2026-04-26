import { VehiculoEntity } from '../../Entities/VehiculoEntity';

export interface IVehiculoRepository {
  findById(id: string): Promise<VehiculoEntity | null>;
  findByPlaca(placa: string): Promise<VehiculoEntity | null>;
  create(entity: Omit<VehiculoEntity, 'veh_id' | 'veh_created_at'>): Promise<VehiculoEntity>;
  update(id: string, entity: Partial<VehiculoEntity>): Promise<VehiculoEntity>;
  updateKilometraje(id: string, nuevoKm: number): Promise<void>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
