import { catalogo, lerLocalStorage, salvarLocalStorage } from "./ultilidades";

const idsProdutoComQuantidade = lerLocalStorage('carrinho') ?? {};

function abrirCarrinho(){
    document.getElementById('carrinho').classList.add('right-0');
    document.getElementById('carrinho').classList.remove('right-[-360px]');
}

function fecharCarrinho(){
    document.getElementById('carrinho').classList.remove('right-0');
    document.getElementById('carrinho').classList.add('right-[-360px]');
}

function irParaCheckout (){
    if (Object.keys(idsProdutoComQuantidade).length === 0) {
        return alert('Seu carrinho está vazio!');
    }
    window.location.href = window.location.origin + "/checkout.html";
}

export function iniciarCarrinho(){
    const botaoFecharCarrinho = document.getElementById('fechar-carrinho');
    const botaoAbrirCarrinho = document.getElementById('abrir-carrinho');
    const botaoIrCheckout = document.getElementById('finalizar-compra');

    botaoFecharCarrinho.addEventListener('click', fecharCarrinho);
    botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
    botaoIrCheckout.addEventListener('click', irParaCheckout);
}

function addQuantidade(idProduto){
    idsProdutoComQuantidade[idProduto]++;
    atualizarTotalCarrinho();
    salvarLocalStorage('carrinho', idsProdutoComQuantidade)
    atualizarQuantidade(idProduto);
}

function subQuantidade(idProduto){
    if(idsProdutoComQuantidade[idProduto] === 1){
        removerCarrinho(idProduto);
        return;
    }
    idsProdutoComQuantidade[idProduto]--;
    atualizarTotalCarrinho();
    salvarLocalStorage('carrinho', idsProdutoComQuantidade)
    atualizarQuantidade(idProduto);
}

function atualizarQuantidade(idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoComQuantidade[idProduto];
}

function removerCarrinho(idProduto){
    delete idsProdutoComQuantidade[idProduto];
    atualizarTotalCarrinho();
    salvarLocalStorage('carrinho', idsProdutoComQuantidade)
    renderizarCarrinho(idProduto);
}

function desenharNoCarrinho(idProduto){
    const produto = catalogo.find(p => p.id === idProduto);
    const containerProdutosCarrinho = 
    document.getElementById('produtos-carrinho');
    
    const elementoArticle = document.createElement("article");
    const articleClasses = [
        "bg-[#DCCDAE]",
        "rounded-lg", 
        "flex", 
        "relative", 
        "m-2"
    ];
    for (const articleClasse of articleClasses){
        elementoArticle.classList.add(articleClasse);
    }
    
    const cardProdutoCarrinho = `<button id="limpar-item-${produto.id}" class="text-[#2c4e33] absolute top-0 right-2 hover:text-[#1a301f]"><i class="fa-solid fa-circle-xmark"></i></button>
    <img src="./assets/img/${produto.img}" alt="Carrinho: ${produto.nome}." class="w-16 rounded-lg">
    <div class="p-2 text-slate-900 flex flex-col justify-between">
      <p>${produto.nome}</p>
      <p class='opacity-50'>Tamanho: M</p>
      <p>R$${produto.preco},00</p>  
    </div>
    <div class='text-slate-900 flex items-end absolute bottom-0 right-2 text-lg'>
        <button id='subtrair-quantidade-${produto.id}'>-</button>
        <p id="quantidade-${produto.id}" class="ml-2">${idsProdutoComQuantidade[produto.id]}</p>
        <button class='ml-2' id='adicionar-quantidade-${produto.id}'>+</button>        
    </div>`;
  
  elementoArticle.innerHTML = cardProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

  document.getElementById(`subtrair-quantidade-${produto.id}`).addEventListener("click", ()=>subQuantidade(produto.id));
  document.getElementById(`adicionar-quantidade-${produto.id}`).addEventListener("click", ()=>addQuantidade(produto.id));
  document.getElementById(`limpar-item-${produto.id}`).addEventListener("click", ()=>removerCarrinho(produto.id));
  atualizarTotalCarrinho();
}

export function renderizarCarrinho(){
    const containerProdutosCarrinho = 
    document.getElementById('produtos-carrinho');
    containerProdutosCarrinho.innerHTML = '';
    for(const idProduto in idsProdutoComQuantidade){
        desenharNoCarrinho(idProduto);
    }
}

export function addAoCarrinho(idProduto){
    if(idProduto in idsProdutoComQuantidade){
        addQuantidade(idProduto)
        return;
    };
    idsProdutoComQuantidade[idProduto] = 1;
    salvarLocalStorage('carrinho', idsProdutoComQuantidade)
    desenharNoCarrinho(idProduto);
}

export function atualizarTotalCarrinho(){
    const precoCarrinho = document.getElementById("preco-total");
    let totalCarrinho = 0;
    for(const idProdutoNoCarrinho in idsProdutoComQuantidade){
        totalCarrinho += 
        catalogo.find((p) => p.id === idProdutoNoCarrinho).preco * 
        idsProdutoComQuantidade[idProdutoNoCarrinho];
    }
    precoCarrinho.innerText = `Total: R$${totalCarrinho},00`;
}