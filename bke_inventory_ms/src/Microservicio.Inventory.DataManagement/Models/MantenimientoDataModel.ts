export interface MantenimientoDataModel {
  mantenimientoId: string;
  vehiculoId: string | null;
  fecha: Date;
  descripcion: string;
  costo: number | null;
  siguienteKm: number | null;
}
