import { TestBed } from '@angular/core/testing';

import { QuanLyPhimService } from './quan-ly-phim.service';

describe('QuanLyPhimService', () => {
  let service: QuanLyPhimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLyPhimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
