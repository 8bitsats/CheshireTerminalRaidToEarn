# GRIN Raid Platform

A decentralized platform for managing GRIN token raids and community engagement.

## Features

- Wallet Integration with Solana
- User Authentication with Supabase
- Twitter Integration
- Raid Registration and Management
- Points System for Engagement
- Real-time Dashboard

## Prerequisites

- Node.js 16+ and npm
- Supabase Account
- Solana Wallet (Phantom, Solflare, etc.)
- Twitter Developer Account (for OAuth)

## Setup

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd project-directory
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up Supabase:
   - Create a new project at [Supabase](https://supabase.com)
   - Copy the SQL from `supabase/schema.sql` and run it in the Supabase SQL editor
   - Get your project URL and anon key from the project settings

4. Create a `.env` file:
\`\`\`env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## Project Structure

- `/src` - Source code
  - `/components` - React components
  - `/hooks` - Custom React hooks
  - `/lib` - Utility functions and configurations
  - `/providers` - Context providers
  - `/types` - TypeScript type definitions

## Database Schema

### Users Table
- `id` - UUID, primary key
- `wallet_address` - Unique wallet address
- `twitter_handle` - User's Twitter handle
- `is_raid_registered` - Boolean flag for raid registration
- `raid_registration_date` - Timestamp of registration
- `raid_points` - Accumulated points
- `total_raids` - Total raids participated

### Raids Table
- `id` - UUID, primary key
- `user_id` - Reference to users table
- `raid_date` - Timestamp of raid
- `points_earned` - Points earned in raid
- `tweet_id` - ID of raid tweet
- `engagement_count` - Number of engagements
- `status` - Raid status (pending/completed/failed)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT
