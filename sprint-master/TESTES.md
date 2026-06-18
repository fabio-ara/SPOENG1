# Testes manuais

## Ambiente

- Navegador:
- Sistema operacional:
- Data:
- Responsável pela execução:

## Orientação

Preencha o campo `Status` com `OK`, `Falhou` ou `Não executado`. Se houver problema, registre ao lado uma observação curta antes de alterar qualquer arquivo do projeto.

## Checklist

| Caso | Procedimento | Resultado esperado | Status |
|---|---|---|---|
| Cadastrar responsável | Adicionar um nome na área de responsáveis | Responsável aparece na lista | OK |
| Abrir painel de responsáveis | Clicar no botão de responsáveis no topo | Painel de responsáveis abre | OK |
| Excluir responsável sem uso | Remover um responsável sem atividade vinculada | Responsável sai da lista | OK |
| Bloquear exclusão em uso | Tentar remover responsável já usado em atividade | Sistema impede a exclusão | OK |
| Cadastrar projeto | Preencher nome, descrição e prazo | Projeto aparece na lista | OK |
| Abrir painel de projeto | Clicar no botão de novo projeto no topo | Painel de projeto abre | OK |
| Editar projeto | Alterar nome, descrição ou prazo de um projeto | Dados atualizados aparecem no card | OK |
| Excluir projeto | Clicar no botão de exclusão do projeto | Projeto sai da lista | OK |
| Persistir projeto | Recarregar a página | Projeto continua aparecendo | OK |
| Cadastrar atividade | Adicionar atividade em um projeto | Atividade aparece no projeto | OK |
| Alterar status | Mudar status de uma atividade | Status é atualizado | OK |
| Excluir atividade | Clicar no botão de exclusão da atividade | Atividade sai da lista | OK |
| Calcular progresso | Marcar atividade como concluída | Percentual do projeto muda | OK |
| Dashboard | Cadastrar projetos e atividades | Totais aparecem no dashboard | OK |
| Exportar JSON completo | Abrir o painel JSON e clicar em exportar no escopo `Tudo` | Campo mostra responsáveis e projetos em JSON válido | Falhou |
| Importar projetos por JSON | Selecionar escopo `Projetos` e importar um JSON válido | Lista de projetos é substituída pelos itens importados | OK |
| Importar responsáveis por JSON | Selecionar escopo `Responsáveis` e importar um JSON válido | Lista de responsáveis é atualizada e persiste | OK |
| Copiar JSON | Clicar no botão de copiar no painel JSON | Conteúdo atual é copiado para a área de transferência | OK |

## Observações

- Recomenda-se testar primeiro com o `localStorage` limpo.
- Ao testar importação de JSON, validar tanto o escopo `Tudo` quanto os escopos parciais.
- Se houver divergência entre comportamento e documentação, registrar primeiro em `README.md` ou no histórico da sprint.
