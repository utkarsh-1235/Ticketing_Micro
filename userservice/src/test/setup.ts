import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

jest.setTimeout(30000); // ✅ increase timeout to 30s

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create(); // ✅ starts the server
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  if (mongoServer) {
    await mongoServer.stop(); // ✅ only if defined
  }
  await mongoose.connection.close();
});

afterEach(async () => {
  const collections = await mongoose.connection.db?.collections();
  if (collections) {
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});
