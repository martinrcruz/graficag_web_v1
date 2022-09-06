import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddFormaPagoComponent } from './modal-add-forma-pago.component';

describe('ModalAddFormaPagoComponent', () => {
  let component: ModalAddFormaPagoComponent;
  let fixture: ComponentFixture<ModalAddFormaPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddFormaPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddFormaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
