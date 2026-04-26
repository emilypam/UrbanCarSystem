export class ValidationException extends Error {
  public readonly errors: string[];

  constructor(errors: string[]) {
    super('Validation failed.');
    this.name = 'ValidationException';
    this.errors = errors;
  }
}
