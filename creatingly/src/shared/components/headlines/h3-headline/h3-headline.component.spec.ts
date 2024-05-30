import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H3HeadlineComponent } from './h3-headline.component';

describe('H3HeadlineComponent', () => {
  let component: H3HeadlineComponent;
  let fixture: ComponentFixture<H3HeadlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [H3HeadlineComponent]
    });
    fixture = TestBed.createComponent(H3HeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
