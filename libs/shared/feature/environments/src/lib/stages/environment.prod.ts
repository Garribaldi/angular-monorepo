import { Environment } from "../environments.model";
import { commonEnvironment } from "../environments.common";
import { deepCopy } from "@angular-devkit/core";

const env: Partial<Environment> = {production: true};

export const environment: Environment = {...deepCopy(commonEnvironment), ...env};
