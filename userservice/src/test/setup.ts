import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {app} from '../../src/index';
import request from 'supertest';
import {userModel} from '../../src/models/userModel';

const beforeAll = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri);
    
    }

    const beforeEach = async () => {
    const collections = await mongoose.connection.db?.collections();

    if (collections) {
        for(const collection of collections){
            await collection.deleteMany({});
        }
    }
    }

    const afterAll = async() => {
        await mongoose.connection.close();
    }