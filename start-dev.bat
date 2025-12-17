@echo off
echo 🚀 Starting PetHaven Development Environment...

echo.
echo 📦 Installing Backend Dependencies...
cd mern-ecom-auth
call npm install

echo.
echo 🌱 Seeding Database...
call npm run seed

echo.
echo 🖥️ Starting Backend Server...
start "Backend Server" cmd /k "npm run dev"

echo.
echo 📦 Installing Frontend Dependencies...
cd ..\FRONTEND
call npm install

echo.
echo 🎨 Starting Frontend Server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ✅ Both servers are starting...
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:5000
echo 📊 API Health: http://localhost:5000/api/health

pause