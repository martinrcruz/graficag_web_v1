import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditFormaPagoComponent } from './modal-edit-forma-pago.component';

describe('ModalEditFormaPagoComponent', () => {
  let component: ModalEditFormaPagoComponent;
  let fixture: ComponentFixture<ModalEditFormaPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditFormaPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditFormaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
