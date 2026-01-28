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

***adapters:*** **Porta de entrada do sistema;**

***application:*** **Regras de negócio, os casos de uso;**

***domain:*** **Entidades e Interfaces, definindo contratos do sistema;**

***infra:*** **Implementação das interfaces, inclui repositórios Prisma (persistência real), repositórios InMemory (para testes) e o container (Inversify), responsável por ligar as interfaces às implementações concretas.**

## Preparação do Ambiente
***Após, clonar o repo, no terminal do próprio vs code rode esses comandos, para preparar o ambiente.***
```
  npm init -y
  npm install typescript ts-node --save-dev
```

***OBS:*** **Não é necessário usar esse comando, porque no repo já tem o tsconfig.json**
```
  npx tsc --init
```

## Prisma
```
  npm install prisma --save-dev
  npx prisma init
  npm install @prisma/client
```

```
  npx prisma migrate dev --name init
  npx prisma generate
```

## Vitest
```
  npm install -D @types/node
  npm i -D vitest
```

## Inversify
```
  npm install inversify reflect-metadata
  npm install -D tsx
```
