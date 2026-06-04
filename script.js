const DATA={
  oppressionFlow:{title:'구원 준비의 흐름',meta:'출 1-2장',body:'압제는 끝이 아니라 출애굽을 준비하는 배경입니다. 하나님은 고난 속에서도 언약 백성을 기억하십니다.',chips:['압제','부르짖음','모세 출생','구원 준비']},
  lamb:{title:'어린양의 흐름',meta:'출 12장',body:'유월절 어린양의 피는 심판을 넘어가게 하는 표지입니다. 이 흐름은 십자가와 성찬까지 이어집니다.',chips:['유월절','어린양','피','십자가']},
  exodusFlow:{title:'출애굽의 흐름',meta:'출 12-15장',body:'하나님은 애굽의 권세에서 자기 백성을 건져 내시고, 홍해를 통해 구원의 길을 여십니다.',chips:['해방','홍해','구원','새 출발']},
  covenant:{title:'언약의 흐름',meta:'출 19:5-6',body:'시내산에서 이스라엘은 단순한 탈출민이 아니라 하나님의 언약 백성으로 세워집니다.',chips:['시내산','십계명','언약 백성','거룩한 나라']},
  tabernacle:{title:'성막의 흐름',meta:'출 25-40장',body:'성막은 거룩하신 하나님이 백성 가운데 거하시는 임재의 구조입니다.',chips:['임재','성막','제사','성전']},
  priest:{title:'제사장직의 흐름',meta:'출 28-29장',body:'제사장은 하나님과 백성 사이를 섬기는 중보적 직분입니다. 이 흐름은 대제사장이신 그리스도께 이어집니다.',chips:['아론','제사장','중보','그리스도']},
  wildernessFlow:{title:'광야의 흐름',meta:'신 8:2',body:'광야는 실패의 장소만이 아니라 믿음과 순종을 배우는 훈련의 학교입니다.',chips:['만나','불평','훈련','순종']},
  kingdom:{title:'하나님 나라의 흐름',meta:'신명기',body:'모압평지는 약속의 땅 입성을 앞둔 자리입니다. 언약 백성이 땅에서 어떻게 살아야 하는지를 준비합니다.',chips:['모압','율법 재확인','여호수아','가나안']},
  hubList:{title:'출애굽·광야 허브 목록',meta:'5개 허브',body:'애굽압제, 출애굽, 시내산, 광야훈련, 모압평지 허브로 구성됩니다.',chips:['애굽압제','출애굽','시내산','광야훈련','모압평지']}
};
const sheet=document.getElementById('sheet'),backdrop=document.getElementById('backdrop'),title=document.getElementById('sheetTitle'),meta=document.getElementById('sheetMeta'),body=document.getElementById('sheetBody'),chips=document.getElementById('chips'),toast=document.getElementById('toast');
function goHub(id){location.href='./hubs/index.html?hub='+encodeURIComponent(id)}
function openSheet(key){const d=DATA[key]||DATA.hubList;title.textContent=d.title;meta.textContent=d.meta;body.textContent=d.body;chips.innerHTML=d.chips.map(c=>`<span class="chip">${c}</span>`).join('');sheet.classList.add('show');backdrop.classList.add('show')}
function closeSheet(){sheet.classList.remove('show');backdrop.classList.remove('show')}
document.getElementById('close').onclick=closeSheet;backdrop.onclick=closeSheet;
function showToast(t){toast.textContent=t;toast.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove('show'),1300)}
if(new URLSearchParams(location.search).get('debug')==='1'){document.querySelectorAll('.hot').forEach(el=>el.classList.add('debug'))}
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}
