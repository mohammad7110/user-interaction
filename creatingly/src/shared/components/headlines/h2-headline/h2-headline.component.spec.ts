import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H2HeadlineComponent } from './h2-headline.component';

describe('H2HeadlineComponent', () => {
  let component: H2HeadlineComponent;
  let fixture: ComponentFixture<H2HeadlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [H2HeadlineComponent]
    });
    fixture = TestBed.createComponent(H2HeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
