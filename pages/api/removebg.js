// pages/api/removebg.js
import axios from 'axios';
import sharp from 'sharp';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb' // Set higher limit for image processing
    }
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'imageUrl is required' });
    }
    
    // Option 1: Using Remove.bg API (recommended for production)
    const response = await removeBgWithService(imageUrl);
    
    // Option 2: Using local processing (more complex)
    // const response = await removeBgLocally(imageUrl);
    
    res.setHeader('Content-Type', 'image/png');
    res.send(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to remove background' });
  }
}

// Using Remove.bg API
async function removeBgWithService(imageUrl) {
  const response = await axios({
    method: 'post',
    url: 'https://api.remove.bg/v1.0/removebg',
    data: {
      image_url: imageUrl,
      size: 'auto'
    },
    headers: {
      'X-Api-Key': process.env.REMOVE_BG_API_KEY
    },
    responseType: 'arraybuffer'
  });
  return response.data;
}

// Basic local processing example (would need actual ML model for real bg removal)
async function removeBgLocally(imageUrl) {
  const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const imageBuffer = Buffer.from(imageResponse.data);
  
  // This is just a placeholder - you'd need to implement actual background removal
  const processedImage = await sharp(imageBuffer)
    .png()
    .toBuffer();
  
  return processedImage;
}