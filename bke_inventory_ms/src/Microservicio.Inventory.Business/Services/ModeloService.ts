import { v4 as uuidv4 } from 'uuid';
import { IUnitOfWork } from '../../Microservicio.Inventory.DataManagement/Interfaces/IUnitOfWork';
import { PagedResult } from '../Common/PagedResult';
import { ActualizarModeloDto } from '../DTOs/Modelo/ActualizarModeloDto';
import { CrearModeloDto } from '../DTOs/Modelo/CrearModeloDto';
import { ModeloResponseDto } from '../DTOs/Modelo/ModeloResponseDto';
import { NotFoundException } from '../Exceptions/NotFoundException';
import { ValidationException } from '../Exceptions/ValidationException';
import { IModeloService } from '../Interfaces/IModeloService';
import { ModeloBusinessMapper } from '../Mappers/ModeloBusinessMapper';
import { ModeloValidator } from '../Validators/ModeloValidator';

export class ModeloService implements IModeloService {
  constructor(private readonly uow: IUnitOfWork) {}

  async getAll(page: number, pageSize: number, marcaId?: string): Promise<PagedResult<ModeloResponseDto>> {
    const result = await this.uow.modelos.getAll({ page, pageSize, marcaId });
    return {
      data: ModeloBusinessMapper.toResponseDtoList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
  }

  async getById(id: string): Promise<ModeloResponseDto> {
    const model = await this.uow.modelos.getById(id);
    if (!model) throw new NotFoundException('Modelo', id);
    return ModeloBusinessMapper.toResponseDto(model);
  }

  async create(dto: CrearModeloDto): Promise<ModeloResponseDto> {
    const { error } = ModeloValidator.crear.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));
    const dataModel = ModeloBusinessMapper.toDataModel(dto, uuidv4());
    const created = await this.uow.modelos.create(dataModel);
    return ModeloBusinessMapper.toResponseDto(created);
  }

  async update(id: string, dto: ActualizarModeloDto): Promise<ModeloResponseDto> {
    const { error } = ModeloValidator.actualizar.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));
    const existing = await this.uow.modelos.getById(id);
    if (!existing) throw new NotFoundException('Modelo', id);
    const dataModel = ModeloBusinessMapper.toDataModel(dto, id);
    const updated = await this.uow.modelos.update(dataModel);
    return ModeloBusinessMapper.toResponseDto(updated);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.uow.modelos.getById(id);
    if (!existing) throw new NotFoundException('Modelo', id);
    await this.uow.modelos.delete(id);
  }
}
