import { IVehiculoQueryRepository, VehiculoFiltros } from '../Repositories/Interfaces/IVehiculoQueryRepository';
import { PrismaClient } from '@prisma/client';
import { VehiculoEntity } from '../Entities/VehiculoEntity';
import { PagedResult } from '../Common/PagedResult';

export class VehiculoQueryRepository implements IVehiculoQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(page: number, pageSize: number, filtros?: VehiculoFiltros): Promise<PagedResult<VehiculoEntity>> {
    const skip = (page - 1) * pageSize;
    const where = {
      ...(filtros?.categoriaId ? { cat_id: filtros.categoriaId } : {}),
      ...(filtros?.estadoId ? { est_id: filtros.estadoId } : {}),
      ...(filtros?.marcaId ? { modelos: { mar_id: filtros.marcaId } } : {}),
    };
    const [rows, total] = await Promise.all([
      this.prisma.vehiculos.findMany({ where, skip, take: pageSize, orderBy: { veh_created_at: 'desc' } }),
      this.prisma.vehiculos.count({ where }),
    ]);
    return new PagedResult(rows.map((r) => this.toEntity(r)), total, page, pageSize);
  }

  async findByEstado(estadoId: string): Promise<VehiculoEntity[]> {
    const rows = await this.prisma.vehiculos.findMany({ where: { est_id: estadoId } });
    return rows.map((r) => this.toEntity(r));
  }

  async findConDetalles(id: string) {
    return this.prisma.vehiculos.findUnique({
      where: { veh_id: id },
      include: {
        modelos: { include: { marcas: true } },
        categorias: true,
        tipos_combustible: true,
        tipos_transmision: true,
        estados_vehiculo: true,
      },
    });
  }

  async searchByPlaca(placa: string): Promise<VehiculoEntity[]> {
    const rows = await this.prisma.vehiculos.findMany({
      where: { veh_placa: { contains: placa, mode: 'insensitive' } },
    });
    return rows.map((r) => this.toEntity(r));
  }

  private toEntity(row: { veh_id: string; mod_id: string | null; cat_id: string | null; com_id: string | null; tra_id: string | null; est_id: string | null; veh_placa: string; veh_anio: number; veh_color: string | null; veh_precio_dia: { toNumber(): number }; veh_kilometraje: number | null; veh_created_at: Date | null }): VehiculoEntity {
    return {
      veh_id: row.veh_id,
      mod_id: row.mod_id,
      cat_id: row.cat_id,
      com_id: row.com_id,
      tra_id: row.tra_id,
      est_id: row.est_id,
      veh_placa: row.veh_placa,
      veh_anio: row.veh_anio,
      veh_color: row.veh_color,
      veh_precio_dia: row.veh_precio_dia.toNumber(),
      veh_kilometraje: row.veh_kilometraje,
      veh_created_at: row.veh_created_at,
    };
  }
}
