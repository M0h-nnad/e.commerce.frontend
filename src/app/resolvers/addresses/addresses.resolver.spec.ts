import { TestBed } from '@angular/core/testing';

import { AddressesResolver } from './addresses.resolver';

describe('AddressesResolver', () => {
  let resolver: AddressesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AddressesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
