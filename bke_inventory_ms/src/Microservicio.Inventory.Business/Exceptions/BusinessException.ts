// BusinessException.ts
export class BusinessException extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.name = "BusinessException";
        this.statusCode = statusCode;
        
        // Esto es vital en TypeScript para que el instanceof funcione
        Object.setPrototypeOf(this, BusinessException.prototype);
    }
}