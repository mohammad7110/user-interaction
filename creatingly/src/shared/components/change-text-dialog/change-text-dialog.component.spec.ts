import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTextDialogComponent } from './change-text-dialog.component';

describe('ChangeTextDialogComponent', () => {
  let component: ChangeTextDialogComponent;
  let fixture: ComponentFixture<ChangeTextDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeTextDialogComponent]
    });
    fixture = TestBed.createComponent(ChangeTextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
