import * as React from 'react';
import { useToast } from "../components/ui/use-toast";
import UrlInput from './UrlInput';
import ShortUrlDisplay from './ShortUrlDisplay';

interface ShortenedUrlResponse {
  shortCode: string;
  originalUrl: string;
}

const UrlShortener: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [shortenedUrl, setShortenedUrl] = React.useState<ShortenedUrlResponse | null>(null);
  const { toast } = useToast();

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: url }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao encurtar URL: ${response.status}`);
      }

      const data = await response.json();
      setShortenedUrl(data);
    } catch (error) {
      console.error('Erro:', error);
      toast({
        title: "Erro ao encurtar URL",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShortenedUrl(null);
  };

  return (
    <div className="w-full max-w-md">
      {!shortenedUrl ? (
        <UrlInput onSubmit={handleUrlSubmit} isLoading={isLoading} />
      ) : (
        <ShortUrlDisplay shortCode={shortenedUrl.shortCode} onReset={handleReset} />
      )}
    </div>
  );
};

export default UrlShortener;