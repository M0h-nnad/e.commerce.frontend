import { TestBed } from '@angular/core/testing';

import { SubitemsResolver } from '../subitems/subitems.resolver';

describe('SubitemsResolver', () => {
  let resolver: SubitemsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SubitemsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
