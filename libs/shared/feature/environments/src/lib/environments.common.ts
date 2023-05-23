import { DockerEnvVariables, Environment } from "./environments.model";

const glob: Window = window;
const env: DockerEnvVariables = glob.env;

export const commonEnvironment: Environment = {
  production: false,
  apiBackendUrl: env?.API_BACKEND_URL ?? '',
  externalIntegrationUrl: env?.EXTERNAL_INTEGRATION_URL ?? '',
  captchaV2Key: env?.CAPTCHA_V2_KEY ?? '',
  captchaV3Key: env?.CAPTCHA_V3_KEY ?? ''
};
