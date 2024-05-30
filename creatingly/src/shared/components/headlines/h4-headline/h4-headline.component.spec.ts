import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H4HeadlineComponent } from './h4-headline.component';

describe('H4HeadlineComponent', () => {
  let component: H4HeadlineComponent;
  let fixture: ComponentFixture<H4HeadlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [H4HeadlineComponent]
    });
    fixture = TestBed.createComponent(H4HeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
