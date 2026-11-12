# Black Rose — Loja e Caixa (PDV)

Projeto em HTML, CSS e JavaScript puro, sem dependências.

## Como abrir no VS Code
1. Extraia o zip e abra a pasta `blackrose` no VS Code (Arquivo > Abrir Pasta).
2. Instale a extensão **Live Server** (Ritwick Dey).
3. Clique com o botão direito em `index.html` > **Open with Live Server**.

Também funciona abrindo o `index.html` direto no navegador.

## Telas
- `index.html#loja` — site da loja (catálogo, favoritos, sacola)
- `index.html#caixa` — frente de caixa para funcionários (atalhos: F2 busca, F4 finaliza)

## Estrutura
- `index.html` — estrutura da página
- `css/style.css` — estilos e responsividade
- `js/app.js` — produtos, preços, loja e caixa

## Onde editar
- Produtos: array `P` no início de `js/app.js`
- Regras de preço (2+ peças, Pix 13%): função `calc` em `js/app.js`
- Dados do caixa ficam no `localStorage` do navegador (chave `br`)

## Próximos passos sugeridos
Fotos reais dos produtos, banco de dados compartilhado entre as unidades, pagamento real e cálculo de frete por CEP.
