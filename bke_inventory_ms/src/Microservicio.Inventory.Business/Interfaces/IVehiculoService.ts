import { PagedResult } from '../Common/PagedResult';
import { ActualizarVehiculoDto } from '../DTOs/Vehiculo/ActualizarVehiculoDto';
import { CrearVehiculoDto } from '../DTOs/Vehiculo/CrearVehiculoDto';
import { VehiculoResponseDto } from '../DTOs/Vehiculo/VehiculoResponseDto';

export interface IVehiculoService {
  getAll(page: number, pageSize: number, marcaId?: string, categoriaId?: string, estadoId?: string): Promise<PagedResult<VehiculoResponseDto>>;
  getById(id: string): Promise<VehiculoResponseDto>;
  create(dto: CrearVehiculoDto): Promise<VehiculoResponseDto>;
  update(id: string, dto: ActualizarVehiculoDto): Promise<VehiculoResponseDto>;
  updateKilometraje(id: string, nuevoKm: number): Promise<void>;
  delete(id: string): Promise<void>;
}
