import { v4 as uuidv4 } from 'uuid';
import { IUnitOfWork } from '../../Microservicio.Inventory.DataManagement/Interfaces/IUnitOfWork';
import { PagedResult } from '../Common/PagedResult';
import { ActualizarMarcaDto } from '../DTOs/Marca/ActualizarMarcaDto';
import { CrearMarcaDto } from '../DTOs/Marca/CrearMarcaDto';
import { MarcaResponseDto } from '../DTOs/Marca/MarcaResponseDto';
import { NotFoundException } from '../Exceptions/NotFoundException';
import { ValidationException } from '../Exceptions/ValidationException';
import { IMarcaService } from '../Interfaces/IMarcaService';
import { MarcaBusinessMapper } from '../Mappers/MarcaBusinessMapper';
import { MarcaValidator } from '../Validators/MarcaValidator';

export class MarcaService implements IMarcaService {
  constructor(private readonly uow: IUnitOfWork) {}

  async getAll(page: number, pageSize: number): Promise<PagedResult<MarcaResponseDto>> {
    const result = await this.uow.marcas.getAll({ page, pageSize });
    return {
      data: MarcaBusinessMapper.toResponseDtoList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
  }

  async getById(id: string): Promise<MarcaResponseDto> {
    const model = await this.uow.marcas.getById(id);
    if (!model) throw new NotFoundException('Marca', id);
    return MarcaBusinessMapper.toResponseDto(model);
  }

  async create(dto: CrearMarcaDto): Promise<MarcaResponseDto> {
    const { error } = MarcaValidator.crear.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));
    const dataModel = MarcaBusinessMapper.toDataModel(dto, uuidv4());
    const created = await this.uow.marcas.create(dataModel);
    return MarcaBusinessMapper.toResponseDto(created);
  }

  async update(id: string, dto: ActualizarMarcaDto): Promise<MarcaResponseDto> {
    const { error } = MarcaValidator.actualizar.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));
    const existing = await this.uow.marcas.getById(id);
    if (!existing) throw new NotFoundException('Marca', id);
    const dataModel = MarcaBusinessMapper.toDataModel(dto, id);
    const updated = await this.uow.marcas.update(dataModel);
    return MarcaBusinessMapper.toResponseDto(updated);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.uow.marcas.getById(id);
    if (!existing) throw new NotFoundException('Marca', id);
    await this.uow.marcas.delete(id);
  }
}
