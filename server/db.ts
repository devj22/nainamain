import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';
import * as schema from '../shared/schema.js';

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_ASLcolZjzh70@ep-white-unit-a872j29f-pooler.eastus2.azure.neon.tech/neondb?sslmode=require';

let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!dbInstance) {
    const sql = neon(DATABASE_URL);
    dbInstance = drizzle(sql, { schema });
  }
  return dbInstance;
}

export const db = getDb();

// Export a function to check database connection
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    // Try to query the database
    await db.execute(sql`SELECT 1`);
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}

// Helper function to safely parse dates
export function safeParseDate(date: string | Date | null | undefined): Date {
  if (!date) return new Date();
  try {
    return new Date(date);
  } catch (error) {
    console.error('Error parsing date:', error);
    return new Date();
  }
}

// Helper function to safely parse boolean
export function safeParseBoolean(value: any): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return false;
} 