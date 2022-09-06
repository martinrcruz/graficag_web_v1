import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPdfComponent } from './tabla-pdf.component';

describe('TablaPdfComponent', () => {
  let component: TablaPdfComponent;
  let fixture: ComponentFixture<TablaPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
