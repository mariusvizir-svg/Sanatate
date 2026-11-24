/* Agenda Mea – teme și culori (comun: Acasă, Sănătate, Buget) */
(function () {
  var K = 'am-theme';
  var PRE = [['Marin', '#0a4f7c'], ['Pădure', '#17684a'], ['Apus', '#b04a15'], ['Violet', '#5f37b8'], ['Coral', '#b82a45'], ['Grafit', '#344558']];
  var THEMES = { curat: ['Curat', '#0a4f7c'], bancar: ['Bancar', '#b87a08'], contrast: ['Contrast mare', '#1a3fd0'], colorat: ['Colorat', '#7a3df0'] };
  var THC = 'html[data-th=bancar]{--bg:#faf6ec;--card:#fff;--tx:#1b1608;--mu:#7a7260;--ln:#eadfc4}html[data-th=bancar][data-m=dark]{--bg:#0a0a0a;--card:#1b1b1b;--tx:#f2f2f2;--mu:#9a9a9a;--ln:#2a2a2a}' +
    'html[data-th=contrast]{--bg:#fff;--card:#fff;--tx:#000;--mu:#2b2b2b;--ln:#000}html[data-th=contrast][data-m=dark]{--bg:#000;--card:#000;--tx:#fff;--mu:#d6d6d6;--ln:#fff}' +
    'html[data-th=colorat]{--bg:#f6f0ff;--card:#fff;--tx:#2a1650;--mu:#7a66a3;--ln:#e7dbff}html[data-th=colorat][data-m=dark]{--bg:#150d2b;--card:#221545;--tx:#f0eaff;--mu:#a99bd0;--ln:#33236b}' +
    'html[data-th=bancar] .c,html[data-th=bancar] .card{border-radius:20px}html[data-th=colorat] .c,html[data-th=colorat] .card,html[data-th=colorat] .tile{border-radius:26px}' +
    'html[data-th=contrast] .c,html[data-th=contrast] .card,html[data-th=contrast] .tile,html[data-th=contrast] .row{border:2px solid var(--ln)!important;box-shadow:none!important;border-radius:10px}html[data-th=contrast] body{font-weight:600}html[data-th=contrast] .mu,html[data-th=contrast] small{color:var(--mu)!important}';

  var IOSC = 'html[data-fm=ios] .hd{background:none;color:var(--tx);border-radius:0;padding:calc(16px + env(safe-area-inset-top)) 20px 4px}html[data-fm=ios] .hd small{color:var(--mu);font-size:13px;font-weight:600}html[data-fm=ios] .hd h1{color:var(--tx);font-size:32px;font-weight:700;letter-spacing:-.02em;margin:2px 0 0}' +
    'html[data-fm=ios] .c,html[data-fm=ios] .card,html[data-fm=ios] .azc,html[data-fm=ios] .smc,html[data-fm=ios] .hhero{border:0;box-shadow:none;border-radius:18px}html[data-fm=ios] .smc{border-left:0}' +
    'html[data-fm=ios] .btn{border-radius:999px;font-weight:600}html[data-fm=ios] .btn:not(.p):not(.d){background:color-mix(in srgb,var(--ac) 14%,transparent);color:var(--ac);border:0;box-shadow:none}html[data-fm=ios] .btn.p{background:var(--ac);color:#fff;border:0;box-shadow:none}' +
    'html[data-fm=ios] .sg,html[data-fm=ios] .seg{background:rgba(120,130,150,.18);border-radius:11px;padding:2px;gap:2px;border:0}html[data-fm=ios] .sg button,html[data-fm=ios] .seg button{border-radius:9px;border:0;background:none;box-shadow:none}html[data-fm=ios] .sg button.on,html[data-fm=ios] .seg button.on{background:var(--card);color:var(--tx);box-shadow:0 1px 4px rgba(0,0,0,.22)}' +
    'html[data-fm=ios] nav#nv{margin:6px auto calc(10px + env(safe-area-inset-bottom));width:max-content;max-width:94%;padding:5px;gap:2px;border:1px solid var(--ln);border-radius:999px;background:color-mix(in srgb,var(--card) 90%,transparent);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);box-shadow:0 8px 26px rgba(0,0,0,.16)}' +
    'html[data-fm=ios] nav#nv button{flex:none;display:flex;flex-direction:row;align-items:center;gap:6px;padding:10px 14px;border-radius:999px;font-size:13px;font-weight:700;background:none;box-shadow:none}html[data-fm=ios] nav#nv button:not(.on){font-size:0;gap:0;padding:10px 13px}html[data-fm=ios] nav#nv button.on{background:var(--ac);color:#fff;box-shadow:none}html[data-fm=ios] nav#nv .nsp{display:none}' +
    'html[data-fm=ios] #fab{left:auto;right:16px;transform:none;bottom:calc(80px + env(safe-area-inset-bottom));width:56px;height:56px;border:0;background:var(--ac);box-shadow:0 8px 22px rgba(0,0,0,.28)}html[data-fm=ios] #fab.sh{transform:translateY(90px) scale(.8)}' +
    '@media(max-width:900px){html[data-fm=ios] header{background:var(--bg)!important;color:var(--tx)!important;border-radius:0!important;box-shadow:none!important;padding-bottom:6px!important}html[data-fm=ios] header h1{color:var(--tx)!important;font-weight:700}html[data-fm=ios] #hsub{color:var(--mu)!important}html[data-fm=ios] #psel,html[data-fm=ios] header select#psel,html[data-fm=ios] #month{background:rgba(120,130,150,.18)!important;color:var(--tx)!important}html[data-fm=ios] header #back,html[data-fm=ios] header #burger,html[data-fm=ios] #back{background:rgba(120,130,150,.18)!important;color:var(--ac)!important}}' +
    'html[data-fm=ios] .bkb{display:inline-flex;align-items:center;gap:2px;border:0;background:none;color:var(--ac);font:600 16px inherit;font-family:inherit;padding:6px 2px;margin:0 0 4px;cursor:pointer}' ;
  var SZ = { mari: 128, normale: 108, mici: 92 };
  function get() { try { var o = JSON.parse(localStorage.getItem(K) || '{}'); return { c: /^#[0-9a-f]{6}$/i.test(o.c || '') ? o.c : PRE[0][1], s: SZ[o.s] ? o.s : 'normale', m: o.m === 'dark' ? 'dark' : 'light', t: THEMES[o.t] ? o.t : 'curat', f: o.f === 'clasic' ? 'clasic' : 'ios' }; } catch (e) { return { c: PRE[0][1], s: 'normale', m: 'light' }; } }
  function hex(n) { return '#' + [n[0], n[1], n[2]].map(function (x) { x = Math.max(0, Math.min(255, Math.round(x))); return (x < 16 ? '0' : '') + x.toString(16); }).join(''); }
  function rgb(h) { return [1, 3, 5].map(function (i) { return parseInt(h.slice(i, i + 2), 16); }); }
  function mix(h, t, k) { var a = rgb(h); return hex(a.map(function (x, i) { return x + (t[i] - x) * k; })); }

  var DK = 'html[data-m=dark]{color-scheme:dark;--bg:#0b0d12;--card:#161a22;--tx:#eef1f6;--mu:#98a2b3;--ln:#262c38;--sh1:0 1px 0 rgba(255,255,255,.05) inset,0 10px 30px rgba(0,0,0,.45);--sh2:0 1px 0 rgba(255,255,255,.06) inset,0 18px 44px rgba(0,0,0,.55)}' +
    'html[data-m=dark] body{background:var(--bg);color:var(--tx)}' +
    'html[data-m=dark] .c,html[data-m=dark] .card,html[data-m=dark] .tile.w,html[data-m=dark] .kpi,html[data-m=dark] .rpc,html[data-m=dark] .q button,html[data-m=dark] dialog,html[data-m=dark] .row,html[data-m=dark] .famc{background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.02)),var(--card);border:1px solid rgba(255,255,255,.07);color:var(--tx);box-shadow:var(--sh1)}' +
    'html[data-m=dark] .card .row{background:none;box-shadow:none;border:0;border-bottom:1px solid var(--ln)}html[data-m=dark] .card .row:last-child{border-bottom:0}' +
    'html[data-m=dark] input,html[data-m=dark] select,html[data-m=dark] textarea{background:#0f131a;color:var(--tx);border-color:var(--ln)}' +
    'html[data-m=dark] nav#nv,html[data-m=dark] #nav,html[data-m=dark] .nb{background:rgba(16,19,26,.86)}' +
    'html[data-m=dark] .c,html[data-m=dark] .card,html[data-m=dark] .tile{transition:transform .18s,box-shadow .18s}html[data-m=dark] .tile:active{transform:translateY(-2px) scale(.99)}' +
    'html[data-m=dark] .chip,html[data-m=dark] .chs button,html[data-m=dark] .sg{background:rgba(255,255,255,.06)}html[data-m=dark] .sg button.on{background:var(--a2)!important;color:#fff!important}';
  function inject(d) { try { var q = d.getElementById('am-th'); if (!q) { q = d.createElement('style'); q.id = 'am-th'; d.head.appendChild(q); } q.textContent = IOSC + THC; } catch (x) { } try { var e = d.getElementById('am-dk'); if (!e) { e = d.createElement('style'); e.id = 'am-dk'; d.head.appendChild(e); } e.textContent = DK; } catch (x) { } }
  function apply(doc) {
    try {
      var t = get(), r = (doc || document).documentElement, st = r.style;
      st.setProperty('--a2', t.c); st.setProperty('--a1', mix(t.c, [255, 255, 255], .22)); st.setProperty('--a3', mix(t.c, [0, 0, 0], .38));
      var dk = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches && !(doc || document).documentElement.classList.contains('emb'); st.setProperty('--ac', dk ? mix(t.c, [255, 255, 255], .4) : mix(t.c, [0, 0, 0], .12)); st.setProperty('--th', SZ[t.s] + 'px'); r.setAttribute('data-sz', t.s); r.setAttribute('data-th', t.t); r.setAttribute('data-fm', t.f); inject(doc || document); if (t.m === 'dark') { r.setAttribute('data-m', 'dark'); st.setProperty('--ac', mix(t.c, [255, 255, 255], .42)); } else r.removeAttribute('data-m');
      var m = (doc || document).querySelector('meta[name=theme-color]'); if (m) m.setAttribute('content', mix(t.c, [0, 0, 0], .38));
    } catch (e) { }
  }
  function set(o) {
    var t = get(); if (o.t && THEMES[o.t]) { t.t = o.t; if (!o.c) t.c = THEMES[o.t][1]; } if (o.c) t.c = o.c; if (o.f) t.f = o.f === 'clasic' ? 'clasic' : 'ios'; if (o.s) t.s = o.s; if (o.m) t.m = o.m;
    try { localStorage.setItem(K, JSON.stringify(t)); } catch (e) { }
    apply(document);
    ['fs', 'bud'].forEach(function (id) { try { var f = document.getElementById(id); if (f && f.contentDocument) apply(f.contentDocument); } catch (e) { } });
  }
  window.AMTheme = { themes: THEMES, get: get, set: set, apply: apply, presets: PRE };
  apply(document);
  if (window.matchMedia) { try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { apply(document); }); } catch (e) { } }
  addEventListener('storage', function (e) { if (e.key === K) apply(document); });
})();
