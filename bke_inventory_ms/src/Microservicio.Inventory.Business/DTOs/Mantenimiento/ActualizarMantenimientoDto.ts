export interface ActualizarMantenimientoDto {
  vehiculoId?: string;
  fecha: string;
  descripcion: string;
  costo?: number;
  siguienteKm?: number;
}
