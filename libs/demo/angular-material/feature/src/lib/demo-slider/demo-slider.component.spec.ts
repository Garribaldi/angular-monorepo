import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoSliderComponent } from './demo-slider.component';

describe('SliderShellComponent', () => {
  let component: DemoSliderComponent;
  let fixture: ComponentFixture<DemoSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
