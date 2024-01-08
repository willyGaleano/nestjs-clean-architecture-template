import { Module } from '@nestjs/common';
import { HealthCheckService } from './application/service/health-check.service';
import { HealthCheckController } from './application/controller/health-check.controller';

@Module({
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
