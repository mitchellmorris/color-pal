import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePalette } from './create-palette';

describe('CreatePalette', () => {
  let component: CreatePalette;
  let fixture: ComponentFixture<CreatePalette>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePalette]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePalette);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
