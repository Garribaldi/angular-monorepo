import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubnavComponent } from './subnav.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('SubnavComponent', () => {
  let component: SubnavComponent;
  let fixture: ComponentFixture<SubnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [SubnavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
