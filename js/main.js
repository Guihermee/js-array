let livros = [];
const endpointAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';
getLivros();


async function getLivros() {
    const response = await fetch(endpointAPI);
    livros = await response.json();

    console.table(livros);
    renderLivros(livros);

}


// Metodo forEach() para percorrer o array de livros e renderizar na tela
estanteLivros = document.querySelector('#livros');
elementoValorTotal = document.querySelector('#valor_total_livros_disponiveis');

function renderLivros(listaDeLivros) {
    estanteLivros.innerHTML = '';
    elementoValorTotal.innerHTML = '';

    let livrosComDesconto = aplicarDesconto(listaDeLivros);

    livrosComDesconto.forEach(livro => {
        disponibilidade = livro.quantidade > 0 ? 'livro__imagens' : 'livro__imagens indisponivel';

        estanteLivros.innerHTML += `
        <div class="livro">
            <img class="${disponibilidade}" src="${livro.imagem}" alt="${livro.alt}" />
            <h2 class="livro__titulo">
                ${livro.titulo}
            </h2>
            <p class="livro__descricao">${livro.autor}</p>
            <p class="livro__preco" id="preco">R$${livro.preco.toFixed(2)}</p>
            <div class="tags">
                <span class="tag">${livro.categoria}</span>
            </div>
        </div>`;
    });
};

// Metodo map() para alterar o valor dos livros
function aplicarDesconto(livros) {
    const desconto = 0.3;
    livroComDesconto = livros.map(livro => {
        return {
            ...livro,
            preco: livro.preco - livro.preco * desconto
        }
    });
    return livroComDesconto;
};

// Metodo filter() para filtrar os livros por categoria
const filtroCategoria = document.querySelectorAll('.btn');
filtroCategoria.forEach(btn => btn.addEventListener('click', filtrarLivros));

function filtrarLivros() {
    const categoria = this.value;
    console.log(categoria);

    let livrosFiltrados = categoria == 'disponivel' ? livros.filter(livro => livro.quantidade > 0) : livros.filter(livro => livro.categoria == categoria);
    console.table(livrosFiltrados);
    renderLivros(livrosFiltrados);

    if (categoria == 'disponivel') {
        const valorTotal = livrosFiltrados.reduce((total, livro) => total + livro.preco, 0).toFixed(2);
        console.log(valorTotal);
        elementoValorTotal.innerHTML = `
        <div class="livros__disponiveis">
            <p>Todos os livros disponíveis por R$ <span id="valor">${valorTotal}</span></p>
        </div>
    `;
    }
};



// Metodo sort() para ordenar os livros por preço
const ordenarLivros = document.querySelector('#btnOrdenarPorPreco');
    ordenarLivros.addEventListener('click', ordenarPorPreco);

    function ordenarPorPreco() {
        let livrosOrdenados = livros.sort((a, b) => a.preco - b.preco);
        renderLivros(livrosOrdenados);
    };
