# Full Stack Application

Aplikasi full stack yang terdiri dari backend Go dan frontend Next.js yang telah di-deploy ke Vercel.

## 📁 Struktur Project

```
project-root/
├── backend/          # Go backend API
│   ├── controllers/
│   ├── models/
│   ├── routes/
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

- **Frontend**: [https://your-frontend-app.vercel.app](https://your-frontend-app.vercel.app)
- **Backend API**: [https://your-backend-api.vercel.app](https://your-backend-api.vercel.app)

## 🛠️ Tech Stack

### Backend
- **Go** - Programming language
- **Gin/Echo** - Web framework (sesuaikan dengan framework yang digunakan)
- **JSON Files** - Data storage

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vercel** - Deployment platform

## 🚀 Quick Start

### Prerequisites

Pastikan Anda telah menginstall:
- [Go](https://golang.org/dl/) (version 1.19+)
- [Node.js](https://nodejs.org/) (version 18+)
- [Git](https://git-scm.com/)

### Clone Repository

```bash
# Clone repository utama
git clone https://github.com/username/project-name.git
cd project-name

# Clone backend sebagai submodule atau manual
git clone https://github.com/username/backend-repo.git backend

# Clone frontend sebagai submodule atau manual  
git clone https://github.com/username/frontend-repo.git frontend
```

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
# Server
PORT=8080
ENV=development

# JWT
JWT_SECRET=your_jwt_secret_key

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend-app.vercel.app

# Data Files Path (optional)
DATA_PATH=./data
```

### 4. Data Files Setup

Pastikan direktori `data` tersedia dengan file JSON yang diperlukan:

```bash
# Buat direktori data jika belum ada
mkdir -p data

# Contoh struktur file JSON
# data/users.json
# data/config.json
# dll sesuai kebutuhan aplikasi
```

Contoh struktur file `data/users.json`:
```json
{
  "users": [
    {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com"
    }
  ]
}
```

### 5. Run Backend

```bash
# Development mode
go run main.go

# Atau build dan run
go build -o main .
./main
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
# atau
yarn install
```

### 3. Environment Variables

Buat file `.env.local` di direktori frontend:

```env
# API URLs
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_API_URL_PRODUCTION=https://your-backend-api.vercel.app

# Other environment variables
NEXT_PUBLIC_APP_NAME=Your App Name
```

### 4. Run Frontend

```bash
npm run dev
# atau
yarn dev
```

Frontend akan berjalan di `http://localhost:3000`

## 🔄 Development Workflow

### Running Both Services

Untuk menjalankan kedua service secara bersamaan:

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
GET    /api/health           # Health check
POST   /api/auth/login       # User login
POST   /api/auth/register    # User registration
GET    /api/users           # Get users
POST   /api/users           # Create user
GET    /api/users/:id       # Get user by ID
PUT    /api/users/:id       # Update user
DELETE /api/users/:id       # Delete user
```

## 🚀 Deployment

### Backend Deployment (Vercel)

1. **Prepare `vercel.json`** di direktori backend:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "main.go",
      "use": "@vercel/go"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "main.go"
    }
  ]
}
```

2. **Deploy ke Vercel**:

```bash
cd backend
npx vercel --prod
```

3. **Set Environment Variables** di Vercel Dashboard untuk production.

### Frontend Deployment (Vercel)

1. **Deploy ke Vercel**:

```bash
cd frontend
npx vercel --prod
```

2. **Set Environment Variables** di Vercel Dashboard:
   - `NEXT_PUBLIC_API_URL_PRODUCTION`
   - Variabel environment lainnya

### Alternative: Deploy via GitHub Integration

1. Push kedua repository ke GitHub
2. Connect repository ke Vercel
3. Set build commands dan environment variables
4. Deploy otomatis setiap push ke main branch

## 🧪 Testing

### Backend Testing

```bash
cd backend
go test ./...
```

### Frontend Testing

```bash
cd frontend
npm run test
# atau
npm run test:watch
```

## 📝 Additional Scripts

### Backend

```bash
# Format code
go fmt ./...

# Run linter
golangci-lint run

# Build for production
go build -o main .
```

### Frontend

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🔍 Troubleshooting

### Common Issues

1. **CORS Error**
   - Pastikan `ALLOWED_ORIGINS` di backend sudah benar
   - Check frontend URL di environment variables

2. **Data File Access**
   - Pastikan file JSON yang dibutuhkan ada di direktori `data`
   - Check permission file untuk read/write access

3. **Port Already in Use**
   ```bash
   # Kill process di port 8080
   lsof -ti:8080 | xargs kill -9
   
   # Kill process di port 3000
   lsof -ti:3000 | xargs kill -9
   ```

4. **Module Not Found**
   ```bash
   # Backend
   go mod tidy
   
   # Frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

5. **JSON File Issues**
   ```bash
   # Check file permissions
   ls -la data/
   
   # Fix permissions if needed
   chmod 644 data/*.json
   ```

## 📚 Documentation

- [Go Documentation](https://golang.org/doc/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Go community for excellent libraries
- Vercel for seamless deployment platform