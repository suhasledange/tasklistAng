import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../services/task-data.service';

@Component({
  selector: 'app-task-options-dialog',
  standalone:true,
  templateUrl: './task-options-dialog.component.html',
  styleUrls: ['./task-options-dialog.component.css']
})
export class TaskOptionsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TaskOptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) { }

  onEdit(): void {
    
    this.dialogRef.close('edit');
  }

  onDuplicate(): void {
    
    this.dialogRef.close('duplicate');
  }

  onChangeStatusToOpen(): void {

    this.dialogRef.close('changeStatus');
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
