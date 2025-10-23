# Banco Web Tests

Projeto de testes automatizados usando Cypress e JavaScript para a aplicação Banco Web.

## Objetivo

Este repositório contém uma suíte de testes end-to-end escrita com Cypress para demonstrar como automatizar cenários da aplicação web do banco (banco-web) e validar comportamentos contra a API (banco-api).

O objetivo é fornecer exemplos práticos de automação com organização baseada em Custom Commands, fixtures e geração de relatórios usando o `cypress-mochawesome-reporter`.

## Componentes do projeto

- Cypress: framework de testes (configurado em `cypress.config.js`).
- Custom Commands: comandos reutilizáveis localizados em `cypress/support/commands/` e importados em `cypress/support/commands.js`.
- Fixtures: dados de teste em `cypress/fixtures/` (por exemplo, `credenciais.json`).
- Relatórios: `cypress-mochawesome-reporter` gera relatórios HTML/JSON em `cypress/reports/html`.
- Testes: especificações em `cypress/e2e/` (ex.: `login.cy.js`, `transferencia.cy.js`).

## Pré-requisitos

- Node.js (recomendado LTS)
- NPM ou Yarn
- As aplicações dependentes devem estar rodando localmente:
  - banco-api: https://github.com/juliodelimas/banco-api
  - banco-web: https://github.com/juliodelimas/banco-web

OBS: O `baseUrl` do Cypress está configurado em `cypress.config.js` como `http://localhost:4000`. Ajuste se necessário.

## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/abelkeveen/banco-web-tests.git
cd banco-web-tests
```

2. Instale as dependências:

```bash
npm install
```

3. Verifique se `banco-api` e `banco-web` estão em execução nas portas esperadas (por padrão, `banco-web` deve responder em `http://localhost:4000`).

## Scripts úteis

No `package.json` já existem alguns scripts:

- `npm run test` — executa os testes em modo headless (Cypress run).
- `npm run cy:open` — abre o Cypress Test Runner (modo interativo).
- `npm run cy:headed` — executa os testes em modo headed (com navegador visível).

Exemplo:

```bash
npm run cy:open
```

## Geração de relatórios

O projeto usa `cypress-mochawesome-reporter`. A configuração principal está em `cypress.config.js` e o plugin é inicializado no `setupNodeEvents`.

Após a execução, os relatórios HTML/JSON são gerados no diretório `cypress/reports/html` (ou conforme configuração padrão do reporter). Abra `cypress/reports/html/index.html` para visualizar o relatório com detalhes, capturas de tela e erros.

## Estrutura de pastas importante

- `cypress/e2e/` — testes de especificação (.cy.js)
- `cypress/fixtures/` — dados estáticos para testes
- `cypress/support/` — arquivos de suporte e `commands.js` que importa os comandos customizados
- `cypress/support/commands/` — comandos customizados por área (login, transferencia, common)

## Documentação dos testes

Testes presentes:

- `login.cy.js` — cobre cenários de login com credenciais válidas e inválidas.
- `transferencia.cy.js` — cobre cenários de transferência entre contas.

Abra os arquivos em `cypress/e2e/` para ver os passos dos testes e asserts.

## Custom Commands (comandos personalizados)

Os comandos abaixo foram criados para tornar os testes mais legíveis e reutilizáveis. Estão localizados em `cypress/support/commands/` e importados em `cypress/support/commands.js`.

- `fazerLoginComCredenciaisValidas()`

  - Descrição: realiza o fluxo de login usando as credenciais válidas da fixture `credenciais.json`.
  - Uso: `cy.fazerLoginComCredenciaisValidas()`

- `fazerLoginComCredenciaisInvalidas()`

  - Descrição: realiza o fluxo de login usando credenciais inválidas da fixture `credenciais.json`.
  - Uso: `cy.fazerLoginComCredenciaisInvalidas()`

- `realizarTransferencia(contaOrigem, contaDestino, valor)`

  - Descrição: preenche os campos de origem, destino e valor e submete a transferência.
  - Parâmetros:
    - `contaOrigem` (string) — opção visível na combobox de conta de origem.
    - `contaDestino` (string) — opção visível na combobox de conta de destino.
    - `valor` (string|number) — valor a ser transferido.
  - Uso: `cy.realizarTransferencia('Conta A', 'Conta B', '100')`

- `verificarMensagemNoToast(mensagem)`

  - Descrição: verifica se o toast (notificação) exibido contém exatamente o texto informado.
  - Parâmetros:
    - `mensagem` (string) — texto esperado no toast.
  - Uso: `cy.verificarMensagemNoToast('Transferência realizada com sucesso')`

- `selecionarOpcaoNaCombobox(labelDoCampo, opcao)`
  - Descrição: encontra o campo pela label (atributo `for`) e seleciona a opção desejada dentro do componente.
  - Parâmetros:
    - `labelDoCampo` (string) — valor do atributo `for` no label que referencia o campo (ex.: `conta-origem`).
    - `opcao` (string) — texto da opção a ser selecionada.
  - Uso: `cy.selecionarOpcaoNaCombobox('conta-origem', 'Conta A')`

Observações: os comandos usam seletores baseados em IDs, labels e textos de botão. Se a aplicação mudar esses seletores, atualize os comandos em `cypress/support/commands/`.

## Credenciais de teste

As credenciais estão em `cypress/fixtures/credenciais.json`:

- usuário válido: `julio.lima`
- senha válida: `123456`

## Dicas e próximos passos

- Para rodar testes em CI, configure a instalação do Node, start das aplicações (`banco-api` e `banco-web`) e execute `npm run test`.
- Considere adicionar scripts para start das aplicações dependentes (por exemplo `docker-compose` ou scripts que iniciam as aplicações em background) para facilitar execução local e CI.
- Adicionar mais cenários de teste e testes de contrato entre frontend e API para aumentar a cobertura.
