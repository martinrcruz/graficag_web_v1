import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditProveedorComponent } from './modal-edit-proveedor.component';

describe('ModalEditProveedorComponent', () => {
  let component: ModalEditProveedorComponent;
  let fixture: ComponentFixture<ModalEditProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
