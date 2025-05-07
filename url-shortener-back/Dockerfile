#Fazendo o build da imagem
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

#Copia o csproj e restaura as dependências
COPY *.csproj ./
RUN dotnet restore

#Copia o restante do código e faz o build
COPY . . 
RUN dotnet publish -c Release -o /app/publish

#Fazendo o runtime da imagem
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final 
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["dotnet", "UrlShortener.dll"]