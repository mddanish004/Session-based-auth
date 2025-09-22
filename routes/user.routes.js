import express from 'express'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { generateSalt, hashPassword } from '../utils/auth.js';
import { users, sessions } from '../db/schema.js';

const router = express.Router();
const db = drizzle(process.env.DATABASE_URL);

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            error: 'Email, password, and name are required'
        });
    }

    const salt = generateSalt();
    const hashed = hashPassword(password, salt);
    
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
        return res.status(409).json({
            error: 'User already exists'
        });
    }
    
    // Insert new user
    await db.insert(users).values({
        name,
        email,
        password_hash: hashed,
        salt
    });
    return res.status(201).json({
        message: 'User registered successfully'
    });
});

export default router;