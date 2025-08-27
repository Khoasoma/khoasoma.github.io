// Lightweight dynamic behaviors (status fetch, typing, countdown, vibes)
const DISCORD_ID = '808974657994752050';
const roles = [
  'creative dev',
  'minecraft optimizer',
  'infra tinkerer',
  'async enjoyer',
  'low-latency nerd'
];
const vibes = [
  'Write code. Measure. Trim. Repeat.',
  'Less surface area = fewer bugs.',
  'Latency is UX you cannot theme away.',
  'Coffee-free commit session engaged.',
  'Edge cache warm & vibes cold.'
];
let roleIndex = 0; let charIndex = 0; let deleting = false; let nextTick = 0;
function typeLoop(ts){
  if(ts < nextTick){ requestAnimationFrame(typeLoop); return; }
  const el = document.getElementById('rolesTyper'); if(!el) return;
  const current = roles[roleIndex];
  if(!deleting){
    charIndex++;
    el.textContent = current.slice(0,charIndex);
    if(charIndex === current.length){ deleting = true; nextTick = ts + 1700; }
    else nextTick = ts + 80 + Math.random()*60;
  } else {
    charIndex--;
    el.textContent = current.slice(0,charIndex);
    if(charIndex === 0){ deleting = false; roleIndex = (roleIndex+1)%roles.length; nextTick = ts + 400; }
    else nextTick = ts + 40;
  }
  requestAnimationFrame(typeLoop);
}
requestAnimationFrame(typeLoop);

// Countdown (example: days until year end) - adapt if you have birthday
const target = new Date(new Date().getFullYear(),11,31,23,59,59);
function updateCountdown(){
  const el = document.getElementById('countdown'); if(!el) return;
  const now = new Date();
  if(now > target){ el.textContent = '🎉 Ready for a new cycle.'; return; }
  const diff = target - now;
  const days = Math.floor(diff/86400000);
  const hours = Math.floor(diff%86400000/3600000);
  el.textContent = days + 'd ' + hours + 'h left in ' + now.getFullYear();
}
updateCountdown(); setInterval(updateCountdown, 3600000);

// Age badge (static example year) adjust your birth year
(function setAge(){
  const birthYear = 2008; // change as needed
  const age = new Date().getFullYear() - birthYear;
  const el = document.getElementById('ageBadge'); if(el) el.textContent = age + 'y';
})();

// Discord presence (Lanyard)
async function fetchStatus(){
  try {
    const r = await fetch('https://api.lanyard.rest/v1/users/' + DISCORD_ID);
    if(!r.ok) throw new Error('status ' + r.status);
    const data = await r.json();
    const st = data?.data?.discord_status || 'offline';
    const dot = document.getElementById('status-dot');
    if(dot){ dot.className = 'status ' + st; dot.title = 'Discord: ' + st; }
  } catch(e){ console.warn('status fetch fail', e); }
}
fetchStatus(); setInterval(fetchStatus, 60000);

// Rotating vibes line
(function vibeRotate(){
  const el = document.getElementById('vibeLine'); if(!el) return;
  let idx = 0;
  function tick(){ el.textContent = vibes[idx]; idx = (idx+1)%vibes.length; }
  tick(); setInterval(tick, 5000);
})();
