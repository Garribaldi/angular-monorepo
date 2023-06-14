import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalFormlyComponent } from './local-formly.component';

describe('FormlyComponent', () => {
  let component: LocalFormlyComponent;
  let fixture: ComponentFixture<LocalFormlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalFormlyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocalFormlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
