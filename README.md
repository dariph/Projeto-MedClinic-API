# 🏥 MedClinic API

API REST desenvolvida em **Node.js, TypeScript, Express.js, TypeORM e PostgreSQL**.

Esta etapa implementa a base de autenticação e autorização da aplicação, utilizando **JWT**, **bcrypt** e **RBAC (Role-Based Access Control)**.

---

## 📌 1. Sobre o projeto

O **MedClinic API** é uma aplicação REST desenvolvida para representar a estrutura inicial de um sistema de gerenciamento de uma clínica médica.

Nesta primeira etapa, o foco está na construção de uma base segura e organizada para controle de acesso ao sistema.

### Funcionalidades implementadas

- Cadastro de usuários;
- Validação dos dados de entrada;
- Hash seguro das senhas com `bcrypt`;
- Login de usuários;
- Autenticação utilizando JWT;
- Middleware de autenticação;
- Controle de acesso por perfil (RBAC);
- Perfis `Administrador` e `Atendente`;
- Endpoint para consulta dos dados do usuário autenticado;
- Endpoint exclusivo para Administrador;
- Tratamento centralizado de erros;
- Persistência dos dados utilizando PostgreSQL;
- ORM utilizando TypeORM;
- Migrations;
- Arquitetura organizada em camadas;
- Tipagem estática utilizando TypeScript.

---

# 🎯 2. Objetivo da Etapa 1

O objetivo desta etapa é implementar uma estrutura profissional de **autenticação e autorização**.

A aplicação deve ser capaz de:

1. cadastrar um usuário;
2. armazenar sua senha de forma segura;
3. realizar login;
4. gerar um token JWT;
5. validar o token nas rotas protegidas;
6. identificar o usuário autenticado;
7. controlar o acesso conforme seu perfil;
8. impedir que usuários sem permissão acessem recursos administrativos.

---

# 🛠️ 3. Tecnologias utilizadas

| Tecnologia               | Utilização                         |
| ------------------------ | ---------------------------------- |
| **Node.js**              | Ambiente de execução               |
| **Express.js**           | Framework para criação da API REST |
| **TypeScript**           | Tipagem estática                   |
| **TypeORM**              | ORM e persistência de dados        |
| **PostgreSQL**           | Banco de dados relacional          |
| **JWT**                  | Autenticação baseada em token      |
| **bcrypt**               | Hash seguro das senhas             |
| **Zod**                  | Validação dos dados                |
| **dotenv**               | Variáveis de ambiente              |
| **express-async-errors** | Tratamento de erros assíncronos    |

---

# 💻 4. Pré-requisitos

Para executar o projeto é necessário possuir:

- Node.js 18 ou superior;
- npm;
- PostgreSQL 14 ou superior;
- Git;
- VS Code ou outro editor de código;
- cliente HTTP para testes, como:
  - REST Client do VS Code;
  - Insomnia;
  - Postman;

### Verificar Node.js

```bash
node --version
```

### Verificar npm

```bash
npm --version
```

### Verificar PostgreSQL

```bash
psql --version
```

---

# 📁 5. Estrutura do projeto

```text
Projeto-MedClinic-API/
│
├── src/
│   │
│   ├── @types/
│   │   └── express/
│   │       └── index.d.ts
│   │
│   ├── controllers/
│   │   ├── AuthController.ts
│   │   └── UserController.ts
│   │
│   ├── database/
│   │   ├── migrations/
│   │   │   └── 1710000000000-CreateUsersTable.ts
│   │   └── data-source.ts
│   │
│   ├── dtos/
│   │   └── UserDTO.ts
│   │
│   ├── entities/
│   │   └── User.ts
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   │   ├── errorMiddleware.ts
│   │   ├── rateLimiter.ts
│   │   ├── roleMiddleware.ts
│   │   └── validateMiddleware.ts
│   │
│   ├── repositories/
│   │   └── UserRepository.ts
│   │
│   ├── routes/
│   │   └── routes.ts
│   │
│   ├── schemas/
│   │   └── userSchema.ts
│   │
│   ├── services/
│   │   ├── AuthService.ts
│   │   └── UserService.ts
│   │
│   ├── utils/
│   │   ├── AppError.ts
│   │   └── env.ts
│   │
│   └── server.ts
│
├── .env
├── .env.example
├── .gitignore
├── .prettierrc
├── api.rest
├── eslint.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🧱 6. Arquitetura da aplicação

O projeto foi organizado em camadas, separando as responsabilidades de cada componente.

```text
Cliente HTTP
     │
     ▼
   Routes
     │
     ▼
 Middlewares
     │
     ▼
 Controllers
     │
     ▼
  Services
     │
     ▼
Repositories
     │
     ▼
  TypeORM
     │
     ▼
 PostgreSQL
```

### Routes

Responsáveis por definir os endpoints da API e a ordem de execução dos middlewares.

### Middlewares

Responsáveis por:

- autenticação;
- autorização;
- validação;
- tratamento de erros.

### Controllers

Recebem as requisições HTTP e encaminham as informações para os serviços.

### Services

Concentram as regras de negócio da aplicação.

### Repositories

Responsáveis pela comunicação com o banco de dados através do TypeORM.

### Entities

Representam as entidades persistidas no banco.

### DTOs

Definem estruturas de dados utilizadas nas entradas e respostas da aplicação.

### Schemas

Definem as regras de validação utilizando Zod.

### Utils

Contêm componentes auxiliares reutilizáveis.

---

# 🗄️ 7. Banco de dados

O projeto utiliza:

```text
PostgreSQL
```

Banco utilizado:

```text
medclinic
```

A estrutura do banco é criada por meio de **migrations do TypeORM**.

A aplicação utiliza:

```text
synchronize: false
```

Isso significa que o TypeORM não altera automaticamente a estrutura do banco.

A criação e alteração da estrutura devem ser realizadas através de migrations.

---

# 🗃️ 8. Criando o banco de dados

No PostgreSQL, execute:

```sql
CREATE DATABASE medclinic;
```

Depois conecte-se ao banco:

```sql
\c medclinic
```

---

# 🔧 9. Configuração das variáveis de ambiente

O projeto utiliza variáveis de ambiente para evitar que informações sensíveis sejam gravadas diretamente no código.

Crie um arquivo:

```text
.env
```

na raiz do projeto.

Utilize o arquivo `.env.example` como modelo.

Exemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=sua_senha_do_postgresql
DB_NAME=medclinic

JWT_SECRET=coloque_uma_chave_secreta_longa_e_aleatoria
JWT_EXPIRES_IN=1h
```

### ⚠️ Segurança

O arquivo `.env` **não deve ser enviado para o GitHub**.

O projeto possui:

```text
.gitignore
```

com a configuração:

```text
.env
```

O arquivo que deve ser enviado ao GitHub é:

```text
.env.example
```

---

# 📦 10. Instalação

Clone o projeto:

```bash
git https://github.com/dariph/Projeto-MedClinic-API.git
```

Entre na pasta:

```bash
cd Projeto-MedClinic-API
```

Instale as dependências:

```bash
npm install
```

---

# 🗂️ 11. Migrations

A migration responsável pela criação da tabela de usuários está localizada em:

```text
src/database/migrations/1710000000000-CreateUsersTable.ts
```

Ela cria:

- extensão UUID;
- enum de perfil;
- tabela `users`;
- chave primária;
- e-mail único;
- data de criação.

Execute:

```bash
npm run migration:run
```

Para verificar no PostgreSQL:

```sql
\c medclinic
```

Depois:

```sql
\d users
```

---

# ▶️ 12. Executando a aplicação

## Instalar dependências

```bash
npm install
```

## Executar migration

```bash
npm run migration:run
```

## Executar em desenvolvimento

```bash
npm run dev
```

A aplicação será iniciada na porta definida no `.env`.

Por padrão:

```text
http://localhost:3000
```

---

# 🧪 13. Scripts disponíveis

## Desenvolvimento

```bash
npm run dev
```

Executa a aplicação utilizando `tsx` em modo de desenvolvimento.

## Compilação

```bash
npm run build
```

Compila o TypeScript para JavaScript.

## Produção

```bash
npm start
```

Executa a aplicação compilada.

## TypeORM

```bash
npm run typeorm
```

Executa a CLI do TypeORM.

## Gerar migration

```bash
npm run migration:generate
```

## Executar migrations

```bash
npm run migration:run
```

## Reverter migration

```bash
npm run migration:revert
```

---

# 👤 14. Entidade User

A entidade `User` representa os usuários do sistema.

Campos:

| Campo        | Tipo      | Descrição           |
| ------------ | --------- | ------------------- |
| `id`         | UUID      | Identificador único |
| `nome`       | varchar   | Nome do usuário     |
| `email`      | varchar   | E-mail              |
| `senha`      | varchar   | Hash da senha       |
| `role`       | enum      | Perfil do usuário   |
| `created_at` | timestamp | Data de criação     |

O campo `email` possui restrição de unicidade.

---

# 🔐 15. Perfis de usuário

A aplicação possui dois perfis:

```text
Administrador
Atendente
```

## Administrador

Possui acesso aos recursos administrativos previstos nesta etapa.

Pode acessar:

```http
GET /admin/ping
```

## Atendente

Possui acesso limitado.

Pode acessar:

```http
GET /users/me
```

quando estiver autenticado.

Não possui autorização para acessar:

```http
GET /admin/ping
```

Nesse caso a API retorna:

```text
403 Forbidden
```

---

# 🔑 16. Autenticação

A autenticação utiliza **JSON Web Token (JWT)**.

Fluxo:

```text
Usuário
   │
   ▼
Login
   │
   ▼
Validação do e-mail e senha
   │
   ▼
JWT gerado
   │
   ▼
Cliente armazena/utiliza o token
   │
   ▼
Requisição protegida
   │
   ▼
authMiddleware
   │
   ▼
Usuário autenticado
```

O token contém informações necessárias para identificar o usuário e seu perfil.

Exemplo conceitual:

```json
{
  "id": "uuid-do-usuario",
  "role": "Administrador"
}
```

---

# 🔒 17. Proteção das senhas

As senhas nunca são armazenadas em texto puro.

Durante o cadastro:

```text
Senha
  │
  ▼
bcrypt
  │
  ▼
Hash
  │
  ▼
PostgreSQL
```

Exemplo:

```text
Senha informada:
Admin123
```

é transformada em um hash semelhante a:

```text
$2b$10$...
```

O hash armazenado no banco não permite recuperar diretamente a senha original.

---

# 🛡️ 18. Autorização RBAC

A aplicação utiliza:

```text
Role-Based Access Control
```

ou:

```text
RBAC
```

O middleware de autorização verifica o perfil do usuário.

Exemplo:

```text
Administrador
     │
     ▼
/admin/ping
     │
     ▼
Acesso permitido
```

Enquanto:

```text
Atendente
     │
     ▼
/admin/ping
     │
     ▼
403 Forbidden
```

---

# 🌐 19. Endpoints

## 19.1 Cadastro

```http
POST /auth/register
```

### Exemplo

```json
{
  "nome": "Administrador Teste",
  "email": "admin@medclinic.com",
  "senha": "Admin123",
  "role": "Administrador"
}
```

### Resposta

```text
201 Created
```

Exemplo:

```json
{
  "id": "uuid-gerado",
  "nome": "Administrador Teste",
  "email": "admin@medclinic.com",
  "role": "Administrador",
  "createdAt": "2026-09-11T..."
}
```

A senha não deve aparecer na resposta.

---

# 🔑 19.2 Login

```http
POST /auth/login
```

### Requisição

```json
{
  "email": "admin@medclinic.com",
  "senha": "Admin123"
}
```

### Resposta

```text
200 OK
```

Exemplo:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid-do-usuario",
    "nome": "Administrador Teste",
    "email": "admin@medclinic.com",
    "role": "Administrador",
    "createdAt": "2026-09-11T..."
  }
}
```

---

# 👤 19.3 Usuário autenticado

```http
GET /users/me
```

É necessário enviar o JWT.

Header:

```http
Authorization: Bearer SEU_TOKEN
```

Resposta:

```text
200 OK
```

Exemplo:

```json
{
  "id": "uuid-do-usuario",
  "nome": "Administrador Teste",
  "email": "admin@medclinic.com",
  "role": "Administrador",
  "createdAt": "2026-09-11T..."
}
```

---

# 👑 19.4 Endpoint administrativo

```http
GET /admin/ping
```

Requer:

```text
Autenticação + perfil Administrador
```

Header:

```http
Authorization: Bearer SEU_TOKEN
```

Resposta:

```text
200 OK
```

Exemplo:

```json
{
  "message": "Ping do Administrador bem-sucedido!"
}
```

---

# ❌ 20. Tratamento de erros

A aplicação possui tratamento centralizado de erros através do middleware:

```text
errorMiddleware
```

Formato padrão:

```json
{
  "status": "error",
  "message": "Mensagem do erro."
}
```

## Principais códigos HTTP

| Código | Significado            |
| ------ | ---------------------- |
| `400`  | Dados inválidos        |
| `401`  | Não autenticado        |
| `403`  | Sem permissão          |
| `404`  | Recurso não encontrado |
| `409`  | Conflito               |
| `500`  | Erro interno           |

---

# ⚠️ 21. Exemplos de erros

## Sem token

```http
GET /users/me
```

Resultado esperado:

```text
401 Unauthorized
```

## Token inválido

```http
Authorization: Bearer token-invalido
```

Resultado:

```text
401 Unauthorized
```

## Token expirado

Resultado:

```text
401 Unauthorized
```

## Atendente acessando área administrativa

```http
GET /admin/ping
```

Resultado:

```text
403 Forbidden
```

## E-mail duplicado

```http
POST /auth/register
```

Resultado:

```text
409 Conflict
```

## Dados inválidos

Resultado:

```text
400 Bad Request
```

---

# ✅ 22. Validação com Zod

Os dados recebidos pela API são validados utilizando **Zod**.

No cadastro são verificadas regras como:

- nome obrigatório;
- nome com tamanho mínimo;
- e-mail válido;
- senha obrigatória;
- senha com tamanho mínimo;
- senha contendo letra;
- senha contendo número;
- perfil válido.

Exemplo inválido:

```json
{
  "nome": "AB",
  "email": "email-invalido",
  "senha": "123"
}
```

Resultado esperado:

```text
400 Bad Request
```

---

# 🧪 23. Testes utilizando VS Code

O projeto possui o arquivo:

```text
api.rest
```

Ele contém exemplos de requisições para testar a API.

Exemplos:

```text
POST /auth/register
POST /auth/login
GET /users/me
GET /admin/ping
```

Também existem testes negativos para:

```text
Token ausente
Token inválido
Acesso sem permissão
E-mail duplicado
Senha inválida
Credenciais inválidas
```

Após realizar o login, copie o JWT retornado e coloque na variável:

```http
@token = COLE_AQUI_O_TOKEN_GERADO_NO_LOGIN
```

Depois execute as requisições protegidas.

> Nunca coloque um JWT real no GitHub.

---

# 🔒 24. Segurança

As principais medidas de segurança implementadas são:

- senhas protegidas por `bcryptjs`;
- autenticação por JWT;
- JWT com tempo de expiração;
- segredo JWT armazenado em variável de ambiente;
- credenciais do PostgreSQL armazenadas em `.env`;
- `.env` ignorado pelo Git;
- senha não retornada nas respostas;
- autorização baseada em perfil;
- validação dos dados recebidos.

### Nunca versionar

```text
.env
JWT_SECRET real
senha do PostgreSQL
tokens JWT reais
credenciais pessoais
```

---

# 🌿 25. Git e GitHub

O projeto possui um repositório público no GitHub para avaliação.

Estrutura de branches:

```text
main
develop
feat/setup-projeto
feat/auth
feat/rbac
docs/readme
```

# 🚀 26. Próximas etapas

A estrutura criada nesta etapa servirá como base para os próximos módulos do MedClinic.

Entre as possíveis evoluções estão:

```text
Especialidades
Médicos
Pacientes
Consultas
Agendamentos
Relatórios
```

Esses módulos deverão utilizar a estrutura de autenticação e autorização implementada nesta etapa.

---

# 📚 27. Conclusão

A **MedClinic API — Etapa 1** estabelece uma base organizada para o desenvolvimento do sistema, contemplando:

```text
Node.js
   +
Express
   +
TypeScript
   +
PostgreSQL
   +
TypeORM
   +
bcrypt
   +
JWT
   +
RBAC
   +
Zod
   +
Arquitetura em camadas
```

A aplicação permite cadastrar usuários, autenticar por login, gerar tokens JWT, proteger endpoints e controlar o acesso de acordo com o perfil do usuário.

---

# 🎓 28. Informações acadêmicas

**Projeto:** MedClinic API

**Etapa:** 1 — Autenticação e Autorização

**Tecnologias principais:** Node.js, Express.js, TypeScript, TypeORM e PostgreSQL.

**Finalidade:** Projeto acadêmico para aplicação prática dos conceitos de desenvolvimento de aplicações web profissionais, autenticação, autorização, banco de dados, arquitetura em camadas e boas práticas de desenvolvimento.
