import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOtPdfComponent } from './tabla-ot-pdf.component';

describe('TablaOtPdfComponent', () => {
  let component: TablaOtPdfComponent;
  let fixture: ComponentFixture<TablaOtPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaOtPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaOtPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
