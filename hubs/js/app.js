let DATA;
function qs(k){return new URLSearchParams(location.search).get(k)}
function li(arr){return (arr||[]).map(x=>`<li>${x}</li>`).join('')}
function explore(arr){
function iconForStep(t){
t=String(t||'');
if(/출애굽|애굽/.test(t)) return '🌊';
if(/광야/.test(t)) return '🏜️';
if(/율법/.test(t)) return '📜';
if(/성막/.test(t)) return '⛺';
if(/가나안/.test(t)) return '🏞️';
if(/예수|그리스도/.test(t)) return '✝️';
return '🔹';
}
function flowHtml(text){
 const parts=String(text||'').split(/\s*→\s*/).map(v=>v.trim()).filter(Boolean);
 if(parts.length<2) return text.replace(/\n/g,'<br>');
 return parts.map((s,i)=>`<span class="flowLine">${iconForStep(s)} ${s}</span>${i<parts.length-1?'<span class="flowArrow">↓</span>':''}`).join('');
}
return (arr||[]).map(x=>{
 let title='',text='';
 if(typeof x==='string'){
   if(x.includes('|')){let a=x.split('|');title=a.shift().trim();text=a.join('|').trim();} else text=x;
 }else{title=x.title||x.label||'';text=x.text||x.content||'';}
 if(title.includes('|')){let a=title.split('|');title=a.shift().trim();text=a.join('|').trim();}
 const body=/연결\s*흐름|성경\s*전체\s*흐름/.test(title)||text.includes('→')?flowHtml(text):text.replace(/\s*\|\s*/g,'<br><br>');
 return `<div class="exploreCard">${title?`<b>${title}</b>`:''}<p>${body}</p></div>`;
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
