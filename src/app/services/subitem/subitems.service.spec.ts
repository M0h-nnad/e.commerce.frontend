import { TestBed } from '@angular/core/testing';

import { SubitemsService } from './subitems.service';

describe('SubitemsService', () => {
  let service: SubitemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubitemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
