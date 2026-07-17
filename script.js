document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       FALLBACK CONFIGURATION (In case siteConfig keys are missing or undefined)
       ========================================================================== */
    const defaultFallbackConfig = {
        navigation: [
            { label: "Início", target: "inicio" },
            { label: "Serviços", target: "servicos" },
            { label: "Resultados", target: "resultados" },
            { label: "Sobre", target: "quem-somos" },
            { label: "Dúvidas", target: "faq" },
            { label: "Contato", target: "contato" }
        ],
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
            title: "Desentupimento e Serviços de Manutenção 24 Horas",
            subtitle: "Soluções rápidas para residências, empresas e condomínios.",
            description: "Conte com uma equipe preparada para atender com agilidade, segurança e qualidade.",
            image: "assets/images/banner.png",
            imageAlt: "Serviços profissionais"
        },
        trustBar: [
            "Atendimento rápido",
            "Equipe especializada",
            "Orçamento sem compromisso",
            "Atendimento residencial e empresarial"
        ],
        beforeAfter: [
            {
                title: "Exemplo de Limpeza",
                beforeImage: "",
                afterImage: "",
                beforeAlt: "Antes",
                afterAlt: "Depois"
            }
        ],
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
        about: {
            eyebrow: "Quem Somos",
            title: "Atendimento profissional local",
            paragraphs: [
                "Oferecemos atendimento rápido e profissional para residências, empresas e condomínios.",
                "Nosso compromisso é resolver cada problema com qualidade, transparência e agilidade."
            ],
            image: "",
            imageAlt: "Equipe ou veículo da empresa"
        },
        equipment: [
            {
                title: "Equipamento Profissional",
                description: "Equipamentos especializados para solucionar seu problema rapidamente.",
                image: "",
                imageAlt: "Equipamento profissional"
            }
        ],
        testimonials: [
            { name: "Cliente A", city: "Sua Cidade", text: "Atendimento rápido e serviço bem executado.", rating: 5 }
        ],
        faq: [
            { question: "Como solicito atendimento?", answer: "Você pode entrar em contato pelo WhatsApp ou telefone." }
        ],
        faqCta: {
            title: "Ainda ficou com dúvidas?",
            description: "Fale diretamente conosco e explique o que está acontecendo.",
            buttonText: "Conversar agora",
            whatsappMessage: "Olá, ainda tenho algumas dúvidas e gostaria de conversar."
        },
        finalCta: {
            title: "Precisa de atendimento agora?",
            description: "Entre em contato e receba atendimento rápido em sua região.",
            mascotImage: "",
            mascotAlt: "Mascote da empresa"
        }
    };

    // Safe getter helper to access nested objects with fallbacks
    function getConfigValue(path, config = (typeof siteConfig !== 'undefined' ? siteConfig : undefined)) {
        if (!config) config = defaultFallbackConfig;
        const keys = path.split('.');
        let current = config;
        let fallback = defaultFallbackConfig;

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
       DYNAMIC THEME & SEO INITIALIZATION
       ========================================================================== */
    const theme = getConfigValue('theme');
    if (theme) {
        if (theme.primary) document.documentElement.style.setProperty('--color-primary', theme.primary);
        if (theme.secondary) document.documentElement.style.setProperty('--color-secondary', theme.secondary);
        if (theme.accent) document.documentElement.style.setProperty('--color-accent', theme.accent);
        if (theme.whatsapp) document.documentElement.style.setProperty('--color-whatsapp', theme.whatsapp);
    }

    document.title = getConfigValue('seo.title');

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
    setMetaTag('twitter:title', null, getConfigValue('seo.title'));
    setMetaTag('twitter:description', null, getConfigValue('seo.description'));

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = window.location.href.split('?')[0].split('#')[0];

    // Set JSON-LD Schema.org LocalBusiness
    let schemaScript = document.querySelector('script[type="application/ld+json"]');
    if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';

        const businessName = getConfigValue('business.name');
        const phonePrimary = getConfigValue('business.phonePrimary');
        const city = getConfigValue('business.city');
        const region = getConfigValue('business.region');
        const heroImg = getConfigValue('hero.image');

        const origin = window.location.origin && window.location.origin !== 'null' ? window.location.origin : '';
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": businessName,
            "image": heroImg ? (origin + "/" + heroImg) : (origin + "/assets/img/share-preview.jpg"),
            "telephone": phonePrimary,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": city,
                "addressRegion": "RS",
                "addressCountry": "BR"
            },
            "areaServed": region,
            "url": window.location.href.split('?')[0].split('#')[0]
        };

        schemaScript.text = JSON.stringify(schemaData);
        document.head.appendChild(schemaScript);
    }

    /* ==========================================================================
       DYNAMIC RENDERERS
       ========================================================================== */

    // 1. Navigation Renderer
    function renderNavigation() {
        const navList = document.getElementById('navigation-list');
        if (!navList) return;
        navList.innerHTML = '';

        let navigation = getConfigValue('navigation');
        if (!Array.isArray(navigation) || navigation.length === 0) {
            navigation = defaultFallbackConfig.navigation;
        }

        navigation.forEach(item => {
            if (!item || !item.label || !item.target) return;

            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'nav-link';
            a.href = `#${item.target}`;
            a.textContent = item.label;

            li.appendChild(a);
            navList.appendChild(li);
        });
    }

    // 2. Hero Image & Badges
    function renderHeroImage() {
        // Render Badges
        const heroBadges = getConfigValue('hero.badges') || [];
        const badgesContainer = document.getElementById('hero-badges-container');
        if (badgesContainer) {
            badgesContainer.innerHTML = '';
            heroBadges.forEach((badgeText, index) => {
                const badgeSpan = document.createElement('span');
                if (index === 0) {
                    badgeSpan.className = 'badge badge-emergency';
                    badgeSpan.innerHTML = `<span class="dot pulse"></span> ${badgeText}`;
                } else {
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

        // Render Media
        const heroMediaContainer = document.getElementById('hero-media-container');
        if (heroMediaContainer) {
            const heroImageSrc = getConfigValue('hero.image');
            const heroImageAlt = getConfigValue('hero.imageAlt') || "Serviços profissionais";

            if (heroImageSrc) {
                heroMediaContainer.innerHTML = `
                    <img src="${heroImageSrc}" alt="${heroImageAlt}" class="hero-image" width="928" height="1152" loading="eager" fetchpriority="high">
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
    }

    // 3. Trust Bar (Fita de Confiança)
    function renderTrustBar() {
        const trustBarContainer = document.getElementById('trust-bar-container');
        if (!trustBarContainer) return;

        let trustBar = getConfigValue('trustBar');
        if (!Array.isArray(trustBar) || trustBar.length === 0) {
            trustBar = defaultFallbackConfig.trustBar;
        }

        trustBarContainer.innerHTML = '';
        trustBar.forEach(item => {
            const div = document.createElement('div');
            div.className = 'hero-trust-item trust-bar-item';
            div.innerHTML = `<span class="check-icon">✓</span> ${item}`;
            trustBarContainer.appendChild(div);
        });
    }

    // 4. Antes e Depois (Before & After)
    function renderBeforeAfter() {
        const beforeAfterGrid = document.getElementById('before-after-grid');
        if (!beforeAfterGrid) return;

        let beforeAfter = getConfigValue('beforeAfter');
        if (!Array.isArray(beforeAfter) || beforeAfter.length === 0) {
            beforeAfter = defaultFallbackConfig.beforeAfter;
        }

        beforeAfterGrid.innerHTML = '';
        beforeAfter.forEach(item => {
            const titleHTML = item.title ? `<div class="before-after-title">${item.title}</div>` : '';

            let beforeHTML = '';
            if (item.beforeImage) {
                beforeHTML = `<img src="${item.beforeImage}" alt="${item.beforeAlt || 'Antes'}" class="before-after-image" loading="lazy" width="600" height="375">`;
            } else {
                beforeHTML = `
                    <div class="image-placeholder before-after-placeholder">
                        <div class="placeholder-content">
                            <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
                                <circle cx="8.5" cy="10.5" r="1.5"/>
                                <polyline points="21 16 16 11 12 15 9 12 3 18"/>
                            </svg>
                            <span>Antes do atendimento</span>
                            <small>[Placeholder de Imagem]</small>
                        </div>
                    </div>
                `;
            }

            let afterHTML = '';
            if (item.afterImage) {
                afterHTML = `<img src="${item.afterImage}" alt="${item.afterAlt || 'Depois'}" class="before-after-image" loading="lazy" width="600" height="375">`;
            } else {
                afterHTML = `
                    <div class="image-placeholder before-after-placeholder">
                        <div class="placeholder-content">
                            <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
                                <circle cx="8.5" cy="10.5" r="1.5"/>
                                <polyline points="21 16 16 11 12 15 9 12 3 18"/>
                            </svg>
                            <span>Depois do atendimento</span>
                            <small>[Placeholder de Imagem]</small>
                        </div>
                    </div>
                `;
            }

            const wrapper = document.createElement('div');
            wrapper.className = 'before-after-item-wrapper';
            wrapper.innerHTML = `
                ${titleHTML}
                <div class="before-after before-after-images">
                    <div class="before-after-col before before-after-card comparison-item">
                        <div class="before-after-badge comparison-label">Antes</div>
                        ${beforeHTML}
                    </div>
                    <div class="before-after-col after before-after-card comparison-item">
                        <div class="before-after-badge comparison-label">Depois</div>
                        ${afterHTML}
                    </div>
                </div>
            `;
            beforeAfterGrid.appendChild(wrapper);
        });
    }

    // 5. Quem Somos (About)
    function renderAboutSection() {
        const aboutContent = document.getElementById('about-content');
        if (!aboutContent) return;

        let aboutData = getConfigValue('about');
        if (!aboutData) {
            aboutData = defaultFallbackConfig.about;
        }

        const eyebrow = aboutData.eyebrow || "Quem Somos";
        const title = aboutData.title || "";
        const paragraphs = Array.isArray(aboutData.paragraphs) ? aboutData.paragraphs : [];
        const image = aboutData.image;
        const imageAlt = aboutData.imageAlt || "Sobre nós";

        let mediaHTML = '';
        if (image) {
            mediaHTML = `
                <img src="${image}" alt="${imageAlt}" class="about-image" loading="lazy" width="600" height="400">
            `;
        } else {
            mediaHTML = `
                <div class="image-placeholder about-placeholder">
                    <div class="placeholder-content">
                        <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <span>Foto da equipe ou veículo</span>
                        <small>[Adicionar imagem institucional]</small>
                    </div>
                </div>
            `;
        }

        aboutContent.innerHTML = `
            <div class="about-text-col">
                <span class="section-subtitle">${eyebrow}</span>
                <h2>${title}</h2>
                ${paragraphs.map(p => `<p class="about-text about-description">${p}</p>`).join('')}
            </div>
            <div class="about-media">
                ${mediaHTML}
            </div>
        `;
    }

    // 6. Equipamentos (Equipment)
    function getEquipmentIconSVG(title) {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('hidro') || lowerTitle.includes('jato')) {
            return `<svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
        }
        if (lowerTitle.includes('máquina') || lowerTitle.includes('rotativa') || lowerTitle.includes('equipamento')) {
            return `<svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
        }
        if (lowerTitle.includes('ferramenta') || lowerTitle.includes('profissional')) {
            return `<svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
        }
        if (lowerTitle.includes('veículo') || lowerTitle.includes('frota') || lowerTitle.includes('atendimento')) {
            return `<svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`;
        }
        return `<svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`;
    }

    function renderEquipment() {
        const equipmentGrid = document.getElementById('equipment-grid');
        if (!equipmentGrid) return;

        let equipments = getConfigValue('equipment');
        if (!Array.isArray(equipments) || equipments.length === 0) {
            equipments = defaultFallbackConfig.equipment;
        }

        equipmentGrid.innerHTML = '';
        equipments.forEach(equip => {
            const card = document.createElement('article');
            card.className = 'equipment-card';

            let mediaHTML = '';
            if (equip.image) {
                mediaHTML = `
                    <div class="equipment-media">
                        <img src="${equip.image}" alt="${equip.imageAlt || equip.title}" class="equipment-image" loading="lazy" width="300" height="200">
                    </div>
                `;
            } else {
                mediaHTML = `
                    <div class="image-placeholder equipment-placeholder">
                        <div class="placeholder-content">
                            ${getEquipmentIconSVG(equip.title)}
                            <span>${equip.title}</span>
                            <small>[Placeholder de Foto]</small>
                        </div>
                    </div>
                `;
            }

            card.innerHTML = `
                ${mediaHTML}
                <div class="equipment-info">
                    <h3>${equip.title}</h3>
                    <p>${equip.description}</p>
                </div>
            `;
            equipmentGrid.appendChild(card);
        });
    }

    // 7. FAQ CTA WhatsApp Box
    function renderFaqCta() {
        const faqCtaContainer = document.getElementById('faq-cta');
        if (!faqCtaContainer) return;

        let faqCta = getConfigValue('faqCta');
        if (!faqCta) {
            faqCta = defaultFallbackConfig.faqCta;
        }

        faqCtaContainer.innerHTML = `
            <p>${faqCta.title || "Ainda ficou com dúvidas?"}</p>
            <span>${faqCta.description || "Entre em contato pelo WhatsApp."}</span>
            <a href="#" class="btn btn-whatsapp" data-whatsapp-link="true" data-whatsapp-msg="${faqCta.whatsappMessage || ''}" target="_blank" rel="noopener noreferrer">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.12 1.05 11.499 1.05c-5.447 0-9.873 4.372-9.877 9.802-.001 1.774.48 3.509 1.394 5.086L2.025 21.91l6.19-1.616c-.001.001 0 0 0 0zM17.65 14.86c-.29-.145-1.71-.846-1.974-.942-.266-.097-.459-.145-.653.145-.193.29-.747.942-.916 1.135-.168.193-.337.218-.627.072-1.737-.867-2.906-1.536-4.065-3.525-.3-.513.3-.477.859-1.597.09-.182.045-.34-.022-.485-.068-.145-.653-1.573-.895-2.153-.235-.568-.476-.491-.653-.5-.17-.008-.363-.01-.555-.01-.193 0-.507.072-.772.362-.266.29-1.013.99-1.013 2.415 0 1.424 1.037 2.803 1.182 2.996.145.193 2.04 3.115 4.939 4.368.69.298 1.229.476 1.649.609.693.22 1.324.19 1.822.115.556-.084 1.711-.7 1.952-1.376.24-.677.24-1.256.168-1.376-.07-.12-.264-.193-.553-.337z"/>
                </svg>
                ${faqCta.buttonText || "Conversar agora"}
            </a>
        `;
    }

    // 8. CTA Final & Mascote
    function renderFinalCta() {
        const finalCtaContent = document.getElementById('final-cta-content');
        if (!finalCtaContent) return;

        let finalCta = getConfigValue('finalCta');
        if (!finalCta) {
            finalCta = defaultFallbackConfig.finalCta;
        }

        let mascotHTML = '';
        if (finalCta.mascotImage) {
            mascotHTML = `
            <div class="image-placeholder final-cta-mascot-placeholder">
                    <div class="placeholder-content">
                        <img src="${finalCta.mascotImage}" alt="${finalCta.mascotAlt || 'Mascote'}" class="cta-mascot-image" width="220" height="220" loading="lazy">
                    </div>
                </div>
            `;
        } else {
            mascotHTML = `
                <div class="image-placeholder final-cta-mascot-placeholder">
                    <div class="placeholder-content">
                        <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z"/>
                        </svg>
                        <span>Imagem do mascote</span>
                        <small>Adicionar imagem posteriormente</small>
                    </div>
                </div>
            `;
        }

        finalCtaContent.innerHTML = `
            <h2>${finalCta.title || "Precisa de atendimento agora?"}</h2>
            <p>${finalCta.description || "Entre em contato e receba atendimento rápido."}</p>
            
            <div class="cta-content-wrapper">
                <div class="cta-mascot-container">
                    ${mascotHTML}
                </div>
                
                <div class="cta-buttons">
                    <a href="#" class="btn btn-whatsapp btn-large" data-whatsapp-link="true" target="_blank" rel="noopener noreferrer">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.12 1.05 11.499 1.05c-5.447 0-9.873 4.372-9.877 9.802-.001 1.774.48 3.509 1.394 5.086L2.025 21.91l6.19-1.616c-.001.001 0 0 0 0zM17.65 14.86c-.29-.145-1.71-.846-1.974-.942-.266-.097-.459-.145-.653.145-.193.29-.747.942-.916 1.135-.168.193-.337.218-.627.072-1.737-.867-2.906-1.536-4.065-3.525-.3-.513.3-.477.859-1.597.09-.182.045-.34-.022-.485-.068-.145-.653-1.573-.895-2.153-.235-.568-.476-.491-.653-.5-.17-.008-.363-.01-.555-.01-.193 0-.507.072-.772.362-.266.29-1.013.99-1.013 2.415 0 1.424 1.037 2.803 1.182 2.996.145.193 2.04 3.115 4.939 4.368.69.298 1.229.476 1.649.609.693.22 1.324.19 1.822.115.556-.084 1.711-.7 1.952-1.376.24-.677.24-1.256.168-1.376-.07-.12-.264-.193-.553-.337z"/>
                        </svg>
                        Chamar no WhatsApp
                    </a>
                    <a href="#" class="btn btn-phone btn-large" data-phone-primary-link="true" id="cta-phone-btn">
                        Ligar Agora
                    </a>
                </div>
            </div>
        `;
    }

    // 9. Standard Services Renderer
    function renderServices() {
        const services = getConfigValue('services') || [];
        const servicesGrid = document.getElementById('services-grid');
        if (!servicesGrid) return;
        servicesGrid.innerHTML = '';

        function getServiceIconSVG(title) {
            const lowerTitle = title.toLowerCase();
            if (lowerTitle.includes('resid') || lowerTitle.includes('casa') || lowerTitle.includes('domés')) {
                return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
            }
            if (lowerTitle.includes('comerc') || lowerTitle.includes('empresa') || lowerTitle.includes('escrit') || lowerTitle.includes('loja')) {
                return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
            }
            if (lowerTitle.includes('fossa') || lowerTitle.includes('limp') || lowerTitle.includes('higien')) {
                return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v12M6 12h12"/></svg>`;
            }
            if (lowerTitle.includes('gordura') || lowerTitle.includes('caixa') || lowerTitle.includes('reserv')) {
                return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>`;
            }
            if (lowerTitle.includes('encan') || lowerTitle.includes('hidr') || lowerTitle.includes('repar') || lowerTitle.includes('conserto')) {
                return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
            }
            if (lowerTitle.includes('infil') || lowerTitle.includes('vaza') || lowerTitle.includes('gote')) {
                return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`;
            }
            if (lowerTitle.includes('pint') || lowerTitle.includes('refor')) {
                return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5"/><path d="M21.39 12c-.79-.79-2.07-.79-2.86 0L12 18.5V21h2.5l6.89-6.89c.79-.79.79-2.07 0-2.86z"/></svg>`;
            }
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
        }

        services.forEach(service => {
            const card = document.createElement('article');
            card.className = `service-card ${service.featured ? 'highlighted-card' : ''}`;
            const badgePopularHTML = service.featured ? `<span class="badge badge-popular">Mais Procurado</span>` : '';
            card.innerHTML = `
                ${badgePopularHTML}
                <div class="card-icon-wrapper">${getServiceIconSVG(service.title)}</div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            `;
            servicesGrid.appendChild(card);
        });
    }

    // 10. Trust Items (Differentials) Renderer
    function renderTrustItems() {
        const trustItems = getConfigValue('trustItems') || [];
        const whyGrid = document.getElementById('why-choose-grid');
        if (!whyGrid) return;
        whyGrid.innerHTML = '';

        function getTrustIconSVG(index) {
            const icons = [
                `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
                `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
                `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
                `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 10V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5M10 14v4M14 14v4"/></svg>`,
                `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
                `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
            ];
            return icons[index % icons.length];
        }

        trustItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'why-card';
            card.innerHTML = `
                <div class="why-icon-wrapper">${getTrustIconSVG(index)}</div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            `;
            whyGrid.appendChild(card);
        });
    }

    // 11. Gallery Renderer
    function renderGallery() {
        const galleryItems = getConfigValue('gallery') || [];
        const galleryGrid = document.getElementById('gallery-grid');
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';

        galleryItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            if (item.image) {
                card.innerHTML = `<img src="${item.image}" alt="${item.label}" class="gallery-image" loading="lazy">`;
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
    // 12. Location and Google Maps Renderer
    function renderLocation() {
        const titleEl = document.getElementById('location-title');
        const descEl = document.getElementById('location-description');
        if (titleEl) titleEl.textContent = getConfigValue('location.title') || 'Área de Atendimento';
        if (descEl) descEl.textContent = getConfigValue('location.description') || 'Atendemos Santa Maria e região.';

        const city = getConfigValue('business.city') || 'Santa Maria';
        const region = getConfigValue('business.region') || 'Santa Maria';
        const locationListContainer = document.getElementById('location-list-container');
        if (locationListContainer) {
            locationListContainer.innerHTML = `
                <li>📍 ${city} (Todos os bairros e zonas)</li>
                <li>📍 Cidades vizinhas e toda a região de ${region}</li>
                <li>📍 Condomínios fechados, empresas e chácaras sob consulta</li>
            `;
        }

        const mapsEmbedUrl = getConfigValue('location.mapsEmbedUrl');
        const mapsExternalUrl = getConfigValue('location.mapsExternalUrl');
        const address = getConfigValue('location.address');
        const mapWrapper = document.getElementById('map-wrapper');

        if (mapWrapper) {
            if (mapsEmbedUrl) {
                if (mapsEmbedUrl.trim().startsWith('<iframe')) {
                    const srcMatch = mapsEmbedUrl.match(/src=["']([^"']+)["']/);
                    const iframeSrc = srcMatch ? srcMatch[1] : '';
                    if (iframeSrc) {
                        mapWrapper.innerHTML = `<iframe src="${iframeSrc}" class="map-iframe" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mapa de Atendimento"></iframe>`;
                    } else {
                        mapWrapper.innerHTML = mapsEmbedUrl;
                        const iframe = mapWrapper.querySelector('iframe');
                        if (iframe) {
                            iframe.className = 'map-iframe';
                            if (!iframe.getAttribute('title')) iframe.setAttribute('title', 'Mapa de Atendimento');
                        }
                    }
                } else {
                    mapWrapper.innerHTML = `<iframe src="${mapsEmbedUrl}" class="map-iframe" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mapa de Atendimento"></iframe>`;
                }
            } else {
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

        // Render address and external link caption
        const mapCaption = document.querySelector('.map-caption');
        if (mapCaption) {
            let captionHTML = '';
            if (address) {
                captionHTML += `<span>📍 ${address}</span>`;
            }
            if (mapsExternalUrl) {
                captionHTML += `<br><a href="${mapsExternalUrl}" target="_blank" rel="noopener noreferrer" class="map-external-link">Visualizar endereço no Google Maps</a>`;
            }
            if (captionHTML) {
                mapCaption.innerHTML = captionHTML;
            }
        }
    }

    // 13. Testimonials Renderer
    function renderTestimonials() {
        const testimonials = getConfigValue('testimonials') || [];
        const testimonialsGrid = document.getElementById('testimonials-grid');
        if (!testimonialsGrid) return;
        testimonialsGrid.innerHTML = '';

        testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
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

    // 14. FAQ Accordion Renderer
    function renderFaq() {
        const faqs = getConfigValue('faq') || [];
        const faqList = document.getElementById('faq-list');
        if (!faqList) return;
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

    // 15. Render Footer Trust Items
    function renderFooterTrust() {
        const footerTrustContainer = document.getElementById('footer-trust-container');
        const trustItems = getConfigValue('trustItems') || [];
        if (footerTrustContainer && trustItems.length > 0) {
            footerTrustContainer.innerHTML = '';
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
    }

    // 16. Simple Text Attributes Config Binder
    function bindTextConfig() {
        document.querySelectorAll('[data-config]').forEach(element => {
            const path = element.getAttribute('data-config');
            const value = getConfigValue(path);
            if (value !== undefined) {
                element.textContent = value;
            }
        });
    }

    /* ==========================================================================
       DYNAMIC BINDERS (WhatsApp, Phone, Instagram)
       ========================================================================== */
    function bindWhatsappLinks() {
        const whatsappRaw = getConfigValue('business.whatsappRaw');
        const whatsappMsg = getConfigValue('business.whatsappMessage');
        document.querySelectorAll('[data-whatsapp-link="true"]').forEach(link => {
            const customMsg = link.getAttribute('data-whatsapp-msg') || whatsappMsg;
            link.href = `https://wa.me/${whatsappRaw}?text=${encodeURIComponent(customMsg)}`;
        });
    }

    function bindPhoneLinks() {
        const phonePrimaryRaw = getConfigValue('business.phonePrimaryRaw');
        document.querySelectorAll('[data-phone-primary-link="true"]').forEach(link => {
            link.href = `tel:+${phonePrimaryRaw}`;
        });
    }

    function bindInstagramLinks() {
        const instagramUrl = getConfigValue('business.instagramUrl');
        document.querySelectorAll('[data-instagram-link="true"]').forEach(link => {
            link.href = instagramUrl;
        });
    }

    /* ==========================================================================
       INTERACTIVE INITIALIZERS
       ========================================================================== */

    // Header Mobile Navigation Control
    function initHeaderNavigation() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!menuToggle || !navMenu) return;

        function openMenu() {
            menuToggle.classList.add('active');
            navMenu.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.setAttribute('aria-label', 'Fechar menu');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
            document.body.style.overflow = '';
        }

        function toggleMenu() {
            const isOpen = menuToggle.classList.contains('active');
            if (isOpen) {
                closeMenu();
                menuToggle.focus();
            } else {
                openMenu();
            }
        }

        menuToggle.addEventListener('click', toggleMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
                menuToggle.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active')) {
                const header = document.querySelector('.main-header');
                if (header && !header.contains(e.target)) {
                    closeMenu();
                }
            }
        });
    }

    // Scrollspy to highlight active menu item
    function initScrollSpy() {
        const navLinks = document.querySelectorAll('.nav-link');
        let navigation = getConfigValue('navigation');
        if (!Array.isArray(navigation) || navigation.length === 0) {
            navigation = defaultFallbackConfig.navigation;
        }

        const targets = navigation.map(item => item.target).filter(Boolean);
        const observedSections = [];

        targets.forEach(target => {
            const el = document.getElementById(target);
            if (el) observedSections.push(el);
        });

        if (observedSections.length === 0) return;

        const navObserverOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('is-active');
                        link.classList.remove('active'); // fallback compat
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('is-active');
                        }
                    });
                }
            });
        }, navObserverOptions);

        observedSections.forEach(section => {
            navObserver.observe(section);
        });
    }

    // FAQ Accordion click events
    function initFaqAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const faqAnswer = faqItem.querySelector('.faq-answer');
                const isActive = faqItem.classList.contains('active');

                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = null;
                    }
                });

                if (!isActive) {
                    faqItem.classList.add('active');
                    faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                } else {
                    faqItem.classList.remove('active');
                    faqAnswer.style.maxHeight = null;
                }
            });
        });
    }

    /* ==========================================================================
       INITIALIZATION SEQUENCE
       ========================================================================== */

    // 1. Dynamic Rendering (Must run first)
    renderNavigation();
    renderHeroImage();
    renderTrustBar();
    renderBeforeAfter();
    renderAboutSection();
    renderEquipment();
    renderFaqCta();
    renderFinalCta();

    renderServices();
    renderTrustItems();
    renderGallery();
    renderLocation();
    renderTestimonials();
    renderFaq();
    renderFooterTrust();
    bindTextConfig();

    // 2. Data Bindings (WhatsApp messages rely on rendered custom content attrs)
    bindWhatsappLinks();
    bindPhoneLinks();
    bindInstagramLinks();

    // 3. UI Functionality & Listeners
    initHeaderNavigation();
    initScrollSpy();
    initFaqAccordion();

    // Header Shadow Scroll Observer
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

    // Floating WhatsApp Avoidance Observer
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
