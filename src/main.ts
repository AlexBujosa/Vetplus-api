import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './global/filter/custom-exception.filter';
import * as passport from 'passport';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CustomExceptionFilter(httpAdapterHost));
  app.use(passport.initialize());
  app.use(graphqlUploadExpress({ maxFileSize: 3000000, maxFiles: 10 }));
  app.enableCors({
    allowedHeaders: ['Authorization', 'Content-Type'],
    origin: '*',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
