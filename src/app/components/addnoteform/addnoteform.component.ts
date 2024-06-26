import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TaskDataService } from '../../services/task-data.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-task-form',
  standalone: true,
  providers: [DatePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    NgClass,
    MatProgressSpinnerModule,
  ],
  templateUrl: './addnoteform.component.html',
  styleUrls: ['./addnoteform.component.css'],
})
export class AddNoteFormComponent implements OnInit {
  @Output() taskUpdated = new EventEmitter<void>();

  taskForm!: FormGroup;
  initialTask: any;
  loading: boolean = false;
  delLoading: boolean = false;
  hours: string[] = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, '0')
  );
  minutes: string[] = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  periods: string[] = ['AM', 'PM'];

  constructor(
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private dialogRef: MatDialogRef<AddNoteFormComponent>,
    private taskDataService: TaskDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initialTask = data;
    }

  ngOnInit(): void {
    const formattedDate = this.datepipe.transform(
      this.initialTask.date,
      'yyyy-MM-dd'
    );
    const timeParts = this.initialTask.time
      ? this.initialTask.time.match(/(\d+):(\d+) (\w+)/)
      : null;
    this.taskForm = this.fb.group({
      entityName: [this.initialTask.entityName || '', Validators.required],
      date: [formattedDate || '', Validators.required],
      hour: [timeParts ? timeParts[1] : '12', Validators.required],
      minute: [timeParts ? timeParts[2] : '00', Validators.required],
      period: [timeParts ? timeParts[3] : 'PM', Validators.required],
      taskType: [this.initialTask.taskType || 'Call', Validators.required],
      contactPerson: [
        this.initialTask.contactPerson || '',
        Validators.required,
      ],
      phoneNumber: [
        this.initialTask.phoneNumber || '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      note: [this.initialTask.note || '',Validators.required],
      status: [this.initialTask.status || 'Open'],
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      return;
    } else {
      const formValues = this.taskForm.value;

      const taskData = {
        ...formValues,
        time: `${formValues.hour}:${formValues.minute} ${formValues.period}`,
      };
      const { hour, minute, period, ...sendToDb } = taskData;
      const docId = this.initialTask._id;
      try {
        this.loading = true;
        if (docId) {
          this.taskDataService.updateTask(docId, sendToDb).subscribe({
            next: (response) => {
              console.log('Task updated');
              this.dialogRef.close(response.result);
              this.taskUpdated.emit();
              this.loading = false;
            },
            error: (error) => {
              console.error('Error updating task', error);
              this.loading = false;
            },
          });
        } 
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
