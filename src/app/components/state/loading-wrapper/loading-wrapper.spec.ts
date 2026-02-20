import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingWrapper } from './loading-wrapper';

describe('LoadingWrapper', () => {
  let component: LoadingWrapper;
  let fixture: ComponentFixture<LoadingWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
