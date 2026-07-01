# McDonald's

Aplicação web moderna para explorar um cardápio de restaurante, montar uma sacola de pedidos e consultar o histórico de pedidos por CPF. O projeto foi construído com Next.js 15, React 19, TypeScript, Prisma e PostgreSQL, com foco em performance, experiência de uso e organização de código.

## Visão geral

Este projeto simula uma experiência de pedidos para um restaurante em formato de aplicação web mobile-first. O fluxo principal é:

1. o usuário acessa o menu do restaurante por um slug;
2. escolhe o método de consumo;
3. navega pelos produtos e adiciona itens à sacola;
4. cria um pedido via ação de servidor;
5. consulta os pedidos associados ao CPF informado.

A arquitetura foi organizada para separar claramente responsabilidades entre renderização no servidor, interação no cliente e camada de dados.

## Funcionalidades

- Catálogo de produtos organizado por categorias;
- Navegação por restaurante com rota dinâmica baseada em slug;
- Seleção de método de consumo: entrega/consumo no local;
- Sacola de compras com controle de quantidade e cálculo de total;
- Página de detalhes do produto com descrição, ingredientes e ação de adicionar à sacola;
- Criação de pedido persistida no banco de dados;
- Consulta de pedidos pelo CPF;
- Seed inicial com restaurante, categorias, produtos e dados de exemplo.

## Stack tecnológica

- Next.js 15 com App Router;
- React 19;
- TypeScript;
- Tailwind CSS;
- shadcn/ui e Radix UI;
- Prisma ORM;
- PostgreSQL;
- Zod + React Hook Form;
- Sonner para feedbacks visuais;
- react-number-format para formatação de CPF e valores.

## Arquitetura

A aplicação utiliza uma arquitetura híbrida composta por:

- Server Components para leitura e renderização inicial de dados;
- Client Components para interações como carrinho, formulário e navegação local;
- Server Actions para persistir pedidos de forma segura;
- Prisma como camada de acesso a dados;
- PostgreSQL como banco relacional para restaurantes, categorias, produtos e pedidos.

O fluxo de dados segue uma abordagem simples e previsível:

- a página de menu busca o restaurante e seus produtos no banco;
- o carrinho é mantido em contexto React no lado do cliente;
- a criação do pedido acontece em uma action de servidor e grava as relações entre pedido e produtos.

## Estrutura de pastas

```text
src/
  app/
    [slug]/
      menu/
        actions/
        components/
        contexts/
        helpers/
        [productId]/
          components/
      orders/
        components/
    components/
      ui/
    data/
    helpers/
    lib/
prisma/
  migrations/
  schema.prisma
  seed.ts
```

## Pré-requisitos

Antes de rodar o projeto localmente, certifique-se de ter instalado:

- Node.js 20.x ou superior;
- npm, pnpm ou bun;
- Um banco PostgreSQL em execução.

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/FelipeFernandes7/mc-donalds.git
cd mc-donalds
npm install
```

## Configuração das variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com a variável abaixo:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
```

Exemplo com PostgreSQL local:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mcdonalds"
```

## Execução local

Gere o cliente Prisma e aplique as migrações:

```bash
npx prisma generate
npx prisma migrate dev
```

Se quiser popular o banco com dados de exemplo, execute:

```bash
npx prisma db seed
```

Em seguida, inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

## Scripts disponíveis

```bash
npm run dev      # inicia o servidor de desenvolvimento
npm run build    # gera a build de produção
npm run start    # executa a aplicação em modo produção
npm run lint     # valida o código com o linter do Next.js
```

## Fluxo da aplicação

### 1. Acesso ao restaurante

O sistema usa rotas dinâmicas com base no slug do restaurante, por exemplo:

```text
/[slug]/menu?consumptionMethod=DINE_IN
```

### 2. Navegação do cardápio

A página de menu carrega o restaurante e as categorias com seus produtos a partir do banco.

### 3. Adição de itens à sacola

Ao abrir um produto, o usuário pode ajustar a quantidade e adicionar o item ao carrinho. O estado da sacola é controlado por um contexto React.

### 4. Criação do pedido

Ao finalizar a compra, uma Server Action cria o pedido e os itens associados no banco, com preço, quantidade e método de consumo.

### 5. Consulta de pedidos

A rota de pedidos permite localizar pedidos a partir do CPF do cliente, exibindo detalhes do restaurante, itens e status.

## Modelo de dados

O esquema Prisma define as entidades principais:

- Restaurant
- MenuCategory
- Product
- Order
- OrderProduct

Os relacionamentos garantem que produtos, categorias e pedidos estejam vinculados a um restaurante específico.

## Decisões técnicas

- O projeto prioriza um fluxo simples e direto para demonstração e estudos de arquitetura, sem introduzir complexidade desnecessária;
- o uso de Server Components reduz o carregamento de dados desnecessário no cliente;
- o carrinho é mantido localmente em contexto para oferecer uma experiência fluida sem depender de armazenamento persistido;
- a validação de formulários é feita com Zod e react-hook-form para garantir consistência de dados;
- a criação de pedidos é feita por uma action de servidor para manter a lógica de negócio próxima ao ponto de escrita no banco.

## Padrões de código

- TypeScript como base principal para segurança de tipos;
- componentes pequenos e reutilizáveis;
- separação entre camada de UI, dados e utilidades;
- uso de pastas por contexto e responsabilidade;
- nomes de funções e componentes claros e expressivos.

## Boas práticas adotadas

- Uso de componentes do lado do cliente apenas quando há necessidade de interatividade;
- Validação explícita de entradas do usuário;
- Organização de dados e helpers em módulos específicos;
- Estrutura preparada para evolução com novas funcionalidades;
- Dependências de UI padronizadas com shadcn/ui.

## Deploy

A recomendação para produção é utilizar uma plataforma como Vercel com banco PostgreSQL gerenciado, como Neon, Supabase ou Railway.

Antes do deploy, configure a variável de ambiente `DATABASE_URL` e execute as migrações no ambiente alvo:

```bash
npx prisma generate
npx prisma migrate deploy
```

## Melhorias futuras

Algumas melhorias que podem fortalecer o projeto no futuro:

- autenticação e autorização para painel administrativo;
- persistência do carrinho em armazenamento local ou backend;
- atualização de status de pedidos em tempo real;
- testes unitários e de integração;
- paginação e filtros para pedidos;
- internacionalização e suporte a múltiplos idiomas;
- cobertura de erro e observabilidade mais robusta.

## Contribuição

Contribuições são bem-vindas. Para participar:

```bash
git checkout -b feature/minha-contribuicao
git commit -m "feat: adiciona nova funcionalidade"
git push origin feature/minha-contribuicao
```

Depois, abra um Pull Request descrevendo claramente a mudança proposta.

Antes de enviar alterações, é recomendável validar o projeto com:

```bash
npm run lint
```

## Resumo executivo

Este projeto demonstra uma aplicação web full-stack moderna, com foco em experiência de usuário, estrutura limpa e uso de tecnologias consolidadas no ecossistema React/Next.js. A combinação entre App Router, Prisma, PostgreSQL e componentes reutilizáveis resulta em uma base sólida para evoluir para um produto mais completo e escalável.
