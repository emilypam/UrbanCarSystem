export interface VehiculoResponseDto {
  veh_id: string;
  mod_id: string | null;
  mod_nombre?: string;
  mar_nombre?: string;
  cat_id: string | null;
  cat_nombre?: string;
  com_id: string | null;
  tra_id: string | null;
  est_id: string | null;
  est_nombre?: string;
  age_id?: string | null;
  veh_placa: string;
  veh_anio: number;
  veh_color: string | null;
  veh_precio_dia: number;
  veh_kilometraje: number | null;
  veh_created_at: Date | null;
}
