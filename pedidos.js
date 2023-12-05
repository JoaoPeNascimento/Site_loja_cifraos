import { lerLocalStorage, desenharProdutoSimples, voltarHome} from "./src/ultilidades";

function criarHistoricoPedidos(pedidoComData){
    const elementoPedido = `<p class='text-lg mt-2'>${new Date(pedidoComData.dataPedido).toLocaleDateString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
    <section class='bg-[#ccbea1] rounded-lg' id='container-pedidos-${pedidoComData.dataPedido}'></section>`;

    const main = document.getElementsByTagName('main')[0];
    main.innerHTML += elementoPedido;

    for (const idProduto in pedidoComData.pedido){
        desenharProdutoSimples(idProduto, `container-pedidos-${pedidoComData.dataPedido}`, pedidoComData.dataPedido[idProduto]);
    }
}

function renderizarHistoricoPedidos(){
    const historico = lerLocalStorage('historico');
    for (const pedidoComData of historico){
        criarHistoricoPedidos(pedidoComData);
    }
}

renderizarHistoricoPedidos()

document.getElementById('home').addEventListener('click', voltarHome);