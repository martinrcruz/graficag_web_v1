import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddEmpresaComponent } from './modal-add-empresa.component';

describe('ModalAddEmpresaComponent', () => {
  let component: ModalAddEmpresaComponent;
  let fixture: ComponentFixture<ModalAddEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
