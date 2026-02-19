import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteRow } from './palette-row';

describe('PaletteRow', () => {
  let component: PaletteRow;
  let fixture: ComponentFixture<PaletteRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaletteRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaletteRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
