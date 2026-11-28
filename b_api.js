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
window.AGENDA_GO=k=>{if(typeof data==='undefined')return;if(typeof k==='string'&&k.startsWith('rep:')){window.__keepSub=true;tab='rep';rsub=k.slice(4);BR.reset();render();scrollTo(0,0);return}if(k==='add'){entry='expense';tab='add'}else if(k==='inc'){entry='income';tab='add'}else if(k==='newdebt'){entry='debt';tab='add'}else if(k==='scan'){entry='expense';tab='add';render();const x=document.querySelector('[data-scan]');if(x)x.click();return}else if(k==='plan'){tab='plan'}else if(k==='home'||k==='hub'){tab='hub'}else tab=k;render()};
/* ---- backup unic ---- */
window.AGENDA_EXPORT=async()=>{data.lastBackup=today();await Store.save(data).catch(()=>{});return JSON.parse(JSON.stringify(data))};
window.AGENDA_PEEK=j=>{const v=validate(j);if(v.err)return{err:v.err};const o=v.out;return{n:`${o.transactions.length} operațiuni, ${o.debts.length} datorii, ${o.loans.length} împrumuturi`,bad:v.bad||0}};
window.AGENDA_IMPORT=async j=>{const v=validate(j);if(v.err)throw new Error(v.err);await Store.replace(v.out)};

try{parent!==window&&parent.postMessage({agenda:'ready'},'*')}catch(e){}

/* ---------- V5.6: Rapoarte cu butoane mari, curățenie de zerouri ---------- */
(()=>{const RN={bons:['green','cam','Bonuri scanate','Ce bonuri ai scanat'],prod:['orange','list','Produse','Ce ai cumpărat, cât și de câte ori'],furn:['purple','card','Furnizori','Unde cumperi cel mai mult'],pret:['red','chart','Prețuri','Scumpiri și diferențe'],zile:['teal','cal','Zile din săptămână','Când cheltuiești'],top:['slate','target','Cele mai mari','Bonuri și produse'],catp:['blue','pie','Produse pe categorii','Ce intră în fiecare'],sum:['blue','chart','Rezumat','Imaginea de ansamblu'],over:['purple','pie','Prezentare','Venituri, cheltuieli, grafice'],bud:['green','target','Bugete','Cât ai folosit din fiecare'],cat:['orange','list','Categorie','Detalii pe categorii'],dbt:['red','bank','Datorii și economii','Rambursări, obiective'],acc:['teal','card','Conturi și tichete','Solduri și carduri'],msp:['purple','users','Magazine și persoane','Cât ai cheltuit, datorat, rămas'],fc:['slate','cal','Prognoză','Cum se încheie luna'],yr:['blue','chart','An','Lună cu lună']};
const BR_SUBS=['bons','prod','furn','pret','zile','top','catp'];const base=V.rep;let lastTab='';
V.rep=()=>{if(rsub==='hub'||!RN[rsub]){rsub='hub';return`<div class="hubg">${Object.keys(RN).map(k=>bt(`data-rs="${k}"`,RN[k][0],RN[k][1],RN[k][2],RN[k][3])).join('')}</div>`}
 if(rsub==='msp')return`<button class="rback" data-rs="hub">‹ Toate rapoartele · <b>${RN[rsub][2]}</b></button>`+mspRep();
 if(BR_SUBS.includes(rsub))return`<button class="rback" data-rs="hub">‹ Toate rapoartele · <b>${RN[rsub][2]}</b></button>`+BR.html(rsub);
 let h=base().replace(/^<div class="seg sc">.*?<\/div>/,'');
 h=h.replace(/<tr><td>\d\d<\/td><td>0<\/td><td>0<\/td><td>0<\/td><td class="[^"]*"><b>-?0<\/b><\/td><\/tr>/g,'').replace(/<text[^>]*>0<\/text>/g,'');
 return`<button class="rback" data-rs="hub">‹ Toate rapoartele · <b>${RN[rsub][2]}</b></button>`+h};
const rn=renderNow;renderNow=function(){if(tab==='rep'&&lastTab!=='rep'&&!window.__keepSub){rsub='hub';BR.reset()}window.__keepSub=false;lastTab=tab;rn()};
document.addEventListener('click',e=>{const t=e.target.closest('[data-rs]');if(t&&t.tagName==='BUTTON'){rsub=t.dataset.rs;BR.reset();render();scrollTo(0,0)}},true)})();
if(window.parent!==window){let ly=0;addEventListener('scroll',()=>{const y=scrollY;try{parent.postMessage({agenda:'scroll',d:y>ly+4?1:y<ly-4?-1:0,y},'*')}catch(e){}ly=y},{passive:true})}
;(()=>{const _a=window.AGENDA_API;window.AGENDA_API=()=>{const r=_a();if(r&&r.ready){try{const t=today(),tx=data.transactions.filter(x=>x.type==='expense'&&x.date===t);r.tdy={s:sum(tx,x=>x.amount),n:tx.length};const d7=new Date(new Date(t+'T12:00').getTime()+7*864e5).toISOString().slice(0,10),dd=(data.debts||[]).filter(x=>remaining(x)>0&&x.due&&x.due<=d7);r.dd={n:dd.length,s:sum(dd,x=>remaining(x)),od:dd.filter(x=>x.due<t).length}}catch(e){}}return r}})();
;(()=>{const _a=window.AGENDA_API;window.AGENDA_API=()=>{const r=_a();if(r&&r.ready){try{const mo=today().slice(0,7),m0=mo+'-01',pl=(data.v11.plans||[]).filter(p=>!(p.done||{})[mo]),out=sum(pl.filter(p=>p.kind!=='income'),p=>p.amount),inc=sum(pl.filter(p=>p.kind==='income'),p=>p.amount),
 D=data.debts||[],tot=sum(D,d=>d.amount),left=sum(D,remaining),G=data.v11.goals||[],gc=g=>val(sum(g.moves||[],m=>(m.kind==='deposit'?1:-1)*m.amount));
 r.after={out,inc,left:val(inc-out),n:pl.length};
 r.debt={n:D.filter(d=>remaining(d)>0).length,left,tot,pc:tot?Math.round(100*(tot-left)/tot):0,od:D.filter(d=>remaining(d)>0&&d.due&&d.due<today()).length};
 r.goals={n:G.length,tc:sum(G,gc),tt:sum(G,g=>g.target),thisM:sum(G,g=>sum((g.moves||[]).filter(m=>m.date>=m0),m=>(m.kind==='deposit'?1:-1)*m.amount))}}catch(e){}}return r}})();

;(()=>{const _a=window.AGENDA_API;window.AGENDA_API=()=>{const r=_a();if(r&&r.ready){const sv=month;try{if(!data.transactions.some(t=>(t.date||'').startsWith(month))){const ms=data.transactions.map(t=>(t.date||'').slice(0,7)).filter(Boolean).sort();if(ms.length)month=ms[ms.length-1]}const cm=month===today().slice(0,7),a=month+'-01',z=cm?today():month+'-31',pv=new Date(+month.slice(0,4),+month.slice(5,7)-1,0),pd=pv.getFullYear()+'-'+String(pv.getMonth()+1).padStart(2,'0')+'-'+String(pv.getDate()).padStart(2,'0'),b0=balances(pd),b1=balances(z);
 r.acc={m:month,cur:cm,L:['Card','Numerar'].map(k=>{const{inn,out}=accMove(k,a,z);return{k,b0:b0[k],b1:b1[k],i:sum(Object.values(inn),x=>x),o:sum(Object.values(out),x=>x)}})};
 r.chk=chkList().map(x=>[x[0],x[1],x[2]])}catch(e){}month=sv}return r}})();

;(()=>{const _a=window.AGENDA_API;window.AGENDA_API=()=>{const r=_a();if(r&&r.ready){try{r.rep=m=>{const T=data.transactions.filter(t=>(t.date||'').startsWith(m)),ex=T.filter(t=>t.type==='expense'),inc=sum(T.filter(t=>t.type==='income')),E=sum(ex),lo=sum(T.filter(t=>t.type==='loan_repay'||t.type==='loan_lent')),lc=sum(T.filter(t=>t.type==='loan_collect')),dp=sum(T.filter(t=>t.type==='debt')),C={},S={};
  ex.forEach(t=>{C[t.category||'Altele']=(C[t.category||'Altele']||0)+t.amount;const k=(t.shop||(t.bon&&t.bon.mag)||'').trim();if(k)S[k]=(S[k]||0)+t.amount});const z=m+'-'+String(dim(m)).padStart(2,'0'),b=balances(z);
  return{inc,ex:E,lo,lc,dp,net:val(inc+lc-E-lo),cats:Object.entries(C).sort((a,b)=>b[1]-a[1]),shops:Object.entries(S).sort((a,b)=>b[1]-a[1]).slice(0,5),card:b.Card,cash:b.Numerar,debts:(data.debts||[]).filter(d=>remaining(d)>0).map(d=>[d.name,remaining(d)]),n:T.length}}}catch(e){}}return r}})();
