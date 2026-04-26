import { PrismaClient } from '@prisma/client';
import { EstadoVehiculoEntity } from '../Entities/EstadoVehiculoEntity';
import { IEstadoVehiculoRepository } from './Interfaces/IEstadoVehiculoRepository';

export class EstadoVehiculoRepository implements IEstadoVehiculoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<EstadoVehiculoEntity | null> {
    return this.prisma.estados_vehiculo.findUnique({ where: { est_id: id } });
  }

  async findByNombre(nombre: string): Promise<EstadoVehiculoEntity | null> {
    return this.prisma.estados_vehiculo.findUnique({ where: { est_nombre: nombre } });
  }

  async findAll(): Promise<EstadoVehiculoEntity[]> {
    return this.prisma.estados_vehiculo.findMany({ orderBy: { est_nombre: 'asc' } });
  }

  async create(entity: Omit<EstadoVehiculoEntity, 'est_id'>): Promise<EstadoVehiculoEntity> {
    return this.prisma.estados_vehiculo.create({ data: entity });
  }

  async update(id: string, entity: Partial<EstadoVehiculoEntity>): Promise<EstadoVehiculoEntity> {
    return this.prisma.estados_vehiculo.update({ where: { est_id: id }, data: entity });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.estados_vehiculo.delete({ where: { est_id: id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.estados_vehiculo.count({ where: { est_id: id } });
    return count > 0;
  }
}
