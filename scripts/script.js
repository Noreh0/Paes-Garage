/* ==========================================================================
   PAES GARAGE — script.js
   Organização: cada bloco cuida de uma responsabilidade só e é iniciado
   a partir de initPaesGarage(), executado em DOMContentLoaded.
   ========================================================================== */

(function () {
    "use strict";

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    /* ------------------------------------------------------------------
       DADOS: projetos (configurador) e anúncios
       Troque as imagens/textos abaixo pelos dados reais de cada carro.
       ------------------------------------------------------------------ */
    const PROJECTS = [
        {
            id: "corsa",
            name: "GM Corsa 1.0",
            tagline: "Compacto de rua, retrabalhado para o dia a dia com carinho de garagem.",
            cover: "./images/capas/corsa.png",
            gallery: ["./images/carros/corsa/corsa-paes.jpg",
                "./images/carros/corsa/corsa-paes-frente-superior-direita.jpg",
                "./images/carros/corsa/corsa-paes-frente-superior.jpg",
                "./images/carros/corsa/corsa-paes-frente.jpg",
                "./images/carros/corsa/corsa-paes-lateral-direita.jpg",
                "./images/carros/corsa/corsa-paes-lateral-esquerda.jpg",
                "./images/carros/corsa/corsa-paes-porta-malas.jpg",
                "./images/carros/corsa/corsa-paes-traseira.jpg",
            ],
            specs: [
                { label: "Motor", value: "1.0 8V" },
                { label: "Câmbio", value: "Manual" },
                { label: "Ano", value: "2003" },
                { label: "Status", value: "Projeto em preparação Turbo" },
            ],
            description:
                "Projeto dailycar contínua focado em confiabilidade mecânica e acabamento de detalhes, agora conta com uma turbina. Colocamos a turbina dele em casa com o passo a passo no nosso perfil do insta, mas, mesmo assim, sem perder a essência do nosso primeiro carro e projeto.",
        },
        {
            id: "peugeot-307",
            name: "Peugeot 307",
            tagline: "Conforto de rodovia com uma pitada de personalidade europeia.",
            cover: "./images/capas/peugeot-307-preto.png",
            gallery: [
                "./images/carros/peugeot-preto-307/peugeot_307-preto.jpg",
                "./images/carros/peugeot-preto-307/peugeot_307-preto-frente-lateral.jpg",
                "./images/carros/peugeot-preto-307/peugeot_307-preto-frente-superior.jpg",
                "./images/carros/peugeot-preto-307/peugeot_307-preto-frente.jpg",
                "./images/carros/peugeot-preto-307/peugeot_307-preto-lateral.jpg",
                "./images/carros/peugeot-preto-307/peugeot_307-preto-traseira-ponteiras.jpg",
                "./images/carros/peugeot-preto-307/peugeot_307-preto-interna-volante.jpg",
                "./images/carros/peugeot-preto-307/peugeot_307-preto-interna-bancos.jpg",
                "./images/carros/peugeot-preto-307/peugeot_307-preto-motor.jpg",
            ],
            specs: [
                { label: "Motor", value: "2.0 16V" },
                { label: "Câmbio", value: "Manual" },
                { label: "Ano", value: "2008" },
                { label: "Status", value: "Esse já foi" },
            ],
            description:
                "Um clássico francês mantido com atenção total — o primeiro Frânces que tivemos por aqui. O objetivo aqui era curtir o conforto de origem entregando uma condução suave, mas também feita para o trackday.",
        },
        {
            id: "clio",
            name: "Renault Clio 1.6 Privilége 16v",
            tagline: "Hatch ágil, motor 16 válvulas revisado para render sorriso em toda troca de marcha.",
            cover: "./images/capas/clio-01-16v.png",
            gallery: [
                "./images/carros/clio-verde/clio-4p-azul.jpg",
                "./images/carros/clio-verde/clio-4p-verde-dianteira.jpg",
                "./images/carros/clio-verde/clio-4p-verde-lateral.jpg",
                "./images/carros/clio-verde/clio-4p-verde-traseira.jpg",
            ],
            specs: [
                { label: "Motor", value: "1.6 16V" },
                { label: "Câmbio", value: "Manual" },
                { label: "Ano", value: "2011" },
                { label: "Status", value: "Esse já foi" },
            ],
            description:
                "Projeto voltado a performance de baixo custo: suspensão preparada, motor 16v e escapamento esportivo para liberar o som característico do motor.",
        },
        {
            id: "gol-branco-turbo",
            name: "Volkwagem Gol 1.8 Turbo",
            tagline: "Hatch com bom desempenho. Força em retomadas e robustez mecânica, agora com uma surpresinha que pode enganar despercebidos.",
            cover: "./images/capas/gol-turbo-branco.png",
            gallery: ["./images/carros/gol-branco/gol-branco-turbo.jpg",
                "./images/carros/gol-branco/gol-branco-turbo-lateral-frente.jpg",
                "./images/carros/gol-branco/gol-branco-turbo-lateral-esquerda.jpg",
                "./images/carros/gol-branco/gol-branco-turbo-frente.jpg",
                "./images/carros/gol-branco/gol-branco-turbo-lateral.jpg",
                "./images/carros/gol-branco/gol-branco-turbo-traseira.jpg",
                "./images/carros/gol-branco/gol-branco-turbo-rodas.jpg",
                "./images/carros/gol-branco/gol-branco-turbo-motor.jpg",
                "./images/carros/gol-branco/gol-branco-turbo-interna-banco.jpg",
                "./images/carros/gol-branco/gol-branco-turbo-interna-cambio.jpg",
                "./images/carros/gol-branco/gol-branco-turbo-interna-radio.jpg",
                "./images/carros/gol-branco/gol-branco-turbo-interna-volante.jpg",
            ],
            specs: [
                { label: "Motor", value: "1.8 8V" },
                { label: "Câmbio", value: "Manual" },
                { label: "Ano", value: "2005" },
                { label: "Status", value: "Esse já foi" },
            ],
            description:
                "Projeto turbo baixo custo: suspensão preparada, motor 8v e escapamento em inox, além de ter passado por alguns conjuntos de rodas iconicos.",
        },
        {
            id: "c4-vts",
            name: "Citroën C4 VTS 2.0 16v",
            tagline: "Design francês icônico, aerodinâmica de cupê e um motor 2.0 aspirado com alma de rally.",
            cover: "./images/capas/vtr-cactus.png",
            gallery: ["./images/carros/c4vts-prata-cactus/c4vts-cinza-dianteira.jpg",
                "./images/carros/c4vts-prata-cactus/c4vts-cinza-lateral-esquerda.jpg",
                "./images/carros/c4vts-prata-cactus/c4vts-cinza-traseira-esquerda.jpg",
                "./images/carros/c4vts-prata-cactus/c4vts-cinza-rodacactus.jpg",
                "./images/carros/c4vts-prata-cactus/c4vts-cinza-rodas.jpg",
                "./images/carros/c4vts-prata-cactus/c4vts-cinza-melhor-foto.jpg",
                "./images/carros/c4vts-prata-cactus/c4vts-cinza-capo-aberto.jpg",
                "./images/carros/c4vts-prata-cactus/c4vts-cinza-malas-aberto.jpg",
                "./images/carros/c4vts-prata-cactus/c4vts-cinza-aero.jpg",
                "./images/carros/c4vts-prata-cactus/c4vts-cinza-interna.jpg",
                "./images/carros/c4vts-prata-cactus/c4vts-cinza-interna-banco.jpg",
                "./images/carros/c4vts-prata-cactus/c4vts-cinza-motor.jpg",
            ],
            specs: [
                { label: "Motor", value: "2.0 16V (180cv)" },
                { label: "Câmbio", value: "Manual" },
                { label: "Ano", value: "2007" },
                { label: "Status", value: "Esse já foi" },
            ],
            description:
                "Um purista e raro hot hatch francês de duas portas: traz o marcante vidro traseiro bipartido, aerofólio original, volante de cubo fixo e o comportamento dinâmico afiado de um verdadeiro VTS.",
        },
        {
            id: "voyage-quadrado",
            name: "Volkswagen Voyage GLS 1.8S",
            tagline: "O clássico sedã quadrado: robustez alemã com a pegada esportiva do motor AP.",
            cover: "./images/capas/vw-voyage.png",
            gallery: [
                "./images/carros/voyage-preto/voyage-preto.jpg",
                "./images/carros/voyage-preto/voyage-preto-traseira.jpg",
                "./images/carros/voyage-preto/voyage-preto-dianteira.jpg",
                "./images/carros/voyage-preto/voyage-preto-traseira-direita.jpg",
            ],
            specs: [
                { label: "Motor", value: "1.8 AP (Aspirado)" },
                { label: "Câmbio", value: "Manual" },
                { label: "Ano", value: "1992" },
                { label: "Status", value: "Esse já foi" },
            ],
            description:
                "Raro exemplar em estado de coleção. Este Voyage preserva as linhas retas icônicas, complementadas pelas desejadas rodas Orbitais e suspensão ligeiramente rebaixada. Equipado com o lendário motor AP 1.8S, oferece uma condução purista e nostálgica, ideal para quem busca um clássico nacional pronto para rodar e curtir.",
        },
        {
            id: "peugeot-308-vermelho",
            name: "Peugeot 308 Feline 2.0 16v",
            tagline: "Hatch médio de respeito, com teto panorâmico e torque de sobra para a cidade e estrada.",
            cover: "./images/capas/peugeot-vermelho-308.png",
            gallery: [
                "./images/carros/peugeot-308-vermelho/308-vermelho.jpg",
                "./images/carros/peugeot-308-vermelho/308-vermelho-lateral.jpg",
                "./images/carros/peugeot-308-vermelho/308-vermelho-emblema.jpg",
                "./images/carros/peugeot-308-vermelho/308-vermelho-frente-aberto.jpg",
                "./images/carros/peugeot-308-vermelho/308-vermelho-frente-direita.jpg",
                "./images/carros/peugeot-308-vermelho/308-vermelho-frente.jpg",
                "./images/carros/peugeot-308-vermelho/308-vermelho-traseira-superior.jpg",
                "./images/carros/peugeot-308-vermelho/308-vermelho-traseira-direita.jpg",
                "./images/carros/peugeot-308-vermelho/308-vermelho-motor.jpg",
                "./images/carros/peugeot-308-vermelho/308-vermelho-interna.jpg",
            ],
            specs: [
                { label: "Motor", value: "2.0 16V" },
                { label: "Câmbio", value: "Manual" },
                { label: "Ano", value: "2013" },
                { label: "Status", value: "Esse já foi" },
            ],
            description:
                "Este exemplar na cor Vermelho Babylone destaca-se pelo teto panorâmico (Cielo) e o robusto motor 2.0 aspirado. Recebeu um upgrade visual com rodas esportivas pretas, alinhando conforto premium e um visual exclusivo para quem busca um carro completo e estiloso na cidade.",
        },
        {
            id: "sandero-rs-branco",
            name: "Renault Sandero R.S. 2.0",
            tagline: "O último hot hatch puro-sangue nacional, focado na diversão e no desempenho em pista.",
            cover: "./images/capas/sandero-rs-branco.png",
            gallery: [
                "./images/carros/sandero-rs-branco/sandero.jpg",
                "./images/carros/sandero-rs-branco/sandero-dianteira.jpg",
                "./images/carros/sandero-rs-branco/sandero-trackday-clio.jpg",
                "./images/carros/sandero-rs-branco/sandero-dianteira-direita.jpg",
                "./images/carros/sandero-rs-branco/sandero-traseira-esquerda.jpg",
                "./images/carros/sandero-rs-branco/sandero-trackday-roda.jpg",
                "./images/carros/sandero-rs-branco/sandero-interna.jpg",
                "./images/carros/sandero-rs-branco/sandero-interna-limpa.jpg",
            ],
            specs: [
                { label: "Motor", value: "2.0 16V Aspirado (F4R)" },
                { label: "Câmbio", value: "Manual" },
                { label: "Ano", value: "2017" },
                { label: "Status", value: "Esse já foi" },
            ],
            description:
                "Este exemplar na cor Branco Glacier representa a essência da divisão Renault Sport. Equipado com um motor 2.0 aspirado de 150 cv e um câmbio manual de 6 marchas de relações curtas, oferece uma experiência de pilotagem visceral. Destaca-se pelas rodas pretas de 17 polegadas exclusivas, suspensão preparada pela R.S. e kit aerodinâmico esportivo, pronto para entregar sorrisos em track days ou em serras sinuosas.",
        },
        {
            id: "peugeot-308-chumbo",
            name: "Peugeot 308 2.0 16v Manual",
            tagline: "Hatch médio com a rara e desejada combinação do motor 2.0 aspirado e câmbio manual, unindo desempenho e controle total.",
            cover: "./images/capas/peugeot-chumbo-308.png",
            gallery: [
                "./images/carros/peugeot-308-chumbo/peugeot_308-chumbo.jpg",
                "./images/carros/peugeot-308-chumbo/peugeot_308-frente-direita.jpg",
                "./images/carros/peugeot-308-chumbo/peugeot_308-frente-esquerda.jpg",
                "./images/carros/peugeot-308-chumbo/peugeot_308-frente-farol.jpg",
                "./images/carros/peugeot-308-chumbo/peugeot_308-traseira.jpg",
                "./images/carros/peugeot-308-chumbo/peugeot_308-roda.jpg",
            ],
            specs: [
                { label: "Motor", value: "2.0 16V" },
                { label: "Câmbio", value: "Manual" },
                { label: "Ano", value: "2013" },
                { label: "Status", value: "Esse já foi" },
            ],
            description:
                "Este exemplar na elegante cor Cinza Grafite destaca-se pela configuração entusiasta: o robusto motor 2.0 acoplado a um câmbio manual. Uma combinação rara no mercado, que oferece uma condução mais envolvente e direta. Equipado com as rodas de liga leve originais e com a frente clássica do modelo, é a escolha ideal para quem busca o conforto de um hatch médio sem abrir mão do prazer de dirigir à moda antiga.",
        },
        {
            id: "ds3-stage3",
            name: "Citroën DS3 1.6 THP (Stage 3)",
            tagline: "Pocket rocket francês levado ao limite: estilo premium e performance brutal com preparação Stage 3.",
            cover: "./images/capas/ds3-branco.png",
            gallery: [
                "./images/carros/ds3-branco/ds3-citroen.jpg",
                "./images/carros/ds3-branco/ds3-citroen-ladojpg.jpg",
                "./images/carros/ds3-branco/ds3-citroen-lateral-esquerda.jpg",
                "./images/carros/ds3-branco/ds3-citroen-dianteira-esquerda.jpg",
                "./images/carros/ds3-branco/ds3-citroen-dianteira-new-wheels.jpg",
                "./images/carros/ds3-branco/ds3-citroen-new-wheels.jpg",
                "./images/carros/ds3-branco/ds3-citroen-pista.jpg",
                "./images/carros/ds3-branco/ds3-citroen-traseira-lanterna.jpg",
            ],
            specs: [
                { label: "Motor", value: "1.6 THP Turbo (Stage 3)" },
                { label: "Câmbio", value: "Manual" },
                { label: "Ano", value: "2013" },
                { label: "Status", value: "Esse já foi" },
            ],
            description:
                "Este exemplar traz o visual icônico do pocket rocket francês com pintura branca e teto contraste, além das belas rodas multi-raios combinando. Com projeto focado em alto desempenho, a preparação Stage 3 entrega resposta imediata de turbo e aceleração forte, mantendo o excelente acerto de chassi e o charme esportivo característico da linha DS.",
        },
        {
            id: "clio-16-privilege",
            name: "Renault Clio 1.6 Privilège 16v",
            tagline: "Pocket rocket de entrada: o aclamado motor K4M em um hatch leve, ágil e divertido de guiar.",
            cover: "./images/capas/clio-preto.png",
            gallery: [
                "./images/carros/clio-preto/clio-preto.jpg",
                "./images/carros/clio-preto/clio-preto-frente-direita.jpg",
                "./images/carros/clio-preto/clio-preto-traseira-esquerda.jpg",
                "./images/carros/clio-preto/clio-preto-roda.jpg",
                "./images/carros/clio-preto/clio-preto-motor.jpg",
                "./images/carros/clio-preto/clio-preto-interna.jpg",
            ],
            specs: [
                { label: "Motor", value: "1.6 16V (K4M)" },
                { label: "Câmbio", value: "Manual" },
                { label: "Ano", value: "2005" },
                { label: "Status", value: "Projeto em andamento" },
            ],
            description:
                "Este exemplar na cor preta combina o topo de linha da versão Privilège com um toque entusiasta. Equipado com o valente motor K4M 1.6 16v e peso reduzido, ganhou um belo upgrade com rodas esportivas multi-raios e postura mais baixa, resultando em um conjunto dinâmico perfeito para quem procura desempenho de baixo custo e diversão garantida.",
        },
        {
            id: "sandero-rs-preto",
            name: "Renault Sandero R.S. 2.0",
            tagline: "O cobiçado esportivo nacional em versão stealth: motor 2.0 aspirado e câmbio manual para máxima diversão.",
            cover: "./images/capas/Sandero-preto.png",
            gallery: [
                "./images/carros/sandero-rs-preto/sandero-preto.jpg",
                "./images/carros/sandero-rs-preto/sandero-preto-traseira.jpg",
                "./images/carros/sandero-rs-preto/sandero-preto-frente.jpg",
                "./images/carros/sandero-rs-preto/sandero-preto-frente-esquerda.jpg",
                "./images/carros/sandero-rs-preto/sandero-preto-direita-superior.jpg",
                "./images/carros/sandero-rs-preto/sandero-preto-interna.jpg",
            ],
            specs: [
                { label: "Motor", value: "2.0 16V Aspirado (F4R)" },
                { label: "Câmbio", value: "Manual" },
                { label: "Ano", value: "2020" },
                { label: "Status", value: "Esse já foi" },
            ],
            description:
                "Este exemplar na marcante cor preta entrega o visual sóbrio e agressivo 'murdered out', destacando as rodas pretas aro 17 e os gráficos R.S. nas laterais. Desenvolvido pela Renault Sport, traz o consagrado motor 2.0 aspirado de 150 cv, suspensão firme e freios a disco nas quatro rodas, sendo a pedida perfeita tanto para o uso diário quanto para curtir em track days.",
        },
        {
            id: "c4-vtr",
            name: "Citroën C4 VTR 2.0 16V",
            tagline: "Coupe francês icônico com design atemporal, aerodinâmica marcante e a verdadeira essência esportiva dos anos 2000.",
            cover: "./images/capas/c4-vtr-original.png",
            gallery: [
                "./images/carros/c4vts-prata/c4vts-prata.jpg",
                "./images/carros/c4vts-prata/c4vts-prata-lateral-esquerda.jpg",
                "./images/carros/c4vts-prata/c4vts-prata-roda.jpg",
                "./images/carros/c4vts-prata/c4vts-prata-lanterna-traseira.jpg",
                "./images/carros/c4vts-prata/c4vts-prata-dianteira-direita.jpg",
            ],
            specs: [
                { label: "Motor", value: "2.0 16V" },
                { label: "Câmbio", value: "Manual" },
                { label: "Ano", value: "2007" },
                { label: "Status", value: "Esse já foi" },
            ],
            description:
                "Exemplar impecável na cor Prata, preservando as linhas ousadas da carroceria cupê de duas portas e as clássicas rodas de liga leve originais. Equipado com motor 2.0 aspirado de 143 cv e câmbio manual, une a dinâmica de condução pura a um interior repleto de tecnologia da época, como o velocímetro digital central e o volante de miolo fixo. Perfeito para entusiastas que buscam exclusividade e estilo.",
        },
    ];

    const ADS = [
        {
            id: "Citroen-DS3-THP",
            title: "Citroën DS3 THP",
            tag: "Carro disponível",
            price: "Consulte valores",
            cover: "./images/anuncios/ds3-venda.jpg",
            gallery: ["./images/anuncios/ds3-branco/ds3-venda-frente.jpg",
                "./images/anuncios/ds3-branco/ds3-venda-lateral-esquerda.jpg",
                "./images/anuncios/ds3-branco/ds3-venda-lateral-direita.jpg",
                "./images/anuncios/ds3-branco/ds3-venda-traseira.jpg",
                "./images/anuncios/ds3-branco/ds3-venda-lanterna.jpg",
                "./images/anuncios/ds3-branco/ds3-venda-roda.jpg",
                "./images/anuncios/ds3-branco/ds3-venda-motor.jpg",
                "./images/anuncios/ds3-branco/ds3-venda-interior.jpg",
                "./images/anuncios/ds3-branco/ds3-venda-volante.jpg"],
            description: "DS3 extremamente bem cuidado, com preparação feita visando performance e confiabilidade, além de acabamento impecável e diversos upgrades de qualidade.",
            specs: [
                { label: "Motor", value: "THP 1.6 forjado pela AceleraCar" },
                { label: "Pistões", value: "Pro Forge + Bielas Supertech" },
                { label: "Turbina", value: "Bull Racing 44/46" },
                { label: "Intake", value: "Bull Racing + filtro K&N" },
                { label: "Válvula de Alivio", value: "Forge" },
                { label: "Mapa", value: "Pixel" },
            ],
        },
        {
            id: "UP-TSI-Speed",
            title: "UP! TSI MOVE STAGE 3",
            tag: "Carro disponível",
            price: "Consulte valores",
            cover: "./images/anuncios/up-tsi-branco.jpg",
            gallery: [
                "./images/anuncios/up-tsi-speed/up-tsi-branco-traseira.jpg",
                "./images/anuncios/up-tsi-speed/up-tsi-branco-dianteira-esquerda.jpg",
                "./images/anuncios/up-tsi-speed/up-tsi-branco-traseira-direita.jpg",
                "./images/anuncios/up-tsi-speed/up-tsi-branco-interna.jpg",
                "./images/anuncios/up-tsi-speed/up-tsi-branco-interna-banco.jpg",
                "./images/anuncios/up-tsi-speed/up-tsi-branco-interna-km.jpg",
            ],
            description: "Up! TSI Stage 3, bem montado, com manutenção rigorosa e pronto pra uso. Carro forte e confiável. Local: Barueri – SP. Contato: Rafael – (11) 94364-6762",
            specs: [
                { label: "Motor", value: "1.0 TSI " },
                { label: "Turbina", value: "HP180" },
                { label: "Remap", value: "Alien Stage 3" },
                { label: "Abafador", value: "Barenwald Dresden 4”" },
                { label: "Molas Esportivas", value: "Eibach" },
                { label: "Remap", value: "Alien Stage 3" },
            ],
        },
        {
            id: "DS3-Amarelo",
            title: "Citroën DS3 THP",
            tag: "Carro disponível",
            price: "Consulte valores",
            cover: "./images/anuncios/ds3-amarelo-venda.jpg",
            gallery: [
                "./images/anuncios/ds3-amarelo/ds3-amarelo-venda.jpg",
                "./images/anuncios/ds3-amarelo/ds3-amarelo-traseira-venda.jpg",
                "./images/anuncios/ds3-amarelo/ds3-amarelo-traseira-direita-venda.jpg",
                "./images/anuncios/ds3-amarelo/ds3-amarelo-rodas-venda.jpg",
                "./images/anuncios/ds3-amarelo/ds3-amarelo-interna-venda.jpg",
                "./images/anuncios/ds3-amarelo/ds3-amarelo-interna-banco-venda.jpg",
                "./images/anuncios/ds3-amarelo/ds3-amarelo-motor-venda.jpg",
            ],
            description: "DS3 100% original, extremamente conservado, com procedência garantida, pintura original sem retoques e mecânica em ótimo estado. Ano: 2012/2013. Valor: 57.500 (Avalia ofertas). Localização: Santo André - SP",
            specs: [
                { label: "Motor", value: "1.6 Turbo original (sem remap)" },
                { label: "Válvula de alívio ", value: "GFB original" },
                { label: "Tampa de válvula", value: "modelo novo THP Flex" },
                { label: "Pneus", value: "Dunlop 215/45 R17" },
            ],
        },
    ];

    document.addEventListener("DOMContentLoaded", initPaesGarage);

    function initPaesGarage() {
        initHeader();
        initHeroAndCircuit();
        initAboutCarousel();
        initConfigurator();
        initAdsTilt();
        initModal();
        initReveal();
    }

    /* ------------------------------------------------------------------
       HEADER HÍBRIDO — alterna para o estado "pílula flutuante" ao rolar
       ------------------------------------------------------------------ */
    function initHeader() {
        const header = document.querySelector(".header");
        const toggle = document.querySelector(".header__toggle");
        const nav = document.querySelector(".header__nav");
        if (!header) return;

        ScrollTrigger.create({
            start: 60,
            onUpdate: (self) => {
                header.classList.toggle("header--floating", self.scroll() > 60);
            },
        });

        if (toggle && nav) {
            toggle.addEventListener("click", () => {
                const isOpen = nav.classList.toggle("is-open");
                toggle.classList.toggle("is-active", isOpen);
                toggle.setAttribute("aria-expanded", String(isOpen));
            });

            nav.querySelectorAll(".header__link").forEach((link) => {
                link.addEventListener("click", () => {
                    nav.classList.remove("is-open");
                    toggle.classList.remove("is-active");
                    toggle.setAttribute("aria-expanded", "false");
                });
            });
        }
    }

    /* ------------------------------------------------------------------
       HERO + VÍDEO DO CIRCUITO + MAPA-ASSINATURA
       Um único ScrollTrigger scrubado dirige três coisas em conjunto:
       o currentTime do vídeo, o traçado do mini-mapa e o fade do título.
       ------------------------------------------------------------------ */
    function initHeroAndCircuit() {
        const hero = document.querySelector(".hero");
        const video = document.getElementById("scrollVideo");
        const heroTitle = document.querySelector(".hero__title");
        const heroSubtitle = document.querySelector(".hero__subtitle");
        const scrollCue = document.querySelector(".hero__scrollcue");
        const scrim = document.querySelector(".circuit-bg__scrim");
        const trackHud = document.querySelector(".track-hud");
        const progressPath = document.querySelector(".track-path-progress");
        const dot = document.querySelector(".track-dot");
        const basePath = document.querySelector(".track-path");

        if (!hero || !video) return;

        let pathLength = 0;
        if (basePath && progressPath) {
            pathLength = basePath.getTotalLength();
            progressPath.style.strokeDasharray = String(pathLength);
            progressPath.style.strokeDashoffset = String(pathLength);
        }

        function updateTrackVisual(progress) {
            if (!basePath) return;
            const point = basePath.getPointAtLength(pathLength * progress);
            if (dot) dot.setAttribute("transform", `translate(${point.x}, ${point.y})`);
            if (progressPath) progressPath.style.strokeDashoffset = String(pathLength * (1 - progress));
        }

        function setVideoTime(progress) {
            if (video.duration && !Number.isNaN(video.duration)) {
                video.currentTime = video.duration * progress;
            }
        }

        function driveScrub(progress) {
            setVideoTime(progress);
            updateTrackVisual(progress);
        }

        video.addEventListener("loadedmetadata", () => {
            video.pause();
            driveScrub(0);
        });

        ScrollTrigger.create({
            trigger: hero,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            onUpdate: (self) => driveScrub(self.progress),
        });

        // título e chamada de rolagem desaparecem rápido, logo no início do hero
        if (heroTitle) {
            gsap.to([heroTitle, heroSubtitle, scrollCue], {
                opacity: 0,
                y: -40,
                ease: "none",
                scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    end: "35% top",
                    scrub: true,
                },
            });
        }

        // o vídeo escurece gradualmente à medida que o conteúdo sólido se aproxima
        const dimZone = document.querySelector(".ads");
        if (scrim && dimZone) {
            gsap.to(scrim, {
                opacity: 0.94,
                ease: "none",
                scrollTrigger: {
                    trigger: dimZone,
                    start: "top bottom",
                    end: "top center",
                    scrub: true,
                },
            });
        }

        if (trackHud && dimZone) {
            gsap.to(trackHud, {
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: dimZone,
                    start: "top bottom",
                    end: "top 70%",
                    scrub: true,
                },
            });
        }
    }

    /* ------------------------------------------------------------------
       CARROSSEL AUTOMÁTICO — seção "Quem somos"
       ------------------------------------------------------------------ */
    function initAboutCarousel() {
        const root = document.querySelector("[data-carousel]");
        if (!root) return;

        const slides = Array.from(root.querySelectorAll(".about__slide"));
        const dots = Array.from(root.querySelectorAll(".about__dot"));
        if (!slides.length) return;

        let index = 0;
        let timer = null;
        const intervalMs = prefersReducedMotion ? 9000 : 4500;

        function goTo(next) {
            slides[index].classList.remove("is-active");
            dots[index]?.classList.remove("is-active");
            index = (next + slides.length) % slides.length;
            slides[index].classList.add("is-active");
            dots[index]?.classList.add("is-active");
        }

        function start() {
            stop();
            timer = window.setInterval(() => goTo(index + 1), intervalMs);
        }

        function stop() {
            if (timer) window.clearInterval(timer);
        }

        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                goTo(i);
                start();
            });
        });

        root.addEventListener("mouseenter", stop);
        root.addEventListener("mouseleave", start);

        goTo(0);
        start();
    }

    /* ------------------------------------------------------------------
       CONFIGURADOR DE PROJETOS — carrossel horizontal com arraste
       ------------------------------------------------------------------ */
    function initConfigurator() {
        const viewport = document.querySelector(".configurator__viewport");
        const track = document.querySelector(".configurator__track");
        const prevBtn = document.querySelector('[data-configurator="prev"]');
        const nextBtn = document.querySelector('[data-configurator="next"]');
        const dashesWrap = document.querySelector(".configurator__dashes");
        if (!viewport || !track) return;

        const slides = Array.from(track.querySelectorAll(".car-slide"));
        let activeIndex = 0;
        let dashes = [];

        if (dashesWrap) {
            dashesWrap.innerHTML = "";
            slides.forEach((_, i) => {
                const dash = document.createElement("button");
                dash.className = "configurator__dash";
                dash.type = "button";
                dash.setAttribute("aria-label", `Ir para o projeto ${i + 1}`);
                dash.addEventListener("click", () => goTo(i));
                dashesWrap.appendChild(dash);
            });
            dashes = Array.from(dashesWrap.querySelectorAll(".configurator__dash"));
        }

        function slideOffset(i) {
            const slide = slides[i];
            const viewportCenter = viewport.clientWidth / 2;
            return slide.offsetLeft + slide.clientWidth / 2 - viewportCenter;
        }

        function goTo(i) {
            activeIndex = Math.max(0, Math.min(slides.length - 1, i));
            slides.forEach((s, idx) => s.classList.toggle("is-active", idx === activeIndex));
            dashes.forEach((d, idx) => d.classList.toggle("is-active", idx === activeIndex));
            gsap.to(track, {
                x: -slideOffset(activeIndex),
                duration: 0.7,
                ease: "power3.out",
            });
        }

        prevBtn?.addEventListener("click", () => goTo(activeIndex - 1));
        nextBtn?.addEventListener("click", () => goTo(activeIndex + 1));

        // arraste (mouse e toque) via Pointer Events
        let isDragging = false;
        let dragStartX = 0;
        let startTranslate = 0;

        viewport.addEventListener("pointerdown", (e) => {
            // Se o clique foi em um botão (como o "Ver Projeto"), não iniciamos o arrasto 
            // para permitir que o evento de clique (click) seja disparado corretamente no botão.
            if (e.target.closest("button") || e.target.closest("a")) return;

            isDragging = true;
            dragStartX = e.clientX;
            startTranslate = gsap.getProperty(track, "x");
            viewport.setPointerCapture(e.pointerId);
            gsap.killTweensOf(track);
        });

        viewport.addEventListener("pointermove", (e) => {
            if (!isDragging) return;
            const delta = e.clientX - dragStartX;
            gsap.set(track, { x: startTranslate + delta });
        });

        function endDrag(e) {
            if (!isDragging) return;
            isDragging = false;
            const delta = e.clientX - dragStartX;
            if (Math.abs(delta) > 60) {
                goTo(activeIndex + (delta < 0 ? 1 : -1));
            } else {
                goTo(activeIndex);
            }
        }

        viewport.addEventListener("pointerup", endDrag);
        viewport.addEventListener("pointercancel", endDrag);

        window.addEventListener("resize", () => goTo(activeIndex));

        // botões "Ver Projeto"
        track.querySelectorAll("[data-open-project]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const project = PROJECTS.find((p) => p.id === btn.dataset.openProject);
                if (project) window.PaesGarageModal.open(project);
            });
        });

        goTo(0);
    }

    /* ------------------------------------------------------------------
       TILT 3D — cards de anúncios
       ------------------------------------------------------------------ */
    function initAdsTilt() {
        const cards = document.querySelectorAll(".ad-card");
        if (!cards.length) return;

        cards.forEach((card) => {
            if (isFinePointer && !prefersReducedMotion) {
                const rotateX = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power3.out" });
                const rotateY = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power3.out" });
                const lift = gsap.quickTo(card, "y", { duration: 0.4, ease: "power3.out" });

                card.addEventListener("mousemove", (e) => {
                    const rect = card.getBoundingClientRect();
                    const px = (e.clientX - rect.left) / rect.width - 0.5;
                    const py = (e.clientY - rect.top) / rect.height - 0.5;
                    rotateY(px * 14);
                    rotateX(py * -14);
                    lift(-6);
                });

                card.addEventListener("mouseleave", () => {
                    rotateX(0);
                    rotateY(0);
                    lift(0);
                });
            }

            const btn = card.querySelector("[data-open-ad]");
            btn?.addEventListener("click", () => {
                const ad = ADS.find((a) => a.id === btn.dataset.openAd);
                if (ad) window.PaesGarageModal.open(ad);
            });
        });
    }

    /* ------------------------------------------------------------------
       MODAL "WIKI" — reutilizado por projetos e anúncios
       ------------------------------------------------------------------ */
    function initModal() {
        const modal = document.querySelector(".modal");
        if (!modal) return;

        const dialog = modal.querySelector(".modal__dialog");
        const closeBtn = modal.querySelector(".modal__close");
        const backdrop = modal.querySelector(".modal__backdrop");
        const galleryImg = modal.querySelector(".modal__gallery img");
        const thumbsWrap = modal.querySelector(".modal__thumbs");
        const eyebrow = modal.querySelector(".modal__eyebrow");
        const title = modal.querySelector(".modal__title");
        const tagline = modal.querySelector(".modal__tagline");
        const tabsWrap = modal.querySelector(".modal__tabs");
        const overviewPanel = modal.querySelector('[data-panel="overview"]');
        const specsPanel = modal.querySelector('[data-panel="specs"]');
        const specsGrid = modal.querySelector(".modal__specs");

        let lastFocusedEl = null;

        function renderGallery(images) {
            thumbsWrap.innerHTML = "";
            if (images.length) galleryImg.src = images[0];
            images.forEach((src, i) => {
                const thumb = document.createElement("button");
                thumb.className = "modal__thumb" + (i === 0 ? " is-active" : "");
                thumb.type = "button";
                thumb.innerHTML = `<img src="${src}" alt="Foto ${i + 1}" />`;
                thumb.addEventListener("click", () => {
                    galleryImg.src = src;
                    thumbsWrap.querySelectorAll(".modal__thumb").forEach((t) => t.classList.remove("is-active"));
                    thumb.classList.add("is-active");
                });
                thumbsWrap.appendChild(thumb);
            });
        }

        function renderSpecs(specs) {
            specsGrid.innerHTML = "";
            specs.forEach((spec) => {
                const dl = document.createElement("dl");
                dl.className = "modal__spec";
                dl.innerHTML = `<dt>${spec.label}</dt><dd>${spec.value}</dd>`;
                specsGrid.appendChild(dl);
            });
        }

        function setTab(name) {
            tabsWrap.querySelectorAll(".modal__tab").forEach((t) => t.classList.toggle("is-active", t.dataset.tab === name));
            overviewPanel.classList.toggle("is-active", name === "overview");
            specsPanel.classList.toggle("is-active", name === "specs");
        }

        tabsWrap.querySelectorAll(".modal__tab").forEach((tab) => {
            tab.addEventListener("click", () => setTab(tab.dataset.tab));
        });

        function open(data) {
            lastFocusedEl = document.activeElement;
            eyebrow.textContent = data.tag || "Projeto";
            title.textContent = data.name || data.title;
            tagline.textContent = data.tagline || data.description || "";
            overviewPanel.querySelector("p").textContent = data.description || "";
            renderSpecs(data.specs || []);
            renderGallery(data.gallery && data.gallery.length ? data.gallery : [data.cover]);
            setTab("overview");

            modal.classList.add("is-open");
            document.body.classList.add("modal-open");
            modal.setAttribute("aria-hidden", "false");
            closeBtn.focus();
        }

        function close() {
            modal.classList.remove("is-open");
            document.body.classList.remove("modal-open");
            modal.setAttribute("aria-hidden", "true");
            if (lastFocusedEl) lastFocusedEl.focus();
        }

        closeBtn.addEventListener("click", close);
        backdrop.addEventListener("click", close);
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("is-open")) close();
        });

        window.PaesGarageModal = { open, close };
    }

    /* ------------------------------------------------------------------
       REVEAL ON SCROLL — fade + slide sutil para blocos de conteúdo
       ------------------------------------------------------------------ */
    function initReveal() {
        const items = document.querySelectorAll(".reveal");
        if (!items.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        items.forEach((item) => observer.observe(item));
    }
})();
