export interface ActualizarVehiculoDto {
  modeloId?: string;
  categoriaId?: string;
  combustibleId?: string;
  transmisionId?: string;
  estadoId?: string;
  placa: string;
  anio: number;
  color?: string;
  precioDia: number;
  kilometraje?: number;
}
