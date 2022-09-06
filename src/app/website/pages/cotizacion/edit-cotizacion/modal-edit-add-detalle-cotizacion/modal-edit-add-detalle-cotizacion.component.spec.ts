import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditAddDetalleCotizacionComponent } from './modal-edit-add-detalle-cotizacion.component';

describe('ModalEditAddDetalleCotizacionComponent', () => {
  let component: ModalEditAddDetalleCotizacionComponent;
  let fixture: ComponentFixture<ModalEditAddDetalleCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditAddDetalleCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditAddDetalleCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
