import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditUsuarioComponent } from './modal-edit-usuario.component';

describe('ModalEditUsuarioComponent', () => {
  let component: ModalEditUsuarioComponent;
  let fixture: ComponentFixture<ModalEditUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
