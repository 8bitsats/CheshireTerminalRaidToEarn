-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wallet_address TEXT UNIQUE NOT NULL,
    username TEXT,
    twitter_handle TEXT,
    twitter_oauth_token TEXT,
    twitter_oauth_secret TEXT,
    is_raid_registered BOOLEAN DEFAULT false,
    raid_registration_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    raid_points INTEGER DEFAULT 0,
    total_raids INTEGER DEFAULT 0
);

-- Create function to increment total_raids
CREATE OR REPLACE FUNCTION increment_raids()
RETURNS INTEGER
LANGUAGE SQL
AS $$
    SELECT COALESCE(total_raids, 0) + 1
    FROM users
    WHERE wallet_address = auth.uid()
$$;

-- Create index on wallet_address for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_wallet_address ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_users_twitter_handle ON users(twitter_handle);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data"
    ON users
    FOR SELECT
    USING (wallet_address = auth.uid());

CREATE POLICY "Users can update their own data"
    ON users
    FOR UPDATE
    USING (wallet_address = auth.uid());

CREATE POLICY "Allow insert with any wallet_address"
    ON users
    FOR INSERT
    WITH CHECK (true);

-- Create raids table to track raid participation
CREATE TABLE IF NOT EXISTS raids (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    raid_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    points_earned INTEGER DEFAULT 0,
    tweet_id TEXT,
    tweet_text TEXT,
    engagement_count INTEGER DEFAULT 0,
    status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on user_id and raid_date for faster lookups
CREATE INDEX IF NOT EXISTS idx_raids_user_id ON raids(user_id);
CREATE INDEX IF NOT EXISTS idx_raids_raid_date ON raids(raid_date);

-- Enable Row Level Security for raids
ALTER TABLE raids ENABLE ROW LEVEL SECURITY;

-- Create policies for raids table
CREATE POLICY "Users can view their own raids"
    ON raids
    FOR SELECT
    USING (user_id IN (
        SELECT id FROM users WHERE wallet_address = auth.uid()
    ));

CREATE POLICY "Users can insert their own raids"
    ON raids
    FOR INSERT
    WITH CHECK (user_id IN (
        SELECT id FROM users WHERE wallet_address = auth.uid()
    ));

CREATE POLICY "Users can update their own raids"
    ON raids
    FOR UPDATE
    USING (user_id IN (
        SELECT id FROM users WHERE wallet_address = auth.uid()
    ));
