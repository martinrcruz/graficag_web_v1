import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoOrdenTrabajoComponent } from './pago-orden-trabajo.component';

describe('PagoOrdenTrabajoComponent', () => {
  let component: PagoOrdenTrabajoComponent;
  let fixture: ComponentFixture<PagoOrdenTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoOrdenTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
