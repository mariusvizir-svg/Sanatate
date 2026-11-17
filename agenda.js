'use strict';
(function(){
const $=id=>document.getElementById(id),esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let cur='home';const fs=$('fs'),bud=$('bud');
const api=()=>{try{const w=fs.contentWindow;if(!w||!w.AGENDA_API)return{ready:false,why:w&&w.__booted?'old':'loading'};return w.AGENDA_API()}catch(e){return{ready:false,why:'err',err:String(e&&e.message||e)}}};
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
 const bd=days(lb()),bk=bd==null||bd>=14?`<div class="c" style="border:1.5px solid #f4d9a0"><h2>💾 ${bd==null?'Nu ai făcut încă backup':'Ultimul backup: acum '+bd+' zile'}</h2><button class="btn p" data-t="more">Fă backup unic</button></div>`:'';
 v.innerHTML=hd+ag+two+q+ins+bk+'<div style="height:18px"></div>'}
const bugCard=()=>{const bg=bapi();return bg.ready?`<div class="two"><button class="m bg" data-bg="hub"><small>BUGET · cheltuit luna asta</small><b>${ron(bg.spent)}</b><i>disponibil ${ron(bg.avail)}</i></button></div>`:`<div class="two"><button class="m bg off" data-t="budget"><small>BUGET</small><b>—</b><i>se încarcă…</i></button></div>`};
const LB='am-lastbackup',lb=()=>{try{return localStorage.getItem(LB)}catch{return null}},days=d=>d?Math.floor((Date.now()-new Date(d))/864e5):null;
function toast(m){let t=$('toast');if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t)}t.textContent=m;t.className='on';clearTimeout(t._t);t._t=setTimeout(()=>t.className='',3500)}
function more(){const d=lb(),n=days(d),old=!d||n>=14;$('more').innerHTML=`<div class="hd"><small>Agenda Mea</small><h1>Mai mult</h1></div>
<div class="c" style="${old?'border:1.5px solid #f2b8c0':''}"><div class="bk"><div class="ic">💾</div><span style="flex:1"><b>Backup unic</b><small class="mu" style="display:block;margin-top:2px">${d?'Ultimul: '+fmt(d)+' · '+(n===0?'azi':'acum '+n+' zile'):'<b style="color:#b6203c">Nu ai făcut încă niciun backup</b>'}</small></span>${old?'<span class="t hot">de făcut</span>':'<span class="t good">la zi</span>'}</div>
<p class="mu" style="margin-top:8px">Un singur fișier cu Buget + Sănătate, inclusiv pozele din dosar. Salvează-l în Fișiere / iCloud. <b>Nu îl urca pe GitHub.</b></p></div>
<div class="mg"><button class="mt t1" data-act="backup"><span class="i"><svg viewBox="0 0 24 24"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg></span><span><b>Salvează backup</b><small>Buget + Sănătate</small></span></button>
<button class="mt t2" data-act="restore"><span class="i"><svg viewBox="0 0 24 24"><path d="M12 20V9M7 13l5-5 5 5M5 4h14"/></svg></span><span><b>Importă backup</b><small>Dintr-un fișier</small></span></button>
<button class="mt t3" data-g="set"><span class="i"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.400-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.600-7 10-7 10z"/></svg></span><span><b>Setări Sănătate</b><small>Parolă, pacienți, .ics</small></span></button>
<button class="mt t4" data-bg="set"><span class="i"><svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18"/></svg></span><span><b>Setări Buget</b><small>Securitate, categorii</small></span></button></div>
<input type="file" id="impall" accept=".json,application/json" hidden>
<div class="c ins"><h2>ℹ️ Despre</h2><p>Agenda Mea V5.5.0. Datele rămân pe telefonul tău. La import se face automat un instantaneu de siguranță, deci poți reveni dacă ceva nu e bine.</p></div>`}
const kindOf=j=>j&&j.__agenda?'all':j&&Array.isArray(j.transactions)?'budget':j&&Array.isArray(j.patients)?'health':null;
async function backupAll(){try{const h=await fs.contentWindow.AGENDA_EXPORT(),b=await bud.contentWindow.AGENDA_EXPORT(),dd=new Date(),z=x=>String(x).padStart(2,'0'),ds=dd.getFullYear()+'-'+z(dd.getMonth()+1)+'-'+z(dd.getDate()),nm='backup-agenda-mea-'+ds+'.json',txt=JSON.stringify({__agenda:1,created:dd.toISOString(),health:h,budget:b}),file=new File([txt],nm,{type:'application/json'});
 try{if(navigator.canShare&&navigator.canShare({files:[file]}))await navigator.share({files:[file],title:nm});else dl(nm,txt)}catch(e){if(e&&e.name==='AbortError'){toast('Backup anulat');return}dl(nm,txt)}
 try{localStorage.setItem(LB,ds)}catch{}toast('Backup făcut: '+nm);if(cur==='more')more()}catch(e){alert('Backup nereușit: '+(e&&e.message||e))}}
function dl(nm,txt){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'application/json'}));a.download=nm;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},2000)}
async function restoreAll(f){if(!f)return;let j;try{j=JSON.parse(await f.text())}catch{return alert('Fișierul nu este JSON valid.')}
 const k=kindOf(j);if(!k)return alert('Fișierul nu pare un backup Agenda Mea, Sănătate sau Buget.');
 const parts=[];if(k==='all'||k==='health')parts.push(['Sănătate',fs,k==='all'?j.health:j]);if(k==='all'||k==='budget')parts.push(['Buget',bud,k==='all'?j.budget:j]);
 const msg=[];for(const[n,fr,o]of parts){if(!o)return alert('Backup-ul nu conține datele pentru '+n+'.');const p=fr.contentWindow.AGENDA_PEEK(o);if(p.err)return alert(n+': '+p.err);msg.push('• '+n+': '+p.n+(p.bad?' ('+p.bad+' înregistrări invalide ignorate)':''))}
 if(!confirm('Backup găsit:\n'+msg.join('\n')+'\n\nÎnlocuiești datele curente din aceste părți? Se face automat un instantaneu de siguranță.'))return;
 try{for(const[n,fr,o]of parts)await fr.contentWindow.AGENDA_IMPORT(o)}catch(e){return alert('Importul a eșuat: '+(e&&e.message||e))}
 toast('Import făcut. Se reîncarcă…');setTimeout(()=>location.reload(),900)}
function show(k){const dl=$('dial');if(dl)dl.hidden=true;const same=cur===k;cur=k;if(same){if(k==='health')go('home');if(k==='budget')bgo('hub')}['home','health','budget','more'].forEach(x=>{const e=x==='health'?fs:x==='budget'?bud:$(x);e.classList.toggle('on',x===k)});document.querySelectorAll('#nv button').forEach(b=>b.classList.toggle('on',b.dataset.t===k));if(k==='home')home();if(k==='more')more()}
document.addEventListener('click',e=>{const dl0=$('dial');if(dl0&&!dl0.hidden&&!e.target.closest('#dial,#fab'))dl0.hidden=true;const ac=e.target.closest('[data-act]');if(ac){if(ac.dataset.act==='backup')backupAll();else if(ac.dataset.act==='restore')$('impall').click();return}const f=e.target.closest('[data-fab]');if(f){dial(f.dataset.fab);return}if(!e.target.closest('#dial'))$('dial').hidden=true;const t=e.target.closest('[data-t],[data-g],[data-bg]');if(!t)return;if(t.dataset.bg){bgo(t.dataset.bg);show('budget')}else if(t.dataset.g){go(t.dataset.g);show('health')}else show(t.dataset.t)});
function dial(k){const d=$('dial');if(k==='toggle'){d.hidden=!d.hidden;return}d.hidden=true;
 if(k==='scan'){bgo('scan');show('budget')}else if(k==='exp'){bgo('add');show('budget')}else if(k==='bp'){go('bp');show('health')}else if(k==='pill'){go('pills');show('health')}else if(k==='appt'){go('newappt');show('health')}}
document.addEventListener('change',e=>{if(e.target.id==='impall'){restoreAll(e.target.files[0]);e.target.value=''}});
bud.addEventListener('load',()=>{if(cur==='home')home()});
fs.addEventListener('load',()=>{if(cur==='home')home();if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{})});
let tries=0;(function retry(){if(cur==='home'&&!document.hidden&&(!api().ready||!bapi().ready)&&tries<120){tries++;home()}setTimeout(retry,tries<120?600:20000)})();
window.addEventListener('message',e=>{if(e.data&&e.data.agenda==='ready'&&cur==='home')home()});
setInterval(()=>{if(cur==='home'&&!document.hidden)home()},20000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden){tries=0;if(cur==='home')home()}});
fs.src='sanatate.html';bud.src='buget.html';show('home');
})();
