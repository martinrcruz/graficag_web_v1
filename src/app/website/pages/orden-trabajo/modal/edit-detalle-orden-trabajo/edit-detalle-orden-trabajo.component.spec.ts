import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetalleOrdenTrabajoComponent } from './edit-detalle-orden-trabajo.component';

describe('EditDetalleOrdenTrabajoComponent', () => {
  let component: EditDetalleOrdenTrabajoComponent;
  let fixture: ComponentFixture<EditDetalleOrdenTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDetalleOrdenTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDetalleOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
