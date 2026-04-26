import { v4 as uuidv4 } from 'uuid';
import { IUnitOfWork } from '../../Microservicio.Inventory.DataManagement/Interfaces/IUnitOfWork';
import { PagedResult } from '../Common/PagedResult';
import { ActualizarMantenimientoDto } from '../DTOs/Mantenimiento/ActualizarMantenimientoDto';
import { CrearMantenimientoDto } from '../DTOs/Mantenimiento/CrearMantenimientoDto';
import { MantenimientoResponseDto } from '../DTOs/Mantenimiento/MantenimientoResponseDto';
import { NotFoundException } from '../Exceptions/NotFoundException';
import { ValidationException } from '../Exceptions/ValidationException';
import { IMantenimientoService } from '../Interfaces/IMantenimientoService';
import { MantenimientoBusinessMapper } from '../Mappers/MantenimientoBusinessMapper';
import { MantenimientoValidator } from '../Validators/MantenimientoValidator';

export class MantenimientoService implements IMantenimientoService {
  constructor(private readonly uow: IUnitOfWork) {}

  async getAll(page: number, pageSize: number, vehiculoId?: string): Promise<PagedResult<MantenimientoResponseDto>> {
    const result = await this.uow.mantenimientos.getAll({ page, pageSize, vehiculoId });
    return {
      data: MantenimientoBusinessMapper.toResponseDtoList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
  }

  async getById(id: string): Promise<MantenimientoResponseDto> {
    const model = await this.uow.mantenimientos.getById(id);
    if (!model) throw new NotFoundException('Mantenimiento', id);
    return MantenimientoBusinessMapper.toResponseDto(model);
  }

  async create(dto: CrearMantenimientoDto): Promise<MantenimientoResponseDto> {
    const { error } = MantenimientoValidator.crear.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));
    const dataModel = MantenimientoBusinessMapper.toDataModel(dto, uuidv4());
    const created = await this.uow.mantenimientos.create(dataModel);
    return MantenimientoBusinessMapper.toResponseDto(created);
  }

  async update(id: string, dto: ActualizarMantenimientoDto): Promise<MantenimientoResponseDto> {
    const { error } = MantenimientoValidator.actualizar.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));
    const existing = await this.uow.mantenimientos.getById(id);
    if (!existing) throw new NotFoundException('Mantenimiento', id);
    const dataModel = MantenimientoBusinessMapper.toDataModel(dto, id);
    const updated = await this.uow.mantenimientos.update(dataModel);
    return MantenimientoBusinessMapper.toResponseDto(updated);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.uow.mantenimientos.getById(id);
    if (!existing) throw new NotFoundException('Mantenimiento', id);
    await this.uow.mantenimientos.delete(id);
  }
}
