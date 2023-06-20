import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoFormlyComponent } from './demo-formly.component';

describe('DemoFormlyComponent', () => {
  let component: DemoFormlyComponent;
  let fixture: ComponentFixture<DemoFormlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoFormlyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoFormlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
