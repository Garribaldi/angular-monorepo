import { Environment, WindowEnv } from "./environments.model";

const env: WindowEnv = window["env" as never];

export const commonEnvironment: Environment = {
  production: false,
  apiBackendUrl: env?.API_BACKEND_URL,
  externalIntegrationUrl: env?.EXTERNAL_INTEGRATION_URL,
  captchaV2Key: '6LembhcmAAAAAIalNt37s5e5GI7UnSlhfPuH7xMy',
  captchaV3Key: '6LfVoxYmAAAAAAxPPi54PxsHGt_4ZG1Xm6ELRDuE'
};
