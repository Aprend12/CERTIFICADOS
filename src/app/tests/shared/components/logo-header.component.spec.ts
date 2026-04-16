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

  it('should render overlay with hero structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.overlay')).toBeTruthy();
    expect(compiled.querySelector('.hero-photo')).toBeTruthy();
    expect(compiled.querySelector('.hero-fade')).toBeTruthy();
  });

  it('should render logo container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.logo-container')).toBeTruthy();
  });

  it('should contain institution logo image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.innerHTML).toContain('tecnologicadeloriente.edu.co');
    expect(compiled.querySelector('.logo-img')).toBeTruthy();
  });
});
