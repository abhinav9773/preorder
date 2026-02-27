import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (cachedClient) return cachedClient;

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function GET(req: Request, context: any) {
  const { id } = context.params;
  console.log("Requested blog ID:", id);

  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);

    const blog = await db.collection("blogsData").findOne({ id });

    if (!blog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(blog), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching blog:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
