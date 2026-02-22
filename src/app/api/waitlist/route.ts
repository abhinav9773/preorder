import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { WaitlistEntry as WaitlistEntryBase } from '@/types/waitlist';
import { ObjectId } from 'mongodb';

// Redefine WaitlistEntry with _id as ObjectId for MongoDB operations
type WaitlistEntry = Omit<WaitlistEntryBase, '_id'> & { _id: ObjectId };

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { step, documentId, ...formData } = body;

    // Get client IP and user agent
    const ipAddress = 
      request.headers.get('x-forwarded-for') || 
      request.headers.get('x-real-ip') || 
      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    const collection = db.collection<WaitlistEntry>('waitlist_entries');

    const currentTime = new Date();

    if (documentId) {      // Step 2, 3, or 4: Update existing document by its _id
      const updateData = {
        ...formData,
        step: Math.max(step, 1), // Ensure step progresses
        lastUpdated: currentTime,
        completed: step === 4,
        ipAddress,
        userAgent,
      };

      const result = await collection.updateOne(
        { _id: new ObjectId(documentId) },
        { 
          $set: updateData
        }
      );

      if (result.matchedCount === 0) {
        throw new Error('Document not found');
      }


      return NextResponse.json({
        success: true,
        message: `Step ${step} data updated successfully`,
        isUpdate: true,
        entryId: documentId,
      });
    } else {
      
      const newEntry: WaitlistEntry = {
        _id: new ObjectId(),
        step,
        ...formData,
        timestamp: currentTime,
        lastUpdated: currentTime,
        completed: step === 4,
        ipAddress,
        userAgent,
      };

      const result = await collection.insertOne(newEntry);

      return NextResponse.json({
        success: true,
        message: `Step ${step} data saved successfully`,
        isUpdate: false,
        entryId: result.insertedId.toString(),
      });
    }
  } catch (error) {
    console.error('Error saving waitlist data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save data' },
      { status: 500 }
    );
  }
}