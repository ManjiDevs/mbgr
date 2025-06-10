// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [resultImage, setResultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/removebg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });
      
      const blob = await response.blob();
      setResultImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>Background Removal API</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL"
          style={{ width: '100%', padding: '0.5rem' }}
        />
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
        >
          {isLoading ? 'Processing...' : 'Remove Background'}
        </button>
      </form>

      {resultImage && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Result:</h2>
          <img 
            src={resultImage} 
            alt="Result" 
            style={{ maxWidth: '100%', border: '1px solid #ddd' }} 
          />
        </div>
      )}
    </div>
  );
}