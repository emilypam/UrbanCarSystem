import { Express } from 'express';

export const API_PREFIX = '/api/v1';

export function configureApiVersioning(_app: Express): void {
  // Prefix applied per-router in ServiceCollectionExtensions
}
