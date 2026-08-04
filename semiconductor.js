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

// ---------- GNU/Linux-style boot screen ----------
// Net names below (PS_FBVDDQ, OPENVREG, GDDR5X) come from the schematic used as
// the page background, so the log reads as this board actually powering up.
const boot = document.getElementById('boot');
if (boot) {
  const screen = boot.querySelector('pre');
  const ok = '<span class="boot-ok">[  OK  ]</span>';
  const stamp = (t) => `<span class="boot-dim">[${t.toFixed(6).padStart(11)}]</span>`;
  const LINES = [
    `${stamp(0)} Linux version 6.9.4-khoasoma (gcc 13.2.0) #1 SMP PREEMPT_DYNAMIC`,
    `${stamp(0)} Command line: BOOT_IMAGE=/boot/vmlinuz root=/dev/khoasoma ro quiet`,
    `${stamp(0.041207)} BIOS-provided physical RAM map:`,
    `${stamp(0.041318)}   usable 0x0000000000000000 - 0x000000015d600000`,
    `${stamp(0.083941)} smp: Bringing up secondary CPUs ...`,
    `${stamp(0.149772)} smp: Brought up 1 node, 16 CPUs`,
    `${stamp(0.201355)} regulator OPENVREG: 2-phase buck, PGOOD asserted`,
    `${stamp(0.238104)} <span class="boot-sig">PS_FBVDDQ</span>: GDDR5X rail nominal 1.35V ... locked`,
    `${stamp(0.276410)} PS_FBVDDQ_PHASE1 / PHASE2 balanced, OCS_CB nominal`,
    `${stamp(0.310922)} <span class="boot-warn">[ WARN ]</span> C206 footprint unpopulated - GM amp comp bypassed`,
    `${stamp(0.377518)} remote sense: nearest + farthest MEM taps calibrated`,
    `${stamp(0.402883)} thermal: THERM/GND within envelope`,
    `${stamp(0.461099)} Freeing unused kernel image memory: 2612K`,
    `${stamp(0.519204)} systemd 255 running in system mode`,
    '',
    `${ok} Mounted <span class="boot-sig">/dev/portfolio</span>`,
    `${ok} Started backend.service`,
    `${ok} Started infrastructure.service`,
    `${ok} Started performance-tuning.service`,
    `${ok} Listening on discord-presence.socket`,
    `${ok} Reached target <span class="boot-sig">Freelancer — Ready for job</span>`,
    '',
    'khoasoma login: <span class="boot-cursor"></span>',
  ];

  const finish = () => {
    if (boot.classList.contains('is-done')) return;
    boot.classList.add('is-done');
    document.documentElement.style.overflow = '';
    sessionStorage.setItem('booted', '1');
    setTimeout(() => boot.remove(), 600);
  };

  if (reduceMotion || sessionStorage.getItem('booted')) {
    boot.remove();
  } else {
    document.documentElement.style.overflow = 'hidden';
    boot.addEventListener('click', finish);
    window.addEventListener('keydown', finish, { once: true });

    let i = 0;
    const tick = () => {
      if (i >= LINES.length) {
        setTimeout(finish, 480);
        return;
      }
      screen.insertAdjacentHTML('beforeend', `${LINES[i]}\n`);
      i += 1;
      setTimeout(tick, 38 + Math.random() * 55);
    };
    tick();
  }
}

// ---------- Discord profile ----------
// Presence  -> Lanyard   (needs the account in discord.gg/lanyard, no key)
// Profile   -> dstn.to   (banner, bio, badges, connections; no key)
// ponytail: both are 60s/one-shot REST polls. Swap Lanyard for its websocket if
// instant presence updates ever matter.
const dcard = document.querySelector('[data-dcard]');
if (dcard) {
  const ID = '808974657994752050';
  const pick = (sel) => dcard.querySelector(sel);
  const led = pick('.status-led');
  const banner = pick('[data-dc-banner]');
  const avatar = pick('[data-dc-avatar]');
  const deco = pick('[data-dc-deco]');
  const name = pick('[data-dc-name]');
  const tag = pick('[data-dc-tag]');
  const state = pick('[data-dc-state]');
  const custom = pick('[data-dc-custom]');
  const bio = pick('[data-dc-bio]');
  const meta = pick('[data-dc-meta]');
  const badges = pick('[data-dc-badges]');
  const links = pick('[data-dc-links]');
  const activity = pick('[data-dc-activity]');

  const en = dcard.dataset.dcard === 'en';
  const L = en
    ? { online: 'Online', idle: 'Idle', dnd: 'Do not disturb', offline: 'Offline', none: 'No activity', fail: 'Presence unavailable', playing: 'Playing' }
    : { online: 'Đang trực tuyến', idle: 'Tạm vắng', dnd: 'Không làm phiền', offline: 'Ngoại tuyến', none: 'Không có hoạt động', fail: 'Không lấy được trạng thái', playing: 'Đang chơi' };

  // Only accounts that make sense on a portfolio get a link; anything not listed
  // here (paypal, riot, ...) is dropped rather than published.
  const PROFILE_URL = {
    github: (c) => `https://github.com/${c.name}`,
    youtube: (c) => `https://youtube.com/channel/${c.id}`,
    twitch: (c) => `https://twitch.tv/${c.name}`,
    twitter: (c) => `https://x.com/${c.name}`,
    reddit: (c) => `https://reddit.com/u/${c.name}`,
    spotify: (c) => `https://open.spotify.com/user/${c.id}`,
    steam: (c) => `https://steamcommunity.com/profiles/${c.id}`,
    instagram: (c) => `https://instagram.com/${c.name}`,
  };

  const cdnExt = (hash) => (String(hash).startsWith('a_') ? 'gif' : 'png');

  const renderPresence = (data) => {
    const status = data.discord_status || 'offline';
    led.dataset.status = status;
    state.textContent = L[status] || L.offline;

    const user = data.discord_user || {};
    name.textContent = user.display_name || user.global_name || user.username || 'khoasoma';

    if (user.avatar) {
      avatar.src = `https://cdn.discordapp.com/avatars/${ID}/${user.avatar}.${cdnExt(user.avatar)}?size=160`;
      avatar.hidden = false;
    }
    if (user.avatar_decoration_data?.asset) {
      deco.src = `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png?size=160&passthrough=true`;
      deco.hidden = false;
    }
    if (user.primary_guild?.tag) {
      tag.textContent = user.primary_guild.tag;
      if (user.primary_guild.badge && user.primary_guild.identity_guild_id) {
        const img = new Image();
        img.src = `https://cdn.discordapp.com/guild-tag-badges/${user.primary_guild.identity_guild_id}/${user.primary_guild.badge}.png?size=32`;
        img.alt = '';
        tag.prepend(img);
      }
      tag.hidden = false;
    }

    const acts = data.activities || [];
    const status4 = acts.find((a) => a.type === 4);
    if (status4?.state) {
      custom.textContent = status4.state;
      if (status4.emoji?.id) {
        const img = new Image();
        img.src = `https://cdn.discordapp.com/emojis/${status4.emoji.id}.${status4.emoji.animated ? 'gif' : 'png'}?size=32`;
        img.alt = '';
        custom.prepend(img);
      } else if (status4.emoji?.name) {
        custom.prepend(`${status4.emoji.name} `);
      }
      custom.hidden = false;
    }

    const playing = acts.find((a) => a.type !== 4);
    activity.textContent = '';
    if (playing) {
      const label = document.createElement('b');
      label.textContent = playing.name;
      activity.append(`${L.playing} · `, label);
      if (playing.details) activity.append(` — ${playing.details}`);
    } else {
      activity.textContent = L.none;
    }
  };

  const renderProfile = (payload) => {
    const user = payload.user || {};
    const profile = payload.user_profile || {};

    if (user.banner) {
      banner.style.backgroundImage = `url("https://cdn.discordapp.com/banners/${ID}/${user.banner}.${cdnExt(user.banner)}?size=600")`;
    } else if (user.banner_color) {
      banner.style.background = user.banner_color;
    }

    const text = profile.bio || user.bio;
    if (text) {
      // Discord writes custom emoji as <:name:id> / <a:name:id>. Swap the tokens for
      // the CDN image; only the digits are reused, so nothing from the bio reaches the DOM
      // as markup.
      const parts = text.trim().split(/<(a?):\w+:(\d+)>/g);
      parts.forEach((part, i) => {
        const slot = i % 3;
        if (slot === 0) { bio.append(part); return; }
        if (slot === 2) {
          const img = new Image();
          img.src = `https://cdn.discordapp.com/emojis/${part}.${parts[i - 1] === 'a' ? 'gif' : 'png'}?size=32`;
          img.alt = '';
          bio.append(img);
        }
      });
      bio.hidden = false;
    }

    if (profile.pronouns) {
      meta.textContent = `${en ? 'Pronouns' : 'Xưng hô'} · ${profile.pronouns}`;
      meta.hidden = false;
    }

    (payload.badges || []).forEach((badge) => {
      if (!badge.icon) return;
      const li = document.createElement('li');
      const img = new Image();
      img.src = `https://cdn.discordapp.com/badge-icons/${badge.icon}.png`;
      img.alt = badge.description || badge.id || '';
      li.title = badge.description || badge.id || '';
      li.append(img);
      badges.append(li);
      badges.hidden = false;
    });

    (payload.connected_accounts || []).forEach((conn) => {
      const build = PROFILE_URL[conn.type];
      if (!build || !conn.verified) return;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = build(conn);
      a.target = '_blank';
      a.rel = 'noreferrer';
      const type = document.createElement('em');
      type.textContent = conn.type;
      const handle = document.createElement('b');
      handle.textContent = conn.name;
      const arrow = document.createElement('i');
      arrow.textContent = '↗';
      arrow.setAttribute('aria-hidden', 'true');
      a.append(type, handle, arrow);
      li.append(a);
      links.append(li);
      links.hidden = false;
    });
  };

  const fail = () => {
    led.dataset.status = 'offline';
    state.textContent = L.fail;
  };

  const loadPresence = () => fetch(`https://api.lanyard.rest/v1/users/${ID}`)
    .then((res) => res.json())
    .then((body) => (body.success ? renderPresence(body.data) : fail()))
    .catch(fail);

  loadPresence();
  setInterval(loadPresence, 60000);

  // Profile data barely changes; fetch it once per page load.
  fetch(`https://dcdn.dstn.to/profile/${ID}`)
    .then((res) => res.json())
    .then(renderProfile)
    .catch(() => { /* card still works on presence data alone */ });
}
