import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEstadoProductoComponent } from './select-estado-producto.component';

describe('SelectEstadoProductoComponent', () => {
  let component: SelectEstadoProductoComponent;
  let fixture: ComponentFixture<SelectEstadoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectEstadoProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEstadoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
