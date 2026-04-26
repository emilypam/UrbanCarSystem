import { IUsuarioService } from '../Interfaces/IUsuarioService';
import { IUsuarioDataService } from '../../Microservicio.Security.DataManagement/Interfaces/IUsuarioDataService';
import { CrearUsuarioRequest } from '../DTOs/Usuario/CrearUsuarioRequest';
import { ActualizarUsuarioRequest } from '../DTOs/Usuario/ActualizarUsuarioRequest';
import { UsuarioResponse } from '../DTOs/Usuario/UsuarioResponse';
import { DataPagedResult } from '../../Microservicio.Security.DataManagement/Models/DataPagedResult';
import { UsuarioBusinessMapper } from '../Mappers/UsuarioBusinessMapper';
import { UsuarioValidator } from '../Validators/UsuarioValidator';
import { NotFoundException } from '../Exceptions/NotFoundException';
import { BusinessException } from '../Exceptions/BusinessException';

export class UsuarioService implements IUsuarioService {
  constructor(private readonly usuarioDataService: IUsuarioDataService) {}

  async getById(id: string): Promise<UsuarioResponse> {
    const model = await this.usuarioDataService.getById(id);
    if (!model) throw new NotFoundException('Usuario', id);
    return UsuarioBusinessMapper.toResponse(model);
  }

  async getAll(page: number, pageSize: number): Promise<DataPagedResult<UsuarioResponse>> {
    const result = await this.usuarioDataService.getAll({ page, pageSize });
    return {
      ...result,
      items: UsuarioBusinessMapper.toResponseList(result.items),
    };
  }

  async create(request: CrearUsuarioRequest): Promise<UsuarioResponse> {
    UsuarioValidator.validateCrear(request);

    const existing = await this.usuarioDataService.getByEmail(request.email);
    if (existing) {
      throw new BusinessException(`Ya existe un usuario con el email '${request.email}'.`, 409);
    }

    const dataModel = UsuarioBusinessMapper.toDataModel(request);
    const created = await this.usuarioDataService.create(dataModel);
    return UsuarioBusinessMapper.toResponse(created);
  }

  async update(id: string, request: ActualizarUsuarioRequest): Promise<UsuarioResponse> {
    UsuarioValidator.validateActualizar(request);

    const exists = await this.usuarioDataService.exists(id);
    if (!exists) throw new NotFoundException('Usuario', id);

    const updated = await this.usuarioDataService.update(id, {
      email: request.email,
      nombre: request.nombre,
    });
    return UsuarioBusinessMapper.toResponse(updated);
  }

  async delete(id: string): Promise<void> {
    const exists = await this.usuarioDataService.exists(id);
    if (!exists) throw new NotFoundException('Usuario', id);
    await this.usuarioDataService.delete(id);
  }
}
