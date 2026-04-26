import { ICategoriaRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/ICategoriaRepository';
import { ICategoriaQueryRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/ICategoriaQueryRepository';
import { DataPagedResult } from '../Models/DataPagedResult';
import { CategoriaDataMapper } from '../Mappers/CategoriaDataMapper';
import { CategoriaDataModel } from '../Models/CategoriaDataModel';
import { CategoriaFiltroDataModel } from '../Models/CategoriaFiltroDataModel';
import { ICategoriaDataService } from '../Interfaces/ICategoriaDataService';

export class CategoriaDataService implements ICategoriaDataService {
  constructor(
    private readonly repository: ICategoriaRepository,
    private readonly queryRepository: ICategoriaQueryRepository,
  ) {}

  async getAll(filtro: CategoriaFiltroDataModel): Promise<DataPagedResult<CategoriaDataModel>> {
    const result = await this.queryRepository.findAll(filtro.page, filtro.pageSize);
    return {
      items: CategoriaDataMapper.toDataModelList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
    };
  }

  async getById(id: string): Promise<CategoriaDataModel | null> {
    const entity = await this.repository.findById(id);
    return entity ? CategoriaDataMapper.toDataModel(entity) : null;
  }

  async create(model: CategoriaDataModel): Promise<CategoriaDataModel> {
    const entity = CategoriaDataMapper.toEntity(model);
    const { cat_id, ...data } = entity;
    const created = await this.repository.create(data);
    return CategoriaDataMapper.toDataModel(created);
  }

  async update(model: CategoriaDataModel): Promise<CategoriaDataModel> {
    const entity = CategoriaDataMapper.toEntity(model);
    const { cat_id, ...data } = entity;
    const updated = await this.repository.update(cat_id, data);
    return CategoriaDataMapper.toDataModel(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
