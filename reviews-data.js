// Dados das 30 avaliações do Google - Rosa Oriental
const reviewsData = [
    { name: "Mariana Silva", initial: "M", text: "Melhor sushi de Blumenau! A qualidade do salmão é impecável e a apresentação é linda. Sempre peço e nunca me decepciono.", date: "Há 2 semanas", stars: 5 },
    { name: "Ricardo Oliveira", initial: "R", text: "Entrega super rápida e o sushi chega perfeito! O hot roll empanado é sensacional, crocante do jeito certo. Recomendo muito!", date: "Há 1 mês", stars: 5 },
    { name: "Carla Mendes", initial: "C", text: "Experiência incrível! Pedimos o combo especial e veio com uma apresentação digna de restaurante premium. Valeu cada centavo!", date: "Há 3 semanas", stars: 5 },
    { name: "Paulo Santos", initial: "P", text: "Atendimento impecável! Sempre que peço vem muito bem embalado e o sabor é excepcional. Virou meu delivery preferido!", date: "Há 1 semana", stars: 5 },
    { name: "Juliana Costa", initial: "J", text: "Os temakis são deliciosos! Ingredientes frescos e de qualidade. A apresentação é linda, realmente consomem com os olhos primeiro!", date: "Há 4 dias", stars: 5 },

    { name: "Ana Paula", initial: "A", text: "Pedimos para um jantar especial e foi perfeito! A qualidade surpreendeu. Com certeza voltaremos a pedir!", date: "Há 2 meses", stars: 5 },
    { name: "Fernando Lima", initial: "F", text: "Salmão fresco de verdade! Dá para sentir a qualidade em cada peça. O melhor sushi delivery da região sem dúvida.", date: "Há 5 dias", stars: 5 },
    { name: "Beatriz Alves", initial: "B", text: "Primeira vez que peço e já virei fã! A embalagem é linda e mantém tudo fresquinho. O sabor é incrível!", date: "Há 1 semana", stars: 5 },
    { name: "Lucas Rodrigues", initial: "L", text: "Combos muito bem montados e com ótimo preço. A qualidade é superior a muitos restaurantes que já fui. Recomendo!", date: "Há 3 dias", stars: 5 },
    { name: "Tatiana Souza", initial: "T", text: "Simplesmente perfeito! Pedimos para comemorar aniversário e superou todas as expectativas. Obrigada Rosa Oriental!", date: "Há 2 semanas", stars: 5 },

    { name: "Gabriel Martins", initial: "G", text: "Hot Philadelphia é o melhor que já comi! Crocante por fora e cremoso por dentro. Perfeito!", date: "Há 1 mês", stars: 5 },
    { name: "Camila Ferreira", initial: "C", text: "Entrega pontual e sushi maravilhoso! O molho é delicioso e vem em boa quantidade. Adorei!", date: "Há 10 dias", stars: 5 },
    { name: "Roberto Silva", initial: "R", text: "Melhor custo-benefício de Blumenau! Qualidade premium com preço justo. Parabéns pelo trabalho!", date: "Há 2 semanas", stars: 5 },
    { name: "Patrícia Santos", initial: "P", text: "Os niguiris são perfeitos! Arroz no ponto e peixe fresquíssimo. Vou pedir toda semana!", date: "Há 6 dias", stars: 5 },
    { name: "Diego Costa", initial: "D", text: "Sashimi de salmão que derrete na boca! Qualidade impecável. O melhor da cidade!", date: "Há 1 semana", stars: 5 },

    { name: "Amanda Oliveira", initial: "A", text: "Pedimos o combo para 2 pessoas e veio muito bem servido! Tudo delicioso e fresco. Amamos!", date: "Há 3 semanas", stars: 5 },
    { name: "Marcos Pereira", initial: "M", text: "Temaki gigante e delicioso! Vale muito a pena. Ingredientes de primeira qualidade!", date: "Há 5 dias", stars: 5 },
    { name: "Renata Lima", initial: "R", text: "Melhor experiência de delivery! Chegou rápido, bem embalado e com uma apresentação linda. Nota 10!", date: "Há 2 dias", stars: 5 },
    { name: "Vinícius Almeida", initial: "V", text: "Sushi de altíssima qualidade! O salmão é fresquíssimo e os rolls são bem montados. Recomendo!", date: "Há 1 mês", stars: 5 },
    { name: "Larissa Barbosa", initial: "L", text: "Pedi pelo app e chegou super rápido! Tudo perfeito, desde a embalagem até o sabor. Parabéns!", date: "Há 1 semana", stars: 5 },

    { name: "Eduardo Santos", initial: "E", text: "Hot roll empanado crocante e recheio generoso! Simplesmente perfeito. Melhor de Blumenau!", date: "Há 4 dias", stars: 5 },
    { name: "Carolina Mendes", initial: "C", text: "Combos bem variados e preço justo! A qualidade é excelente. Viramos clientes fiéis!", date: "Há 2 semanas", stars: 5 },
    { name: "Thiago Rocha", initial: "T", text: "Salmão de qualidade premium! Dá para ver que usam ingredientes de primeira. Vale muito a pena!", date: "Há 10 dias", stars: 5 },
    { name: "Daniela Costa", initial: "D", text: "Pedimos para festa de família e todos adoraram! Apresentação linda e sabor incrível. Obrigada!", date: "Há 1 mês", stars: 5 },
    { name: "André Silva", initial: "A", text: "Melhor combinado que já pedi! Variedade, qualidade e sabor excepcionais. Virou meu favorito!", date: "Há 6 dias", stars: 5 },

    { name: "Bruna Oliveira", initial: "B", text: "Temaki com flores comestíveis é lindo demais! Além de bonito, é delicioso. Adorei a criatividade!", date: "Há 3 dias", stars: 5 },
    { name: "Felipe Martins", initial: "F", text: "Atendimento excelente e sushi de primeira! Entrega rápida e tudo chegou perfeito. Recomendo!", date: "Há 1 semana", stars: 5 },
    { name: "Isabela Santos", initial: "I", text: "Qualidade que supera muitos restaurantes! O salmão é fresquíssimo e a apresentação impecável!", date: "Há 2 semanas", stars: 5 },
    { name: "Rafael Costa", initial: "R", text: "Melhor sushi delivery de Blumenau sem dúvida! Sabor, qualidade e rapidez. Tudo perfeito!", date: "Há 5 dias", stars: 5 },
    { name: "Vanessa Lima", initial: "V", text: "Experiência gastronômica incrível! Cada peça é uma obra de arte. Parabéns Rosa Oriental!", date: "Há 1 semana", stars: 5 }
];
