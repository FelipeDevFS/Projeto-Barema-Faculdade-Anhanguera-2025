document.addEventListener("DOMContentLoaded", () => {
  const productsGrid = document.getElementById("productsGrid");

  document.querySelectorAll('nav.nav-menu a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetID = this.getAttribute('href').substring(1); // tira o #
    const targetSection = document.getElementById(targetID);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});



  fetch('./assets/data/dados.json')
    .then(res => res.json())
    .then(produtos => {
      produtos.forEach(prod => {
        const card = document.createElement('div');
        card.classList.add('produto-card');
        card.innerHTML = `
          <img src="${prod.imagem}" alt="${prod.nome}" style="width: 200px; height: 200px; object-fit: cover;">
          <h3>${prod.nome}</h3>
          <p>${prod.descricao}</p>
          <p class="preco">
            ${prod.precoAntigo ? `<span class="preco-antigo">${prod.precoAntigo}</span>` : ""}
            <strong>${prod.preco}</strong>
          </p>
          <button class="btn-comprar">Adicionar ao Carrinho</button>
        `;
        productsGrid.appendChild(card);
      });
    })
    .catch(err => {
      productsGrid.innerHTML = `<p style="color: red;">Erro ao carregar produtos</p>`;
      console.error("Erro ao carregar dados.json:", err);
    });
});





// FILTRO DAS CATEGORIAS!!!!

// Variável global para armazenar os produtos
let produtos = [];

// Função para carregar os produtos do JSON
async function carregarProdutos() {
    try {
        const response = await fetch('./assets/data/dados.json');
        produtos = await response.json();
        // Não renderiza automaticamente - espera seleção do usuário
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        document.getElementById('produtos-container').innerHTML = 
            '<p class="erro-carregamento">Erro ao carregar produtos. Por favor, tente novamente.</p>';
    }
}

// Função principal de filtro atualizada
function filtrarPorCategoria() {
    const categoriaSelecionada = document.getElementById('categoria').value;
    const container = document.getElementById('produtos-container');

    // Opção SEM FILTRO - limpa a lista
    if (categoriaSelecionada === 'sem-filtro') {
        container.innerHTML = '<p class="mensagem-filtro">Selecione uma categoria para exibir os produtos.</p>';
        return;
    }

    let produtosFiltrados;
    
    // Opção TODOS
    if (categoriaSelecionada === 'todos') {
        produtosFiltrados = produtos;
    } 
    // Filtro por categoria específica
    else {
        produtosFiltrados = produtos.filter(produto => produto.categoria === categoriaSelecionada);
    }

    // Renderiza os produtos filtrados
    renderizarProdutos(produtosFiltrados);
}

// Função para renderizar os produtos na tela
function renderizarProdutos(listaProdutos) {
    const container = document.getElementById('produtos-container');
    container.innerHTML = ''; // Limpa o container

    if (listaProdutos.length === 0) {
        container.innerHTML = '<p class="sem-resultados">Nenhum produto encontrado nesta categoria.</p>';
        return;
    }

    listaProdutos.forEach(produto => {
        const produtoHTML = `
            <div class="produto" data-categoria="${produto.categoria}">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p class="preco">${produto.preco}</p>
                ${produto.precoAntigo ? `<p class="preco-antigo">De: ${produto.precoAntigo}</p>` : ''}
            </div>
        `;
        container.innerHTML += produtoHTML;
    });
}

// Inicia a carga dos produtos quando a página carrega
document.addEventListener('DOMContentLoaded', carregarProdutos);