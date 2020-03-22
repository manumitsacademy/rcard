import { TestBed } from '@angular/core/testing';

import { MinistatementService } from './ministatement.service';

describe('MinistatementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MinistatementService = TestBed.get(MinistatementService);
    expect(service).toBeTruthy();
  });
});
