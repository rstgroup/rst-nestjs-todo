import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ProjectsService } from '../../projects/projects.service';

@ValidatorConstraint()
@Injectable()
export class IsProjectIdValidConstraint implements ValidatorConstraintInterface {
    constructor(private readonly projectsService: ProjectsService) {}

    async validate(projectId: number, args: ValidationArguments): Promise<boolean> {
        if (projectId === null || projectId === undefined) {
            return true;
        }

        return !!this.projectsService.getById(projectId);
    }

    defaultMessage({ value }: ValidationArguments): string {
        return `Project(${value}) does not exist`;
    }
}

export const IsProjectIdValid = (validationOptions?: ValidationOptions) => {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'IsProjectIdValid',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsProjectIdValidConstraint,
        });
    };
};
