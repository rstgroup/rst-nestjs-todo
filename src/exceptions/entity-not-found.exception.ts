import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
    constructor(entityName, entityId) {
        super(
            `${entityName.substring(0, 1).toUpperCase()}${entityName.substring(
                1,
            )}(${entityId}) has not been found`,
        );
    }
}
