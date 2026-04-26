export interface JwtSettings {
  secret: string;
  expiresIn: string;
  refreshExpiresIn: string;
}

export function loadJwtSettings(): JwtSettings {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET no está definido.');
  return {
    secret,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  };
}
