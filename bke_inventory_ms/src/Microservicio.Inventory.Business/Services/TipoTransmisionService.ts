import { v4 as uuidv4 } from 'uuid';
import { IUnitOfWork } from '../../Microservicio.Inventory.DataManagement/Interfaces/IUnitOfWork';
import { PagedResult } from '../Common/PagedResult';
import { ActualizarTipoTransmisionDto } from '../DTOs/TipoTransmision/ActualizarTipoTransmisionDto';
import { CrearTipoTransmisionDto } from '../DTOs/TipoTransmision/CrearTipoTransmisionDto';
import { TipoTransmisionResponseDto } from '../DTOs/TipoTransmision/TipoTransmisionResponseDto';
import { NotFoundException } from '../Exceptions/NotFoundException';
import { ValidationException } from '../Exceptions/ValidationException';
import { ITipoTransmisionService } from '../Interfaces/ITipoTransmisionService';
import { TipoTransmisionBusinessMapper } from '../Mappers/TipoTransmisionBusinessMapper';
import { TipoTransmisionValidator } from '../Validators/TipoTransmisionValidator';

export class TipoTransmisionService implements ITipoTransmisionService {
  constructor(private readonly uow: IUnitOfWork) {}

  async getAll(page: number, pageSize: number): Promise<PagedResult<TipoTransmisionResponseDto>> {
    const result = await this.uow.tiposTransmision.getAll({ page, pageSize });
    return {
      data: TipoTransmisionBusinessMapper.toResponseDtoList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
  }

  async getById(id: string): Promise<TipoTransmisionResponseDto> {
    const model = await this.uow.tiposTransmision.getById(id);
    if (!model) throw new NotFoundException('TipoTransmision', id);
    return TipoTransmisionBusinessMapper.toResponseDto(model);
  }

  async create(dto: CrearTipoTransmisionDto): Promise<TipoTransmisionResponseDto> {
    const { error } = TipoTransmisionValidator.crear.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));
    const dataModel = TipoTransmisionBusinessMapper.toDataModel(dto, uuidv4());
    const created = await this.uow.tiposTransmision.create(dataModel);
    return TipoTransmisionBusinessMapper.toResponseDto(created);
  }

  async update(id: string, dto: ActualizarTipoTransmisionDto): Promise<TipoTransmisionResponseDto> {
    const { error } = TipoTransmisionValidator.actualizar.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));
    const existing = await this.uow.tiposTransmision.getById(id);
    if (!existing) throw new NotFoundException('TipoTransmision', id);
    const dataModel = TipoTransmisionBusinessMapper.toDataModel(dto, id);
    const updated = await this.uow.tiposTransmision.update(dataModel);
    return TipoTransmisionBusinessMapper.toResponseDto(updated);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.uow.tiposTransmision.getById(id);
    if (!existing) throw new NotFoundException('TipoTransmision', id);
    await this.uow.tiposTransmision.delete(id);
  }
}
