
    (function () {
        const slidesWrap = document.getElementById('slides');
        const prev = document.getElementById('prevBtn');
        const next = document.getElementById('nextBtn');

        // Arrow behavior: scroll slide width
        function scrollBySlide(dir = 1) {
            const slide = slidesWrap.querySelector('.slide');
            if (!slide) return;
            const slideW = slide.getBoundingClientRect().width + parseInt(getComputedStyle(slidesWrap).gap || 18);
            slidesWrap.scrollBy({ left: slideW * dir, behavior: 'smooth' });
        }
        prev.addEventListener('click', () => scrollBySlide(-1));
        next.addEventListener('click', () => scrollBySlide(1));

        // Drag to scroll support
        let isDown = false, startX, scrollLeft;
        slidesWrap.addEventListener('pointerdown', (e) => {
            isDown = true;
            slidesWrap.setPointerCapture(e.pointerId);
            slidesWrap.classList.add('dragging');
            startX = e.clientX;
            scrollLeft = slidesWrap.scrollLeft;
        });
        slidesWrap.addEventListener('pointermove', (e) => {
            if (!isDown) return;
            const x = e.clientX;
            const walk = (startX - x); // negative = move right
            slidesWrap.scrollLeft = scrollLeft + walk;
        });
        slidesWrap.addEventListener('pointerup', (e) => {
            isDown = false;
            slidesWrap.releasePointerCapture(e.pointerId);
            slidesWrap.classList.remove('dragging');
            // snap to nearest slide for nicer UX
            snapToNearest();
        });
        slidesWrap.addEventListener('pointercancel', () => { isDown = false; slidesWrap.classList.remove('dragging'); });

        // Snap math
        function snapToNearest() {
            const slides = Array.from(slidesWrap.querySelectorAll('.slide'));
            const center = slidesWrap.scrollLeft + slidesWrap.offsetWidth / 2;
            let closest = slides[0];
            let closeDist = Infinity;
            slides.forEach(s => {
                const rect = s.getBoundingClientRect();
                const left = s.offsetLeft;
                const centerSlide = left + s.offsetWidth / 2;
                const dist = Math.abs(center - centerSlide);
                if (dist < closeDist) { closeDist = dist; closest = s; }
            });
            // scroll so that chosen slide is centered
            const left = closest.offsetLeft;
            const to = left - (slidesWrap.offsetWidth - closest.offsetWidth) / 2;
            slidesWrap.scrollTo({ left: to, behavior: 'smooth' });
        }

        // Keyboard accessibility for arrows
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') scrollBySlide(1);
            if (e.key === 'ArrowLeft') scrollBySlide(-1);
        });

        // Resize -> keep current slide in view
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => { snapToNearest(); }, 150);
        });

        // mouse wheel horizontal on desktop for smoothness
        slidesWrap.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaX) > 0 || e.ctrlKey) return; // let horizontal scrolls pass
            // vertical wheel => convert to horizontal
            if (Math.abs(e.deltaY) > 0) {
                e.preventDefault();
                slidesWrap.scrollBy({ left: e.deltaY, behavior: 'auto' });
            }
        }, { passive: false });

        // initial snap (center first slide)
        window.addEventListener('load', () => setTimeout(snapToNearest, 60));
    })();







    let index = 0;
    const slides = document.querySelectorAll(".slidee");

    function showSlide(i) {
        slides.forEach((slide, idx) => {
            slide.classList.remove("active");
            if (idx === i) slide.classList.add("active");
        });
    }

    document.querySelector(".right").onclick = () => {
        index = (index + 1) % slides.length;
        showSlide(index);
    };

    document.querySelector(".left").onclick = () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    };

    // Auto slide (optional)
    setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
    }, 4000);










    const counters = document.querySelectorAll(".percent-box");

    counters.forEach(counter => {
        let target = +counter.getAttribute("data-target");
        let count = 0;
        let speed = 30;  // jitna kam, utna fast

        function updateCounter() {
            if (count < target) {
                count++;
                counter.textContent = count + (target == 90 ? "%" : target == 56 ? "+" : "");
                setTimeout(updateCounter, speed);
            } else {
                counter.textContent = target + (target == 90 ? "%" : target == 56 ? "+" : "");
            }
        }

        updateCounter();
    });

    const data = {
        haig: {
            title: "Haig",
            desc: "Beautiful premium property with modern design and spacious layout.",
            img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
        },
        myrtle: {
            title: "Myrtle Pool House",
            desc: "Stunning luxury villa with a private pool and elegant architecture.",
            img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
        },
        clifton: {
            title: "Clifton",
            desc: "A calm and peaceful home with green surroundings and natural light.",
            img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
        },
        sidney: {
            title: "Sidney House",
            desc: "Urban modern-style house built with premium materials.",
            img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
        },
        sweetman: {
            title: "Sweetman",
            desc: "Cozy warm property with a stylish interior and outdoor space.",
            img: "https://images.unsplash.com/photo-1599423300746-b62533397364"
        }
    };

    const listItems = document.querySelectorAll("#propertyList li");
    const details = document.getElementById("details");

    function loadProperty(id) {
        const d = data[id];
        details.innerHTML = `
        <div class="property-box">
            <div class="img">
                <img src="${d.img}" alt="">
            </div>
            <div class="info">
                <h2>${d.title}</h2>
                <p>${d.desc}</p>
            </div>
        </div>
    `;
    }

    listItems.forEach(li => {
        li.addEventListener("click", () => {
            document.querySelector(".list li.active").classList.remove("active");
            li.classList.add("active");
            loadProperty(li.dataset.id);
        });
    });

    // Default load
    loadProperty("haig");

