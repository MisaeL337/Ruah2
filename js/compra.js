document.addEventListener('DOMContentLoaded', () => {
    // 1. Banco de dados de produtos
    // Aqui você define as URLs das imagens para cada produto e cor.
    // A chave (ex: 'camiseta-ruah-spirit') deve ser a mesma que você passa no parâmetro 'img' na URL.
    const products = {
        'camiseta-ruah-spirit': {
            defaultImage: 'img/camiseta-oversized-branca.jpg', // Imagem padrão
            colors: {
                'Branca': 'img/camiseta-oversized-branca.jpg',
                'Preta': 'img/camiseta-jesus-preta.png', // Certifique-se de ter esta imagem
                'Verde Escuro': 'img/camisa-jesus-verde.png', // Crie esta imagem
                'Marrom': 'img/camisa-jesus-marrom.png' // Crie esta imagem
            }
        },
        'camiseta-fornalha': {
            defaultImage: 'img/ruahjamal.jpg',
            colors: {
                'Preta': 'img/ruahjamal.jpg',
                'Branca': 'img/camiseta-fornalha-branca.jpg',
                'Cinza': 'img/camiseta-fornalha-cinza.jpg',
                'Verde Escuro': 'img/camiseta-fornalha-verde-escuro.jpg', // Crie esta imagem
                'Marrom': 'img/camiseta-fornalha-marrom.jpg' // Crie esta imagem
            }
        },
        'camiseta-lion-of-judah': {
            defaultImage: 'img/ruahcata.jpg',
            colors: {
                'Preta': 'img/ruahcata.jpg',
                'Off-white': 'img/camiseta-lion-of-judah-offwhite.jpg',
                'Verde Escuro': 'img/camiseta-lion-of-judah-verde-escuro.jpg', // Crie esta imagem
                'Marrom': 'img/camiseta-lion-of-judah-marrom.jpg' // Crie esta imagem
            }
        },
        // Adicione aqui os outros produtos da sua `colecao.html` seguindo o mesmo modelo
        // Ex: 'camiseta-ruah-skate': { ... },
        //     'camiseta-ruah-faith': { ... },
    };

    // 2. Pega os parâmetros da URL
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('name');
    const productImgKey = params.get('img');
    const productPrice = 100.00; // Preço fixo para todas as camisetas

    // 3. Encontra os elementos na página
    const productImageEl = document.getElementById('product-image');
    const productNameEl = document.getElementById('product-name');
    const productPriceEl = document.getElementById('product-price');
    const colorOptionsEl = document.getElementById('color-options');
    const sizeOptionsEl = document.getElementById('size-options');
    const availableSizes = ['P', 'M', 'G', 'GG']; // Tamanhos disponíveis
    const buyButton = document.getElementById('buy-button');

    // Variáveis para armazenar a seleção do usuário
    let selectedColor = null;
    let selectedSize = null;

    // 4. Atualiza a página com as informações do produto
    if (productName && productImgKey && products[productImgKey]) {
        const productData = products[productImgKey];

        selectedColor = Object.keys(productData.colors)[0]; // Define a primeira cor como padrão

        // Atualiza nome, preço e imagem inicial
        productNameEl.textContent = productName;
        productPriceEl.textContent = `R$ ${parseFloat(productPrice).toFixed(2).replace('.', ',')}`;
        productImageEl.src = productData.defaultImage;
        productImageEl.alt = productName;

        // 5. Cria os seletores de cor
        // Limpa quaisquer opções que possam existir
        colorOptionsEl.innerHTML = ''; 

        for (const colorName in productData.colors) {
            const imageUrl = productData.colors[colorName];
            
            const swatch = document.createElement('div');
            swatch.classList.add('color-swatch');
            if (colorName === selectedColor) {
                swatch.style.border = '2px solid var(--primary-color)'; // Destaca a cor padrão
            }
            swatch.classList.add('color-swatch');
            // Para o seletor de cor, podemos usar cores CSS ou pequenas imagens.
            // Usar cores CSS é mais simples se os nomes forem simples.
            // Adicione as novas cores aqui para que o círculo de seleção apareça com a cor certa.
            const colorMap = {
                'Branca': '#FFFFFF',
                'Preta': '#000000',
                'Off-white': '#F5F5DC',
                'Cinza': '#808080',
                'Verde': '#008000', // Mantido caso haja produtos com "Verde"
                'Verde Escuro': '#006400', // Cor para Verde Escuro
                'Marrom': '#8B4513' // Cor para Marrom

            };
            swatch.style.backgroundColor = colorMap[colorName] || '#CCCCCC'; // Usa a cor do mapa ou um cinza padrão
            swatch.title = colorName; // Mostra o nome da cor ao passar o mouse

            // Adiciona o evento de clique para trocar a imagem
            swatch.addEventListener('click', () => {
                productImageEl.src = imageUrl;
                selectedColor = colorName; // Armazena a cor selecionada

                // Atualiza o destaque da borda
                document.querySelectorAll('.color-swatch').forEach(s => s.style.border = '2px solid #eee');
                swatch.style.border = '2px solid var(--primary-color)';
            });

            colorOptionsEl.appendChild(swatch);
        }

        // 6. Cria os seletores de tamanho
        sizeOptionsEl.innerHTML = ''; // Limpa opções existentes
        availableSizes.forEach(size => {
            const sizeOption = document.createElement('div');
            sizeOption.classList.add('size-option');
            sizeOption.textContent = size;
            sizeOption.addEventListener('click', () => {
                // Remove 'active' de todos e adiciona ao clicado
                document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('active'));
                sizeOption.classList.add('active');
                selectedSize = size; // Armazena o tamanho selecionado
            });
            sizeOptionsEl.appendChild(sizeOption);
        });

        // 7. Adiciona evento ao botão de comprar
        buyButton.addEventListener('click', () => {
            if (!selectedSize) {
                alert('Por favor, selecione um tamanho.');
                return;
            }

            // Constrói a URL para a página de checkout
            const checkoutUrl = `checkout.html?name=${encodeURIComponent(productName)}&price=${productPrice}&color=${encodeURIComponent(selectedColor)}&size=${encodeURIComponent(selectedSize)}`;
            
            // Redireciona o usuário
            window.location.href = checkoutUrl;
        });
    } else {
        // Se faltar algum parâmetro ou o produto não for encontrado
        document.querySelector('.purchase-container').innerHTML = '<h2>Produto não encontrado!</h2>';
    }
});