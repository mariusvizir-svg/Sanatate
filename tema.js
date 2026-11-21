/* Agenda Mea – teme și culori (comun: Acasă, Sănătate, Buget) */
(function () {
  var K = 'am-theme';
  var PRE = [['Marin', '#0a4f7c'], ['Pădure', '#17684a'], ['Apus', '#b04a15'], ['Violet', '#5f37b8'], ['Coral', '#b82a45'], ['Grafit', '#344558']];
  var SZ = { mari: 128, normale: 108, mici: 92 };
  function get() { try { var o = JSON.parse(localStorage.getItem(K) || '{}'); return { c: /^#[0-9a-f]{6}$/i.test(o.c || '') ? o.c : PRE[0][1], s: SZ[o.s] ? o.s : 'normale', m: o.m === 'dark' ? 'dark' : 'light' }; } catch (e) { return { c: PRE[0][1], s: 'normale', m: 'light' }; } }
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
  function inject(d) { try { var e = d.getElementById('am-dk'); if (!e) { e = d.createElement('style'); e.id = 'am-dk'; d.head.appendChild(e); } e.textContent = DK; } catch (x) { } }
  function apply(doc) {
    try {
      var t = get(), r = (doc || document).documentElement, st = r.style;
      st.setProperty('--a2', t.c); st.setProperty('--a1', mix(t.c, [255, 255, 255], .22)); st.setProperty('--a3', mix(t.c, [0, 0, 0], .38));
      var dk = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches && !(doc || document).documentElement.classList.contains('emb'); st.setProperty('--ac', dk ? mix(t.c, [255, 255, 255], .4) : mix(t.c, [0, 0, 0], .12)); st.setProperty('--th', SZ[t.s] + 'px'); r.setAttribute('data-sz', t.s); inject(doc || document); if (t.m === 'dark') { r.setAttribute('data-m', 'dark'); st.setProperty('--ac', mix(t.c, [255, 255, 255], .42)); } else r.removeAttribute('data-m');
      var m = (doc || document).querySelector('meta[name=theme-color]'); if (m) m.setAttribute('content', mix(t.c, [0, 0, 0], .38));
    } catch (e) { }
  }
  function set(o) {
    var t = get(); if (o.c) t.c = o.c; if (o.s) t.s = o.s; if (o.m) t.m = o.m;
    try { localStorage.setItem(K, JSON.stringify(t)); } catch (e) { }
    apply(document);
    ['fs', 'bud'].forEach(function (id) { try { var f = document.getElementById(id); if (f && f.contentDocument) apply(f.contentDocument); } catch (e) { } });
  }
  window.AMTheme = { get: get, set: set, apply: apply, presets: PRE };
  apply(document);
  if (window.matchMedia) { try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { apply(document); }); } catch (e) { } }
  addEventListener('storage', function (e) { if (e.key === K) apply(document); });
})();
