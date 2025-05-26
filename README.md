# Full Stack Application

Sistem Fullstack sederhana menggunakan Nextjs 15 sebagai FrontEnd & Golang sebagai Backend
Dibuat untuk memenuhi Rekrutmen di PT Century Batteries Indonesia

## 📁 Struktur Project

```
project-root/
├── backend/          # Go backend API
│   ├── api/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── data/
│   ├── services/
│   ├── middleware/
│   └── main.go
├── frontend/         # Next.js frontend
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
└── README.md
```

## 🔗 Live Deployment

- **Frontend**: [https://takehometest-nextjs.vercel.app](https://takehometest-nextjs.vercel.app)
- **Backend API**: [https://takehometest-.vercel.app](https://takehometest-golang.vercel.app)

## 🛠️ Tech Stack

### Backend
- **Go** - Programming language
- **Gin** - Web Framework
- **JSON Files** - Data storage

### Frontend
- **Javascript** - Programming Language
- **Next.js 15** - Web Framework
- **Tailwind CSS** - Styling
- **Shadcn UI** - UI Component
- **Vercel** - Deployment Platform

## 🚀 Quick Start

### Prerequisites

Pastikan sudah telah terinstall:
- [Go](https://golang.org/dl/) (version 1.19+)
- [Node.js](https://nodejs.org/) (version 18+)
- [Git](https://git-scm.com/)

### Clone Repository

```bash
# Clone repository utama
git clone https://github.com/fathanpr/takehometest-fullstack.git
cd takehometest-fullstack

## 🔧 Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
go mod tidy
```

### 3. Environment Variables

Buat file `.env` di direktori backend:

```env
# set ini ke debug untuk development dan release untuk production
GIN_MODE=release

# Untuk Generate JWT
API_KEY=2f8c1e7b-4a6d-4c2e-9b1a-3e5d7c8f9a0b

# Path JSON File ketika Deploy di Vercel (Vercel hanya mengizinkan write pada folder /tmp)
FILE_USER=/tmp/users.json
```

### 4. Data Files Setup

Pastikan direktori `data` tersedia dengan file JSON yang diperlukan:

```bash
# Buat direktori data jika belum ada
mkdir -p data

# Contoh struktur file JSON
# data/users.json
```

Contoh struktur file `data/users.json` ketika memiliki data didalamnya:
```json
[
  {
    "id": 1,
    "username": "FATHAN1",
    "email": "fathan1@example.com",
    "password": "325nmdaiw35423424l324214dskfmsfek"
  },
  {
    "id": 2,
    "username": "FATHAN2",
    "email": "fathan2@example.com",
    "password": "325nmdaiw35423424l324214dskfmsfek"
  },
]
```

### 5. Run Backend

```bash
# Development mode
go run main.go
```

Backend akan berjalan di `http://localhost:8080`

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Buat file `.env` di root direktori dalam folder frontend:

```env
# API URLs
Secara default akan langsung men set http://localhost:8080 sebagai API URL, namun jika berbeda bisa di setting disini.
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 4. Run Frontend

```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## 🔄 Development Workflow

### Running Both Services

setelah itu jalankan 2 project tersebut secara bersamaan dengan membuka 2 terminal:

```bash
# Terminal 1 - Backend
cd backend
go run main.go

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### API Endpoints

Backend menyediakan endpoints berikut:

```
POST   /login           # Login User
POST   /users           # Create / Register User
GET    /users/:id       # Get user by ID
PUT    /users/:id       # Update user
DELETE /users/:id       # Delete user
```

## 🚀 Deployment

### Backend Deployment (Vercel)

1. **Prepare `vercel.json`** di direktori backend:

```json
{
    "version": 2,
    "builds": [
        {
            "src": "api/index.go",
            "use": "@vercel/go"
        }
    ],
    "routes": [
        {
            "src": "/.*",
            "dest": "api/index.go"
        }
    ]
}
```

2. **Deploy ke Vercel**:

```bash
cd backend
npx vercel --prod
```

setelah itu lakukan login (jika belum) jika sudah tinggal tunggu hingga proses sekesai.

3. **Set Environment Variables** di Vercel Dashboard untuk production.

### Frontend Deployment (Vercel)

1. **Deploy ke Vercel**:

```bash
cd frontend
npx vercel --prod
```

2. **Set Environment Variables** di Vercel Dashboard:
   - `NEXT_PUBLIC_API_URL`
   - Variabel environment lainnya

## 🔍 Troubleshooting

### Common Issues

1. **CORS Error**
   - Pastikan `ALLOWED_ORIGINS` di backend sudah benar
   - Check frontend URL di environment variables

2. **Data File Access**
   - Pastikan file JSON yang dibutuhkan ada di direktori `data`
   - Check permission file untuk read/write access

4. **Module Not Found**
   ```bash
   # Backend
   go mod tidy
   
   # Frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

## 👥 Authors
- **Fathan Pebrilliestyo Ridwan** - *Takehome Test - PT Century Batteries Indonesia* - [fathanpr](https://github.com/fathanpr)