import { IVehiculoRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/IVehiculoRepository';
import { IVehiculoQueryRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/Interfaces/IVehiculoQueryRepository';
import { DataPagedResult } from '../Models/DataPagedResult';
import { VehiculoDataMapper } from '../Mappers/VehiculoDataMapper';
import { VehiculoDataModel } from '../Models/VehiculoDataModel';
import { VehiculoFiltroDataModel } from '../Models/VehiculoFiltroDataModel';
import { IVehiculoDataService } from '../Interfaces/IVehiculoDataService';

export class VehiculoDataService implements IVehiculoDataService {
  constructor(
    private readonly repository: IVehiculoRepository,
    private readonly queryRepository: IVehiculoQueryRepository,
  ) {}

  async getAll(filtro: VehiculoFiltroDataModel): Promise<DataPagedResult<VehiculoDataModel>> {
    const result = await this.queryRepository.findAll(filtro.page, filtro.pageSize, {
      marcaId: filtro.marcaId,
      categoriaId: filtro.categoriaId,
      estadoId: filtro.estadoId,
    });
    return {
      items: VehiculoDataMapper.toDataModelList(result.items),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
    };
  }

  async getById(id: string): Promise<VehiculoDataModel | null> {
    const entity = await this.repository.findById(id);
    return entity ? VehiculoDataMapper.toDataModel(entity) : null;
  }

  async getByPlaca(placa: string): Promise<VehiculoDataModel | null> {
    const entity = await this.repository.findByPlaca(placa);
    return entity ? VehiculoDataMapper.toDataModel(entity) : null;
  }

  async create(model: VehiculoDataModel): Promise<VehiculoDataModel> {
    const entity = VehiculoDataMapper.toEntity(model);
    const { veh_id, veh_created_at, ...data } = entity;
    const created = await this.repository.create(data);
    return VehiculoDataMapper.toDataModel(created);
  }

  async update(model: VehiculoDataModel): Promise<VehiculoDataModel> {
    const entity = VehiculoDataMapper.toEntity(model);
    const { veh_id, veh_created_at, ...data } = entity;
    const updated = await this.repository.update(veh_id, data);
    return VehiculoDataMapper.toDataModel(updated);
  }

  async updateKilometraje(id: string, nuevoKm: number): Promise<void> {
    await this.repository.updateKilometraje(id, nuevoKm);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
