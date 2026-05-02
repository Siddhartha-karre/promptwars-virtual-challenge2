const fs = require('fs');
let c = fs.readFileSync('server.js', 'utf-8');

const newConnection = `import { MongoMemoryServer } from 'mongodb-memory-server';

// MongoDB Connection
const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;
    if (!uri) {
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log('Started in-memory MongoDB server');
    }
    await mongoose.connect(uri);
    console.log('MongoDB connected to:', uri);
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

connectDB();`;

c = c.replace(/\/\/ MongoDB Connection[\s\S]*?\.catch\(\(err\) => console\.log\('MongoDB connection error:', err\)\);/, newConnection);
fs.writeFileSync('server.js', c);
console.log('Patched server.js to use mongodb-memory-server');
