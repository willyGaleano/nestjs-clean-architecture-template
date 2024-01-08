import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { ClsModule } from 'nestjs-cls';
import configuration from './common/setting/configuration.setting';
import { Headers } from './common/utils/headers.model.utils';
import { GlobalConfig } from './common/setting/model.setting';
import { HealthCheckModule } from './common/health-check/health-check.module';
import { getConfigLogger } from './common/utils/configs.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<GlobalConfig>) => {
        return getConfigLogger(configService);
      },
      inject: [ConfigService],
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls, req) => {
          cls.set('authorization', req.headers.authorization);
          cls.set('correlation-id', req.headers[Headers.CORRELATION_ID]);
        },
      },
    }),
    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
