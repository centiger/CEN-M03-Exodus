let DATA;
const CEN_BIBLE_URL='https://centiger.github.io/CEN-Bible2.0/';

function escapeHtml(value){
  return String(value ?? '').replace(/[&<>"]/g,ch=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'
  }[ch]));
}

function normalizeCenBibleRef(value){
  let ref=String(value||'').trim().replace(/\s+/g,' ');
  if(!ref) return '';

  // 장 범위: 출애굽기 1-2장 / 3~15장 → 시작 장 1절
  let m=ref.match(/^(.+?)\s*(\d+)\s*[~～\-–—]\s*\d+\s*장$/);
  if(m) return `${m[1].trim()} ${m[2]}:1`;

  // 장만 표시: 출애굽기 3장 → 출애굽기 3:1
  m=ref.match(/^(.+?)\s*(\d+)\s*장$/);
  if(m) return `${m[1].trim()} ${m[2]}:1`;

  // 절 범위: 출애굽기 12:13-14 → 출애굽기 12:13
  m=ref.match(/^(.+?)\s*(\d+)\s*:\s*(\d+)\s*[~～\-–—]\s*\d+$/);
  if(m) return `${m[1].trim()} ${m[2]}:${m[3]}`;

  // 장 표기 생략: 출애굽기 3 → 출애굽기 3:1
  m=ref.match(/^(.+?)\s+(\d+)$/);
  if(m) return `${m[1].trim()} ${m[2]}:1`;

  return ref.replace(/\s*:\s*/g,':');
}

function cenBibleUrl(ref){
  return `${CEN_BIBLE_URL}?ref=${encodeURIComponent(normalizeCenBibleRef(ref))}`;
}

function bibleLinkHtml(label,className=''){
  const text=String(label||'').trim();
  if(!text) return '';
  return `<a class="bibleLink ${className}" href="${escapeHtml(cenBibleUrl(text))}" aria-label="CEN Bible 2.0에서 ${escapeHtml(text)} 열기">${escapeHtml(text)}</a>`;
}

function renderVerseHtml(value){
  const text=String(value||'');
  // 대표성구 끝의 '— 출애굽기 2:24' 부분만 링크 처리
  const m=text.match(/^(.*?)(\s*[—–-]\s*)([가-힣]+(?:\s?[가-힣]+)*\s*\d+\s*:\s*\d+(?:\s*[~～\-–—]\s*\d+)?)\s*$/);
  if(!m) return escapeHtml(text);
  return `${escapeHtml(m[1])}${escapeHtml(m[2])}${bibleLinkHtml(m[3],'verseRef')}`;
}

function bibleList(arr){
  return (arr||[]).map(ref=>`<li>${bibleLinkHtml(ref,'refLink')}</li>`).join('');
}
function qs(k){return new URLSearchParams(location.search).get(k)}
function li(arr){return (arr||[]).map(x=>`<li>${x}</li>`).join('')}
function explore(arr){
function iconForStep(t){
t=String(t||'');

// M03 hubs.json 흐름 문구에는 이미 이모티가 들어가 있음.
// 이미 이모티가 있는 단계에는 추가 이모티를 붙이지 않음.
if(/\p{Extended_Pictographic}/u.test(t)) return '';

// 혹시 이모티가 빠진 흐름 문구가 들어올 경우를 위한 보조 매핑
if(/압제|고난|노예|탄압|박해/.test(t)) return '⛓️';
if(/요셉/.test(t)) return '🌾';
if(/애굽정착/.test(t)) return '🏺';
if(/민족번성|번성/.test(t)) return '👥';
if(/모세/.test(t)) return '👶';
if(/바로|파라오/.test(t)) return '👑';
if(/열\s*재앙|재앙/.test(t)) return '⚡';
if(/유월절|어린양|피/.test(t)) return '🐑';
if(/출애굽|홍해|바다/.test(t)) return '🌊';
if(/광야|방황|40년|사십/.test(t)) return '🏜️';
if(/만나|메추라기|양식/.test(t)) return '🍞';
if(/반석|물/.test(t)) return '💧';
if(/정탐|가데스|두려움/.test(t)) return '👀';
if(/불순종|원망|반역/.test(t)) return '😣';
if(/시내산|산/.test(t)) return '⛰️';
if(/십계명|계명|율법|언약|말씀|신명기|언약갱신/.test(t)) return '📜';
if(/성막|회막|임재/.test(t)) return '⛺';
if(/성전|새 예루살렘/.test(t)) return '🏰';
if(/제사|제사장|레위/.test(t)) return '🕯️';
if(/교회/.test(t)) return '⛪';
if(/여호수아|후계|계승/.test(t)) return '🛡️';
if(/가나안|약속의 땅|약속의땅/.test(t)) return '🏞️';
if(/아브라함/.test(t)) return '🐪';
if(/다윗/.test(t)) return '👑';
if(/생명의 떡/.test(t)) return '🍞';
if(/영원한 생명/.test(t)) return '✨';
if(/예수|그리스도|십자가|복음|구원/.test(t)) return '✝️';

return '📌';
}
function flowHtml(text){
 const parts=String(text||'').split(/\s*→\s*/).map(v=>v.trim()).filter(Boolean);
 if(parts.length<2) return text.replace(/\n/g,'<br>');
 return parts.map((s,i)=>{const icon=iconForStep(s);return `<span class="flowLine">${icon?icon+' ':''}${s}</span>${i<parts.length-1?'<span class="flowArrow">↓</span>':''}`}).join('');
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
  document.getElementById('verse').innerHTML=renderVerseHtml(h.verse);
  document.getElementById('events').innerHTML=li(h.events);
  document.getElementById('meaning').innerHTML=li(h.meaning);
  document.getElementById('connectionsList').innerHTML=explore(h.connections);
  document.getElementById('integrationList').innerHTML=explore(h.integration||h.integrated);
  document.getElementById('refs').innerHTML=bibleList(h.refs);
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
