export interface TransactionData {
  _id: number | string;
  txn_date: Date | string;
  txn_month: string;
  txn_type: string;
  status: string;
  base_amount: number;
  tax: number;
  sender_id: number;
  receiver_id: number;
  payment_mode: string;
}
