/* Carduri de sumar deasupra ecranelor Buget – V6.9 */
(()=>{
const fd=d=>d?String(d).split('-').reverse().join('.'):'',
smc=(ti,tiles,line)=>`<div class="smc"><div class="smh">${ti}</div><div class="smg">${tiles.map(([v,l,c])=>`<div class="smt${c?' '+c:''}"><b>${v}</b><small>${l}</small></div>`).join('')}</div>${line?`<div class="sml">${line}</div>`:''}</div>`,
wrap=(k,fn)=>{const f=V[k];if(!f)return;V[k]=function(){let s='';try{s=fn()||''}catch(e){}return s+f.apply(this,arguments)}};
wrap('hub',()=>{const t=today(),tx=data.transactions.filter(x=>x.type==='expense'&&x.date===t),sp=sum(tx,x=>x.amount),R=[],d7=new Date(new Date(t+'T12:00').getTime()+7*864e5).toISOString().slice(0,10);
 R.push(['🧾',tx.length?`Cheltuit azi: ${money(sp)}`:'Nicio cheltuială azi',tx.length?`${tx.length} ${tx.length===1?'operațiune':'operațiuni'}`:'','', 'add']);
 const pl=(data.v11.plans||[]).map(p=>{const dy=+p.day||1,mm=t.slice(0,7),ds=mm+'-'+String(dy).padStart(2,'0');return{...p,ds:ds<t?addM(mm,1)+'-'+String(dy).padStart(2,'0'):ds}}).filter(p=>p.kind!=='income'&&p.ds<=d7).sort((a,b)=>a.ds.localeCompare(b.ds));
 if(pl.length)R.push(['📅',`${pl.length} ${pl.length===1?'plată':'plăți'} în 7 zile · ${money(sum(pl,p=>p.amount))}`,pl[0].ds===t?'azi: '+esc(pl[0].title):'următoarea: '+esc(pl[0].title)+' · '+fd(pl[0].ds),pl[0].ds===t?'ah':'','plan']);
 const dd=(data.debts||[]).filter(x=>remaining(x)>0&&x.due&&x.due<=d7);if(dd.length){const od=dd.filter(x=>x.due<t).length;R.push(['💳',`${dd.length} ${dd.length===1?'datorie scadentă':'datorii scadente'} · ${money(sum(dd,x=>remaining(x)))}`,od?od+' depășite':'în 7 zile',od?'ah':'aw','debt'])}
 return`<div class="azc"><h2>☀️ Azi pe scurt</h2>${R.map(r=>`<button class="azr" data-azb="${r[4]}"><i>${r[0]}</i><span>${r[1]}${r[2]?`<small class="${r[3]}">${r[2]}</small>`:''}</span><em>›</em></button>`).join('')}</div>`});
wrap('set',()=>{const T=data.transactions.length,lb=data.lastBackup;return (window.parent!==window?'<button class="bkb" data-bk>‹ Setări</button>':'')+smc('Date · pe scurt',[[T,'operațiuni'],[(data.debts||[]).length,'datorii'],[(data.v11.goals||[]).length,'obiective']],'Ultimul backup: <b>'+(lb?fd(lb):'niciodată')+'</b>')});
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-bk]'))try{parent.postMessage({agenda:'settings'},'*')}catch(x){}const b=e.target.closest&&e.target.closest('[data-azb]');if(b&&typeof AGENDA_GO==='function')AGENDA_GO(b.dataset.azb)});
})();
