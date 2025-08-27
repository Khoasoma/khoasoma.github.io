// Simple profile interactions (typing, status, anime rotation, radio)
const DISCORD_ID = '808974657994752050';
const roles = [ 'minecraft dev', 'backend optimizer', 'infra nerd', 'latency chaser', 'java / python / node' ];
const animeList = [
  'Frieren', 'Otonari no Tenshi-sama', 'Roshidere', 'Kobayashi-san', 'Elaina Journey', 'SAO', 'JJK', 'Dark Gathering', 'Senko-san', 'Kimi no Koto 100-nin', 'Kubo-san', 'Demon Slayer'
];
let animeIndex=0; function rotateAnime(){ const el = document.getElementById('anime'); if(!el) return; el.textContent = animeList[animeIndex]; animeIndex=(animeIndex+1)%animeList.length; } setInterval(rotateAnime,4000); rotateAnime();

// Typing effect
let roleI=0, charI=0, deleting=false, next=0; function loop(t){ if(t<next){ requestAnimationFrame(loop); return;} const el=document.getElementById('typed'); if(!el) return; const cur=roles[roleI]; if(!deleting){ charI++; el.textContent=cur.slice(0,charI); if(charI===cur.length){ deleting=true; next=t+1500; } else next=t+70+Math.random()*60; } else { charI--; el.textContent=cur.slice(0,charI); if(charI===0){ deleting=false; roleI=(roleI+1)%roles.length; next=t+400; } else next=t+38; } requestAnimationFrame(loop);} requestAnimationFrame(loop);

// Age calculation (set your birth year)
(function(){ const birthYear=2008; const age=new Date().getFullYear()-birthYear; const el=document.getElementById('age'); if(el) el.textContent=age+'y'; })();

// Simple year-end countdown
(function countdown(){ const end=new Date(new Date().getFullYear(),11,31,23,59,59); function tick(){ const now=new Date(); const el=document.getElementById('countdown'); if(!el) return; const diff=end-now; if(diff<=0){ el.textContent='🎉 New cycle ready'; return;} const d=Math.floor(diff/86400000); const h=Math.floor(diff%86400000/3600000); el.textContent=d+'d '+h+'h left this year'; } tick(); setInterval(tick,3600000); })();

// Discord status (Lanyard)
async function fetchStatus(){ try { const r=await fetch('https://api.lanyard.rest/v1/users/'+DISCORD_ID); if(!r.ok) throw new Error(r.status); const data=await r.json(); const st=data?.data?.discord_status||'offline'; const el=document.getElementById('status'); if(el){ el.className='status '+st; el.title=st; } } catch(e){ console.warn('status fetch failed',e);} } fetchStatus(); setInterval(fetchStatus,60000);

// Radio (example stream) - change URL if you have your own
let radio=null; let playing=false; const radioBtn=document.getElementById('radioBtn'); const nowPlaying=document.getElementById('nowPlaying'); function toggleRadio(){ if(!radio){ radio=new Audio('https://stream.zeno.fm/fikggbpoi71vv'); radio.play().then(()=>{ playing=true; updateBtn(); }); radio.addEventListener('error',()=>{ nowPlaying.textContent='radio error'; }); return;} if(playing){ radio.pause(); playing=false; } else { radio.play(); playing=true; } updateBtn(); }
function updateBtn(){ if(!radioBtn) return; radioBtn.textContent=playing?'⏸ pause radio':'▶ play radio'; nowPlaying.textContent=playing?'streaming chill audio':'idle'; }
if(radioBtn) radioBtn.addEventListener('click', toggleRadio);
