import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditTerminacionComponent } from './modal-edit-terminacion.component';

describe('ModalEditTerminacionComponent', () => {
  let component: ModalEditTerminacionComponent;
  let fixture: ComponentFixture<ModalEditTerminacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditTerminacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditTerminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
