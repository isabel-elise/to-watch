# To-Watch (nome a definir)

Um pequeno sistema para gerenciamento de listas de filmes / séries a assistir apoiado por dados do [IMDb](https://www.imdb.com/).

## Membros do grupo

- Isabel Elise Silva Duque
- Lucas Rios Bicalho (teste commit)

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

## Tecnologias empregadas

### Interface

A interface da aplicação foi implementada em Typescript utilizando o framework [React](https://react.dev/) com o apoio do [Vite](https://vite.dev/).
Também foi aplicada a ferramenta [StoryBook](https://storybook.js.org/) para a construção de componentes de forma isolada.

### Dados do IMDb

Os dados do IMDb são obtidos através da biblioteca [Cinemagoer](https://cinemagoer.github.io/),
um pacote Python para recuperação e gerenciamento de dados do banco de dados do IMDb sobre filmes, séries e pessoas.

### Gerenciamento da lista ordenada

...
