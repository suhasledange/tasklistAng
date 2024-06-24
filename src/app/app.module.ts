import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SalesLogComponent } from './sales-log/sales-log.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    SalesLogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
