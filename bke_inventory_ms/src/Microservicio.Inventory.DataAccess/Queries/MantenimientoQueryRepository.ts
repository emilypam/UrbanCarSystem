import { IMantenimientoQueryRepository } from '../Repositories/Interfaces/IMantenimientoQueryRepository';
import { PrismaClient } from '@prisma/client';
import { MantenimientoEntity } from '../Entities/MantenimientoEntity';
import { PagedResult } from '../Common/PagedResult';

export class MantenimientoQueryRepository implements IMantenimientoQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(page: number, pageSize: number): Promise<PagedResult<MantenimientoEntity>> {
    const skip = (page - 1) * pageSize;
    const [rows, total] = await Promise.all([
      this.prisma.mantenimientos.findMany({ skip, take: pageSize, orderBy: { man_fecha: 'desc' } }),
      this.prisma.mantenimientos.count(),
    ]);
    return new PagedResult(rows.map((r) => this.toEntity(r)), total, page, pageSize);
  }

  async findByVehiculoId(vehiculoId: string, page: number, pageSize: number): Promise<PagedResult<MantenimientoEntity>> {
    const skip = (page - 1) * pageSize;
    const [rows, total] = await Promise.all([
      this.prisma.mantenimientos.findMany({
        where: { veh_id: vehiculoId },
        skip,
        take: pageSize,
        orderBy: { man_fecha: 'desc' },
      }),
      this.prisma.mantenimientos.count({ where: { veh_id: vehiculoId } }),
    ]);
    return new PagedResult(rows.map((r) => this.toEntity(r)), total, page, pageSize);
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
