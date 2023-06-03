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

### Agora que já sabe como iniciar o projeto, é hora de inicializar o front-end.
