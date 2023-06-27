import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  users: any[] = [
    { name: 'John Doe', email: 'johndoe@example.com' },
    { name: 'Jane Smith', email: 'janesmith@example.com' },
    { name: 'Alice Johnson', email: 'alicejohnson@example.com' },
  ];
  displayedColumns: string[] = ['name', 'email'];
}
