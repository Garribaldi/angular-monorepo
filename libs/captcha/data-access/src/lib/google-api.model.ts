export type GoogleEvaluateCaptchaResponse = {
  tokenProperties: {
    valid: boolean;
    hostname: string;
    action: string;
    createTime: Date;
  };
  riskAnalysis: {
    score: number;
    reasons: string[]
  };
  event: {
    token: string;
    siteJey: string;
    expectedAction: string;
  };
  name: string;
}

export type GoogleEvaluateCaptchaRequestBody = {
  event: {
    token: string;
    siteKey: string;
    expectedAction: string
  }
}
