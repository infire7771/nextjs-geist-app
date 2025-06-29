import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

interface ScrapedState {
  [key: string]: {
    [rowId: string]: boolean;
  };
}

const SCRAPED_STATE_FILE = path.join(process.cwd(), 'uploads', 'scraped-state.json');

export async function getScrapedState(): Promise<ScrapedState> {
  try {
    if (!existsSync(SCRAPED_STATE_FILE)) {
      await writeFile(SCRAPED_STATE_FILE, JSON.stringify({}), 'utf-8');
      return {};
    }

    const content = await readFile(SCRAPED_STATE_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading scraped state:', error);
    return {};
  }
}

export async function markRowAsScraped(filename: string, rowId: string): Promise<void> {
  try {
    const state = await getScrapedState();
    
    if (!state[filename]) {
      state[filename] = {};
    }
    
    state[filename][rowId] = true;
    
    await writeFile(SCRAPED_STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error updating scraped state:', error);
    throw error;
  }
}

export async function isRowScraped(filename: string, rowId: string): Promise<boolean> {
  const state = await getScrapedState();
  return Boolean(state[filename]?.[rowId]);
}
