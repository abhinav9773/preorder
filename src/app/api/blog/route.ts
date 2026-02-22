import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const blogCollection = db.collection("blogsData");

    const blogs = await blogCollection.find().sort({ createdAt: -1 }).toArray();

    return new Response(JSON.stringify(blogs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Database error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
