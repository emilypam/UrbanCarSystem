import { IRolPermisoDataService } from '../Interfaces/IRolPermisoDataService';
import { IUnitOfWork } from '../Interfaces/IUnitOfWork';
import { RolPermisoDataModel } from '../Models/RolPermisoDataModel';
import { RolPermisoFiltroDataModel } from '../Models/RolPermisoFiltroDataModel';
import { DataPagedResult } from '../Models/DataPagedResult';
import { RolPermisoDataMapper } from '../Mappers/RolPermisoDataMapper';
import { RolPermisoQueryRepository } from '../../Microservicio.Security.DataAccess/Queries/RolPermisoQueryRepository';

export class RolPermisoDataService implements IRolPermisoDataService {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly queryRepository: RolPermisoQueryRepository
  ) {}

  async getById(id: string): Promise<RolPermisoDataModel | null> {
    const entity = await this.unitOfWork.rolesPermisos.findById(id);
    return entity ? RolPermisoDataMapper.toDataModel(entity) : null;
  }

  async getAll(filtro: RolPermisoFiltroDataModel): Promise<DataPagedResult<RolPermisoDataModel>> {
    const pagedResult = await this.queryRepository.findAll(filtro.page, filtro.pageSize);
    return {
      items: RolPermisoDataMapper.toDataModelList(pagedResult.items),
      total: pagedResult.total,
      page: pagedResult.page,
      pageSize: pagedResult.pageSize,
      totalPages: pagedResult.totalPages,
      hasNextPage: pagedResult.hasNextPage,
      hasPreviousPage: pagedResult.hasPreviousPage,
    };
  }

  async create(model: Omit<RolPermisoDataModel, 'rolId'>): Promise<RolPermisoDataModel> {
    const entity = { rol_nombre: model.nombre, rol_descripcion: model.descripcion };
    const created = await this.unitOfWork.rolesPermisos.create(entity);
    return RolPermisoDataMapper.toDataModel(created);
  }

  async update(id: string, model: Partial<RolPermisoDataModel>): Promise<RolPermisoDataModel> {
    const partialEntity: Record<string, unknown> = {};
    if (model.nombre !== undefined) partialEntity['rol_nombre'] = model.nombre;
    if (model.descripcion !== undefined) partialEntity['rol_descripcion'] = model.descripcion;
    const updated = await this.unitOfWork.rolesPermisos.update(id, partialEntity as any);
    return RolPermisoDataMapper.toDataModel(updated);
  }

  async delete(id: string): Promise<void> {
    await this.unitOfWork.rolesPermisos.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.unitOfWork.rolesPermisos.exists(id);
  }
}
