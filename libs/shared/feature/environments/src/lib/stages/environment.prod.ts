import { Environment } from "../environments.model";
import { commonEnvironment } from "../environments.common";

const env: Partial<Environment> = {
  production: true,
  apiBackendUrl: 'http://test.dev.prod:8080',
  externalIntegrationUrl: 'http://integration.prod.api:8080'
};

export const environment: Environment = {...commonEnvironment, ...env};

/**
 * If environment object is nested, you can use deepCopy function from '@angular-devkit/core'
 *
 * export const environment: Environment = {...deepCopy(commonEnvironment), ...env};
 */
