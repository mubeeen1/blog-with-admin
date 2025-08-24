import { connectToDatabase } from './client';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export const AdminUserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

export async function createUser(email, password, role = 'admin') {
    const db = await connectToDatabase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        email,
        password: hashedPassword,
        role,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    await db.collection('users').insertOne(user);
    return user;
}

export async function findUserByEmail(email) {
    const db = await connectToDatabase();
    return await db.collection('users').findOne({ email });
}

export async function validateUser(email, password) {
    const user = await findUserByEmail(email);
    if (!user) return null;
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
}

export async function updateUser(email, updates) {
    const db = await connectToDatabase();
    updates.updatedAt = new Date();
    return await db.collection('users').updateOne({ email }, { $set: updates });
}

export async function deleteUser(email) {
    const db = await connectToDatabase();
    return await db.collection('users').deleteOne({ email });
}
