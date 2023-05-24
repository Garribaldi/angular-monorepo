export type GoogleEvaluateCaptchaResponseDto = {
  event: {
    expectedAction: string;
    express: boolean;
    firewallPolicyEvaluation: boolean;
    hashedAccountId: string;
    headers: string[];
    ja3: string;
    requestedUri: string;
    siteKey: string;
    token: string;
    userAgent: string;
    userIpAddress: string;
    wafTokenAssessment: boolean;
  };
  name: string;
  riskAnalysis: {
    extendedVerdictReasons: string[];
    reasons: string[];
    score: number;
  };
  tokenProperties: {
    action: string;
    androidPackageName: string;
    createTime: string;
    hostname: string;
    invalidReason: string;
    iosBundleId: string;
    valid: boolean;
  };
}

export type GoogleEvaluateCaptchaResponse = {
  name: string;
  valid: boolean;
  score: number;
  siteKey: string;
  token: string;
  createTime: Date;
  invalidReason?: string;
}

export type GoogleEvaluateCaptchaRequestBody = {
  event: {
    token: string;
    siteKey: string;
    expectedAction: string
  }
}
