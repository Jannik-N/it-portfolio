const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  nav.classList.toggle('is-open', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Menü öffnen');
  nav.classList.remove('is-open');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

// Zuverlässig nach oben scrollen, auch wenn der Header sticky ist.
document.querySelector('.back-to-top')?.addEventListener('click', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({top: 0, behavior: reduceMotion ? 'instant' : 'smooth'});
});


// Farbschema: V8 bleibt Standard, dunkle Alternative auf Wunsch.
const themeToggle = document.querySelector('.theme-toggle');
function updateThemeButton() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  themeToggle?.setAttribute('aria-pressed', String(isDark));
  themeToggle?.setAttribute('aria-label', isDark ? 'Light Mode einschalten' : 'Dark Mode einschalten');
  if (themeToggle) themeToggle.querySelector('.theme-toggle-label').textContent = isDark ? 'Light Mode' : 'Dark Mode';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#0c1438' : '#101943');
}
updateThemeButton();
themeToggle?.addEventListener('click', () => {
  const isDark = document.documentElement.dataset.theme === 'dark';
  if (isDark) delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = 'dark';
  try {localStorage.setItem('portfolio-theme', isDark ? 'light' : 'dark');} catch (e) { /* Storage eventuell gesperrt */ }
  updateThemeButton();
});
