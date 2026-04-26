import { PagedResult } from '../Common/PagedResult';
import { ActualizarEstadoVehiculoDto } from '../DTOs/EstadoVehiculo/ActualizarEstadoVehiculoDto';
import { CrearEstadoVehiculoDto } from '../DTOs/EstadoVehiculo/CrearEstadoVehiculoDto';
import { EstadoVehiculoResponseDto } from '../DTOs/EstadoVehiculo/EstadoVehiculoResponseDto';

export interface IEstadoVehiculoService {
  getAll(page: number, pageSize: number): Promise<PagedResult<EstadoVehiculoResponseDto>>;
  getById(id: string): Promise<EstadoVehiculoResponseDto>;
  create(dto: CrearEstadoVehiculoDto): Promise<EstadoVehiculoResponseDto>;
  update(id: string, dto: ActualizarEstadoVehiculoDto): Promise<EstadoVehiculoResponseDto>;
  delete(id: string): Promise<void>;
}
