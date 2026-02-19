import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteList } from './palette-list';

describe('PaletteList', () => {
  let component: PaletteList;
  let fixture: ComponentFixture<PaletteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaletteList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaletteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
