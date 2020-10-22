import { TestBed } from '@angular/core/testing';

import { QuanLyDatVeService } from './quan-ly-dat-ve.service';

describe('QuanLyDatVeService', () => {
  let service: QuanLyDatVeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLyDatVeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
