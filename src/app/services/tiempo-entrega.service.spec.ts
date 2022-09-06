import { TestBed } from '@angular/core/testing';

import { TiempoEntregaService } from './tiempo-entrega.service';

describe('TiempoEntregaService', () => {
  let service: TiempoEntregaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiempoEntregaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
