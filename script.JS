document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mudar o fundo do cabeçalho ao fazer Scroll
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Animação de contagem dos números estatísticos
    const stats = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            let current = 0;
            
            // Tratamento especial para números negativos ou percentagens
            const increment = target / 100;
            
            const updateNumber = () => {
                current += increment;
                if ((increment > 0 && current < target) || (increment < 0 && current > target)) {
                    stat.innerText = Math.ceil(current) + (target === 100 ? '%' : target === -20 ? '%' : '');
                    setTimeout(updateNumber, 15);
                } else {
                    stat.innerText = (target > 0 ? '+' : '') + target + '%';
                }
            };
            
            updateNumber();
        });
    };

    // Ativa a animação quando o utilizador chega perto da secção com os números
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target); // Executa apenas uma vez
            }
        });
    }, { threshold: 0.5 });

    const sobreSection = document.querySelector('.sobre');
    if(sobreSection) {
        observer.observe(sobreSection);
    }
});
