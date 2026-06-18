# Sprint Review

## Data

20/06/2026

## Participantes

- Fabio Ara
- Lucas Toffetti

## Integrante nominal

- Osvaldo Matteos

## Objetivo da sprint

Entregar um MVP web para cadastro de projetos de pesquisa, atividades e acompanhamento de progresso.

## Funcionalidades demonstradas

- Cadastro de projetos.
- Listagem de projetos.
- Edição e exclusão de projetos.
- Cadastro e exclusão de responsáveis.
- Cadastro de atividades por projeto.
- Exclusão de atividades.
- Alteração de status das atividades.
- Cálculo de porcentagem concluída.
- Dashboard simples.
- Subida e download de JSON.

## Histórias avaliadas

### História 1 — Cadastro de projeto

Status: aceita.

Justificativa: o sistema permite cadastrar projeto com nome, descrição e prazo.

### História 2 — Atividades

Status: aceita.

Justificativa: o sistema permite adicionar atividades com título, responsável e status.

### História 3 — Dashboard

Status: aceita com simplificação.

Justificativa: o sistema mostra porcentagem concluída por projeto e resumo geral, sem gráficos avançados.

### História 4 — Gestão de responsáveis

Status: aceita.

Justificativa: o sistema possui painel próprio de responsáveis, persistência local e bloqueio de exclusão quando há vínculo com atividades.

### História 5 — Documentação Scrum

Status: aceita.

Justificativa: os artefatos de Planning, Dailies, Review, Retrospective, README e histórico foram consolidados no repositório.

### História 6 — Testes

Status: aceita.

Justificativa: o checklist manual foi executado pelo Lucas e cobriu o fluxo principal; após os ajustes finais no painel JSON, parte dos cenários específicos de JSON foram testadas novamente e aprovadas sem ressalva.

### História 7 — Persistência em JSON

Status: aceita.

Justificativa: o sistema baixa, sobe e reaproveita os dados em um formato compacto único.

## O que não foi feito

- Login.
- Backend.
- Banco de dados real.
- Controle de permissões.
- Edição avançada de atividades.
- Deploy.
- Compartilhamento em tempo real.

## Feedback

O MVP atende ao fluxo principal e ficou mais organizado com os overlays e o painel JSON. Em uma próxima sprint, poderia evoluir com edição de atividades, confirmação explícita de exclusão, filtros por projeto e sincronização com backend.
