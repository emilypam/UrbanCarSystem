import { ITipoTransmisionRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/ITipoTransmisionRepository';
import { ITipoTransmisionQueryRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/ITipoTransmisionQueryRepository';
import { DataPagedResult } from '../Models/DataPagedResult';
import { TipoTransmisionDataMapper } from '../Mappers/TipoTransmisionDataMapper';
import { TipoTransmisionDataModel } from '../Models/TipoTransmisionDataModel';
import { TipoTransmisionFiltroDataModel } from '../Models/TipoTransmisionFiltroDataModel';
import { ITipoTransmisionDataService } from '../Interfaces/ITipoTransmisionDataService';

export class TipoTransmisionDataService implements ITipoTransmisionDataService {
  constructor(
    private readonly repository: ITipoTransmisionRepository,
    private readonly queryRepository: ITipoTransmisionQueryRepository,
  ) {}

  async getAll(filtro: TipoTransmisionFiltroDataModel): Promise<DataPagedResult<TipoTransmisionDataModel>> {
    const result = await this.queryRepository.findAll(filtro.page, filtro.pageSize);
    return {
      items: TipoTransmisionDataMapper.toDataModelList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
    };
  }

  async getById(id: string): Promise<TipoTransmisionDataModel | null> {
    const entity = await this.repository.findById(id);
    return entity ? TipoTransmisionDataMapper.toDataModel(entity) : null;
  }

  async create(model: TipoTransmisionDataModel): Promise<TipoTransmisionDataModel> {
    const entity = TipoTransmisionDataMapper.toEntity(model);
    const { tra_id, ...data } = entity;
    const created = await this.repository.create(data);
    return TipoTransmisionDataMapper.toDataModel(created);
  }

  async update(model: TipoTransmisionDataModel): Promise<TipoTransmisionDataModel> {
    const entity = TipoTransmisionDataMapper.toEntity(model);
    const { tra_id, ...data } = entity;
    const updated = await this.repository.update(tra_id, data);
    return TipoTransmisionDataMapper.toDataModel(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
