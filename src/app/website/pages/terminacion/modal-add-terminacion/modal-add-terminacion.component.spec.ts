import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddTerminacionComponent } from './modal-add-terminacion.component';

describe('ModalAddTerminacionComponent', () => {
  let component: ModalAddTerminacionComponent;
  let fixture: ComponentFixture<ModalAddTerminacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddTerminacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddTerminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
