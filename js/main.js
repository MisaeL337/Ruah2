// --- Lógica para o Menu Hambúrguer ---
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('header nav ul');

hamburger.addEventListener('click', () => {
    // Alterna a classe 'active' no ícone e no menu
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fecha o menu ao clicar em um link (para navegação na mesma página)
document.querySelectorAll('header nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// --- Lógica para Animação de Scroll (Fade-in) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            // Opcional: remover a classe para animar toda vez que o elemento entra na tela
            // entry.target.classList.remove('show');
        }
    });
});

// Seleciona todos os elementos que devem ter a animação
const hiddenElements = document.querySelectorAll('.fade-in');
// Observa cada um dos elementos selecionados
hiddenElements.forEach((el) => observer.observe(el));

// --- Lógica para Scroll Suave ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});