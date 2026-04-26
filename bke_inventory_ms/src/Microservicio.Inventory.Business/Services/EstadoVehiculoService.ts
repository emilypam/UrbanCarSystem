import { v4 as uuidv4 } from 'uuid';
import { IUnitOfWork } from '../../Microservicio.Inventory.DataManagement/Interfaces/IUnitOfWork';
import { PagedResult } from '../Common/PagedResult';
import { ActualizarEstadoVehiculoDto } from '../DTOs/EstadoVehiculo/ActualizarEstadoVehiculoDto';
import { CrearEstadoVehiculoDto } from '../DTOs/EstadoVehiculo/CrearEstadoVehiculoDto';
import { EstadoVehiculoResponseDto } from '../DTOs/EstadoVehiculo/EstadoVehiculoResponseDto';
import { NotFoundException } from '../Exceptions/NotFoundException';
import { ValidationException } from '../Exceptions/ValidationException';
import { IEstadoVehiculoService } from '../Interfaces/IEstadoVehiculoService';
import { EstadoVehiculoBusinessMapper } from '../Mappers/EstadoVehiculoBusinessMapper';
import { EstadoVehiculoValidator } from '../Validators/EstadoVehiculoValidator';

export class EstadoVehiculoService implements IEstadoVehiculoService {
  constructor(private readonly uow: IUnitOfWork) {}

  async getAll(page: number, pageSize: number): Promise<PagedResult<EstadoVehiculoResponseDto>> {
    const result = await this.uow.estadosVehiculo.getAll({ page, pageSize });
    return {
      data: EstadoVehiculoBusinessMapper.toResponseDtoList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
  }

  async getById(id: string): Promise<EstadoVehiculoResponseDto> {
    const model = await this.uow.estadosVehiculo.getById(id);
    if (!model) throw new NotFoundException('EstadoVehiculo', id);
    return EstadoVehiculoBusinessMapper.toResponseDto(model);
  }

  async create(dto: CrearEstadoVehiculoDto): Promise<EstadoVehiculoResponseDto> {
    const { error } = EstadoVehiculoValidator.crear.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));
    const dataModel = EstadoVehiculoBusinessMapper.toDataModel(dto, uuidv4());
    const created = await this.uow.estadosVehiculo.create(dataModel);
    return EstadoVehiculoBusinessMapper.toResponseDto(created);
  }

  async update(id: string, dto: ActualizarEstadoVehiculoDto): Promise<EstadoVehiculoResponseDto> {
    const { error } = EstadoVehiculoValidator.actualizar.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));
    const existing = await this.uow.estadosVehiculo.getById(id);
    if (!existing) throw new NotFoundException('EstadoVehiculo', id);
    const dataModel = EstadoVehiculoBusinessMapper.toDataModel(dto, id);
    const updated = await this.uow.estadosVehiculo.update(dataModel);
    return EstadoVehiculoBusinessMapper.toResponseDto(updated);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.uow.estadosVehiculo.getById(id);
    if (!existing) throw new NotFoundException('EstadoVehiculo', id);
    await this.uow.estadosVehiculo.delete(id);
  }
}
