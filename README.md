# Trabalho Final
***Dupla:*** Alicia e Sthephani

***Disciplina:*** Arquitetura de Software

## Sobre
***Esse é o trabalho final, no qual usamos vários conceitos já aprendidos em aula e em outros projetos de atividades dessa mesma disciplina.***

***O sistema foi desenvolvido com o objetivo de simular a criação de aluguéis de veículos, aplicando regras de negócio e boas práticas de arquitetura de software, como separação em camadas, uso de casos de uso e injeção de dependências.***

Fluxo das Camadas
---
***CLI (adapters) → UseCase (application) → interfaces (domain) → repos Prisma (infra) → DB (SQLite)***

---

***`adapters`:*** **Porta de entrada do sistema;**

***`application`:*** **Regras de negócio, os casos de uso;**

***`domain`:*** **Entidades e Interfaces, definindo contratos do sistema;**

***`infra`:*** **Implementação das interfaces, inclui repositórios Prisma (persistência real), repositórios InMemory (para testes) e o container (Inversify), responsável por ligar as interfaces às implementações concretas.**

## Preparação do Ambiente
***Após, clonar o repo, no terminal do próprio vs code rode esse comando, para preparar o ambiente.***

```
  npm install
```

***O projeto utiliza TypeScript, Prisma, Vitest e Inversify. As dependências já estão declaradas no `package.json`, não sendo necessário instalá-las individualmente.***


## Execução
***Comandos:***

```
  npm run prisma:migrate  // prepara o banco de dados
  npm run prisma:generate  // gerar prisma client
  npm run dev  // roda o sistema
```

## Tecnologias Utilizadas
### Prisma
***A persistência de dados foi implementada com Prisma, permitindo isolar o acesso ao banco de dados na camada de infraestrutura.***

```
  npm install prisma --save-dev
  npx prisma init
  npm install @prisma/client
  npx prisma migrate dev --name init
  npx prisma generate
```

### Vitest
***Os testes unitários utilizam repositórios em memória, garantindo que as regras de negócio sejam testadas de forma isolada.***

```
  npm install -D @types/node
  npm i -D vitest
```

### Inversify
***A injeção de dependências é realizada com Inversify, evitando o acoplamento direto entre casos de uso e implementações concretas***

```
  npm install inversify reflect-metadata
  npm install -D tsx
```
