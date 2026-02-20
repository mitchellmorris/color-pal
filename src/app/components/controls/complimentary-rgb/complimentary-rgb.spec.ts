import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplimentaryRgb } from './complimentary-rgb';

describe('ComplimentaryRgb', () => {
  let component: ComplimentaryRgb;
  let fixture: ComponentFixture<ComplimentaryRgb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplimentaryRgb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplimentaryRgb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
