import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

// MongoDB connection
const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB_NAME || 'myperro';

// Email configuration with fallbacks to prevent TypeScript errors
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';
const receiverEmail = process.env.RECEIVER_EMAIL || '';

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
    const { firstName, lastName, email, phone, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if email configuration is available
    if (!smtpUser || !smtpPass || !receiverEmail) {
      console.error('Email configuration is missing');
      // Continue with database storage but note the email won't be sent
    }

    // Connect to MongoDB
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const contactCollection = db.collection('contactMessages');
    
    // Insert the contact message
    const result = await contactCollection.insertOne({
      firstName,
      lastName,
      email,
      phone: phone || null,
      message,
      createdAt: new Date()
    });
      // Only attempt to send email if configuration is available
    if (smtpUser && smtpPass && receiverEmail) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });
        
        await transporter.sendMail({
          from: `MyPerro Enquiry Form <${email}>`,
          to: receiverEmail,
          subject: 'Contact Message from Website',
          html: `
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });
        console.log('Email sent successfully');
      } catch (emailError) {
        // Log the email error but don't fail the request
        console.error('Failed to send email, but message was stored:', emailError);
      }
    }

    return new Response(JSON.stringify({ 
      message: 'Message stored successfully!',
      id: result.insertedId 
    }), { 
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