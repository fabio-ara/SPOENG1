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
| Cadastrar responsável | Adicionar um nome na área de responsáveis | Responsável aparece na lista | Pendente |
| Abrir painel de responsáveis | Clicar no botão de responsáveis no topo | Painel de responsáveis abre | Pendente |
| Excluir responsável sem uso | Remover um responsável sem atividade vinculada | Responsável sai da lista | Pendente |
| Bloquear exclusão em uso | Tentar remover responsável já usado em atividade | Sistema impede a exclusão | Pendente |
| Cadastrar projeto | Preencher nome, descrição e prazo | Projeto aparece na lista | Pendente |
| Abrir painel de projeto | Clicar no botão de novo projeto no topo | Painel de projeto abre | Pendente |
| Editar projeto | Alterar nome, descrição ou prazo de um projeto | Dados atualizados aparecem no card | Pendente |
| Excluir projeto | Clicar no botão de exclusão do projeto | Projeto sai da lista | Pendente |
| Persistir projeto | Recarregar a página | Projeto continua aparecendo | Pendente |
| Cadastrar atividade | Adicionar atividade em um projeto | Atividade aparece no projeto | Pendente |
| Alterar status | Mudar status de uma atividade | Status é atualizado | Pendente |
| Excluir atividade | Clicar no botão de exclusão da atividade | Atividade sai da lista | Pendente |
| Calcular progresso | Marcar atividade como concluída | Percentual do projeto muda | Pendente |
| Dashboard | Cadastrar projetos e atividades | Totais aparecem no dashboard | Pendente |
| Baixar JSON completo | Abrir o painel JSON e clicar em baixar no escopo `Tudo` | Arquivo `.json` é baixado e o campo mostra responsáveis e projetos em JSON válido | Pendente |
| Subir projetos por JSON | Selecionar escopo `Projetos` e subir um JSON válido | Lista de projetos é substituída pelos itens enviados | Pendente |
| Subir responsáveis por JSON | Selecionar escopo `Responsáveis` e subir um JSON válido | Lista de responsáveis é atualizada e persiste | Pendente |
| Rejeitar JSON inválido por escopo | Selecionar um escopo e tentar subir um objeto sem a chave esperada | Sistema exibe erro e preserva o estado anterior | Pendente |
| Persistir responsáveis vazios | Remover todos os responsáveis sem uso, recarregar a página e baixar `Responsáveis` | Lista continua vazia após o recarregamento e o download | Pendente |
| Copiar JSON | Clicar no botão de copiar no painel JSON | Conteúdo atual é copiado para a área de transferência | Pendente |

## Observações

- Recomenda-se testar primeiro com o `localStorage` limpo.
- Ao testar subida de JSON, validar tanto o escopo `Tudo` quanto os escopos parciais.
- Se um JSON de projetos trouxer atividades com responsáveis ainda ausentes na lista, confirmar se esses nomes reaparecem na área de responsáveis após a subida.
- Se houver divergência entre comportamento e documentação, registrar primeiro em `README.md` ou no histórico da sprint.
