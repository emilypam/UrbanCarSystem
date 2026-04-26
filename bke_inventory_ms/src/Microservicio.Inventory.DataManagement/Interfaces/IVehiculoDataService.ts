import { DataPagedResult } from '../Models/DataPagedResult';
import { VehiculoDataModel } from '../Models/VehiculoDataModel';
import { VehiculoFiltroDataModel } from '../Models/VehiculoFiltroDataModel';

export interface IVehiculoDataService {
  getAll(filtro: VehiculoFiltroDataModel): Promise<DataPagedResult<VehiculoDataModel>>;
  getById(id: string): Promise<VehiculoDataModel | null>;
  getByPlaca(placa: string): Promise<VehiculoDataModel | null>;
  create(model: VehiculoDataModel): Promise<VehiculoDataModel>;
  update(model: VehiculoDataModel): Promise<VehiculoDataModel>;
  updateKilometraje(id: string, nuevoKm: number): Promise<void>;
  delete(id: string): Promise<void>;
}
