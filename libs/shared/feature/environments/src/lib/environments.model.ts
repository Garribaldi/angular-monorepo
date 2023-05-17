export interface Environment {
  production: boolean;
  apiBackendUrl?: string;
  externalIntegrationUrl?: string;
  captchaV2Key: string;
  captchaV3Key: string;
}

type DockerEnvVariables = {
  API_BACKEND_URL?: string,
  EXTERNAL_INTEGRATION_URL?: string
};

export type WindowEnv = Window & DockerEnvVariables;

