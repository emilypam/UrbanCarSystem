import { ITipoCombustibleRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/ITipoCombustibleRepository';
import { ITipoCombustibleQueryRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/ITipoCombustibleQueryRepository';
import { DataPagedResult } from '../Models/DataPagedResult';
import { TipoCombustibleDataMapper } from '../Mappers/TipoCombustibleDataMapper';
import { TipoCombustibleDataModel } from '../Models/TipoCombustibleDataModel';
import { TipoCombustibleFiltroDataModel } from '../Models/TipoCombustibleFiltroDataModel';
import { ITipoCombustibleDataService } from '../Interfaces/ITipoCombustibleDataService';

export class TipoCombustibleDataService implements ITipoCombustibleDataService {
  constructor(
    private readonly repository: ITipoCombustibleRepository,
    private readonly queryRepository: ITipoCombustibleQueryRepository,
  ) {}

  async getAll(filtro: TipoCombustibleFiltroDataModel): Promise<DataPagedResult<TipoCombustibleDataModel>> {
    const result = await this.queryRepository.findAll(filtro.page, filtro.pageSize);
    return {
      items: TipoCombustibleDataMapper.toDataModelList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
    };
  }

  async getById(id: string): Promise<TipoCombustibleDataModel | null> {
    const entity = await this.repository.findById(id);
    return entity ? TipoCombustibleDataMapper.toDataModel(entity) : null;
  }

  async create(model: TipoCombustibleDataModel): Promise<TipoCombustibleDataModel> {
    const entity = TipoCombustibleDataMapper.toEntity(model);
    const { com_id, ...data } = entity;
    const created = await this.repository.create(data);
    return TipoCombustibleDataMapper.toDataModel(created);
  }

  async update(model: TipoCombustibleDataModel): Promise<TipoCombustibleDataModel> {
    const entity = TipoCombustibleDataMapper.toEntity(model);
    const { com_id, ...data } = entity;
    const updated = await this.repository.update(com_id, data);
    return TipoCombustibleDataMapper.toDataModel(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
