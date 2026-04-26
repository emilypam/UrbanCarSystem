export interface MantenimientoEntity {
  man_id: string;
  veh_id: string | null;
  man_fecha: Date;
  man_descripcion: string;
  man_costo: number | null;
  man_siguiente_km: number | null;
}
