import { TestBed } from '@angular/core/testing';

import { SubitemResolver } from '../subitem/subitem.resolver';

describe('SubitemResolver', () => {
  let resolver: SubitemResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SubitemResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
