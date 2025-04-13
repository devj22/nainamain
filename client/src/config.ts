// API configuration
export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://nainaland-api.onrender.com'  // Backend URL on Render
  : 'http://localhost:5002';

// Add API URL prefix to a path
export function getApiUrl(path: string): string {
  // Remove any leading slashes from the path
  const cleanPath = path.replace(/^\/+/, '');
  return `${API_BASE_URL}/api/${cleanPath}`;
} 