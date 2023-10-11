import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const generateDocument = (app) => {
  const options = new DocumentBuilder()
    .setTitle('博客')
    .setDescription('博客项目')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/doc', app, document, {
    // 个性化样式
    customCssUrl: '/css/theme-material.css',
  });
};
