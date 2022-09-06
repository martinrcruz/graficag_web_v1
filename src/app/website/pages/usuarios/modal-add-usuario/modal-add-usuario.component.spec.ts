import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddUsuarioComponent } from './modal-add-usuario.component';

describe('ModalAddUsuarioComponent', () => {
  let component: ModalAddUsuarioComponent;
  let fixture: ComponentFixture<ModalAddUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
