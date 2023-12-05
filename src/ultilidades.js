export const catalogo =  [
    {
        id: "1",
        nome: 'Camisa La ursa',
        preco: 45,
        img: 'produto-1.jpg',
    },
    {
        id: "2",
        nome: 'Camisa Poison',
        preco: 45,
        img: 'produto-2.jpg',
    },
    {
        id: "3",
        nome: 'Camisa Cartoon',
        preco: 45,
        img: 'produto-3.jpg'
    },
    {
        id: "4",
        nome: 'Camisa Mystic',
        preco: 45,
        img: 'produto-4.jpg',
    },
    {
        id: "5",
        nome: 'Camisa Hunter Hype',
        preco: 45,
        img: 'produto-5.jpg',
    },
    {
        id: "6",
        nome: 'Camisa Fantasy',
        preco: 45,
        img: 'produto-6.jpg',
    },
];

export function salvarLocalStorage(chave, informação, quantidadeProduto){
    localStorage.setItem(chave, JSON.stringify(informação));
}
export function lerLocalStorage(chave){
    return JSON.parse(localStorage.getItem(chave));
}
export function apagarDoLocalStorage(chave){
    localStorage.removeItem(chave);
}

export function desenharProdutoSimples(idProduto, idContainerHtml, quantidadeProduto){
    const produto = catalogo.find(p => p.id === idProduto);
    const containerProdutosCarrinho = 
    document.getElementById(idContainerHtml);
    
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
    
    const cardProdutoCarrinho = `
    <img src="./assets/img/${produto.img}" alt="Carrinho: ${produto.nome}." class="w-16 rounded-lg">
    <div class="p-2 text-slate-900 flex flex-col justify-between">
      <p>${produto.nome}</p>
      <p class='opacity-50'>Tamanho: M</p>
      <p>R$${produto.preco},00</p>  
    </div>
    <div class='text-slate-900 flex items-end absolute bottom-0 right-2 text-lg'>
        <p id="quantidade-${produto.id}" class="ml-2">${quantidadeProduto}</p>        
    </div>`;
  
  elementoArticle.innerHTML = cardProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);
}

export function voltarHome(){
    window.location.href = window.location.origin + "/index.html";
}