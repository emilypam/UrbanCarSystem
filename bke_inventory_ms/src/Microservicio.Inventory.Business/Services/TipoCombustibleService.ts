import { v4 as uuidv4 } from 'uuid';
import { IUnitOfWork } from '../../Microservicio.Inventory.DataManagement/Interfaces/IUnitOfWork';
import { PagedResult } from '../Common/PagedResult';
import { ActualizarTipoCombustibleDto } from '../DTOs/TipoCombustible/ActualizarTipoCombustibleDto';
import { CrearTipoCombustibleDto } from '../DTOs/TipoCombustible/CrearTipoCombustibleDto';
import { TipoCombustibleResponseDto } from '../DTOs/TipoCombustible/TipoCombustibleResponseDto';
import { NotFoundException } from '../Exceptions/NotFoundException';
import { ValidationException } from '../Exceptions/ValidationException';
import { ITipoCombustibleService } from '../Interfaces/ITipoCombustibleService';
import { TipoCombustibleBusinessMapper } from '../Mappers/TipoCombustibleBusinessMapper';
import { TipoCombustibleValidator } from '../Validators/TipoCombustibleValidator';

export class TipoCombustibleService implements ITipoCombustibleService {
  constructor(private readonly uow: IUnitOfWork) {}

  async getAll(page: number, pageSize: number): Promise<PagedResult<TipoCombustibleResponseDto>> {
    const result = await this.uow.tiposCombustible.getAll({ page, pageSize });
    return {
      data: TipoCombustibleBusinessMapper.toResponseDtoList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
  }

  async getById(id: string): Promise<TipoCombustibleResponseDto> {
    const model = await this.uow.tiposCombustible.getById(id);
    if (!model) throw new NotFoundException('TipoCombustible', id);
    return TipoCombustibleBusinessMapper.toResponseDto(model);
  }

  async create(dto: CrearTipoCombustibleDto): Promise<TipoCombustibleResponseDto> {
    const { error } = TipoCombustibleValidator.crear.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));
    const dataModel = TipoCombustibleBusinessMapper.toDataModel(dto, uuidv4());
    const created = await this.uow.tiposCombustible.create(dataModel);
    return TipoCombustibleBusinessMapper.toResponseDto(created);
  }

  async update(id: string, dto: ActualizarTipoCombustibleDto): Promise<TipoCombustibleResponseDto> {
    const { error } = TipoCombustibleValidator.actualizar.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));
    const existing = await this.uow.tiposCombustible.getById(id);
    if (!existing) throw new NotFoundException('TipoCombustible', id);
    const dataModel = TipoCombustibleBusinessMapper.toDataModel(dto, id);
    const updated = await this.uow.tiposCombustible.update(dataModel);
    return TipoCombustibleBusinessMapper.toResponseDto(updated);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.uow.tiposCombustible.getById(id);
    if (!existing) throw new NotFoundException('TipoCombustible', id);
    await this.uow.tiposCombustible.delete(id);
  }
}
