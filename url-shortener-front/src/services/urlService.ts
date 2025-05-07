import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

interface ShortenUrlResponse {
  shortUrl: string;
}

interface UrlStatsResponse {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

export const urlService = {
  async shortenUrl(originalUrl: string): Promise<ShortenUrlResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/shorten`, { url: originalUrl });
      return { shortUrl: response.data };
    } catch (error) {
      console.error('Error shortening URL:', error);
      throw error;
    }
  },

  async getUrlStats(shortUrl: string): Promise<UrlStatsResponse> {
    try {
      // Extrair o código da URL curta
      const code = shortUrl.split('/').pop();
      const response = await axios.get(`${API_BASE_URL}/stats/${code}`);
      return response.data;
    } catch (error) {
      console.error('Error getting URL stats:', error);
      throw error;
    }
  }
}; 