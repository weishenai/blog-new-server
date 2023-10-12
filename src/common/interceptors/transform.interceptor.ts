import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        let message = '操作成功';
        if (typeof data === 'object' && 'message' in data) {
          message = data.message;
          delete data.message;
        }
        return {
          // 告诉前端这不是一个异常
          status: 200,
          success: true,
          path: request.url,
          message,
          data: data,
          responseTime: new Date(),
        };
      }),
    );
  }
}
