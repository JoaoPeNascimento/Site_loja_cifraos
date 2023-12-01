import { desenharProdutoSimples, lerLocalStorage } from "./src/ultilidades";

function desenharNoCheckout() {
    const idsProdutoComQuantidade = lerLocalStorage('carrinho')
    for (const idProduto in idsProdutoComQuantidade) {
        desenharProdutoSimples(idProduto, "produtos-checkout", idsProdutoComQuantidade[idProduto])
    }
}

desenharNoCheckout();