let produtos = [];

let carrinhoCount = parseInt(localStorage.getItem("carrinhoCount")) || 0;
let carrinhoItens = JSON.parse(localStorage.getItem("carrinhoItens")) || [];


const atualizarCarrinho = () => {
  document.querySelector(".cart-count").textContent = carrinhoItens.length;
  localStorage.setItem("carrinhoItens", JSON.stringify(carrinhoItens));
};
atualizarCarrinho(); // atualizar ao carregar a página

// --------------------------------------------------------------------------------- //
// ABRIR E FECHAR MODAL DO CARRINHO
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("cartModal");
  const cartBtn = document.querySelector(".cart-btn");
  const closeBtn = modal.querySelector(".close-modal");

  // Abrir modal
  cartBtn.addEventListener("click", () => {
    modal.style.display = "block";
    renderizarCarrinho();
  });

  // Fechar modal ao clicar no X
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fechar modal ao clicar fora do conteúdo
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

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
      <img src="${prod.imagem}" alt="${prod.nome}" style="width: 200px; height: 200px; object-fit: cover;">
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
  carrinhoItens.push(prod);
  atualizarCarrinho();

    });

    container.appendChild(card);
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

// --------------------------------------------------------------------------------- //

// RENDERIZAR CARRINHO NO MODAL 

// RENDERIZAR CARRINHO NO MODAL 
function renderizarCarrinho() {
  const modalContent = document.querySelector(".modal-content-2");

  // Limpa conteúdo mantendo o botão de fechar
  while (modalContent.firstChild && modalContent.firstChild.className !== "close-modal") {
    modalContent.removeChild(modalContent.firstChild);
  }



  if (carrinhoItens.length === 0) {
    modalContent.innerHTML += `<p class="empty-cart">Seu carrinho está vazio.</p>`;
    return;
  }

  const cartGrid = document.createElement("div");
  cartGrid.classList.add("cart-grid");
  modalContent.appendChild(cartGrid);

  carrinhoItens.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.style.opacity = "0"; // Para animação
    itemDiv.style.transition = "opacity 0.3s ease-in-out";

    itemDiv.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.nome}</h4>
        <p class="cart-item-price">${item.preco}</p>
      </div>
    `;

    cartGrid.appendChild(itemDiv);

    // Animação de entrada
    setTimeout(() => {
      itemDiv.style.opacity = "1";
    }, index * 100); // Atraso por item para efeito cascata
  });
}

