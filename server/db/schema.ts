import { sql } from "drizzle-orm";
import { 
  sqliteTable, 
  text, 
  integer, 
  blob,
  index 
} from "drizzle-orm/sqlite-core";

// Properties table
export const properties = sqliteTable('properties', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: text('price').notNull(), // Changed to text to support both numeric and text values
  priceUnit: text('priceUnit'),
  location: text('location').notNull(),
  size: integer('size').notNull(),
  sizeUnit: text('sizeUnit').notNull(),
  features: text('features', { mode: 'json' }),
  images: text('images', { mode: 'json' }),
  videoUrl: text('videoUrl'),
  isFeatured: integer('isFeatured', { mode: 'boolean' }).default(false),
  propertyType: text('propertyType').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
}); 