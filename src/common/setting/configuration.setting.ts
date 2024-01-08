import { Environment, GlobalConfig, LogLevel, NodeEnv } from './model.setting';

export default (): GlobalConfig => ({
  appName: process.env.APP_NAME || 'nestjs-clean-architecture-template',
  environment: (process.env.ENVIRONMENT as Environment) || Environment.LOCAL,
  logLevel: (process.env.LOG_LEVEL as LogLevel) || LogLevel.TRACE,
  nodeEnv: (process.env.NODE_ENV as NodeEnv) || NodeEnv.DEVELOPMENT,
});
