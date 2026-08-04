const menuButton = document.querySelector('[data-menu-button]');
const mobileNav = document.querySelector('[data-mobile-nav]');
const header = document.querySelector('[data-header]');

if (menuButton && mobileNav) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Mở menu');
    mobileNav.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Mở menu' : 'Đóng menu');
    mobileNav.classList.toggle('is-open', !isOpen);
  });

  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
}

const revealItems = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px' });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const wafer = document.querySelector('[data-wafer]');
if (wafer && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  const stage = wafer.parentElement;

  stage.addEventListener('pointermove', (event) => {
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    wafer.style.transform = `perspective(800px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });

  stage.addEventListener('pointerleave', () => {
    wafer.style.transform = '';
  });
}

const BIRTH = new Date(2011, 1, 3);
document.querySelectorAll('[data-age]').forEach((node) => {
  const now = new Date();
  let age = now.getFullYear() - BIRTH.getFullYear();
  const beforeBirthday = now.getMonth() < BIRTH.getMonth()
    || (now.getMonth() === BIRTH.getMonth() && now.getDate() < BIRTH.getDate());
  node.textContent = String(beforeBirthday ? age - 1 : age);
});

// Discord presence via Lanyard (needs the account to be in discord.gg/lanyard).
// ponytail: 60s REST poll, switch to the Lanyard websocket if instant updates matter.
const presence = document.querySelector('[data-presence]');
if (presence) {
  const DISCORD_ID = '808974657994752050';
  const led = presence.querySelector('.status-led');
  const avatar = presence.querySelector('[data-presence-avatar]');
  const name = presence.querySelector('[data-presence-name]');
  const state = presence.querySelector('[data-presence-state]');
  const activity = presence.querySelector('[data-presence-activity]');
  const labels = presence.dataset.presence === 'en'
    ? { online: 'Online', idle: 'Idle', dnd: 'Do not disturb', offline: 'Offline', none: 'No activity', fail: 'Presence unavailable' }
    : { online: 'Đang trực tuyến', idle: 'Tạm vắng', dnd: 'Không làm phiền', offline: 'Ngoại tuyến', none: 'Không có hoạt động', fail: 'Không lấy được trạng thái' };

  const render = (data) => {
    const status = data.discord_status || 'offline';
    led.dataset.status = status;
    name.textContent = data.discord_user?.display_name || data.discord_user?.username || 'khoasoma';
    state.textContent = labels[status] || labels.offline;

    if (data.discord_user?.avatar) {
      avatar.src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.discord_user.avatar}.png?size=128`;
      avatar.hidden = false;
    }

    const current = (data.activities || []).find((item) => item.type !== 4);
    activity.innerHTML = current
      ? `<b>${current.name}</b>${current.details ? ` — ${current.details}` : ''}`
      : labels.none;
  };

  const fail = () => {
    led.dataset.status = 'offline';
    state.textContent = labels.fail;
  };

  const load = () => fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
    .then((res) => res.json())
    .then((body) => (body.success ? render(body.data) : fail()))
    .catch(fail);

  load();
  setInterval(load, 60000);
}
