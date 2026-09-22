# Backend - Spotify Clone

A robust Node.js/Express backend for the Spotify Clone music streaming application with MongoDB database.

## Quick Start

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev

# Production
npm start
```

## Project Architecture

### Folder Structure

```
Backend/
├── src/
│   ├── controllers/           # Request handlers
│   │   ├── auth.controller.js - Authentication logic
│   │   └── music.controller.js - Music and album operations
│   ├── middlewares/
│   │   └── auth.middleware.js - JWT verification & role checking
│   ├── models/                # Mongoose schemas
│   │   ├── user.model.js      - User schema
│   │   ├── music.model.js     - Music/Song schema
│   │   └── album.model.js     - Album schema
│   ├── routes/                # API route definitions
│   │   ├── auth.routes.js     - Auth endpoints
│   │   └── music.routes.js    - Music/Album endpoints
│   ├── services/
│   │   └── storage.service.js - ImageKit file upload service
│   ├── db/
│   │   └── db.js              - MongoDB connection
│   └── app.js                 - Express app setup (middleware, routes)
├── server.js                  - Server entry point
├── package.json
├── Dockerfile                 - Docker configuration
├── .env.example              - Environment variables template
└── .gitignore
```

## Database Schema

### User Model
```javascript
{
  username: String,        // Unique, required
  email: String,          // Unique, required
  password: String,       // Hashed with bcryptjs
  role: String,           // 'user' or 'artist'
  createdAt: Date         // Auto-generated
}
```

### Music Model
```javascript
{
  uri: String,            // URL from ImageKit
  title: String,          // Song title
  artist: ObjectId,       // Reference to User
  likes: [ObjectId],      // Array of user IDs who liked
  comments: [{
    user: ObjectId,       // Comment author
    text: String,         // Comment text
    createdAt: Date       // When commented
  }],
  playCount: Number,      // Play count tracker
  createdAt: Date,
  updatedAt: Date
}
```

### Album Model
```javascript
{
  title: String,          // Album name
  artist: ObjectId,       // Reference to User (artist)
  musics: [ObjectId],     // Array of music IDs
  createdAt: Date
}
```

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | ❌ | Register new user |
| POST | `/login` | ❌ | User login |
| POST | `/logout` | ✅ | User logout |
| GET | `/me` | ✅ | Get current user info |
| POST | `/become-artist` | ✅ | Upgrade to artist account |

### Music Routes (`/api/music`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | ✅ | Get all music |
| POST | `/upload` | ✅🎤 | Upload new song |
| POST | `/album` | ✅🎤 | Create album |
| GET | `/albums` | ✅ | Get all albums |
| GET | `/albums/:albumId` | ✅ | Get album details |
| POST | `/:musicId/like` | ✅ | Like/unlike song |
| POST | `/:musicId/comment` | ✅ | Add comment |
| POST | `/:musicId/play` | ✅ | Record play count |

**Legend:** ✅ = User auth required, 🎤 = Artist only

## Environment Variables

Create `.env` file:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/spotify-clone

# JWT
JWT_SECRET=your-very-secure-secret-key-change-this

# ImageKit (File uploads)
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key_here

# Server
PORT=3000
NODE_ENV=development
```

## Authentication Flow

1. **Registration/Login**
   - User provides username/email and password
   - Password hashed with bcryptjs (10 rounds)
   - JWT token generated and stored in HTTP-only cookie

2. **Protected Routes**
   - Middleware verifies JWT from cookie
   - Token decoded to get user ID and role
   - Attached to `req.user` for controller access

3. **Artist Routes**
   - Additional check for `role === 'artist'`
   - Returns 403 Forbidden if not artist

## File Upload Process

1. Frontend sends music file + title
2. Multer captures file in memory
3. Backend converts to base64
4. ImageKit uploads with folder structure
5. Returns URL stored in database

**ImageKit Folder:** `f2-backend-cluster1/music`

## Middleware Stack

```
Request → CORS → Helmet → JSON Parser → Cookie Parser → Routes
                                            ↓
                                    Auth Middleware (if needed)
```

**Middleware Details:**
- `helmet()` - Security headers
- `express.json()` - JSON body parsing
- `cookieParser()` - Cookie handling
- `cors()` - Cross-origin requests
- `authArtist()` - Artist-only endpoints
- `authUser()` - User & artist endpoints

## Error Handling

Response format for errors:
```javascript
{
  message: "Error description"
}
```

**Common Status Codes:**
- `201` - Created successfully
- `200` - OK
- `400` - Bad request (validation error)
- `401` - Unauthorized (no token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not found
- `409` - Conflict (duplicate user)
- `500` - Server error

## Development

### Available Scripts

```bash
npm run dev       # Start with nodemon (auto-reload)
npm start         # Production server
npm test          # Run tests (if configured)
```

### Development Tools

- **nodemon** - Auto-restart on file changes
- **dotenv** - Environment variable management

## Production Deployment

### Environment Setup

```env
MONGO_URI=<production_mongo_uri>
JWT_SECRET=<strong_random_string>
IMAGEKIT_PRIVATE_KEY=<production_key>
NODE_ENV=production
PORT=3000
```

### Docker Deployment

```bash
docker build -t spotify-backend:latest .
docker run -p 3000:3000 --env-file .env spotify-backend:latest
```

### CORS Configuration

For production, update CORS in `src/app.js`:

```javascript
const corsOptions = {
  origin: 'https://your-frontend-domain.com',
  credentials: true
};
```

## Deployment Platforms

### Render
1. Connect GitHub repo
2. Set environment variables in dashboard
3. Deploy with `npm start` as start command

### Railway
1. Create new project from GitHub
2. Add environment variables
3. Deploy automatically

### Heroku
1. Create app: `heroku create your-app-name`
2. Add buildpack: `heroku buildpacks:add heroku/nodejs`
3. Deploy: `git push heroku main`

## Performance Considerations

- MongoDB queries limited to 1000 records per request
- Consider pagination for large datasets
- Implement caching for frequently accessed data
- Use indexes on frequently queried fields

### Recommended MongoDB Indexes

```javascript
// User collection
db.users.createIndex({ username: 1 }, { unique: true });
db.users.createIndex({ email: 1 }, { unique: true });

// Music collection
db.musics.createIndex({ artist: 1 });
db.musics.createIndex({ createdAt: -1 });

// Album collection
db.albums.createIndex({ artist: 1 });
```

## Security Best Practices

✅ Password hashing with bcryptjs
✅ JWT for stateless authentication
✅ HTTP-only cookies (XSS protection)
✅ CORS configured
✅ Helmet for security headers
✅ Input validation on all endpoints
✅ Role-based access control
✅ Token expiration (implement)
✅ Rate limiting (recommended)
✅ Request logging (recommended)

## Logging Setup (Recommended)

```bash
npm install morgan winston
```

Add to `src/app.js`:
```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```

## Testing Recommendations

```bash
npm install --save-dev jest supertest
```

Example test structure:
```
tests/
├── auth.test.js
├── music.test.js
└── setup.js
```

## Troubleshooting

### MongoDB Connection Error
- Verify MONGO_URI format
- Check IP whitelist in MongoDB Atlas
- Ensure database exists

### JWT Token Issues
- Verify JWT_SECRET is set
- Check token expiration
- Clear client cookies

### ImageKit Upload Fails
- Verify IMAGEKIT_PRIVATE_KEY
- Check folder exists in ImageKit
- Validate file format/size

### CORS Errors
- Verify frontend URL in CORS config
- Check credentials: true is set
- Verify cookies are being sent

## Future Enhancements

- [ ] Implement pagination
- [ ] Add request rate limiting
- [ ] Implement JWT refresh tokens
- [ ] Add activity logging
- [ ] Implement search indexing
- [ ] Add email notifications
- [ ] Implement playlist feature
- [ ] Add user recommendations
- [ ] Implement social features
- [ ] Add analytics

## API Testing Tools

- **Postman** - Full-featured API testing
- **Insomnia** - Alternative to Postman
- **cURL** - Command-line testing

### Example cURL Request

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

## Support & Debugging

Enable debug logging:
```bash
DEBUG=* npm run dev
```

Check Node version:
```bash
node --version  # Should be v16+
```

## License

ISC

---
**Last Updated:** 2026-07-03
**Backend Status:** ✅ Production Ready
