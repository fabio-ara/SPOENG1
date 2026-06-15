# Sprint Backlog

## Objetivo da sprint

Desenvolver um MVP web chamado Sprint Master para cadastro de projetos de pesquisa, atividades e acompanhamento de progresso.

## Período

Sprint condensada entre 17/06/2026 e 20/06/2026.

## Observação sobre o calendário

A atividade foi proposta como uma sprint de sete dias. Por restrições reais de calendário da equipe, a execução foi condensada em quatro dias, mantendo os rituais principais: Planning, Dailies, Review e Retrospective.

## Papéis

- Product Owner: Fabio Ara
- Scrum Master: Lucas Toffetti Toffetti
- Dev Lead: Fabio Ara
- QA: Lucas Toffetti Toffetti
- Integrante nominal: Osvaldo Matteos Matteos

## Definição de pronto

- O sistema abre pelo `index.html`.
- É possível cadastrar projetos.
- É possível adicionar atividades.
- É possível alterar status das atividades.
- O progresso por projeto é exibido.
- O README explica como executar.
- Os rituais Scrum estão documentados.
- Há checklist de testes.
- O código está no GitHub.

## Histórias

### História 1 — Cadastro de projeto

Como chefe do grupo de pesquisa, quero cadastrar um projeto com nome, descrição e prazo.

Tarefas:

- Criar formulário de projeto.
- Validar campos obrigatórios.
- Salvar projeto no localStorage.
- Listar projetos cadastrados.

Estimativa: M  
Responsável: Fabio Ara  
Status: A fazer

### História 2 — Atividades do projeto

Como chefe, quero adicionar atividades com título, responsável e status.

Tarefas:

- Criar formulário de atividade.
- Associar atividade a um projeto.
- Permitir status: a fazer, andando e concluído.
- Exibir atividades dentro do projeto.

Estimativa: M  
Responsável: Fabio Ara  
Status: A fazer

### História 3 — Acompanhamento

Como chefe, quero visualizar o andamento de cada projeto.

Tarefas:

- Contar atividades totais.
- Contar atividades concluídas.
- Calcular percentual de conclusão.
- Exibir progresso por projeto.
- Criar dashboard geral simples.

Estimativa: M  
Responsável: Fabio Ara  
Status: A fazer

### História 4 — Documentação Scrum

Como equipe, queremos documentar o processo da sprint.

Tarefas:

- Registrar Planning.
- Registrar Dailies.
- Registrar Review.
- Registrar Retrospective.
- Atualizar README.

Estimativa: S  
Responsável: Lucas Toffetti  
Status: A fazer

### História 5 — Testes

Como equipe, queremos verificar se o MVP funciona antes da entrega.

Tarefas:

- Testar cadastro de projeto.
- Testar cadastro de atividade.
- Testar alteração de status.
- Testar cálculo de porcentagem.
- Testar persistência após recarregar a página.

Estimativa: S  
Responsável: Lucas Toffetti  
Status: A fazer
