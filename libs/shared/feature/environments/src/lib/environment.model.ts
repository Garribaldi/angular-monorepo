export interface GoogleCaptcha {
  restApi: string;
  projectId: string;
  apiKey: string;
  captchaV2Key: string;
  captchaV3Key: string;
}

export interface Environment {
  production: boolean;
  googleCaptcha: GoogleCaptcha
}

export type DockerEnvVariables = {
  GOOGLE_CAPTCHA_V2_KEY?: string;
  GOOGLE_CAPTCHA_V3_KEY?: string;
  GOOGLE_API_KEY?: string;
  GOOGLE_PROJECT_ID?: string
  GOOGLE_CAPTCHA_REST_API?: string;
};

export type NodeEnvVariables = {
  APP_GOOGLE_CAPTCHA_V2_KEY?: string;
  APP_GOOGLE_CAPTCHA_V3_KEY?: string;
  APP_GOOGLE_API_KEY?: string;
  APP_GOOGLE_PROJECT_ID?: string
  APP_GOOGLE_CAPTCHA_REST_API?: string;
};

declare global {
  interface Window {
    env: DockerEnvVariables
  }
}
