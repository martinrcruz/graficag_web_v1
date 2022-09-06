import { TestBed } from '@angular/core/testing';

import { TipoValorService } from './tipo-valor.service';

describe('TipoValorService', () => {
  let service: TipoValorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoValorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
