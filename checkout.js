import { apagarDoLocalStorage, desenharProdutoSimples, lerLocalStorage, salvarLocalStorage, voltarHome } from "./src/ultilidades";

function desenharNoCheckout() {
    const idsProdutoComQuantidade = lerLocalStorage('carrinho') ?? {};
    for (const idProduto in idsProdutoComQuantidade) {
        desenharProdutoSimples(idProduto, "produtos-checkout", idsProdutoComQuantidade[idProduto]);
    }
}

function finalizarPedido(evento){
    evento.preventDefault();
    const idsProdutoComQuantidade = lerLocalStorage('carrinho') ?? {};
    if (Object.keys(idsProdutoComQuantidade).length === 0){
        return;
    }
    const dataCompra = new Date();
    const pedidoFinalizado = {
        dataPedido: dataCompra,
        pedido: idsProdutoComQuantidade
    }
    const historicoDePedidos = lerLocalStorage('carrinho') ?? [];
    const historicoDePedidosAtualizado = [pedidoFinalizado, ...historicoDePedidos];
    
    salvarLocalStorage('historico', historicoDePedidosAtualizado);
    apagarDoLocalStorage('carrinho');
    window.location.href = window.location.origin + "/pedidos.html";
}

desenharNoCheckout();

document.addEventListener("submit", (evt) => finalizarPedido(evt));

document.getElementById('home').addEventListener('click', voltarHome);
