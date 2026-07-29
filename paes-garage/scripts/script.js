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
            gallery: ["./images/carros/corsa-paes.jpg", "./images/carros/corsa-3.png"],
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
                "./images/carros/peugeot_307-preto.jpg",
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
            gallery: ["./images/carros/clio-4p-azul.jpg",
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
                "./images/carros/gol-branco/gol-branco-turbo-frente.jpg",
                "./images/carros/gol-branco/gol-branco-turbo-lateral.jpg",
                "./images/carros/gol-branco/gol-branco-turbo-traseira.jpg",
                "./images/carros/gol-branco/gol-branco-turbo-traseira-rodas.jpg",
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
            id: "kit-suspensao",
            title: "Kit de suspensão esportiva",
            tag: "Peça disponível",
            price: "Consulte valores",
            cover: "./images/anuncios/suspensao.svg",
            gallery: ["./images/anuncios/suspensao.svg"],
            description: "Kit completo de amortecedores e molas esportivas, poucos km rodados.",
            specs: [
                { label: "Tipo", value: "Esportiva" },
                { label: "Aplicação", value: "Universal" },
                { label: "Estado", value: "Seminovo" },
            ],
        },
        {
            id: "escapamento-esportivo",
            title: "Escapamento esportivo",
            tag: "Peça disponível",
            price: "Consulte valores",
            cover: "./images/anuncios/escapamento.svg",
            gallery: ["./images/anuncios/escapamento.svg"],
            description: "Ponteira e traseira esportivas em aço inox, som mais grave e presente.",
            specs: [
                { label: "Material", value: "Aço inox" },
                { label: "Saída", value: "Dupla" },
                { label: "Estado", value: "Usado" },
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
