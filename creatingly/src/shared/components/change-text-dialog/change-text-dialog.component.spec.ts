import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeTextDialogComponent } from './change-text-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ChangeTextDialogComponent', () => {
  let component: ChangeTextDialogComponent;
  let fixture: ComponentFixture<ChangeTextDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ChangeTextDialogComponent>>;

  beforeEach(async () => {
    const data = [
      { label: 'Label 1', control: new FormControl('') },
      { label: 'Label 2', control: new FormControl('') }
    ];

    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ChangeTextDialogComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeTextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct data', () => {
    expect(component.data.length).toBe(2);
    expect(component.data[0].label).toBe('Label 1');
    expect(component.data[1].label).toBe('Label 2');
  });

  it('should call close on the dialogRef when close is called', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
