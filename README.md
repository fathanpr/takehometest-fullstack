
# Takehome Test - Next.js + Golang

Sistem Fullstack Sederhana menggunakan Next.js 15 sebagai Frontend dan Golang sebagai Backend.

## 🔗 Demo Project

- **Frontend**: [https://takehometest-nextjs.vercel.app](https://takehometest-nextjs.vercel.app)  
- **Backend API**: [https://takehometest-golang.vercel.app](https://takehometest-golang.vercel.app)

## TechStack

### Backend
- **Go** - Bahasa pemrograman
- **Gin** - Web Framework
- **File JSON** - Penyimpanan data

### Frontend
- **JavaScript** - Bahasa pemrograman
- **Next.js 15** - Web Framework
- **Tailwind CSS** - Styling
- **Shadcn UI** - Komponen UI
- **Vercel** - Platform Deploy

## Instalasi Project

### Prerequisites

Pastikan Anda sudah menginstal:

- [Go](https://golang.org/dl/) (versi 1.19+)
- [Node.js](https://nodejs.org/) (versi 18+)
- [Git](https://git-scm.com/)

### Instalasi Proyek

```bash
# Clone repositori
git clone https://github.com/fathanpr/takehometest-fullstack.git
cd takehometest-fullstack
```

---

## ⚙️ Setup Backend

### 1. Masuk ke Direktori Backend

```bash
cd backend
```

### 2. Install Dependensi

```bash
go mod tidy
```

### 3. Variabel Lingkungan

Buat file `.env` di direktori backend:

```env
GIN_MODE=release            # Gunakan 'debug' untuk mode pengembangan
API_KEY=2f8c1e7b-...        # API Key untuk JWT
FILE_USER=/tmp/users.json   # Path file JSON untuk penyimpanan user
```

### 4. Siapkan File Data

```bash
mkdir -p data
```

Contoh isi `data/users.json`:

```json
[
  {
    "id": 1,
    "username": "FATHAN1",
    "email": "fathan1@example.com",
    "password": "hashedpassword1"
  },
  {
    "id": 2,
    "username": "FATHAN2",
    "email": "fathan2@example.com",
    "password": "hashedpassword2"
  }
]
```

### 5. Jalankan Backend

```bash
go run main.go
```

Aplikasi backend akan berjalan di `http://localhost:8080`

---

## 🌐 Setup Frontend

### 1. Masuk ke Direktori Frontend

```bash
cd frontend
```

### 2. Install Dependensi

```bash
npm install
```

### 3. Variabel Lingkungan

Buat file `.env` di dalam direktori `frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 4. Jalankan Frontend

```bash
npm run dev
```

Frontend akan tersedia di `http://localhost:3000`

---

## Workflow Development

### Menjalankan Keduanya Bersamaan

Buka 2 terminal:

```bash
# Terminal 1 - Backend
cd backend
go run main.go

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Endpoint API

```http
POST   /login         # Login
POST   /users         # Register
GET    /users/:id     # Ambil data user
PUT    /users/:id     # Update user
DELETE /users/:id     # Hapus user
```

---

## 🚀 Deploy ke Vercel

### Backend

1. Buat `vercel.json` di folder `backend`:

```json
{
  "version": 2,
  "builds": [{ "src": "api/index.go", "use": "@vercel/go" }],
  "routes": [{ "src": "/.*", "dest": "api/index.go" }]
}
```

2. Jalankan deploy:

```bash
cd backend
npx vercel --prod
```

3. Tambahkan variabel `.env` di dashboard Vercel.

---

### Frontend

1. Deploy:

```bash
cd frontend
npx vercel --prod
```

2. Tambahkan variabel lingkungan di dashboard Vercel:
   - `NEXT_PUBLIC_API_URL`

---

## ❗ Troubleshooting

1. **CORS Error**
   - Pastikan frontend URL diizinkan oleh backend

2. **File JSON tidak ditemukan**
   - Pastikan file dan folder data tersedia & dapat ditulis

3. **Module tidak ditemukan**
   ```bash
   # Backend
   go mod tidy

   # Frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## 👥 Author

- **Fathan Pebrilliestyo Ridwan**  
  Takehome Test - PT Century Batteries Indonesia  
  GitHub: [fathanpr](https://github.com/fathanpr)
