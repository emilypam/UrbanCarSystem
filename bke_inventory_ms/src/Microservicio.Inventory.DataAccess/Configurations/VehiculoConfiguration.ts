export const VehiculoConfiguration = {
  tableName: 'vehiculos',
  fields: {
    id: 'veh_id',
    modeloId: 'mod_id',
    categoriaId: 'cat_id',
    combustibleId: 'com_id',
    transmisionId: 'tra_id',
    estadoId: 'est_id',
    placa: 'veh_placa',
    anio: 'veh_anio',
    color: 'veh_color',
    precioDia: 'veh_precio_dia',
    kilometraje: 'veh_kilometraje',
    createdAt: 'veh_created_at',
  },
} as const;
