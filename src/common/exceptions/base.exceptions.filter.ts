import { FastifyReply, FastifyRequest } from 'fastify';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  ServiceUnavailableException,
  Inject,
  LoggerService,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  // 依赖注入
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    // 异常日志示范
    this.Logger.error('exception:' + JSON.stringify(exception));
    this.Logger.error('url:' + JSON.stringify(request.url));
    this.Logger.error('body:' + JSON.stringify(request.body));
    this.Logger.error('query:' + JSON.stringify(request.query));
    this.Logger.error('params:' + JSON.stringify(request.params));
    this.Logger.error('headers:' + JSON.stringify(request.headers));

    const exResponse = new ServiceUnavailableException().getResponse();
    if (typeof exResponse === 'string') {
      // 非 HTTP 标准异常的处理。
      response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: new ServiceUnavailableException().getResponse(),
      });
    } else {
      // 非 HTTP 标准异常的处理。
      response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...(new ServiceUnavailableException().getResponse() as any),
      });
    }
  }
}
