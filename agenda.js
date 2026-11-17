'use strict';
(function(){
const $=id=>document.getElementById(id),esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let cur='home';const fs=$('fs'),bud=$('bud');
const api=()=>{try{const w=fs.contentWindow;if(!w||!w.AGENDA_API)return{ready:false,why:w&&w.document&&w.document.readyState==='complete'&&w.document.getElementById('view')?'old':'loading'};return w.AGENDA_API()}catch(e){return{ready:false,why:'err',err:String(e&&e.message||e)}}};
const go=k=>{try{fs.contentWindow.AGENDA_GO(k)}catch(e){}},bapi=()=>{try{return bud.contentWindow&&bud.contentWindow.AGENDA_API?bud.contentWindow.AGENDA_API():{ready:false}}catch(e){return{ready:false}}},bgo=k=>{try{bud.contentWindow.AGENDA_GO(k)}catch(e){}};
const ron=n=>new Intl.NumberFormat('ro-RO',{maximumFractionDigits:0}).format(Math.round(n))+' lei';
const fmt=d=>{const[y,m,x]=d.split('-');return x+'.'+m+'.'+y};
function greet(){const h=new Date().getHours();return h<5?'Noapte bună':h<12?'Bună dimineața':h<18?'Bună ziua':'Bună seara'}
function dayStr(){const d=new Date(),z=['Duminică','Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă'],m=['ianuarie','februarie','martie','aprilie','mai','iunie','iulie','august','septembrie','octombrie','noiembrie','decembrie'];return z[d.getDay()]+', '+d.getDate()+' '+m[d.getMonth()]}
const chip=n=>`<span class="t ${n<=1?'hot':n<=7?'mid':'good'}">${n===0?'azi':n===1?'mâine':'în '+n+' zile'}</span>`;
function home(){const a=api(),bg=bapi(),v=$('home');
 const hd=`<div class="hd"><small>${dayStr()}</small><h1>${greet()}${a.ready&&a.name?', '+esc(a.name):''}</h1></div>`;
 if(!a.ready){const W={noprofile:['Nu ai creat încă un profil','Deschide Sănătate și creează profilul (sau importă backup-ul). După aceea apar aici pastilele, programările și tensiunea.'],old:['Fișierele Sănătății sunt vechi','Pe GitHub, fișierul app.js nu s-a înlocuit. Urcă din nou toate fișierele din arhivă și așteaptă 1-2 minute.'],err:['Sănătatea a dat o eroare',a.err||a.why||''],loading:['Se încarcă Sănătatea…','Dacă durează, sau ai parolă / Face ID, deschide o dată tabul Sănătate ca să deblochezi datele.']}[a.why||'loading'];v.innerHTML=hd+`<div class="c"><h2>${W[0]}</h2><p class="mu">${esc(W[1])}</p><div style="margin-top:10px"><button class="btn p" data-t="health">Deschide Sănătate</button></div></div>`+bugCard();return}
 const items=[];a.pills.forEach(p=>items.push({k:p.time,i:'💊',t:p.name+(p.dose?' '+p.dose:''),s:p.st==='miss'?p.time+' · întârziată':p.time+(p.st==='due'?' · acum':''),c:p.st==='miss'?'<span class="t hot">ratată?</span>':p.st==='due'?'<span class="t hot">acum</span>':'<span class="t mid">azi</span>',g:'pills'}));
 a.up.forEach(u=>items.push({k:'1'+u.date+(u.time||''),i:/^🧪/.test(u.title)?'🧪':/^🔬/.test(u.title)?'🔬':/^🏥/.test(u.title)?'🏥':'🩺',t:u.title.replace(/^\p{Extended_Pictographic}\uFE0F?\s*/u,''),s:fmt(u.date)+(u.time?' · '+u.time:'')+(u.sub?' · '+u.sub:''),c:chip(u.n),g:'prog'}));
 if(bg.ready)bg.up.forEach(u=>items.push({k:'1'+u.date+'~',i:'🧾',t:u.title+(u.amount?' · '+ron(u.amount):''),s:fmt(u.date)+' · plată planificată',c:chip(u.n),g:'bplan',b:1}));
 items.sort((x,y)=>x.k.localeCompare(y.k));
 const ag=`<div class="c"><h2>📅 Azi și în curând <button class="btn" data-g="prog">Programări</button></h2>${a.od?`<div class="r"><div class="ic">⏰</div><span>${a.od} ${a.od===1?'programare depășită':'programări depășite'}</span><button class="btn" data-g="prog">Vezi</button></div>`:''}${items.slice(0,7).map(x=>`<div class="r" data-${x.b?"bg":"g"}="${x.g}" style="cursor:pointer"><div class="ic">${x.i}</div><span>${esc(x.t)}<small>${esc(x.s)}</small></span>${x.c}</div>`).join('')||'<div class="empty">Nimic de făcut azi și nimic programat în 30 de zile.</div>'}</div>`;
 const bp=a.bp?`<button class="m bp" data-g="bp"><small>TENSIUNE · ultima</small><b>${a.bp.sys}/${a.bp.dia}</b><i>${esc(a.bp.cat)} · ${esc(a.bp.ago)}</i></button>`:`<button class="m bp" data-g="bp"><small>TENSIUNE</small><b>—/—</b><i>Măsoară prima dată</i></button>`;
 const bc=bg.ready?(bg.plan?`<button class="m bg" data-bg="home"><small>BUGET · luna asta</small><b>${ron(bg.planLeft)}</b><i>${bg.planLeft>=0?'rămași din '+ron(bg.plan):'peste plan cu '+ron(-bg.planLeft)}</i></button>`:`<button class="m bg" data-bg="home"><small>BUGET · cheltuit luna asta</small><b>${ron(bg.spent)}</b><i>disponibil ${ron(bg.avail)}</i></button>`):`<button class="m bg off" data-t="budget"><small>BUGET</small><b>—</b><i>deschide Bugetul</i></button>`,two=`<div class="two">${bc}${bp}</div>`;
 const q='';
 const ln=[];if(a.w)ln.push(`Tensiune medie pe 7 zile: <b>${a.w.sys}/${a.w.dia}</b>${a.w0?(Math.abs(a.w.sys-a.w0.sys)<2?' (la fel ca înainte)':a.w.sys<a.w0.sys?' (cu '+(a.w0.sys-a.w.sys)+' mmHg mai mică)':' (cu '+(a.w.sys-a.w0.sys)+' mmHg mai mare)'):''}.`);
 if(bg.ready&&bg.spent>0)ln.push(`Cheltuit luna asta: <b>${ron(bg.spent)}</b>${bg.prevSpent>0?' (luna trecută '+ron(bg.prevSpent)+')':''}${bg.top?'. Cea mai mare categorie: <b>'+esc(bg.top[0])+'</b>':''}.`);
 const ins=ln.length?`<div class="c ins"><h2>💡 Pe scurt</h2><p>${ln.join('<br>')}</p></div>`:'';
 v.innerHTML=hd+ag+two+q+ins+'<div style="height:18px"></div>'}
const bugCard=()=>`<div class="two"><button class="m bg off" data-t="budget"><small>BUGET</small><b>în curând</b><i>pasul următor</i></button></div>`;
function more(){$('more').innerHTML=`<div class="hd"><small>Agenda Mea</small><h1>Mai mult</h1></div>
<div class="c"><div class="r" data-g="set" style="cursor:pointer"><div class="ic">⚙️</div><span>Setări Sănătate<small>Backup, parolă, Face ID, calendar .ics, specialități</small></span></div>
<div class="r"><div class="ic">💾</div><span>Backup unic<small>vine la pasul 3: Buget + Sănătate într-un singur fișier</small></span></div></div>
<div class="c ins"><h2>ℹ️ Despre</h2><p>Agenda Mea V5.2.0. Datele rămân pe telefonul tău. Sănătatea și Bugetul funcționează ca aplicațiile de până acum, cu datele păstrate separat.</p></div>`}
function show(k){const same=cur===k;cur=k;if(same){if(k==='health')go('home');if(k==='budget')bgo('hub')}['home','health','budget','more'].forEach(x=>{const e=x==='health'?fs:x==='budget'?bud:$(x);e.classList.toggle('on',x===k)});document.querySelectorAll('#nv button').forEach(b=>b.classList.toggle('on',b.dataset.t===k));if(k==='home')home();if(k==='more')more()}
document.addEventListener('click',e=>{const f=e.target.closest('[data-fab]');if(f){dial(f.dataset.fab);return}if(!e.target.closest('#dial'))$('dial').hidden=true;const t=e.target.closest('[data-t],[data-g],[data-bg]');if(!t)return;if(t.dataset.bg){bgo(t.dataset.bg);show('budget')}else if(t.dataset.g){go(t.dataset.g);show('health')}else show(t.dataset.t)});
function dial(k){const d=$('dial');if(k==='toggle'){d.hidden=!d.hidden;return}d.hidden=true;
 if(k==='scan'){bgo('scan');show('budget')}else if(k==='exp'){bgo('add');show('budget')}else if(k==='bp'){go('bp');show('health')}else if(k==='pill'){go('pills');show('health')}else if(k==='appt'){go('newappt');show('health')}}
bud.addEventListener('load',()=>{if(cur==='home')home()});
fs.addEventListener('load',()=>{if(cur==='home')home();if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{})});
setInterval(()=>{if(cur==='home'&&!document.hidden)home()},20000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&cur==='home')home()});
fs.src='sanatate.html';bud.src='buget.html';show('home');
})();
