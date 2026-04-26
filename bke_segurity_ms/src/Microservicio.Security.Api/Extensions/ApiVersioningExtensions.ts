import { Router } from 'express';

export const API_VERSION_V1 = 'v1';

export function createVersionedRouter(): Router {
  return Router({ mergeParams: true });
}
