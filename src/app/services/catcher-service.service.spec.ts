import { TestBed, inject } from '@angular/core/testing';

import { CatcherServiceService } from './catcher-service.service';

describe('CatcherServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatcherServiceService]
    });
  });

  it('should be created', inject([CatcherServiceService], (service: CatcherServiceService) => {
    expect(service).toBeTruthy();
  }));
});
