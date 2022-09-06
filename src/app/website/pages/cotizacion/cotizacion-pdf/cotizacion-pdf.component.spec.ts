import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionPdfComponent } from './cotizacion-pdf.component';

describe('CotizacionPdfComponent', () => {
  let component: CotizacionPdfComponent;
  let fixture: ComponentFixture<CotizacionPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizacionPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
