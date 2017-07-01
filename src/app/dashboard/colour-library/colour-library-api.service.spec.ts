import { TestBed, inject } from '@angular/core/testing';

import { ColourLibraryApiService } from './colour-library-api.service';

describe('ColourLibraryApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColourLibraryApiService]
    });
  });

  it('should ...', inject([ColourLibraryApiService], (service: ColourLibraryApiService) => {
    expect(service).toBeTruthy();
  }));
});
