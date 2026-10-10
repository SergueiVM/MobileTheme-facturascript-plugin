(function () {
    'use strict';

    const mobileViewport = window.matchMedia('(max-width: 1199.98px)');

    function initMobileMenu() {
        const navbar = document.querySelector('nav.navbar.navbar-expand');
        const container = navbar?.querySelector(':scope > .container-fluid');
        const drawer = container?.querySelector(':scope > .navbar-collapse');
        if (!navbar || !container || !drawer) {
            return;
        }

        navbar.classList.add('sdpt-menu-initializing');
        navbar.classList.add('sdpt-mobile-menu');
        drawer.classList.add('sdpt-menu-drawer');
        drawer.id ||= 'sdpt-mobile-menu-drawer';

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'sdpt-menu-toggle';
        toggle.setAttribute('aria-label', 'Abrir menú');
        toggle.setAttribute('aria-controls', drawer.id);
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        container.insertBefore(toggle, container.firstElementChild);

        const backdrop = document.createElement('button');
        backdrop.type = 'button';
        backdrop.className = 'sdpt-menu-backdrop';
        backdrop.setAttribute('aria-label', 'Cerrar menú');
        navbar.insertAdjacentElement('afterend', backdrop);

        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
                navbar.classList.remove('sdpt-menu-initializing');
            });
        });

        function closeMenu() {
            drawer.classList.remove('sdpt-menu-open');
            backdrop.classList.remove('sdpt-menu-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menú');
            toggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
            document.body.classList.remove('sdpt-menu-scroll-locked');
        }

        function openMenu() {
            const top = Math.round(navbar.getBoundingClientRect().bottom);
            document.documentElement.style.setProperty('--sdpt-menu-top', top + 'px');
            drawer.classList.add('sdpt-menu-open');
            backdrop.classList.add('sdpt-menu-open');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Cerrar menú');
            toggle.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
            document.body.classList.add('sdpt-menu-scroll-locked');
        }

        toggle.addEventListener('click', function () {
            if (drawer.classList.contains('sdpt-menu-open')) {
                closeMenu();
                return;
            }
            openMenu();
        });

        backdrop.addEventListener('click', closeMenu);
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && drawer.classList.contains('sdpt-menu-open')) {
                closeMenu();
                toggle.focus();
            }
        });

        drawer.addEventListener('click', function (event) {
            if (!mobileViewport.matches || !(event.target instanceof Element)) {
                return;
            }

            const link = event.target.closest('a');
            if (!link) {
                return;
            }

            const item = link.parentElement;
            const submenu = Array.from(item.children).find(function (child) {
                return child.matches('ul.dropdown-menu');
            });

            if (submenu) {
                event.preventDefault();
                event.stopPropagation();
                const expanded = item.classList.toggle('sdpt-menu-expanded');
                link.setAttribute('aria-expanded', String(expanded));
                return;
            }

            if (!link.matches('[data-bs-toggle="dropdown"]')) {
                closeMenu();
            }
        });

        mobileViewport.addEventListener('change', function (event) {
            if (!event.matches) {
                closeMenu();
                drawer.querySelectorAll('.sdpt-menu-expanded').forEach(function (item) {
                    item.classList.remove('sdpt-menu-expanded');
                    item.querySelector(':scope > a')?.setAttribute('aria-expanded', 'false');
                });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu, { once: true });
    } else {
        initMobileMenu();
    }
}());