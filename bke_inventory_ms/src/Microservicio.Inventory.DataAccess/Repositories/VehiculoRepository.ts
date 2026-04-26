import { PrismaClient } from '@prisma/client';
import { VehiculoEntity } from '../Entities/VehiculoEntity';
import { IVehiculoRepository } from './Interfaces/IVehiculoRepository';

export class VehiculoRepository implements IVehiculoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<VehiculoEntity | null> {
    const row = await this.prisma.vehiculos.findUnique({ where: { veh_id: id } });
    return row ? this.toEntity(row) : null;
  }

  async findByPlaca(placa: string): Promise<VehiculoEntity | null> {
    const row = await this.prisma.vehiculos.findUnique({ where: { veh_placa: placa } });
    return row ? this.toEntity(row) : null;
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.vehiculos.count({ where: { veh_id: id } });
    return count > 0;
  }

  async create(entity: Omit<VehiculoEntity, 'veh_id' | 'veh_created_at'>): Promise<VehiculoEntity> {
    // Prisma's unchecked input requires undefined (not null) for optional FK fields
    const row = await this.prisma.vehiculos.create({
      data: {
        mod_id: entity.mod_id ?? undefined,
        cat_id: entity.cat_id ?? undefined,
        com_id: entity.com_id ?? undefined,
        tra_id: entity.tra_id ?? undefined,
        est_id: entity.est_id ?? undefined,
        veh_placa: entity.veh_placa,
        veh_anio: entity.veh_anio,
        veh_color: entity.veh_color ?? undefined,
        veh_precio_dia: entity.veh_precio_dia,
        veh_kilometraje: entity.veh_kilometraje ?? undefined,
      },
    });
    return this.toEntity(row);
  }

  async update(id: string, entity: Partial<VehiculoEntity>): Promise<VehiculoEntity> {
    // Cast needed because Prisma's discriminated union type can't be satisfied by Partial<VehiculoEntity>,
    // but the shape is structurally valid for vehiculosUncheckedUpdateInput at runtime.
    const row = await this.prisma.vehiculos.update({
      where: { veh_id: id },
      data: entity as any,
    });
    return this.toEntity(row);
  }

  async updateKilometraje(id: string, nuevoKm: number): Promise<void> {
    await this.prisma.vehiculos.update({
      where: { veh_id: id },
      data: { veh_kilometraje: nuevoKm },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vehiculos.delete({ where: { veh_id: id } });
  }

  private toEntity(row: any): VehiculoEntity {
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
      veh_precio_dia: typeof row.veh_precio_dia === 'object' ? row.veh_precio_dia.toNumber() : row.veh_precio_dia,
      veh_kilometraje: row.veh_kilometraje,
      veh_created_at: row.veh_created_at,
    };
  }
}
