# Kaif Tech Academy

A modern educational platform built with Next.js 15, TypeScript, and Tailwind CSS.

![Deployment Status](https://img.shields.io/badge/deployment-ready-brightgreen)

## Features

- 🚀 **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- 🔐 **Authentication**: NextAuth.js with JWT tokens
- 📚 **Course Management**: Complete course enrollment and progress tracking
- 💳 **Payment Integration**: Razorpay payment gateway
- 🎨 **Smooth UI**: Framer Motion animations and responsive design
- 🗄️ **Database**: Prisma ORM with SQLite/PostgreSQL
- 👥 **Role-based Access**: Student and Admin dashboards
- 📜 **Certificates**: Course completion certificates
- ⭐ **Reviews**: Course rating and review system

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kaifkhan8/Kaif_Tech-Academy.git
cd Kaif_Tech-Academy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
npm run seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

This project is optimized for Vercel deployment:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

## Environment Variables

```env
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your_database_url
```

## Contact

**MD Kaif**
- Email: mdkaif0611@gmail.com
- Phone: +91 8269887132

## License

This project is licensed under the MIT License.