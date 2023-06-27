import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

import { Transactions } from '../../../server/functions';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'tid',
    'txn_type',
    'txn_date',
    'txn_month',
    'base_amount',
    'tax',
    'total',
    'sender_id',
    'payment_mode',
    'status',
    'action',
  ];

  // transactions: Transactions[] = [
  //   {
  //     _id: 1,
  //     txn_date: new Date('06/27/2023'),
  //     txn_month: 'JUN',
  //     txn_type: 'Rent',
  //     status: 'Paid',
  //     base_amount: 1500.0,
  //     tax: 0.0,
  //     sender_id: 1,
  //     receiver_id: 0,
  //     payment_mode: 'ACH',
  //   },
  //   {
  //     _id: 2,
  //     txn_date: new Date('06/27/2023'),
  //     txn_month: 'JUN',
  //     txn_type: 'Utilities',
  //     status: 'Paid',
  //     base_amount: 150.0,
  //     tax: 0.0,
  //     sender_id: 1,
  //     receiver_id: 0,
  //     payment_mode: 'ACH',
  //   },
  //   {
  //     _id: 3,
  //     txn_date: new Date('06/27/2023'),
  //     txn_month: 'JUN',
  //     txn_type: 'Maintenance',
  //     status: 'Unpaid',
  //     base_amount: 150.0,
  //     tax: 0.0,
  //     sender_id: 1,
  //     receiver_id: 0,
  //     payment_mode: 'ACH',
  //   },
  //   {
  //     _id: 4,
  //     txn_date: new Date('06/27/2023'),
  //     txn_month: 'JUN',
  //     txn_type: 'Electricity',
  //     status: 'Paid',
  //     base_amount: 100.0,
  //     tax: 40.0,
  //     sender_id: 1,
  //     receiver_id: 0,
  //     payment_mode: 'ACH',
  //   },
  //   {
  //     _id: 5,
  //     txn_date: new Date('06/27/2023'),
  //     txn_month: 'JUN',
  //     txn_type: 'WiFi',
  //     status: 'Unpaid',
  //     base_amount: 50.0,
  //     tax: 0.0,
  //     sender_id: 1,
  //     receiver_id: 0,
  //     payment_mode: 'ACH',
  //   },
  // ];

  transactions: Transactions[] = [];

  // Set to store row indexes in edit mode
  editableRows: Set<number> = new Set<number>();
  transactionForm: FormGroup;

  dataSource = new MatTableDataSource<Transactions>(this.transactions);

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.transactionForm = this.formBuilder.group({
      status: ['', Validators.required],
    });
  }

  @ViewChild(MatPaginator, { static: true })
  paginator: any = MatPaginator;

  async ngOnInit(): Promise<void> {
    await this.fetchTransactions();
    console.log();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async fetchTransactions(): Promise<void> {
    await axios
      .get('http://localhost:5000/api/transactions')
      .then((response) => {
        this.transactions = response.data;
      })
      .catch((error) => {
        console.log('Error fetching transactions:', error);
      });
  }

  isRowEditable(row: Transactions): boolean {
    return this.editableRows.has(row._id);
  }

  toggleRowEdit(row: Transactions): void {
    if (this.isRowEditable(row)) {
      this.editableRows.delete(row._id);
    } else {
      this.editableRows.add(row._id);
    }
  }

  saveRowEdit(row: Transactions): void {
    if (this.transactionForm.get('status')!.valid) {
      console.log('Saving edited transaction:', row);
      this.toggleRowEdit(row);
      this.transactionForm.reset();
    } else {
      console.log('Invalid status. Transaction canceled:', row);
    }
  }

  cancelRowEdit(row: Transactions): void {
    this.toggleRowEdit(row);
  }
}
