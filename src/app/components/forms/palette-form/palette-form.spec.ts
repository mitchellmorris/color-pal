import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteForm } from './palette-update-form';

describe('PaletteForm', () => {
  let component: PaletteForm;
  let fixture: ComponentFixture<PaletteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaletteForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaletteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
