/* Agenda Mea – teme și culori (comun: Acasă, Sănătate, Buget) */
(function () {
  var K = 'am-theme';
  var PRE = [['Marin', '#0a4f7c'], ['Pădure', '#17684a'], ['Apus', '#b04a15'], ['Violet', '#5f37b8'], ['Coral', '#b82a45'], ['Grafit', '#344558']];
  var SZ = { mari: 128, normale: 108, mici: 92 };
  function get() { try { var o = JSON.parse(localStorage.getItem(K) || '{}'); return { c: /^#[0-9a-f]{6}$/i.test(o.c || '') ? o.c : PRE[0][1], s: SZ[o.s] ? o.s : 'normale' }; } catch (e) { return { c: PRE[0][1], s: 'normale' }; } }
  function hex(n) { return '#' + [n[0], n[1], n[2]].map(function (x) { x = Math.max(0, Math.min(255, Math.round(x))); return (x < 16 ? '0' : '') + x.toString(16); }).join(''); }
  function rgb(h) { return [1, 3, 5].map(function (i) { return parseInt(h.slice(i, i + 2), 16); }); }
  function mix(h, t, k) { var a = rgb(h); return hex(a.map(function (x, i) { return x + (t[i] - x) * k; })); }
  function apply(doc) {
    try {
      var t = get(), r = (doc || document).documentElement, st = r.style;
      st.setProperty('--a2', t.c); st.setProperty('--a1', mix(t.c, [255, 255, 255], .22)); st.setProperty('--a3', mix(t.c, [0, 0, 0], .38));
      var dk = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches && !(doc || document).documentElement.classList.contains('emb'); st.setProperty('--ac', dk ? mix(t.c, [255, 255, 255], .4) : mix(t.c, [0, 0, 0], .12)); st.setProperty('--th', SZ[t.s] + 'px'); r.setAttribute('data-sz', t.s);
      var m = (doc || document).querySelector('meta[name=theme-color]'); if (m) m.setAttribute('content', mix(t.c, [0, 0, 0], .38));
    } catch (e) { }
  }
  function set(o) {
    var t = get(); if (o.c) t.c = o.c; if (o.s) t.s = o.s;
    try { localStorage.setItem(K, JSON.stringify(t)); } catch (e) { }
    apply(document);
    ['fs', 'bud'].forEach(function (id) { try { var f = document.getElementById(id); if (f && f.contentDocument) apply(f.contentDocument); } catch (e) { } });
  }
  window.AMTheme = { get: get, set: set, apply: apply, presets: PRE };
  apply(document);
  if (window.matchMedia) { try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { apply(document); }); } catch (e) { } }
  addEventListener('storage', function (e) { if (e.key === K) apply(document); });
})();
