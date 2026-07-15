document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       FALLBACK CONFIGURATION (In case siteConfig keys are missing or undefined)
       ========================================================================== */
    const defaultFallbackConfig = {
        business: {
            name: "Empresa Local",
            segment: "Serviços Locais",
            slogan: "Atendimento rápido, profissional e confiável.",
            city: "Sua Cidade",
            region: "Sua Cidade e Região",
            phonePrimary: "(00) 00000-0000",
            phoneSecondary: "(00) 00000-0000",
            phonePrimaryRaw: "5500000000000",
            whatsappRaw: "5500000000000",
            whatsappMessage: "Olá, preciso de atendimento.",
            instagram: "@empresa.local",
            instagramUrl: "#",
            googleMapsEmbed: ""
        },
        seo: {
            title: "Empresa Local | Atendimento Profissional",
            description: "Empresa local com atendimento rápido e profissional em Sua Cidade e Região.",
            keywords: "serviços locais, atendimento profissional, empresa local"
        },
        hero: {
            badges: ["Atendimento rápido", "Orçamento fácil"],
            title: "Atendimento profissional para sua necessidade",
            subtitle: "Soluções rápidas para residências, empresas e condomínios.",
            description: "Conte com uma equipe preparada para atender com agilidade, segurança e qualidade.",
            image: ""
        },
        services: [
            { title: "Serviço 1", description: "Descrição do serviço oferecido pelo negócio local.", featured: true },
            { title: "Serviço 2", description: "Descrição do serviço oferecido pelo negócio local.", featured: false }
        ],
        trustItems: [
            { title: "Atendimento rápido", description: "Resposta ágil para solicitações urgentes." },
            { title: "Equipe experiente", description: "Profissionais preparados para executar o serviço." }
        ],
        gallery: [
            { label: "Antes do serviço", image: "" },
            { label: "Durante o atendimento", image: "" },
            { label: "Serviço finalizado", image: "" }
        ],
        testimonials: [
            { name: "Cliente A", city: "Sua Cidade", text: "Atendimento rápido e serviço bem executado.", rating: 5 }
        ],
        faq: [
            { question: "Como solicito atendimento?", answer: "Você pode entrar em contato pelo WhatsApp ou telefone." }
        ]
    };

    // Safe getter helper to access nested objects with fallbacks
    function getConfigValue(path, config = (typeof siteConfig !== 'undefined' ? siteConfig : undefined)) {
        if (!config) config = defaultFallbackConfig;
        const keys = path.split('.');
        let current = config;
        let fallback = defaultFallbackConfig;
        
        // Resolve target config
        for (const key of keys) {
            if (current && current[key] !== undefined) {
                current = current[key];
            } else {
                current = undefined;
            }
            if (fallback && fallback[key] !== undefined) {
                fallback = fallback[key];
            } else {
                fallback = undefined;
            }
        }
        return current !== undefined ? current : fallback;
    }

    /* ==========================================================================
       DYNAMIC THEME INITIALIZATION
       ========================================================================== */
    const theme = getConfigValue('theme');
    if (theme) {
        if (theme.primary) document.documentElement.style.setProperty('--color-primary', theme.primary);
        if (theme.secondary) document.documentElement.style.setProperty('--color-secondary', theme.secondary);
        if (theme.accent) document.documentElement.style.setProperty('--color-accent', theme.accent);
        if (theme.whatsapp) document.documentElement.style.setProperty('--color-whatsapp', theme.whatsapp);
    }

    /* ==========================================================================
       SEO INITIALIZATION
       ========================================================================== */
    document.title = getConfigValue('seo.title');
    
    // Helper to safely set/create meta tags
    function setMetaTag(name, property, value) {
        let element;
        if (name) {
            element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
        } else if (property) {
            element = document.querySelector(`meta[property="${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', property);
                document.head.appendChild(element);
            }
        }
        if (element && value) {
            element.setAttribute('content', value);
        }
    }

    setMetaTag('description', null, getConfigValue('seo.description'));
    setMetaTag('keywords', null, getConfigValue('seo.keywords'));
    setMetaTag(null, 'og:title', getConfigValue('seo.title'));
    setMetaTag(null, 'og:description', getConfigValue('seo.description'));

    /* ==========================================================================
       DOM INJECTION - simple texts (data-config)
       ========================================================================== */
    document.querySelectorAll('[data-config]').forEach(element => {
        const path = element.getAttribute('data-config');
        const value = getConfigValue(path);
        if (value !== undefined) {
            element.textContent = value;
        }
    });

    /* ==========================================================================
       DOM INJECTION - links (WhatsApp, Phone, Instagram)
       ========================================================================== */
    const whatsappRaw = getConfigValue('business.whatsappRaw');
    const whatsappMsg = getConfigValue('business.whatsappMessage');
    const phonePrimaryRaw = getConfigValue('business.phonePrimaryRaw');
    const instagramUrl = getConfigValue('business.instagramUrl');

    // Bind WhatsApp links
    document.querySelectorAll('[data-whatsapp-link="true"]').forEach(link => {
        // Use custom message if defined on element data-whatsapp-msg
        const customMsg = link.getAttribute('data-whatsapp-msg') || whatsappMsg;
        link.href = `https://wa.me/${whatsappRaw}?text=${encodeURIComponent(customMsg)}`;
    });

    // Bind Phone links
    document.querySelectorAll('[data-phone-primary-link="true"]').forEach(link => {
        link.href = `tel:+${phonePrimaryRaw}`;
    });

    // Bind Instagram links
    document.querySelectorAll('[data-instagram-link="true"]').forEach(link => {
        link.href = instagramUrl;
    });

    /* ==========================================================================
       HERO BADGES & HERO MEDIA
       ========================================================================== */
    const heroBadges = getConfigValue('hero.badges') || [];
    const badgesContainer = document.getElementById('hero-badges-container');
    if (badgesContainer) {
        badgesContainer.innerHTML = '';
        heroBadges.forEach((badgeText, index) => {
            const badgeSpan = document.createElement('span');
            if (index === 0) {
                // First badge gets emergency red design with pulse dot
                badgeSpan.className = 'badge badge-emergency';
                badgeSpan.innerHTML = `<span class="dot pulse"></span> ${badgeText}`;
            } else {
                // Other badges get cards yellow accent design with credit card icon
                badgeSpan.className = 'badge badge-card';
                badgeSpan.innerHTML = `
                    <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="5" width="20" height="14" rx="2" ry="2"/>
                        <line x1="2" y1="10" x2="22" y2="10"/>
                    </svg>
                    ${badgeText}
                `;
            }
            badgesContainer.appendChild(badgeSpan);
        });
    }

    // Hero image or placeholder
    const heroImageSrc = getConfigValue('hero.image');
    const heroMediaContainer = document.getElementById('hero-media-container');
    if (heroMediaContainer) {
        if (heroImageSrc) {
            heroMediaContainer.innerHTML = `
                <img src="${heroImageSrc}" alt="Equipe do negócio local" class="hero-image" loading="lazy">
            `;
        } else {
            heroMediaContainer.innerHTML = `
                <div class="image-placeholder hero-placeholder">
                    <div class="placeholder-content">
                        <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
                            <circle cx="8.5" cy="10.5" r="1.5"/>
                            <polyline points="21 16 16 11 12 15 9 12 3 18"/>
                        </svg>
                        <span>Foto da equipe ou veículo</span>
                        <small>[Placeholder de Imagem 4:5]</small>
                    </div>
                </div>
            `;
        }
    }

    /* ==========================================================================
       SERVICES GRID RENDERER
       ========================================================================== */
    // SVG icons mapping for common service categories (based on title keywords)
    function getServiceIconSVG(title) {
        const lowerTitle = title.toLowerCase();
        
        // Residential / House icon
        if (lowerTitle.includes('resid') || lowerTitle.includes('casa') || lowerTitle.includes('domés')) {
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
        }
        // Commercial / Office building icon
        if (lowerTitle.includes('comerc') || lowerTitle.includes('empresa') || lowerTitle.includes('escrit') || lowerTitle.includes('loja')) {
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
        }
        // Clean/water drop/fossa icon
        if (lowerTitle.includes('fossa') || lowerTitle.includes('limp') || lowerTitle.includes('higien')) {
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v12M6 12h12"/></svg>`;
        }
        // Cylinder/Caixa/Database-like icon for Caixa de Gordura/Água
        if (lowerTitle.includes('gordura') || lowerTitle.includes('caixa') || lowerTitle.includes('reserv')) {
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>`;
        }
        // Wrench/Plumber/Encanador icon
        if (lowerTitle.includes('encan') || lowerTitle.includes('hidr') || lowerTitle.includes('repar') || lowerTitle.includes('conserto')) {
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
        }
        // Water drop icon for Infiltrações
        if (lowerTitle.includes('infil') || lowerTitle.includes('vaza') || lowerTitle.includes('gote')) {
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`;
        }
        // Paint brush icon
        if (lowerTitle.includes('pint') || lowerTitle.includes('refor')) {
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5"/><path d="M21.39 12c-.79-.79-2.07-.79-2.86 0L12 18.5V21h2.5l6.89-6.89c.79-.79.79-2.07 0-2.86z"/></svg>`;
        }
        // Default clean tool checklist icon
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
    }

    const services = getConfigValue('services') || [];
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
        servicesGrid.innerHTML = '';
        services.forEach(service => {
            const card = document.createElement('article');
            card.className = `service-card ${service.featured ? 'highlighted-card' : ''}`;
            
            const badgePopularHTML = service.featured ? `<span class="badge badge-popular">Mais Procurado</span>` : '';
            const iconHTML = getServiceIconSVG(service.title);

            card.innerHTML = `
                ${badgePopularHTML}
                <div class="card-icon-wrapper">
                    ${iconHTML}
                </div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            `;
            servicesGrid.appendChild(card);
        });
    }

    /* ==========================================================================
       TRUST ITEMS (DIFFERENTIALS) GRID RENDERER
       ========================================================================== */
    // Default SVGs for the differentials based on common order/title
    function getTrustIconSVG(index) {
        const icons = [
            // 1. Clock (Atendimento 24h/rápido)
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
            // 2. Users (Equipe experiente)
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
            // 3. Card (Pagamento facilitado)
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
            // 4. House (Atendimento local / residencial)
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 10V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5M10 14v4M14 14v4"/></svg>`,
            // 5. File/Paper (Orçamento sem compromisso/rápido)
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
            // 6. Map pin (Localização/cidade)
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
        ];
        return icons[index % icons.length];
    }

    const trustItems = getConfigValue('trustItems') || [];
    const whyGrid = document.getElementById('why-choose-grid');
    if (whyGrid) {
        whyGrid.innerHTML = '';
        trustItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'why-card';
            card.innerHTML = `
                <div class="why-icon-wrapper">
                    ${getTrustIconSVG(index)}
                </div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            `;
            whyGrid.appendChild(card);
        });
    }

    /* ==========================================================================
       GALLERY GRID RENDERER
       ========================================================================== */
    const galleryItems = getConfigValue('gallery') || [];
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        galleryGrid.innerHTML = '';
        galleryItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            
            if (item.image) {
                card.innerHTML = `
                    <img src="${item.image}" alt="${item.label}" class="gallery-image" loading="lazy">
                `;
            } else {
                card.innerHTML = `
                    <div class="image-placeholder gallery-placeholder">
                        <div class="placeholder-content">
                            <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
                                <circle cx="8.5" cy="10.5" r="1.5"/>
                                <polyline points="21 16 16 11 12 15 9 12 3 18"/>
                            </svg>
                            <span>${item.label}</span>
                            <small>[Placeholder de Imagem 16:10]</small>
                        </div>
                    </div>
                `;
            }
            galleryGrid.appendChild(card);
        });
    }

    /* ==========================================================================
       LOCATION LIST AND MAP RENDERER
       ========================================================================== */
    const city = getConfigValue('business.city');
    const region = getConfigValue('business.region');
    const locationListContainer = document.getElementById('location-list-container');
    if (locationListContainer) {
        locationListContainer.innerHTML = `
            <li>📍 ${city} (Todos os bairros e zonas)</li>
            <li>📍 Cidades vizinhas e toda a região de ${region}</li>
            <li>📍 Condomínios fechados, empresas e chácaras sob consulta</li>
        `;
    }

    const mapEmbed = getConfigValue('business.googleMapsEmbed');
    const mapWrapper = document.getElementById('map-wrapper');
    if (mapWrapper) {
        if (mapEmbed) {
            // Render Google Maps embed (stripping any script tags for safety)
            if (mapEmbed.startsWith('<iframe')) {
                // If it is full iframe HTML, inject it
                mapWrapper.innerHTML = mapEmbed;
                const iframe = mapWrapper.querySelector('iframe');
                if (iframe) {
                    iframe.className = 'map-iframe';
                }
            } else {
                // If it is just a URL, create the iframe
                mapWrapper.innerHTML = `
                    <iframe src="${mapEmbed}" class="map-iframe" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                `;
            }
        } else {
            // Render placeholder
            mapWrapper.innerHTML = `
                <div class="image-placeholder map-placeholder">
                    <div class="placeholder-content">
                        <svg class="placeholder-icon map-pin-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <span>Mapa do Google será inserido aqui</span>
                        <small>[Placeholder do Mapa]</small>
                    </div>
                </div>
            `;
        }
    }

    /* ==========================================================================
       TESTIMONIALS GRID RENDERER
       ========================================================================== */
    const testimonials = getConfigValue('testimonials') || [];
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (testimonialsGrid) {
        testimonialsGrid.innerHTML = '';
        testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            
            // Build stars string (e.g. ★★★★★)
            const starsFilled = '★'.repeat(testimonial.rating || 5);
            const starsEmpty = '☆'.repeat(5 - (testimonial.rating || 5));

            card.innerHTML = `
                <div class="testimonial-stars">${starsFilled}${starsEmpty}</div>
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <span class="author-name">${testimonial.name}</span>
                    <span class="author-location">${testimonial.city}</span>
                </div>
            `;
            testimonialsGrid.appendChild(card);
        });
    }

    /* ==========================================================================
       FAQ ACCORDION GRID RENDERER
       ========================================================================== */
    const faqs = getConfigValue('faq') || [];
    const faqList = document.getElementById('faq-list');
    if (faqList) {
        faqList.innerHTML = '';
        faqs.forEach(faq => {
            const item = document.createElement('div');
            item.className = 'faq-item';
            item.innerHTML = `
                <button class="faq-question">
                    <span>${faq.question}</span>
                    <span class="faq-icon-toggle">
                        <span class="line horizontal"></span>
                        <span class="line vertical"></span>
                    </span>
                </button>
                <div class="faq-answer">
                    <p>${faq.answer}</p>
                </div>
            `;
            faqList.appendChild(item);
        });
    }

    /* ==========================================================================
       FOOTER TRUST BAR RENDERER
       ========================================================================== */
    const footerTrustContainer = document.getElementById('footer-trust-container');
    if (footerTrustContainer && trustItems.length > 0) {
        footerTrustContainer.innerHTML = '';
        // Take the first 3 items or up to 3 trust items
        const footerTrusts = trustItems.slice(0, 3);
        footerTrusts.forEach((item, index) => {
            const span = document.createElement('span');
            span.className = 'trust-item';
            span.textContent = `✓ ${item.title}`;
            footerTrustContainer.appendChild(span);

            if (index < footerTrusts.length - 1) {
                const divider = document.createElement('span');
                divider.className = 'trust-divider';
                divider.textContent = '|';
                footerTrustContainer.appendChild(divider);
            }
        });
    }

    /* ==========================================================================
       INTERACTIVE FUNCTIONALITY
       ========================================================================== */

    /* 1. Mobile Menu Toggle */
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            const isExpanded = menuToggle.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* 2. FAQ Accordion Click Listeners */
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQ items first
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = null;
                }
            });

            // Toggle current FAQ item
            if (!isActive) {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
            } else {
                faqItem.classList.remove('active');
                faqAnswer.style.maxHeight = null;
            }
        });
    });

    /* 3. Active Link on Scroll (Intersection Observer) */
    const sections = document.querySelectorAll('section[id]');
    const navObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    /* 4. Header Shadow on Scroll */
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                header.style.borderBottomColor = 'rgba(0, 0, 0, 0.05)';
            } else {
                header.style.boxShadow = 'var(--shadow-sm)';
                header.style.borderBottomColor = 'var(--color-border)';
            }
        });
    }

    /* 5. Floating WhatsApp Button Footer Avoidance */
    const whatsappFloating = document.getElementById('whatsappFloating');
    const footer = document.querySelector('.main-footer');

    if (whatsappFloating && footer) {
        const footerObserverOptions = {
            root: null,
            threshold: 0,
            rootMargin: '0px'
        };

        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    whatsappFloating.classList.add('scrolled-to-footer');
                } else {
                    whatsappFloating.classList.remove('scrolled-to-footer');
                }
            });
        }, footerObserverOptions);

        footerObserver.observe(footer);
    }
});
