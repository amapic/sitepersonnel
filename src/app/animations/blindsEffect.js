export function initBlindsEffect(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (window.innerWidth < 768) return;
    if (!container) return;

    // Créer le conteneur pour les stores
    const blindsContainer = document.createElement('div');
    blindsContainer.className = 'blinds-container absolute w-full h-full z-20 flex flex-col';

    // Créer 10 lattes
    for (let i = 0; i < 10; i++) {
        const blind = document.createElement('div');
        blind.className = `blind z-[100] h-[11%] -mt-[1%] relative w-screen transform-gpu transition-transform duration-500 ease-out`;
        blind.style.background = 'linear-gradient(to left, #0101ec 50%, rgba(1, 1, 236, 0.9) 100%)';
        blind.style.left ='-20vw';
        blind.style.zIndex =10;
        blind.style.opacity = '1';
        blind.style.transformOrigin = 'top';
        blind.style.transitionDelay = `${i * 0.05}s`;
        blindsContainer.appendChild(blind);
    }

    // Ajouter les styles nécessaires au conteneur parent
    container.style.perspective = '1000px';
    container.style.position = 'relative';
    // container.style.overflow = 'hidden';

    // Insérer le conteneur des stores en premier pour qu'il soit au-dessus du contenu
    container.insertBefore(blindsContainer, container.firstChild);

    // Ajouter l'événement de survol
    container.addEventListener('mouseenter', () => {
        const blinds = blindsContainer.querySelectorAll('.blind');
        blinds.forEach(blind => {
            blind.style.transform = 'rotateX(-90deg)';
        });
    });

    container.addEventListener('mouseleave', () => {
        const blinds = blindsContainer.querySelectorAll('.blind');
        blinds.forEach(blind => {
            blind.style.transform = 'rotateX(0deg)';
        });
    });
} 