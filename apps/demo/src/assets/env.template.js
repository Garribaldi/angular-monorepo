(function (window) {
  window["env"] = window["env"] || {};
  window["env"].API_BACKEND_URL = "${ENV_API_BACKEND_URL}";
  window["env"].EXTERNAL_INTEGRATION_URL = "${ENV_EXTERNAL_INTEGRATION_URL}";
  window["env"].GOOGLE_CAPTCHA_V2_KEY = '${ENV_GOOGLE_CAPTCHA_V2_KEY}';
  window["env"].GOOGLE_CAPTCHA_V3_KEY = '${ENV_GOOLE_CAPTCHA_V3_KEY}';
  window["env"].GOOGLE_API_KEY = '${ENV_GOOGLE_API_KEY}';
  window["env"].GOOGLE_PROJECT_ID = '${ENV_GOOGLE_PROJECT_ID}';
  window["env"].GOOGLE_CAPTCHA_REST_API = '${ENV_GOOGLE_CAPTCHA_REST_API}';
})(this)
