import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddDetalleCotizacionComponent } from './modal-add-detalle-cotizacion.component';

describe('ModalAddDetalleCotizacionComponent', () => {
  let component: ModalAddDetalleCotizacionComponent;
  let fixture: ComponentFixture<ModalAddDetalleCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddDetalleCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddDetalleCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
