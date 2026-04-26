import { IMarcaRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/IMarcaRepository';
import { IMarcaQueryRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/IMarcaQueryRepository';
import { DataPagedResult } from '../Models/DataPagedResult';
import { MarcaDataMapper } from '../Mappers/MarcaDataMapper';
import { MarcaDataModel } from '../Models/MarcaDataModel';
import { MarcaFiltroDataModel } from '../Models/MarcaFiltroDataModel';
import { IMarcaDataService } from '../Interfaces/IMarcaDataService';

export class MarcaDataService implements IMarcaDataService {
  constructor(
    private readonly repository: IMarcaRepository,
    private readonly queryRepository: IMarcaQueryRepository,
  ) {}

  async getAll(filtro: MarcaFiltroDataModel): Promise<DataPagedResult<MarcaDataModel>> {
    const result = await this.queryRepository.findAll(filtro.page, filtro.pageSize);
    return {
      items: MarcaDataMapper.toDataModelList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
    };
  }

  async getById(id: string): Promise<MarcaDataModel | null> {
    const entity = await this.repository.findById(id);
    return entity ? MarcaDataMapper.toDataModel(entity) : null;
  }

  async create(model: MarcaDataModel): Promise<MarcaDataModel> {
    const entity = MarcaDataMapper.toEntity(model);
    const { mar_id, ...data } = entity;
    const created = await this.repository.create(data);
    return MarcaDataMapper.toDataModel(created);
  }

  async update(model: MarcaDataModel): Promise<MarcaDataModel> {
    const entity = MarcaDataMapper.toEntity(model);
    const { mar_id, ...data } = entity;
    const updated = await this.repository.update(mar_id, data);
    return MarcaDataMapper.toDataModel(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
