export interface CrearMantenimientoDto {
  vehiculoId?: string;
  fecha: string;
  descripcion: string;
  costo?: number;
  siguienteKm?: number;
}
