import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Captchav2Component } from './captchav2.component';
import { MockComponent, MockProvider } from "ng-mocks";
import { RecaptchaComponent } from "ng-recaptcha";
import { EnvironmentsService } from "@local/shared/feature/environments";
import { GoogleValidateService } from "@local/captcha/data-access";
import { of } from "rxjs";
import { GoogleEvaluateCaptchaResponse } from "../../../../../data-access/src/lib/google-api.model";

describe('Captchav2Component', () => {
  let component: Captchav2Component;
  let fixture: ComponentFixture<Captchav2Component>;

  const captchaSiteKey = 'abcdef';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        Captchav2Component,
        MockComponent(RecaptchaComponent)
      ],
      providers: [
        MockProvider(EnvironmentsService, {
          googleCaptcha: {
            restApi: '',
            projectId: '12345-test-project',
            apiKey: 'afg123des',
            captchaV2Key: captchaSiteKey,
            captchaV3Key: ''
          }
        }),
        MockProvider(GoogleValidateService, {
          validateResponse$: () => of({} as GoogleEvaluateCaptchaResponse)
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Captchav2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.siteKey).toEqual(captchaSiteKey);
  });

  describe('resolved()', () => {

    let spyOnCaptchaClicked: jest.SpyInstance;
    let spyOnTimeout: jest.SpyInstance;

    beforeEach(() => {
      spyOnCaptchaClicked = jest.spyOn(component.captchaClicked, 'emit');
      spyOnTimeout = jest.spyOn(component.timedOut, 'emit');
    });

    it('should resolve captcha', () => {
      const resolveToken = '03AL8dmw9qdDsMhyoOvoUr2AAt3zvrQt683GftuPU8akI36l5Xhn0P5ZeEW31nUrSLlCpFnTKApTZdD_sL1kgJGTt9k296A1zEDvwveoHm_vTNnVfKt_7Qb2JZEWyuSFWVXqBFNUlyT_szo1a6XoMh9AhYIFfKsxI61w1g2NXykc5z1_TF-RGL72E33YhlPmQ60_KLcf4IhZdhTZstC-WzC_FbGEbwx8386lngaRVHa9QHY9-abUVzSnbaTITwLXEhF11bHjIbOrVp8e3FDAiD9PiqoAoLaLsARNH_aSxnbnRnAtwc2DNGBCfNDtylVXNeKA4UIb0NbIcR9XPwKhVnyH20jG1ZSFq_gtYMVafm8JlAqI6jKKjQ0du2U8nGJY21TBA6SCL66sJ1nMz0pGfddQthKIkYHbkVxonOVGKut4i6orj82P-g8vXcjzkaxJyYMnxyDtxFpbd094xNBI8kkTOD7zvANM4LYgSFM8vu3SiW-32tvckFwTCchz1VXoR877WamZfMSAFszYAJnfWGXf7Kwd4gWzv1B7A7z4jjNsnePa1nQmJ3prfMO7toKNgq_knItdTYeeT6Bky0_8eDoyKhYSD2-MD2-9Hu2gLKVdG_Ik9uWHwk22TswF5MoRIgkg-YUm3sPuze5Alf29kr8ArInGDO4Ic_QU29mH0uFll_Zp25q0fLEKGGagADH7WhXpr0TslM9qiyytjmtOjUNbiu3nrhw3uKvM9p5rO2nImHP29zonyiFwzxyi0h4ZLMqrDVjCWhlvgNVTzOMfqRwDmHCi4MhHxjOzqDk4f-ss6W3sAui5Msp-sfBDPaXKSFBO7V1tDJ3jvj3YeL1cSrfWDFt8WcGLRI2V1Qyg0c3EtZ__j_871OPnr6XJzX8Tjro2cgmttk6BTz30zYXb-J2Uw4H40eY-B1erJ96vjU_KAUWWutd1k8dKj-y7h55QqH2f7NO6q4BcRpwX9odFOC3Mmb2lTKKsu3OYEIdPwMFKAt5rYcAdWerQ9preMMrMnAebUptAON9xDhBxFUsV3EoTjzUfx2RX3yaxYSgtQYxgY_OHpWnJKTQhd7upQ8dl6RpMfTCx81owZJyFaGukZlAJ_23jXlz4P4wIZ3ZUYN1HOsRFI1hkY9U49aab1IDOUrC6FuxnH0egut9pCCe2O514yQOF8g6NLS8QICRpWzLVYqWPLtDETMtV1peAGtvsiCye1jdStEaeV9BcoHl6gOlbac7KClBC2m277h1bdAu12Ahh5QAzEol9a_5QAlv4Ym89uQRZ3Evg4j5oROjRvT4A2jSz57bsKqMp5gVWfKXNR4-miagB5u89KyCUIODwiwrs1N1epy8oU8RN-GFcwl4KuFP93e90OzudHWRpIw6yKanE6zt6IsoDtACy3OC3B0Mpo9996JLsWSxwu4QkM63BxgMEfZtGDOE2c1a3YaX7_SeAxZMfTundpQhdsfHzAqutlir0ut4S1R';
      component.resolved(resolveToken)

      expect(spyOnCaptchaClicked).toHaveBeenCalled();
    });

    it('should time out captcha', () => {
      component.resolved(null);

      expect(spyOnTimeout).toHaveBeenCalled();
    });
  });

  describe('errored()', () => {

    let spyOnError: jest.SpyInstance;

    beforeEach(() => spyOnError = jest.spyOn(component.hasError, 'emit'));

    it('should send error', () => {
      component.errored([]);

      expect(spyOnError).toHaveBeenCalledWith([]);
    });
  });
});
