import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from '../authentication.service';
import { UserRequest } from '../interfaces/user-request.interface';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(private readonly authenticationService: AuthenticationService) {}

    use(req: UserRequest, res: Response, next: Function) {
        req.user = this.authenticationService.authenticate(req.header('token'));
        next();
    }
}
