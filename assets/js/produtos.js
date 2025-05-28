let produtos = [];

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

function filtrarPorCategoria() {
  const categoria = document.getElementById("categoria").value;

  const filtrados =
    categoria === "todos"
      ? produtos
      : produtos.filter(p => p.categoria === categoria);

  renderizarProdutos(filtrados);
}

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
    container.appendChild(card);
  });
}

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

document.querySelectorAll('nav.menu_2 a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetID = this.getAttribute('href').substring(1); // tira o #
    const targetSection = document.getElementById(targetID);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

