import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDBTxn, connectDBUser, closeDB } from './functions';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/transactions', async (req: Request, res: Response) => {
  const transactions = await connectDBTxn();
  let cursor = await transactions.find({}).toArray();

  closeDB();

  res.send(cursor);
});

app.get('/api/users', async (req: Request, res: Response) => {
  const users = await connectDBUser();
  let cursor = await users.find({}).toArray();

  closeDB();

  res.send(cursor);
});

app.get('/health', (req: Request, res: Response) => {
  res.send('Server is running.');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running on port: ${port}`);
});
