import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrdenTrabajoComponent } from './add-orden-trabajo.component';

describe('AddOrdenTrabajoComponent', () => {
  let component: AddOrdenTrabajoComponent;
  let fixture: ComponentFixture<AddOrdenTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrdenTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
