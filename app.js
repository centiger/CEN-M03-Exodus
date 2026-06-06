const wrap = document.getElementById('matrixWrap');
const img = document.querySelector('.matrix-bg');
const dialog = document.getElementById('infoDialog');
const title = document.getElementById('dialogTitle');
const body = document.getElementById('dialogBody');
const closeDialog = document.getElementById('closeDialog');
const hubList = document.getElementById('hubList');
const hubActions = document.getElementById('hubActions');

let y = 0;
let minY = 0;
let dragging = false;
let startY = 0;
let startOffset = 0;
let moved = false;
let lastTapGuard = 0;
let currentHub = null;

const hubData = {
  1:{title:'요단강 도하', body:'약속의 땅으로 첫 발을 내딛는 사건입니다. 정복은 전투 이전에 하나님의 인도와 백성의 순종에서 시작됩니다.', ratio:.10},
  2:{title:'여리고 함락', body:'인간의 힘보다 하나님의 방식에 순종할 때 첫 승리가 열립니다. 정복시대의 핵심 원리는 전략보다 순종입니다.', ratio:.26},
  3:{title:'가나안 정복', body:'약속의 땅을 실제 삶의 터전으로 확보하는 과정입니다. 승리와 실패가 함께 나타나며 믿음의 지속성이 시험됩니다.', ratio:.42},
  4:{title:'기업 분배', body:'땅은 단순한 소유가 아니라 언약의 성취입니다. 열두 지파가 받은 기업은 정체성과 사명의 자리입니다.', ratio:.58},
  5:{title:'세겜 언약', body:'정복의 끝은 정착이 아니라 언약의 재확인입니다. 백성은 누구를 섬길지 선택해야 합니다.', ratio:.735}
};

function clamp(v, min, max){ return Math.min(max, Math.max(min, v)); }
function applyY(){ wrap.style.setProperty('--matrix-y', `${y}px`); }

function calcBounds(){
  const rect = wrap.getBoundingClientRect();
  const bottomBar = document.querySelector('.bottom-bar');
  const bottomTop = window.innerHeight - (bottomBar?.offsetHeight || 82);

  // 5번 세겜 언약 원형 아이콘의 하단이 하단 메뉴 윗선에 닿는 지점에서 정지.
  // 원본 비율 기준 약 0.642 지점. 화면 크기에 따라 자연스럽게 스케일됨.
  const fifthIconBottomRatio = 0.642;
  const fifthIconBottomY = rect.height * fifthIconBottomRatio;
  const stopY = bottomTop - fifthIconBottomY;

  // 배경 이미지 자체가 짧거나 기기가 큰 경우에도 위로 과하게 끌려가지 않도록 보정.
  const naturalBottomLimit = (window.innerHeight - (bottomBar?.offsetHeight || 82)) - rect.height;
  minY = Math.min(0, Math.max(naturalBottomLimit, stopY));
  y = clamp(y, minY, 0);
  applyY();
}

function moveToHub(n){
  calcBounds();
  const rect = wrap.getBoundingClientRect();
  const bottomBar = document.querySelector('.bottom-bar');
  const bottomTop = window.innerHeight - (bottomBar?.offsetHeight || 82);
  const targetVisibleY = Math.min(bottomTop * .45, 330);
  const target = targetVisibleY - (rect.height * (hubData[n]?.ratio || 0));
  y = clamp(target, minY, 0);
  applyY();
}

function openDialog(t,b,mode='info',hub=null){
  currentHub = hub;
  title.textContent = t;
  body.textContent = b;
  hubList.hidden = mode !== 'list';
  hubActions.hidden = mode !== 'hub';
  dialog.showModal();
}

function onPointerDown(e){
  if(e.target.closest('button,a,dialog,.bottom-bar')) return;
  dragging = true;
  moved = false;
  startY = e.clientY;
  startOffset = y;
  wrap.classList.add('dragging');
  wrap.setPointerCapture?.(e.pointerId);
}
function onPointerMove(e){
  if(!dragging) return;
  const dy = e.clientY - startY;
  if(Math.abs(dy) > 4) moved = true;
  y = clamp(startOffset + dy, minY, 0);
  applyY();
  e.preventDefault();
}
function onPointerUp(e){
  if(!dragging) return;
  dragging = false;
  wrap.classList.remove('dragging');
  wrap.releasePointerCapture?.(e.pointerId);
  if(moved) lastTapGuard = Date.now();
}

wrap.addEventListener('pointerdown', onPointerDown);
wrap.addEventListener('pointermove', onPointerMove, {passive:false});
wrap.addEventListener('pointerup', onPointerUp);
wrap.addEventListener('pointercancel', onPointerUp);
window.addEventListener('resize', calcBounds);
window.addEventListener('orientationchange', () => setTimeout(calcBounds, 150));
window.addEventListener('load', calcBounds);
if(img.complete) calcBounds(); else img.addEventListener('load', calcBounds);

function showHub(n){
  const h = hubData[n];
  if(!h) return;
  openDialog(`${n}. ${h.title}`, h.body, 'hub', n);
}

document.querySelectorAll('.hub-btn').forEach(btn=>{
  btn.addEventListener('click',(e)=>{
    if(Date.now() - lastTapGuard < 220){ e.preventDefault(); return; }
    showHub(btn.dataset.hub);
  });
});

document.getElementById('hubListBtn').addEventListener('click',()=>{
  openDialog('정복시대 허브 목록','원하는 허브를 선택하면 해당 위치로 이동합니다.', 'list');
});
hubList.querySelectorAll('button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const n = btn.dataset.target;
    dialog.close();
    moveToHub(n);
    setTimeout(()=>showHub(n), 120);
  });
});

document.getElementById('exploreBtn').addEventListener('click',()=>{
  openDialog('정복시대 연결탐험','요단강 도하 → 여리고 함락 → 가나안 정복 → 기업 분배 → 세겜 언약으로 이어지는 흐름을 따라가며 정복시대의 신학적 연결을 확인합니다.');
});
document.getElementById('originalBtn').addEventListener('click',()=>{
  openDialog('원본 인포그래픽 보기','현재 화면의 정복시대 배경 이미지를 기준으로 구성했습니다. GitHub 업로드 후 필요하면 이 버튼은 원본 이미지 파일 경로로 연결하면 됩니다.');
});
document.getElementById('topBtn').addEventListener('click',()=>{ y=0; applyY(); });

const hubOpenBtn = document.getElementById('hubOpenBtn');
const hubExploreBtn = document.getElementById('hubExploreBtn');
const hubOriginalBtn = document.getElementById('hubOriginalBtn');
hubOpenBtn.addEventListener('click',()=>{
  const h = hubData[currentHub];
  if(h) openDialog(`${currentHub}. ${h.title} 허브`, `${h.title} 허브 화면으로 연결되는 버튼입니다. 현재 패키지에서는 기본 팝업형 허브로 복구했습니다.`);
});
hubExploreBtn.addEventListener('click',()=>{
  const h = hubData[currentHub];
  if(h) openDialog(`${h.title} 연결탐험`, `${h.title}이 정복시대 전체 흐름 안에서 어떻게 이어지는지 확인하는 연결탐험 버튼입니다.`);
});
hubOriginalBtn.addEventListener('click',()=>{
  const h = hubData[currentHub];
  if(h) openDialog(`${h.title} 원본보기`, `${h.title} 원본 인포그래픽 보기 버튼입니다.`);
});

closeDialog.addEventListener('click',()=>dialog.close());

if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}
