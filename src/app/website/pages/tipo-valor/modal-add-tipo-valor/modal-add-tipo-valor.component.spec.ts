import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddTipoValorComponent } from './modal-add-tipo-valor.component';

describe('ModalAddTipoValorComponent', () => {
  let component: ModalAddTipoValorComponent;
  let fixture: ComponentFixture<ModalAddTipoValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddTipoValorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddTipoValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
