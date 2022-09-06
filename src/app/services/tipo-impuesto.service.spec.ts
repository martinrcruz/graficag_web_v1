import { TestBed } from '@angular/core/testing';

import { TipoImpuestoService } from './tipo-impuesto.service';

describe('TipoImpuestoService', () => {
  let service: TipoImpuestoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoImpuestoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
