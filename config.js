/**
 * CONFIGURAÇÃO DO SITE - TEMPLATE LOCAL BUSINESS
 * 
 * Altere os valores abaixo para personalizar o site para um novo cliente.
 * Não é necessário mexer nos arquivos HTML, CSS ou JS.
 */

const siteConfig = {
  // Dados fundamentais da empresa
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
    googleMapsEmbed: "" // Iframe do Google Maps (Opcional - se vazio, exibe o placeholder)
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
    title: "Empresa Local | Atendimento Profissional",
    description: "Empresa local com atendimento rápido e profissional em Sua Cidade e Região.",
    keywords: "serviços locais, atendimento profissional, empresa local, Sua Cidade"
  },

  // Conteúdo da Seção Hero (Topo da Página)
  hero: {
    badges: ["Atendimento rápido", "Orçamento fácil"],
    title: "Atendimento profissional para sua necessidade",
    subtitle: "Soluções rápidas para residências, empresas e condomínios.",
    description: "Conte com uma equipe preparada para atender com agilidade, segurança e qualidade.",
    image: "" // Caminho para imagem real (ex: "assets/img/hero.jpg"). Se vazio, exibe o placeholder.
  },

  // Lista de Serviços Oferecidos
  // "featured: true" destaca o card no layout (estilo "Mais Procurado")
  services: [
    {
      title: "Serviço Principal 1",
      description: "Descrição detalhada do primeiro serviço principal oferecido pelo negócio.",
      featured: true
    },
    {
      title: "Serviço Principal 2",
      description: "Descrição detalhada do segundo serviço principal oferecido pelo negócio.",
      featured: true
    },
    {
      title: "Serviço Principal 3",
      description: "Descrição detalhada do terceiro serviço principal oferecido pelo negócio.",
      featured: true
    },
    {
      title: "Serviço Complementar 1",
      description: "Descrição curta de um serviço complementar.",
      featured: false
    },
    {
      title: "Serviço Complementar 2",
      description: "Descrição curta de outro serviço complementar.",
      featured: false
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
      description: "Atuação em Sua Cidade e Região."
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
      label: "Antes do serviço",
      image: "" // Caminho para imagem (ex: "assets/img/galeria-1.jpg"). Se vazio, exibe o placeholder.
    },
    {
      label: "Durante o atendimento",
      image: "" // Caminho para imagem (ex: "assets/img/galeria-2.jpg"). Se vazio, exibe o placeholder.
    },
    {
      label: "Serviço finalizado",
      image: "" // Caminho para imagem (ex: "assets/img/galeria-3.jpg"). Se vazio, exibe o placeholder.
    }
  ],

  // Avaliações dos Clientes (Depoimentos)
  // NOTA IMPORTANTE: Substituir por avaliações reais antes da publicação final.
  testimonials: [
    {
      name: "Carlos Silva",
      city: "Sua Cidade",
      text: "Atendimento rápido e serviço muito bem executado. Resolveram o problema de forma muito profissional e limpa.",
      rating: 5
    },
    {
      name: "Mariana Souza",
      city: "Sua Cidade",
      text: "Equipe extremamente educada, pontual e profissional. Preço justo e ótimo atendimento no pós-serviço.",
      rating: 5
    },
    {
      name: "Pedro Rodrigues",
      city: "Sua Cidade",
      text: "Resolveu o problema com muita agilidade. Equipe técnica muito bem preparada.",
      rating: 5
    }
  ],

  // Perguntas Frequentes (FAQ)
  faq: [
    {
      question: "Como solicito atendimento?",
      answer: "Você pode entrar em contato diretamente pelo WhatsApp ou nos ligar pelo telefone de plantão."
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
      answer: "Atendemos Sua Cidade e Região com equipe local de prontidão."
    }
  ]
};
