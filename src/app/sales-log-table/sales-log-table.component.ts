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
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../services/task-data.service';
import { DateformatPipe } from '../pipes/dateformat.pipe';
import { MatMenuModule} from '@angular/material/menu';

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

  onOptionEdit(task:any,option:string): void {
  
    if(option === 'edit'){

        this.openTaskForm(task);

    }
    else if(option ==='duplicate'){
      console.log("duplicate",task)
    }
    else{
      console.log('change status',task)
    }

  }

 
openTaskForm(task?:Task): void {
  const dialogRef = this.dialog.open(TaskFormComponent, {
    data:task,
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

}