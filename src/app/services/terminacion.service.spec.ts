import { TestBed } from '@angular/core/testing';

import { TerminacionService } from './terminacion.service';

describe('TerminacionService', () => {
  let service: TerminacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
