import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepPreviewComponent } from '../../../../features/certificados/compra-certificado/components/step-preview/step-preview.component';

describe('StepPreviewComponent', () => {
  let component: StepPreviewComponent;
  let fixture: ComponentFixture<StepPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepPreviewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StepPreviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set certificadoHTML and sanitize it', () => {
    component.certificadoHTML = '<div>Preview HTML</div>';
    expect(component.certSafe).toBeTruthy();
  });

  it('should display certificate HTML when set', () => {
    component.certificadoHTML = '<div class="certificado">Test Content</div>';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.innerHTML).toContain('Test Content');
  });
});