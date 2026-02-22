import { MongoClient } from 'mongodb';

// MongoDB connection
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

// Connection cache to reuse connections
let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Connect to MongoDB
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const subscribersCollection = db.collection('subscribedEmails');

    // Check if email already exists
    const existingSubscriber = await subscribersCollection.findOne({ email });
    if (existingSubscriber) {
      return new Response(
        JSON.stringify({ error: 'This email is already subscribed.' }),
        { 
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Insert the new subscriber
    await subscribersCollection.insertOne({
      email,
      subscribedAt: new Date()
    });

    return new Response(JSON.stringify({ message: 'Subscribed successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Database error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}