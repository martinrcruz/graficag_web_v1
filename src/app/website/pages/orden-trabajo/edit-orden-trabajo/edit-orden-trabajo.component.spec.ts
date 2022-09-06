import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrdenTrabajoComponent } from './edit-orden-trabajo.component';

describe('EditOrdenTrabajoComponent', () => {
  let component: EditOrdenTrabajoComponent;
  let fixture: ComponentFixture<EditOrdenTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrdenTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
