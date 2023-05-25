import { commonEnvironment } from "../environment.common";
import { Environment } from "../environment.model";

const env: Partial<Environment> = {
  apiBackendUrl: 'http://test.dev.api:8080',
  externalIntegrationUrl: 'http://integration.dev.api:8080'
};
export const environment: Environment = {...commonEnvironment, ...env};
