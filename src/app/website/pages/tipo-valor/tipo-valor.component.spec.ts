import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoValorComponent } from './tipo-valor.component';

describe('TipoValorComponent', () => {
  let component: TipoValorComponent;
  let fixture: ComponentFixture<TipoValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoValorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
