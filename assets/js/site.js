// Shared page behaviour. Loaded with `defer` on every page.

// FAQ accordions. Several pages carried two inline click handlers for the same buttons, which cancelled each
// other out (open, then immediately closed). Handling the click here in the capture phase and stopping it means
// every page gets one consistent toggle, whatever older inline scripts it still has.
document.addEventListener(
  'click',
  function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('.faq-btn') : null;
    if (!btn) return;
    var item = btn.closest('.faq-item') || btn.parentElement;
    var content = item && (item.querySelector('.faq-content, .faq-answer') || btn.nextElementSibling);
    if (!content) return;
    e.stopPropagation();
    e.preventDefault();
    var wasOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', wasOpen ? 'false' : 'true');
    content.classList.toggle('hidden', wasOpen);
    var icon = btn.querySelector('.faq-icon');
    if (icon && /^[↑↓]$/.test(icon.textContent.trim())) icon.textContent = wasOpen ? '↓' : '↑';
  },
  true
);

// Mobile navigation drawer. Most pages show the drawer through the `body.mobile-nav-open` CSS state, but a few
// carried a copied controller that toggled different classes and ids, so the menu never opened. Pages whose
// drawer wrapper is shown via that CSS state (wrapper without the `hidden` class) are handled here; pages with
// their own class-based drawer keep their original script.
(function () {
  var wrapper = document.getElementById('mobile-nav-wrapper');
  if (!wrapper || wrapper.classList.contains('hidden')) return;
  var openBtn = document.getElementById('mobile-menu-btn');
  function setOpen(open) {
    document.body.classList.toggle('mobile-nav-open', open);
    wrapper.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  document.addEventListener(
    'click',
    function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      var opening = t.closest('#mobile-menu-btn');
      var closing = t.closest('#mobile-nav-close-btn, #mobile-nav-close, #mobile-nav-backdrop');
      var navLink = t.closest('#mobile-nav a');
      if (opening) {
        e.stopPropagation();
        e.preventDefault();
        setOpen(!document.body.classList.contains('mobile-nav-open'));
      } else if (closing) {
        e.stopPropagation();
        e.preventDefault();
        setOpen(false);
      } else if (navLink) {
        setOpen(false);
      }
    },
    true
  );
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('mobile-nav-open')) setOpen(false);
  });
})();

// Desktop menu-bar dropdowns open on hover and keyboard focus through CSS. Buttons marked `data-nav-dropdown`
// also toggle their panel on click (touch screens), and Escape or a click elsewhere closes it. Handled in the
// capture phase so older inline toggles on some pages don't fire a second time.
(function () {
  function closeAll(except) {
    var btns = document.querySelectorAll('[data-nav-dropdown]');
    for (var i = 0; i < btns.length; i++) {
      var panel = document.getElementById(btns[i].getAttribute('aria-controls'));
      if (!panel || panel === except) continue;
      panel.classList.remove('open');
      btns[i].setAttribute('aria-expanded', 'false');
    }
  }
  document.addEventListener(
    'click',
    function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-nav-dropdown]') : null;
      if (!btn) {
        if (!(e.target && e.target.closest && e.target.closest('.dropdown-panel'))) closeAll(null);
        return;
      }
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      e.stopPropagation();
      e.preventDefault();
      var open = !panel.classList.contains('open');
      closeAll(panel);
      panel.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    },
    true
  );
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeAll(null);
    if (document.activeElement && document.activeElement.closest && document.activeElement.closest('.dropdown-panel')) {
      document.activeElement.blur();
    }
  });
})();

(function () {
  // Two-tier sticky header: let the logo tier scroll away and keep only the amber navigation bar pinned,
  // so the sticky area stays small on phones. Pages with a single-tier header are left unchanged.
  var header = document.querySelector('header.sticky');
  if (!header) return;
  var logoTier = header.firstElementChild;
  var navBar = logoTier && logoTier.nextElementSibling;
  if (!logoTier || !navBar || !/bg-\[#F59E0B\]/.test(navBar.className)) return;

  function pinNavBar() {
    header.style.top = -logoTier.offsetHeight + 'px';
  }
  pinNavBar();
  window.addEventListener('resize', pinNavBar);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(pinNavBar);
})();
