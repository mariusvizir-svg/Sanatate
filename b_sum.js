/* Carduri de sumar deasupra ecranelor Buget – V6.9 */
(()=>{
const fd=d=>d?String(d).split('-').reverse().join('.'):'',
smc=(ti,tiles,line)=>`<div class="smc"><div class="smh">${ti}</div><div class="smg">${tiles.map(([v,l,c])=>`<div class="smt${c?' '+c:''}"><b>${v}</b><small>${l}</small></div>`).join('')}</div>${line?`<div class="sml">${line}</div>`:''}</div>`,
wrap=(k,fn)=>{const f=V[k];if(!f)return;V[k]=function(){let s='';try{s=fn()||''}catch(e){}return s+f.apply(this,arguments)}};
wrap('plan',()=>{const pl=data.v11.plans||[];if(!pl.length)return'';const ex=pl.filter(p=>p.kind!=='income'),inc=pl.filter(p=>p.kind==='income'),t=+today().slice(8),nx=[...pl].filter(p=>p.day>=t).sort((a,b)=>a.day-b.day)[0]||[...pl].sort((a,b)=>a.day-b.day)[0];
 return smc('Planificare · pe scurt',[[pl.length,'plăți planificate'],[money(sum(ex,p=>p.amount)),'cheltuieli / lună'],...(inc.length?[[money(sum(inc,p=>p.amount)),'venituri / lună','ok']]:[])],nx?`Următoarea: <b>${esc(nx.title)}</b> · ziua ${nx.day} · ${money(nx.amount)}`:'')});
wrap('goal',()=>{const G=data.v11.goals||[];if(!G.length)return'';const cur=g=>val(sum(g.moves||[],m=>(m.kind==='deposit'?1:-1)*m.amount)),tc=sum(G,cur),tt=sum(G,g=>g.target),pc=tt?Math.min(100,Math.round(100*tc/tt)):0,done=G.filter(g=>cur(g)>=g.target).length;
 return smc('Economii · pe scurt',[[money(tc),'strâns','ok'],[money(tt),'țintă totală'],[pc+'%','realizat'],[done+'/'+G.length,'obiective atinse']],'')});
wrap('cards',()=>{const C=data.v14.cards||[];if(!C.length)return'';const mv=[...data.v14.cardMoves].sort((a,b)=>b.date.localeCompare(a.date))[0];
 return smc('Carduri · pe scurt',[[C.length,'carduri'],[money(sum(C,cardBal)),'sold total','ok']],mv?`Ultima alimentare: <b>${fd(mv.date)}</b> · ${money(mv.amount)}`:'')});
wrap('set',()=>{const T=data.transactions.length,lb=data.lastBackup;return smc('Date · pe scurt',[[T,'operațiuni'],[(data.debts||[]).length,'datorii'],[(data.v11.goals||[]).length,'obiective']],'Ultimul backup: <b>'+(lb?fd(lb):'niciodată')+'</b>')});
})();
