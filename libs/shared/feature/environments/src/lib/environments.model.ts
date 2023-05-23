export interface Environment {
  production: boolean;
  apiBackendUrl: string;
  externalIntegrationUrl: string;
  captchaV2Key: string;
  captchaV3Key: string;
}

export type DockerEnvVariables = {
  API_BACKEND_URL?: string,
  EXTERNAL_INTEGRATION_URL?: string,
  CAPTCHA_V2_KEY?: string;
  CAPTCHA_V3_KEY?: string;
};

declare global {
  interface Window {
    env: DockerEnvVariables
  }
}
