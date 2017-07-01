import { TestBed, inject } from '@angular/core/testing';

import { SiteApiService } from './site-api.service';

describe('SiteApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteApiService]
    });
  });

  it('should ...', inject([SiteApiService], (service: SiteApiService) => {
    expect(service).toBeTruthy();
  }));
});
