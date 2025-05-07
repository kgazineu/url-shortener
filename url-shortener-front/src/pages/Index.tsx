import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { urlService } from "../services/urlService";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const Index = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const { toast } = useToast();

  const shortenMutation = useMutation({
    mutationFn: urlService.shortenUrl,
    onSuccess: (data) => {
      setShortUrl(data.shortUrl);
      toast({
        title: "URL encurtada com sucesso!",
        description: "Sua URL foi encurtada e está pronta para uso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao encurtar URL",
        description: "Ocorreu um erro ao tentar encurtar sua URL. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["urlStats", shortUrl],
    queryFn: () => urlService.getUrlStats(shortUrl),
    enabled: !!shortUrl,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast({
        title: "URL inválida",
        description: "Por favor, insira uma URL válida.",
        variant: "destructive",
      });
      return;
    }
    shortenMutation.mutate(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast({
      title: "URL copiada!",
      description: "A URL encurtada foi copiada para a área de transferência.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="w-full max-w-md text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
          URL Shortener
        </h1>
        <p className="text-gray-600 mb-4">
          Transforme URLs gigantes em links curtos e compartilháveis
        </p>
      </div>

      <Card className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl border-0">
        <CardHeader className="space-y-1">
          <CardDescription className="text-center">
            Cole sua URL abaixo para obter uma versão mais curta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://exemplo.com/url-muito-longa"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 h-12 text-base"
              />
              <Button 
                type="submit" 
                disabled={shortenMutation.isPending}
                className="h-12 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                {shortenMutation.isPending ? "Encurtando..." : "Encurtar"}
              </Button>
            </div>
          </form>

          {shortUrl && (
            <div className="mt-6 space-y-4">
              <div className="flex gap-2 items-center">
                <Input 
                  value={shortUrl} 
                  readOnly 
                  className="flex-1 h-12 text-base bg-gray-50"
                />
                <Button 
                  onClick={copyToClipboard} 
                  variant="outline"
                  className="h-12 px-6 border-2 hover:bg-gray-50"
                >
                  Copiar
                </Button>
              </div>

              {stats && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-sm font-medium text-gray-600">Cliques</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.clicks}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-sm font-medium text-gray-600">Criado em</p>
                    <p className="text-sm text-gray-900">
                      {new Date(stats.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} URL Shortener - Encurtador de URLs</p>
        <p>Desenvolvido por <a href="https://github.com/kgazineu" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">Kaian Gazineu</a></p>
      </footer>
    </div>
  );
};

export default Index;
