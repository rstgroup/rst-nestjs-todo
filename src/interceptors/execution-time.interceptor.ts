import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExecutionTimeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{ data: any; executionTime: number }> {
    const now = Date.now();

    return next.handle().pipe(
      map(data => ({
        data,
        executionTime: Date.now() - now,
      })),
    );
  }
}
