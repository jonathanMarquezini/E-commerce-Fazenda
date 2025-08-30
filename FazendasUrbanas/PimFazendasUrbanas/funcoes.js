let carrinho = [];
let totalCarrinho = 0;

// Função para adicionar itens ao carrinho
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const nome = this.getAttribute('data-nome');
        const preco = parseFloat(this.getAttribute('data-preco'));

        // Adiciona o item ao carrinho
        carrinho.push({ nome, preco });
        totalCarrinho += preco;

        atualizarCarrinho();
    });
});

// Função para atualizar a visualização do carrinho
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const quantidadeCarrinho = document.getElementById('quantidade-carrinho');
    const totalCarrinhoDisplay = document.getElementById('total-carrinho');

    // Limpa a lista
    listaCarrinho.innerHTML = '';

    // Se o carrinho estiver vazio
    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<li class="list-group-item">Carrinho vazio</li>';
    } else {
        // Adiciona os itens ao carrinho
        carrinho.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)}
                <button class="btn btn-danger btn-sm" onclick="removerProduto(${index})">Remover</button>`;
            listaCarrinho.appendChild(li);
        });
    }

    // Atualiza as informações do carrinho
    quantidadeCarrinho.textContent = carrinho.length;
    totalCarrinhoDisplay.textContent = totalCarrinho.toFixed(2);
}

// Função para remover produto do carrinho
function removerProduto(index) {
    // Remove o produto do carrinho
    totalCarrinho -= carrinho[index].preco;
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Função para finalizar a compra
function finalizarCompra() {
    // Salva o total do carrinho no localStorage
    localStorage.setItem('totalCarrinho', totalCarrinho.toFixed(2));
    window.location.href = 'pagamento.html'; // Ajuste o caminho se necessário
}

// Função para carregar o valor do carrinho na página de pagamentos
document.addEventListener('DOMContentLoaded', () => {
    const totalCarrinhoStored = localStorage.getItem('totalCarrinho');
    if (totalCarrinhoStored) {
        document.getElementById('total-pagamento').textContent = totalCarrinhoStored;
    }

    // Lógica para mostrar informações do método de pagamento
    const metodoPagamento = document.getElementById('metodo-pagamento');
    const pixInfo = document.getElementById('pix-info');
    const creditoInfo = document.getElementById('credito-info');
    const debitoInfo = document.getElementById('debito-info');
    const boletoInfo = document.getElementById('boleto-info');
    const transferenciaInfo = document.getElementById('transferencia-info');

    metodoPagamento.addEventListener('change', () => {
        // Esconde todas as informações
        pixInfo.style.display = 'none';
        creditoInfo.style.display = 'none';
        debitoInfo.style.display = 'none';
        boletoInfo.style.display = 'none';
        transferenciaInfo.style.display = 'none';

        // Mostra a informação correspondente
        switch (metodoPagamento.value) {
            case 'pix':
                pixInfo.style.display = 'block';
                break;
            case 'credito':
                creditoInfo.style.display = 'block';
                break;
            case 'debito':
                debitoInfo.style.display = 'block';
                break;
            case 'boleto':
                boletoInfo.style.display = 'block';
                break;
            case 'transferencia':
                transferenciaInfo.style.display = 'block';
                break;
        }
    });

    // Adiciona o evento de submit ao formulário
    document.getElementById('form-pagamento').addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio do formulário
        alert('Pagamento confirmado com sucesso! Logo você irá receber um código para acompanhar o seu pedido.'); // Mensagem personalizada
    });
});
