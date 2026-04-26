import { IEstadoVehiculoRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/IEstadoVehiculoRepository';
import { IEstadoVehiculoQueryRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/IEstadoVehiculoQueryRepository';
import { DataPagedResult } from '../Models/DataPagedResult';
import { EstadoVehiculoDataMapper } from '../Mappers/EstadoVehiculoDataMapper';
import { EstadoVehiculoDataModel } from '../Models/EstadoVehiculoDataModel';
import { EstadoVehiculoFiltroDataModel } from '../Models/EstadoVehiculoFiltroDataModel';
import { IEstadoVehiculoDataService } from '../Interfaces/IEstadoVehiculoDataService';

export class EstadoVehiculoDataService implements IEstadoVehiculoDataService {
  constructor(
    private readonly repository: IEstadoVehiculoRepository,
    private readonly queryRepository: IEstadoVehiculoQueryRepository,
  ) {}

  async getAll(filtro: EstadoVehiculoFiltroDataModel): Promise<DataPagedResult<EstadoVehiculoDataModel>> {
    const result = await this.queryRepository.findAll(filtro.page, filtro.pageSize);
    return {
      items: EstadoVehiculoDataMapper.toDataModelList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
    };
  }

  async getById(id: string): Promise<EstadoVehiculoDataModel | null> {
    const entity = await this.repository.findById(id);
    return entity ? EstadoVehiculoDataMapper.toDataModel(entity) : null;
  }

  async create(model: EstadoVehiculoDataModel): Promise<EstadoVehiculoDataModel> {
    const entity = EstadoVehiculoDataMapper.toEntity(model);
    const { est_id, ...data } = entity;
    const created = await this.repository.create(data);
    return EstadoVehiculoDataMapper.toDataModel(created);
  }

  async update(model: EstadoVehiculoDataModel): Promise<EstadoVehiculoDataModel> {
    const entity = EstadoVehiculoDataMapper.toEntity(model);
    const { est_id, ...data } = entity;
    const updated = await this.repository.update(est_id, data);
    return EstadoVehiculoDataMapper.toDataModel(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
