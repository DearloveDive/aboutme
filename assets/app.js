/* ECLIPSE VINCERE — 시작 연출 + 3D 망점 달 + 아래 내용. 내용 수정은 content.js 에서 하세요. */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) { document.body.innerHTML = "<p style='padding:40px;color:#fff'>content.js 를 불러오지 못했어요. 따옴표나 쉼표가 빠졌는지 확인해주세요.</p>"; return; }
  var I = S.intro, H = I.hud, M = S.main, root = document.documentElement;
  var SHOT = /[?&]shot/.test(location.search);
  var REDUCED = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SKIP = SHOT || REDUCED;

  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function br(s) { return esc(s).replace(/\n/g, "<br>"); }

  /* ── 작은 그림들 ──────────────────────────────────────── */
  var CROSS = '<svg class="cross" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 2 L56 14 L53 44 L86 47 L98 50 L86 53 L53 56 L56 86 L50 98 L44 86 L47 56 L14 53 L2 50 L14 47 L47 44 L44 14 Z"/></svg>';
  var STAR = '<svg class="star" viewBox="-50 -50 100 100" aria-hidden="true"><path d="M0 -50 C3 -10 10 -3 50 0 C10 3 3 10 0 50 C-3 10 -10 3 -50 0 C-10 -3 -3 -10 0 -50Z"/></svg>';
  var PLUS = '<svg class="ic" viewBox="0 0 20 20"><path d="M10 2V18M2 10H18"/></svg>';
  var DOT = '<i class="dot"></i>';
  var RING = '<svg class="ic" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>';
  var MINUS = '<svg class="ic" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/><path d="M5 10H15"/></svg>';
  var CROWN = '<svg class="ic ic--w" viewBox="0 0 30 16"><path d="M2 14 L8 4 L12 10 L15 2 L18 10 L22 4 L28 14 M2 14H28"/></svg>';
  var HOOK = '<svg class="ic ic--w" viewBox="0 0 30 16"><path d="M3 3 V8 Q3 13 9 13 H26 M21 8 L26 13 L21 18"/></svg>';
  var ARL = '<svg class="ic ic--w" viewBox="0 0 30 16"><path d="M28 8H3 M9 2 L3 8 L9 14"/></svg>';
  function burst(size) {
    var d = "";
    for (var i = 0; i < 8; i++) { var a = i / 8 * Math.PI, l = i % 2 ? 26 : 48; d += "M" + (50 - Math.cos(a) * l).toFixed(1) + " " + (50 - Math.sin(a) * l).toFixed(1) + " L" + (50 + Math.cos(a) * l).toFixed(1) + " " + (50 + Math.sin(a) * l).toFixed(1) + " "; }
    return '<svg class="burst" style="width:' + size + 'px;height:' + size + 'px" viewBox="0 0 100 100"><path d="' + d + '"/></svg>';
  }
  function bar(cls, items) { return '<div class="bar ' + cls + '">' + items.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join("") + '</div>'; }

  /* ── 메인 첫 화면 ─────────────────────────────────────── */
  function orbit() {
    var e = "";
    for (var i = 0; i < 7; i++) e += '<ellipse cx="100" cy="30" rx="' + (96 - i * 4) + '" ry="' + (6 + i * 3.2) + '"/>';
    return '<svg class="orbit" viewBox="0 0 200 60"><path d="M0 30H200 M100 0V60"/>' + e + '</svg>';
  }
  var ARR = '<svg class="ic ic--w" viewBox="0 0 30 16"><path d="M2 8H27 M21 2 L27 8 L21 14"/></svg>';
  function renderStage() {
    var r = H.row;
    $("#stage").innerHTML =
      bar("bar--top in", M.top) +
      '<div class="orb"><canvas id="orb" aria-label="3D 달 — 끌어서 돌리기"></canvas></div>' +
      '<h1 class="logo" aria-label="' + esc(S.meta.title) + '">' +
        '<img class="logo__base" src="' + esc(I.logo) + '" alt="">' +
        '<canvas class="logo__sig" aria-hidden="true"></canvas>' +
      '</h1>' +
      '<div class="hud" aria-hidden="true">' +
        '<div class="hud__line in" style="--d:0s"><b>' + esc(H.left) + '</b><span class="pill"><i>' + esc(H.pill[0]) + '</i><i>' + esc(H.pill[1]) + '</i><i>' + esc(H.pill[2]) + '</i></span><b>' + esc(H.right) + '</b></div>' +
        '<div class="hud__row in" style="--d:.15s">' + PLUS + DOT + '<p>' + br(r[0]) + '</p>' + DOT +
          '<p class="hud__know"><b>' + esc(r[1]) + '</b><em>' + esc(H.rowScript) + '</em></p>' + DOT + '<p>' + br(r[2]) + '</p>' + DOT + PLUS + '</div>' +
        '<div class="hud__crowns in" style="--d:.3s">' + CROWN + PLUS + CROWN + '<span></span>' + CROWN + PLUS + CROWN + '</div>' +
        '<div class="hud__left in" style="--d:.45s">' + RING + PLUS + '<p><span>' + esc(H.side[0]) + '</span><b>' + esc(H.side[1]) + '</b></p><div class="hud__mins">' + MINUS + MINUS + '</div><div class="hud__arr">' + HOOK + HOOK + '</div></div>' +
        '<div class="hud__right in" style="--d:.6s">' + PLUS + RING + '<p class="hud__tag">' + STAR + '<b>' + esc(H.tag) + '</b></p><div class="hud__arr">' + ARL + HOOK + '</div>' +
          '<p class="hud__issue"><span>' + esc(H.issue[0]) + '</span><span>' + esc(H.issue[1]) + '</span></p><span class="pill pill--sm"><i>' + esc(M.left[1]) + '</i><i>&amp;</i><i>' + esc(M.right[1]) + '</i></span>' +
          // D+ (작게)
          '<div class="dday"><span class="dday__label">' + esc(I.sinceLabel) + '</span><span class="dday__num">D+<b id="dday-d">0</b></span><span class="dday__time" id="dday-t">00:00:00.000</span></div>' +
        '</div>' +
        '<div class="hud__mid in" style="--d:.75s"><p class="hud__know2"><span>The</span>' + esc(H.knowledge) + '</p>' + orbit() + '<span class="hud__code">' + esc(H.code) + '</span></div>' +
        '<div class="hud__bursts in" style="--d:.9s">' + burst(110) + burst(70) + burst(54) + '</div>' +
        '<div class="hud__arrows in" style="--d:1s">' + ARR + ARL + '</div>' +
      '</div>' +
      '<button class="scroll in" id="toCor" type="button" style="--d:1.2s"><i></i>' + esc(I.scrollHint) + '</button>' +
      '<nav class="sti-list" aria-label="첫 화면 항목">' + (I.items || []).map(function (it, k) {
        return '<button class="sti sti--' + (k % 2 ? 'r' : 'l') + (it.act === "main" ? ' sti--main' : '') + ' in" type="button" data-act="' + esc(it.act) + '" style="--d:' + (1.3 + k * .15) + 's;--dur:' + (8 + k * 1.5) + 's;--dl:' + (-k * 3) + 's">' +
          '<span class="sti__txt"><span class="sti__no"><i></i>CH.' + pad2(k) + '</span><span class="sti__t">' + esc(it.title) + '</span><span class="sti__k">' + esc(it.ko) + '</span></span>' +
          '<svg class="sti__ar" viewBox="0 0 90 40" aria-hidden="true"><path d="M0 6 H46 L84 34"/><path class="sti__head" d="M74 34 H84 V24"/><circle cx="84" cy="34" r="2.4"/></svg></button>';
      }).join("") + '</nav>' +
      '<div class="comm" id="comm" role="dialog" aria-label="Main" hidden></div>';
  }

  /* ── D+ 실시간 ────────────────────────────────────────── */
  function dday() {
    var p = String(I.since).split("-").map(Number), start = new Date(p[0], p[1] - 1, p[2]).getTime();
    var dEl = $("#dday-d"), tEl = $("#dday-t"), last = -1;
    function z(n, w) { n = String(n); while (n.length < (w || 2)) n = "0" + n; return n; }
    (function tick() {
      var ms = Math.max(0, Date.now() - start), days = Math.floor(ms / 864e5) + (I.dayOne ? 1 : 0), rest = ms % 864e5;
      if (days !== last) { dEl.textContent = days; last = days; }
      tEl.textContent = z(Math.floor(rest / 36e5)) + ":" + z(Math.floor(rest / 6e4) % 60) + ":" + z(Math.floor(rest / 1e3) % 60) + "." + z(rest % 1000, 3);
      requestAnimationFrame(tick);
    })();
  }

  /* ── 3D 망점 달 ───────────────────────────────────────── */
  function orb() {
    var cv = $("#orb"), ctx = cv.getContext("2d"), P = window.MOON_SPHERE || [], W = 0, dpr = 1;
    var yaw = -0.35, pitch = -0.12, vy = 0, vp = 0, auto = 0.1, drag = false, lx = 0, ly = 0, born = SKIP ? -1e9 : Infinity;
    // 점마다 켜지는 시각: 정면 가운데부터 바깥으로, 군데군데 먼저 반짝
    var bornAt = P.map(function (p) {
      var c = Math.cos(-0.35), sn = Math.sin(-0.35), z = -p[0] * sn + p[2] * c;
      return Math.random() < .07 ? Math.random() * .5 : 0.1 + (1 - z) * .9 + Math.pow(Math.random(), 1.6) * .75;
    });
    // 표면 위 연결망 (노드 + 가까운 노드끼리 선)
    var nodes = [], edges = [], N = 64, ga = Math.PI * (3 - Math.sqrt(5)), seed = 11;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    for (var i = 0; i < N; i++) {
      var y = 1 - 2 * (i + .5) / N, rr = Math.sqrt(1 - y * y), th = ga * i + (rnd() - .5) * .5, ry = y + (rnd() - .5) * .06;
      nodes.push([Math.cos(th) * rr * 1.06, ry * 1.06, Math.sin(th) * rr * 1.06]);
    }
    var seen = {};
    nodes.forEach(function (a, i) {
      var ds = nodes.map(function (b, j) { return [j, (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]) + (a[2] - b[2]) * (a[2] - b[2])]; }).sort(function (p, q) { return p[1] - q[1]; });
      for (var k = 1; k <= 4; k++) { var j = ds[k][0], key = Math.min(i, j) + "-" + Math.max(i, j); if (!seen[key]) { seen[key] = 1; edges.push([i, j]); } }
    });
    var MARK = 23;
    // 바깥 고리의 점들
    var ringDots = [];
    for (var rI = 0; rI < 4; rI++) for (var a = 0; a < 140; a++) { if ((a * 7 + rI * 13) % 11 < 3) continue; ringDots.push([1.32 + rI * .09, a / 140 * Math.PI * 2, rI]); }

    function size() {
      var r = cv.getBoundingClientRect(); dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.round(r.width * dpr); cv.width = cv.height = W;
    }
    size(); addEventListener("resize", size);

    function rot(x, y, z, cyw, syw, cp, sp) {
      var x1 = x * cyw + z * syw, z1 = -x * syw + z * cyw;
      var y2 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
      return [x1, y2, z2];
    }
    function frame(now) {
      if (orb.paused) { frame.t = now; requestAnimationFrame(frame); return; }
      var dt = Math.min(.05, (now - (frame.t || now)) / 1000); frame.t = now;
      if (!drag) { yaw += (auto + vy) * dt; pitch += vp * dt; vy *= Math.pow(.05, dt); vp *= Math.pow(.05, dt); pitch += (-0.18 - pitch) * dt * .8; }
      var R = W * .3, cx = W / 2, cy = W / 2, d = 3.4;
      var cyw = Math.cos(yaw), syw = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      var el = (now - born) / 1000, g = Math.max(0, Math.min(1, el / 2.8)), ge = 1 - Math.pow(1 - g, 3);   // 생겨나는 정도
      ctx.clearRect(0, 0, W, W);

      // 바깥 고리
      ctx.strokeStyle = "rgba(211,24,44," + (.4 * ge).toFixed(3) + ")"; ctx.lineWidth = dpr;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.2 * (0.6 + .4 * ge), 0, 6.2832); ctx.stroke();
      ctx.strokeStyle = "rgba(211,24,44," + (.5 * ge).toFixed(3) + ")";
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.24, now / 4000, now / 4000 + 1.1); ctx.stroke();
      ctx.fillStyle = "rgba(211,24,44," + (.55 * ge).toFixed(3) + ")";
      ringDots.forEach(function (q) {
        var ang = q[1] + now / (9000 + q[2] * 3000) * (q[2] % 2 ? -1 : 1), rr = R * q[0] * (0.7 + .3 * ge);
        ctx.fillRect(cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr, dpr * 1.2, dpr * 1.2);
      });

      // 망점: 뒤쪽 → 앞쪽
      var back = new Path2D(), front = new Path2D(), hot = new Path2D();
      var flashP = new Path2D();
      for (var i = 0; i < P.length; i++) {
        var p = P[i], age = el - bornAt[i]; if (age < 0) continue;
        var k = 1;
        if (age < .5) { if (((Math.sin(i * 12.9898 + age * 60) * 43758.5453) % 1 + 1) % 1 < .45 && age < .42) continue;   // 깜박깜박
          k = age < .16 ? age / .16 * 1.8 : 1 + .8 * Math.exp(-(age - .16) * 7) * Math.cos((age - .16) * 18); }
        var q = rot(p[0], p[1], p[2], cyw, syw, cp, sp), s = d / (d - q[2]);
        var x = cx + q[0] * R * s, yy = cy - q[1] * R * s, rad = (0.45 + p[3] * 1.35) * s * k * (W / 1000 + .3);
        var path = q[2] < 0 ? back : (age < .3 ? flashP : p[3] > .8 ? hot : front);
        path.moveTo(x + rad, yy); path.arc(x, yy, rad, 0, 6.2832);
      }
      ctx.fillStyle = "rgba(150,14,30,.35)"; ctx.fill(back);

      // 연결망
      var pr = nodes.map(function (n) { var q = rot(n[0], n[1], n[2], cyw, syw, cp, sp), s = d / (d - q[2]); return [cx + q[0] * R * s, cy - q[1] * R * s, q[2]]; });
      var lineA = Math.max(0, Math.min(1, (el - 2.1) / 1.2));
      ctx.lineWidth = dpr * .9;
      edges.forEach(function (e) {
        var a = pr[e[0]], b = pr[e[1]], z = (a[2] + b[2]) / 2, al = (z < 0 ? .16 : .6 + z * .35) * lineA;
        ctx.strokeStyle = "rgba(232,40,58," + al.toFixed(3) + ")";
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      });
      ctx.fillStyle = "#d3182c"; ctx.fill(front);
      ctx.fillStyle = "#ff3d4f"; ctx.fill(hot);
      ctx.fillStyle = "#ffd6da"; ctx.fill(flashP);
      pr.forEach(function (n, i) {
        if (i === MARK) return;
        ctx.fillStyle = "rgba(255,120,132," + ((n[2] < 0 ? .25 : .95) * lineA).toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(n[0], n[1], (n[2] < 0 ? 1.4 : 2.6) * dpr, 0, 6.2832); ctx.fill();
      });
      // 붉은 표식 (맥박)
      var m = pr[MARK], pulse = (now % 1800) / 1800;
      if (m[2] > -0.2) {
        ctx.strokeStyle = "rgba(255,61,79," + ((1 - pulse) * lineA).toFixed(3) + ")"; ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath(); ctx.arc(m[0], m[1], (5 + pulse * 18) * dpr, 0, 6.2832); ctx.stroke();
        ctx.fillStyle = "rgba(255,61,79," + lineA.toFixed(3) + ")"; ctx.beginPath(); ctx.arc(m[0], m[1], 5 * dpr, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255," + lineA.toFixed(3) + ")"; ctx.beginPath(); ctx.arc(m[0], m[1], 1.8 * dpr, 0, 6.2832); ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    // 끌어서 돌리기 (관성)
    cv.addEventListener("pointerdown", function (e) { drag = true; lx = e.clientX; ly = e.clientY; vy = vp = 0; cv.setPointerCapture(e.pointerId); cv.classList.add("is-drag"); });
    cv.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY;
      yaw += dx * .008; pitch = Math.max(-1.2, Math.min(1.2, pitch + dy * .008));
      vy = dx * .45; vp = dy * .45;
    });
    function up() { drag = false; cv.classList.remove("is-drag"); }
    cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
    orb.reborn = function () { born = performance.now(); };
  }

  /* ── 글자가 도도독 타이핑되듯 생김 ───────────────────── */
  var GLY = "█▓▒░<>/\\|_-+*#01ABCDEFXZ";
  function prepType(sel, scope) {
    var jobs = [];
    (scope || document).querySelectorAll(sel).forEach(function (el) {
      var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), t;
      while ((t = w.nextNode())) { if (t.__done || !t.nodeValue.trim()) continue; t.__done = 1; jobs.push({ node: t, text: t.nodeValue, el: el }); t.nodeValue = ""; }
    });
    return jobs;
  }
  function runType(jobs, o) {
    o = o || {}; var gap = o.gap || 55, sp = o.speed || 24, sr = o.rand == null ? 20 : o.rand, t0 = performance.now();
    jobs.forEach(function (j, idx) {
      var start = idx * gap + Math.random() * gap * 2.4, speed = sp + Math.random() * sr, step0 = o.chunk || 1;
      (function step(now) {
        var e = now - t0 - start;
        if (e < 0) { requestAnimationFrame(step); return; }
        var n = Math.floor(e / speed) * step0, out = j.text.slice(0, n);
        if (n < j.text.length) {
          for (var k = 0; k < Math.min(3, j.text.length - n); k++) out += /\s/.test(j.text[n + k]) ? j.text[n + k] : GLY[Math.random() * GLY.length | 0];
          j.node.nodeValue = out; requestAnimationFrame(step);
        } else j.node.nodeValue = j.text;
      })(t0);
    });
  }
  var stageJobs = [];

  /* ── 로고: 우주 신호 노이즈처럼 가늘게 흔들림 ─────────── */
  var sig = { run: false };
  function sigInit() {
    sig.logo = $(".logo"); sig.img = $(".logo__base"); sig.cv = $(".logo__sig"); sig.ctx = sig.cv.getContext("2d");
  }
  function sigSize() {
    var r = sig.img.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
    var W = Math.max(2, Math.round(r.width * dpr)), H = Math.max(2, Math.round(r.height * dpr));
    if (sig.cv.width === W && sig.red) return;
    sig.cv.width = W; sig.cv.height = H; sig.dpr = dpr;
    function layer(tint) {
      var o = document.createElement("canvas"); o.width = W; o.height = H;
      var c = o.getContext("2d"); c.drawImage(sig.img, 0, 0, W, H);
      if (tint) { c.globalCompositeOperation = "source-in"; c.fillStyle = tint; c.fillRect(0, 0, W, H); }
      return o;
    }
    sig.white = layer(null); sig.red = layer("#ff2a40"); sig.cyan = layer("#9fd8ff");
  }
  // dur: 길이(ms) · amp: 흔들림 세기 · intro: 처음 나타날 때
  function signal(dur, amp, intro) {
    if (!sig.img || !sig.img.complete || !sig.img.naturalWidth) { if (sig.img) sig.img.onload = function () { signal(dur, amp, intro); }; return; }
    sigSize();
    sig.t0 = performance.now(); sig.dur = dur; sig.amp = amp; sig.intro = intro;
    sig.logo.classList.add("is-sig");
    if (!sig.run) { sig.run = true; requestAnimationFrame(sigFrame); }
  }
  function sigFrame(now) {
    var c = sig.ctx, W = sig.cv.width, H = sig.cv.height, t = (now - sig.t0) / sig.dur, dpr = sig.dpr;
    if (t >= 1) { c.clearRect(0, 0, W, H); sig.run = false; sig.logo.classList.remove("is-sig"); return; }
    var env = sig.intro ? Math.pow(1 - t, 1.4) : Math.pow(Math.sin(Math.PI * t), .7);
    var A = sig.amp * env, ph = now / 1000;
    var base = sig.intro ? Math.min(1, .1 + t * 1.5) : 1;
    var fl = Math.random() < .1 * env ? .18 : 1 - Math.random() * .3 * env;     // 신호가 끊겼다 이어짐
    c.clearRect(0, 0, W, H);
    var jumpY = Math.random() * H, jumpH = H * (.02 + Math.random() * .07) * env, jumpX = (Math.random() - .5) * W * .05 * env;
    var y = 0;
    while (y < H) {
      var bh = Math.max(1, Math.round(H * (.004 + Math.random() * .014)));
      var wave = Math.sin(y / H * 16 + ph * 13) * A * W * .009 + Math.sin(y / H * 57 - ph * 29) * A * W * .003;
      var dx = wave + (y > jumpY && y < jumpY + jumpH ? jumpX : 0);
      var hh = Math.min(bh, H - y);
      if (A > .05) {
        c.globalAlpha = base * fl * Math.min(.75, A * .7);
        c.drawImage(sig.red, 0, y, W, hh, dx - (3 + A * 7) * dpr, y, W, hh);
        c.globalAlpha = base * fl * Math.min(.35, A * .3);
        c.drawImage(sig.cyan, 0, y, W, hh, dx + (2 + A * 4) * dpr, y, W, hh);
      }
      if (Math.random() > .035 * env) { c.globalAlpha = base * fl; c.drawImage(sig.white, 0, y, W, hh, dx, y, W, hh); }
      y += bh;
    }
    // 주사선
    c.globalCompositeOperation = "destination-out"; c.globalAlpha = .12 + .3 * env; c.fillStyle = "#000";
    for (var yy = 0; yy < H; yy += 3 * dpr) c.fillRect(0, yy, W, dpr);
    // 지나가는 동기 신호 줄
    c.globalCompositeOperation = "source-atop"; c.globalAlpha = .7 * env + .1;
    var sy = ((ph * .9) % 1) * H; c.fillStyle = "#fff"; c.fillRect(0, sy, W, 1.5 * dpr);
    c.fillStyle = "rgba(255,42,64,.6)"; c.fillRect(0, (sy + H * .37) % H, W, 4 * dpr);
    c.globalCompositeOperation = "source-over"; c.globalAlpha = 1;
    requestAnimationFrame(sigFrame);
  }
  function glitchLogo() { signal(650 + Math.random() * 350, .55 + Math.random() * .35, false); }
  function idleGlitch() { setTimeout(function () { if (!document.hidden && !corOpen) glitchLogo(); idleGlitch(); }, 3400 + Math.random() * 5200); }

  /* ── 급하게 여러 번 누를 때만 지지직 ──────────────────── */
  var nz = null, nctx = null, nzEnd = 0, nzOn = false, taps = [];
  function noise(ms) {
    ms = ms || 340;
    nz = nz || $("#noise"); nctx = nctx || nz.getContext("2d");
    var w = Math.ceil(innerWidth / 3), h = Math.ceil(innerHeight / 3);
    if (nz.width !== w) { nz.width = w; nz.height = h; }
    nzEnd = performance.now() + ms;
    root.classList.remove("is-glitch"); void root.offsetWidth; root.classList.add("is-glitch");
    if (!corOpen) glitchLogo();
    if (nzOn) return; nzOn = true;
    (function frame(now) {
      var w = nz.width, h = nz.height, img = nctx.createImageData(w, h), d = img.data, k = Math.max(0, (nzEnd - now) / ms);
      var band1 = Math.random() * h, band2 = Math.random() * h, bh = 2 + Math.random() * 14;
      for (var y = 0; y < h; y++) {
        var red = Math.abs(y - band1) < bh, white = Math.abs(y - band2) < bh * .4;
        for (var x = 0; x < w; x++) {
          var o = (y * w + x) * 4, v = Math.random() * 255;
          if (red) { d[o] = 220; d[o + 1] = 20 + v * .1; d[o + 2] = 40; d[o + 3] = 200 * k; }
          else if (white) { d[o] = d[o + 1] = d[o + 2] = 240; d[o + 3] = 170 * k; }
          else { d[o] = d[o + 1] = d[o + 2] = v; d[o + 3] = (v > 200 ? 110 : v > 120 ? 40 : 0) * k; }
        }
      }
      nctx.putImageData(img, 0, 0);
      if (now < nzEnd) requestAnimationFrame(frame);
      else { nctx.clearRect(0, 0, w, h); nzOn = false; root.classList.remove("is-glitch"); }
    })(performance.now());
  }
  // 누를 수 있는 것이 없는 곳을 누르면 지지직
  var tap0 = null;
  function tapDown(e) { tap0 = [e.clientX, e.clientY]; }
  function tapUp(e) {
    if (!tap0 || REDUCED || !root.classList.contains("o-done")) return;
    var moved = Math.hypot(e.clientX - tap0[0], e.clientY - tap0[1]); tap0 = null;
    if (moved > 6) return;
    if (e.target.closest && e.target.closest("button, a, input, label, summary, .pb, .win, .comm, .chat, #heart, .cens")) return;
    miss();
  }
  // 빈 곳을 잘못 누를 때마다 지지직, 5번(6초 안)이면 ERROR 가 화면을 채웠다 사라짐
  var misses = [];
  function miss() {
    var now = performance.now(); misses = misses.filter(function (m) { return now - m < 6000; }); misses.push(now);
    noise();
    if (misses.length >= 5) { misses = []; errorStorm(); }
  }
  function errorStorm() {
    var box = document.createElement("div"); box.className = "errs"; box.setAttribute("aria-hidden", "true"); document.body.appendChild(box);
    var W = ["ERROR", "ERR_0x1021", "SIGNAL LOST", "ACCESS DENIED", "ERROR", "FATAL // CORE", "ERROR", "NO CARRIER"], n = 0, total = 140;
    (function add() {
      for (var k = 0; k < 24 && n < total; k++, n++) {
        var e = document.createElement("span"), big = Math.random() < .12;
        e.textContent = W[Math.random() * W.length | 0] + (Math.random() < .5 ? " " + (Math.random() * 9999 | 0).toString(16).toUpperCase() : "");
        e.style.cssText = "left:" + (Math.random() * 96 - 4).toFixed(1) + "%;top:" + (Math.random() * 98).toFixed(1) + "%;font-size:" + (big ? 28 + Math.random() * 40 : 10 + Math.random() * 12).toFixed(0) + "px";
        if (Math.random() < .3) e.className = "is-inv";
        box.appendChild(e);
      }
      if (n < total) requestAnimationFrame(add);
      else setTimeout(function () { box.classList.add("is-out"); setTimeout(function () { box.remove(); }, 260); }, 520);
    })();
    noise(900);
  }

  /* ==========================================================================
     붉은 화면 — 검은 망점 심장 + 부위별 배너
     ========================================================================== */
  var HP = S.heart || {}, PR = S.items || [], PARTS = {};
  var NUM = {};
  var corOpen = false, corBusy = 0, corTyped = false, corJobs = [];
  var ARROW = '<svg class="pb__ar" viewBox="0 0 30 16" aria-hidden="true"><path d="M2 8H27 M21 2 L27 8 L21 14"/></svg>';
  // Belligoes 의 대문자 B 는 모양이 튀어서 다른 글꼴로
  function capB(t) { return esc(t).replace(/B/g, '<span class="alt-b">B</span>'); }
  var MINI_ECG = '<svg class="pb__ecg" viewBox="0 0 40 12" aria-hidden="true"><path d="M0 7H12L14 5L16 7H18L20 1L22 11L24 7H28L30 5.5L32 7H40"/></svg>';
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function renderCor() {
    var top = HP.top || [], T = HP.title || [], h = HP.hud || {}, r = h.row || ["", "", ""], pill = h.pill || ["", "", ""];
    // featured(Main)는 위 가운데, 나머지는 앞 절반 왼쪽 · 나머지 오른쪽 (가로 %, 세로 %)
    var LP = [[18, 31], [12, 49], [18, 68], [14, 22]], RP = [[17, 35], [12, 62], [18, 74], [14, 22]];
    var MLP = [[8, 23], [10, 66], [7, 76], [6, 84]], MRP = [[8, 29], [9, 71], [7, 82], [6, 18]];
    var reg = [], side = {}, spot = {};
    NUM = {};
    PR.forEach(function (p, i) { if (p.featured) NUM[i] = "00"; else { reg.push(i); NUM[i] = pad2(reg.length); } });
    var nL = Math.ceil(reg.length / 2);
    var mspot = {};
    reg.forEach(function (i, k) { var l = k < nL, kk = l ? k : k - nL; side[i] = l ? "l" : "r"; spot[i] = (l ? LP : RP)[kk % 4]; mspot[i] = (l ? MLP : MRP)[kk % 4]; });
    var list = PR.map(function (p, i) {
      if (p.featured) return '<button class="pb pb--main" type="button" data-i="' + i + '"><span class="pb__kick"><i></i>CH.' + esc(NUM[i]) + ' · Priority</span><span class="pb__t">' + esc(p.title) + '</span><span class="pb__k">' + esc(p.ko) + '</span></button>';
      var sp = spot[i], ms = mspot[i], drift = 'style="--x:' + sp[0] + '%;--y:' + sp[1] + '%;--mx:' + ms[0] + '%;--my:' + ms[1] + '%;--dur:' + (7 + (i * 1.7) % 4).toFixed(1) + 's;--dl:' + (-i * 1.9).toFixed(1) + 's"';
      return '<button class="pb pb--' + side[i] + '" type="button" data-i="' + i + '" ' + drift + '>' +
        '<span class="pb__no">CH.' + NUM[i] + '</span><span class="pb__t">' + esc(p.title) + '</span><i class="pb__rule"></i><span class="pb__k">' + esc(p.ko) + '</span><span class="pb__num">' + (1021 + i * 37) + '.' + pad2(i * 13 % 97) + '</span></button>';
    }).join("");
    var tags = HP.tags || [], bub = HP.bubbles || [], tl = HP.timeline || [], cr = HP.credits || [], meta = HP.meta || [];
    var SD = HP.sides || {}, TK = SD.ticket || [], QD = (S.profiles || [])[0] || {}, QN = (S.profiles || [])[1] || {};
    function under(txt) { return String(txt || "").split("\n").map(function (l) { return l ? '<u>' + esc(l) + '</u>' : '<br>'; }).join("<br>"); }
    // 빈 줄로 나뉜 묶음마다 한 줄로 길게 (세로로 눕혀서 씀)
    function longcols(txt) { return String(txt || "").split(/\n\s*\n/).map(function (g) { return '<u>' + g.split("\n").map(esc).join(" / ") + '</u>'; }).join("<br>"); }
    function barcode(seed, n) {   // 글자로부터 만든 바코드
      var x = 0, r = "", h = 0; for (var k = 0; k < seed.length; k++) h = (h * 31 + seed.charCodeAt(k)) >>> 0;
      for (var k2 = 0; k2 < n; k2++) { h = (h * 1103515245 + 12345) >>> 0; var w = 1 + (h >> 7) % 4, g = 1 + (h >> 11) % 3; r += '<rect x="' + x + '" width="' + w + '" height="60"/>'; x += w + g; }
      return '<svg class="bc" viewBox="0 0 ' + x + ' 60" preserveAspectRatio="none" aria-hidden="true">' + r + '</svg>';
    }
    var tri = '<svg class="dtri" viewBox="0 0 40 36"><path d="M20 3 L37 33 H3 Z"/><text x="20" y="27" text-anchor="middle">S</text></svg>';
    var warn = '<p class="dwarn"><span>' + esc(SD.warning || "") + '</span>' + tri + '<small>SENTINEL · CLASS S</small><span>' + esc(SD.warning || "") + '</span>' + tri + '<small>SENTINEL · CLASS S</small></p>';
    var deco = '<div class="deco" aria-hidden="true">' +
      (QD.print ? '<img class="dfp dfp--l" src="' + esc(QD.print) + '" alt="">' : '') + (QN.print ? '<img class="dfp dfp--r" src="' + esc(QN.print) + '" alt="">' : '') +
      (QD.sign ? '<figure class="dsig dsig--l"><img src="' + esc(QD.sign) + '" alt=""><figcaption>' + esc(QD.codename) + ' · Guide signature</figcaption></figure>' : '') +
      (QN.sign ? '<figure class="dsig dsig--r"><img src="' + esc(QN.sign) + '" alt=""><figcaption>' + esc(QN.codename) + ' · Sentinel signature</figcaption></figure>' : '') +
      '<div class="deco__l">' +
        '<div class="dvl"><i></i><i></i><i></i><i></i><b></b></div>' +
        '<div class="dcol"><p class="dblk">' + longcols(SD.dive) + '</p><p class="dblk dblk--dash">—</p><p class="dblk dblk--2">' + longcols(SD.pair) + '</p></div>' +
        '<p class="dwarn dwarn--l"><span>' + esc(SD.warning || "") + '</span>' + tri + '<small>GUIDE · CLASS A</small></p>' +
      '</div>' +
      '<div class="deco__r">' +
        warn +
        '<div class="dvl dvl--r"><i></i><i></i><i></i><b></b></div>' +
        '<div class="dtk"><p>' + esc(TK[0] || "") + '</p><p>' + esc(TK[1] || "") + '</p><p class="dtk__gap">' + esc(TK[2] || "") + '</p><p class="dtk__gap">' + esc(TK[3] || "") + '</p>' +
          '<div class="dtk__row">' + barcode(TK.join(""), 46) + '<div><p>' + esc(TK[4] || "") + '</p><p>' + esc(TK[5] || "") + '</p></div></div></div>' +
      '</div>' +
    '</div>';
    $("#cor").innerHTML = deco +
      '<canvas class="cor__cv" id="heart" aria-label="두근거리는 심장 — 번호를 누르면 항목이 열려요"></canvas>' +
      '<div class="cmeta"><span class="cmeta__brand"><i></i>' + esc(meta[0]) + '<sup>®</sup><small>Deep space link</small></span><span class="cmeta__c">' + esc(meta[1]) + (meta[2] ? ' <b class="cmeta__st"><i></i>' + esc(meta[2]) + '</b>' : "") + '<em class="cmeta__ttl">' + esc((HP.title || []).join(" ")) + '</em>' +
        '<span class="cmeta__rule" aria-hidden="true"><i></i><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"/><circle cx="14.5" cy="10" r="6.2" class="m"/></svg><i></i></span>' +
        (HP.ticker ? '<span class="cmeta__tick" aria-hidden="true"><span>' + esc(HP.ticker) + '&nbsp;' + esc(HP.ticker) + '&nbsp;</span></span>' : '') + '</span>' +
        '<button class="cor__back" type="button" id="toStage"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2V14 M3 9 L8 14 L13 9"/></svg>' + esc(HP.back || "Back") + '</button></div>' +
      '<div class="hud hud--cor" aria-hidden="true">' +
        '<p class="ctags"><span class="ctag"><i></i>' + esc(tags[0]) + '</span><em>×</em><span class="ctag"><i></i>' + esc(tags[1]) + '</span></p>' +
        '<div class="cline"><p>' + br(HP.tagline) + '</p><span class="cbars"><i></i><i></i><i></i><i></i><i></i></span></div>' +
        '<div class="hud__mid"><p class="hud__know2"><span>' + esc(h.bottomSmall) + '</span>' + esc(h.bottom) + '</p><span class="hud__ecg" id="ecg"></span><span class="hud__code"><i class="beat"></i>' + esc(HP.bpm || 72) + ' BPM</span></div>' +
      '</div>' +
      '<h2 class="ctitle"><span class="ctitle__a">' + esc(T[0]) + '</span><span class="ctitle__b">' + esc(T[1]) + '</span><span class="ctitle__c">' + esc(T[2]) + '</span></h2>' +
      '<nav class="cor__list" aria-label="항목">' + list + '</nav>' +
      '<div class="cfoot">' +
        '<section class="cblk cblk--tl"><p class="ctag ctag--sm"><i></i>' + esc(HP.timelineTitle || "Timeline") + '</p><ol>' +
          tl.map(function (r, k) { return '<li><span class="cblk__no">' + pad2(k + 1) + '</span><b>' + esc(r[0]) + '</b><i></i><span>' + esc(r[1]) + '</span></li>'; }).join("") + '</ol></section>' +
        '<section class="cblk cblk--cr"><p class="ctag ctag--sm"><i></i>' + esc(HP.creditsTitle || "Credits") + '</p><dl>' +
          cr.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join("") + '</dl></section>' +
      '</div>';
  }

  // 심장 데이터는 처음 화면이 다 뜬 뒤(또는 붉은 화면을 열 때) 불러와서 첫 로딩을 가볍게
  var heartLoading = null;
  function loadHeart(cb) {
    if (window.HEART_POINTS) { cb && cb(); return; }
    if (!heartLoading) { heartLoading = []; var sc = document.createElement("script"); sc.src = "assets/heart-points.js"; sc.onload = function () { heartLoading.forEach(function (f) { f(); }); heartLoading = []; }; document.body.appendChild(sc); }
    if (cb) heartLoading.push(cb);
  }
  var heart = { on: false };
  function heartInit() {
    var cv = $("#heart"), ctx = cv.getContext("2d"), P = [], W = 0, H = 0, dpr = 1;
    var yawOff = 0, pitchOff = 0, vy = 0, vp = 0, drag = false, lx = 0, ly = 0, moved = 0, hover = -1, hot = [];
    var L = [-0.45, 0.55, 0.7], ll = Math.hypot(L[0], L[1], L[2]); L = L.map(function (v) { return v / ll; });
    var Hh = [L[0], L[1], L[2] + 1], hl = Math.hypot(Hh[0], Hh[1], Hh[2]); Hh = Hh.map(function (v) { return v / hl; });
    var per = 60 / (HP.bpm || 72);
    // 심장 둘레의 연결점
    var NET = [], NE = [], ga = Math.PI * (3 - Math.sqrt(5)), NN = 26;
    for (var q = 0; q < NN; q++) { var yy = 1 - 2 * (q + .5) / NN, rr = Math.sqrt(1 - yy * yy), th = ga * q; NET.push([Math.cos(th) * rr * .78, yy * 1.02, Math.sin(th) * rr * .62]); }
    var seenN = {};
    NET.forEach(function (a, i) {
      NET.map(function (b, j) { return [j, Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])]; }).sort(function (p, q) { return p[1] - q[1]; }).slice(1, 4)
        .forEach(function (o) { var key = Math.min(i, o[0]) + "-" + Math.max(i, o[0]); if (!seenN[key]) { seenN[key] = 1; NE.push([i, o[0]]); } });
    });
    var mobile = false;
    function size() {
      var r = cv.getBoundingClientRect(); dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.round(r.width * dpr); H = Math.round(r.height * dpr); cv.width = W; cv.height = H;
      mobile = innerWidth <= 860;
    }
    size(); addEventListener("resize", size);
    function geo() {
      var R = mobile ? Math.min(W * .3, H * .16) : Math.min(H * .29, W * .2);
      return { R: R, cx: W / 2, cy: mobile ? H * .47 : H * .54 };
    }
    function beatAt(ph) {
      function g(x, c) { return Math.exp(-Math.pow((x - c) / .065, 2)); }
      return g(ph, 0) + g(ph, 1) + .55 * g(ph, .24);
    }
    function frame(now) {
      if (!heart.on) { heart.raf = 0; return; }
      if (mobile && now - (frame.last || 0) < 30) { heart.raf = requestAnimationFrame(frame); return; }
      frame.last = now;
      var dt = Math.min(.05, (now - (frame.t || now)) / 1000); frame.t = now;
      if (!drag) { yawOff += vy * dt; pitchOff += vp * dt; vy *= Math.pow(.04, dt); vp *= Math.pow(.04, dt); yawOff *= Math.pow(.35, dt); pitchOff *= Math.pow(.35, dt); }
      var t = now / 1000, yaw = Math.sin(t * .32) * .32 + yawOff, pitch = -.06 + Math.sin(t * .21) * .05 + pitchOff;
      var cyw = Math.cos(yaw), syw = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      var gm = geo(), R = gm.R, cx = gm.cx, cy = gm.cy, d = 4, sz = R / 378;
      var ph = (t % per) / per, bt = beatAt(ph);
      ctx.clearRect(0, 0, W, H);
      var path = new Path2D();
      var step = mobile ? 2 : 1;
      for (var i = 0; i < P.length; i += step) {
        var p = P[i];
        var nx = p[3] * cyw + p[5] * syw, nz1 = -p[3] * syw + p[5] * cyw, ny = p[4] * cp - nz1 * sp, nz = p[4] * sp + nz1 * cp;
        if (nz < -.08) continue;
        var k = 1 + bt * (.018 + .055 * p[6]);
        var x = p[0] * k, y = (p[1] - .12) * k, z = p[2] * k;
        var x1 = x * cyw + z * syw, z1 = -x * syw + z * cyw, y2 = y * cp - z1 * sp, z2 = y * sp + z1 * cp, s = d / (d - z2);
        var sh = Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]);
        var hx = nx * Hh[0] + ny * Hh[1] + nz * Hh[2], spec = hx > 0 ? Math.pow(hx, 18) : 0;
        var dark = Math.max(0, Math.pow(1 - sh * .9, 1.2) * (.55 + .7 * p[7]) - spec * 1.5);   // 그늘·하이라이트
        var rad = (0.6 + dark * 3.0 + bt * .5 * p[6]) * sz * s * (step > 1 ? 1.35 : 1);
        var X = cx + x1 * R * s, Y = cy - y2 * R * s;
        path.moveTo(X + rad, Y); path.arc(X, Y, rad, 0, 6.2832);
      }
      ctx.fillStyle = "#0a0809"; ctx.fill(path);
      // 달과 같은 옅은 연결망
      var npr = NET.map(function (n) { var x = n[0], y = n[1], z = n[2], x1 = x * cyw + z * syw, z1 = -x * syw + z * cyw, y2 = y * cp - z1 * sp, z2 = y * sp + z1 * cp, s = d / (d - z2); return [cx + x1 * R * s, cy - y2 * R * s, z2]; });
      ctx.lineWidth = .8 * dpr;
      NE.forEach(function (e) { var a = npr[e[0]], b = npr[e[1]], z = (a[2] + b[2]) / 2; ctx.strokeStyle = "rgba(5,2,3," + (z < 0 ? .12 : .35).toFixed(2) + ")"; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); });
      npr.forEach(function (n) { ctx.fillStyle = n[2] < 0 ? "rgba(5,2,3,.35)" : "rgba(255,51,71,.9)"; ctx.beginPath(); ctx.arc(n[0], n[1], (n[2] < 0 ? 1 : 1.8) * dpr, 0, 6.2832); ctx.fill(); });

      // 부위 표식 + 배너로 이어지는 화살표
      var lines = true;
      hot = [];
      PR.forEach(function (pr, i) {
        var a = PARTS[pr.part]; if (!a) return;
        var k = 1 + bt * .04, x = a[0] * k, y = (a[1] - .1) * k, z = a[2] * k;
        var x1 = x * cyw + z * syw, z1 = -x * syw + z * cyw, y2 = y * cp - z1 * sp, z2 = y * sp + z1 * cp, s = d / (d - z2);
        var X = cx + x1 * R * s, Y = cy - y2 * R * s, on = hover === i, al = z2 < -.15 ? .35 : 1;
        hot.push([X, Y, i]);
        ctx.strokeStyle = ctx.fillStyle = "rgba(10,8,9," + al + ")";
        if (lines && banners[i] && pr.featured) {
          var bm = banners[i].getBoundingClientRect(), crm = cv.getBoundingClientRect();
          var exm = (bm.left + bm.width / 2 - crm.left) * dpr, eym = (bm.bottom + 8 - crm.top) * dpr, mym = eym + (Y - eym) * .55;
          ctx.strokeStyle = "rgba(239,233,223," + (on ? 1 : .7) * al + ")"; ctx.lineWidth = (on ? 1.5 : 1.1) * dpr;
          ctx.setLineDash(on ? [] : [2 * dpr, 4 * dpr]);
          ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X, mym); ctx.lineTo(exm, mym); ctx.lineTo(exm, eym); ctx.stroke(); ctx.setLineDash([]);
          var ahm = 5 * dpr; ctx.fillStyle = "rgba(239,233,223," + al + ")";
          ctx.beginPath(); ctx.moveTo(exm, eym); ctx.lineTo(exm - ahm * .6, eym + ahm); ctx.lineTo(exm + ahm * .6, eym + ahm); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = ctx.fillStyle = "rgba(10,8,9," + al + ")";
        } else if (lines && banners[i]) {
          var b = banners[i].getBoundingClientRect(), cr = cv.getBoundingClientRect(), left = banners[i].classList.contains("pb--l");
          var ex = ((left ? b.right + 6 : b.left - 6) - cr.left) * dpr, ey = (b.bottom - 6 - cr.top) * dpr;
          var dx = Math.abs(ex - X), dy = ey - Y, run = Math.min(dx * .55, Math.abs(dy));
          var kx = ex + (left ? run : -run) * (X > ex ? 1 : -1) * (left ? 1 : -1), ky = ey;
          var jx = X + (left ? -1 : 1) * Math.max(0, dx - Math.abs(kx - ex)) * 0, jy = Y;
          var mx2 = left ? Math.min(X, ex + dx * .55) : Math.max(X, ex - dx * .55);
          ctx.strokeStyle = "rgba(255,255,255," + (on ? 1 : .8) * al + ")"; ctx.lineWidth = (on ? 1.4 : 1) * dpr;
          ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(mx2, ey); ctx.lineTo(ex, ey); ctx.stroke();
          ctx.fillStyle = "rgba(255,255,255," + al + ")";
          ctx.fillRect(ex - 2.5 * dpr, ey - 2.5 * dpr, 5 * dpr, 5 * dpr);
        }
        // 표식: 네모 노드 + 번호
        var pul = ((t + i * .17) % per) / per, q2 = (on ? 7 : 5) * dpr;
        ctx.strokeStyle = "rgba(255,255,255," + al + ")"; ctx.lineWidth = 1.2 * dpr;
        ctx.strokeRect(X - q2, Y - q2, q2 * 2, q2 * 2);
        ctx.strokeStyle = "rgba(255,255,255," + (.7 * (1 - pul) * al).toFixed(3) + ")";
        var q3 = q2 + pul * 12 * dpr; ctx.strokeRect(X - q3, Y - q3, q3 * 2, q3 * 2);
        ctx.fillStyle = "rgba(255,255,255," + al + ")"; ctx.fillRect(X - 1.5 * dpr, Y - 1.5 * dpr, 3 * dpr, 3 * dpr);
        ctx.font = "600 " + (9 * dpr) + "px ui-monospace, Menlo, monospace"; ctx.textBaseline = "middle";
        var no = NUM[i], lw = ctx.measureText(no).width + 8 * dpr, lx2 = X + 10 * dpr, ly2 = Y - 12 * dpr;
        ctx.fillStyle = "rgba(8,3,5," + .85 * al + ")"; ctx.beginPath(); ctx.moveTo(lx2, ly2 - 6 * dpr); ctx.lineTo(lx2 + lw, ly2 - 6 * dpr); ctx.lineTo(lx2 + lw, ly2 + 2 * dpr); ctx.lineTo(lx2 + lw - 4 * dpr, ly2 + 6 * dpr); ctx.lineTo(lx2, ly2 + 6 * dpr); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.fillText(no, lx2 + 4 * dpr, ly2 + .5 * dpr);
      });

      // 심전도 (아래 가운데 칸)
      var eb = ecgEl && ecgEl.getBoundingClientRect(), crr = cv.getBoundingClientRect();
      if (eb && eb.width) {
        var x0 = (eb.left - crr.left) * dpr, x1e = (eb.right - crr.left) * dpr, ey0 = (eb.top + eb.height / 2 - crr.top) * dpr, amp = eb.height * .42 * dpr;
        ctx.strokeStyle = "#120406"; ctx.shadowBlur = 0; ctx.lineWidth = 1.3 * dpr; ctx.beginPath();
        for (var xx = x0; xx <= x1e; xx += 2 * dpr) {
          var tt = t - (x1e - xx) / ((x1e - x0) * .45), q = ((tt % per) + per) % per / per;
          var v = q < .03 ? -.15 : q < .06 ? 1 : q < .09 ? -.35 : (q > .26 && q < .34) ? .5 * Math.sin((q - .26) / .08 * Math.PI) : 0;
          var fade = Math.min(1, (xx - x0) / (30 * dpr), (x1e - xx) / (30 * dpr));
          xx === x0 ? ctx.moveTo(xx, ey0 - v * amp * fade) : ctx.lineTo(xx, ey0 - v * amp * fade);
        }
        ctx.stroke(); ctx.shadowBlur = 0;
      }
      heart.raf = requestAnimationFrame(frame);
    }
    var banners = [], ecgEl = null;
    heart.start = function () { if (!window.HEART_POINTS) { loadHeart(heart.start); return; } P = window.HEART_POINTS; PARTS = window.HEART_PARTS || {}; ecgEl = $("#ecg"); banners = Array.prototype.slice.call(document.querySelectorAll(".pb")); size(); if (!heart.on) { heart.on = true; frame.t = 0; heart.raf = requestAnimationFrame(frame); } };
    heart.stop = function () { heart.on = false; };
    heart.hover = function (i) { hover = i; };
    function pick(e) {
      var r = cv.getBoundingClientRect(), x = (e.clientX - r.left) * dpr, y = (e.clientY - r.top) * dpr, best = -1, bd = 26 * dpr;
      hot.forEach(function (h) { var dd = Math.hypot(h[0] - x, h[1] - y); if (dd < bd) { bd = dd; best = h[2]; } });
      return best;
    }
    cv.addEventListener("pointerdown", function (e) { drag = true; moved = 0; lx = e.clientX; ly = e.clientY; vy = vp = 0; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener("pointermove", function (e) {
      if (!drag) { var h = pick(e); if (h !== hover) { hover = h; cv.style.cursor = h >= 0 ? "pointer" : ""; setHover(h); } return; }
      var dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
      yawOff += dx * .008; pitchOff = Math.max(-.8, Math.min(.8, pitchOff + dy * .006)); vy = dx * .4; vp = dy * .3;
    });
    function up(e) { if (!drag) return; drag = false; if (moved < 6) { var h = pick(e); if (h >= 0) openWin(h); else miss(); } }
    cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", function () { drag = false; });
    cv.addEventListener("pointerleave", function () { if (!drag) { hover = -1; setHover(-1); } });
  }
  function setHover(i) {
    heart.hover(i);
    document.querySelectorAll(".pb").forEach(function (b) { b.classList.toggle("is-hot", +b.dataset.i === i); });
  }

  function openCor() {
    if (corOpen || !root.classList.contains("o-done") || performance.now() < corBusy || !$("#win").hidden) return;
    corOpen = true; corBusy = performance.now() + 1100;
    root.classList.add("is-cor"); $("#cor").setAttribute("aria-hidden", "false"); $("#cor").scrollTop = 0;
    heart.start();
    noise(220);
    setTimeout(function () { if (corOpen) orb.paused = true; }, 1100);
    if (!corTyped) { corTyped = true; setTimeout(function () { runType(corJobs, { gap: 45, speed: 22 }); }, 520); }
  }
  function closeCor() {
    if (!corOpen || performance.now() < corBusy) return;
    corOpen = false; corBusy = performance.now() + 1100; orb.paused = false;
    root.classList.remove("is-cor"); $("#cor").setAttribute("aria-hidden", "true");
    setTimeout(function () { if (!corOpen) heart.stop(); }, 1150);
    setTimeout(function () { if (!corOpen) glitchLogo(); }, 700);
  }

  /* ── 오른쪽 아래 대화창: 다이브 · 널 대화가 실시간처럼 ── */
  var CH = S.chat || { logs: [] }, chat = { idx: -1, run: 0, open: false, unread: 0, started: false };
  function renderChat() {
    var el = document.createElement("div"); el.className = "chat"; el.id = "chat";
    el.innerHTML =
      '<button class="chat__dock" type="button" data-chat="open" aria-label="대화창 열기"><i class="chat__led"></i><span class="chat__dt">' + esc(CH.dive && CH.dive.name) + ' ⇄ ' + esc(CH.null && CH.null.name) + '</span><span class="chat__badge" hidden>0</span>' +
        '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 10L8 5L13 10"/></svg></button>' +
      '<section class="chat__win" aria-label="대화" hidden>' +
        '<header class="chat__bar"><span class="chat__ttl"><i></i>' + esc(CH.title || "Channel") + '</span>' +
          '<button class="chat__btn" type="button" data-chat="reset" aria-label="다른 대화"><svg viewBox="0 0 16 16"><path d="M13 8A5 5 0 1 1 11.5 4.5M13 2V5H10"/></svg></button>' +
          '<button class="chat__btn" type="button" data-chat="min" aria-label="최소화"><svg viewBox="0 0 16 16"><path d="M3 8H13"/></svg></button></header>' +
        '<p class="chat__who"><span><b>' + esc(CH.dive && CH.dive.name) + '</b>' + esc(CH.dive && CH.dive.nick) + '</span><em>⇄</em><span><b>' + esc(CH.null && CH.null.name) + '</b>' + esc(CH.null && CH.null.nick) + '</span></p>' +
        '<div class="chat__log" id="chatlog"></div>' +
        '<p class="chat__type" id="chattype" hidden><span></span><i></i><i></i><i></i></p>' +
      '</section>';
    document.body.appendChild(el);
    draggable($(".chat__bar", el), $(".chat__win", el));
  }
  function chatStart() {
    var logs = CH.logs || []; if (!logs.length) return;
    var n = chat.idx; if (logs.length > 1) while (n === chat.idx) n = Math.floor(Math.random() * logs.length); else n = 0;
    chat.idx = n; var run = ++chat.run, L = logs[n], box = $("#chatlog"), ty = $("#chattype"), k = 0;
    box.innerHTML = '<p class="chat__sys">— ' + esc(CH.title || "Channel") + ' · log ' + pad2(n + 1) + ' —</p>';
    function next() {
      if (run !== chat.run) return;
      if (k >= L.length) { ty.hidden = true; box.insertAdjacentHTML("beforeend", '<p class="chat__sys chat__end">— end of log · ↻ 다른 대화 —</p>'); box.scrollTop = box.scrollHeight; return; }
      var m = L[k++], who = m[0] === "D" ? "dive" : "null", txt = String(m[2]);
      ty.hidden = false; ty.firstChild.textContent = (CH[who] && CH[who].name) + " is typing";
      ty.className = "chat__type chat__type--" + who;
      var wait = Math.min(2300, 520 + txt.length * 38) * (SHOT ? 0 : 1);
      setTimeout(function () {
        if (run !== chat.run) return;
        ty.hidden = true;
        var body;
        if (/^\[사진\]/.test(txt)) body = '<span class="chat__photo"><b>▣ 사진</b>' + esc(txt.replace(/^\[사진\]\s*/, "")) + '</span>';
        else if (/^\[.*\]$/.test(txt)) body = '<span class="chat__note">' + esc(txt.slice(1, -1)) + '</span>';
        else if (/^\(.*\)$/.test(txt)) body = '<em class="chat__act">' + esc(txt) + '</em>';
        else body = esc(txt);
        box.insertAdjacentHTML("beforeend", '<div class="chat__m chat__m--' + who + '"><span class="chat__n">' + esc(CH[who] && CH[who].name) + '</span><p class="chat__b">' + body + '</p>' + (m[1] ? '<time>' + esc(m[1]) + '</time>' : "") + '</div>');
        box.scrollTop = box.scrollHeight;
        if (!chat.open) { chat.unread++; var bd = $(".chat__badge"); bd.hidden = false; bd.textContent = chat.unread; }
        setTimeout(next, SHOT ? 0 : 380 + Math.random() * 520);
      }, wait);
    }
    setTimeout(next, SHOT ? 0 : 500);
  }
  function chatOpen() {
    var c = $("#chat"); chat.open = true; c.classList.add("is-open");
    $(".chat__win", c).hidden = false; $(".chat__dock", c).hidden = true;
    chat.unread = 0; $(".chat__badge").hidden = true;
    if (!chat.started) { chat.started = true; chatStart(); }
  }
  function chatMin() { var c = $("#chat"); chat.open = false; c.classList.remove("is-open"); $(".chat__win", c).hidden = true; $(".chat__dock", c).hidden = false; }

  /* ── 창 끌어서 옮기기 (머리줄을 잡고) ───────────────── */
  function draggable(handle, box) {
    if (!handle || !box || handle.__drag) return; handle.__drag = 1;
    var sx, sy, ox = 0, oy = 0, on = false;
    handle.style.cursor = "move"; handle.style.touchAction = "none";
    handle.addEventListener("pointerdown", function (e) {
      if (e.target.closest("button, a")) return;
      on = true; sx = e.clientX; sy = e.clientY;
      var m = (box.style.translate || "0px 0px").split(" "); ox = parseFloat(m[0]) || 0; oy = parseFloat(m[1]) || 0;
      handle.setPointerCapture(e.pointerId); box.classList.add("is-dragging"); e.preventDefault();
    });
    handle.addEventListener("pointermove", function (e) {
      if (!on) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      var nx = ox + dx, ny = oy + dy;
      box.style.translate = nx + "px " + ny + "px";
      var r2 = box.getBoundingClientRect();     // 화면 밖으로 나가지 않게
      if (r2.top < 0) ny -= r2.top; if (r2.top > innerHeight - 40) ny -= r2.top - (innerHeight - 40);
      if (r2.right < 60) nx += 60 - r2.right; if (r2.left > innerWidth - 60) nx -= r2.left - (innerWidth - 60);
      box.style.translate = nx + "px " + ny + "px";
    });
    function end() { on = false; box.classList.remove("is-dragging"); }
    handle.addEventListener("pointerup", end); handle.addEventListener("pointercancel", end);
  }

  /* ── 첫 화면 Main: 작은 우주 통신창 ─────────────────── */
  function openComm() {
    var A = S.about || {}, el = $("#comm"); if (!el) return;
    var now = new Date(), z = function (n) { return (n < 10 ? "0" : "") + n; };
    var stamp = now.getFullYear() + "." + z(now.getMonth() + 1) + "." + z(now.getDate()) + "  " + z(now.getHours()) + ":" + z(now.getMinutes());
    var bars = ""; for (var k = 0, x = 0; k < 44; k++) { var w = 1 + (k * 7 + 3) % 3, g = 1 + (k * 5) % 2; bars += '<rect x="' + x + '" width="' + w + '" height="30"/>'; x += w + g; }
    el.innerHTML = '<header class="comm__bar"><span>VINCERE : the eclipse</span>' +
      '<button class="comm__x" type="button" data-comm-close aria-label="닫기"><svg viewBox="0 0 16 16"><path d="M3 3L13 13M13 3L3 13"/></svg></button></header>' +
      '<div class="comm__body">' +
        '<div class="rc__head"><p class="rc__logo">VINCERE</p><p>— READ FIRST · MAIN —</p><p>' + stamp + '</p></div>' +
        '<p class="rc__rule">- - - - - - - - - - - - - - - - - - - - - - -</p>' +
        (A.name ? '<p class="rc__row"><span>ACCOUNT</span><b>' + esc(A.name) + '</b></p>' : "") +
        '<p class="comm__intro">' + fmt(A.intro || "") + '</p>' +
        '<p class="rc__rule">- - - - - - - - - - - - - - - - - - - - - - -</p>' +
        (A.blocks || []).map(function (b) {
          return '<details class="acc' + (b.style ? " acc--" + esc(b.style) : "") + '"><summary><span class="acc__t">' + esc(b.title) + '</span><span class="acc__k">' + esc(b.ko) + '</span><span class="acc__n">x' + (b.items || []).length + '</span><i class="acc__ic"></i></summary><ul>' +
            (b.items || []).map(function (t) { return '<li>' + fmt(t) + '</li>'; }).join("") + '</ul></details>';
        }).join("") +
        '<p class="rc__rule">- - - - - - - - - - - - - - - - - - - - - - -</p>' +
        '<p class="rc__row rc__total"><span>TOTAL</span><b>' + (A.blocks || []).reduce(function (n, b) { return n + (b.items || []).length; }, 0) + ' ITEMS</b></p>' +
        '<p class="rc__thx">THANK YOU FOR READING<br>NO OTHER COORDINATE</p>' +
        '<svg class="rc__bc" viewBox="0 0 ' + x + ' 30" preserveAspectRatio="none" aria-hidden="true">' + bars + '</svg>' +
        '<p class="rc__no">No. 1021-0214-' + z(now.getSeconds()) + '</p>' +
      '</div>';
    el.hidden = false; el.classList.remove("is-off"); el.style.translate = ""; void el.offsetWidth; el.classList.add("is-on");
    draggable($(".comm__bar", el), el);
    var jobs = prepType(".comm__intro, .acc__t, .acc__k", el);
    setTimeout(function () { runType(jobs, { gap: 30, speed: 12, rand: 8 }); }, 200);
  }
  function closeComm() {
    var el = $("#comm"); if (!el || el.hidden) return;
    el.classList.remove("is-on"); el.classList.add("is-off");
    setTimeout(function () { el.hidden = true; el.classList.remove("is-off"); }, 300);
  }

  /* ── 상세창 ───────────────────────────────────────────── */
  function fmt(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\[\[(.+?)\]\]/g, '<span class="cens" tabindex="0" role="button" aria-label="가려진 내용 — 눌러서 보기">$1</span>').replace(/\n/g, "<br>");
  }
  function photo(src, alt) {
    return '<figure class="wp__img tone-' + esc(S.imageTone || "mono") + '"><img src="' + esc(src) + '" alt="' + esc(alt) + '" onerror="this.parentNode.classList.add(\'is-empty\');this.remove()"><figcaption>No signal<br><small>' + esc(src) + '</small></figcaption></figure>';
  }
  function detail(kind) {
    if (kind === "main") {
      var A = S.about || {};
      return '<div class="wm"><p class="w-kick"><i class="wm__dot"></i>' + esc(A.kick) + '</p><h2 class="w-big">' + capB(A.title || "") + '</h2>' +
        (A.name ? '<p class="w-epi">' + esc(A.name) + '</p>' : "") + '<p class="w-p">' + fmt(A.intro || "") + '</p>' +
        (A.blocks || []).map(function (b) {
          return '<section class="wm__b' + (b.style ? " wm__b--" + esc(b.style) : "") + '"><h3 class="wm__h"><span>' + esc(b.title) + '</span><small>' + esc(b.ko) + '</small></h3><ul>' +
            (b.items || []).map(function (t) { return '<li>' + fmt(t) + '</li>'; }).join("") + '</ul></section>';
        }).join("") + '</div>';
    }
    if (kind === "vincere") {
      var SH = S.promptSheets || [];
      return '<button class="wv__go1" type="button" data-goto="0">Prompt' + ARROW + '</button><div class="wv">' + (S.profiles || []).map(function (p, k) {
        var ti = -1; SH.forEach(function (sh, j) { if (ti < 0 && sh.tab === p.codename) ti = j; }); if (ti < 0) ti = k;
        var rows = (p.data || []).map(function (d) { return '<dt>' + esc(d[0]) + '</dt><dd>' + fmt(d[1]) + '</dd>'; }).join("");
        return '<article class="wv__c">' + photo(p.image, p.codename) +
          '<p class="w-kick">' + esc(p.role) + ' · ' + esc(p.name) + '</p><h2 class="w-big">' + esc(p.codename) + '</h2>' +
          '<p class="wv__t">' + esc(p.title) + '</p>' + (p.tags ? '<p class="wv__tags">' + p.tags.map(esc).join(" ") + '</p>' : "") + '<p class="wv__q">' + fmt(p.quote) + '</p>' +
          (rows ? '<dl class="w-dl wv__dl">' + rows + '</dl>' : "") + (p.desc ? '<p class="w-p">' + fmt(p.desc) + '</p>' : "") +
          '<div class="wv__foot">' +
            (p.print ? '<figure class="wv__fp"><img src="' + esc(p.print) + '" alt="' + esc(p.codename) + ' 지문"><figcaption>Print · ' + esc(p.codename) + '</figcaption></figure>' : "") +
            (p.sign ? '<figure class="wv__sig"><span><img src="' + esc(p.sign) + '" alt="' + esc(p.codename) + ' 싸인"></span><figcaption>Signed · ' + esc(p.name) + '</figcaption></figure>' : "") +
          '</div>' +
          '</article>';
      }).join('<div class="wv__x">' + CROSS + '</div>') + '</div>';
    }
    if (kind === "prompt") {
      var P = S.promptSheets || [];
      function parts(p) { return p.parts || [["Appearance", "외형", p.look || ""], ["Outfit", "의상", p.outfit || ""]]; }
      function block(pt, i, k) {
        return '<div class="cp"><div class="cp__h"><span class="cp__en">' + esc(pt[0]) + '</span><span class="cp__ko">' + esc(pt[1]) + '</span>' +
          '<button class="cp__btn" type="button" data-copy="' + i + ':' + k + '" data-label="Copy">Copy</button></div><pre class="cp__txt">' + esc(pt[2]) + '</pre></div>';
      }
      return '<p class="w-kick">Prompt sheet</p><h2 class="w-big">Prompt</h2>' +
        '<div class="wt" role="tablist">' + P.map(function (p, i) { return '<button class="wt__b' + (i ? "" : " is-on") + '" type="button" role="tab" data-tab="' + i + '">' + esc(p.tab) + '</button>'; }).join("") + '</div>' +
        P.map(function (p, i) {
          var im = p.image ? '<button class="cp__img" type="button" data-zoom aria-label="이미지 크게 보기"><img src="' + esc(p.image) + '" alt="' + esc(p.tab) + '" onerror="this.parentNode.classList.add(\'is-empty\');this.remove()"><span class="cp__ph">No signal<small>' + esc(p.image) + '</small></span><i class="cp__hint">Expand</i></button>' : "";
          return '<section class="wt__p' + (i ? "" : " is-on") + '" data-panel="' + i + '">' + im + '<div class="wt__head"><p class="w-epi">' + esc(p.sub) + '</p>' +
            '<button class="cp__btn cp__btn--all" type="button" data-copy="' + i + ':all" data-label="Copy all">Copy all</button></div>' +
            parts(p).map(function (pt, k) { return block(pt, i, k); }).join("") + '</section>';
        }).join("");
    }
    if (kind === "list") {
      var C = S.care || { rows: [] }, total = 0;
      // [작품, [캐릭터…]] 또는 예전 형식 [작품, 영문, [캐릭터…]] 둘 다 읽어요
      var rows = (C.rows || []).map(function (r) {
        var names = r[r.length - 1]; if (!Array.isArray(names)) names = String(names || "").split(/\s*,\s*/).filter(Boolean);
        total += names.length;
        return '<li class="cl4__r"><p class="cl4__t">' + esc(r[0]) + '<sup>' + names.length + '</sup></p><p class="cl4__n">' + names.map(esc).join(", ") + '</p></li>';
      }).join("");
      return '<p class="w-kick">' + esc(C.title) + ' · Total ' + total + '</p><h2 class="w-big">List</h2><p class="w-p">' + fmt(C.note || "") + '</p><ul class="cl4">' + rows + '</ul>';
    }
    if (kind === "banner") {
      return '<p class="w-kick">Banner</p><h2 class="w-big">Banner</h2><div class="bn">' + (S.banners || []).map(function (b) {
        var img = b[2] ? '<img src="' + esc(b[2]) + '" alt="' + esc(b[0]) + '" onerror="this.parentNode.classList.add(\'is-text\');this.remove()">' : "";
        return '<a class="bn__i" href="' + esc(b[1]) + '" target="_blank" rel="noopener"><span class="bn__img' + (b[2] ? "" : " is-text") + '">' + img + '<em>' + esc(b[0]) + '</em></span><span class="bn__n">' + esc(b[0]) + ARROW + '</span></a>';
      }).join("") + '</div>';
    }
    if (kind === "link") {
      return '<p class="w-kick">Link · Elsewhere</p><h2 class="w-big">Link</h2><div class="lk">' + (S.links || []).map(function (l) {
        var img = l[3] ? '<img src="' + esc(l[3]) + '" alt="" onerror="this.closest(\'.lk__i\').classList.add(\'is-text\');this.remove()">' : "";
        return '<a class="lk__i' + (l[3] ? "" : " is-text") + '" href="' + esc(l[2]) + '" target="_blank" rel="noopener"><span class="lk__img">' + img + '</span>' +
          '<span class="lk__txt"><b>' + capB(l[0]) + '</b><small>' + esc(l[1]) + '</small></span>' + ARROW + '</a>';
      }).join("") + '</div>';
    }
    return "";
  }
  function copyText(key, btn) {
    var k = key.split(":"), P = (S.promptSheets || [])[+k[0]]; if (!P) return;
    var PT = P.parts || [["", "", P.look || ""], ["", "", P.outfit || ""]];
    var t = k[1] === "all" ? PT.map(function (x) { return x[2]; }).filter(Boolean).join(", ") : (PT[+k[1]] || [])[2] || "";
    function done() { btn.textContent = "Copied"; btn.classList.add("is-done"); setTimeout(function () { btn.textContent = btn.dataset.label; btn.classList.remove("is-done"); }, 1400); }
    function fallback() { var ta = document.createElement("textarea"); ta.value = t; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;top:0;left:0;opacity:0"; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} ta.remove(); done(); }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(done, fallback); else fallback();
  }
  function setTab(n) {
    document.querySelectorAll("[data-tab]").forEach(function (b) { b.classList.toggle("is-on", b.dataset.tab === n); });
    document.querySelectorAll("[data-panel]").forEach(function (p) { p.classList.toggle("is-on", p.dataset.panel === n); });
  }
  var lastFocus = null;
  function openWin(i, tab) {
    var p = PR[i], win = $("#win"); if (!p) return;
    lastFocus = document.activeElement;
    win.innerHTML = '<div class="win__back" data-close></div><div class="win__box">' +
      '<header class="win__bar"><span class="win__id">Vincere_' + (NUM[i] || pad2(i + 1)) + '</span><span class="win__name">// ' + esc(p.title) + ' — ' + esc(p.ko) + '</span><span class="win__rec"><i></i>Rec</span>' +
      '<button class="win__x" type="button" data-close aria-label="닫기"><svg viewBox="0 0 16 16"><path d="M3 3L13 13M13 3L3 13"/></svg></button></header>' +
      '<div class="win__body">' + detail(p.open) + '</div>' +
      '<footer class="win__foot"><span>Vincere · Cor ' + esc(H.code) + '</span><span>Signal ' + esc(p.part) + ' / OK</span></footer></div>';
    win.hidden = false; win.setAttribute("aria-label", p.title); win.dataset.kind = p.open;
    if (tab != null) setTab(String(tab));
    draggable($(".win__bar", win), $(".win__box", win));
    void win.offsetWidth; win.classList.add("is-on");
    var jobs = prepType(".win__body .w-kick, .win__body .w-epi, .win__body .w-p, .win__body .wv__t, .win__body .wv__q, .win__body figcaption, .win__body .cp__h span, .win__body .cl4__n, .win__body .bn__n, .win__body .lk__txt small, .win__body .wm__h small, .win__body .wm__b li, .win__body .w-dl dt, .win__body .w-dl dd", win);
    setTimeout(function () { runType(jobs, { gap: 22, speed: 9, rand: 6, chunk: 2 }); }, 260);
    setTimeout(function () { var x = $(".win__x", win); x && x.focus({ preventScroll: true }); }, 50);
  }
  function closeWin() {
    var win = $("#win"); if (win.hidden) return;
    win.classList.remove("is-on"); win.classList.add("is-off");
    setTimeout(function () { win.hidden = true; win.classList.remove("is-off"); win.innerHTML = ""; lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true }); }, 320);
  }

  /* ── 스크롤 / 스와이프 / 키보드 ─────────────────────── */
  function bindNav() {
    addEventListener("wheel", function (e) {
      if (!$("#win").hidden || (e.target.closest && e.target.closest(".comm, .chat"))) return;
      if (!corOpen && e.deltaY > 12) { closeComm(); openCor(); }
      else if (corOpen && e.deltaY < -12 && $("#cor").scrollTop <= 0) closeCor();
    }, { passive: true });
    var ty = null, tScroll = 0;
    addEventListener("touchstart", function (e) { ty = e.target.closest("#orb, #heart, .chat, .comm") ? null : e.touches[0].clientY; tScroll = $("#cor").scrollTop; }, { passive: true });
    addEventListener("touchend", function (e) {
      if (ty == null || !$("#win").hidden) return; var dy = e.changedTouches[0].clientY - ty; ty = null;
      if (!corOpen && dy < -50) openCor(); else if (corOpen && dy > 70 && tScroll <= 0) closeCor();
    }, { passive: true });
    addEventListener("keydown", function (e) {
      if (e.key === "Escape") { if (!$("#win").hidden) closeWin(); else if ($("#comm") && !$("#comm").hidden) closeComm(); else closeCor(); return; }
      if (!$("#win").hidden) return;
      if (/^(ArrowDown|PageDown| )$/.test(e.key) && !corOpen) { e.preventDefault(); openCor(); }
      if (/^(ArrowUp|PageUp)$/.test(e.key) && corOpen && $("#cor").scrollTop <= 0) { e.preventDefault(); closeCor(); }
    });
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest("[data-chat]")) { var ca = t.closest("[data-chat]").dataset.chat; if (ca === "open") chatOpen(); else if (ca === "min") chatMin(); else if (ca === "reset") chatStart(); return; }
      if (t.closest("[data-act='main']")) { var cm = $("#comm"); cm && !cm.hidden ? closeComm() : openComm(); }
      else if (t.closest("[data-act='etc']")) { closeComm(); openCor(); }
      else if (t.closest("[data-comm-close]")) closeComm();
      else if (t.closest("#toCor")) { closeComm(); openCor(); }
      else if (t.closest("#toStage")) closeCor();
      else if (t.closest(".pb")) openWin(+t.closest(".pb").dataset.i);
      else if (t.closest("[data-close]")) closeWin();
      else if (t.closest("[data-copy]")) copyText(t.closest("[data-copy]").dataset.copy, t.closest("[data-copy]"));
      else if (t.closest("[data-tab]")) setTab(t.closest("[data-tab]").dataset.tab);
      else if (t.closest("[data-zoom]")) t.closest("[data-zoom]").classList.toggle("is-zoom");
      else if (t.closest("[data-goto]")) {
        var tb = t.closest("[data-goto]").dataset.goto, pi = -1;
        PR.forEach(function (p, j) { if (p.open === "prompt" && pi < 0) pi = j; });
        if (pi >= 0) { closeWin(); setTimeout(function () { openWin(pi, tb); }, 340); }
      }
    });
    document.addEventListener("mouseover", function (e) { var b = e.target.closest && e.target.closest(".pb"); if (b) setHover(+b.dataset.i); });
    document.addEventListener("mouseout", function (e) { var b = e.target.closest && e.target.closest(".pb"); if (b && !b.contains(e.relatedTarget)) setHover(-1); });
  }

  /* ── 시작 연출: 코로나 → 달로 변함 ─────────────────── */
  function at(ms, fn) { setTimeout(fn, ms); }
  function play() {
    root.classList.add("is-locked");
    at(80, function () { root.classList.add("o-light"); });                               // 검은 화면에 코로나
    at(2700, function () { root.classList.add("o-reveal"); orb.reborn(); });             // 점이 반짝이며 달로
    at(5000, function () { root.classList.add("o-logo"); signal(1500, 1.5, true); });    // 로고: 신호 잡히듯
    at(5300, function () { root.classList.add("o-type"); runType(stageJobs); });         // 글자 도도독
    at(8000, function () { root.classList.add("o-done"); root.classList.remove("is-locked"); $("#open").hidden = true; idleGlitch(); setTimeout(loadHeart, 600); });
  }

  document.title = S.meta.title;  // VINCERE : the eclipse
  var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute("content", S.meta.description);
  renderStage(); renderCor(); renderChat(); sigInit(); dday(); orb(); heartInit(); bindNav();
  corJobs = prepType(".cmeta span, .cor .hud span, .cor .hud p, .cor .hud em, .ctitle span, .pb span, .cor__back, .cblk b, .cblk span, .cblk dt, .cblk dd, .cblk .ctag");
  if (SKIP) {
    ["o-light", "o-reveal", "o-logo", "o-type", "o-done", "is-skip"].forEach(function (c) { root.classList.add(c); }); $("#open").hidden = true;
    corTyped = true; corJobs.forEach(function (j) { j.node.nodeValue = j.text; });
    if (/[?&]cor/.test(location.search)) setTimeout(function () { corBusy = 0; openCor(); }, 50);
  } else { stageJobs = prepType(".stage .bar span, .hud b, .hud p, .hud i, .hud em, .hud span, .scroll, .sti span"); play(); }
  document.addEventListener("pointerdown", tapDown); document.addEventListener("pointerup", tapUp);
})();
