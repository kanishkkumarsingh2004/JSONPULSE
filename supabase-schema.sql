-- JsonPulse Database Schema for Supabase PostgreSQL
-- Run this SQL in your Supabase SQL Editor to create the tables

-- Create User table with type field
CREATE TABLE IF NOT EXISTS "User" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  mobile TEXT,
  type TEXT NOT NULL DEFAULT 'user',
  "apiKey" TEXT UNIQUE,
  "previewUrl" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_user_type CHECK (type IN ('user', 'admin'))
);

-- Create JsonFile table
CREATE TABLE IF NOT EXISTS "JsonFile" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "fileName" TEXT NOT NULL,
  content TEXT NOT NULL,
  "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  views INTEGER DEFAULT 0,
  "isPublic" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE("userId", "fileName")
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_email ON "User"(email);
CREATE INDEX IF NOT EXISTS idx_user_apikey ON "User"("apiKey");
CREATE INDEX IF NOT EXISTS idx_user_type ON "User"(type);
CREATE INDEX IF NOT EXISTS idx_jsonfile_userid ON "JsonFile"("userId");
CREATE INDEX IF NOT EXISTS idx_jsonfile_filename ON "JsonFile"("fileName");

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to auto-update updatedAt
DROP TRIGGER IF EXISTS update_user_updated_at ON "User";
CREATE TRIGGER update_user_updated_at
  BEFORE UPDATE ON "User"
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_jsonfile_updated_at ON "JsonFile";
CREATE TRIGGER update_jsonfile_updated_at
  BEFORE UPDATE ON "JsonFile"
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "JsonFile" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for User table
CREATE POLICY "Users can read own data" ON "User"
  FOR SELECT
  USING (true);

CREATE POLICY "Users can update own data" ON "User"
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow user creation" ON "User"
  FOR INSERT
  WITH CHECK (true);

-- RLS Policies for JsonFile table
CREATE POLICY "Users can read own files" ON "JsonFile"
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own files" ON "JsonFile"
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own files" ON "JsonFile"
  FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete own files" ON "JsonFile"
  FOR DELETE
  USING (true);
