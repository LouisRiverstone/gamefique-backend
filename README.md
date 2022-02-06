# Gamefique Back-End

Gamefique foi pensado como uma plataforma online colaborativa que auxiliasse os docentes da área de matemática que estejam aptos a dar lecionar na segunda etapa do ensino fundamental visando a interdisciplinaridade da disciplina de matemática com desenvolvimento de jogos digitais e gamificação.

Este é um prototipo para ser usado no meu TCC que esta disponivel [Aqui](https://nodejs.org/en/)! indico ler para entender todo o contexto que cerca esta plataforma.

## Instalação

Use o modulo npm que vem na instalação do [NodeJS](https://nodejs.org/en/) para rodar o projeto.

```bash
npm install
```

## Uso

Crie o arquivo .env baseando-se no arquivo .env.example. Após isso, faça as migrações para inserir as tabelas no banco com o seguinte comando:

```bash
node ace migration:run
```

e depois popule as tabelas frias com o seguinte comando:


```bash
node ace db:seed
```

e para executar a api em modo de desenvolvimento, use esse comando:

```bash
node ace serve --watch
```

## Complilando

Para compilar o backend para um server javascript utilize:


```bash
node ace build
```


## Contribuição
Pull-request são bem-vindos. Para grandes mudanças, abra um problema primeiro para discutir o que você gostaria de mudar.

## Licença
[MIT](https://choosealicense.com/licenses/mit/)
