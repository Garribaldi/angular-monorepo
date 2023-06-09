import { Environment, NodeEnvVariables } from "./environment.model";

const glob: Window = window;
// const env: DockerEnvVariables = glob.env;

const googleCaptchaV2TestKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

const nodeEnv: NodeEnvVariables = glob.Cypress
  ? {APP_GOOGLE_CAPTCHA_V2_KEY: googleCaptchaV2TestKey}
  : Object.entries(process.env)
    .filter(property => property[0].startsWith('APP_'))
    .reduce((acc, curr) => ({...acc, [curr[0]]: curr[1]}), {});

export const commonEnvironment: Environment = {
  production: false,
  backendUrl: 'http://localhost:8080/api/v1',
  googleCaptcha: {
    captchaV2Key: nodeEnv.APP_GOOGLE_CAPTCHA_V2_KEY ?? '',
    captchaV3Key: nodeEnv.APP_GOOGLE_CAPTCHA_V3_KEY ?? '',
    apiKey: nodeEnv.APP_GOOGLE_API_KEY ?? '',
    projectId: nodeEnv.APP_GOOGLE_PROJECT_ID ?? '',
    restApi: nodeEnv.APP_GOOGLE_CAPTCHA_REST_API ?? ''
  }
};
