// Menu Mobile Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');

    // Atualizar ARIA states
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');

    // Animação do ícone hambúrguer
    const spans = menuToggle.querySelectorAll('span');
    if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Galeria de Produtos
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Redireciona para o link de pedidos ao clicar em qualquer item da galeria
        window.open('https://link.vocepede.online/rosaoriental', '_blank');
    });
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observar elementos para animação
const animateElements = document.querySelectorAll('.gallery-item, .feature-item, .contact-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Header Background Change on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'var(--bg-dark)';
        header.style.boxShadow = 'var(--shadow-md)';
    }
});

// Contador de Tempo para Promoções
function updatePromotionTimer() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const diff = endOfDay - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // Você pode adicionar um elemento de timer na página se desejar
    // Por exemplo: document.getElementById('timer').textContent = `${hours}h ${minutes}m`;
}

// Atualizar timer a cada minuto
setInterval(updatePromotionTimer, 60000);
updatePromotionTimer();

// Lazy Loading para Imagens (caso adicione imagens no futuro)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// WhatsApp Button (opcional - pode adicionar um botão flutuante)
function createWhatsAppButton() {
    // Você pode adicionar aqui o número do WhatsApp do Rosa Oriental
    // const whatsappBtn = document.createElement('a');
    // whatsappBtn.href = 'https://wa.me/5547999999999';
    // whatsappBtn.className = 'whatsapp-float';
    // whatsappBtn.target = '_blank';
    // whatsappBtn.innerHTML = '💬';
    // document.body.appendChild(whatsappBtn);
}

// Meta Pixel Event Tracking
function trackMetaPixelEvent(eventName, parameters = {}) {
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, parameters);
        console.log(`Meta Pixel Event: ${eventName}`, parameters);
    }
}

function trackMetaPixelCustomEvent(eventName, parameters = {}) {
    if (typeof fbq !== 'undefined') {
        fbq('trackCustom', eventName, parameters);
        console.log(`Meta Pixel Custom Event: ${eventName}`, parameters);
    }
}

// Analytics Event Tracking (opcional)
function trackEvent(category, action, label) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track clicks nos botões CTA principais (Hero e outros)
document.querySelectorAll('.btn-primary, .btn-lg').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const buttonText = btn.textContent.trim();

        // Meta Pixel - InitiateCheckout quando clicar em botões de pedido
        trackMetaPixelEvent('InitiateCheckout', {
            content_name: 'Botão de Pedido',
            content_category: 'CTA',
            value: 0,
            currency: 'BRL'
        });

        // Custom event para identificar qual botão
        trackMetaPixelCustomEvent('ClickOrderButton', {
            button_location: btn.closest('section')?.id || 'unknown',
            button_text: buttonText
        });

        trackEvent('CTA', 'click', buttonText);
    });
});

// Track clicks no botão de navegação "Pedir Agora"
document.querySelectorAll('.nav-cta').forEach(btn => {
    btn.addEventListener('click', () => {
        trackMetaPixelEvent('InitiateCheckout', {
            content_name: 'Menu Navegação - Pedir Agora',
            content_category: 'Navigation',
            value: 0,
            currency: 'BRL'
        });

        trackMetaPixelCustomEvent('ClickNavOrderButton', {
            button_location: 'header_navigation'
        });
    });
});

// Track clicks nos itens da galeria
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const productName = item.querySelector('.gallery-overlay h3')?.textContent || `Produto ${index + 1}`;

        // Meta Pixel - ViewContent para visualização de produto
        trackMetaPixelEvent('ViewContent', {
            content_name: productName,
            content_category: 'Galeria de Produtos',
            content_type: 'product'
        });

        trackMetaPixelCustomEvent('GalleryItemClick', {
            product_name: productName,
            product_position: index + 1
        });

        trackEvent('Gallery', 'item_click', productName);
    });
});

// Track botão "Ver Cardápio Completo"
const menuButtons = document.querySelectorAll('a[href*="vocepede"]');
menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.closest('section')?.id || 'unknown';

        trackMetaPixelEvent('InitiateCheckout', {
            content_name: 'Ver Cardápio Completo',
            content_category: section,
            value: 0,
            currency: 'BRL'
        });

        trackMetaPixelCustomEvent('ViewMenu', {
            button_location: section
        });
    });
});

// Track clique no WhatsApp flutuante
const whatsappButton = document.querySelector('.whatsapp-float');
if (whatsappButton) {
    whatsappButton.addEventListener('click', () => {
        trackMetaPixelEvent('Contact', {
            content_name: 'WhatsApp Flutuante',
            content_category: 'Contact'
        });

        trackMetaPixelCustomEvent('WhatsAppClick', {
            button_type: 'floating'
        });
    });
}

// Track scroll depth (engajamento)
let scrollDepths = [25, 50, 75, 100];
let trackedDepths = [];

window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
            trackedDepths.push(depth);

            trackMetaPixelCustomEvent('ScrollDepth', {
                depth_percentage: depth,
                page_section: getCurrentSection()
            });
        }
    });
});

// Função para identificar seção atual
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            return section.id;
        }
    }
    return 'unknown';
}

// Track tempo na página (engajamento)
let pageLoadTime = Date.now();
let timeTracked30s = false;
let timeTracked60s = false;
let timeTracked180s = false;

setInterval(() => {
    const timeOnPage = Math.floor((Date.now() - pageLoadTime) / 1000);

    if (timeOnPage >= 30 && !timeTracked30s) {
        timeTracked30s = true;
        trackMetaPixelCustomEvent('TimeOnPage', {
            duration_seconds: 30,
            engagement_level: 'low'
        });
    }

    if (timeOnPage >= 60 && !timeTracked60s) {
        timeTracked60s = true;
        trackMetaPixelCustomEvent('TimeOnPage', {
            duration_seconds: 60,
            engagement_level: 'medium'
        });
    }

    if (timeOnPage >= 180 && !timeTracked180s) {
        timeTracked180s = true;
        trackMetaPixelCustomEvent('TimeOnPage', {
            duration_seconds: 180,
            engagement_level: 'high'
        });
    }
}, 1000);

// Track visualização de seções importantes
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const sectionTitle = entry.target.querySelector('.section-title')?.textContent || sectionId;

            trackMetaPixelCustomEvent('ViewSection', {
                section_id: sectionId,
                section_title: sectionTitle
            });
        }
    });
}, {
    threshold: 0.5
});

// Observar seções principais
document.querySelectorAll('#sobre, #galeria, #contato').forEach(section => {
    sectionObserver.observe(section);
});

// Track visualização da seção de reviews
const reviewsSection = document.querySelector('.reviews');
if (reviewsSection) {
    const reviewsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackMetaPixelCustomEvent('ViewReviews', {
                    section_name: 'Google Reviews',
                    rating: '5.0'
                });
                reviewsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    reviewsObserver.observe(reviewsSection);
}

// Track cliques em links de redes sociais
document.querySelectorAll('a[href*="instagram"]').forEach(link => {
    link.addEventListener('click', () => {
        trackMetaPixelCustomEvent('SocialMediaClick', {
            platform: 'instagram',
            link_location: link.closest('section')?.id || 'unknown'
        });
    });
});

// Prevenção de zoom duplo no mobile (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Console Welcome Message
console.log('%c🍣 Rosa Oriental', 'font-size: 24px; font-weight: bold; color: #D32F2F;');
console.log('%cO sabor que gruda na mente', 'font-size: 14px; font-style: italic; color: #666;');
console.log('%cDesenvolvido com ❤️', 'font-size: 12px; color: #999;');

// Performance Monitoring
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Página carregada em ${loadTime}ms`);
});

// Reviews Carousel - 30 reviews, 8 páginas de 4
class ReviewsCarousel {
    constructor() {
        this.carousel = document.getElementById('googleReviewsCarousel');
        this.indicatorsContainer = document.getElementById('carouselIndicators');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.currentPage = 0;
        this.reviewsPerPage = 4;
        this.totalPages = 8;
        this.autoPlayInterval = null;

        if (!this.carousel || typeof reviewsData === 'undefined') return;

        this.init();
    }

    init() {
        // Render pages and indicators
        this.renderPages();
        this.renderIndicators();

        // Event Listeners
        this.prevBtn.addEventListener('click', () => this.prevPage());
        this.nextBtn.addEventListener('click', () => this.nextPage());

        // Auto play
        this.startAutoPlay();

        // Pause on hover
        const carouselContainer = document.querySelector('.reviews-carousel-container');
        carouselContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
        carouselContainer.addEventListener('mouseleave', () => this.startAutoPlay());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevPage();
            if (e.key === 'ArrowRight') this.nextPage();
        });
    }

    createReviewCard(review) {
        const stars = '⭐'.repeat(review.stars);

        return `
            <div class="review-card">
                <div class="review-header">
                    <div class="review-author">
                        <div class="author-avatar google-avatar">${review.initial}</div>
                        <div>
                            <p class="author-name">${review.name}</p>
                            <div class="review-stars">${stars}</div>
                        </div>
                    </div>
                    <svg class="google-icon-small" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                </div>
                <p class="review-text">"${review.text}"</p>
                <p class="review-date">${review.date}</p>
            </div>
        `;
    }

    renderPages() {
        for (let page = 0; page < this.totalPages; page++) {
            const startIndex = page * this.reviewsPerPage;
            const endIndex = startIndex + this.reviewsPerPage;
            const pageReviews = reviewsData.slice(startIndex, endIndex);

            const pageDiv = document.createElement('div');
            pageDiv.className = `reviews-grid-page${page === 0 ? ' active' : ''}`;
            pageDiv.dataset.page = page;

            pageDiv.innerHTML = pageReviews.map(review => this.createReviewCard(review)).join('');
            this.carousel.appendChild(pageDiv);
        }
    }

    renderIndicators() {
        for (let i = 0; i < this.totalPages; i++) {
            const indicator = document.createElement('button');
            indicator.className = `indicator${i === 0 ? ' active' : ''}`;
            indicator.dataset.page = i;
            indicator.setAttribute('aria-label', `Ver página ${i + 1}`);
            indicator.addEventListener('click', () => this.goToPage(i));
            this.indicatorsContainer.appendChild(indicator);
        }
    }

    goToPage(pageIndex) {
        // Remove active class from all pages and indicators
        const pages = this.carousel.querySelectorAll('.reviews-grid-page');
        const indicators = this.indicatorsContainer.querySelectorAll('.indicator');

        pages.forEach(page => page.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current page and indicator
        this.currentPage = pageIndex;
        pages[this.currentPage].classList.add('active');
        indicators[this.currentPage].classList.add('active');
    }

    nextPage() {
        const nextIndex = (this.currentPage + 1) % this.totalPages;
        this.goToPage(nextIndex);
    }

    prevPage() {
        const prevIndex = (this.currentPage - 1 + this.totalPages) % this.totalPages;
        this.goToPage(prevIndex);
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextPage();
        }, 6000); // Change page every 6 seconds
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ReviewsCarousel();
        initAboutCarousel();
    });
} else {
    new ReviewsCarousel();
    initAboutCarousel();
}

// About Section Photos Carousel (auto-rotate)
function initAboutCarousel() {
    const photos = document.querySelectorAll('.about-photo');
    if (photos.length === 0) return;

    let currentIndex = 0;

    function showNextPhoto() {
        photos[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % photos.length;
        photos[currentIndex].classList.add('active');
    }

    // Change photo every 4 seconds
    setInterval(showNextPhoto, 4000);
}

// Modal System for Terms and Privacy
class LegalModal {
    constructor() {
        this.termsModal = document.getElementById('termsModal');
        this.privacyModal = document.getElementById('privacyModal');
        this.openTermsBtn = document.getElementById('openTerms');
        this.openPrivacyBtn = document.getElementById('openPrivacy');

        this.init();
    }

    init() {
        // Load content
        this.loadTermsContent();
        this.loadPrivacyContent();

        // Event listeners
        this.openTermsBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal(this.termsModal);
        });

        this.openPrivacyBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal(this.privacyModal);
        });

        // Close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeAllModals();
            });
        });

        // Close on outside click
        [this.termsModal, this.privacyModal].forEach(modal => {
            modal?.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAllModals();
                }
            });
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeAllModals() {
        [this.termsModal, this.privacyModal].forEach(modal => {
            modal?.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    loadTermsContent() {
        const content = document.getElementById('termsContent');
        if (!content) return;

        content.innerHTML = `
            <p><strong>Última atualização:</strong> Janeiro de 2025</p>

            <h3>1. Aceitação dos Termos</h3>
            <p>Ao acessar e utilizar o site do Rosa Oriental, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não utilize nosso site.</p>

            <h3>2. Sobre o Serviço</h3>
            <p>O Rosa Oriental é um restaurante especializado em culinária japonesa que oferece serviços de delivery e retirada em Blumenau, Santa Catarina.</p>

            <h3>3. Pedidos e Pagamentos</h3>
            <h4>3.1 Realização de Pedidos</h4>
            <ul>
                <li>Pedido mínimo: R$ 20,00</li>
                <li>Tempo estimado de entrega: 35 minutos</li>
                <li>Tempo estimado de retirada: 35 minutos</li>
                <li>Os pedidos devem ser realizados através do WhatsApp ou telefone</li>
            </ul>

            <h4>3.2 Formas de Pagamento</h4>
            <p>Aceitamos diversas formas de pagamento, incluindo dinheiro, cartões de crédito e débito, e pagamentos digitais. As formas disponíveis serão informadas no momento do pedido.</p>

            <h3>4. Entregas</h3>
            <ul>
                <li>Realizamos entregas na região de Itoupava Central e arredores em Blumenau</li>
                <li>O tempo de entrega pode variar conforme a demanda e condições climáticas</li>
                <li>Taxa de entrega será informada no momento do pedido</li>
                <li>É necessário fornecer endereço completo e ponto de referência</li>
            </ul>

            <h3>5. Cancelamentos e Reembolsos</h3>
            <ul>
                <li>Cancelamentos devem ser solicitados o mais rápido possível</li>
                <li>Não será possível cancelar pedidos já em preparação ou em rota de entrega</li>
                <li>Reembolsos serão analisados caso a caso</li>
                <li>Em caso de problemas com o pedido, entre em contato imediatamente</li>
            </ul>

            <h3>6. Qualidade e Segurança Alimentar</h3>
            <p>Garantimos que todos os nossos produtos seguem rigorosos padrões de qualidade e higiene, em conformidade com a legislação sanitária vigente.</p>

            <h3>7. Propriedade Intelectual</h3>
            <p>Todo o conteúdo do site, incluindo textos, imagens, logotipos e design, são propriedade do Rosa Oriental e protegidos por direitos autorais.</p>

            <h3>8. Limitação de Responsabilidade</h3>
            <p>O Rosa Oriental não se responsabiliza por:</p>
            <ul>
                <li>Atrasos causados por força maior ou caso fortuito</li>
                <li>Informações incorretas fornecidas pelo cliente</li>
                <li>Problemas de acesso ao site decorrentes de falhas técnicas</li>
            </ul>

            <h3>9. Modificações nos Termos</h3>
            <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site.</p>

            <h3>10. Contato</h3>
            <p>Para dúvidas, sugestões ou reclamações, entre em contato conosco através do WhatsApp ou Instagram @rosaorientalsushi.</p>

            <h3>11. Lei Aplicável</h3>
            <p>Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida no foro da comarca de Blumenau, SC.</p>
        `;
    }

    loadPrivacyContent() {
        const content = document.getElementById('privacyContent');
        if (!content) return;

        content.innerHTML = `
            <p><strong>Última atualização:</strong> Janeiro de 2025</p>

            <h3>1. Introdução</h3>
            <p>O Rosa Oriental ("nós", "nosso" ou "nos") está comprometido em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais.</p>

            <h3>2. Informações que Coletamos</h3>

            <h4>2.1 Informações Fornecidas por Você</h4>
            <ul>
                <li><strong>Dados de Contato:</strong> Nome, telefone, endereço de entrega</li>
                <li><strong>Informações de Pedido:</strong> Histórico de pedidos, preferências alimentares</li>
                <li><strong>Informações de Pagamento:</strong> Forma de pagamento preferida (não armazenamos dados de cartão)</li>
            </ul>

            <h4>2.2 Informações Coletadas Automaticamente</h4>
            <ul>
                <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas</li>
                <li><strong>Cookies:</strong> Utilizamos cookies para melhorar a experiência do usuário</li>
            </ul>

            <h3>3. Como Usamos Suas Informações</h3>
            <p>Utilizamos suas informações para:</p>
            <ul>
                <li>Processar e entregar seus pedidos</li>
                <li>Comunicar sobre o status do pedido</li>
                <li>Melhorar nossos serviços e experiência do cliente</li>
                <li>Enviar promoções e ofertas especiais (com seu consentimento)</li>
                <li>Cumprir obrigações legais e fiscais</li>
                <li>Prevenir fraudes e garantir a segurança</li>
            </ul>

            <h3>4. Compartilhamento de Informações</h3>
            <p>Não vendemos suas informações pessoais. Podemos compartilhar dados apenas:</p>
            <ul>
                <li>Com entregadores para realizar a entrega</li>
                <li>Com processadores de pagamento (de forma segura e criptografada)</li>
                <li>Quando exigido por lei ou ordem judicial</li>
                <li>Para proteger nossos direitos e propriedade</li>
            </ul>

            <h3>5. Proteção de Dados</h3>
            <p>Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações:</p>
            <ul>
                <li>Criptografia de dados sensíveis</li>
                <li>Acesso restrito a informações pessoais</li>
                <li>Treinamento regular da equipe sobre segurança de dados</li>
                <li>Monitoramento contínuo de sistemas</li>
            </ul>

            <h3>6. Seus Direitos (LGPD)</h3>
            <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
            <ul>
                <li><strong>Acesso:</strong> Solicitar cópia dos seus dados pessoais</li>
                <li><strong>Correção:</strong> Atualizar informações incorretas ou incompletas</li>
                <li><strong>Exclusão:</strong> Solicitar a remoção dos seus dados</li>
                <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                <li><strong>Revogação:</strong> Retirar consentimento a qualquer momento</li>
                <li><strong>Oposição:</strong> Opor-se ao tratamento de dados em certas situações</li>
            </ul>

            <h3>7. Retenção de Dados</h3>
            <p>Mantemos seus dados pessoais apenas pelo tempo necessário para:</p>
            <ul>
                <li>Cumprir as finalidades descritas nesta política</li>
                <li>Atender requisitos legais e fiscais</li>
                <li>Resolver disputas e fazer cumprir acordos</li>
            </ul>

            <h3>8. Cookies e Tecnologias Similares</h3>
            <p>Utilizamos cookies para:</p>
            <ul>
                <li>Lembrar suas preferências</li>
                <li>Entender como você usa nosso site</li>
                <li>Melhorar a performance e funcionalidade</li>
            </ul>
            <p>Você pode gerenciar cookies através das configurações do seu navegador.</p>

            <h3>9. Links de Terceiros</h3>
            <p>Nosso site pode conter links para sites de terceiros (Instagram, WhatsApp). Não somos responsáveis pelas práticas de privacidade desses sites.</p>

            <h3>10. Menores de Idade</h3>
            <p>Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente informações de crianças e adolescentes.</p>

            <h3>11. Alterações nesta Política</h3>
            <p>Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre alterações significativas através do site ou outros meios apropriados.</p>

            <h3>12. Contato</h3>
            <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:</p>
            <ul>
                <li><strong>WhatsApp:</strong> (47) 99999-9999</li>
                <li><strong>Instagram:</strong> @rosaorientalsushi</li>
                <li><strong>Localização:</strong> Itoupava Central, Blumenau - SC</li>
            </ul>

            <h3>13. Consentimento</h3>
            <p>Ao usar nossos serviços, você consente com esta Política de Privacidade e com o tratamento de suas informações conforme descrito.</p>
        `;
    }
}

// Initialize Legal Modal
document.addEventListener('DOMContentLoaded', () => {
    new LegalModal();
    initStickyCta();
    initExitIntent();
    initUrgencySystem();
    initPersonalization();
});

// Sticky CTA Bar
function initStickyCta() {
    const stickyCta = document.getElementById('stickyCta');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        // Mostrar após hero + 300px de scroll
        if (scrolled > heroHeight + 300) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }

        lastScroll = scrolled;
    });

    // Track click no sticky CTA
    stickyCta.querySelector('.btn-sticky')?.addEventListener('click', () => {
        trackMetaPixelEvent('InitiateCheckout', {
            content_name: 'Sticky CTA Bar',
            content_category: 'Persistent CTA',
            value: 0,
            currency: 'BRL'
        });

        trackMetaPixelCustomEvent('StickyCTAClick', {
            scroll_depth: Math.round((window.scrollY / document.documentElement.scrollHeight) * 100)
        });
    });
}

// Exit Intent Popup
function initExitIntent() {
    let exitIntentShown = localStorage.getItem('exitIntentShown');
    const modal = document.getElementById('exitIntentModal');
    const closeBtn = modal.querySelector('.exit-close');

    // Não mostrar se já foi exibido nesta sessão
    if (exitIntentShown === 'true') return;

    let exitIntentTriggered = false;

    // Detectar movimento para sair da página
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !exitIntentTriggered && window.scrollY > 500) {
            exitIntentTriggered = true;
            showExitIntent();
        }
    });

    // Mobile: detectar intent de fechar (scroll rápido para cima no topo)
    let lastScrollTime = Date.now();
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const now = Date.now();
        const currentScrollY = window.scrollY;
        const scrollSpeed = Math.abs(currentScrollY - lastScrollY) / (now - lastScrollTime);

        // Se scroll rápido para cima perto do topo
        if (currentScrollY < 100 && scrollSpeed > 2 && !exitIntentTriggered) {
            exitIntentTriggered = true;
            setTimeout(() => {
                if (window.scrollY < 100) {
                    showExitIntent();
                }
            }, 800);
        }

        lastScrollTime = now;
        lastScrollY = currentScrollY;
    });

    function showExitIntent() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        localStorage.setItem('exitIntentShown', 'true');

        // Track event
        trackMetaPixelCustomEvent('ExitIntentShown', {
            time_on_page: Math.floor((Date.now() - pageLoadTime) / 1000),
            scroll_depth: Math.round((window.scrollY / document.documentElement.scrollHeight) * 100)
        });
    }

    // Fechar modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Fechar ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Track click no CTA do exit intent
    modal.querySelector('.exit-cta')?.addEventListener('click', () => {
        trackMetaPixelEvent('Lead', {
            content_name: 'Exit Intent Coupon',
            content_category: 'Lead Generation',
            value: 10,
            currency: 'BRL'
        });
    });
}

// Copy coupon code
function copyCoupon() {
    const code = document.getElementById('couponCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const copyBtn = document.querySelector('.code-copy');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copiado!';
        copyBtn.style.background = '#4CAF50';

        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);

        // Track copy
        trackMetaPixelCustomEvent('CouponCopied', {
            coupon_code: code
        });
    });
}

// Urgency System - Social Proof dinâmico
function initUrgencySystem() {
    const viewersCount = document.getElementById('viewersCount');
    if (!viewersCount) return;

    // Número base + variação aleatória
    function updateViewers() {
        const baseCount = 12;
        const variation = Math.floor(Math.random() * 8) - 4; // -4 a +4
        const count = Math.max(8, Math.min(25, baseCount + variation));

        viewersCount.textContent = count;
    }

    // Atualizar a cada 15-25 segundos
    setInterval(() => {
        updateViewers();
    }, 15000 + Math.random() * 10000);

    // Atualizar imediatamente
    updateViewers();
}

// Personalização por horário e contexto
function initPersonalization() {
    const hour = new Date().getHours();
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const mainCta = document.getElementById('heroMainCta');

    // Personalização por período do dia
    if (hour >= 11 && hour < 14) {
        // Almoço
        mainCta.querySelector('.btn-text').innerHTML = 'Pedir Almoço • Chega em 35min';
        trackMetaPixelCustomEvent('Personalization', {
            type: 'time_of_day',
            period: 'lunch'
        });
    } else if (hour >= 18 && hour < 22) {
        // Jantar
        mainCta.querySelector('.btn-text').innerHTML = 'Pedir Jantar • Chega em 35min';
        trackMetaPixelCustomEvent('Personalization', {
            type: 'time_of_day',
            period: 'dinner'
        });
    } else if (hour >= 22 || hour < 6) {
        // Noite/Madrugada
        const stickyMessage = document.querySelector('.sticky-message');
        if (stickyMessage) {
            stickyMessage.innerHTML = 'Aberto agora! <strong>Entrega em 35min</strong>';
        }
    }

    // Detectar visitante recorrente
    const visits = parseInt(localStorage.getItem('visits') || '0');
    localStorage.setItem('visits', (visits + 1).toString());

    if (visits > 2) {
        // Visitante recorrente
        const urgencyBanner = document.querySelector('.urgency-banner');
        if (urgencyBanner && Math.random() > 0.5) {
            urgencyBanner.innerHTML = '<span class="pulse-dot"></span> <strong>Bem-vindo de volta!</strong> Seus favoritos te esperam 😋';
        }

        trackMetaPixelCustomEvent('Personalization', {
            type: 'returning_visitor',
            visit_count: visits
        });
    }
}

// Animação do botão principal
const heroMainCta = document.getElementById('heroMainCta');
if (heroMainCta) {
    heroMainCta.addEventListener('mouseenter', () => {
        const icon = heroMainCta.querySelector('.btn-icon');
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = '';
        }, 10);
    });
}

// Gallery Mini Carousel - Auto-rotate
function initGalleryCarousel() {
    const carouselContainer = document.querySelector('.gallery-mini-carousel');
    if (!carouselContainer) return;

    const images = carouselContainer.querySelectorAll('.gallery-carousel-img');
    if (images.length === 0) return;

    let currentIndex = 0;

    function showNextImage() {
        // Remove active class from current image
        images[currentIndex].classList.remove('active');

        // Move to next image
        currentIndex = (currentIndex + 1) % images.length;

        // Add active class to next image
        images[currentIndex].classList.add('active');
    }

    // Auto-rotate every 3 seconds
    setInterval(showNextImage, 3000);

    // Track carousel view
    trackMetaPixelCustomEvent('GalleryCarouselView', {
        total_images: images.length
    });
}

// Initialize gallery carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryCarousel);
} else {
    initGalleryCarousel();
}
