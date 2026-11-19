/* Agenda Mea – animații (comun: Acasă, Sănătate, Buget) */
(function () {
  var RM = (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) || navigator.webdriver === true;
  var NUM = '.hbig,.scr b,.bgr b,.k b,.kpi b,.hz .hbig,.acs b,.big2,.tile b.n,.t1 b,.qs b.v,.c b.cnt,.hsm b';
  var RING = '.scr svg circle:last-child,.bgr svg circle:last-child,.pring circle:last-child';
  var LINES = '.spk2 polyline,.tr6 polyline,.spk polyline,svg.mini polyline';
  var BARS = '.bar i,.kbar i,.mbar i';
  var last = {}, sig = '', busy = 0, tm;
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function parse(s) {
    var m = /(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d+))?/.exec(s); if (!m) return null;
    var ip = m[1].replace(/\./g, ''), dec = m[2] || '', v = parseFloat(ip + (dec ? '.' + dec : ''));
    if (/\d\/\d/.test(s)) return null; // 122/82
    return { v: v, dec: dec.length, pre: s.slice(0, m.index), post: s.slice(m.index + m[0].length), thou: m[1].indexOf('.') > -1 || v >= 10000 };
  }
  function fmt(p, v) {
    var s = v.toFixed(p.dec).replace('.', ','), a = s.split(','), i = a[0];
    if (p.thou || /RON|lei/.test(p.post)) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return p.pre + i + (a[1] ? ',' + a[1] : '') + p.post;
  }
  function count(el, idx, replay) {
    if (el._fx || el.getAttribute('data-fxn') === el.textContent) return;
    var tx = el.textContent, p = parse(tx); if (!p) { el.setAttribute('data-fxn', tx); return; }
    var key = (el.className || el.tagName) + '#' + idx, from = last[key] != null && !replay ? last[key] : 0;
    last[key] = p.v; el.setAttribute('data-fxn', tx);
    if (RM || from === p.v) return;
    var t0 = performance.now(), D = 900 + Math.min(600, Math.abs(p.v - from) / 50);
    el._fx = 1; (function f(n) { var k = Math.min(1, (n - t0) / D), v = from + (p.v - from) * ease(k); el.textContent = fmt(p, v); el.setAttribute('data-fxn', tx); if (k < 1) requestAnimationFrame(f); else { el.textContent = tx; el._fx = 0; } })(t0);
  }
  function rings() {
    [].forEach.call(document.querySelectorAll(RING), function (c) {
      if (c.getAttribute('data-fxr')) return; c.setAttribute('data-fxr', 1); if (RM) return;
      var d = c.getAttribute('stroke-dasharray'); if (!d) return; var t = d.split(' '), full = t[1];
      c.style.transition = 'none'; c.setAttribute('stroke-dasharray', '0 ' + full); void c.getBoundingClientRect();
      c.style.transition = 'stroke-dasharray 1.1s cubic-bezier(.2,.8,.2,1)'; requestAnimationFrame(function () { c.setAttribute('stroke-dasharray', d); });
    });
    [].forEach.call(document.querySelectorAll('.dn svg circle:not(:first-child)'), function (c, i) {
      if (c.getAttribute('data-fxr')) return; c.setAttribute('data-fxr', 1); if (RM) return;
      c.style.opacity = 0; c.style.transition = 'opacity .5s ' + (i * .12) + 's'; requestAnimationFrame(function () { c.style.opacity = 1; });
    });
  }
  function lines() {
    [].forEach.call(document.querySelectorAll(LINES), function (l) {
      if (l.getAttribute('data-fxl')) return; l.setAttribute('data-fxl', 1); if (RM || !l.getTotalLength) return;
      try { var L = l.getTotalLength(); l.style.strokeDasharray = L; l.style.strokeDashoffset = L; l.style.transition = 'none'; void l.getBoundingClientRect(); l.style.transition = 'stroke-dashoffset 1.2s ease .2s'; requestAnimationFrame(function () { l.style.strokeDashoffset = 0; }); setTimeout(function () { l.style.strokeDasharray = ''; l.style.strokeDashoffset = ''; }, 1500); } catch (e) { }
    });
  }
  function bars() {
    [].forEach.call(document.querySelectorAll(BARS), function (b) {
      if (b.getAttribute('data-fxb')) return; b.setAttribute('data-fxb', 1); if (RM) return;
      var w = b.style.width; if (!w) return; b.style.transition = 'none'; b.style.width = '0'; void b.offsetWidth; b.style.transition = 'width 1s cubic-bezier(.2,.8,.2,1) .15s'; requestAnimationFrame(function () { b.style.width = w; });
    });
  }
  function enter(force) {
    var h = document.querySelector('#title,h1,header h1'), s = (h ? h.textContent : '') + '|' + (document.body.getAttribute('data-tab') || '');
    if (!force && s === sig) return; sig = s; if (RM) return;
    var els = document.querySelectorAll('#view>*:not(.sumline):not(header),.hubg>*,.tiles>*,.qs>*,.kk>*,.acs>*,.g3>*,.mt');
    [].forEach.call(els, function (e, i) { if (i > 26) return; e.classList.remove('fxin'); void e.offsetWidth; e.style.setProperty('--fxd', (Math.min(i, 10) * 40) + 'ms'); e.classList.add('fxin'); });
  }
  function run(force) {
    if (busy) return; busy = 1;
    try { enter(force); var seen = {}; [].forEach.call(document.querySelectorAll(NUM), function (e) { var k = e.className || e.tagName; seen[k] = (seen[k] || 0) + 1; count(e, seen[k], force); }); rings(); lines(); bars(); } catch (e) { }
    busy = 0;
  }
  function sched(force) { clearTimeout(tm); if (!force && document.body && document.body.classList.contains('scanning')) return; tm = setTimeout(function () { run(force); }, force ? 40 : 160); }
  function replay() { last = {}; sig = ''; [].forEach.call(document.querySelectorAll('[data-fxr],[data-fxl],[data-fxb],[data-fxn]'), function (e) { ['data-fxr', 'data-fxl', 'data-fxb', 'data-fxn'].forEach(function (a) { e.removeAttribute(a); }); }); sched(1); }
  var st = document.createElement('style');
  st.textContent = '@keyframes fxin{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}.fxin{animation:fxin .4s cubic-bezier(.2,.8,.2,1) backwards;animation-delay:var(--fxd,0ms)}' +
    '@keyframes fxpop{0%{transform:scale(1)}40%{transform:scale(.94)}100%{transform:scale(1)}}' +
    '.tile:active,.hbt:active,.gl:active,.qs button:active,.qi:active,button.k:active{transform:scale(.97)!important;transition:transform .12s}' +
    '.card,.tile,.hbt,.gl{transition:transform .22s cubic-bezier(.2,.8,.2,1),box-shadow .22s}' +
    '@keyframes fxpulse{0%{transform:scale(1);opacity:.45}100%{transform:scale(1.55);opacity:0}}#fab{position:fixed}#fab:after,.fab:after{content:"";position:absolute;inset:0;border-radius:50%;background:var(--a1,#0e7aa0);z-index:-1;pointer-events:none;animation:fxpulse 2.8s ease-out infinite;will-change:transform,opacity}' +
    '@keyframes fxfl{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}' +
    '@keyframes fxrip{to{transform:scale(3.2);opacity:0}}.fxr{position:absolute;border-radius:50%;pointer-events:none;background:currentColor;opacity:.18;transform:scale(0);animation:fxrip .6s ease-out forwards}' +
    '@media(prefers-reduced-motion:reduce){.fxin,#fab:after,.fab:after{animation:none!important}}';
  (document.head || document.documentElement).appendChild(st);
  document.addEventListener('pointerdown', function (e) {
    if (RM) return; var b = e.target.closest && e.target.closest('.hbt,.tile,.gl,.qs button,button.k'); if (!b) return;
    var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height), x = document.createElement('span'); x.className = 'fxr';
    x.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' + (e.clientX - r.left - d / 2) + 'px;top:' + (e.clientY - r.top - d / 2) + 'px'; if (getComputedStyle(b).position === 'static') b.style.position = 'relative'; b.style.overflow = 'hidden'; b.appendChild(x); setTimeout(function () { x.remove(); }, 650);
  }, { passive: true });
  function boot() { new MutationObserver(function () { sched(0); }).observe(document.body, { childList: true, subtree: true }); sched(1); }
  window.AMFx = { run: run, replay: replay };
  if (document.body) boot(); else addEventListener('DOMContentLoaded', boot);
})();
