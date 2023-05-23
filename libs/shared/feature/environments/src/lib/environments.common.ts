import { DockerEnvVariables, Environment } from "./environments.model";

const glob: Window = window;
const env: DockerEnvVariables = glob.env;

export const commonEnvironment: Environment = {
  production: false,
  apiBackendUrl: env?.API_BACKEND_URL ?? '',
  externalIntegrationUrl: env?.EXTERNAL_INTEGRATION_URL ?? '',
  googleCaptcha: {
    captchaV2Key: env?.GOOGLE_CAPTCHA_V2_KEY ?? '',
    captchaV3Key: env?.GOOGLE_CAPTCHA_V3_KEY ?? '',
    apiKey: env?.GOOGLE_API_KEY ?? '',
    projectId: env?.GOOGLE_PROJECT_ID ?? '',
    restApi: env?.GOOGLE_CAPTCHA_REST_API ?? ''
  }
};
