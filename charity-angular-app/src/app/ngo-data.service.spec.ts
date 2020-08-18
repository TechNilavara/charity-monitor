import { TestBed } from '@angular/core/testing';

import { NgoDataService } from './ngo-data.service';

describe('NgoDataService', () => {
  let service: NgoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
