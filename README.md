# Code Typing Practice

A modern typing practice application built with Next.js, MongoDB, and Tailwind CSS.

## Features

- 🚀 Fast typing practice with real-time WPM and accuracy tracking
- 📊 Personal statistics and progress tracking
- 🎨 Beautiful, modern UI with glass morphism effects
- 🔐 Secure user authentication with JWT tokens
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Authentication**: JWT tokens, bcryptjs for password hashing
- **UI Components**: Radix UI, Lucide React icons
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd coding-typing-practice
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/coding-typing-practice

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-change-this-in-production
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### User Model

```typescript
interface User {
  id: string
  name: string
  email: string
  avatar?: string
  typingStats: {
    wpm: number
    accuracy: number
    totalTests: number
    averageWPM: number
    bestWPM: number
  }
  createdAt: string
}
```

## Project Structure

```
├── app/
│   ├── api/auth/          # Authentication API routes
│   ├── dashboard/         # User dashboard
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   └── practice/         # Typing practice page
├── components/           # Reusable UI components
├── lib/                  # Utility functions and configurations
├── models/              # MongoDB models
└── styles/              # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
