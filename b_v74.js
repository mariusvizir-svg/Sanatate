/* V7.4 – rezumat + progres pe Economii, Planificare, Persoane, Carduri, Istoric */
(()=>{
const fd=d=>d?String(d).split('-').reverse().join('.'):'',MN=['ian','feb','mar','apr','mai','iun','iul','aug','sep','oct','nov','dec'],
 lm=n=>{const x=new Date(+today().slice(0,4),+today().slice(5,7)-1+n,1);return MN[x.getMonth()]+' '+x.getFullYear()},
 dn=d=>d?Math.round((new Date(d+'T12:00')-new Date(today()+'T12:00'))/864e5):null,
 tiles=a=>`<div class="dst2">${a.map(([l,v,c])=>`<div><small>${l}</small><b${c?` class="${c}"`:''}>${v}</b></div>`).join('')}</div>`,
 bar=p=>`<span class="sbar sm"><i class="g" style="width:${Math.max(0,Math.min(100,p))}%"></i></span>`,
 ch=(t,c)=>`<span class="dch${c?' '+c:''}">${t}</span>`,
 share=async t=>{try{if(navigator.share){await navigator.share({text:t});return}await navigator.clipboard.writeText(t);alert('Mesajul a fost copiat.')}catch(e){if(e&&e.name==='AbortError')return;try{await navigator.clipboard.writeText(t);alert('Mesajul a fost copiat.')}catch{alert(t)}}};
const tail=(s,m)=>{const i=s.indexOf(m);return i<0?s:s.slice(i)};
/* ---- Planificare ---- */
const pst=p=>{const dn_=(p.done||{})[month];if(dn_)return[p.kind==='income'?'încasat':'plătit','ok'];if(month!==cur())return['ziua '+p.day,''];const n=p.day-(+today().slice(8));return n<0?['întârziat '+(-n)+(n===-1?' zi':' zile'),'bad']:n===0?['azi','mid']:n<=7?['în '+n+(n===1?' zi':' zile'),'mid']:['ziua '+p.day,'']};
const plan0=V.plan;
V.plan=function(){const pl=data.v11.plans||[],s=plan0.apply(this,arguments),pend=pl.filter(p=>!(p.done||{})[month]),
  out=sum(pend.filter(p=>p.kind!=='income'),p=>p.amount),inc=sum(pend.filter(p=>p.kind==='income'),p=>p.amount),paid=sum(pl.filter(p=>p.kind!=='income'&&(p.done||{})[month]),p=>p.amount),left=val(inc-out);
 let top='';if(pl.length)top=`<div class="card dha"><small class="mu">De plătit până la sfârșitul lunii</small><div class="dbig2">${money(out)}</div>${tiles([['Plătit deja',money(paid)],['De încasat',money(inc),'ok'],['Rămâne după',money(left),left<0?'er':'ok']])}</div>`;
 const evs=[...pl].sort((a,b)=>(!!(a.done||{})[month]-!!(b.done||{})[month])||a.day-b.day),
 card=`<div class="card"><h2>Evenimente lunare</h2>${evs.map(p=>{const dn_=(p.done||{})[month],[t,c]=pst(p);return `<div class="row${dn_?' dd':''}"><div>${esc(p.title)}<small>${p.kind==='income'?'încasare':'plată'}${p.auto?' · automat':''} ${ch(t,c)}</small></div><div><b>${money(p.amount)}</b> ${dn_?'':`<button class="btn s m" data-pdo="${esc(p.id)}">${p.kind==='income'?'Încasat':'Achitat'}</button>`}<button class="btn d" data-pedit="${esc(p.id)}">✎</button><button class="btn d" data-pdel="${esc(p.id)}">🗑</button></div></div>`}).join('')||'<div class="empty">Adaugă salariul, avansul și facturile lunare.</div>'}</div>`,
 a=s.indexOf('<div class="card"><h2>Evenimente lunare'),b=s.indexOf('<form id="pf"');
 return top+(a<0||b<0?s:s.slice(0,a)+card+s.slice(b))};
/* ---- Economii ---- */
const gcur=g=>val(sum(g.moves||[],m=>(m.kind==='deposit'?1:-1)*m.amount)),
 gnet=(g,from)=>sum((g.moves||[]).filter(m=>m.date>=from),m=>(m.kind==='deposit'?1:-1)*m.amount);
const goal0=V.goal;
V.goal=function(){const G=data.v11.goals||[],s=goal0.apply(this,arguments);if(!G.length)return s;
 const t=today(),m0=t.slice(0,7)+'-01',d90=new Date(new Date(t+'T12:00').getTime()-90*864e5).toISOString().slice(0,10),
 tc=sum(G,gcur),tt=sum(G,g=>g.target),thisM=sum(G,g=>gnet(g,m0)),pc=tt?Math.min(100,Math.round(100*tc/tt)):0,
 top=`<div class="card dha"><small class="mu">Strâns în total</small><div class="dbig2">${money(tc)}</div><div class="sbar"><i class="g" style="width:${pc}%"></i><i class="r" style="width:${100-pc}%"></i></div><div class="dsub2"><span><b>${pc}%</b> realizat</span><span>din <b>${money(tt)}</b></span></div>${tiles([['Obiective',G.length],['Luna asta',(thisM>=0?'+':'')+money(thisM),thisM>=0?'ok':'er'],['Atinse',G.filter(g=>gcur(g)>=g.target).length+'/'+G.length]])}</div>`,
 cards=G.map(g=>{const c=gcur(g),p=g.target?Math.min(100,Math.round(100*c/g.target)):0,net90=gnet(g,d90),pm=net90/3,mo=gnet(g,m0),done=c>=g.target,n=pm>0&&!done?Math.ceil((g.target-c)/pm):null,
  info=done?'Obiectiv atins ✓':n?`${(pm>=0?'+':'')+money(Math.round(pm))}/lună · gata în ${lm(n)}`:'fără ritm recent',
  st=done?ch('atins','ok'):mo>0?ch('+'+money(mo)+' luna asta','ok'):(g.moves||[]).length?ch('stagnează','mid'):ch(p+'%');
  return `<div class="card"><div class="dr1"><b>🎯 ${esc(g.title)}</b>${st}</div><div class="dcm" style="font-size:22px">${money(c)} <small>din ${money(g.target)}</small></div><div class="sbar"><i class="g" style="width:${p}%"></i></div><div class="dsub2"><span class="mu">${p}% · ${info}</span>${done?'':`<span class="mu">mai lipsesc ${money(g.target-c)}</span>`}</div>
  <div class="acts2" style="margin-top:10px"><button class="btn s m" data-gd="${esc(g.id)}">＋ Depune</button><button class="btn s m" data-gw="${esc(g.id)}">− Retrage</button><button class="btn d" data-gedit="${esc(g.id)}">✎</button><button class="btn d" data-gx="${esc(g.id)}">🗑</button></div>
  <details><summary>Mișcări (${(g.moves||[]).length})</summary>${(g.moves||[]).map((m,i)=>`<div class="row"><span>${fd(m.date)} · ${m.kind==='deposit'?'depus':'retras'}</span><span><b class="${m.kind==='deposit'?'ok':'er'}">${m.kind==='deposit'?'+':'−'}${money(m.amount)}</b> <button class="btn d" data-gmdel="${esc(g.id)}|${i}">🗑</button></span></div>`).reverse().join('')}</details></div>`}).join(''),
 b=s.indexOf('<form id="gf"');return top+cards+(b<0?'':s.slice(b))};
/* ---- Persoane ---- */
const pers0=V.pers;
V.pers=function(){const P=people(),s=pers0.apply(this,arguments),sh=(p,l)=>sum(p.h.filter(h=>l.includes(h[1])),h=>h[2]);
 const top=`<div class="card dha"><small class="mu">Sold net</small><div class="dbig2">${money(sum(P,p=>p.rec-p.owe))}</div>${tiles([['Ai de dat',money(sum(P,p=>p.owe)),'er'],['Ai de primit',money(sum(P,p=>p.rec)),'ok'],['Persoane',P.length]])}</div>`,
 cards=P.map(p=>{const given=sh(p,['Împrumut acordat']),got=sh(p,['Recuperat']),dbt=sh(p,['Datorie inițială','Împrumut primit']),rep=sh(p,['Rambursat','Restituit']),mv=p.h.filter(h=>h[0]!=='—').map(h=>h[0]).sort().pop(),net=val(p.rec-p.owe);
  return `<div class="card"><div class="dr1"><b>👤 ${esc(p.name)}</b>${net>0?ch('+'+money(net)+' de primit','ok'):net<0?ch(money(-net)+' de dat','bad'):ch('la zi')}</div>
  ${given?`<div class="dsub2" style="margin-top:8px"><span>Recuperat <b>${money(got)}</b> din ${money(given)}</span><span>rămas ${money(p.rec)}</span></div>${bar(given?100*got/given:0)}`:''}
  ${dbt?`<div class="dsub2" style="margin-top:8px"><span>Plătit <b>${money(rep)}</b> din ${money(dbt)}</span><span>rămas ${money(p.owe)}</span></div>${bar(dbt?100*rep/dbt:0)}`:''}
  <div class="dsub2 mu" style="margin-top:6px"><span>${p.h.length} mișcări${mv?' · ultima '+fd(mv):''}</span>${p.rec>0?`<button class="btn s m" data-vrem="${esc(p.name)}">🔔 Reamintește</button>`:''}</div>
  <details><summary>Istoric (${p.h.length})</summary>${p.h.map(h=>`<div class="row"><span>${h[0]==='—'?'—':fd(h[0])} · ${esc(h[1])}</span><b>${money(h[2])}</b></div>`).join('')}</details></div>`}).join('');
 return top+cards+tail(s,'<div class="card"><h2>Împrumuturi')};
/* ---- Carduri ---- */
const cards0=V.cards;
V.cards=function(){const s=cards0.apply(this,arguments),C=(data.v14.cards||[]).filter(c=>!c.archived);if(!C.length)return s;
 const t=today(),m0=t.slice(0,7),d30=new Date(new Date(t+'T12:00').getTime()-30*864e5).toISOString().slice(0,10),
 sp=(c,f)=>sum(data.transactions.filter(x=>x.type==='expense'&&x.account==='voucher:'+c.id&&f(x.date)),x=>x.amount),
 ld=(c,f)=>sum((data.v14.cardMoves||[]).filter(m=>m.cardId===c.id&&m.kind==='load'&&f(m.date)),m=>m.amount),
 tb=sum(C,cardBal),tsp=sum(C,c=>sp(c,d=>d.slice(0,7)===m0)),tld=sum(C,c=>ld(c,d=>d.slice(0,7)===m0)),
 rows=C.map(c=>{const b=cardBal(c),all=(+c.opening||0)+ld(c,()=>true),r=sp(c,d=>d>=d30)/30,days=r>0?Math.floor(b/r):null,s1=sp(c,d=>d.slice(0,7)===m0);
  return `<div class="rw2"><div class="dr1"><b>🎟 ${esc(c.name)}</b><b>${money(b)}</b></div><span class="sbar sm"><i class="a" style="width:${all?Math.max(0,Math.min(100,100*b/all)):0}%"></i></span><div class="dr2 mu"><span>Cheltuit luna asta ${money(s1)}</span>${days==null?'':ch('~'+days+(days===1?' zi':' zile'),days<=5?'bad':days<=10?'mid':'')}</div></div>`}).join('');
 return `<div class="card dha"><small class="mu">Sold total pe carduri</small><div class="dbig2">${money(tb)}</div>${tiles([['Alimentat luna asta',money(tld),'ok'],['Cheltuit luna asta',money(tsp)],['Carduri',C.length]])}<div style="margin-top:8px">${rows}</div></div>`+s};
/* ---- Istoric ---- */
const hist0=V.hist;
V.hist=function(){const s=hist0.apply(this,arguments),l=histList();if(!l.length)return s;
 const inn=sum(l.filter(t=>CREDIT.includes(t.type)),t=>t.amount),out=sum(l.filter(t=>!CREDIT.includes(t.type)&&t.type!=='transfer'),t=>t.amount),net=val(inn-out),
 top=`<div class="card dha"><small class="mu">${hf.from||hf.to?'În intervalul ales':'Luna '+month}</small><div class="dbig2">${net>=0?'+':''}${money(net)}</div>${tiles([['Venituri',money(inn),'ok'],['Cheltuieli',money(out)],['Operațiuni',l.length]])}</div>`,
 byD={};l.forEach(t=>{(byD[t.date]=byD[t.date]||[]).push(t)});let last='';
 const lab=d=>d===today()?'Azi':d===new Date(new Date(today()+'T12:00').getTime()-864e5).toISOString().slice(0,10)?'Ieri':fd(d),
 body=s.replace(/<div class="row( sel)?">(?:(?!<div class="row)[\s\S])*?<small>(\d{4}-\d{2}-\d{2}) · /g,(m,a,d)=>{if(d===last)return m;last=d;const x=byD[d]||[],o=sum(x.filter(t=>!CREDIT.includes(t.type)&&t.type!=='transfer'),t=>t.amount),i=sum(x.filter(t=>CREDIT.includes(t.type)),t=>t.amount);return `<div class="dyh"><span>${lab(d)}</span><span>${i?'+'+money(i)+' ':''}${o?'−'+money(o):''}</span></div>`+m});
 return top+body};
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-vrem]');if(!b)return;const n=b.dataset.vrem,p=people().find(x=>x.name===n);if(p)share(`Salut ${n}! Îți amintesc de cei ${money(p.rec)} pe care mi-i datorezi. Mulțumesc!`)});
})();
