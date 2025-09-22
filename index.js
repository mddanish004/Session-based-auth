import express from 'express'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
const app= express();
const db = drizzle(process.env.DATABASE_URL)

const PORT= 8000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})