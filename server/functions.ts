import { Double, MongoClient, ObjectId } from 'mongodb';
import type { TransactionData } from '../shared/transactions';

let url = 'mongodb://127.0.0.1:27017/?readPreference=primary&ssl=false';

const client = new MongoClient(url);
const dbName = 'cash';
const dbTxn = 'transactions';
const dbUser = 'users';

export interface Transactions extends Omit<
  TransactionData, '_id' | 'txn_date' | 'base_amount' | 'tax'
> {
  _id: number;
  txn_date: Date;
  base_amount: Double | number;
  tax: Double | number;
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
