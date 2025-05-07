# 🔗 Encurtador de URL — Full Stack App

Este é um projeto full stack de um **encurtador de URL simples**, com:

* **Frontend**: React + Tailwind CSS
* **Backend**: C# com .NET
* **Containerização** com Docker
* **Orquestração** via Docker Compose

> O objetivo é permitir a criação e o redirecionamento de URLs curtas de forma prática e funcional.

---

## 📁 Estrutura do Projeto

```
.
├── url-shortener-front/             # Aplicação React + Tailwind
│   └── Dockerfile
├── url-shortener-back/              # API .NET para encurtamento de URLs
│   └── Dockerfile
├── docker-compose.yml    # Orquestração dos serviços
└── README.md             # Este arquivo
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

### Passo a passo

Na raiz do projeto, execute:

```bash
docker-compose up --build
```

Isso irá:

* Construir e iniciar os containers do frontend e backend
* Expor as portas necessárias para uso e testes

---

## 🌐 Acessando a Aplicação

* **Frontend**: [http://localhost:5173](http://localhost:5173)
* **Backend (API)**: já está sendo **consumido automaticamente** pelo frontend

Você pode interagir diretamente pela interface do React, testando a criação de URLs encurtadas e o redirecionamento, **sem precisar configurar nada manualmente.**

---

## 🧪 Testes e Desenvolvimento

Se preferir rodar separadamente os serviços (sem Docker Compose), veja os READMEs nas pastas:

* [`url-shortener-front/README.md`](./url-shortener-front/README.md)
* [`url-shortener-back/README.md`](./url-shortener-back/README.md)

---

## ⚙️ Configurações

* As variáveis de ambiente do frontend e backend estão nos respectivos diretórios
* As portas padrão usadas são:

  * **Frontend**: `5173`
  * **Backend**: `8080`

---
