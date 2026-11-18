'use strict';
ICON.hub=ICON.home;
/* antet: titlu, subtitlu, buton înapoi */
const _rn=renderNow;renderNow=function(){_rn();const hub=tab==='hub',bk=$('back');if(bk)bk.hidden=hub;const s=$('hsub');if(s)s.textContent=hub?'Bugetul tău pe scurt':mLabel(month);$('title').textContent=hub?'Buget':NAV.find(n=>n[0]===tab)[2]};
document.addEventListener('click',e=>{if(e.target.closest('#back')){if(tab==='rep'&&BR.st.sel){BR.st.sel=null;render();scrollTo(0,0);e.stopPropagation();return}if(tab==='rep'&&rsub!=='hub'){rsub='hub';BR.reset();render();scrollTo(0,0);e.stopPropagation();return}tab='hub';render();scrollTo(0,0);e.stopPropagation()}},true);
window.AGENDA_HUB=()=>{tab='hub';render()};

/* ---------- API pentru „Agenda Mea” (doar citește) ---------- */
window.AGENDA_API=()=>{try{if(typeof data==='undefined'||!data.transactions)return{ready:false};const m=cur(),t=today(),ex=sum(by(m,'expense')),inc=sum(by(m,'income')),b=balances(),plan=sum(Object.values(data.budgets||{}).filter(v=>v>0),x=>x),
 up=[];(data.v11.plans||[]).forEach(p=>{const dy=Math.round(+p.day);if(!(dy>=1&&dy<=31))return;let mm=m,d=Math.min(dy,dim(mm));let ds=mm+'-'+String(d).padStart(2,'0');if((p.done||{})[m]||ds<t){mm=addM(m,1);d=Math.min(dy,dim(mm));ds=mm+'-'+String(d).padStart(2,'0')}const n=Math.round((new Date(ds+'T12:00')-new Date(t+'T12:00'))/864e5);if(n<=30)up.push({title:p.title,amount:+p.amount||0,date:ds,n,kind:p.kind})});up.sort((a,b)=>a.date.localeCompare(b.date));
 const dayN=+t.slice(8),left=dim(m)-dayN+1;
 return{ready:true,month:m,spent:ex,income:inc,avail:val(b.Card+b.Numerar),plan,planLeft:plan?val(plan-ex):null,daysLeft:left,perDay:plan&&plan>ex?val((plan-ex)/left):null,up,top:cat(m).slice(0,1)[0]||null,prevSpent:sum(by(addM(m,-1),'expense')),days7:BR.api.days7(),recent:BR.api.recent(3),topProd:BR.api.topProd(m,3),nbons:BR.api.nbons(m)}}catch(e){return{ready:false,err:String(e&&e.message||e)}}};
window.AGENDA_GO=k=>{if(typeof data==='undefined')return;if(typeof k==='string'&&k.startsWith('rep:')){window.__keepSub=true;tab='rep';rsub=k.slice(4);BR.reset();render();scrollTo(0,0);return}if(k==='add'){entry='expense';tab='add'}else if(k==='scan'){entry='expense';tab='add';render();const x=document.querySelector('[data-scan]');if(x)x.click();return}else if(k==='plan'){tab='plan'}else if(k==='home'||k==='hub'){tab='hub'}else tab=k;render()};
/* ---- backup unic ---- */
window.AGENDA_EXPORT=async()=>{data.lastBackup=today();await Store.save(data).catch(()=>{});return JSON.parse(JSON.stringify(data))};
window.AGENDA_PEEK=j=>{const v=validate(j);if(v.err)return{err:v.err};const o=v.out;return{n:`${o.transactions.length} operațiuni, ${o.debts.length} datorii, ${o.loans.length} împrumuturi`,bad:v.bad||0}};
window.AGENDA_IMPORT=async j=>{const v=validate(j);if(v.err)throw new Error(v.err);await Store.replace(v.out)};

try{parent!==window&&parent.postMessage({agenda:'ready'},'*')}catch(e){}

/* ---------- V5.6: Rapoarte cu butoane mari, curățenie de zerouri ---------- */
(()=>{const RN={bons:['green','cam','Bonuri scanate','Ce bonuri ai scanat'],prod:['orange','list','Produse','Ce ai cumpărat, cât și de câte ori'],furn:['purple','card','Furnizori','Unde cumperi cel mai mult'],pret:['red','chart','Prețuri','Scumpiri și diferențe'],zile:['teal','cal','Zile din săptămână','Când cheltuiești'],top:['slate','target','Cele mai mari','Bonuri și produse'],catp:['blue','pie','Produse pe categorii','Ce intră în fiecare'],sum:['blue','chart','Rezumat','Imaginea de ansamblu'],over:['purple','pie','Prezentare','Venituri, cheltuieli, grafice'],bud:['green','target','Bugete','Cât ai folosit din fiecare'],cat:['orange','list','Categorie','Detalii pe categorii'],dbt:['red','bank','Datorii și economii','Rambursări, obiective'],acc:['teal','card','Conturi și tichete','Solduri și carduri'],fc:['slate','cal','Prognoză','Cum se încheie luna'],yr:['blue','chart','An','Lună cu lună']};
const BR_SUBS=['bons','prod','furn','pret','zile','top','catp'];const base=V.rep;let lastTab='';
V.rep=()=>{if(rsub==='hub'||!RN[rsub]){rsub='hub';return`<div class="hubg">${Object.keys(RN).map(k=>bt(`data-rs="${k}"`,RN[k][0],RN[k][1],RN[k][2],RN[k][3])).join('')}</div>`}
 if(BR_SUBS.includes(rsub))return`<button class="rback" data-rs="hub">‹ Toate rapoartele · <b>${RN[rsub][2]}</b></button>`+BR.html(rsub);
 let h=base().replace(/^<div class="seg sc">.*?<\/div>/,'');
 h=h.replace(/<tr><td>\d\d<\/td><td>0<\/td><td>0<\/td><td>0<\/td><td class="[^"]*"><b>-?0<\/b><\/td><\/tr>/g,'').replace(/<text[^>]*>0<\/text>/g,'');
 return`<button class="rback" data-rs="hub">‹ Toate rapoartele · <b>${RN[rsub][2]}</b></button>`+h};
const rn=renderNow;renderNow=function(){if(tab==='rep'&&lastTab!=='rep'&&!window.__keepSub){rsub='hub';BR.reset()}window.__keepSub=false;lastTab=tab;rn()};
document.addEventListener('click',e=>{const t=e.target.closest('[data-rs]');if(t&&t.tagName==='BUTTON'){rsub=t.dataset.rs;BR.reset();render();scrollTo(0,0)}},true)})();
if(window.parent!==window){let ly=0;addEventListener('scroll',()=>{const y=scrollY;try{parent.postMessage({agenda:'scroll',d:y>ly+4?1:y<ly-4?-1:0,y},'*')}catch(e){}ly=y},{passive:true})}
