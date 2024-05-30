import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H1HeadlineComponent } from './h1-headline.component';

describe('H1HeadlineComponent', () => {
  let component: H1HeadlineComponent;
  let fixture: ComponentFixture<H1HeadlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [H1HeadlineComponent]
    });
    fixture = TestBed.createComponent(H1HeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
