/**
 * CONFIGURAÇÃO DO SITE - TEMPLATE LOCAL BUSINESS
 * 
 * Altere os valores abaixo para personalizar o site para um novo cliente.
 * Não é necessário mexer nos arquivos HTML, CSS ou JS.
 */

const siteConfig = {
  // Configurações de Deploy (staging / production)
  deployment: {
    environment: "production",
    productionDomain: "desentupidoraje.com.br",
    productionUrl: "https://desentupidoraje.com.br",
    pagesUrl: "https://desentupidoraje.pages.dev",
    allowIndexing: true
  },

  // Configuração do GTM (Google Tag Manager)
  analytics: {
    googleTagManagerId: "GTM-K9G7FTGG"
  },

  // Configuração da navegação principal do header
  navigation: [
    { label: "Início", target: "inicio" },
    { label: "Serviços", target: "servicos" },
    { label: "Resultados", target: "resultados" },
    { label: "Sobre", target: "quem-somos" },
    { label: "Dúvidas", target: "faq" },
    { label: "Contato", target: "contato" }
  ],

  // Dados fundamentais da empresa
  business: {
    name: "DESENTUPIDORA J.E",
    segment: "Serviços Sanitários",
    slogan: "Atendimento rápido, profissional e confiável.",
    city: "Santa Maria - RS",
    region: "Santa Maria e Região",
    cnpj: "CNPJ 44.921.652/0001-34",
    phonePrimary: "(55) 99676-6820",
    //phoneSecondary: "(55) 996766820",
    phonePrimaryRaw: "5555996766820",
    whatsappRaw: "5555996766820",
    whatsappMessage: "Olá, preciso de atendimento. (Via Site)",
    instagram: "@desentupidora_je",
    instagramUrl: "https://www.instagram.com/desentupidora.je/"
  },

  // Configurações de Localização e Mapa
  location: {
    title: "Atendimento em Santa Maria e Região",
    description: "Atendemos residências, empresas, condomínios e chácaras.",
    address: "Rua Nahir Zambrano da Costa, 8 - Chácara das Flores, Santa Maria - RS",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3466.807492396557!2d-53.82725832355695!3d-29.667360113894663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95023355e5b9b86f%3A0x77aa1a7f551a1bd2!2sR.%20Nahir%20Zambrano%20da%20Costa%2C%208%20-%20Ch%C3%A1cara%20das%20Flores%2C%20Santa%20Maria%20-%20RS%2C%2097043-742!5e0!3m2!1spt-BR!2sbr!4v1784155405285!5m2!1spt-BR!2sbr",
    mapsExternalUrl: "https://www.google.com/maps/search/?api=1&query=Rua+Nahir+Zambrano+da+Costa+8+Santa+Maria+RS"
  },

  // Tema de Cores do Site (Opcional)
  // Caso queira mudar a paleta do site de acordo com a marca do cliente
  theme: {
    primary: "#0a2240",       // Cor principal (ex: Azul escuro)
    secondary: "#d90429",     // Cor secundária/botões (ex: Vermelho emergência)
    accent: "#ffb703",        // Cor de destaque/estrelas (ex: Amarelo)
    whatsapp: "#25d366"       // Cor do WhatsApp
  },

  // Configurações de SEO da Página
  seo: {
    title: "DESENTUPIDORA J.E | Atendimento Profissional",
    description: "DESENTUPIDORA J.E com atendimento rápido e profissional em Santa Maria e Região.",
    keywords: "serviços locais, atendimento profissional, DESENTUPIDORA J.E, Santa Maria e Região"
  },

  // Conteúdo da Seção Hero (Topo da Página)
  hero: {
    badges: ["Atendimento rápido", "Orçamento fácil"],
    title: "Desentupimento e Serviços de Manutenção 24 Horas",
    subtitle: "Soluções rápidas para residências, empresas e condomínios.",
    description: "Desentupimentos, Eletricista, Encanador, Infiltrações, Limpeza de pátios e prédios, Limpeza de Caixa d'água e de calhas, Pintura e mão de obras em geral.",
    image: "assets/img/banner-hero.jpg", // Caminho para imagem real (ex: "assets/img/hero.jpg"). Se vazio, exibe o placeholder.
    imageAlt: "Serviços profissionais da Desentupidora J.E."
  },

  // Lista de Serviços Oferecidos
  // "featured: true" destaca o card no layout (estilo "Mais Procurado")
  services: [
    
    {
      title: "Desentupimento de esgoto em geral",
      description: "Desentupimento de pias, ralos, vasos sanitários e caixas de gordura.",
      featured: true
    },
    {
      title: "Limpeza de fossas",
      description: "Limpeza de fossas sépticas e sumidouros.",
      featured: true
    },
    {
      title: "Limpeza de caixas d'água",
      description: "Limpeza de caixas d'água residenciais e comerciais.",
      featured: true
    }
    
  ],

  // Diferenciais / Por que escolher
  trustItems: [
    {
      title: "Atendimento rápido",
      description: "Resposta ágil para solicitações urgentes."
    },
    {
      title: "Equipe experiente",
      description: "Profissionais preparados para executar o serviço."
    },
    {
      title: "Pagamento facilitado",
      description: "Condições flexíveis conforme o atendimento."
    },
    {
      title: "Atendimento local",
      description: "Atuação em Santa Maria e Região."
    },
    {
      title: "Orçamento objetivo",
      description: "Comunicação clara antes da execução."
    },
    {
      title: "Serviço confiável",
      description: "Foco em qualidade, segurança e satisfação."
    }
  ],

  // Galeria de Fotos Recentes
  gallery: [
    {
      label: "Caixa de gordura antes do reparo",
      image: "./assets/img/evidencias/caixa-gordura-inicio.webp"
    },
    {
      label: "Reparo e vedação da caixa de gordura",
      image: "./assets/img/evidencias/caixa-gordura-andamento.webp"
    },
    {
      label: "Caixa de gordura com serviço finalizado",
      image: "./assets/img/evidencias/caixa-gordura-concluido.webp"
    },
    {
      label: "Peça substituída no registro do banheiro",
      image: "./assets/img/evidencias/troca-registro-privada-peca.webp"
    },
    {
      label: "Troca de registro em banheiro",
      image: "./assets/img/evidencias/troca-registro-privada-atendimento.webp"
    },
    {
      label: "Troca de registro em andamento",
      image: "./assets/img/evidencias/troca-registro-privada-andamento.webp"
    },
    {
      label: "Acabamento do novo registro",
      image: "./assets/img/evidencias/troca-registro-privada-acabamento.webp"
    },
    {
      label: "Registro de banheiro finalizado",
      image: "./assets/img/evidencias/troca-registro-privada-concluido.webp"
    },
    {
      label: "Histórico: antes do serviço",
      image: "./assets/img/antes.jpg"
    },
    {
      label: "Histórico: durante o atendimento",
      image: "./assets/img/durante.jpg"
    },
    {
      label: "Histórico: serviço finalizado",
      image: "./assets/img/depois.jpg"
    },
    {
      label: "Histórico: caixa de gordura",
      image: "./assets/img/caixa_gordura.jpeg"
    },
    {
      label: "Histórico: caixa de gordura antes",
      image: "./assets/img/caixa_gordura_antes.jpeg"
    },
    {
      label: "Histórico: caixa de gordura em atendimento",
      image: "./assets/img/caixa_gordura_1.jpeg"
    },
    {
      label: "Histórico: caixa de gordura finalizada",
      image: "./assets/img/caixa_gordura_3.jpeg"
    },
    {
      label: "Histórico: serviço J.E.",
      image: "./assets/img/je_000.jpg"
    },
    {
      label: "Histórico: atendimento em tubulação",
      image: "./assets/img/je_sv01.jpg"
    },
    {
      label: "Equipamento: hidrojato",
      image: "./assets/img/hidrojato.jpg"
    },
    {
      label: "Equipamentos profissionais",
      image: "./assets/img/equipamentos.jpg"
    }
  ],

  galleryPosts: [
    {
      label: "Limpeza de caixa d'água",
      image: "./assets/img/evidencias/limpeza-caixa-dagua.webp"
    },
    {
      label: "Conserto de tubulação de caixa de gordura",
      image: "./assets/img/evidencias/post-caixa-gordura.webp"
    }
  ],

  // Avaliações dos Clientes (Depoimentos)
  // NOTA IMPORTANTE: Substituir por avaliações reais antes da publicação final.
  // testimonials: [
  //   {
  //     name: "Carlos Silva",
  //     city: "Santa Maria - RS",
  //     text: "Atendimento rápido e serviço muito bem executado. Resolveram o problema de forma muito profissional e limpa.",
  //     rating: 5
  //   },
  //   {
  //     name: "Mariana Souza",
  //     city: "Santa Maria - RS",
  //     text: "Equipe extremamente educada, pontual e profissional. Preço justo e ótimo atendimento no pós-serviço.",
  //     rating: 5
  //   },
  //   {
  //     name: "Pedro Rodrigues",
  //     city: "Santa Maria - RS",
  //     text: "Resolveu o problema com muita agilidade. Equipe técnica muito bem preparada.",
  //     rating: 5
  //   }
  // ],

  // Perguntas Frequentes (FAQ)
  faq: [
    {
      question: "Como solicito atendimento?",
      answer: "Você pode entrar em contato diretamente pelo WhatsApp."
    },
    {
      question: "Vocês atendem empresas?",
      answer: "Sim, atendemos residências, empresas, comércios e condomínios com a mesma eficiência."
    },
    {
      question: "O orçamento é rápido?",
      answer: "Sim, buscamos entender o problema e orientar o cliente sobre os valores e procedimentos de forma ágil."
    },
    {
      question: "Qual região de atendimento?",
      answer: "Atendemos Santa Maria e Região com equipe local de prontidão."
    }
  ],

  trustBar: [
    "Atendimento rápido",
    "Equipe especializada",
    "Orçamento sem compromisso",
    "Atendimento residencial e empresarial"
  ],

  beforeAfter: [
    {
      title: "Manutenção em caixa de gordura",
      beforeImage: "./assets/img/evidencias/caixa-gordura-inicio.webp",
      afterImage: "./assets/img/evidencias/caixa-gordura-concluido.webp",
      beforeAlt: "Caixa de gordura antes do reparo e vedação",
      afterAlt: "Caixa de gordura após reparo e vedação"
    },
    {
      title: "Desentupimento de ralo",
      beforeImage: "assets/img/antes.jpg",
      afterImage: "assets/img/depois.jpg",
      beforeAlt: "Ralo antes do desentupimento",
      afterAlt: "Ralo após o desentupimento"
    }
  ],

  about: {
    eyebrow: "Quem Somos",
    title: "Atendimento profissional em Santa Maria e Região",
    paragraphs: [
      "A Desentupidora J.E. atua em Santa Maria e Região oferecendo atendimento rápido e profissional para residências, empresas e condomínios.",
      "Nosso compromisso é resolver cada problema com qualidade, transparência e agilidade."
    ],
    image: "assets/img/banner_about.jpg",
    imageAlt: "Equipe ou veículo da Desentupidora J.E."
  },

  equipment: [
    {
      title: "Hidrojato",
      description: "Equipamento de alta pressão para limpeza e desobstrução de tubulações.",
      image: "./assets/img/hidrojato.jpg",
      imageAlt: "Equipamento de hidrojato"
    },
    {
      title: "Ferramentas profissionais",
      description: "Ferramentas adequadas para serviços hidráulicos, elétricos e manutenção.",
      image: "assets/img/equipamentos.jpg",
      imageAlt: "Ferramentas profissionais"
    }
  ],

  faqCta: {
    title: "Ainda ficou com dúvidas?",
    description: "Fale diretamente conosco e explique o que está acontecendo.",
    buttonText: "Conversar agora",
    whatsappMessage: "Olá, ainda tenho algumas dúvidas e gostaria de conversar."
  },

  finalCta: {
    title: "Precisa de atendimento agora?",
    description: "Entre em contato e receba atendimento rápido em Santa Maria e Região.",
    mascotImage: "./assets/img/mascote.webp",
    mascotAlt: "Mascote da Desentupidora J.E."
  }
};
