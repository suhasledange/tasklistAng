import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SalesHeaderComponent } from './components/sales-header/sales-header.component';
import { SalesLogTableComponent } from './components/sales-log-table/sales-log-table.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ FormsModule,SalesHeaderComponent,SalesLogTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sales-log-app';

}
