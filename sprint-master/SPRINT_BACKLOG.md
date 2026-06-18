# Sprint Backlog

## Objetivo da sprint

Desenvolver um MVP web chamado Sprint Master para cadastro e acompanhamento de projetos de pesquisa, com persistência local e documentação da sprint.

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
- É possível cadastrar, editar e excluir projetos.
- É possível adicionar e excluir atividades.
- É possível alterar o status das atividades.
- O progresso por projeto e o progresso geral são exibidos.
- É possível gerenciar responsáveis em painel próprio.
- É possível subir e baixar os dados em JSON.
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
Status: Concluída

### História 2 — Atividades do projeto

Como chefe, quero adicionar atividades com título, responsável e status.

Tarefas:

- Criar formulário de atividade.
- Associar atividade a um projeto.
- Permitir status: A fazer, Em andamento e Concluído.
- Exibir atividades dentro do projeto.

Estimativa: M  
Responsável: Fabio Ara  
Status: Concluída

### História 3 — Acompanhamento

Como chefe, quero visualizar o andamento de cada projeto e da sprint.

Tarefas:

- Contar atividades totais.
- Contar atividades concluídas.
- Calcular percentual de conclusão.
- Exibir progresso por projeto.
- Criar dashboard geral simples.

Estimativa: M  
Responsável: Fabio Ara  
Status: Concluída

### História 4 — Gestão de responsáveis

Como equipe, queremos manter uma lista simples de responsáveis reutilizáveis nas atividades.

Tarefas:

- Criar painel próprio de responsáveis.
- Persistir a lista no navegador.
- Bloquear exclusão de responsável em uso.
- Reutilizar os responsáveis no formulário de atividades.

Estimativa: S  
Responsável: Fabio Ara  
Status: Concluída

### História 5 — Documentação Scrum

Como equipe, queremos documentar o processo da sprint.

Tarefas:

- Registrar Planning.
- Registrar Dailies.
- Registrar Review.
- Registrar Retrospective.
- Atualizar README.
- Registrar o histórico de implementação.

Estimativa: S  
Responsável: Lucas Toffetti  
Status: Concluída
### História 6 — Testes

Como equipe, queremos verificar se o MVP funciona antes da entrega.

Tarefas:

- Testar cadastro de projeto.
- Testar cadastro de atividade.
- Testar alteração de status.
- Testar cálculo de porcentagem.
- Testar persistência após recarregar a página.
- Testar subida e download de JSON.

Estimativa: S  
Responsável: Lucas Toffetti  
Status: Concluída

### História 7 — Persistência em JSON

Como equipe, queremos um formato compacto de dados para facilitar reaproveitamento e inspeção local.

Tarefas:

- Unificar a persistência em uma chave principal.
- Definir estrutura compacta para projetos, responsáveis e atividades.
- Permitir download por escopo.
- Permitir subida com migração do formato anterior.

Estimativa: M  
Responsável: Fabio Ara  
Status: Concluída
