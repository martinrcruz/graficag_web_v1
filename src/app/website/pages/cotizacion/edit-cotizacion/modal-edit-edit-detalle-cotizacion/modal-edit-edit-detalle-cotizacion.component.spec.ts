import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditEditDetalleCotizacionComponent } from './modal-edit-edit-detalle-cotizacion.component';

describe('ModalEditEditDetalleCotizacionComponent', () => {
  let component: ModalEditEditDetalleCotizacionComponent;
  let fixture: ComponentFixture<ModalEditEditDetalleCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditEditDetalleCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditEditDetalleCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
