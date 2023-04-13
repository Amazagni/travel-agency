import { TestBed } from '@angular/core/testing';

import { OpinionsServiceService } from './opinions-service.service';

describe('OpinionsServiceService', () => {
  let service: OpinionsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpinionsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
