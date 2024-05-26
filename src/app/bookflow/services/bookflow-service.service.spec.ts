import { TestBed } from '@angular/core/testing';

import { BookflowServiceService } from './bookflow-service.service';

describe('BookflowServiceService', () => {
  let service: BookflowServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookflowServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
