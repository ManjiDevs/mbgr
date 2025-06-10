import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { readFile } from 'fs/promises';
import { removeBackground } from '@imgly/background-removal';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }
  
  const form = new formidable.IncomingForm({ keepExtensions: true });
  
  form.parse(req, async (err, fields, files) => {
    if (err || !files.image) {
      return res.status(400).json({ error: 'Image is required' });
    }
    
    const imagePath = files.image[0].filepath;
    const imageBuffer = await readFile(imagePath);
    
    try {
      const output = await removeBackground(imageBuffer, {
        format: 'png',
        backend: 'wasm', // works in Vercel!
      });
      
      res.setHeader('Content-Type', 'image/png');
      res.send(output);
    } catch (error) {
      console.error('Background removal error:', error);
      res.status(500).json({ error: 'Failed to remove background' });
    }
  });
}