import { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError("Por favor, insira uma URL");
      return;
    }
    
    if (!validateUrl(url)) {
      setError("Por favor, insira uma URL válida");
      return;
    }

    setError(null);
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <div className="flex flex-col space-y-2">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Cole sua URL aqui (ex: https://exemplo.com)"
          className="w-full p-3 text-base border rounded-md shadow-sm focus:ring-2 focus:ring-urlshortener-accent focus:border-urlshortener-accent"
          disabled={isLoading}
        />
        {error && (
          <span className="text-sm text-red-500">{error}</span>
        )}
      </div>
      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-urlshortener-primary to-urlshortener-secondary hover:opacity-90 text-white font-medium rounded-md shadow-md transition-all duration-300 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processando...
          </>
        ) : "Encurtar URL"}
      </Button>
    </form>
  );
};

export default UrlInput;