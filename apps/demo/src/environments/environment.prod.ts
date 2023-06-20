import { commonEnvironment, Environment } from "@local/shared/feature/environments";

const env: Partial<Environment> = {
  production: true
};

/**
 * If environment object is nested, you can use deepCopy function from '@angular-devkit/core'
 *
 * export const environment: Environment = {...deepCopy(commonEnvironment), ...env};
 */
export const environment: Environment = {...commonEnvironment, ...env};
