import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureGenericComponent } from './feature-generic.component';

describe('FeatureGenericComponent', () => {
  let component: FeatureGenericComponent;
  let fixture: ComponentFixture<FeatureGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureGenericComponent]
    });
    fixture = TestBed.createComponent(FeatureGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
