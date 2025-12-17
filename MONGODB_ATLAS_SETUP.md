# 🍃 MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Verify your email address

## Step 2: Create a Cluster
1. After login, click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select **AWS** as cloud provider
4. Choose region closest to you
5. Name your cluster (e.g., "PetHaven-Cluster")
6. Click "Create Cluster" (takes 1-3 minutes)

## Step 3: Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `pethaven_user`
5. Password: Generate a secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

## Step 4: Configure Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and version "4.1 or later"
5. Copy the connection string

## Step 6: Update Your .env File
Replace the MONGO_URI in your `.env` file with:

```env
MONGO_URI=mongodb+srv://pethaven_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/pethaven_db?retryWrites=true&w=majority
```

**Replace:**
- `YOUR_PASSWORD` with the password you created
- `cluster0.xxxxx.mongodb.net` with your actual cluster URL
- `pethaven_db` is your database name (will be created automatically)

## Step 7: Test Connection
1. Save the `.env` file
2. Run your backend server:
   ```bash
   cd mern-ecom-auth
   npm run dev
   ```
3. Look for: "✅ MongoDB Atlas Connected: cluster0.xxxxx.mongodb.net"

## Step 8: Seed Database (Optional)
```bash
npm run seed
```

## 🔧 Troubleshooting

### Connection Issues:
- Check username/password in connection string
- Verify IP whitelist (0.0.0.0/0)
- Ensure cluster is running (not paused)

### Common Errors:
- **Authentication failed**: Wrong username/password
- **Network timeout**: Check network access settings
- **Database not found**: Database will be created automatically on first write

## 📊 Accessing Your Database

### Via MongoDB Atlas Dashboard:
1. Go to "Database" → "Browse Collections"
2. View your data in the web interface

### Via MongoDB Compass (Desktop App):
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Use the same connection string
3. Visual database management

### Via Code:
Your existing API endpoints will work automatically:
- `GET /api/pets` - View all pets
- `POST /api/pets` - Add new pet
- `GET /api/users` - View users

## 🚀 Production Tips
- Use environment-specific clusters
- Enable database backups
- Monitor performance metrics
- Set up alerts for issues

## 📝 Your Connection Details
- **Cluster Name**: [Your cluster name]
- **Database Name**: pethaven_db
- **Username**: pethaven_user
- **Connection String**: [Save in .env file]

---
✅ **Setup Complete!** Your PetHaven app is now connected to MongoDB Atlas cloud database.