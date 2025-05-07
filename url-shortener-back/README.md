# 🛠️ Backend do Projeto

API construída com **C#** e **ASP.NET**, containerizada com **Docker** e orquestrada via **Docker Compose** na raiz do repositório.

## 📦 Tecnologias Utilizadas

* [.NET](https://learn.microsoft.com/pt-br/dotnet/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

## 📁 Estrutura do Projeto

```
.
├── url-shortener-back/              
│   ├── Dockerfile       
│   └── ...
├── docker-compose.yml   
└── README.md
```

---

## 🐳 Executar com Docker Compose

Na raiz do projeto, execute:

```bash
docker-compose up --build
```

Isso irá:

* Construir a imagem da API.

Por padrão, a API estará disponível em: [http://localhost:8080](http://localhost:8080)

> (ajuste a porta conforme configurado no seu `Dockerfile` ou `docker-compose.yml`)

### Parar os containers

```bash
docker-compose down
```

---

## 🔧 Gerar Apenas a Imagem do Backend

Para criar **apenas a imagem da API**, sem usar o `docker-compose`, execute:

```bash
cd url-shortener-back
docker build -t url-shortener-api .
```

Para rodar o container manualmente:

```bash
docker run -p 8080:8080 minha-api
```

A API estará disponível em: [http://localhost:8080](http://localhost:8080)


---

## 🧪 Desenvolvimento Local sem Docker

Você também pode rodar a API localmente no ambiente de desenvolvimento:

```bash
cd url-shortener-back

dotnet build
dotnet run
```


---

## ⚙️ Configurações

* Porta da aplicação: definida no `Dockerfile` e nas configurações do servidor
