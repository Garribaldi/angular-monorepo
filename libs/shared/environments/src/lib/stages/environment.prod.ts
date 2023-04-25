import { Environment } from "../environments.model";
import { commonEnvironment } from "../environments.common";

const env: Partial<Environment> = {production: true};
export const environment: Environment = {...commonEnvironment, ...env};
