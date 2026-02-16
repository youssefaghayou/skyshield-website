(function () {
  var FEATURES = {
    darkMode: true,
    smoothScroll: true,
    activeHighlight: true,
    reveal: true,
    stickyCta: true,
    scrollProgress: true
  };

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var ICON_SUN =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4V2m0 20v-2m8-8h2M2 12H4m12.95 4.95 1.41 1.41M5.64 5.64 7.05 7.05m9.9 0 1.41-1.41M5.64 18.36l1.41-1.41M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/></svg>';
  var ICON_MOON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3c-.03.26-.04.53-.04.8A7 7 0 0 0 18.2 10.8c.27 0 .54-.01.8-.04Z"/></svg>';
  var ICON_MENU =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  var navRoot = document.querySelector('.nav');
  var linksNav = document.querySelector('.links');
  var navControls = document.querySelector('.nav-controls');

  if (navRoot && !navControls) {
    navControls = document.createElement('div');
    navControls.className = 'nav-controls';
    navRoot.appendChild(navControls);
  }

  if (FEATURES.darkMode) {
    var savedTheme = localStorage.getItem('skyshield-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      root.setAttribute('data-theme', savedTheme);
    }

    var themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle && navControls) {
      themeToggle = document.createElement('button');
      themeToggle.id = 'theme-toggle';
      themeToggle.className = 'theme-toggle';
      themeToggle.type = 'button';
      themeToggle.setAttribute('aria-label', 'Toggle dark mode');
      navControls.appendChild(themeToggle);
    } else if (themeToggle && navControls && themeToggle.parentElement !== navControls) {
      navControls.appendChild(themeToggle);
    }

    if (themeToggle) {
      var updateToggle = function () {
        var dark = root.getAttribute('data-theme') === 'dark';
        themeToggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
        themeToggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
        themeToggle.innerHTML = dark ? ICON_SUN : ICON_MOON;
      };
      updateToggle();

      themeToggle.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('skyshield-theme', next);
        updateToggle();
      });
    }
  }

  if (navControls && linksNav) {
    var menuToggle = document.getElementById('mobile-menu-toggle');
    if (!menuToggle) {
      menuToggle = document.createElement('button');
      menuToggle.id = 'mobile-menu-toggle';
      menuToggle.className = 'menu-toggle';
      menuToggle.type = 'button';
      menuToggle.setAttribute('aria-label', 'Open menu');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = ICON_MENU;
      navControls.appendChild(menuToggle);
    }

    var closeMenu = function () {
      linksNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', function () {
      var open = linksNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    linksNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 768) closeMenu();
      });
    });

    document.addEventListener('click', function (e) {
      if (window.innerWidth > 768) return;
      if (!linksNav.classList.contains('open')) return;
      if (linksNav.contains(e.target) || menuToggle.contains(e.target)) return;
      closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  if (FEATURES.scrollProgress && !document.querySelector('.scroll-progress')) {
    var progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.insertAdjacentElement('afterbegin', progress);
  }

  if (FEATURES.stickyCta && !document.querySelector('.floating-cta')) {
    var target = document.getElementById('booking') ? '#booking' : 'index.html#booking';
    var cta = document.createElement('a');
    cta.className = 'floating-cta';
    cta.href = target;
    cta.setAttribute('aria-label', 'Get Protected');
    cta.textContent = 'Get Protected';
    document.body.appendChild(cta);
  }

  if (FEATURES.smoothScroll) {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = anchor.getAttribute('href');
        if (!href || href.length < 2) return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var header = document.querySelector('.site-header');
        var headerOffset = header ? header.offsetHeight + 8 : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion ? 'auto' : 'smooth' });
      });
    });
  }

  if (FEATURES.activeHighlight) {
    var navLinks = Array.from(document.querySelectorAll('.links a'));
    var path = location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var file = href.split('#')[0];
      if (file && file === path) {
        link.classList.add('is-active');
      }
    });

    if ('IntersectionObserver' in window) {
      var hashLinks = navLinks.filter(function (l) { return (l.getAttribute('href') || '').startsWith('#'); });
      if (hashLinks.length) {
        var setActiveHash = function (id) {
          hashLinks.forEach(function (l) {
            l.classList.toggle('is-active', l.getAttribute('href') === '#' + id);
          });
        };
        var sections = document.querySelectorAll('main section[id]');
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) setActiveHash(entry.target.id);
          });
        }, { rootMargin: '-30% 0px -55% 0px', threshold: 0.1 });
        sections.forEach(function (s) { io.observe(s); });
      }
    }
  }

  if (FEATURES.reveal) {
    var revealTargets = document.querySelectorAll('main section, .panel, .card, .block, .about-card, .service-card, table');
    revealTargets.forEach(function (el) {
      if (!el.classList.contains('reveal') && !el.classList.contains('enhance-reveal')) {
        el.classList.add('enhance-reveal');
      }
    });

    if (!reducedMotion && 'IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      document.querySelectorAll('.enhance-reveal').forEach(function (el) { revealObserver.observe(el); });
    } else {
      document.querySelectorAll('.enhance-reveal').forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  if (FEATURES.stickyCta || FEATURES.scrollProgress) {
    var floatingCta = document.querySelector('.floating-cta');
    var ticking = false;
    var update = function () {
      var doc = document.documentElement;
      var scrollTop = window.scrollY || doc.scrollTop || 0;
      var max = Math.max(1, doc.scrollHeight - window.innerHeight);
      var ratio = Math.min(1, Math.max(0, scrollTop / max));
      if (FEATURES.stickyCta && floatingCta) {
        floatingCta.classList.toggle('is-visible', ratio > 0.3);
      }
      if (FEATURES.scrollProgress) {
        root.style.setProperty('--se-progress', (ratio * 100).toFixed(2) + '%');
      }
      ticking = false;
    };

    var onScroll = function () {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

})();
