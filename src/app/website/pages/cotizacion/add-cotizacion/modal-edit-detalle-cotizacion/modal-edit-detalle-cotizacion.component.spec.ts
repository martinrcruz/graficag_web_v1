import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditDetalleCotizacionComponent } from './modal-edit-detalle-cotizacion.component';

describe('ModalEditDetalleCotizacionComponent', () => {
  let component: ModalEditDetalleCotizacionComponent;
  let fixture: ComponentFixture<ModalEditDetalleCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditDetalleCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditDetalleCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
