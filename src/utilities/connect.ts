import mongoose from 'mongoose';
import config from 'config';

export async function connect() {
    try {
        await mongoose.connect(config.get<string>('connString'));
        console.log('Connected to DB.');
    } catch {
        console.log('Failed to connect to DB.');
    }
}