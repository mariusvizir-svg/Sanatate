/* Setări → Resetare completă (V7.4.1) + Resetare cheltuieli (V6.6): ștergi la zero anumite cheltuieli, cu instantaneu de siguranță */
(()=>{
const R={cat:'',per:'all',from:'',to:'',acc:'',scan:false,open:false};
const mine=()=>data.transactions.filter(t=>{if(t.type!=='expense'||t.debtId||t.loanId)return false;
 if(R.cat&&t.category!==R.cat)return false;if(R.acc&&t.account!==R.acc)return false;if(R.scan&&!t.bon)return false;
 if(R.per==='month'&&String(t.date).slice(0,7)!==month)return false;
 if(R.per==='range'){if(R.from&&t.date<R.from)return false;if(R.to&&t.date>R.to)return false}return true});
const lab=()=>{const p=R.per==='all'?'toată perioada':R.per==='month'?'luna '+month:(R.from||'început')+' – '+(R.to||'azi');return`${R.cat||'toate categoriile'} · ${p}${R.acc?' · '+R.acc:''}${R.scan?' · doar bonuri scanate':''}`};
const card=()=>{const L=mine(),T=sum(L,x=>x.amount),cs=expCats(),ac=accounts();
 return`<div class="card" id="rstc"><h2>🧹 Resetare cheltuieli</h2><p class="mu" style="margin-top:0">Alegi ce cheltuieli vrei să ștergi (de la zero). Înainte de ștergere se face automat un instantaneu de siguranță, iar după aceea poți reveni din „Instantanee automate”. Datoriile, împrumuturile, veniturile și transferurile nu sunt atinse.</p>
 <label>Categorie<select data-rs="cat"><option value="">Toate categoriile</option>${cs.map(c=>`<option${R.cat===c?' selected':''}>${esc(c)}</option>`).join('')}</select></label>
 <label>Perioadă<select data-rs="per"><option value="all"${R.per==='all'?' selected':''}>Toată perioada</option><option value="month"${R.per==='month'?' selected':''}>Doar luna afișată (${esc(month)})</option><option value="range"${R.per==='range'?' selected':''}>Interval ales</option></select></label>
 ${R.per==='range'?`<div class="two"><label>De la<input type="date" data-rs="from" value="${R.from}"></label><label>Până la<input type="date" data-rs="to" value="${R.to}"></label></div>`:''}
 <label>Cont<select data-rs="acc"><option value="">Toate conturile</option>${ac.map(a=>`<option value="${esc(a[0])}"${R.acc===a[0]?' selected':''}>${esc(a[1])}</option>`).join('')}</select></label>
 <label class="rck"><input type="checkbox" data-rs="scan"${R.scan?' checked':''}> Doar cele din bonuri scanate</label>
 <div class="warn" style="margin:12px 0">${L.length?`<b>${L.length}</b> ${L.length===1?'cheltuială':'cheltuieli'} · <b>${money(T)}</b><br><small>${esc(lab())}</small>`:'Nicio cheltuială nu corespunde filtrului.'}</div>
 ${L.length?`<details><summary>Vezi ce se șterge</summary>${L.slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,40).map(x=>`<div class="row"><span>${esc(x.date)}<small>${esc(x.category||'')}${x.bon&&x.bon.mag?' · '+esc(x.bon.mag):x.note?' · '+esc(x.note):''}</small></span><b>${money(x.amount)}</b></div>`).join('')}${L.length>40?`<small class="mu">… și încă ${L.length-40}</small>`:''}</details>`:''}
 <button class="btn d" data-rsgo="1" style="margin-top:12px"${L.length?'':' disabled'}>Resetează la 0 aceste cheltuieli</button></div>`};
const set3=V.set;V.set=()=>{const h=set3(),A='<div class="card"><h2>Backup</h2>',B='<div class="card"><h2>🔐 Securitate</h2>',at=h.includes(A)?A:h.includes(B)?B:null;return at?h.replace(at,card()+at):h+card()};
document.addEventListener('change',e=>{const k=e.target.dataset&&e.target.dataset.rs;if(!k)return;R[k]=e.target.type==='checkbox'?e.target.checked:e.target.value;const y=scrollY;render();scrollTo(0,y)});
document.addEventListener('click',async e=>{const b=e.target.closest('[data-rsgo]');if(!b)return;const L=mine();if(!L.length)return;
 if(!confirm(`Ștergi ${L.length} ${L.length===1?'cheltuială':'cheltuieli'} (${money(sum(L,x=>x.amount))})?\n${lab()}\n\nSe face întâi un instantaneu de siguranță.`))return;
 try{await Store.snapshot('înainte de resetare cheltuieli',data)}catch(_){if(!confirm('Nu am putut crea instantaneul de siguranță. Continui oricum?'))return}
 const ids=new Set(L.map(x=>x.id));data.transactions=data.transactions.filter(x=>!ids.has(x.id));save();alert(`Gata: ${L.length} ${L.length===1?'cheltuială ștearsă':'cheltuieli șterse'}. Instantaneul de siguranță e în Setări → Instantanee automate.`)});

/* ---- Resetare completă (V7.4.1) ---- */
const RC={tx:1,debts:1,loans:1,goals:1,plans:1,cards:1,budgets:1,open:1},
RCL=[['tx',()=>data.transactions.length,'operațiuni (cheltuieli, venituri, transferuri, plăți)'],['debts',()=>data.debts.length,'datorii'],['loans',()=>data.loans.length,'împrumuturi'],['goals',()=>(data.v11.goals||[]).length,'obiective de economisire'],['plans',()=>(data.v11.plans||[]).length,'evenimente planificate'],['cards',()=>data.v14.cards.length+(data.v11.vouchers||[]).length,'carduri de tichete și încărcările lor'],['budgets',()=>Object.keys(data.budgets||{}).length,'bugete pe categorii'],['open',()=>(+data.opening.Card?1:0)+(+data.opening.Numerar?1:0),'solduri inițiale']];
const card2=()=>`<div class="card" id="rcc"><h2>🗑 Resetare completă</h2><p class="mu" style="margin-top:0">Pornești bugetul de la zero. Alegi ce se șterge. Categoriile, produsele învățate din bonuri, cursurile valutare, securitatea și backup-urile rămân. Înainte de ștergere se face un instantaneu de siguranță.</p>${RCL.map(r=>`<label class="rck"><input type="checkbox" data-rc="${r[0]}"${RC[r[0]]?' checked':''}> ${r[1]()} ${r[2]}</label>`).join('')}<button class="btn d" data-rcgo="1" style="margin-top:12px">Resetează bugetul…</button></div>`;
const set4=V.set;V.set=()=>{const h=set4(),m='<div class="card" id="rstc">',i=h.indexOf(m);if(i<0)return h+card2();const j=h.indexOf('</div>',h.indexOf('data-rsgo',i));return h.slice(0,j+6)+card2()+h.slice(j+6)};
document.addEventListener('change',e=>{const k=e.target.dataset&&e.target.dataset.rc;if(!k)return;RC[k]=e.target.checked?1:0;const y=scrollY;render();scrollTo(0,y)});
document.addEventListener('click',async e=>{const b=e.target.closest('[data-rcgo]');if(!b)return;const sel=RCL.filter(r=>RC[r[0]]);if(!sel.length){alert('Alege ce vrei să ștergi.');return}
 if(!confirm('Ștergi definitiv din Buget:\n'+sel.map(r=>'• '+r[1]()+' '+r[2]).join('\n')+'\n\nSe face întâi un instantaneu de siguranță.'))return;
 if((prompt('Ca să confirmi, scrie ȘTERGE')||'').trim().toUpperCase().replace('Ș','S')!=='STERGE'){alert('Nu s-a șters nimic.');return}
 try{await Store.snapshot('înainte de resetare completă',data)}catch(_){if(!confirm('Nu am putut crea instantaneul de siguranță. Continui oricum?'))return}
 if(RC.tx)data.transactions=[];if(RC.debts)data.debts=[];if(RC.loans)data.loans=[];if(RC.goals)data.v11.goals=[];if(RC.plans)data.v11.plans=[];if(RC.cards){data.v14.cards=[];data.v14.cardMoves=[];data.v11.vouchers=[]}if(RC.budgets)data.budgets={};if(RC.open)data.opening={Card:0,Numerar:0};
 save();alert('Gata, bugetul a fost resetat. Instantaneul de siguranță e în Setări → Instantanee automate.')});
})();
