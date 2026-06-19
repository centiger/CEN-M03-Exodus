let DATA;
function qs(k){return new URLSearchParams(location.search).get(k)}
function li(arr){return (arr||[]).map(x=>`<li>${x}</li>`).join('')}
function explore(arr){
  return (arr||[]).map(x=>{
    if(typeof x==='string') return `<div class="exploreCard"><p>${x}</p></div>`;
    const title=x.title||x.label||'';
    const text=x.text||x.content||'';
    return `<div class="exploreCard">${title?`<b>${title}</b>`:''}<p>${text}</p></div>`;
  }).join('');
}
function nav(target){if(!target)return;if(target.hub)location.href=`index.html?hub=${encodeURIComponent(target.hub)}`;else if(target.url)location.href=target.url}
function openList(){if(!DATA)return;const modal=document.getElementById('listModal');const list=document.getElementById('hubList');list.innerHTML=DATA.hubs.map(h=>`<button class="hubItem" onclick="location.href='index.html?hub=${encodeURIComponent(h.id)}'"><span class="hubItemIcon">${h.icon||''}</span><span class="hubItemText">${h.title}<small>${h.subtitle}</small></span></button>`).join('');modal.classList.add('show')}
function closeList(){document.getElementById('listModal').classList.remove('show')}
fetch('data/hubs.json').then(r=>r.json()).then(data=>{
  DATA=data;
  const id=qs('hub')||'oppression';
  const h=data.hubs.find(x=>x.id===id)||data.hubs[0];
  document.getElementById('hubIcon').textContent=h.icon||'';
  document.getElementById('title').textContent=h.title;
  document.getElementById('subtitle').textContent=h.subtitle;
  document.getElementById('theme').textContent=h.theme;
  document.getElementById('mapText').textContent=h.mapText;
  document.getElementById('map').src=h.map;
  document.getElementById('verse').textContent=h.verse;
  document.getElementById('events').innerHTML=li(h.events);
  document.getElementById('meaning').innerHTML=li(h.meaning);
  document.getElementById('connections').innerHTML=explore(h.connections);
  document.getElementById('integration').innerHTML=explore(h.integration||h.integrated);
  document.getElementById('refs').innerHTML=li(h.refs);
  document.getElementById('message').textContent=h.message;
  document.getElementById('nextBtn').textContent=h.next?.label||'다음 허브';
  document.getElementById('nextBtn').onclick=()=>nav(h.next);
});
