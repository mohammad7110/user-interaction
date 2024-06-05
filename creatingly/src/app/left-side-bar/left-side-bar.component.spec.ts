import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LeftSideBarComponent} from './left-side-bar.component';
import {FeatureList, Features} from '../../models/features';
import {By} from '@angular/platform-browser';
import {MaterialModule} from "../../shared/material/material.module";
import {TextInputComponent} from "../../shared/components/text-input/text-input.component";

describe('LeftSideBarComponent', () => {
  let component: LeftSideBarComponent;
  let fixture: ComponentFixture<LeftSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeftSideBarComponent],
      imports: [MaterialModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of features', () => {
    expect(component.features).toEqual(Features);
  });

  it('should emit action when selectAction is called', () => {
    spyOn(component.action, 'emit');

    const testFeature: FeatureList =  {
      title: 'Input',
      // class: 'text-input',
      component: TextInputComponent,
      componentId: '1',
    };
    component.selectAction(testFeature);

    expect(component.action.emit).toHaveBeenCalledWith(testFeature);
  });

  it('should call selectAction when a feature is clicked', () => {
    spyOn(component, 'selectAction');

    const testFeature: FeatureList =  {
      title: 'Input',
      // class: 'text-input',
      component: TextInputComponent,
      componentId: '1',
    };
    component.features = [testFeature];
    fixture.detectChanges();

    const featureButton = fixture.debugElement.query(By.css('.mat-mdc-icon-button')); // Assuming there's a class 'feature-button' for feature buttons
    featureButton.triggerEventHandler('click', null);

    expect(component.selectAction).toHaveBeenCalledWith(testFeature);
  });
});
