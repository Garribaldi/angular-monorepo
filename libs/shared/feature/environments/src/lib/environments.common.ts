import { Environment, WindowEnv } from "./environments.model";

const env: WindowEnv = window["env" as never];

export const commonEnvironment: Environment = {
  production: false,
  apiBackendUrl: env?.API_BACKEND_URL,
  externalIntegrationUrl: env?.EXTERNAL_INTEGRATION_URL
};
