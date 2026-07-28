gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById('scrollVideo');

function initScrollVideo() {
    gsap.to(video, {
        currentTime: video.duration || 0, // vai de 0 até o fim do vídeo
        ease: 'none',                // ESSENCIAL: sem easing, senão dessincroniza do scroll
        scrollTrigger: {
            trigger: '.video-scroll-section',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5, // "cola" no scroll, com 0.5s de suavização
        }
    });
}
if (video.readyState >= 1) {
    initScrollVideo();
} else {
    video.addEventListener(`loadedmetadata`, initScrollVideo);
}