import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  GLOBAL_API_PREFIX,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_TAG,
  SWAGGER_API_TITLE,
  SWAGGER_API_VERSION,
} from './common/utils/constants.util';
import {
  EnvironmentVariables,
  validateEnvironment,
} from './common/setting/environment-variables.setting';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  app.setGlobalPrefix(GLOBAL_API_PREFIX);
  app.useLogger(app.get(Logger));

  const swaggerConfig = new DocumentBuilder()
    .setTitle(SWAGGER_API_TITLE)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_VERSION)
    .addTag(SWAGGER_API_TAG)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${GLOBAL_API_PREFIX}/api-docs`, app, document);

  const configService = app.get<ConfigService<EnvironmentVariables>>(
    ConfigService<EnvironmentVariables>,
  );
  validateEnvironment(process.env, app.get(Logger));
  await app.listen(
    configService.get('HTTP_PORT', 3100),
    '0.0.0.0',
    async () => {
      app
        .get(Logger)
        .log(`${GLOBAL_API_PREFIX} is running on: ${await app.getUrl()}`);
    },
  );
}
bootstrap();
