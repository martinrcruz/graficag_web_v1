import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoCotizacionComponent } from './pago-cotizacion.component';

describe('PagoCotizacionComponent', () => {
  let component: PagoCotizacionComponent;
  let fixture: ComponentFixture<PagoCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
