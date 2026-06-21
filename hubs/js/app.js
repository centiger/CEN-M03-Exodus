let DATA;
function qs(k){return new URLSearchParams(location.search).get(k)}
function li(arr){return (arr||[]).map(x=>`<li>${x}</li>`).join('')}
function explore(arr){
function iconForStep(t){
t=String(t||'');

// M03 출애굽·광야시대 흐름 상징 확장
if(/압제|고난|노예|탄압|박해/.test(t)) return '⛓️';
if(/모세|소명|부르심|떨기나무|불붙은/.test(t)) return '🔥';
if(/아론/.test(t)) return '🗣️';
if(/바로|파라오/.test(t)) return '👑';
if(/열\s*재앙|재앙/.test(t)) return '⚡';
if(/유월절|어린양|피/.test(t)) return '🐑';
if(/출애굽|애굽|홍해|바다/.test(t)) return '🌊';
if(/구름기둥|불기둥|인도/.test(t)) return '☁️';
if(/광야|방황|40년|사십/.test(t)) return '🏜️';
if(/만나|메추라기|양식/.test(t)) return '🍞';
if(/반석|물/.test(t)) return '💧';
if(/시내산|산/.test(t)) return '⛰️';
if(/십계명|계명/.test(t)) return '🔟';
if(/율법|언약|말씀/.test(t)) return '📜';
if(/금송아지|우상/.test(t)) return '🐂';
if(/성막|회막|임재/.test(t)) return '⛺';
if(/제사|제사장|레위/.test(t)) return '🕯️';
if(/불순종|원망|반역/.test(t)) return '😣';
if(/정탐|가데스|두려움/.test(t)) return '👀';
if(/놋뱀|뱀/.test(t)) return '🐍';
if(/모압|요단/.test(t)) return '🏕️';
if(/여호수아|후계|계승/.test(t)) return '🛡️';
if(/가나안|약속의 땅|약속의땅/.test(t)) return '🏞️';
if(/예수|그리스도|복음|구원/.test(t)) return '✝️';

return '📌';
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
  document.getElementById('connectionsList').innerHTML=explore(h.connections);
  document.getElementById('integrationList').innerHTML=explore(h.integration||h.integrated);
  document.getElementById('refs').innerHTML=li(h.refs);
  document.getElementById('message').textContent=h.message;
  document.getElementById('nextBtn').textContent=h.next?.label||'다음 허브';
  document.getElementById('nextBtn').onclick=()=>nav(h.next);

  // 해시 이동 보정: 데이터 렌더링 후 Meaning/파노라마 제목이 보이도록 이동
  if(location.hash){
    const targetId=location.hash.replace('#','');
    const target=document.getElementById(targetId);
    if(target){
      const scrollToTarget=()=>{
        const offset=90;
        const top=target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({top:Math.max(0,top),behavior:'auto'});
      };
      setTimeout(scrollToTarget,80);
      setTimeout(scrollToTarget,350);
    }
  }
});
