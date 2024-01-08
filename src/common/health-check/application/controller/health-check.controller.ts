import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheckService } from '../service/health-check.service';
import { HealthCheckResponseDto } from '../../domain/dto/health-check.response.dto';

@ApiTags('health-check')
@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return OK if the service is running',
    type: HealthCheckResponseDto,
  })
  getHealthCheck(): HealthCheckResponseDto {
    return this.healthCheckService.getHealthCheck();
  }
}
