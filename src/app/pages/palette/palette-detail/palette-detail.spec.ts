import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteDetail } from './palette-detail';

describe('PaletteDetail', () => {
  let component: PaletteDetail;
  let fixture: ComponentFixture<PaletteDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaletteDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaletteDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
