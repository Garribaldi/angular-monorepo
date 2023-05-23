import { commonEnvironment } from "../environments.common";
import { Environment } from "../environments.model";

const env: Partial<Environment> = {
  apiBackendUrl: 'http://test.dev.api:8080',
  externalIntegrationUrl: 'http://integration.dev.api:8080'
};
export const environment: Environment = {...commonEnvironment, ...env};
