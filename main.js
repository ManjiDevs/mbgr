// api/removebg.js
import tf from '@tensorflow/tfjs-node';
import axios from 'axios';
import sharp from 'sharp';

let model;

async function loadModel() {
  model = await tf.loadGraphModel('https://your-model-url/model.json');
}

// Initialize model when the function loads
loadModel();

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'imageUrl is required' });
    }

    // Download and process image
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data);
    
    // Process with Sharp and TensorFlow
    const processedImage = await processImage(imageBuffer);
    
    res.setHeader('Content-Type', 'image/png');
    res.send(processedImage);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to remove background' });
  }
};

async function processImage(buffer) {
  // Implement your image processing logic here
  // This would involve resizing, normalizing, running through model, etc.
  // Return processed image buffer
}