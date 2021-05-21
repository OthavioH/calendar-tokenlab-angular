import { TestBed } from '@angular/core/testing';

import { EventosResolver } from './eventos-resolver.guard';

describe('EventoresolverService', () => {
  let service: EventosResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventosResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
