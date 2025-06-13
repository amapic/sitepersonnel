// On exécute la détection au chargement
document.addEventListener('DOMContentLoaded', function() {
    const isMobile = isMobileDevice();
    console.log('Est sur mobile:', isMobile);
    
    // Initialisation de la hauteur réelle
    document.documentElement.style.setProperty('--real-viewport-height', `${window.innerHeight}px`);

    // Custom cursor code
    if (!isMobile) { // Only enable custom cursor on desktop
        // Masquer le curseur par défaut sur tout le document
        document.body.style.cursor = 'none';
        
        const cursor = document.querySelector('.custom-cursor');
        const cursorArrow = cursor.querySelector('.cursor-arrow');
        const cursorGoText = cursor.querySelector('.cursor-go-text');
        const hoverAreas = document.querySelectorAll('.cursor-hover-area');
        const firstSection = document.querySelector('.section:first-child');
        const reactRoot = document.querySelector('#react-root2');
        const contactTel = document.querySelector('#contact_tel');
        const contactMail = document.querySelector('#contact_mail');
        const svgcursor1 = document.querySelector('#svgcursor1');
        const svgcursor2 = document.querySelector('#svgcursor2');
        
        // Get both sections and their target SVGs
        const sections = {
            sectionprojet1: {
                element: document.querySelector('#sectionprojet1'),
                target: document.querySelector('#fleche1')
            },
            sectionprojet2: {
                element: document.querySelector('#sectionprojet2'),
                target: document.querySelector('#fleche2')
            },
            sectionprojet3: {
                element: document.querySelector('#sectionprojet3'),
                targets: [
                    document.querySelector('#image3'),
                    document.querySelector('#image4'),
                    document.querySelector('#image5')
                ]
            },
            contact_tel: {
                element: contactTel,
                target: contactTel,
                isWhite: true
            },
            contact_mail: {
                element: contactMail,
                target: contactMail,
                isWhite: true
            }
        };

        // Update cursor position and arrow rotation
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            console.log(firstSection.contains(e.target))

            // Hide cursor in first section and react-root
            console.log(firstSection.contains(e.target))
            console.log(reactRoot.contains(e.target))
            if (firstSection.contains(e.target) || (reactRoot && reactRoot.contains(e.target))) {
                // cursor.style.opacity = '1';
                cursor.classList.add('blend-mode');
                svgcursor1.style.opacity = '0';
                svgcursor2.style.opacity = '1';
                return;
            } else {
                // cursor.style.opacity = '1';
                cursor.classList.remove('blend-mode');
                svgcursor1.style.opacity = '1';
                svgcursor2.style.opacity = '0';
            }

            // Check which section we're in and point to corresponding target
            let currentSection = null;
            let currentTarget = null;
            let isWhiteMode = false;

            for (const [id, section] of Object.entries(sections)) {
                if (section.element && section.element.contains(e.target)) {
                    currentSection = section.element;
                    isWhiteMode = section.isWhite || false;
                    if (id === 'sectionprojet3') {
                        // Find the nearest image
                        let nearestDistance = Infinity;
                        section.targets.forEach(target => {
                            if (target) {
                                const rect = target.getBoundingClientRect();
                                const centerX = rect.left + rect.width / 2;
                                const centerY = rect.top + rect.height / 2;
                                const distance = Math.sqrt(
                                    Math.pow(e.clientX - centerX, 2) + 
                                    Math.pow(e.clientY - centerY, 2)
                                );
                                if (distance < nearestDistance) {
                                    nearestDistance = distance;
                                    currentTarget = target;
                                }
                            }
                        });
                    } else {
                        currentTarget = section.target;
                    }
                    break;
                }
            }

            // Toggle white mode class
            cursor.classList.toggle('white-mode', isWhiteMode);

            if (currentSection && currentTarget) {
                const targetRect = currentTarget.getBoundingClientRect();
                const targetCenterX = targetRect.left + targetRect.width / 2;
                const targetCenterY = targetRect.top + targetRect.height / 2;
                
                // Calculate distance to target
                const dx = targetCenterX - e.clientX;
                const dy = targetCenterY - e.clientY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // If we're close to the target (within 50 pixels)
                if (distance < 50) {
                    cursorArrow.classList.remove('active', 'pointing');
                    cursorGoText.classList.add('active');
                } else {
                    // Calculate angle between cursor and target
                    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                    cursorArrow.style.setProperty('--arrow-rotation', `${angle + 90}deg`);
                    cursorArrow.classList.add('active', 'pointing');
                    cursorGoText.classList.remove('active');
                }
            } else {
                cursorArrow.classList.remove('active', 'pointing');
                cursorGoText.classList.remove('active');
            }
        });

        // Add hover effect
        hoverAreas.forEach(area => {
            area.addEventListener('mouseenter', () => {
                // Don't add hover effect in first section or react-root
                if (!firstSection.contains(area) && (!reactRoot || !reactRoot.contains(area))) {
                    cursor.classList.add('hover');
                }
            });

            area.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    }
});