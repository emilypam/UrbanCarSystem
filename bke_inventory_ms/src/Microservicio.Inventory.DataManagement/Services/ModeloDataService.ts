import { IModeloRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/IModeloRepository';
import { IModeloQueryRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/IModeloQueryRepository';
import { DataPagedResult } from '../Models/DataPagedResult';
import { ModeloDataMapper } from '../Mappers/ModeloDataMapper';
import { ModeloDataModel } from '../Models/ModeloDataModel';
import { ModeloFiltroDataModel } from '../Models/ModeloFiltroDataModel';
import { IModeloDataService } from '../Interfaces/IModeloDataService';

export class ModeloDataService implements IModeloDataService {
  constructor(
    private readonly repository: IModeloRepository,
    private readonly queryRepository: IModeloQueryRepository,
  ) {}

  async getAll(filtro: ModeloFiltroDataModel): Promise<DataPagedResult<ModeloDataModel>> {
    const result = await this.queryRepository.findAll(filtro.page, filtro.pageSize, filtro.marcaId);
    return {
      items: ModeloDataMapper.toDataModelList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
    };
  }

  async getById(id: string): Promise<ModeloDataModel | null> {
    const entity = await this.repository.findById(id);
    return entity ? ModeloDataMapper.toDataModel(entity) : null;
  }

  async create(model: ModeloDataModel): Promise<ModeloDataModel> {
    const entity = ModeloDataMapper.toEntity(model);
    const { mod_id, ...data } = entity;
    const created = await this.repository.create(data);
    return ModeloDataMapper.toDataModel(created);
  }

  async update(model: ModeloDataModel): Promise<ModeloDataModel> {
    const entity = ModeloDataMapper.toEntity(model);
    const { mod_id, ...data } = entity;
    const updated = await this.repository.update(mod_id, data);
    return ModeloDataMapper.toDataModel(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
