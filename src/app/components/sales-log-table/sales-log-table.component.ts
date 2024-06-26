import { AfterViewInit,Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task, TaskDataService } from '../../services/task-data.service';
import { DateformatPipe } from '../../pipes/dateformat.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { ToolTipComponent } from '../tool-tip/tool-tip.component';
import { AddNoteFormComponent } from '../addnoteform/addnoteform.component';

@Component({
  selector: 'app-sales-log-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    DateformatPipe,
    TruncatePipe,
    ToolTipComponent,
  ],
  templateUrl: './sales-log-table.component.html',
  styleUrls: ['./sales-log-table.component.css'],
})
export class SalesLogTableComponent implements OnInit {
  displayedColumns: string[] = [
    'date',
    'entityName',
    'taskType',
    'time',
    'contactPerson',
    'notes',
    'status',
  ];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource();
  groupedTasks: any[] = [];
  tasks: any = [];
  selectedTaskTypes: Set<string> = new Set();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  constructor(
    private dialog: MatDialog,
    private taskService: TaskDataService
  ) {}

  ngOnInit(): void {
    this.loadTask();
  }

  // tooltip start
  tooltipVisible = false;
  tooltipTop = '0px';
  tooltipLeft = '0px';
  leftpos: number = -230;
  status: string = '';

  showTooltip(event: MouseEvent, task: any) {
    this.tooltipVisible = true;
    this.tooltipTop = `${event.clientY}px`;
    this.leftpos += event.clientX;
    this.tooltipLeft = `${this.leftpos}px`;
    this.status = task.status;
  }

  hideTooltip() {
    this.tooltipVisible = false;
    this.leftpos = -230;
  }
  // tooltip end

  loadTask(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data.result;
      this.dataSource.data = this.tasks;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.groupTasksByDate();
    });
  }

  groupTasksByDate(): void {

    const filteredData = this.dataSource.filteredData;

    const today = new Date();
    const grouped: { [key: string]: { dateLabel: string; taskDate:string; tasks: Task[]; openCount: number } } = {};

    for (const task of filteredData) {

      if (this.selectedTaskTypes.size > 0 && !this.selectedTaskTypes.has(task.taskType)) {
        continue; 
      }

      const taskDate = new Date(task.createdAt!);
      const diffTime = taskDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      console.log(diffDays)
      let dateLabel = '';

      if (diffDays === 0) {
        dateLabel = 'Today';
      } else if (diffDays === 1) {
        dateLabel = 'Tomorrow';
      } else if (diffDays === -1) {
        dateLabel = 'Yesterday';
      } else if (diffDays > 1) {
        dateLabel = `${diffDays} days from now`;
      } else {
        dateLabel = `${Math.abs(diffDays)} days ago`;
      }

      if (!grouped[dateLabel]) {
        grouped[dateLabel] = { dateLabel, taskDate:task.createdAt! ,tasks: [], openCount: 0 };
      }

      grouped[dateLabel].tasks.push(task);
      if (task.status === 'Open') {
        grouped[dateLabel].openCount += 1;
      }
    }

    this.groupedTasks = Object.values(grouped);

  }

  onTaskTypeChange(taskType: string, event: any): void {
    if ((event.target as HTMLInputElement).checked) {
      this.selectedTaskTypes.add(taskType);
    } else {
      this.selectedTaskTypes.delete(taskType);
    }
    this.groupTasksByDate();
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.groupTasksByDate();
  }

  onOptionEdit(task: Task, option: string): void {
    if (option === 'edit') {
      this.openTaskForm(task);
    } else if (option === 'duplicate') {
      this.editFunc(task, false);
    } else {
      this.editFunc(task, true);
    }
  }

  editFunc(task: any, change: boolean) {
    const docId = task._id;
    if (change) {
      task.status = task.status === 'Open' ? 'Closed' : 'Open';
    }

    const { _id, updatedAt, createdAt, hour, minute, period, ...sendToDb } =
      task;

    try {
      if (change) {
        if (confirm('Do you want to change the status')) {
          this.taskService.updateTask(docId, sendToDb).subscribe({
            next: (response) => {
              console.log('Task updated');
              this.loadTask();
            },
            error: (error) => {
              console.error('Error updating task', error);
            },
          });
        }
      } else {
        if (confirm('Do you want to duplicate the data')) {
          this.taskService.addTask(sendToDb).subscribe({
            next: (response) => {
              console.log('Task duplicated');
              this.loadTask();
            },
            error: (error) => {
              console.error('Error duplicaing task', error);
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  openTaskForm(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: task,
    });

    dialogRef.componentInstance.taskUpdated.subscribe(() => {
      this.loadTask();
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }


  openAddNoteForm(task?:Task):void{
    const dialogRef = this.dialog.open(AddNoteFormComponent, {
      data: task,
    });

    dialogRef.componentInstance.taskUpdated.subscribe(() => {
      this.loadTask();
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
