document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DADOS DO PRODUTO VINDOS DA URL ---
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('name');
    const productPrice = parseFloat(params.get('price'));
    const productColor = params.get('color');
    const productSize = params.get('size');

    // --- 2. ELEMENTOS DA PÁGINA ---
    const nameEl = document.getElementById('product-name-summary');
    const colorEl = document.getElementById('product-color-summary');
    const sizeEl = document.getElementById('product-size-summary');
    const priceEl = document.getElementById('product-price-summary');
    const form = document.getElementById('checkout-form');
    const messageEl = document.getElementById('checkout-message');

    // --- 3. ATUALIZA O RESUMO DO PEDIDO ---
    if (productName && productPrice && productColor && productSize) {
        nameEl.textContent = productName;
        colorEl.textContent = productColor;
        sizeEl.textContent = productSize;
        priceEl.textContent = `R$ ${productPrice.toFixed(2).replace('.', ',')}`;
    } else {
        document.querySelector('.checkout-form-container').innerHTML = '<h2>Erro: Nenhum produto selecionado. Volte e escolha um item.</h2>';
        return;
    }

    // --- 4. CONFIGURAÇÕES (VOCÊ PRECISA ALTERAR AQUI!) ---

    // 4.1. Crie links de pagamento no Mercado Pago para cada valor total e cole aqui.
    // O valor total é (Preço do Produto + Frete). Ex: 100 + 15 = 115.
    const linksPagamento = {
        115: "https://mpago.la/LINK_PARA_115_REAIS", // Exemplo para frete de R$ 15
        120: "https://mpago.la/LINK_PARA_120_REAIS", // Exemplo para frete de R$ 20
        125: "https://mpago.la/LINK_PARA_125_REAIS"  // Exemplo para frete de R$ 25
    };

    // 4.2. Crie um Google Form com os campos do pedido e cole a URL de resposta aqui.
    const googleFormURL = "https://docs.google.com/forms/u/0/d/e/SEU_FORM_ID/formResponse";

    // 4.3. Pegue os "entry" de cada campo do seu Google Form e cole aqui.
    // (Clique com o botão direito no campo do formulário > Inspecionar > procure o name="entry.xxxx")
    const googleFormEntries = {
        nome: "entry.2135366172",
        email: "entry.1336961507",
        telefone: "entry.814163698",
        cep: "entry.849793897",
        estado: "entry.343481829",
        produto: "entry.0000000001", // Crie um campo para o nome do produto
        cor: "entry.0000000002",     // Crie um campo para a cor
        tamanho: "entry.0000000003"  // Crie um campo para o tamanho
    };

    // 4.4. Tabela de fretes fixos por estado.
    const fretes = {
        "AC": 25, "AL": 20, "AP": 25, "AM": 25, "BA": 20, "CE": 20, "DF": 15, "ES": 15, "GO": 15,
        "MA": 20, "MT": 20, "MS": 20, "MG": 15, "PA": 25, "PB": 20, "PR": 15, "PE": 20, "PI": 20,
        "RJ": 15, "RN": 20, "RS": 15, "RO": 25, "RR": 25, "SC": 15, "SP": 15, "SE": 20, "TO": 25
    };

    // --- 5. LÓGICA DO FORMULÁRIO ---
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        messageEl.textContent = "Processando seu pedido...";

        // Pega os dados do formulário
        const nome = document.getElementById("name").value;
        const cep = document.getElementById("cep").value;
        const estado = document.getElementById("estado").value.toUpperCase();
        const telefone = document.getElementById("telefone").value;
        const email = document.getElementById("email").value;

        // Calcula o frete e o total
        const frete = fretes[estado] || 15; // Usa R$ 15 como padrão se o estado não for encontrado
        const total = productPrice + frete;

        // Prepara os dados para enviar ao Google Forms
        const formData = new FormData();
        formData.append(googleFormEntries.nome, nome);
        formData.append(googleFormEntries.cep, cep);
        formData.append(googleFormEntries.estado, estado);
        formData.append(googleFormEntries.telefone, telefone);
        formData.append(googleFormEntries.email, email);
        formData.append(googleFormEntries.produto, `${productName} (${productColor})`);
        formData.append(googleFormEntries.tamanho, productSize);

        // Envia os dados para o Google Forms
        fetch(googleFormURL, {
            method: "POST",
            body: formData,
            mode: "no-cors" // Importante para evitar erro de CORS (a submissão funciona mesmo assim)
        }).then(() => {
            messageEl.textContent = "Quase lá! Redirecionando para o pagamento...";
            const linkPagamento = linksPagamento[total];
            
            // Redireciona para o link de pagamento do Mercado Pago
            window.location.href = linkPagamento;
        }).catch(err => {
            console.error(err);
            messageEl.textContent = "Ocorreu um erro. Por favor, tente novamente.";
        });
    });
});