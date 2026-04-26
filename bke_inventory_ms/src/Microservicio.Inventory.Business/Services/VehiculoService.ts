import { v4 as uuidv4 } from 'uuid';
import { IUnitOfWork } from '../../Microservicio.Inventory.DataManagement/Interfaces/IUnitOfWork';
import { PagedResult } from '../Common/PagedResult';
import { ActualizarVehiculoDto } from '../DTOs/Vehiculo/ActualizarVehiculoDto';
import { CrearVehiculoDto } from '../DTOs/Vehiculo/CrearVehiculoDto';
import { VehiculoResponseDto } from '../DTOs/Vehiculo/VehiculoResponseDto';
import { BusinessException } from '../Exceptions/BusinessException';
import { NotFoundException } from '../Exceptions/NotFoundException';
import { ValidationException } from '../Exceptions/ValidationException';
import { IVehiculoService } from '../Interfaces/IVehiculoService';
import { VehiculoBusinessMapper } from '../Mappers/VehiculoBusinessMapper';
import { VehiculoValidator } from '../Validators/VehiculoValidator';

// Regla de Negocio: formato de placa colombiana estándar ABC-1234
const PLACA_REGEX = /^[A-Z]{3}-\d{4}$/;

export class VehiculoService implements IVehiculoService {

  constructor(private readonly uow: IUnitOfWork) {}

  async getAll(
    page: number,
    pageSize: number,
    marcaId?: string,
    categoriaId?: string,
    estadoId?: string,
  ): Promise<PagedResult<VehiculoResponseDto>> {
    const result = await this.uow.vehiculos.getAll({ page, pageSize, marcaId, categoriaId, estadoId });
    return {
      data: VehiculoBusinessMapper.toResponseDtoList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
  }

  async getById(id: string): Promise<VehiculoResponseDto> {
    const model = await this.uow.vehiculos.getById(id);
    if (!model) throw new NotFoundException('Vehiculo', id);
    return VehiculoBusinessMapper.toResponseDto(model);
  }

  async create(dto: CrearVehiculoDto): Promise<VehiculoResponseDto> {
    const { error } = VehiculoValidator.crear.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));

    if (!PLACA_REGEX.test(dto.placa)) {
      throw new BusinessException("Formato de placa inválido. Debe seguir el patrón ABC-1234.");
    }

    if (dto.precioDia <= 0) {
      throw new BusinessException("El precio por día debe ser mayor a 0.");
    }

    const existing = await this.uow.vehiculos.getByPlaca(dto.placa);
    if (existing) throw new BusinessException(`Ya existe un vehículo con la placa '${dto.placa}'.`);

    const dataModel = VehiculoBusinessMapper.toDataModel(dto, uuidv4());
    const created = await this.uow.vehiculos.create(dataModel);
    return VehiculoBusinessMapper.toResponseDto(created);
  }

  async update(id: string, dto: ActualizarVehiculoDto): Promise<VehiculoResponseDto> {
    const { error } = VehiculoValidator.actualizar.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));

    if (!PLACA_REGEX.test(dto.placa)) {
      throw new BusinessException("Formato de placa inválido. Debe seguir el patrón ABC-1234.");
    }

    if (dto.precioDia <= 0) {
      throw new BusinessException("El precio por día debe ser mayor a 0.");
    }

    const existing = await this.uow.vehiculos.getById(id);
    if (!existing) throw new NotFoundException('Vehiculo', id);

    const byPlaca = await this.uow.vehiculos.getByPlaca(dto.placa);
    if (byPlaca && byPlaca.vehiculoId !== id) {
      throw new BusinessException(`Ya existe un vehículo con la placa '${dto.placa}'.`);
    }

    const dataModel = VehiculoBusinessMapper.toDataModel(dto, id);
    const updated = await this.uow.vehiculos.update(dataModel);
    return VehiculoBusinessMapper.toResponseDto(updated);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.uow.vehiculos.getById(id);
    if (!existing) throw new NotFoundException('Vehiculo', id);
    await this.uow.vehiculos.delete(id);
  }

  // Regla de Negocio #6: el kilometraje es inmutable hacia atrás
  async updateKilometraje(id: string, nuevoKm: number): Promise<void> {
    const vehiculo = await this.uow.vehiculos.getById(id);
    if (!vehiculo) throw new NotFoundException('Vehiculo', id);

    const kmActual = vehiculo.kilometraje ?? 0;
    if (nuevoKm <= kmActual) {
      throw new BusinessException(
        `Regla de Negocio #6 Violada: El nuevo kilometraje (${nuevoKm}) no puede ser menor o igual al actual (${kmActual}).`,
        400,
      );
    }

    await this.uow.vehiculos.updateKilometraje(id, nuevoKm);
  }
}
