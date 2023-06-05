import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoAngularMaterialComponent } from './demo-angular-material.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('AngularMaterialComponent', () => {
  let component: DemoAngularMaterialComponent;
  let fixture: ComponentFixture<DemoAngularMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ],
      declarations: [DemoAngularMaterialComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoAngularMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
