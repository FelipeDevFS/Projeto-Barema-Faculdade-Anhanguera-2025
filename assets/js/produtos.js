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
