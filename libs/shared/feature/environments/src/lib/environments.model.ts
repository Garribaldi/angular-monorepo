export interface Environment {
  production: boolean;
  apiBackendUrl?: string;
  externalIntegrationUrl?: string;
}

type DockerEnvVariables = {
  API_BACKEND_URL?: string,
  EXTERNAL_INTEGRATION_URL?: string
};

export type WindowEnv = Window & DockerEnvVariables;

