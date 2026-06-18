# Testes manuais

## Ambiente

- Navegador: Google Chrome Versão 149.0.7827.155 64 bits
- Sistema operacional: Windows 10 Home Single Language Versão 22H2
- Data: 17/06/2026
- Responsável pela execução: Lucas Toffetti Cintra de Pinheiro

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
| Baixar JSON completo | Abrir o painel JSON e clicar em baixar no escopo `Tudo` | Download do arquivo `.json` é iniciado e o campo mostra responsáveis e projetos em JSON válido | Não executado |
| Subir projetos por JSON | Selecionar escopo `Projetos`, clicar em subir e escolher um arquivo JSON válido | Painel fecha e a lista de projetos é substituída pelos itens enviados | OK |
| Subir responsáveis por JSON | Selecionar escopo `Responsáveis`, clicar em subir e escolher um arquivo JSON válido | Painel fecha e a lista de responsáveis é atualizada e persiste | OK |
| Rejeitar JSON inválido por escopo | Selecionar um escopo, clicar em subir e escolher um arquivo com estrutura incompatível | Sistema exibe erro e preserva o estado anterior | Não executado |
| Persistir responsáveis vazios | Remover todos os responsáveis sem uso, recarregar a página e baixar `Responsáveis` | Lista continua vazia após o recarregamento e o download | Não executado |
| Copiar JSON | Clicar no botão de copiar no painel JSON | Conteúdo atual é copiado para a área de transferência | OK |

## Observações

- Recomenda-se testar primeiro com o `localStorage` limpo.
- A execução inicial do checklist foi feita por Lucas Toffetti em 17/06/2026, antes do ajuste final do painel JSON de `importar/exportar` para `subir/baixar`.
- Na execução inicial do Lucas, o fluxo antigo de exportar JSON foi o único ponto marcado como falha.
- Os cenários atuais de download completo, rejeição de JSON inválido e persistência de responsáveis vazios ficaram sem revalidação na versão final consolidada.
- Ao testar subida de JSON, validar tanto o escopo `Tudo` quanto os escopos parciais.
- Se um JSON de projetos trouxer atividades com responsáveis ainda ausentes na lista, confirmar se esses nomes reaparecem na área de responsáveis após a subida.
- Se houver divergência entre comportamento e documentação, registrar primeiro em `README.md` ou no histórico da sprint.
