import express from 'express'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import router from './routes/user.routes.js';
const app= express();
const db = drizzle(process.env.DATABASE_URL)

// Middleware to parse JSON bodies
app.use(express.json());

const PORT= 8000;

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})