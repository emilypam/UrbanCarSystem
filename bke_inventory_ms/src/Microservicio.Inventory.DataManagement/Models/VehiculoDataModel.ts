export interface VehiculoDataModel {
  vehiculoId: string;
  modeloId: string | null;
  categoriaId: string | null;
  combustibleId: string | null;
  transmisionId: string | null;
  estadoId: string | null;
  placa: string;
  anio: number;
  color: string | null;
  precioDia: number;
  kilometraje: number | null;
  createdAt: Date | null;
}
