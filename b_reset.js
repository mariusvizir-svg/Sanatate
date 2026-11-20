/* Setări → Resetare cheltuieli (V6.6): ștergi la zero anumite cheltuieli, cu instantaneu de siguranță */
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
})();
