import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminacionOTComponent } from './terminacion.component';

describe('TerminacionOTComponent', () => {
  let component: TerminacionOTComponent;
  let fixture: ComponentFixture<TerminacionOTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminacionOTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminacionOTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
