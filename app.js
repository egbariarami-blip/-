/* =========================================================
   يوم النظافة العالمي — صف جنى
   كل الإعدادات القابلة للتعديل موجودة بأول الملف تحت CONFIG.
   ========================================================= */

const CONFIG = {
  className: "صف جنى",              // اسم الصف زي ما بدك يظهر
  schoolName: "",                    // اسم المدرسة (اختياري) — بينضاف جنب اسم الصف
  eventDate: "2026-09-19T08:00:00",  // تاريخ وساعة الفعالية (بتوقيت الجهاز)
  dateLabel: "١٩ أيلول",             // كيف بدك التاريخ يظهر بالشهادة
  teams: [
    { id: "zaytoun", name: "فريق الزيتون", emoji: "🫒" },
    { id: "yasmeen", name: "فريق الياسمين", emoji: "🌸" },
    { id: "nakheel", name: "فريق النخيل", emoji: "🌴" },
    { id: "sanawbar", name: "فريق الصنوبر", emoji: "🌲" }
  ]
};

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem("wcd_" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem("wcd_" + k, JSON.stringify(v)); } catch {} }
};

/* ---------- نصوص الإعدادات ---------- */
const classLine = CONFIG.schoolName ? `${CONFIG.className} · ${CONFIG.schoolName}` : CONFIG.className;
$$('[data-cfg="classLine"]').forEach(el => el.textContent = classLine);
$$('[data-cfg="dateLine"]').forEach(el => el.textContent = CONFIG.dateLabel);

/* ---------- الوضع الليلي ---------- */
const themeBtn = $("#themeBtn");
const savedTheme = store.get("theme", null);
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
themeBtn.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme
    ? document.documentElement.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  const next = isDark ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  store.set("theme", next);
});

/* ---------- القائمة والتنقل ---------- */
const links = $(".links");
$("#menuBtn").addEventListener("click", e => {
  const open = links.classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", String(open));
});
links.addEventListener("click", e => { if (e.target.tagName === "A") links.classList.remove("open"); });

const nav = $("#nav"), topBtn = $("#topBtn");
addEventListener("scroll", () => {
  nav.classList.toggle("stuck", scrollY > 10);
  topBtn.classList.toggle("show", scrollY > 600);
}, { passive: true });
topBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- ظهور تدريجي ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: .15 });
$$(".reveal").forEach(el => io.observe(el));

/* ---------- عدّادات الأرقام ---------- */
const countIO = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target, to = +el.dataset.to, sfx = el.dataset.suffix || "";
    const dur = 1200, t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + (p === 1 ? sfx : "");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countIO.unobserve(el);
  });
}, { threshold: .5 });
$$(".count").forEach(el => countIO.observe(el));

/* ---------- العد التنازلي ---------- */
const target = new Date(CONFIG.eventDate).getTime();
function tickCountdown() {
  const diff = target - Date.now();
  if (isNaN(target)) { $("#countdown").hidden = true; return; }
  if (diff <= 0) {
    $("#cdLabel").textContent = "اليوم هو اليوم — يلا نبلّش! 🎉";
    $$(".cd-box").forEach(el => el.hidden = true);
    return;
  }
  const s = Math.floor(diff / 1000);
  $("#cdD").textContent = Math.floor(s / 86400);
  $("#cdH").textContent = String(Math.floor(s % 86400 / 3600)).padStart(2, "0");
  $("#cdM").textContent = String(Math.floor(s % 3600 / 60)).padStart(2, "0");
  $("#cdS").textContent = String(s % 60).padStart(2, "0");
  setTimeout(tickCountdown, 1000);
}
tickCountdown();

/* ---------- برنامج اليوم ---------- */
const PLAN = [
  { t: "08:00", i: "🙌", h: "اللقاء الصباحي", p: "تعليمات سريعة، توزيع الفرق، وتسليم القفازات والأكياس." },
  { t: "08:30", i: "🎒", h: "ورشة: وين بتروح نفاياتنا؟", p: "ربع ساعة نتعرّف فيها على الحاويات الأربع وشو بينحط بكل وحدة." },
  { t: "09:00", i: "🧹", h: "انطلاق التنظيف", p: "كل فريق بياخد منطقة بالساحة أو الحديقة وبيبلّش." },
  { t: "10:00", i: "♻️", h: "محطة الفرز والوزن", p: "بنفرز اللي جمعناه، وبنسجّل عدد الأكياس لكل فريق." },
  { t: "10:30", i: "🍎", h: "استراحة صحية", p: "غسل إيدين، ماي وفواكه، وصور تذكارية للفرق." },
  { t: "11:00", i: "🎨", h: "ورشة الإبداع", p: "كل فريق بيعمل شعار توعوي وشغلة جديدة من مواد معاد تدويرها." },
  { t: "12:00", i: "🏆", h: "العرض والتكريم", p: "عرض الشعارات، إعلان النقاط، وتسليم شهادات المشاركة." }
];
$("#timeline").innerHTML = PLAN.map(x => `
  <li class="reveal">
    <span class="dot">${x.i}</span>
    <time>${x.t}</time>
    <h3>${x.h}</h3>
    <p>${x.p}</p>
  </li>`).join("");

/* ---------- لوحة النقاط ---------- */
const board = $("#board");
let scores = store.get("scores", null) || Object.fromEntries(CONFIG.teams.map(t => [t.id, 0]));
CONFIG.teams.forEach(t => { if (typeof scores[t.id] !== "number") scores[t.id] = 0; });

function renderBoard() {
  const max = Math.max(10, ...Object.values(scores));
  const sorted = [...CONFIG.teams].sort((a, b) => scores[b.id] - scores[a.id]);
  const topScore = scores[sorted[0].id];
  board.innerHTML = sorted.map((t, i) => `
    <div class="team${topScore > 0 && scores[t.id] === topScore ? " lead-team" : ""}">
      <span class="rank">${["🥇", "🥈", "🥉"][i] || i + 1}</span>
      <span class="emoji">${t.emoji}</span>
      <span class="info">
        <b>${t.name}</b>
        <span class="bar"><span style="width:${Math.round(scores[t.id] / max * 100)}%"></span></span>
      </span>
      <span class="ctrl">
        <button type="button" data-team="${t.id}" data-delta="-5" aria-label="أنقص 5 نقاط من ${t.name}">−</button>
        <button type="button" data-team="${t.id}" data-delta="5" aria-label="أضف 5 نقاط لـ${t.name}">+</button>
      </span>
      <span class="pts">${scores[t.id]}</span>
    </div>`).join("");
}
board.addEventListener("click", e => {
  const b = e.target.closest("button[data-team]");
  if (!b || !board.classList.contains("editing")) return;
  scores[b.dataset.team] = Math.max(0, scores[b.dataset.team] + +b.dataset.delta);
  store.set("scores", scores);
  renderBoard();
});
$("#editToggle").addEventListener("click", e => {
  const on = board.classList.toggle("editing");
  e.currentTarget.setAttribute("aria-pressed", String(on));
  e.currentTarget.textContent = on ? "خلصت ✓" : "وضع المعلّمة ✏️";
});
$("#resetBoard").addEventListener("click", () => {
  if (!confirm("متأكدة إنك بدك تصفّري نقاط كل الفرق؟")) return;
  scores = Object.fromEntries(CONFIG.teams.map(t => [t.id, 0]));
  store.set("scores", scores);
  renderBoard();
});
renderBoard();

/* ---------- بطاقة المهمات ---------- */
const MISSIONS = [
  ["لبسنا القفازات", "قبل أي إشي: قفازات لكل واحد بالفريق."],
  ["نظّفنا منطقتنا", "المنطقة اللي انحطّت علينا صارت نضيفة تمامًا."],
  ["فرزنا الأكياس", "بلاستيك، ورق، زجاج ومعادن، وعضوي — كل واحد بمحلّه."],
  ["جمعنا 3 أكياس", "على الأقل ثلاث أكياس مربوطة منيح."],
  ["صمّمنا شعار الفريق", "شعار أو ملصق توعوي بخط واضح ورسمة."],
  ["عملنا إشي معاد تدويره", "غرض جديد من مواد كانت رح تنرمى."],
  ["صوّرنا قبل وبعد", "صورة للمكان قبل التنظيف وصورة بعده."],
  ["أشركنا العيلة", "تنظيف صغير بالبيت أو بالحارة مع الأهل."],
  ["غسلنا إيدينا", "بعد ما خلّصنا: صابون وماي منيح."],
  ["رجّعنا الأدوات", "الأكياس الزيادة والأدوات رجعت لمكانها."]
];
const missionsWrap = $("#missionList");
let done = store.get("missions", []);
missionsWrap.innerHTML = MISSIONS.map(([h, p], i) => `
  <label class="mission${done.includes(i) ? " done" : ""}">
    <input type="checkbox" data-i="${i}"${done.includes(i) ? " checked" : ""} />
    <span><b>${h}</b><small>${p}</small></span>
  </label>`).join("");
function renderProgress() {
  const pct = Math.round(done.length / MISSIONS.length * 100);
  $("#progBar").style.width = pct + "%";
  $("#progTxt").textContent = pct + "%";
}
missionsWrap.addEventListener("change", e => {
  const i = +e.target.dataset.i;
  done = e.target.checked ? [...new Set([...done, i])] : done.filter(x => x !== i);
  e.target.closest(".mission").classList.toggle("done", e.target.checked);
  store.set("missions", done);
  renderProgress();
});
renderProgress();

/* ---------- الكويز ---------- */
const QUIZ = [
  { q: "وين بترمي قنينة بلاستيك فاضية؟", a: ["حاوية البلاستيك", "حاوية الورق", "أي حاوية قريبة", "بالأرض ورا الشجرة"], c: 0,
    why: "البلاستيك إله حاوية لحاله، وهيك بينفع ينعاد تدويره." },
  { q: "شو أول إشي بنعمله قبل ما نبلّش التنظيف؟", a: ["نبلّش نلمّ بسرعة", "نلبس القفازات", "نصوّر صور", "نوزّع الجوائز"], c: 1,
    why: "السلامة أولًا — القفازات بتحمي إيدينا من الزجاج والأوساخ." },
  { q: "الجرائد والكرتون وين بيروحوا؟", a: ["حاوية الزجاج", "النفايات العضوية", "حاوية الورق والكرتون", "حاوية البلاستيك"], c: 2,
    why: "الورق والكرتون بينعاد تدويرهم لورق جديد." },
  { q: "قنينة البلاستيك كم بدها وقت لتتحلل بالطبيعة؟", a: ["أسبوع", "سنة", "عشر سنين", "حوالي 450 سنة"], c: 3,
    why: "تقديرات العلماء بتحكي مئات السنين — عشان هيك الفرز مهم." },
  { q: "لقيت زجاج مكسور بالساحة، شو بتعمل؟", a: ["بلمّه بإيدي", "بركله بعيد", "بخبّر المعلّمة ولا بلمسه", "بتجاهله"], c: 2,
    why: "الأشياء الخطرة (زجاج، إبر، بطاريات) بس الكبار بيتعاملوا معها." },
  { q: "أحسن طريقة نقلّل النفايات؟", a: ["نستهلك أقل ونعيد الاستخدام", "نحرقها", "ندفنها بالحديقة", "نرميها ببلد تاني"], c: 0,
    why: "أفضل نفاية هي اللي ما صارت أصلًا — قلّل، أعِد الاستخدام، ثم أعِد التدوير." },
  { q: "إيمتى بينحتفل باليوم العالمي للنظافة؟", a: ["أول يوم بالسنة", "السبت الثالث من أيلول", "آخر جمعة بأيار", "كل يوم إثنين"], c: 1,
    why: "السبت الثالث من أيلول، ومنه صار يوم عالمي من سنة 2018." }
];
let qi = 0, qScore = 0;
const qText = $("#qText"), qOpts = $("#qOpts"), qNum = $("#qNum"),
      qScoreEl = $("#qScore"), qFeedback = $("#qFeedback"), qNext = $("#qNext");

function renderQ() {
  const item = QUIZ[qi];
  qNum.textContent = `سؤال ${qi + 1} من ${QUIZ.length}`;
  qScoreEl.textContent = `النقاط: ${qScore}`;
  qText.textContent = item.q;
  qFeedback.textContent = "";
  qNext.hidden = true;
  qOpts.innerHTML = item.a.map((t, i) => `<button class="opt" type="button" data-i="${i}">${t}</button>`).join("");
}
qOpts.addEventListener("click", e => {
  const b = e.target.closest(".opt");
  if (!b || b.disabled) return;
  const item = QUIZ[qi], picked = +b.dataset.i;
  $$(".opt", qOpts).forEach((o, i) => {
    o.disabled = true;
    if (i === item.c) o.classList.add("right");
    else if (i === picked) o.classList.add("wrong");
  });
  if (picked === item.c) { qScore++; qFeedback.textContent = "✅ صح! " + item.why; }
  else qFeedback.textContent = "❌ الجواب الصح: " + item.a[item.c] + " — " + item.why;
  qScoreEl.textContent = `النقاط: ${qScore}`;
  qNext.hidden = false;
  qNext.textContent = qi === QUIZ.length - 1 ? "شوف النتيجة" : "السؤال الجاي";
});
qNext.addEventListener("click", () => {
  if (qi < QUIZ.length - 1) { qi++; renderQ(); }
  else {
    $("#quizCard").hidden = true;
    $("#quizResult").hidden = false;
    const pct = qScore / QUIZ.length;
    $("#qResultEmoji").textContent = pct === 1 ? "🏆" : pct >= .7 ? "🎉" : pct >= .4 ? "💪" : "📚";
    $("#qResultTitle").textContent = `نتيجتك ${qScore} من ${QUIZ.length}`;
    $("#qResultText").textContent = pct === 1 ? "علامة كاملة! إنت خبير نظافة رسمي."
      : pct >= .7 ? "ممتاز! معلوماتك قوية، ضلّك هيك."
      : pct >= .4 ? "منيح! ارجع اقرا النصايح فوق وجرّب كمان مرة."
      : "ما في مشكلة — اقرا الأقسام اللي فوق وأعد الكويز، رح تتفاجأ بحالك.";
  }
});
$("#qRestart").addEventListener("click", () => {
  qi = 0; qScore = 0;
  $("#quizResult").hidden = true;
  $("#quizCard").hidden = false;
  renderQ();
});
renderQ();

/* ---------- لعبة الفرز ---------- */
const BINS = [
  { id: "plastic", i: "🧴", n: "بلاستيك", s: "قناني، أكياس، علب" },
  { id: "paper",   i: "📄", n: "ورق وكرتون", s: "جرايد، دفاتر، كراتين" },
  { id: "glass",   i: "🫙", n: "زجاج ومعادن", s: "قناني زجاج، علب معدن" },
  { id: "organic", i: "🍎", n: "نفايات عضوية", s: "بقايا أكل وقشور" }
];
const ITEMS = [
  { e: "🍌", n: "قشرة موز", b: "organic" },
  { e: "🥤", n: "كاسة بلاستيك", b: "plastic" },
  { e: "📰", n: "جريدة قديمة", b: "paper" },
  { e: "🥫", n: "علبة معدنية", b: "glass" },
  { e: "🍏", n: "بقايا تفاحة", b: "organic" },
  { e: "📦", n: "كرتونة", b: "paper" },
  { e: "🍾", n: "قنينة زجاج", b: "glass" },
  { e: "🧴", n: "عبوة شامبو", b: "plastic" },
  { e: "📒", n: "دفتر ممزّق", b: "paper" },
  { e: "🥚", n: "قشر بيض", b: "organic" }
];
const binsWrap = $("#bins");
binsWrap.innerHTML = BINS.map(b => `
  <button class="bin" type="button" data-bin="${b.id}">
    <i>${b.i}</i><b>${b.n}</b><small>${b.s}</small>
  </button>`).join("");

let gOrder = [], gi = 0, gRight = 0, gLock = false;
function shuffle(a) { const c = [...a]; for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; } return c; }
function renderItem() {
  const it = gOrder[gi];
  $("#gameCount").textContent = `الغرض ${gi + 1} من ${gOrder.length}`;
  $("#gameEmoji").textContent = it.e;
  $("#gameName").textContent = it.n;
  const card = $("#gameItem");
  card.classList.remove("pop"); void card.offsetWidth; card.classList.add("pop");
}
function startGame() {
  gOrder = shuffle(ITEMS); gi = 0; gRight = 0; gLock = false;
  $("#gameDone").hidden = true;
  $("#gameMsg").textContent = " ";
  $("#gameMsg").className = "game-msg";
  renderItem();
}
binsWrap.addEventListener("click", e => {
  const b = e.target.closest(".bin");
  if (!b || gLock) return;
  const it = gOrder[gi], msg = $("#gameMsg");
  const ok = b.dataset.bin === it.b;
  if (ok) { gRight++; msg.textContent = "✅ صح! " + it.n + " بتروح على " + BINS.find(x => x.id === it.b).n; msg.className = "game-msg ok"; }
  else { msg.textContent = "❌ مش هون — " + it.n + " مكانها " + BINS.find(x => x.id === it.b).n; msg.className = "game-msg no"; }
  gLock = true;
  setTimeout(() => {
    gLock = false;
    if (gi < gOrder.length - 1) { gi++; renderItem(); msg.textContent = " "; msg.className = "game-msg"; }
    else {
      $("#gameDoneTitle").textContent = `فرزت ${gRight} من ${gOrder.length} صح`;
      $("#gameDoneText").textContent = gRight === gOrder.length ? "علامة كاملة! جاهز تكون مسؤول الفرز بفريقك 🏅"
        : gRight >= gOrder.length * .7 ? "قريب كتير من الكمال — جرّب كمان مرة." : "جرّب كمان مرة، كل مرة بتصير أسرع.";
      $("#gameDone").hidden = false;
    }
  }, 1100);
});
$("#gameRestart").addEventListener("click", startGame);
startGame();

/* ---------- التعهّد ---------- */
const pledgeCount = $("#pledgeCount");
let pledges = store.get("pledges", 0);
pledgeCount.textContent = pledges;
$("#pledgeBtn").addEventListener("click", e => {
  pledges++; store.set("pledges", pledges);
  pledgeCount.textContent = pledges;
  e.currentTarget.textContent = "تعهّدك انسجّل 💚 التالي!";
  confetti();
  setTimeout(() => e.currentTarget.textContent = "أنا بتعهّد ✋", 2200);
});
function confetti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const chars = ["🍃", "♻️", "💚", "🌿", "✨"];
  for (let i = 0; i < 22; i++) {
    const s = document.createElement("span");
    s.textContent = chars[i % chars.length];
    s.style.cssText = `position:fixed;z-index:60;pointer-events:none;font-size:${12 + Math.random() * 16}px;
      left:${Math.random() * 100}vw;top:-30px;transition:transform 2.4s linear,opacity 2.4s linear`;
    document.body.appendChild(s);
    requestAnimationFrame(() => {
      s.style.transform = `translateY(${innerHeight + 60}px) rotate(${Math.random() * 720 - 360}deg)`;
      s.style.opacity = "0";
    });
    setTimeout(() => s.remove(), 2600);
  }
}

/* ---------- السلامة ---------- */
const SAFETY = [
  ["🧤", "قفازات دائمًا", "ما بنلمس أي نفاية بإيد فاضية."],
  ["🚫", "الخطر مش إلنا", "زجاج مكسور، إبر، بطاريات، أدوية — بنخبّر المعلّمة فورًا."],
  ["👥", "بنمشي مجموعات", "ما حدا بيبعد عن فريقه ولا بيطلع برا حدود المدرسة."],
  ["💧", "ماي وقبعة", "الشمس قوية — بنشرب ماي وبناخد استراحة."],
  ["🧼", "غسل الإيدين", "بعد ما نخلّص: صابون وماي، وقبل الأكل كمان."],
  ["📢", "بنذكّر بلطف", "لما نشوف حدا بيرمي، بننبّهه بابتسامة مش بعصبية."]
];
$("#safety-list").innerHTML = SAFETY.map(([i, b, p]) => `
  <div class="safe reveal"><i>${i}</i><p><b>${b}</b>${p}</p></div>`).join("");
$$("#safety-list .reveal, #timeline .reveal").forEach(el => io.observe(el));

/* ---------- الشهادة ---------- */
const certName = $("#certName"), certOut = $("#certOut");
certName.value = store.get("certName", "");
const syncCert = () => {
  const v = certName.value.trim();
  certOut.textContent = v || "اسم الطالب";
  store.set("certName", v);
};
certName.addEventListener("input", syncCert);
syncCert();
$("#printBtn").addEventListener("click", () => {
  if (!certName.value.trim()) { certName.focus(); return; }
  print();
});
