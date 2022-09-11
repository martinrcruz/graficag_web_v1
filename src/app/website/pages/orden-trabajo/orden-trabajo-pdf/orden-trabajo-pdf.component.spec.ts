import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenTrabajoPdfComponent } from './orden-trabajo-pdf.component';

describe('OrdenTrabajoPdfComponent', () => {
  let component: OrdenTrabajoPdfComponent;
  let fixture: ComponentFixture<OrdenTrabajoPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenTrabajoPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenTrabajoPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
