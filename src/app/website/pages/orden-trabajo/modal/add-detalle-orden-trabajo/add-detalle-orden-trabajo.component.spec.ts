import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetalleOrdenTrabajoComponent } from './add-detalle-orden-trabajo.component';

describe('AddDetalleOrdenTrabajoComponent', () => {
  let component: AddDetalleOrdenTrabajoComponent;
  let fixture: ComponentFixture<AddDetalleOrdenTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDetalleOrdenTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDetalleOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
