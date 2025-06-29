import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), 'uploads');
    
    // Check if uploads directory exists
    if (!existsSync(uploadDir)) {
      return NextResponse.json({ files: [] });
    }

    // Read directory contents
    const files = await readdir(uploadDir);
    
    // Filter for CSV files and create file objects
    const csvFiles = files
      .filter(file => file.endsWith('.csv'))
      .map(file => ({
        name: file,
        path: `/files/${file}`
      }));

    return NextResponse.json({ files: csvFiles });
  } catch (error) {
    console.error('Error reading files:', error);
    return NextResponse.json(
      { error: 'Error reading files' },
      { status: 500 }
    );
  }
}
