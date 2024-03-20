import { addAoCarrinho } from "./menuCarrinho"
import { catalogo } from "./ultilidades"

export function addItens(){
    for (const produto of catalogo) {
        const cartaoProduto = `<div class="group shadow-xl shadow-[#2c4e33] w-44 m-2 p-2 flex flex-col justify-between rounded-lg" id="card-produto${produto.id}">
        <img src="./assets/img/${produto.img}.jpg" class="rounded-lg group-hover:scale-110 my-2  duration-300" alt="Produto ${produto.id}.">
        <p>${produto.nome}</p>
        <p>R$${produto.preco},00</p>
        <button id="adicionar-${produto.id}" class="bg-[#2c4e33] p-1 rounded-lg text-[#DCCDAE] hover:bg-[#1a301f]"><i class="fa-solid fa-cart-plus"></i></button>
    </div>`

    document.getElementById('container-produtos').innerHTML += cartaoProduto
    }

    for (const produto of catalogo){
        document.getElementById(`adicionar-${produto.id}`).addEventListener('click', () => addAoCarrinho(produto.id));
    }
};