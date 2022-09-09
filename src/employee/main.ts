import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { ENV } from '../common/config/config';
import { ResponseInterceptor } from '../common/interceptor/response';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(ENV.EMPLOYEE_PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();