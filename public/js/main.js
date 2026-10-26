document.addEventListener('DOMContentLoaded', () => {
    // CARRUSEL INTERACTIVO
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track && prevBtn && nextBtn) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        function updateSlide() {
            const width = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * width}px)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlide();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlide();
        });

        window.addEventListener('resize', updateSlide);
    }

    // FORMULARIO DE REGISTRO
    const form = document.getElementById('courseForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const curso = document.getElementById('curso').value;
            const comentario = document.getElementById('comentario').value;

            try {
                const response = await fetch('/api/inscribir', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, email, curso, comentario })
                });

                if (response.ok) {
                    const alertBox = document.getElementById('alertBox');
                    alertBox.style.display = 'block';
                    form.reset();
                    setTimeout(() => alertBox.style.display = 'none', 4000);
                } else {
                    alert('Ocurrió un error al procesar el registro.');
                }
            } catch (err) {
                console.error('Error de red:', err);
            }
        });
    }
});