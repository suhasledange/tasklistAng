import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOptionsDialogComponent } from './task-options-dialog.component';

describe('TaskOptionsDialogComponent', () => {
  let component: TaskOptionsDialogComponent;
  let fixture: ComponentFixture<TaskOptionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskOptionsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
