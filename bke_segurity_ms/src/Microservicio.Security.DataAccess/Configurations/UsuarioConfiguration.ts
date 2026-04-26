export const UsuarioConfiguration = {
  tableName: 'usuarios',
  fields: {
    id: 'usu_id',
    email: 'usu_email',
    nombre: 'usu_nombre',
    password: 'usu_password',
    createdAt: 'usu_created_at',
  },
} as const;
