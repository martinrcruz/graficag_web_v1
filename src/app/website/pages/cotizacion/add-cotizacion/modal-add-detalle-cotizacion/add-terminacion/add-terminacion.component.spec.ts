import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTerminacionComponent } from './add-terminacion.component';

describe('AddTerminacionComponent', () => {
  let component: AddTerminacionComponent;
  let fixture: ComponentFixture<AddTerminacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTerminacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTerminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
