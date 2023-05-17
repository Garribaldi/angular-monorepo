import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Captchav2Component } from './captchav2.component';
import { MockComponent } from "ng-mocks";
import { RecaptchaComponent } from "ng-recaptcha";

describe('Captchav2Component', () => {
  let component: Captchav2Component;
  let fixture: ComponentFixture<Captchav2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        Captchav2Component,
        MockComponent(RecaptchaComponent)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Captchav2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
