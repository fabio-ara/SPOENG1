# Histórico de Implementação

## Objetivo

Registrar, de forma resumida e incremental, como o Sprint Master evoluiu até o estado atual do MVP.

## Etapa 1 — Estrutura inicial

- Criação da pasta `sprint-master`.
- Inclusão dos arquivos base em HTML, CSS, JavaScript e documentação Scrum.
- Definição do escopo inicial como MVP local, sem backend.

## Etapa 2 — Cadastro inicial de projetos

- Inclusão do formulário de projeto.
- Listagem dos projetos criados.
- Persistência local inicial com `localStorage`.
- Inserção do logotipo do IFSP no projeto.

## Etapa 3 — Interface compacta

- Redução do layout para uma coluna principal.
- Simplificação visual para um estilo mais limpo e mais discreto.
- Revisão de espaçamento, bordas e hierarquia dos componentes.

## Etapa 4 — Atividades e progresso

- Inclusão de atividades dentro de cada projeto.
- Definição de status por atividade.
- Cálculo do progresso por projeto.
- Criação do resumo geral da sprint no topo da tela.

## Etapa 5 — Gestão de responsáveis

- Separação dos responsáveis em uma lista persistida.
- Inclusão de nomes iniciais para uso imediato.
- Bloqueio de exclusão quando um responsável já está vinculado a atividade.

## Etapa 6 — Edição de projetos

- Inclusão do fluxo de edição de nome, descrição e prazo.
- Ajuste do formulário para alternar entre criação e edição.
- Reforço visual do estado de edição.

## Etapa 7 — Overlays

- Remoção dos formulários principais da tela inicial.
- Criação de overlays específicos para responsáveis e projetos.
- Organização da tela principal para priorizar apenas resumo e projetos.

## Etapa 8 — JSON compacto

- Unificação da persistência em uma única chave de `localStorage`.
- Adoção da estrutura compacta com `resp`, `proj` e `ats`.
- Inclusão de importação, exportação e cópia de JSON por escopo.
- Migração automática do formato legado para o formato atual.

## Estado atual

- O sistema atende ao fluxo central de cadastro, acompanhamento e persistência local.
- A documentação foi ajustada para refletir o MVP entregue.
- O histórico Git foi reorganizado em commits menores e branches temáticas para apresentação.
