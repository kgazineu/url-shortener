import * as React from 'react';
import { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface ShortUrlDisplayProps {
  shortCode: string;
  onReset: () => void;
}

const ShortUrlDisplay: React.FC<ShortUrlDisplayProps> = ({ shortCode, onReset }) => {
  const [copied, setCopied] = useState(false);
  const shortUrl = `http://localhost:8080/${shortCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full space-y-4 p-4 bg-white rounded-lg border border-urlshortener-accent/20 shadow-md">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-urlshortener-text/70">Seu link encurtado está pronto:</h3>
          <Button 
            variant="ghost" 
            onClick={onReset}
            className="text-xs text-urlshortener-accent hover:text-urlshortener-primary"
          >
            Encurtar outra URL
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Input
            readOnly
            value={shortUrl}
            className="bg-urlshortener-background text-urlshortener-primary font-medium focus:ring-1 focus:ring-urlshortener-accent"
          />
          <Button 
            onClick={copyToClipboard} 
            className={`min-w-[100px] ${copied ? 'bg-green-500' : 'bg-urlshortener-primary'} text-white hover:opacity-90 transition-all duration-300`}
          >
            {copied ? "Copiado!" : "Copiar"}
          </Button>
        </div>
      </div>
      
      <div className="pt-2 text-center">
        <a 
          href={shortUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-urlshortener-accent hover:text-urlshortener-primary text-sm underline transition-colors"
        >
          Abrir em nova aba
        </a>
      </div>
    </div>
  );
};

export default ShortUrlDisplay;
