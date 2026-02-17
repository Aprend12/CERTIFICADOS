import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepPagosComponent } from '../../../../features/certificados/components/step-pagos/step-pagos.component';

describe('StepPagosComponent', () => {
  let component: StepPagosComponent;
  let fixture: ComponentFixture<StepPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepPagosComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StepPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
