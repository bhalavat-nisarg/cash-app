import { Double, MongoClient, ObjectId } from 'mongodb';

let url = 'mongodb://127.0.0.1:27017/?readPreference=primary&ssl=false';

const client = new MongoClient(url);
const dbName = 'cash';
const dbTxn = 'transactions';
const dbUser = 'users';

export interface Transactions {
  _id: number;
  txn_date: Date;
  txn_month: string;
  txn_type: string;
  status: string;
  base_amount: Double | number;
  tax: Double | number;
  sender_id: number;
  receiver_id: number;
  payment_mode: string;
}

export interface Users {
  uid: number;
  first_name: string;
  last_name: string;
  mobile: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: number;
}

export async function connectDBTxn() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<Transactions>(dbTxn);
  return collection;
}

export async function connectDBUser() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<Users>(dbUser);
  return collection;
}

export async function closeDB() {
  client.close();
}
