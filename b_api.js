'use strict';
ICON.hub=ICON.home;
/* antet: titlu, subtitlu, buton înapoi */
const _rn=renderNow;renderNow=function(){_rn();const hub=tab==='hub',bk=$('back');if(bk)bk.hidden=hub;const s=$('hsub');if(s)s.textContent=hub?'Bugetul tău pe scurt':mLabel(month);$('title').textContent=hub?'Buget':NAV.find(n=>n[0]===tab)[2]};
document.addEventListener('click',e=>{if(e.target.closest('#back')){tab='hub';render();scrollTo(0,0);e.stopPropagation()}},true);
window.AGENDA_HUB=()=>{tab='hub';render()};

/* ---------- API pentru „Agenda Mea” (doar citește) ---------- */
window.AGENDA_API=()=>{try{if(typeof data==='undefined'||!data.transactions)return{ready:false};const m=cur(),t=today(),ex=sum(by(m,'expense')),inc=sum(by(m,'income')),b=balances(),plan=sum(Object.values(data.budgets||{}).filter(v=>v>0),x=>x),
 up=[];(data.v11.plans||[]).forEach(p=>{const dy=Math.round(+p.day);if(!(dy>=1&&dy<=31))return;let mm=m,d=Math.min(dy,dim(mm));let ds=mm+'-'+String(d).padStart(2,'0');if((p.done||{})[m]||ds<t){mm=addM(m,1);d=Math.min(dy,dim(mm));ds=mm+'-'+String(d).padStart(2,'0')}const n=Math.round((new Date(ds+'T12:00')-new Date(t+'T12:00'))/864e5);if(n<=30)up.push({title:p.title,amount:+p.amount||0,date:ds,n,kind:p.kind})});up.sort((a,b)=>a.date.localeCompare(b.date));
 const dayN=+t.slice(8),left=dim(m)-dayN+1;
 return{ready:true,month:m,spent:ex,income:inc,avail:val(b.Card+b.Numerar),plan,planLeft:plan?val(plan-ex):null,daysLeft:left,perDay:plan&&plan>ex?val((plan-ex)/left):null,up,top:cat(m).slice(0,1)[0]||null,prevSpent:sum(by(addM(m,-1),'expense'))}}catch(e){return{ready:false,err:String(e&&e.message||e)}}};
window.AGENDA_GO=k=>{if(typeof data==='undefined')return;if(k==='add'){entry='expense';tab='add'}else if(k==='scan'){entry='expense';tab='add';render();const x=document.querySelector('[data-scan]');if(x)x.click();return}else if(k==='plan'){tab='plan'}else if(k==='home'||k==='hub'){tab='hub'}else tab=k;render()};
/* ---- backup unic ---- */
window.AGENDA_EXPORT=async()=>{data.lastBackup=today();await Store.save(data).catch(()=>{});return JSON.parse(JSON.stringify(data))};
window.AGENDA_PEEK=j=>{const v=validate(j);if(v.err)return{err:v.err};const o=v.out;return{n:`${o.transactions.length} operațiuni, ${o.debts.length} datorii, ${o.loans.length} împrumuturi`,bad:v.bad||0}};
window.AGENDA_IMPORT=async j=>{const v=validate(j);if(v.err)throw new Error(v.err);await Store.replace(v.out)};
