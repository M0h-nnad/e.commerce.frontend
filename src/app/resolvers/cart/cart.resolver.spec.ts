import { TestBed } from '@angular/core/testing';

import { CartResolver } from './cart.resolver';

describe('CartResolver', () => {
  let resolver: CartResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CartResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
