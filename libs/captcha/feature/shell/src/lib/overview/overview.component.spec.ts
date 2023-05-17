import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewComponent } from './overview.component';
import { MatRadioModule } from "@angular/material/radio";
import { FormsModule } from "@angular/forms";
import { MockComponent } from "ng-mocks";
import { Captchav2Component } from "../captchav2/captchav2.component";
import { Captchav3Component } from "../captchav3/captchav3.component";


describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatRadioModule,
        FormsModule
      ],
      declarations: [
        OverviewComponent,
        MockComponent(Captchav2Component),
        MockComponent(Captchav3Component)
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
