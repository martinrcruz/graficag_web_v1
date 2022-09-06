import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTerminacionEditComponent } from './add-terminacion-edit.component';

describe('AddTerminacionEditComponent', () => {
  let component: AddTerminacionEditComponent;
  let fixture: ComponentFixture<AddTerminacionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTerminacionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTerminacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
