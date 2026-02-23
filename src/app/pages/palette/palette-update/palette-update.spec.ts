import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteUpdate } from './palette-update';

describe('PaletteUpdate', () => {
  let component: PaletteUpdate;
  let fixture: ComponentFixture<PaletteUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaletteUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaletteUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
