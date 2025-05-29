let produtos = [];

let carrinhoCount = parseInt(localStorage.getItem("carrinhoCount")) || 0;
let carrinhoItens = JSON.parse(localStorage.getItem("carrinhoItens")) || [];

const atualizarCarrinho = () => {
  const totalItens = carrinhoItens.reduce((total, item) => total + item.quantidade, 0);
  document.querySelector(".cart-count").textContent = totalItens;
  localStorage.setItem("carrinhoItens", JSON.stringify(carrinhoItens));
};
atualizarCarrinho(); // atualizar ao carregar a página

// --------------------------------------------------------------------------------- //
// ABRIR E FECHAR MODAL DO CARRINHO
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("cartModal");
  const cartBtn = document.querySelector(".cart-btn");

  // Abrir modal do carrinho
  cartBtn.addEventListener("click", () => {
    modal.style.display = "block";
    renderizarCarrinho();
  });

  // Fechar modal ao clicar fora do conteúdo
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
    const detailsModal = document.getElementById("detailsModal");
    if (e.target === detailsModal) {
      detailsModal.style.display = "none";
    }
  });
});

// --------------------------------------------------------------------------------- //
// FUNÇÃO PARA ABRIR MODAL DE DETALHES
function abrirDetalhesProduto(nome) {
  const produto = produtos.find(prod => prod.nome === nome);
  const detailsModal = document.getElementById("detailsModal");
  const detailsContent = document.getElementById("productDetailsContent");

  if (produto) {
    // Preenche o conteúdo do modal com os detalhes do produto
    detailsContent.innerHTML = `<div class="details">
      <img src="${produto.imagem}" alt="${produto.nome}" class="details-product-img">
      <h3 class="details-product-name">${produto.nome}</h3>
      <p class="details-product-description">${produto.descricao}</p>
      <p class="details-product-price">${produto.preco}</p>
      ${produto.precoAntigo ? `<p class="details-product-preco-antigo">Preço Antigo: ${produto.precoAntigo}</p>` : ""}
      <p class="details-product-extra">${produto.detalhes}</p>
      </div>
    `;

    // Abre o modal
    detailsModal.style.display = "block";

    // Adiciona evento para fechar o modal
    const closeBtn = detailsModal.querySelector(".close-modal-details");
    closeBtn.addEventListener("click", () => {
      detailsModal.style.display = "none";
    });
  }
}

// --------------------------------------------------------------------------------- //
// FUNÇÕES PARA ADICIONAR E REMOVER ITENS DO CARRINHO
function adicionarAoCarrinho(nome) {
  const item = produtos.find(prod => prod.nome === nome);
  if (item) {
    const itemExistente = carrinhoItens.find(entry => entry.produto.nome === nome);
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinhoItens.push({ produto: item, quantidade: 1 });
    }
    atualizarCarrinho();
    renderizarCarrinho();
  }
}

function removerDoCarrinho(nome) {
  const itemExistente = carrinhoItens.find(entry => entry.produto.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade -= 1;
    if (itemExistente.quantidade <= 0) {
      const index = carrinhoItens.findIndex(entry => entry.produto.nome === nome);
      carrinhoItens.splice(index, 1);
    }
    atualizarCarrinho();
    renderizarCarrinho();
  }
}

// --------------------------------------------------------------------------------- //
// RENDERIZAÇÃO DA GRID DOS PRODUTOS MOCKADOS NA TELA 
document.addEventListener("DOMContentLoaded", () => {
  const productsGrid = document.getElementById("productsGrid");

  fetch('./assets/data/dados.json')
    .then(res => res.json())
    .then(data => {
      produtos = data;
      renderizarProdutos(produtos);
    })
    .catch(err => {
      productsGrid.innerHTML = `<p style="color: red;">Erro ao carregar produtos</p>`;
      console.error("Erro ao carregar dados.json:", err);
    });
});

// --------------------------------------------------------------------------------- //
// FILTRO POR CATEGORIA
function filtrarPorCategoria() {
  const categoria = document.getElementById("categoria").value;

  const filtrados =
    categoria === "todos"
      ? produtos
      : produtos.filter(p => p.categoria === categoria);

  renderizarProdutos(filtrados);
}

// --------------------------------------------------------------------------------- //
// RENDERIZAÇÃO DOS CARDS DE PRODUTOS USANDO JSON MOCKADO
function renderizarProdutos(lista) {
  const container = document.getElementById("productsGrid");
  container.innerHTML = ""; // Limpa produtos antigos

  if (lista.length === 0) {
    container.innerHTML = `<p style="color: gray;">Nenhum produto para exibir.</p>`;
    return;
  }

  lista.forEach(prod => {
    const card = document.createElement('div');
    card.classList.add('produto-card');
    card.innerHTML = `
      <div class="product-header">
        <img src="${prod.imagem}" alt="${prod.nome}" style="width: 200px; height: 200px; object-fit: cover;">
        <span class="info-icon" onclick="abrirDetalhesProduto('${prod.nome}')"><i class="fas fa-info-circle"></i></span>
      </div>
      <h3>${prod.nome}</h3>
      <p>${prod.descricao}</p>
      <p class="preco">
        ${prod.precoAntigo ? `<span class="preco-antigo">${prod.precoAntigo}</span>` : ""}
        <strong>${prod.preco}</strong>
      </p>
      <button class="btn-comprar">Adicionar ao Carrinho</button>
    `;

    // Evento de clique no botão
    card.querySelector(".btn-comprar").addEventListener("click", () => {
      adicionarAoCarrinho(prod.nome);
    });

    container.appendChild(card);
  });
}

// --------------------------------------------------------------------------------- //
// RENDERIZAR CARRINHO NO MODAL 
function renderizarCarrinho() {
  const modalContent = document.querySelector(".modal-content-2");
  const modal = document.getElementById("cartModal");

  // Limpa o conteúdo e adiciona o título e o botão de fechar
  modalContent.innerHTML = `<span class="close-modal">×</span><h2 class="cart-title">Seu Carrinho</h2>`;

  // Adiciona o evento de fechar ao botão "X" antes de qualquer verificação
  const closeBtn = modalContent.querySelector(".close-modal");
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Verifica se o carrinho está vazio
  if (carrinhoItens.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-cart");
    emptyMessage.textContent = "Seu carrinho está vazio.";
    modalContent.appendChild(emptyMessage);
    return;
  }

  // Renderiza os itens do carrinho
  const cartList = document.createElement("div");
  cartList.classList.add("cart-list");
  modalContent.appendChild(cartList);

  carrinhoItens.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <img src="${item.produto.imagem}" alt="${item.produto.nome}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.produto.nome}</h4>
        <p class="cart-item-price">${item.produto.preco}</p>
        <p class="cart-item-quantity">Quantidade: ${item.quantidade}</p>
      </div>
      <span class="icon-add" onclick="adicionarAoCarrinho('${item.produto.nome}')"><i class="fas fa-plus"></i></span>
      <span class="icon-remove" onclick="removerDoCarrinho('${item.produto.nome}')"><i class="fas fa-trash"></i></span>
    `;

    cartList.appendChild(itemDiv);
  });
}

// --------------------------------------------------------------------------------- //
// ANIMAÇÃO DE SCROLL SUAVE PARA LINKS DO MENU
document.querySelectorAll('nav.nav-menu a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetID = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.querySelectorAll('nav.menu_2 a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetID = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});