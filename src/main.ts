import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import type { SERVER } from './interface/Environment';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { generateDocument } from './doc';
import { join } from 'path';
import fastifyMutipart from 'fastify-multipart';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalInterceptors(new TransformInterceptor());
  // app.setGlobalPrefix('api');
  generateDocument(app);
  // 配置模版引擎
  app.useStaticAssets({
    root: join(process.cwd(), 'public'),
    prefix: '/',
  });
  //
  await app.register(fastifyMutipart, {
    addToBody: true,
  });
  const configService = app.get(ConfigService);
  const server: SERVER = configService.get('SERVER');
  await app.listen(server.port, server.host);
}
bootstrap().then(() => {
  console.log('server start success');
});
