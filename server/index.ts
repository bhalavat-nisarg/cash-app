import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDBTxn, connectDBUser, closeDB } from './functions';
import { ObjectId } from 'mongodb';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:4200',
  'http://localhost:5000',
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.put('/api/transactions/:_id', async (req: Request, res: Response) => {
  const _id: any = req.params._id;
  const status = req.body.status;
  // console.log(_id);
  console.log(req.body.status);
  const connection = await connectDBTxn();
  const result = await connection.findOne(
    { _id }
    // { $set: { status: status } }
  );
  console.log(result);

  res.status(200).send(_id);
});

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
