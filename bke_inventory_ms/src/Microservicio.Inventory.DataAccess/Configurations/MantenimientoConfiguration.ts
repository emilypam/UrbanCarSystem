export const MantenimientoConfiguration = {
  tableName: 'mantenimientos',
  fields: {
    id: 'man_id',
    vehiculoId: 'veh_id',
    fecha: 'man_fecha',
    descripcion: 'man_descripcion',
    costo: 'man_costo',
    siguienteKm: 'man_siguiente_km',
  },
} as const;
