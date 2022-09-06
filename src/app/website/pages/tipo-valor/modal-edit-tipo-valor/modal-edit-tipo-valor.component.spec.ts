import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditTipoValorComponent } from './modal-edit-tipo-valor.component';

describe('ModalEditTipoValorComponent', () => {
  let component: ModalEditTipoValorComponent;
  let fixture: ComponentFixture<ModalEditTipoValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditTipoValorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditTipoValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
