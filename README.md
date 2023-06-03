# Back-end CRUD de Usuários (Clientes) e Contatos

Para inciar este projeto, é necessário instalar as dependências que serão utilizadas. Portanto utilize o comando abaixo para instalar tais dependências:

```bash
yarn
```

## Execução

1. Primeiro verifique a sua instalação do PostgreSQL. Crie um **database** e configure-o no arquivo **.env**

2. Os scripts de execução estão no **package.json**. Para rodar as migrações e o servidor siga os comandos abaixo:

```bash
# criando migrações
yarn generate

# persistindo migrações no PostgreSQL
yarn migrate

# rodando servidor
yarn dev
```

## EndPoints de serviço

#### `localhost:8080/login`
```
POST: Rota para fazer Login, retorna token de acesso.
```

#### `localhost:8080/users`
```
POST: Rota para criar novo usuário, retorna dados do usuário criado.
GET: Rota para listar todos os usuários, apenas usuários administradores tem acesso.
```

#### `localhost:8080/users/:id`
```
GET: Rota para listar usuários específicos, retorna dados do usuário procurado, apenas Admin ou o próprio usuário tem acesso.
PATCH: Rota para atualizar dados de um usuário, apenas usuários administradores ou o próprio usuário tem acesso.
DELETE: Rota para deletar um usuário, apenas usuários administradores ou o próprio usuário tem acesso.
```

#### `localhost:8080/users/:id/contacts`
```
GET: Rota para listar os contatos de um usuário específico, apenas Admin ou o próprio usuário tem acesso.
```

#### `localhost:8080/contacts`
```
POST: Rota para criar novo contato vinculado ao usuário logado, retorna dados do contato criado.
GET: Rota para listar todos os contatos da aplicação, com os respectivos usuários, apenas usuários administradores tem acesso.
```

#### `localhost:8080/contacts/:id`
```
GET: Rota para listar um contato específico, retorna dados do contato procurado, apenas Admin ou o próprio usuário tem acesso.
PATCH: Rota para atualizar dados de um contato, apenas usuários administradores ou o próprio usuário tem acesso.
DELETE: Rota para deletar um contato, apenas usuários administradores ou o próprio usuário tem acesso.
```

### Agora que já sabe como iniciar o projeto, é hora de inicializar o front-end.
