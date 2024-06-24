import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-task-form',
  standalone: true,
  providers: [DatePipe], 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    NgClass 
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  initialTask: any;

  constructor(
    private fb: FormBuilder,
    private datepipe:DatePipe,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initialTask = data || { status: 'Open' }; 
  }

  ngOnInit(): void {

    const formattedDate = this.datepipe.transform(this.initialTask.date, 'yyyy-MM-dd');
    this.taskForm = this.fb.group({
      entityName: [this.initialTask.entityName || '', Validators.required],
      date: [formattedDate || '', Validators.required],
      time: [this.initialTask.time || '', Validators.required],
      taskType: [this.initialTask.taskType || 'Call', Validators.required],
      contactPerson: [this.initialTask.contactPerson || '', Validators.required],
      note: [this.initialTask.note || ''],
      status: [this.initialTask.status || 'Open']
    });

  }

  handleStatusChange(newStatus: string) {
    this.taskForm.patchValue({ status: newStatus });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      return;
    }

    const taskData = this.taskForm.value;
    
    const docId = this.initialTask._id

    try {
      
    if(docId){
      console.log("update with",taskData);
   }
    else{
    console.log("task added")
  }
      
    } catch (error) {
      console.log(error)
    }finally{

      this.dialogRef.close(taskData);
    }


  }

  handleDelete() {
    this.dialogRef.close({ action: 'delete', task: this.initialTask });
  }

  onClose() {
    this.dialogRef.close();
  }
}
