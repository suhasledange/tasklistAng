import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sales-header',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './sales-header.component.html',
  styleUrl: './sales-header.component.css'
})
export class SalesHeaderComponent {

  links = [
    {id: 1, title: "Dashboard", submenu: true},
    {id: 2, title: "Companies", submenu: true},
    {id: 3, title: "Funds", submenu: true},
    {id: 4, title: "HNIs", submenu: true},
    {id: 5, title: "Messaging", submenu: false},
    {id: 6, title: "Meetings", submenu: false},
    {id: 7, title: "Notes", submenu: false},
    {id: 8, title: "Documents", submenu: false},
  ];

}
