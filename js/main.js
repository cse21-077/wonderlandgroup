(function(html) {

    'use strict';


    /* animations
     * -------------------------------------------------- */
    const tl = anime.timeline({
            easing: 'easeInOutCubic',
            duration: 800,
            autoplay: false
        })
        .add({
            targets: '#loader',
            opacity: 0,
            duration: 1000,
            begin: function(anim) {
                window.scrollTo(0, 0);
            }
        })
        .add({
            targets: '#preloader',
            opacity: 0,
            complete: function(anim) {
                document.querySelector("#preloader").style.visibility = "hidden";
                document.querySelector("#preloader").style.display = "none";
            }
        })
        .add({
            targets: '.s-header',
            translateY: [-100, 0],
            opacity: [0, 1]
        }, '-=200')
        .add({
            targets: ['.s-intro__text', '.s-intro__about'],
            translateY: [100, 0],
            opacity: [0, 1],
            delay: anime.stagger(400)
        })
        .add({
            targets: '.s-intro__bg',
            opacity: [0, 1],
            duration: 1000,
        })
        .add({
            targets: ['.s-intro__scroll-down'],
            opacity: [0, 1],
            duration: 400
        });


    /* preloader
     * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');

        window.addEventListener('load', function() {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');
            tl.play();
        });

    }; // end ssPreloader


    /* mobile menu
     * ---------------------------------------------------- */
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav-wrap');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {

            link.addEventListener("click", function(event) {

                // at 900px and below
                if (window.matchMedia('(max-width: 900px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 900px
            if (window.matchMedia('(min-width: 901px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
            }
        });

    }; // end ssMobileMenu


    /* highlight active menu link on pagescroll
     * ------------------------------------------------------ */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll('.target-section');

        // Add an event listener listening for scroll
        window.addEventListener('scroll', navHighlight);

        function navHighlight() {

            // Get current scroll position
            let scrollY = window.pageYOffset;

            // Loop through sections to get height(including padding and border), 
            // top and ID values for each
            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');

                /* If our current scroll position enters the space where current section 
                 * on screen is, add .current class to parent element(li) of the thecorresponding 
                 * navigation link, else remove it. To know which link is active, we use 
                 * sectionId variable we are getting while looping through sections as 
                 * an selector
                 */
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector('.s-header__nav a[href*=' + sectionId + ']').parentNode.classList.add('current');
                } else {
                    document.querySelector('.s-header__nav a[href*=' + sectionId + ']').parentNode.classList.remove('current');
                }
            });
        }

    }; // end ssScrollSpy


    /* animate elements if in viewport
     * ------------------------------------------------------ */
    const ssAnimateOnScroll = function() {

        const blocks = document.querySelectorAll('[data-animate-block]');

        window.addEventListener('scroll', animateOnScroll);

        function animateOnScroll() {

            let scrollY = window.pageYOffset;

            blocks.forEach(function(current) {

                const viewportHeight = window.innerHeight;
                const triggerTop = (current.offsetTop + (viewportHeight * .2)) - viewportHeight;
                const blockHeight = current.offsetHeight;
                const blockSpace = triggerTop + blockHeight;
                const inView = scrollY > triggerTop && scrollY <= blockSpace;
                const isAnimated = current.classList.contains('ss-animated');

                if (inView && (!isAnimated)) {

                    anime({
                        targets: current.querySelectorAll('[data-animate-el]'),
                        opacity: [0, 1],
                        translateY: [100, 0],
                        delay: anime.stagger(200, { start: 200 }),
                        duration: 800,
                        easing: 'easeInOutCubic',
                        begin: function(anim) {
                            current.classList.add('ss-animated');
                        }
                    });

                    if (current.classList.contains('about-stats')) {

                        let counters = current.querySelectorAll('[data-animate-el] .stats__count');

                        counters.forEach(function(counter, i) {

                            let val = +counter.dataset.counter;
                            let valSpan = counter.querySelectorAll('span')[0];

                            valSpan.innerText = '0';

                            setTimeout(function() {
                                anime({
                                    targets: valSpan,
                                    innerText: [0, val],
                                    easing: 'linear',
                                    round: 1,
                                    duration: 2000
                                });
                            }, i * 200);

                        });
                    }
                }
            });
        }

    }; // end ssAnimateOnScroll


    /* swiper
     * ------------------------------------------------------ */
    const ssSwiper = function() {

        const clientsSwiper = new Swiper('.clients', {

            slidesPerView: 4,
            spaceBetween: 4,
            slideClass: 'clients__slide',
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    spaceBetween: 8
                },
                // when window width is > 900px
                901: {
                    slidesPerView: 5,
                    spaceBetween: 10
                },
                // when window width is > 1200px
                1201: {
                    slidesPerView: 6,
                    spaceBetween: 10
                }
            }
        });

        const testimonialsSwiper = new Swiper('.testimonial-slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 32
                },
                // when window width is > 1200px
                1201: {
                    slidesPerView: 2,
                    spaceBetween: 80
                }
            }
        });

    }; // end ssSwiper



    /* smoothscroll
     * ------------------------------------------------------ */
    const ssMoveTo = function() {

        const easeFunctions = {
            easeInQuad: function(t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function(t, b, c, d) {
                t /= d;
                return -c * t * (t - 2) + b;
            },
            easeInOutQuad: function(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            },
            easeInOutCubic: function(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');

        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssScrollSpy();
        ssAnimateOnScroll();
        ssSwiper();
        ssPhotoswipe();
        ssVideoLightbox();
        ssAlertBoxes();
        ssMoveTo();

    })();

})(document.documentElement);

/*slider 2 */
$(".box").click(function() {
    $(".box").removeClass("active");
    $(this).addClass("active");
});
/*slider2 end */
/*imageee */
const images = document.getElementsByClassName("image");

let globalIndex = 0,
    last = { x: 0, y: 0 };

const activate = (image, x, y) => {
    image.style.left = `${x}px`;
    image.style.top = `${y}px`;
    image.style.zIndex = globalIndex;

    image.dataset.status = "active";

    last = { x, y };
}

const distanceFromLast = (x, y) => {
    return Math.hypot(x - last.x, y - last.y);
}

const handleOnMove = e => {
    if (distanceFromLast(e.clientX, e.clientY) > (window.innerWidth / 20)) {
        const lead = images[globalIndex % images.length],
            tail = images[(globalIndex - 5) % images.length];

        activate(lead, e.clientX, e.clientY);

        if (tail) tail.dataset.status = "inactive";

        globalIndex++;
    }
}

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);
/*slider start */
document.getElementById('next').onclick = function() {
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
}
document.getElementById('prev').onclick = function() {
        let lists = document.querySelectorAll('.item');
        document.getElementById('slide').prepend(lists[lists.length - 1]);
    }
    /*workiiiii*/