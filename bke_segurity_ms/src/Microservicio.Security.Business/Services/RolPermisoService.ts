import { IRolPermisoService } from '../Interfaces/IRolPermisoService';
import { IRolPermisoDataService } from '../../Microservicio.Security.DataManagement/Interfaces/IRolPermisoDataService';
import { CrearRolPermisoRequest } from '../DTOs/RolPermiso/CrearRolPermisoRequest';
import { ActualizarRolPermisoRequest } from '../DTOs/RolPermiso/ActualizarRolPermisoRequest';
import { RolPermisoResponse } from '../DTOs/RolPermiso/RolPermisoResponse';
import { DataPagedResult } from '../../Microservicio.Security.DataManagement/Models/DataPagedResult';
import { RolPermisoBusinessMapper } from '../Mappers/RolPermisoBusinessMapper';
import { RolPermisoValidator } from '../Validators/RolPermisoValidator';
import { NotFoundException } from '../Exceptions/NotFoundException';

export class RolPermisoService implements IRolPermisoService {
  constructor(private readonly rolPermisoDataService: IRolPermisoDataService) {}

  async getById(id: string): Promise<RolPermisoResponse> {
    const model = await this.rolPermisoDataService.getById(id);
    if (!model) throw new NotFoundException('RolPermiso', id);
    return RolPermisoBusinessMapper.toResponse(model);
  }

  async getAll(page: number, pageSize: number): Promise<DataPagedResult<RolPermisoResponse>> {
    const result = await this.rolPermisoDataService.getAll({ page, pageSize });
    return {
      ...result,
      items: RolPermisoBusinessMapper.toResponseList(result.items),
    };
  }

  async create(request: CrearRolPermisoRequest): Promise<RolPermisoResponse> {
    RolPermisoValidator.validateCrear(request);
    const dataModel = RolPermisoBusinessMapper.toDataModel(request);
    const created = await this.rolPermisoDataService.create(dataModel);
    return RolPermisoBusinessMapper.toResponse(created);
  }

  async update(id: string, request: ActualizarRolPermisoRequest): Promise<RolPermisoResponse> {
    RolPermisoValidator.validateActualizar(request);
    const exists = await this.rolPermisoDataService.exists(id);
    if (!exists) throw new NotFoundException('RolPermiso', id);
    const updated = await this.rolPermisoDataService.update(id, {
      nombre: request.nombre,
      descripcion: request.descripcion,
    });
    return RolPermisoBusinessMapper.toResponse(updated);
  }

  async delete(id: string): Promise<void> {
    const exists = await this.rolPermisoDataService.exists(id);
    if (!exists) throw new NotFoundException('RolPermiso', id);
    await this.rolPermisoDataService.delete(id);
  }
}
