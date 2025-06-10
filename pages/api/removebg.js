import axios from 'axios';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
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
    
    // Call Remove.bg API
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
    
    res.setHeader('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Failed to remove background',
      details: error.message
    });
  }
}