import { TestBed } from '@angular/core/testing';

import { WishlistResolver } from './wishlist.resolver';

describe('WishlistResolver', () => {
  let resolver: WishlistResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(WishlistResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
