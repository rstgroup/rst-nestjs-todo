import { ValidationError } from 'class-validator';
import { NotFoundException } from '@nestjs/common';

export class ValidationException extends NotFoundException {
    public errors: ValidationError[] = [];

    constructor(errors: ValidationError | ValidationError[]) {
        super('Validation error');
        this.errors = Array.isArray(errors) ? errors : [errors];
    }
}
