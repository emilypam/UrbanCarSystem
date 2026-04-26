import { IUsuarioDataService } from '../Interfaces/IUsuarioDataService';
import { IUnitOfWork } from '../Interfaces/IUnitOfWork';
import { UsuarioDataModel } from '../Models/UsuarioDataModel';
import { UsuarioFiltroDataModel } from '../Models/UsuarioFiltroDataModel';
import { DataPagedResult } from '../Models/DataPagedResult';
import { UsuarioDataMapper } from '../Mappers/UsuarioDataMapper';
import { UsuarioQueryRepository } from '../../Microservicio.Security.DataAccess/Queries/UsuarioQueryRepository';

export class UsuarioDataService implements IUsuarioDataService {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly queryRepository: UsuarioQueryRepository
  ) {}

  async getById(id: string): Promise<UsuarioDataModel | null> {
    const entity = await this.unitOfWork.usuarios.findById(id);
    return entity ? UsuarioDataMapper.toDataModel(entity) : null;
  }

  async getByEmail(email: string): Promise<UsuarioDataModel | null> {
    const entity = await this.unitOfWork.usuarios.findByEmail(email);
    return entity ? UsuarioDataMapper.toDataModel(entity) : null;
  }

  async getAll(filtro: UsuarioFiltroDataModel): Promise<DataPagedResult<UsuarioDataModel>> {
    const pagedResult = await this.queryRepository.findAll(filtro.page, filtro.pageSize);
    return {
      items: UsuarioDataMapper.toDataModelList(pagedResult.items),
      total: pagedResult.total,
      page: pagedResult.page,
      pageSize: pagedResult.pageSize,
      totalPages: pagedResult.totalPages,
      hasNextPage: pagedResult.hasNextPage,
      hasPreviousPage: pagedResult.hasPreviousPage,
    };
  }

  async create(model: UsuarioDataModel): Promise<UsuarioDataModel> {
    const entity = UsuarioDataMapper.toEntity(model);
    const created = await this.unitOfWork.usuarios.create(entity);
    return UsuarioDataMapper.toDataModel(created);
  }

  async update(id: string, model: Partial<UsuarioDataModel>): Promise<UsuarioDataModel> {
    const partialEntity: Record<string, unknown> = {};
    if (model.email !== undefined) partialEntity['usu_email'] = model.email;
    if (model.nombre !== undefined) partialEntity['usu_nombre'] = model.nombre;
    const updated = await this.unitOfWork.usuarios.update(id, partialEntity as any);
    return UsuarioDataMapper.toDataModel(updated);
  }

  async delete(id: string): Promise<void> {
    await this.unitOfWork.usuarios.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.unitOfWork.usuarios.exists(id);
  }
  
}
