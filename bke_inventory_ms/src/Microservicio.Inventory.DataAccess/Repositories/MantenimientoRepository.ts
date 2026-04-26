import { PrismaClient } from '@prisma/client';
import { MantenimientoEntity } from '../Entities/MantenimientoEntity';
import { IMantenimientoRepository } from './Interfaces/IMantenimientoRepository';

export class MantenimientoRepository implements IMantenimientoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<MantenimientoEntity | null> {
    const row = await this.prisma.mantenimientos.findUnique({ where: { man_id: id } });
    return row ? this.toEntity(row) : null;
  }

  async findByVehiculoId(vehiculoId: string): Promise<MantenimientoEntity[]> {
    const rows = await this.prisma.mantenimientos.findMany({
      where: { veh_id: vehiculoId },
      orderBy: { man_fecha: 'desc' },
    });
    return rows.map((r) => this.toEntity(r));
  }

  async create(entity: Omit<MantenimientoEntity, 'man_id'>): Promise<MantenimientoEntity> {
    const row = await this.prisma.mantenimientos.create({ data: { ...entity } });
    return this.toEntity(row);
  }

  async update(id: string, entity: Partial<MantenimientoEntity>): Promise<MantenimientoEntity> {
    const row = await this.prisma.mantenimientos.update({
      where: { man_id: id },
      data: { ...entity },
    });
    return this.toEntity(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.mantenimientos.delete({ where: { man_id: id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.mantenimientos.count({ where: { man_id: id } });
    return count > 0;
  }

  private toEntity(row: { man_id: string; veh_id: string | null; man_fecha: Date; man_descripcion: string; man_costo: { toNumber(): number } | null; man_siguiente_km: number | null }): MantenimientoEntity {
    return {
      man_id: row.man_id,
      veh_id: row.veh_id,
      man_fecha: row.man_fecha,
      man_descripcion: row.man_descripcion,
      man_costo: row.man_costo ? row.man_costo.toNumber() : null,
      man_siguiente_km: row.man_siguiente_km,
    };
  }
}
