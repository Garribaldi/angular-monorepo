import { getCaptchaV2 } from "../../support/app.po";

describe("Captcha", () => {

  let captchaElement: JQuery<HTMLElement>;

  beforeEach(() => {
    cy.intercept({url: /.*\/recaptcha\/api\.js.*/}).as('renderCaptcha');

    cy.viewport(1920, 1080);
    cy.visit("/captcha");
    cy.wait("@renderCaptcha");

    getCaptchaV2().then(container => captchaElement = container.find('iframe').first());
  });

  it('should show captcha element', () => {
    expect(captchaElement).not.to.be.undefined;
  });
});
