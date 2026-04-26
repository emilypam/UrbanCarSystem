import { v4 as uuidv4 } from 'uuid';
import { IUnitOfWork } from '../../Microservicio.Inventory.DataManagement/Interfaces/IUnitOfWork';
import { PagedResult } from '../Common/PagedResult';
import { ActualizarCategoriaDto } from '../DTOs/Categoria/ActualizarCategoriaDto';
import { CrearCategoriaDto } from '../DTOs/Categoria/CrearCategoriaDto';
import { CategoriaResponseDto } from '../DTOs/Categoria/CategoriaResponseDto';
import { NotFoundException } from '../Exceptions/NotFoundException';
import { ValidationException } from '../Exceptions/ValidationException';
import { ICategoriaService } from '../Interfaces/ICategoriaService';
import { CategoriaBusinessMapper } from '../Mappers/CategoriaBusinessMapper';
import { CategoriaValidator } from '../Validators/CategoriaValidator';

export class CategoriaService implements ICategoriaService {
  constructor(private readonly uow: IUnitOfWork) {}

  async getAll(page: number, pageSize: number): Promise<PagedResult<CategoriaResponseDto>> {
    const result = await this.uow.categorias.getAll({ page, pageSize });
    return {
      data: CategoriaBusinessMapper.toResponseDtoList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
  }

  async getById(id: string): Promise<CategoriaResponseDto> {
    const model = await this.uow.categorias.getById(id);
    if (!model) throw new NotFoundException('Categoria', id);
    return CategoriaBusinessMapper.toResponseDto(model);
  }

  async create(dto: CrearCategoriaDto): Promise<CategoriaResponseDto> {
    const { error } = CategoriaValidator.crear.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));
    const dataModel = CategoriaBusinessMapper.toDataModel(dto, uuidv4());
    const created = await this.uow.categorias.create(dataModel);
    return CategoriaBusinessMapper.toResponseDto(created);
  }

  async update(id: string, dto: ActualizarCategoriaDto): Promise<CategoriaResponseDto> {
    const { error } = CategoriaValidator.actualizar.validate(dto);
    if (error) throw new ValidationException(error.details.map((d) => d.message));
    const existing = await this.uow.categorias.getById(id);
    if (!existing) throw new NotFoundException('Categoria', id);
    const dataModel = CategoriaBusinessMapper.toDataModel(dto, id);
    const updated = await this.uow.categorias.update(dataModel);
    return CategoriaBusinessMapper.toResponseDto(updated);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.uow.categorias.getById(id);
    if (!existing) throw new NotFoundException('Categoria', id);
    await this.uow.categorias.delete(id);
  }
}
