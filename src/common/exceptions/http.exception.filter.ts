import { FastifyReply, FastifyRequest } from 'fastify';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { BusinessException } from './business.exception';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly Logger: LoggerService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();

    this.Logger.error('exception:' + JSON.stringify(exception));
    this.Logger.error('url:' + JSON.stringify(request.url));
    this.Logger.error('body:' + JSON.stringify(request.body));
    this.Logger.error('query:' + JSON.stringify(request.query));
    this.Logger.error('params:' + JSON.stringify(request.params));
    this.Logger.error('headers:' + JSON.stringify(request.headers));

    // 处理业务异常
    if (exception instanceof BusinessException) {
      const error = exception.getResponse();
      response.status(HttpStatus.OK).send({
        responseTime: new Date(),
        status: error['code'],
        message: error['message'],
        success: false,
      });
      return;
    }

    const exResponse = exception.getResponse();

    if (typeof exResponse === 'string') {
      response.status(status).send({
        status: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.getResponse(),
      });
    } else {
      response.status(status).send({
        status: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...(exception.getResponse() as any),
      });
    }
  }
}
