# To-Watch

Um pequeno sistema para gerenciamento de listas de filmes / séries a assistir apoiado por dados do [IMDb](https://www.imdb.com/).

![screenshot](https://github.com/user-attachments/assets/c909f9d8-bc17-45bd-9b81-2e670049421b)

## Membros do grupo

- Isabel Elise Silva Duque
- Lucas Rios Bicalho

## Funcionalidades

### Visualização simplificada

Tenha um panorama geral das produções adicionadas e da ordem atual a partir de uma lista exibindo apenas os títulos e as notas no IMDb de cada item.

### Visualização de filmes / séries em cartões

Confira informações básicas de cada produção adionada à lista como título, ano, tipo e imagem de capa e nota no IMDb.

### Busca e inclusão de nova entrada

Selecione uma nova entrada para a lista a partir de busca realizada com informações do IMDb.
Encontre a produção desejada e adicone-a à lista atual para acompanhamento.

### Mudança de ordenação

Altere a ordem da lista atual como desejar a partir de diferentes opções para a mudança de posição de cada item:
subir uma posição, descer uma posição, ir para o início, ir para o final.

### Remoção de entradas e listas

Remova filmes adicionados a uma lista e exclua listas criadas anteriormente.

## Tecnologias empregadas

### Interface

A interface da aplicação foi implementada em Typescript utilizando o framework [React](https://react.dev/) com o apoio do [Vite](https://vite.dev/).
Também foi aplicada a ferramenta [StoryBook](https://storybook.js.org/) para a construção de componentes de forma isolada.

### Testes do Frontend

Testes de sistema foram realizados utilizando o [Selenium](https://www.selenium.dev/), um conjunto de ferramentas para automatização de navegadores web, com apoio do framework [Mocha](https://mochajs.org/), uma biblioteca JavaScript com execução serial de testes.

### Dados do IMDb

Os dados do IMDb são obtidos através da biblioteca [Cinemagoer](https://cinemagoer.github.io/),
um pacote Python para recuperação e gerenciamento de dados do banco de dados do IMDb sobre filmes, séries e pessoas.

### Testes do Backend

Os testes foram feitos através das bibliotecas [pytest](https://pypi.org/project/pytest/) e [coverage](https://pypi.org/project/coverage/), e são executados no Ubuntu, MacOS e Windows, pelo Github Actions.

Além disso, a cobertura também é testada através do [Codecov](https://app.codecov.io/).

### Sistema de banco de dados de listas e filmes

Sistema de banco de dados é usado através de uma classe de interface.
A implementação dessa interface foi feita através de [SQLAlchemy](https://www.sqlalchemy.org/), utilizando-se da engine de [SQLite](https://www.sqlite.org/) para gerar um banco de dados local na execução usual e a engine de memória para gerar um banco de dados temporário para fins de testes de unidade.
