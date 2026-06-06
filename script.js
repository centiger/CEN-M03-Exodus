const DATA={
  jordanFlow:{title:'🌊 요단강 도하 연결탐험',meta:'수 3-4장',body:'요단강 도하는 광야에서 약속의 땅으로 넘어가는 경계 사건입니다. 홍해 도하의 구원 기억이 가나안 입성의 순종으로 이어집니다.',chips:['홍해','요단강','언약궤','약속의 땅','새 출발']},
  jerichoFlow:{title:'🏰 여리고 함락 연결탐험',meta:'수 6장',body:'여리고 함락은 정복의 첫 승리입니다. 군사력보다 하나님의 말씀과 순종이 승리의 기준임을 보여 줍니다.',chips:['순종','첫 승리','성벽','나팔','라합']},
  conquestFlow:{title:'⚔ 가나안 정복 연결탐험',meta:'수 7-12장',body:'가나안 정복은 약속의 성취이면서 동시에 거룩한 삶을 요구하는 과정입니다. 승리와 실패가 함께 기록되어 믿음의 지속성을 드러냅니다.',chips:['정복','아이성','기브온','남방전투','북방전투']},
  inheritanceFlow:{title:'🗺 기업 분배 연결탐험',meta:'수 13-21장',body:'기업 분배는 땅의 소유를 넘어 언약 백성의 사명 배치입니다. 각 지파는 받은 자리에서 하나님 나라의 질서를 살아내야 합니다.',chips:['열두 지파','기업','레위 성읍','도피성','언약 성취']},
  shechemFlow:{title:'📜 세겜 언약 연결탐험',meta:'수 24장',body:'세겜 언약은 정복시대의 결론입니다. 땅을 얻은 뒤에도 핵심은 소유가 아니라 누구를 섬길 것인가의 선택입니다.',chips:['세겜','언약 갱신','여호수아','선택','섬김']},
  hubList:{title:'정복시대 허브 목록',meta:'5개 허브',body:'🌊 요단강 도하 → 🏰 여리고 함락 → ⚔ 가나안 정복 → 🗺 기업 분배 → 📜 세겜 언약 순서로 탐험합니다.',chips:['🌊 요단강 도하','🏰 여리고 함락','⚔ 가나안 정복','🗺 기업 분배','📜 세겜 언약']},
  original:{title:'원본 인포그래픽 보기',meta:'정복시대 배경 이미지',body:'현재 메인 화면에 사용한 정복시대 배경 이미지를 기준으로 구성했습니다. 배경은 가로 비율을 유지하고 세로 방향으로만 화면 흐름이 생기도록 배치했습니다.',chips:['원본 이미지','비율 유지','세로 드래그','하단 그림자']}
};
const main=document.getElementById('mainContent'), stage=document.getElementById('stage'), bg=document.getElementById('matrixBg');
const sheet=document.getElementById('sheet'),backdrop=document.getElementById('backdrop'),title=document.getElementById('sheetTitle'),meta=document.getElementById('sheetMeta'),body=document.getElementById('sheetBody'),chips=document.getElementById('chips'),toast=document.getElementById('toast');
let y=0,minY=0,dragging=false,startY=0,startOffset=0,moved=false,lastTapGuard=0;
function clamp(v,min,max){return Math.min(max,Math.max(min,v))}
function applyY(){main.style.setProperty('--drag-y',y+'px')}
function calcBounds(){
  const footer=document.querySelector('.fixedFooter');
  const footerTop=window.innerHeight-(footer?.offsetHeight||118);
  const h=stage.getBoundingClientRect().height;
  const fifthIconBottom=h*0.835; // 5번 상징 아이콘 끝자락이 하단 메뉴 시작선에 닿는 지점
  const stopY=footerTop-fifthIconBottom;
  const naturalLimit=footerTop-h;
  minY=Math.min(0,Math.max(naturalLimit,stopY));
  y=clamp(y,minY,0);applyY();
}
function onDown(e){if(e.target.closest('button,.sheet,.fixedFooter'))return;dragging=true;moved=false;startY=e.clientY;startOffset=y;main.classList.add('dragging');main.setPointerCapture?.(e.pointerId)}
function onMove(e){if(!dragging)return;const dy=e.clientY-startY;if(Math.abs(dy)>4)moved=true;y=clamp(startOffset+dy,minY,0);applyY();e.preventDefault()}
function onUp(e){if(!dragging)return;dragging=false;main.classList.remove('dragging');main.releasePointerCapture?.(e.pointerId);if(moved)lastTapGuard=Date.now()}
main.addEventListener('pointerdown',onDown);main.addEventListener('pointermove',onMove,{passive:false});main.addEventListener('pointerup',onUp);main.addEventListener('pointercancel',onUp);window.addEventListener('resize',calcBounds);window.addEventListener('orientationchange',()=>setTimeout(calcBounds,180));window.addEventListener('load',calcBounds);if(bg.complete)calcBounds();else bg.addEventListener('load',calcBounds);
function goHub(id){if(Date.now()-lastTapGuard<220)return;location.href='./hubs/index.html?hub='+encodeURIComponent(id)}
function openOriginal(){openSheet('original')}
function openSheet(key){const d=DATA[key]||DATA.hubList;title.textContent=d.title;meta.textContent=d.meta;body.textContent=d.body;chips.innerHTML=d.chips.map(c=>`<span class="chip">${c}</span>`).join('');sheet.classList.add('show');backdrop.classList.add('show')}
function closeSheet(){sheet.classList.remove('show');backdrop.classList.remove('show')}
document.getElementById('close').onclick=closeSheet;backdrop.onclick=closeSheet;
function showToast(t){toast.textContent=t;toast.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove('show'),1300)}
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}
