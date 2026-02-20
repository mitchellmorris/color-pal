import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteUpdateForm } from './palette-update-form';

describe('PaletteUpdateForm', () => {
  let component: PaletteUpdateForm;
  let fixture: ComponentFixture<PaletteUpdateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaletteUpdateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaletteUpdateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
