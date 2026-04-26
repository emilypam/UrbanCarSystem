import { IMantenimientoRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/IMantenimientoRepository';
import { IMantenimientoQueryRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/IMantenimientoQueryRepository';
import { DataPagedResult } from '../Models/DataPagedResult';
import { MantenimientoDataMapper } from '../Mappers/MantenimientoDataMapper';
import { MantenimientoDataModel } from '../Models/MantenimientoDataModel';
import { MantenimientoFiltroDataModel } from '../Models/MantenimientoFiltroDataModel';
import { IMantenimientoDataService } from '../Interfaces/IMantenimientoDataService';

export class MantenimientoDataService implements IMantenimientoDataService {
  constructor(
    private readonly repository: IMantenimientoRepository,
    private readonly queryRepository: IMantenimientoQueryRepository,
  ) {}

  async getAll(filtro: MantenimientoFiltroDataModel): Promise<DataPagedResult<MantenimientoDataModel>> {
    const result = filtro.vehiculoId
      ? await this.queryRepository.findByVehiculoId(filtro.vehiculoId, filtro.page, filtro.pageSize)
      : await this.queryRepository.findAll(filtro.page, filtro.pageSize);
    return {
      items: MantenimientoDataMapper.toDataModelList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
    };
  }

  async getById(id: string): Promise<MantenimientoDataModel | null> {
    const entity = await this.repository.findById(id);
    return entity ? MantenimientoDataMapper.toDataModel(entity) : null;
  }

  async create(model: MantenimientoDataModel): Promise<MantenimientoDataModel> {
    const entity = MantenimientoDataMapper.toEntity(model);
    const { man_id, ...data } = entity;
    const created = await this.repository.create(data);
    return MantenimientoDataMapper.toDataModel(created);
  }

  async update(model: MantenimientoDataModel): Promise<MantenimientoDataModel> {
    const entity = MantenimientoDataMapper.toEntity(model);
    const { man_id, ...data } = entity;
    const updated = await this.repository.update(man_id, data);
    return MantenimientoDataMapper.toDataModel(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
