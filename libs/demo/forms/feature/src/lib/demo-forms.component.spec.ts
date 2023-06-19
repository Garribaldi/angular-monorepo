import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoFormsComponent } from './demo-forms.component';

describe('DemoFormlyComponent', () => {
  let component: DemoFormsComponent;
  let fixture: ComponentFixture<DemoFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoFormsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
