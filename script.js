const DATA={
  oppressionFlow:{title:'⛓ 구원 준비의 흐름',meta:'출 1-2장',body:'애굽의 압제는 실패한 역사가 아니라 출애굽을 준비하는 어두운 서막입니다. 하나님은 부르짖음을 들으시고, 모세를 보존하시며, 구원의 시간을 준비하십니다.',chips:['애굽압제','부르짖음','모세 출생','구원 준비']},
  lamb:{title:'🐑 어린양의 흐름',meta:'출 12장 → 십자가',body:'유월절 어린양의 피는 심판을 넘어가게 하는 표지입니다. 이 흐름은 성막 제사와 예수 그리스도의 십자가, 성찬의 의미까지 이어집니다.',chips:['유월절','어린양','피','십자가','성찬']},
  exodusFlow:{title:'🌊 출애굽의 흐름',meta:'출 12-15장',body:'하나님은 애굽의 권세에서 자기 백성을 건져 내시고, 홍해를 통해 구원의 길을 여십니다. 출애굽은 성경 전체 구원 사건의 원형입니다.',chips:['해방','홍해','구원','새 출발','새 출애굽']},
  covenant:{title:'📜 언약의 흐름',meta:'출 19:5-6',body:'시내산에서 이스라엘은 단순한 탈출민이 아니라 하나님의 언약 백성으로 세워집니다. 이 흐름은 다윗언약과 새언약으로 확장됩니다.',chips:['시내산','십계명','언약 백성','거룩한 나라','새언약']},
  tabernacle:{title:'⛺ 성막의 흐름',meta:'출 25-40장',body:'성막은 거룩하신 하나님이 백성 가운데 거하시는 임재의 구조입니다. 성막은 성전, 그리스도, 교회, 새 예루살렘으로 이어집니다.',chips:['임재','성막','성전','그리스도','새 예루살렘']},
  priest:{title:'👑 제사장직의 흐름',meta:'출 28-29장',body:'제사장은 하나님과 백성 사이를 섬기는 중보적 직분입니다. 아론과 레위 제사장직의 흐름은 대제사장이신 그리스도께 이어집니다.',chips:['아론','레위','제사장','중보','그리스도']},
  wildernessFlow:{title:'🍞 광야의 흐름',meta:'신 8:2',body:'광야는 실패의 장소만이 아니라 믿음과 순종을 배우는 훈련의 학교입니다. 만나와 반석의 물, 구름기둥과 불기둥은 하나님의 공급과 인도를 보여줍니다.',chips:['만나','반석의 물','구름기둥','불기둥','순종']},
  kingdom:{title:'⛰ 하나님 나라의 흐름',meta:'신명기 → 정복시대',body:'모압평지는 약속의 땅 입성을 앞둔 자리입니다. 언약 백성이 땅에서 어떻게 살아야 하는지 다시 듣고, 정복시대로 넘어갑니다.',chips:['모압','율법 재확인','여호수아','가나안','정복시대']},
  connection:{title:'⌖ 출애굽·광야 연결탐험',meta:'핵심 연결축',body:'출애굽·광야 시대는 어린양, 출애굽, 언약, 성막, 제사장, 광야, 하나님 나라의 흐름이 동시에 시작·확장되는 핵심 구간입니다.',chips:['어린양','출애굽','언약','성막','제사장','광야','하나님 나라']},
  hubList:{title:'출애굽·광야 허브 목록',meta:'5개 허브',body:'⛓ 애굽압제 → 🐑 출애굽 → 📜 시내산 → 🍞 광야훈련 → ⛰ 모압평지 순서로 탐험합니다.',chips:['⛓ 애굽압제','🐑 출애굽','📜 시내산','🍞 광야훈련','⛰ 모압평지']}
};
const sheet=document.getElementById('sheet'),backdrop=document.getElementById('backdrop'),title=document.getElementById('sheetTitle'),meta=document.getElementById('sheetMeta'),body=document.getElementById('sheetBody'),chips=document.getElementById('chips'),toast=document.getElementById('toast');
function goHub(id){location.href='./hubs/index.html?hub='+encodeURIComponent(id)}
const HUB_LINKS=[
  ['oppression','⛓ 애굽압제'],
  ['exodus','🐑 출애굽'],
  ['sinai','📜 시내산'],
  ['wilderness','🍞 광야훈련'],
  ['moab','⛰ 모압평지']
];
function openSheet(key){
  const d=DATA[key]||DATA.hubList;
  title.textContent=d.title;meta.textContent=d.meta;body.textContent=d.body;
  if(key==='hubList'){
    chips.innerHTML=HUB_LINKS.map(([id,label])=>`<button class="chip chipBtn" onclick="goHub('${id}')">${label}</button>`).join('');
  }else{
    chips.innerHTML=d.chips.map(c=>`<span class="chip">${c}</span>`).join('');
  }
  sheet.classList.add('show');backdrop.classList.add('show')
}
function closeSheet(){sheet.classList.remove('show');backdrop.classList.remove('show')}
document.getElementById('close').onclick=closeSheet;backdrop.onclick=closeSheet;
function showToast(t){toast.textContent=t;toast.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove('show'),1300)}
if(new URLSearchParams(location.search).get('debug')==='1'){document.querySelectorAll('.hot').forEach(el=>el.classList.add('debug'))}
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}
