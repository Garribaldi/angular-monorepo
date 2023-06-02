import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoAngularMaterialComponent } from './demo-angular-material.component';

describe('AngularMaterialComponent', () => {
  let component: DemoAngularMaterialComponent;
  let fixture: ComponentFixture<DemoAngularMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
