# JsonPulse 🚀

> **Your JSON hosting solution** - Host, manage, and share JSON data with ease through a powerful API and intuitive interface.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=flat-square&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🎨 **Modern UI/UX**
- Pure black (#000000) background with blue (#3b82f6) accents
- Animated grid background and blur orbs
- Responsive design for all devices
- Smooth animations and transitions

### 📝 **Dual Editor Modes**
- **Code Editor**: Monaco-powered JSON editor with syntax highlighting
- **Table Editor**: Visual spreadsheet-like interface for JSON editing
  - Editable cells with auto-save on blur
  - Support for arrays, objects, and nested data
  - Add/delete rows and columns
  - Editable headers

### 🔐 **Authentication & Security**
- JWT-based authentication with HTTP-only cookies
- Bcrypt password hashing (10 rounds)
- Protected routes with middleware
- User types: `user` (default) and `admin`
- 7-day token expiration

### 📁 **File Management**
- Create, read, update, and delete JSON files
- One file per filename per user (no duplicates)
- View count tracking
- File listing with metadata

### 🔑 **API Key System**
- Generate unique 20-character alphanumeric API keys
- One API key per user
- Public API access via API key
- View and delete API keys

### 🖼️ **Live Preview**
- Iframe-based website preview
- Persistent preview URL storage
- Fullscreen mode for editor and preview
- Refresh functionality

### 🌐 **Public API**
- Access JSON files via API key
- RESTful endpoints
- View count increment on access
- List all files for an API key

## 🛠️ Tech Stack

### Frontend
- **Next.js 14.2** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Monaco Editor** - VS Code-powered code editor
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Supabase** - PostgreSQL database with REST API
- **JWT (jose)** - Token-based authentication
- **Bcrypt** - Password hashing

### Database
- **PostgreSQL** (via Supabase)
- **Row Level Security (RLS)** - Database-level security
- **UUID** primary keys
- **Automatic timestamps** with triggers

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works!)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd JsonPulse
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

**Get Supabase Credentials:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or select existing
3. Go to Settings → API
4. Copy `URL` and `anon/public` key

### 4. Set Up Database

1. Go to your Supabase project
2. Click **"SQL Editor"** in the sidebar
3. Click **"New Query"**
4. Copy the entire contents of `supabase-schema.sql`
5. Paste and click **"Run"**

This will create:
- `User` table with authentication fields
- `JsonFile` table for storing JSON data
- Indexes for performance
- Triggers for auto-updating timestamps
- Row Level Security policies

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
JsonPulse/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── login/            # POST /api/auth/login
│   │   │   ├── signup/           # POST /api/auth/signup
│   │   │   ├── logout/           # POST /api/auth/logout
│   │   │   └── me/               # GET /api/auth/me
│   │   ├── api-key/              # API key management
│   │   │   ├── route.ts          # GET /api/api-key
│   │   │   ├── generate/         # POST /api/api-key/generate
│   │   │   └── delete/           # DELETE /api/api-key/delete
│   │   ├── files/                # File management
│   │   │   ├── route.ts          # GET, POST /api/files
│   │   │   └── [fileName]/       # GET, DELETE /api/files/:fileName
│   │   ├── data/                 # Public API
│   │   │   └── key/[apiKey]/     # GET /api/data/key/:apiKey
│   │   │       └── [fileName]/   # GET /api/data/key/:apiKey/:fileName
│   │   └── preview-url/          # GET, POST /api/preview-url
│   ├── editor/                   # JSON editor page
│   ├── files/                    # File management page
│   ├── api-keys/                 # API key management page
│   ├── preview/                  # Live preview page
│   ├── login/                    # Login page
│   ├── signup/                   # Signup page
│   ├── docs/                     # Documentation page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── AnimatedGridBackground.tsx
│   ├── ApiEndpointDisplay.tsx
│   ├── BlurOrbs.tsx
│   ├── CopyButton.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   ├── Preloader.tsx
│   └── ToastProvider.tsx
├── lib/                          # Utility libraries
│   ├── auth.ts                   # JWT authentication
│   ├── supabase.ts               # Supabase client
│   └── supabase-db.ts            # Database helpers
├── config/                       # Configuration
│   └── site.config.ts            # Site configuration
├── middleware.ts                 # Route protection
├── supabase-schema.sql           # Database schema
├── .env                          # Environment variables (create this)
├── .env.example                  # Environment template
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── next.config.js                # Next.js configuration
```

## 🔌 API Documentation

### Authentication

#### Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "mobile": "+1234567890",      // Optional
  "type": "user"                // Optional: 'user' or 'admin' (defaults to 'user')
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "type": "user",
    "apiKey": null
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "type": "user",
    "apiKey": "abc123xyz456..."
  }
}
```

#### Logout
```http
POST /api/auth/logout
```

### File Management

#### Create/Update File
```http
POST /api/files
Content-Type: application/json
Cookie: auth_token=...

{
  "fileName": "users.json",
  "content": "{\"users\": [{\"id\": 1, \"name\": \"John\"}]}"
}
```

#### Get All Files
```http
GET /api/files
Cookie: auth_token=...
```

#### Get Specific File
```http
GET /api/files/users.json
Cookie: auth_token=...
```

#### Delete File
```http
DELETE /api/files/users.json
Cookie: auth_token=...
```

### API Key Management

#### Get API Key
```http
GET /api/api-key
Cookie: auth_token=...
```

#### Generate API Key
```http
POST /api/api-key/generate
Cookie: auth_token=...
```

#### Delete API Key
```http
DELETE /api/api-key/delete
Cookie: auth_token=...
```

### Public API (No Authentication Required)

#### List Files
```http
GET /api/data/key/{apiKey}
```

**Response:**
```json
{
  "apiKey": "abc123...",
  "fileCount": 2,
  "files": [
    {
      "fileName": "users.json",
      "url": "/api/data/key/abc123.../users.json",
      "views": 42,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-02T00:00:00Z"
    }
  ],
  "message": "Use /api/data/key/{apiKey}/{fileName} to access specific file content"
}
```

#### Get File Content
```http
GET /api/data/key/{apiKey}/{fileName}
```

**Response:** Raw JSON content
```json
{
  "users": [
    {"id": 1, "name": "John"},
    {"id": 2, "name": "Jane"}
  ]
}
```

## 👥 User Types

### User (Default)
- Standard user access
- Can manage their own files
- Can generate and manage their own API key
- Can use editor and preview features

### Admin
- Full system access
- Can be used for future admin features
- Unrestricted access

**Creating an admin user:**
```json
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@example.com",
  "password": "securepassword",
  "type": "admin"
}
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',    // Blue
      background: '#000000',  // Pure black
    }
  }
}
```

### Site Configuration

Edit `config/site.config.ts`:
```typescript
export const siteConfig = {
  name: "JsonPulse",
  description: "Host and render JSON data with ease",
  features: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFilesPerUser: 100
  }
};
```

## 🔒 Security Features

- ✅ JWT tokens with 7-day expiration
- ✅ HTTP-only cookies (prevents XSS)
- ✅ Bcrypt password hashing (10 rounds)
- ✅ Protected routes with middleware
- ✅ Row Level Security in database
- ✅ Input validation on all endpoints
- ✅ SQL injection prevention (Supabase)
- ✅ CORS protection
- ✅ Secure cookie settings in production

## 🐛 Troubleshooting

### "relation does not exist" error
**Solution:** Run the SQL schema in Supabase SQL Editor (`supabase-schema.sql`)

### Signup/Login not working
**Solutions:**
1. Verify SQL schema was executed
2. Check Supabase credentials in `.env`
3. Clear browser cookies
4. Check browser console for errors

### Build warnings about dynamic routes
**This is normal!** Routes using cookies must be rendered dynamically. The build still succeeds.

### API endpoints returning 401
**Solutions:**
1. Make sure you're logged in
2. Check if auth token cookie exists
3. Token may have expired (7 days) - login again

## 📝 Database Schema

### User Table
```sql
CREATE TABLE "User" (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  mobile TEXT,
  type TEXT NOT NULL DEFAULT 'user',
  apiKey TEXT UNIQUE,
  previewUrl TEXT,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

### JsonFile Table
```sql
CREATE TABLE "JsonFile" (
  id UUID PRIMARY KEY,
  fileName TEXT NOT NULL,
  content TEXT NOT NULL,
  userId UUID REFERENCES "User"(id),
  views INTEGER DEFAULT 0,
  isPublic BOOLEAN DEFAULT false,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  UNIQUE(userId, fileName)
);
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `JWT_SECRET`
4. Deploy!

### Other Platforms

Works on any platform supporting Next.js:
- Netlify
- Railway
- Render
- AWS Amplify
- DigitalOcean App Platform

## 📚 Additional Documentation

- `USER_TYPES.md` - User type system documentation
- `TYPE_FIELD_SUMMARY.md` - Quick reference for user types
- `SETUP_SUPABASE.md` - Detailed Supabase setup guide
- `MIGRATION_SUCCESS.md` - Database migration guide

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Lucide](https://lucide.dev/) - Icon library

## 📧 Support

For support, email support@jsonpulse.com or open an issue on GitHub.

---

**Built with ❤️ using Next.js and Supabase**
