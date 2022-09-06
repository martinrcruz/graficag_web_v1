import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditProductoComponent } from './modal-edit-producto.component';

describe('ModalEditProductoComponent', () => {
  let component: ModalEditProductoComponent;
  let fixture: ComponentFixture<ModalEditProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
