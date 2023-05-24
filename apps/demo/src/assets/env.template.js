(function (window) {
  window["env"] = window["env"] || {};
  window["env"].API_BACKEND_URL = "${ENV_API_BACKEND_URL}";
  window["env"].EXTERNAL_INTEGRATION_URL = "${ENV_EXTERNAL_INTEGRATION_URL}";
  window["env"].GOOGLE_CAPTCHA_V2_KEY = '${ENV_CAPTCHA_V2_KEY}';
  window["env"].GOOGLE_CAPTCHA_V3_KEY = '${ENV_CAPTCHA_V3_KEY}';
})(this)
