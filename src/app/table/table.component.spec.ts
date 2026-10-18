import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import axios, { AxiosHeaders } from 'axios';
import type { TransactionData } from '../../../shared/transactions';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const transaction: TransactionData = {
    _id: 1001, txn_date: '2020-12-31T12:00:00Z', txn_month: 'DEC',
    txn_type: 'Test', status: 'Unpaid', base_amount: 42, tax: 3,
    sender_id: 1, receiver_id: 0, payment_mode: 'ACH',
  };

  beforeEach(async () => {
    spyOn(axios, 'get').and.resolveTo({
      data: [{ ...transaction }], status: 200, statusText: 'OK',
      headers: {}, config: { headers: new AxiosHeaders() },
    });
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [
        NoopAnimationsModule, MatTableModule, MatPaginatorModule,
        MatFormFieldModule, MatSelectModule, MatIconModule, MatButtonModule,
      ],
      errorOnUnknownElements: true,
      errorOnUnknownProperties: true,
    }).compileComponents();
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('loads and renders transactions without a live API', () => {
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/api/transactions');
    const root: HTMLElement = fixture.nativeElement;
    expect(root.textContent).toContain('12/31/2020');
    expect(root.textContent).toContain('$45.00');
    expect(root.textContent).toContain('001');
  });

  it('allows entering and cancelling edit mode', () => {
    const row = component.transactions[0];
    const root: HTMLElement = fixture.nativeElement;
    const edit = root.querySelector<HTMLButtonElement>('button[aria-label="Edit"]');
    if (!edit) throw new Error('Edit button was not rendered');
    edit.click();
    fixture.detectChanges();
    expect(root.querySelector('table mat-select')).not.toBeNull();
    const cancel = root.querySelector<HTMLButtonElement>('button[aria-label="Cancel"]');
    if (!cancel) throw new Error('Cancel button was not rendered');
    cancel.click();
    fixture.detectChanges();
    expect(component.isRowEditable(row)).toBeFalse();
    expect(root.querySelector('table mat-select')).toBeNull();
  });

  it('sends edited status to the existing backend transaction endpoint', () => {
    const put = spyOn(axios, 'put').and.resolveTo({
      data: {}, status: 200, statusText: 'OK',
      headers: {}, config: { headers: new AxiosHeaders() },
    });
    const row = component.transactions[0];
    component.toggleRowEdit(row);
    component.updatedValue = 'Paid';
    component.saveRowEdit(row);
    expect(put).toHaveBeenCalledWith(
      'http://localhost:5000/api/transactions/1001',
      jasmine.objectContaining({ _id: 1001, status: 'Paid' })
    );
    expect(component.isRowEditable(row)).toBeFalse();
  });

  it('supports string transaction identifiers in edit mode', () => {
    const row: TransactionData = { ...transaction, _id: 'test-001' };
    component.toggleRowEdit(row);
    expect(component.isRowEditable(row)).toBeTrue();
    component.cancelRowEdit(row);
    expect(component.isRowEditable(row)).toBeFalse();
  });
});
