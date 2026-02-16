import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepPreviewComponent } from './step-preview.component';

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

  it('should display certificate HTML', () => {
    component.certificadoHTML = '<div>Preview HTML</div>';
    component.titulo = 'Certificado de Estudio Sencillo';
    component.nombreEstudiante = 'Test User';
    component.documentoIdentidad = '12345678';
    component.numeroEstudiante = '10236580';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#certificadoPreviewDemo')?.innerHTML).toContain('Preview HTML');
  });

  it('should display inputs with correct values', () => {
    component.certificadoHTML = '';
    component.titulo = 'Certificado de Estudio Sencillo';
    component.nombreEstudiante = 'Juan Pérez';
    component.documentoIdentidad = '12345678';
    component.numeroEstudiante = '10236580';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#certificado_preview')?.getAttribute('value')).toBe('Certificado de Estudio Sencillo');
    expect(compiled.querySelector('#nombre_estudiante')?.getAttribute('value')).toBe('Juan Pérez');
    expect(compiled.querySelector('#documento_identidad')?.getAttribute('value')).toBe('12345678');
    expect(compiled.querySelector('#numero_estudiante')?.getAttribute('value')).toBe('10236580');
  });
});
