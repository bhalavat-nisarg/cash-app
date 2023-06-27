import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as mysql from 'mysql';
import * as fs from 'fs';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 5000;

const fileName: string = 'init_db.sql';
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
let connection: mysql.Connection;

let queries = fs
  .readFileSync(fileName)
  .toString()
  .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
  .replace(/\s+/g, ' ') // excess white space
  .split(';') // split into all statements
  .map(Function.prototype.call, String.prototype.trim)
  .filter(function (el) {
    return el.length != 0;
  });

try {
  connection = mysql.createConnection({
    host: 'localhost',
    user: username,
    password: password,
  });

  connection.query('USE cash', (err, result) => {
    if (err) {
      console.log(err);
      console.log('DB Not Found.');
      queries.forEach((query) => {
        connection.query(query, (err, result) => {
          if (err) {
            console.log('Err: ', err);
            connection.end();
          } else {
            console.log('Query Executed!');
          }
        });
      });
    } else {
      console.log('DB Found.');
    }
  });
} catch (error) {
  console.error('Error: ', error);
}

app.get('/api/', async (req: Request, res: Response) => {
  const result = await connection.query('SELECT * FROM transactions;');
  console.log(result);

  res.send('Server is running.');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running on port: ${port}`);
});
