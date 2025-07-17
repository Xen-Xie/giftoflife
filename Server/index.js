import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { DB } from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import { limiter } from './src/middleware/rateLimit.js';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import userRoutes from './src/routes/userRoutes.js';
import { authenticateToken, isAdmin } from "./src/middleware/auth.js";
import adminRoutes from './src/routes/adminRoutes.js';
import defaultRoutes from './src/routes/defaultRoutes.js';

//Configurations
const app = express();
dotenv.config();

//Middleware
app.use(cors()); // Enable CORS for all routes unless it goes on production
app.use(express.json());
app.use(limiter)
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

//Database Connection
const url = process.env.MONGO_URL;
DB(url);

//Routes
app.use('/api', defaultRoutes)
app.use('/api/auth' , authRoutes);
app.use('/api/users', authenticateToken,userRoutes)
app.use('/api/admin', authenticateToken, isAdmin, adminRoutes);
app.use('/api/user',authenticateToken,userRoutes)


//Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT,"0.0.0.0",()=>{
  console.log(`SERVER: http://0.0.0.0:${PORT}`);
})


