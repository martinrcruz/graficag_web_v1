import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditEmpresaComponent } from './modal-edit-empresa.component';

describe('ModalEditEmpresaComponent', () => {
  let component: ModalEditEmpresaComponent;
  let fixture: ComponentFixture<ModalEditEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
