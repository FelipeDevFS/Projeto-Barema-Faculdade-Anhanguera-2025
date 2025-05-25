// Função para login simulado
function simularLogin() {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username && password) {
                localStorage.setItem('user', username);
                window.location.href = 'index.html';
            } else {
                alert('Preencha todos os campos!');
            }
        });
    }
}

// Carregar itens do JSON (exemplo)
function carregarItens() {
    const lista = document.getElementById('lista-itens');
    if (lista) {
        fetch('assets/data/dados.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    const div = document.createElement('div');
                    div.textContent = item.nome; // Exemplo: ajustar conforme o JSON
                    lista.appendChild(div);
                });
            });
    }
}

// Inicializar
simularLogin();
carregarItens();