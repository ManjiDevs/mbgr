# mbgr
A background removal api by Manji Devs

# Background Removal API

A Next.js API for removing image backgrounds, deployable on Vercel.

## API Endpoint

`POST /api/removebg`

### Request Body
```json
{
  "imageUrl": "https://example.com/image.jpg"
}
```

### Response
Returns a PNG image with transparent background.

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` file with your Remove.bg API key
4. Run development server:
   ```bash
   npm run dev
   ```

## Deployment

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!