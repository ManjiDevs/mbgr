import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [resultImage, setResultImage] = useState < string | null > (null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState < string | null > (null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/removebg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process image');
      }
      
      const blob = await response.blob();
      setResultImage(URL.createObjectURL(blob));
    } catch (err: any) {
      setError(err.message);
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
          placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          required
        />
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            padding: '0.5rem 1rem',
            background: isLoading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isLoading ? 'Processing...' : 'Remove Background'}
        </button>
      </form>

      {error && <div style={{ color: 'red', margin: '1rem 0' }}>Error: {error}</div>}
      {resultImage && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Result:</h2>
          <img 
            src={resultImage} 
            alt="Result" 
            style={{ maxWidth: '100%', border: '1px solid #ddd', marginTop: '1rem' }} 
          />
        </div>
      )}
    </div>
  );
}