import { BusinessException } from './BusinessException';

export class NotFoundException extends BusinessException {
  constructor(resource: string, id: string) {
    super(`${resource} con ID '${id}' no encontrado.`, 404);
    this.name = 'NotFoundException';
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}
