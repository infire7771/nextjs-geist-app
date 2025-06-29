import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { getScrapedState, markRowAsScraped } from './scraped';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: Promise<string> } }
) {
  try {
    const filename = await params.filename;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    // Check if file exists
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Read file content
    const content = await readFile(filePath, 'utf-8');

    // Get scraped state
    const scrapedState = await getScrapedState();
    const fileScrapedState = scrapedState[filename] || {};

    // Parse CSV content
    const lines = content.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    const rows = lines.slice(1)
      .filter(line => line.trim()) // Skip empty lines
      .map((line, index) => {
        const values = line.split(',').map(value => value.trim());
        const rowId = (index + 1).toString();
        const row: Record<string, string> = {
          id: rowId
        };
        
        headers.forEach((header, i) => {
          row[header] = values[i] || '';
        });

        // Add scraped state to row
        row._scraped = fileScrapedState[rowId] ? 'true' : 'false';
        
        return row;
      })
      // Filter out scraped rows
      .filter(row => row._scraped === 'false');

    return NextResponse.json({ headers, rows });
  } catch (error) {
    console.error('Error reading CSV file:', error);
    return NextResponse.json(
      { error: 'Error reading CSV file' },
      { status: 500 }
    );
  }
}
