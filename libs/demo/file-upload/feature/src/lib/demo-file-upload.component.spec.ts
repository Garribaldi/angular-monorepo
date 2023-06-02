import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoFileUploadComponent } from './demo-file-upload.component';
import { MockModule } from "ng-mocks";
import { FileUploadModule } from "@local/file-upload/feature";

describe('FileUploadComponent', () => {
  let component: DemoFileUploadComponent;
  let fixture: ComponentFixture<DemoFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(FileUploadModule)
      ],
      declarations: [DemoFileUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
