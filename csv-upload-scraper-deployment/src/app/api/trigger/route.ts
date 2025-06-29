import { NextRequest, NextResponse } from 'next/server';
import { markRowAsScraped } from '../csv/[filename]/scraped';

export async function POST(
  request: NextRequest,
  { params }: { params: { filename: Promise<string> } }
) {
  try {
    const body = await request.json();
    const { filename, row } = body;

    if (!filename || !row || !row.id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Mark the row as scraped in our state
    await markRowAsScraped(filename, row.id);

    // Here you would typically do your actual scraping logic
    console.log(`Scraping row ${row.id} from file ${filename}`);

    return NextResponse.json({
      success: true,
      message: 'Row processed successfully'
    });
  } catch (error) {
    console.error('Error processing trigger:', error);
    return NextResponse.json(
      { error: 'Failed to process trigger' },
      { status: 500 }
    );
  }
}
