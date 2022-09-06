import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddProveedorComponent } from './modal-add-proveedor.component';

describe('ModalAddProveedorComponent', () => {
  let component: ModalAddProveedorComponent;
  let fixture: ComponentFixture<ModalAddProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
