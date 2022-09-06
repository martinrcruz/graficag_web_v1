import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditCategoriaComponent } from './modal-edit-categoria.component';

describe('ModalEditCategoriaComponent', () => {
  let component: ModalEditCategoriaComponent;
  let fixture: ComponentFixture<ModalEditCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
