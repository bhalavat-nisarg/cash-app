import { Double, MongoClient, ObjectId } from 'mongodb';

let url = 'mongodb://127.0.0.1:27017/?readPreference=primary&ssl=false';

const client = new MongoClient(url);
const dbName = 'cash';
const dbTxn = 'transactions';
const dbUser = 'users';

interface transactions {
  _id: ObjectId;
  txn_date: Date;
  txn_month: string;
  txn_type: string;
  status: string;
  base_amount: Double;
  tax: Double;
  sender_id: number;
  receiver_id: number;
  payment_mode: string;
}

interface users {
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
  const collection = db.collection<transactions>(dbTxn);
  return collection;
}

export async function connectDBUser() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection<users>(dbUser);
  return collection;
}

export async function closeDB() {
  client.close();
}
