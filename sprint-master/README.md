# Sprint Master

Sistema de Gestão de Projetos de Pesquisa.

## Visão geral

O Sprint Master é um MVP web para organizar projetos de pesquisa em uma interface única, compacta e executada localmente no navegador. O foco do sistema é permitir cadastro de projetos, responsáveis e atividades, além de acompanhar o progresso sem depender de backend.

## Integrantes

- Fabio Ara
- Lucas Toffetti
- Osvaldo Mateos

## Como executar

Abra o arquivo `index.html` no navegador.

## Acesso publicado

- GitHub Pages: <https://fabio-ara.github.io/SPOENG1/>

## Fluxo de uso

1. Abrir o painel de responsáveis no topo e conferir a lista inicial.
2. Abrir o painel de projeto para cadastrar ou editar um projeto.
3. Usar a área principal para visualizar os cards dos projetos.
4. Adicionar atividades diretamente dentro de cada card.
5. Alterar o status das atividades para atualizar o progresso.
6. Usar o painel de backup e substituição JSON para baixar, subir ou copiar os dados.
   Ao clicar em `Subir`, o sistema abre o seletor de arquivo, substitui o escopo selecionado pelo `.json` escolhido e fecha o painel após aplicar os dados.

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
- Backup e substituição JSON por escopo: tudo, projetos ou responsáveis.

## Estrutura de telas

- Tela principal: resumo da sprint e lista de projetos.
- Overlay de responsáveis: cadastro, listagem e exclusão com bloqueio de uso.
- Overlay de projeto: criação e edição de nome, descrição e prazo.
- Overlay de backup e substituição JSON: baixar, subir por seletor de arquivo e copiar o estado salvo.
  A subida bem-sucedida atualiza imediatamente a interface principal e substitui o escopo selecionado.

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

## Arquivos principais

- `index.html`: estrutura das telas, overlays e template dos cards.
- `style.css`: identidade visual, responsividade e alinhamento dos componentes.
- `script.js`: persistência, renderização, CRUD e fluxo dos overlays.
- `HISTORICO_IMPLEMENTACAO.md`: resumo incremental do que foi construído.
- `TESTES.md`: checklist manual para validação do MVP.

## Orientação para o Lucas Toffetti

- Revisar o fluxo completo descrito acima antes de mexer nos artefatos.
- Executar o checklist de `TESTES.md` e registrar ambiente, data e resultados.
- Validar se `SPRINT_BACKLOG.md`, `REVIEW.md` e `RETROSPECTIVE.md` continuam coerentes com o sistema atual.
- Registrar qualquer divergência encontrada primeiro na documentação, antes de propor novas funcionalidades.
- Usar o projeto inicial em seed como roteiro meta das tarefas já implantadas e do que ainda precisa validar.

## Documentação Scrum

- [Sprint Backlog](./SPRINT_BACKLOG.md)
- [Daily Logs](./DAILY_LOGS.md)
- [Histórico de Implementação](./HISTORICO_IMPLEMENTACAO.md)
- [Review](./REVIEW.md)
- [Retrospective](./RETROSPECTIVE.md)
- [Testes](./TESTES.md)
