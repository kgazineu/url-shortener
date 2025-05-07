# 🚀 Encurtador de URL

Frontend construído com **React** e **Tailwind CSS**, utilizando **Docker** para facilitar a execução e orquestrado com **Docker Compose** na raiz do projeto.

## 📦 Tecnologias Utilizadas

* [React](https://react.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

## 📁 Estrutura do Projeto

```
.
├── url-shortener-front/            
│   ├── Dockerfile        
│   └── ...
├── docker-compose.yml
└── README.md
```

## 🐳 Como Rodar com Docker Compose

> Certifique-se de que você tem o **Docker** e o **Docker Compose** instalados na sua máquina.

Na raiz do projeto (onde está o `docker-compose.yml`), execute:

```bash
docker-compose up --build
```

Isso irá:

* Construir a imagem Docker do frontend.
* Iniciar o contêiner React com Tailwind.

A aplicação estará acessível em: [http://localhost:5137](http://localhost:5137)

## 🔧 Gerar Apenas a Imagem do Front-end

Se você quiser **somente construir a imagem do front-end**, sem usar o `docker-compose`, execute os seguintes comandos:

```bash
cd frontend
docker build -t url-shortener-front .
```

Para rodar o container isolado:

```bash
docker run -p 5137:80 url-shortener-front
```

A aplicação estará disponível em: [http://localhost:5137](http://localhost:5137)

---

## 🧪 Comandos Úteis

### Parar os containers

```bash
docker-compose down
```

### Rebuild sem cache

```bash
docker-compose build --no-cache
```

## ✨ Personalização

Você pode alterar as configurações do Tailwind no arquivo:

```
url-shortener-front/tailwind.config.js
```

E as variáveis de ambiente do React podem ser definidas em:

```
frontend/.env
```

## 🛠️ Desenvolvimento sem Docker (opcional)

Se preferir rodar sem Docker:

```bash
cd url-shortener-front
npm install
npm run dev
```
