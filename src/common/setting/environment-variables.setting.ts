import { Logger } from 'nestjs-pino';
import { z } from 'zod';
import { environmentValues, nodeEnvValues } from './model.setting';
export const CommonVariablesSchema = z
  .object({
    ENVIRONMENT: z.enum(environmentValues),
    NODE_ENV: z.enum(nodeEnvValues),
    LOG_LEVEL: z.string(),
    APP_NAME: z.string(),
    HTTP_PORT: z.coerce.number(),
  })
  .describe('CommonVariables');

export const EnvironmentVariablesSchema = CommonVariablesSchema.describe(
  'EnvironmentVariables',
);

export type EnvironmentVariables = z.infer<typeof EnvironmentVariablesSchema>;

export const validateEnvironment = (
  configuration: Record<string, unknown>,
  logger: Logger,
) => {
  try {
    return EnvironmentVariablesSchema.parse(configuration);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const pathErros = error.errors.map((err) => err.path.join('.'));

      logger.warn(
        `Environment variables don't match the schema: ${pathErros.join(', ')}`,
      );
    } else {
      logger.warn(`Exception on Environment variables: ${error}`);
    }
    return true;
  }
};
