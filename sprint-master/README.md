# Sprint Master

Sistema de Gestão de Projetos de Pesquisa.

## Integrantes

- Fabio Ara
- Lucas Toffetti
- Osvaldo Matteos

## Como executar

Abra o arquivo `index.html` no navegador.

## Tecnologias

- HTML
- CSS
- JavaScript
- localStorage

## Funcionalidades atuais

- Cadastro, edição e exclusão de projetos em painel próprio.
- Cadastro e exclusão de responsáveis em painel próprio com persistência local.
- Cadastro e exclusão de atividades por projeto.
- Definição de responsável por atividade.
- Alteração de status: `A fazer`, `Em andamento` e `Concluído`.
- Cálculo de progresso por projeto e visão geral da sprint.
- Persistência local com `localStorage` em JSON compacto.
- Importação e exportação de JSON por escopo: tudo, projetos ou responsáveis.

## Estrutura JSON

O aplicativo salva os dados em uma estrutura compacta:

```json
{
  "resp": ["Fabio Ara", "Lucas Toffetti"],
  "proj": [
    {
      "id": "item-1",
      "nome": "Sprint Master",
      "desc": "Sistema de gestão.",
      "prazo": "2026-06-15",
      "criado": "2026-06-15T12:00:00.000Z",
      "ats": [
        {
          "id": "item-2",
          "tit": "Revisar backlog",
          "resp": "Fabio Ara",
          "st": "em andamento"
        }
      ]
    }
  ]
}
```

## Documentação Scrum

- [Sprint Backlog](./SPRINT_BACKLOG.md)
- [Daily Logs](./DAILY_LOGS.md)
- [Review](./REVIEW.md)
- [Retrospective](./RETROSPECTIVE.md)
- [Testes](./TESTES.md)
