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

  if (FEATURES.darkMode) {
    var savedTheme = localStorage.getItem('skyshield-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      root.setAttribute('data-theme', savedTheme);
    }

    var linksNav = document.querySelector('.links');
    var themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle && linksNav) {
      themeToggle = document.createElement('button');
      themeToggle.id = 'theme-toggle';
      themeToggle.className = 'theme-toggle';
      themeToggle.type = 'button';
      themeToggle.setAttribute('aria-label', 'Toggle dark mode');
      themeToggle.textContent = '?';
      linksNav.appendChild(themeToggle);
    }

    if (themeToggle) {
      var updateToggle = function () {
        var dark = root.getAttribute('data-theme') === 'dark';
        themeToggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
        themeToggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
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
