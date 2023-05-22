import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from './slider.component';
import { MockModule, MockPipe } from "ng-mocks";
import { ToSlashCasePipe } from "@local/shared/utils";
import { MatSliderModule } from "@angular/material/slider";

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatSliderModule)
      ],
      declarations: [
        SliderComponent,
        MockPipe(ToSlashCasePipe)
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
