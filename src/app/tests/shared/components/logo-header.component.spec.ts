import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoHeaderComponent } from '../../../shared/components/logo-header/logo-header.component';

describe('LogoHeaderComponent', () => {
  let component: LogoHeaderComponent;
  let fixture: ComponentFixture<LogoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo header template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.logo-container')).toBeTruthy();
  });

  it('should contain institution name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.innerHTML).toContain('tecnologicadeloriente.edu.co');
  });
});
