import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { DB } from './src/config/db';

//Configurations
const app = express();
dotenv.config();

//Middleware
app.use(express.json());
app.use(cors());

//Database Connection
const url = process.env.MONGO_URL;
DB(url);

//Routes

app.use('/api/auth')


//Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`SERVER: http://localhost:${PORT}`);
})


