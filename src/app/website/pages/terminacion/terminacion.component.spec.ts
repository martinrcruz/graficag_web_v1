import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminacionComponent } from './terminacion.component';

describe('TerminacionComponent', () => {
  let component: TerminacionComponent;
  let fixture: ComponentFixture<TerminacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
