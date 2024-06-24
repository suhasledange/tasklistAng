import { Component, OnInit, ViewChild,Input,OnChanges,SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskOptionsDialogComponent } from '../task-options-dialog/task-options-dialog.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../services/task-data.service';
import { DateformatPipe } from '../pipes/dateformat.pipe';


@Component({
  selector: 'app-sales-log-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    TaskOptionsDialogComponent,
    DateformatPipe
  ],
  templateUrl: './sales-log-table.component.html',
  styleUrls: ['./sales-log-table.component.css']
})
export class SalesLogTableComponent implements OnInit {
  displayedColumns: string[] = ['date', 'entityName', 'taskType', 'time', 'contactPerson', 'notes', 'status'];
  dataSource: MatTableDataSource<Task>;

  @Input() tasks: Task[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.tasks);
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks']) {
      this.dataSource.data = this.tasks;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(task: Task) {
    const dialogRef = this.dialog.open(TaskOptionsDialogComponent, {
      data: task,

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'edit') {
        // Handle edit action
        this.openTaskForm(task); 

      } else if (result === 'duplicate') {
        // Handle duplicate action
        console.log("duplicate",task);
      } else if (result === 'changeStatus') {
        // Handle change status to open action
        console.log("change",task);
      }
    });

}
openTaskForm(task?:Task): void {
  const dialogRef = this.dialog.open(TaskFormComponent, {
    data:task
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

}