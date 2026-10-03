(function(){
var CFG = window.SITE_CONFIG || {whatsapp:"972526710819", supabaseUrl:"", supabaseAnonKey:""};
var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
function $(id){ return document.getElementById(id); }
function el(tag, cls, txt){ var e=document.createElement(tag); if(cls) e.className=cls; if(txt!=null) e.textContent=txt; return e; }
function waLink(text){ return "https://wa.me/"+CFG.whatsapp+"?text="+encodeURIComponent(text); }

var defaultWa = waLink("مرحبًا، أريد التسجيل لدورة ChatGPT 2026");
$("waBtn").href = defaultWa; $("waFloat").href = defaultWa;

/* ---------- data ---------- */
var LEVELS = [
  {k:"kg",  name:"رياض الأطفال", topic:"الأرنب نونو يتعلم الألوان"},
  {k:"el",  name:"الابتدائي",    topic:"المجموعة الشمسية"},
  {k:"mid", name:"الإعدادي",     topic:"الأشكال الهندسية والحجوم"},
  {k:"hs",  name:"الثانوي",      topic:"التفاعلات الكيميائية"},
  {k:"uni", name:"الجامعة",      topic:"بيولوجيا الخلية"}
];
var SESSIONS = [
  {n:1,c:"#3B8BFF",type:"plan",date:"4.10.2026",time:"18:30–20:00",tool:"ChatGPT · Thinking · Work",
   title:"ابدأ بقوة ChatGPT الحديث والتحكم الذكي",
   desc:"البيئة الجديدة، الفرق بين Chat وWork، ربط الأدوات، ودعه يعمل على المتصفح والحاسوب: يفتح مواقع، يبحث، يُدخل بيانات وينظّم ملفات.",
   tags:["GPT-5.6","Thinking","Work","Plugins","Computer Use"], out:"خطة كاملة + مهام نُفّذت في المتصفح",
   sims:{
    kg:{p:"أنا مربية روضة. أريد وحدة لأسبوعين عن الألوان من خلال قصة الأرنب نونو. ابنِ خطة كاملة، وابحث لي عن أغانٍ مناسبة ونظّمها في مجلد.",s:["Thinking: تحليل عمر الأطفال وأهداف الوحدة","Work: فتح المتصفح والبحث عن أغانٍ وأنشطة","تنظيم الملفات في مجلد \"وحدة الألوان\""],i:["يوم 1: قصة نونو واللون الأحمر","يوم 2: نشاط فرز الألوان","يوم 3: أغنية الألوان","يوم 4: ركن الرسم الحر"],u:"youtube.com/results?q=أغنية+الألوان+للأطفال"},
    el:{p:"خطّط وحدة \"المجموعة الشمسية\" للصف الرابع في 6 حصص، واجمع لي من مواقع موثوقة صورًا وحقائق عن الكواكب.",s:["Thinking: تقسيم الوحدة إلى 6 حصص","Work: تصفح مواقع علمية وجمع الحقائق","حفظ جدول حقائق الكواكب في Drive"],i:["حصة 1: الشمس نجمنا","حصة 2: الكواكب الصخرية","حصة 3: العمالقة الغازية","حصة 4: مشروع نموذج الكواكب"],u:"science.nasa.gov/solar-system/planets"},
    mid:{p:"حضّر وحدة \"الحجوم والمساحات\" للصف الثامن مع تمارين متدرجة، ثم أدخل العلامات من ملف الإكسل إلى النظام المدرسي.",s:["Thinking: بناء تسلسل من السهل إلى الصعب","Plugins: قراءة ملف العلامات","Computer Use: إدخال العلامات في النظام"],i:["حجم المكعب ومتوازي المستطيلات","حجم الأسطوانة","المساحة الجانبية والكلية","تمارين تحدٍّ متدرجة"],u:"school-system/grades/class-8"},
    hs:{p:"ابنِ خطة وحدة \"التفاعلات الكيميائية\" للصف العاشر، وابحث عن تجارب آمنة، وجهّز قائمة المواد اللازمة لطلبها.",s:["Thinking: ربط الوحدة بالمنهج","Work: البحث عن تجارب آمنة","إعداد قائمة مواد وطلبية جاهزة"],i:["أنواع التفاعلات","موازنة المعادلات","تجربة الخل وبيكربونات الصوديوم","ورقة سلامة المختبر"],u:"lab-supplies/cart"},
    uni:{p:"صمّم مخطط مساق \"بيولوجيا الخلية\" لـ 13 أسبوعًا، واجمع 10 مقالات حديثة ونظّمها في قائمة مراجع.",s:["Thinking: توزيع المادة على 13 أسبوعًا","Work: البحث في قواعد المقالات الأكاديمية","تنسيق قائمة المراجع بأسلوب APA"],i:["أسبوع 1–3: بنية الخلية","أسبوع 4–6: الغشاء والنقل","أسبوع 7–9: الطاقة في الخلية","أسبوع 10–13: الانقسام"],u:"scholar.google.com/?q=cell+biology+2026"}
   }},
  {n:2,c:"#FF3D8B",type:"video",date:"11.10.2026",time:"18:30–20:00",tool:"ChatGPT · Plugins · Video",
   title:"إنتاج فيديوهات بكبسة زر",
   desc:"كتابة السيناريو، إنشاء المشاهد والصور، الصوت، الفيديو والمونتاج؛ عدة خدمات مترابطة في عملية واحدة بدل العمل اليدوي.",
   tags:["ChatGPT","Plugins","Video Tools","Work"], out:"فيديو تعليمي جاهز للعرض",
   sims:{
    kg:{p:"حوّل قصة نونو والألوان إلى فيديو كرتوني مدته دقيقتان بصوت راوٍ دافئ.",s:["كتابة السيناريو وتقسيمه إلى مشاهد","إنشاء الشخصيات والمشاهد","الصوت والموسيقى والمونتاج"],i:[["🐰","نونو يستيقظ"],["🍎","تفاحة حمراء"],["🥕","جزرة برتقالية"],["🌈","قوس قزح"]],d:"02:00"},
    el:{p:"فيديو تعليمي 3 دقائق: رحلة صاروخ عبر المجموعة الشمسية مع راوٍ وطالب فضولي.",s:["سيناريو حواري بين الراوي والطالب","إنشاء مشاهد الفضاء والكواكب","تعليق صوتي وموسيقى ومونتاج"],i:[["🚀","الانطلاق"],["☀️","الشمس"],["🪐","زحل وحلقاته"],["🌍","العودة للأرض"]],d:"03:00"},
    mid:{p:"فيديو يشرح حجم الأسطوانة بمثال علبة عصير، مع رسوم متحركة للصيغة.",s:["سيناريو من مثال حياتي إلى الصيغة","رسوم متحركة للقاعدة والارتفاع","صوت ومونتاج وعناوين"],i:[["🥤","علبة العصير"],["⭕","مساحة القاعدة"],["📏","الارتفاع"],["🧮","الصيغة النهائية"]],d:"02:30"},
    hs:{p:"فيديو قصير بأسلوب وثائقي عن تفاعل الاحتراق مع تعليق صوتي ورسومات للجزيئات.",s:["سيناريو وثائقي علمي","مشاهد وجزيئات متحركة","تعليق صوتي ومونتاج"],i:[["🔥","ما هو الاحتراق؟"],["⚗️","المتفاعلات"],["💨","النواتج"],["⚖️","موازنة المعادلة"]],d:"03:40"},
    uni:{p:"محاضرة فيديو 5 دقائق بأسلوب احترافي عن الميتوكوندريا مع رسوم توضيحية.",s:["تحويل المحاضرة إلى سيناريو مكثف","رسوم توضيحية علمية","تعليق صوتي احترافي ومونتاج"],i:[["🔬","تحت المجهر"],["🧬","بنية الميتوكوندريا"],["⚡","إنتاج ATP"],["📚","ملخص"]],d:"05:00"}
   }},
  {n:3,c:"#1FE0A0",type:"edit",date:"18.10.2026",time:"18:30–20:00",tool:"ChatGPT · Video Editing",
   title:"تعديل فيديوهات بأقوى الأدوات",
   desc:"قص، تحسين الصورة والصوت، ترجمة تلقائية، موسيقى، عناوين ومؤثرات؛ فيديو الجوال يصبح فيديو احترافيًا.",
   tags:["Video Editing","Subtitles","Voice","Music"], out:"قبل ← بعد",
   sims:{
    kg:{p:"خذ فيديو حصة الروضة المصوَّر بالجوال: احذف الأجزاء المشوشة، أضف موسيقى هادئة وعناوين ملونة.",s:["تحليل الفيديو وتحديد الأجزاء المشوشة","القص وتثبيت الصورة","موسيقى وعناوين ملونة"],i:["قص 4 مقاطع مشوشة","تثبيت الصورة","موسيقى أطفال هادئة","عناوين ملونة كبيرة"]},
    el:{p:"عدّل فيديو عرض الطلاب عن الكواكب: ترجمة تلقائية، تحسين الصوت، ومقدمة متحركة.",s:["تفريغ الكلام وترجمته","إزالة الضجيج من الصوت","إضافة مقدمة متحركة وصور"],i:["ترجمة تلقائية بالعربية","إزالة الضجيج","مقدمة متحركة","صور الكواكب فوق الشرح"]},
    mid:{p:"اختصر فيديو شرح مدته 20 دقيقة إلى 4 دقائق مع إبراز الخطوات المهمة.",s:["تحديد اللحظات المهمة","الاختصار والتكبير على اللوح","أسهم وفصول بالعناوين"],i:["اختصار 20 ← 4 دقائق","تكبير على اللوح","أسهم وإبراز","فصول بالعناوين"]},
    hs:{p:"حوّل تصوير التجربة إلى فيديو احترافي: تسريع، تعليق صوتي، وتحذيرات سلامة على الشاشة.",s:["تسريع الأجزاء الطويلة","تعليق صوتي بالذكاء الاصطناعي","لافتات سلامة ولقطات مقرّبة"],i:["تسريع الأجزاء الطويلة","تعليق صوتي","لافتات سلامة","لقطة مقرّبة للتفاعل"]},
    uni:{p:"حوّل تسجيل محاضرة Zoom إلى مقاطع قصيرة للطلاب مع ترجمة ثنائية اللغة.",s:["تقسيم المحاضرة حسب المواضيع","إزالة الصمت والتكرار","ترجمة عربي/إنجليزي"],i:["تقسيم إلى 6 مقاطع","ترجمة عربي/إنجليزي","إزالة الصمت","الشرائح بجانب المحاضر"]}
   }},
  {n:4,c:"#FF9A1F",type:"images",date:"25.10.2026",time:"18:30–20:00",tool:"Image Generation · Editing · Vision",
   title:"إنشاء وتعديل صور والمواد الدراسية بطريقة احترافية",
   desc:"إنشاء صورة، تعديل صورة موجودة، تغيير عناصرها وخلفيتها، قصة مصورة، بطاقات، أوراق عمل ومواد بصرية.",
   tags:["Image Generation","Image Editing","Vision"], out:"حقيبة مواد بصرية",
   sims:{
    kg:{p:"اصنع بطاقات ألوان بشخصية نونو، وغيّر خلفية الصورة إلى حديقة، وجهّز ورقة عمل للتلوين.",s:["تصميم شخصية نونو الثابتة","تعديل الخلفية وإنشاء البطاقات","ورقة عمل جاهزة للطباعة"],i:[["🐰","نونو باللون الأحمر"],["🌳","خلفية حديقة"],["🖍️","ورقة تلوين"],["🃏","بطاقات مطابقة"]]},
    el:{p:"أنشئ بطاقات للكواكب بأسلوب موحد، وملصقًا للصف، وورقة عمل مطابقة.",s:["أسلوب بصري موحد للكواكب","بطاقة لكل كوكب مع حقيقة","ملصق صفي وورقة عمل"],i:[["🪐","بطاقة لكل كوكب"],["🧩","لغز الكواكب"],["📄","ورقة عمل"],["🏷️","ملصق للصف"]]},
    mid:{p:"صمّم ورقة عمل مصورة للأشكال ثلاثية الأبعاد، وحوّل صورة السبورة إلى إنفوجرافيك واضح.",s:["قراءة صورة السبورة (Vision)","رسم المجسمات بمقاساتها","إنفوجرافيك وورقة عمل"],i:[["🧊","مكعب ومقاساته"],["🛢️","أسطوانة"],["📐","إنفوجرافيك الصيغ"],["📝","ورقة عمل"]]},
    hs:{p:"ارسم مخططات أدوات المختبر، وصحّح صورة تجربة مظلمة، واصنع قصة مصورة عن السلامة.",s:["رسم أدوات المختبر بأسمائها","تصحيح الإضاءة والألوان","قصة مصورة من 6 مربعات"],i:[["🧪","أدوات المختبر"],["💡","صورة مصحّحة"],["📖","قصة مصورة"],["⚠️","ملصق السلامة"]]},
    uni:{p:"حوّل رسم الخلية من الكتاب إلى رسم توضيحي احترافي مع أسماء الأجزاء، وشرائح بصرية للمحاضرة.",s:["قراءة الرسم الأصلي (Vision)","إعادة رسمه بدقة واحترافية","تسميات وشرائح للمحاضرة"],i:[["🧫","رسم الخلية"],["🏷️","أسماء العضيات"],["📊","مخطط مقارنة"],["🖼️","شرائح المحاضرة"]]}
   }},
  {n:5,c:"#9B5CFF",type:"site",date:"1.11.2026",time:"17:30–19:00",tool:"ChatGPT · Codex · Sites",
   title:"موقع إنترنت بطريقة حديثة وعصرية",
   desc:"من جملة واحدة إلى موقع تعليمي: صفحة درس، منصة صفية، لعبة، اختبار أو موقع لمشروع مدرسي، ثم تطويره بالمحادثة.",
   tags:["ChatGPT","Codex","Sites"], out:"موقع منشور برابط",
   sims:{
    kg:{p:"ابنِ موقعًا للأهالي عن وحدة الألوان: القصة، الفيديو، ولعبة ألوان بسيطة.",s:["تخطيط صفحات الموقع","بناء الموقع بـ Codex","نشر الموقع وإرسال الرابط"],site:"عالم نونو",tag:"موقع الأهالي لوحدة الألوان",i:["القصة","الفيديو","لعبة الألوان","للأهالي"]},
    el:{p:"موقع صفي للمجموعة الشمسية: صفحة لكل كوكب، اختبار قصير، ومعرض لأعمال الطلاب.",s:["تخطيط صفحات الموقع","بناء الموقع والاختبار","نشر الموقع ومشاركته"],site:"رحلة إلى الفضاء",tag:"موقع الصف الرابع",i:["الكواكب","اختبار قصير","معرض الطلاب","الفيديو"]},
    mid:{p:"منصة تمارين تفاعلية للحجوم مع تصحيح فوري ولوحة نقاط.",s:["تصميم بنك التمارين","برمجة التصحيح الفوري","لوحة نقاط ونشر"],site:"مختبر الحجوم",tag:"تمارين تفاعلية للصف الثامن",i:["شرح","تمارين","تصحيح فوري","لوحة النقاط"]},
    hs:{p:"موقع للوحدة: ملخصات، فيديوهات التجارب، وبنك أسئلة للبجروت.",s:["تنظيم المحتوى في أقسام","بناء بنك الأسئلة","نشر الموقع للطلاب"],site:"كيمياء 10",tag:"كل ما تحتاجه للوحدة",i:["ملخصات","التجارب","بنك أسئلة","مواعيد"]},
    uni:{p:"موقع للمساق: جدول الأسابيع، المواد، المراجع، ومنتدى أسئلة.",s:["هيكلة المساق","بناء الصفحات والمنتدى","نشر ومشاركة الرابط"],site:"بيولوجيا الخلية",tag:"موقع المساق — الفصل الأول",i:["الجدول","المواد","المراجع","أسئلة الطلاب"]}
   }},
  {n:6,c:"#22D3F5",type:"3d",date:"8.11.2026",time:"17:30–19:00",tool:"Codex · Coding · Web 3D",
   title:"تطبيقات ثلاثية الأبعاد",
   desc:"بناء تطبيق تعليمي 3D: مختبر علوم، جسم الإنسان، النظام الشمسي، الأشكال الهندسية، ونماذج تفاعلية يدوّرها الطالب بيده.",
   tags:["Codex","Coding","Web 3D"], out:"تجربة 3D تفاعلية (اسحب لتدوير)",
   sims:{
    kg:{p:"اصنع لعبة 3D: مكعب ألوان يدوّره الطفل ويختار اللون الذي يقوله نونو.",s:["تصميم المكعب والألوان","برمجة التدوير باللمس","صوت نونو ومكافأة عند الإجابة"],obj:"مكعب الألوان",i:["أحمر","أزرق","أصفر","أخضر","نونو","🐰"]},
    el:{p:"نموذج 3D للمجموعة الشمسية: الكواكب تدور، والنقر على كوكب يعرض معلوماته.",s:["نمذجة الكواكب ومداراتها","برمجة الدوران والنقر","بطاقات معلومات لكل كوكب"],obj:"مستكشف الكواكب",i:["عطارد","الأرض","المريخ","زحل","☀️","🪐"]},
    mid:{p:"تطبيق يدوّر المجسمات ويفرد المكعب إلى شبكته ويحسب الحجم مباشرة.",s:["نمذجة المجسمات","برمجة الفرد والتدوير","حساب الحجم لحظيًا"],obj:"مختبر المجسمات",i:["الطول 5","العرض 3","الارتفاع 4","الحجم 60","📐","🧊"]},
    hs:{p:"مختبر افتراضي: ركّب جزيئات الماء وثاني أكسيد الكربون بالسحب والإفلات.",s:["نماذج الذرات والروابط","السحب والإفلات لبناء الجزيء","فحص صحة الجزيء"],obj:"مختبر الجزيئات",i:["H₂O","CO₂","O₂","CH₄","⚗️","🧪"]},
    uni:{p:"محاكاة 3D للخلية يستكشف فيها الطالب العضيات ويقرأ وظيفة كل منها.",s:["نموذج الخلية وعضياتها","التكبير والتدوير","نافذة وظيفة لكل عضية"],obj:"الخلية التفاعلية",i:["النواة","الميتوكوندريا","الريبوسوم","جهاز جولجي","🧬","🔬"]}
   }},
  {n:7,c:"#FF4FD1",type:"final",date:"15.11.2026",time:"17:30–19:00",tool:"Work · Codex · Plugins · Automation",
   title:"المشروع الكبير والتكامل",
   desc:"كل التقنيات معًا: مشروع تعليمي كامل يبدأ بفكرة وينتهي بموقع أو تطبيق، ومواد وصور وفيديو، وأتمتة لسير العمل.",
   tags:["Work","Codex","Plugins","Browser","Images","Automation"], out:"مشروع تعليمي متكامل",
   sims:{
    kg:{p:"اجمع كل ما صنعناه في مشروع \"عالم نونو\"، وأرسل رابطه تلقائيًا للأهالي كل أسبوع.",s:["تجميع كل المواد في مشروع واحد","ربط الموقع باللعبة والفيديو","أتمتة رسالة أسبوعية للأهالي"],proj:"عالم نونو",auto:"رسالة أسبوعية للأهالي كل يوم أحد"},
    el:{p:"أكمل مشروع \"رحلة إلى الفضاء\"، وذكّر الطلاب تلقائيًا بموعد الاختبار.",s:["تجميع المواد والموقع والنموذج","فحص الروابط والمحتوى","تذكير تلقائي قبل الاختبار"],proj:"رحلة إلى الفضاء",auto:"تذكير تلقائي للطلاب قبل الاختبار"},
    mid:{p:"أكمل \"مختبر الحجوم\" مع تصحيح تلقائي للواجبات وتقرير أسبوعي لي.",s:["دمج التمارين والتطبيق","تصحيح تلقائي للواجبات","تقرير أسبوعي للمعلم"],proj:"مختبر الحجوم",auto:"تقرير أسبوعي بتقدم كل طالب"},
    hs:{p:"أكمل \"كيمياء 10\" مع بنك أسئلة يتجدد وتقارير تقدم الطلاب.",s:["دمج المختبر والموقع والفيديو","بنك أسئلة يتجدد تلقائيًا","تقارير تقدم الطلاب"],proj:"كيمياء 10",auto:"بنك أسئلة جديد كل أسبوع"},
    uni:{p:"حوّل المساق إلى مساق رقمي متكامل مع أتمتة الإعلانات وجمع الواجبات.",s:["دمج الموقع والمحاكاة والمحاضرات","أتمتة الإعلانات للطلاب","جمع الواجبات وتنظيمها"],proj:"بيولوجيا الخلية الرقمي",auto:"إعلانات وجمع واجبات تلقائي"}
   }}
];

/* ---------- ticker ---------- */
var tk = ["GPT-5.6","Thinking","Work","Plugins","Cloud Browser","Computer Use","Codex","Sites","Image Generation","Image Editing","Vision","Video","Web 3D","Automation"];
var row = $("tickerRow"); tk.concat(tk).forEach(function(t){ row.appendChild(el("span",null,t)); });

/* ---------- session cards ---------- */
var cards = $("sessionCards");
SESSIONS.forEach(function(s){
  var c = el("article","sc reveal"+(s.n===7?" final":"")); c.style.setProperty("--c", s.c);
  var n = el("div","n", String(s.n));
  var body = el("div");
  var h = el("h3",null,s.title);
  var d = el("p","d",s.desc);
  var tags = el("div","tags"); s.tags.forEach(function(t){ tags.appendChild(el("span","tag",t)); });
  body.appendChild(h); body.appendChild(d);
  var go = el("div","sim-go");
  LEVELS.forEach(function(L){
    var b = el("button",null,L.name); b.type="button";
    b.addEventListener("click",function(){ setSim(s.n-1, LEVELS.indexOf(L), true); $("simulator").scrollIntoView({behavior: reduce?"auto":"smooth"}); });
    go.appendChild(b);
  });
  var when = el("div","when");
  var w1 = el("span",null,"الأحد"); var w2 = el("b",null,s.date+" · "+s.time); w2.dir="ltr";
  when.appendChild(w1); when.appendChild(w2);
  if(s.n===7){ c.appendChild(n); c.appendChild(body); body.appendChild(tags); var side=el("div"); side.appendChild(go); side.appendChild(when); side.style.flex="0 1 320px"; c.appendChild(side); when.style.marginTop="12px"; }
  else { c.appendChild(n); c.appendChild(body); c.appendChild(tags); c.appendChild(go); c.appendChild(when); }
  cards.appendChild(c);
  // 3D tilt
  if(!reduce){
    c.addEventListener("pointermove",function(e){ var r=c.getBoundingClientRect(); var x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5; c.style.transform="rotateY("+(x*10)+"deg) rotateX("+(-y*10)+"deg) translateZ(0)"; });
    c.addEventListener("pointerleave",function(){ c.style.transform=""; });
  }
});

/* ---------- schedule ---------- */
var sched = $("sched");
SESSIONS.forEach(function(s){
  var d = el("div","day"); d.style.setProperty("--c", s.c);
  d.appendChild(el("span","no",String(s.n)));
  d.appendChild(el("div","dn","الأحد"));
  d.appendChild(el("div","dt",s.date.replace(".2026","")));
  d.appendChild(el("div","tm",s.time));
  sched.appendChild(d);
});

/* ---------- simulator ---------- */
var cur = {s:0, l:1}, timers = [];
var simS = $("simSessions"), simL = $("simLevels");
SESSIONS.forEach(function(s,i){
  var b = el("button","chip",s.n+". "+s.title.split(" ").slice(0,3).join(" ")); b.type="button"; b.style.setProperty("--c", s.c);
  b.addEventListener("click",function(){ setSim(i, cur.l, true); }); simS.appendChild(b);
});
LEVELS.forEach(function(L,i){
  var b = el("button","chip",L.name); b.type="button";
  b.addEventListener("click",function(){ setSim(cur.s, i, true); }); simL.appendChild(b);
});
$("replay").addEventListener("click",function(){ setSim(cur.s, cur.l, true); });

function clearTimers(){ timers.forEach(clearTimeout); timers=[]; }
function later(fn,ms){ timers.push(setTimeout(fn,ms)); }

function buildView(s, L, d){
  var v = $("view"); v.innerHTML=""; v.className="view";
  var wrap;
  if(s.type==="plan"){
    wrap = el("div","v-list"); d.i.forEach(function(t){ wrap.appendChild(el("div","it",t)); });
    var br = el("div","v-browser"); var u = el("div","url","https://"+d.u); var pg = el("div","pg");
    pg.appendChild(el("i")); pg.appendChild(el("i")); pg.appendChild(el("i"));
    var cu = el("div","cursor"); cu.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18"><path d="M3 2l7 19 2.5-8L21 10z" fill="#fff" stroke="#0B1136" stroke-width="1.5"/></svg>';
    pg.appendChild(cu); br.appendChild(u); br.appendChild(pg);
    v.appendChild(wrap); v.appendChild(br);
  } else if(s.type==="video"){
    wrap = el("div","v-story");
    d.i.forEach(function(f,j){ var fr=el("div","frame"); fr.appendChild(el("span","no","0"+(j+1))); var em=el("span","em",f[0]); em.style.animationDelay=(-j*.6)+"s"; fr.appendChild(em); fr.appendChild(el("span","cap",f[1])); wrap.appendChild(fr); });
    var pl = el("div","player"); pl.appendChild(el("span","pl","▶")); var b2=el("div","bar2"); b2.appendChild(el("i")); pl.appendChild(b2); pl.appendChild(el("span","t","00:00 / "+d.d));
    v.appendChild(wrap); v.appendChild(pl);
  } else if(s.type==="edit"){
    wrap = el("div","v-edit");
    var ba = el("div","ba"); ba.appendChild(el("div","b","قبل")); ba.appendChild(el("div","a","بعد"));
    var tr = el("div","tracks");
    [["VIDEO",[[2,30],[36,28],[68,30]]],["VOICE",[[4,90]]],["MUSIC",[[0,100]]],["TEXT",[[6,14],[40,16],[72,18]]]].forEach(function(t){
      var r=el("div","track"); r.appendChild(el("span",null,t[0])); var ln=el("div","lane");
      t[1].forEach(function(seg){ var i=el("i"); i.style.left=seg[0]+"%"; i.style.width=seg[1]+"%"; ln.appendChild(i); }); r.appendChild(ln); tr.appendChild(r);
    });
    var fx = el("div","fx"); d.i.forEach(function(t){ fx.appendChild(el("span",null,"✓ "+t)); });
    wrap.appendChild(ba); wrap.appendChild(tr); wrap.appendChild(fx); v.appendChild(wrap);
  } else if(s.type==="images"){
    wrap = el("div","v-cards");
    d.i.forEach(function(c){ var pc=el("div","pc"); pc.appendChild(el("div","art",c[0])); pc.appendChild(el("b",null,c[1])); wrap.appendChild(pc); });
    v.appendChild(wrap);
  } else if(s.type==="site"){
    wrap = el("div","v-site");
    var top = el("div","top"); top.appendChild(el("b",null,d.site)); var nv=el("span"); ["الرئيسية","عن الوحدة","تواصل"].forEach(function(t){ nv.appendChild(el("span",null,t)); }); top.appendChild(nv);
    var hs = el("div","heroS",d.site); hs.appendChild(el("small",null,d.tag));
    var g = el("div","grid"); d.i.forEach(function(t){ g.appendChild(el("div",null,t)); });
    wrap.appendChild(top); wrap.appendChild(hs); wrap.appendChild(g); v.appendChild(wrap);
  } else if(s.type==="3d"){
    wrap = el("div","v-3d");
    var cube = el("div","cube"+(reduce?"":" auto"));
    d.i.forEach(function(t,j){ cube.appendChild(el("div","f"+(j+1),t)); });
    wrap.appendChild(el("div","name",d.obj)); wrap.appendChild(cube); wrap.appendChild(el("div","hint","اسحب بالماوس أو بالإصبع لتدوير النموذج"));
    v.appendChild(wrap);
    var rx=-22, ry=30, dragging=false, px=0, py=0;
    wrap.addEventListener("pointerdown",function(e){ dragging=true; px=e.clientX; py=e.clientY; cube.classList.remove("auto"); try{wrap.setPointerCapture(e.pointerId);}catch(_){} });
    wrap.addEventListener("pointermove",function(e){ if(!dragging) return; ry+=(e.clientX-px)*.6; rx-=(e.clientY-py)*.6; px=e.clientX; py=e.clientY; cube.style.transform="rotateX("+rx+"deg) rotateY("+ry+"deg)"; });
    wrap.addEventListener("pointerup",function(){ dragging=false; });
    wrap.addEventListener("pointercancel",function(){ dragging=false; });
  } else if(s.type==="final"){
    wrap = el("div","v-final");
    wrap.appendChild(el("div","proj",d.proj));
    var tiles = el("div","tiles");
    [["🧭","الخطة"],["🎨","الصور والمواد"],["🎬","الفيديو"],["🌐","الموقع"],["🧊","تجربة 3D"],["⚙️","الأتمتة"]].forEach(function(t){ var ti=el("div","tile"); ti.appendChild(el("i",null,t[0])); ti.appendChild(el("span",null,t[1])); tiles.appendChild(ti); });
    var fl = el("div","flow"); fl.appendChild(el("span",null,"⚡")); var fb=el("span"); fb.appendChild(el("b",null,"أتمتة: ")); fb.appendChild(document.createTextNode(d.auto)); fl.appendChild(fb);
    wrap.appendChild(tiles); wrap.appendChild(fl); v.appendChild(wrap);
  }
}

function setSim(si, li, animate){
  clearTimers();
  cur.s=si; cur.l=li;
  var s = SESSIONS[si], L = LEVELS[li], d = s.sims[L.k];
  $("sim").style.setProperty("--c", s.c);
  Array.prototype.forEach.call(simS.children,function(b,j){ b.setAttribute("aria-pressed", j===si?"true":"false"); });
  Array.prototype.forEach.call(simL.children,function(b,j){ b.setAttribute("aria-pressed", j===li?"true":"false"); b.style.setProperty("--c", s.c); });
  $("simTool").textContent = s.tool;
  $("outTitle").textContent = s.out;
  $("outSub").textContent = L.name+" · "+L.topic;
  var steps = $("simSteps"); steps.innerHTML="";
  d.s.forEach(function(t){ var li2=el("li"); li2.appendChild(el("span","ic","")); li2.appendChild(el("span",null,t)); steps.appendChild(li2); });
  buildView(s, L, d);
  var P = $("simPrompt"), view=$("view"), caret=$("caret");
  if(!animate || reduce){
    P.textContent = d.p; caret.hidden = true;
    Array.prototype.forEach.call(steps.children,function(x){ x.className="on ok"; x.firstChild.textContent="✓"; });
    view.classList.add("show"); return;
  }
  P.textContent=""; caret.hidden=false;
  var i=0, txt=d.p;
  (function type(){ i+=2; P.textContent = txt.slice(0,i); if(i<txt.length) later(type,22); else runSteps(); })();
  function runSteps(){
    caret.hidden=true;
    var items = steps.children, k=0;
    (function next(){
      if(k>0){ items[k-1].className="on ok"; items[k-1].firstChild.textContent="✓"; }
      if(k<items.length){ items[k].className="on run"; k++; later(next,850); }
      else view.classList.add("show");
    })();
  }
}
setSim(0,1,false);
// play the first simulation once it scrolls into view
if("IntersectionObserver" in window && !reduce){
  var played=false;
  new IntersectionObserver(function(es,ob){ es.forEach(function(e){ if(e.isIntersecting && !played){ played=true; setSim(cur.s,cur.l,true); ob.disconnect(); } }); },{threshold:.35}).observe($("sim"));
}

/* ---------- countdown (first session: 4.10.2026 18:30 Israel time, UTC+3) ---------- */
var target = Date.parse("2026-10-04T18:30:00+03:00");
function pad(n){ return (n<10?"0":"")+n; }
function tick(){
  var ms = target - Date.now();
  if(ms<=0){ $("countdown").innerHTML=""; $("countdown").appendChild(el("span","pill","الدورة انطلقت! تواصل معنا للانضمام")); return false; }
  var s=Math.floor(ms/1000);
  $("cdD").textContent=Math.floor(s/86400); $("cdH").textContent=pad(Math.floor(s%86400/3600)); $("cdM").textContent=pad(Math.floor(s%3600/60)); $("cdS").textContent=pad(s%60);
  return true;
}
if(tick()) setInterval(tick,1000);

/* ---------- reveal on scroll (content is visible at rest; this only adds a lift) ---------- */
if("IntersectionObserver" in window && !reduce){
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.remove("pre"); io.unobserve(e.target); } }); },{threshold:.1});
  document.querySelectorAll(".reveal").forEach(function(r){ var rect=r.getBoundingClientRect(); if(rect.top>innerHeight){ r.classList.add("pre"); io.observe(r); } });
}

/* ---------- copy phone ---------- */
$("copyBtn").addEventListener("click",function(){
  var msg=$("copied");
  function fallback(){ var r=document.createRange(); r.selectNodeContents($("phone")); var sel=getSelection(); sel.removeAllRanges(); sel.addRange(r); msg.textContent="الرقم محدد، اضغط Ctrl+C للنسخ"; }
  try{ navigator.clipboard.writeText("0526710819").then(function(){ msg.textContent="تم نسخ الرقم"; },fallback); }catch(e){ fallback(); }
});

/* ---------- registration + pre-payment upsell ---------- */
var COURSES = [
  {id:"chatgpt",name:"ChatGPT 2026 — الأقوى",price:720,fixed:true},
  {id:"claude",name:"كلاود (Claude) للمبتدئين",price:650},
  {id:"claude-adv",name:"كلاود (Claude) للمتقدمين",price:650},
  {id:"spark",name:"جوجل سبارك (Google Spark)",price:650}
];
var lead = null;
var RETURNING_CODE="RAMI20";
function discountFor(nth){ if(lead && lead.prev_participant) return 20; return nth>=3?20:(nth===2?10:0); }
function renderPick(){
  var pick=$("pick"); pick.innerHTML="";
  COURSES.forEach(function(c){
    var lb=el("label",c.fixed?"fixed":null); var cb=el("input"); cb.type="checkbox"; cb.id="c-"+c.id; cb.value=c.id;
    if(c.fixed){ cb.checked=true; cb.disabled=true; } else { cb.addEventListener("change",calc); }
    lb.appendChild(cb); lb.appendChild(el("span",null,c.name)); var pp=el("span","pp"); pp.id="pp-"+c.id; lb.appendChild(pp);
    pick.appendChild(lb);
  });
  calc();
}
function calc(){
  // full price on the priciest course, then 10% on the 2nd and 20% on the 3rd onward (cheaper ones get the bigger discount)
  var chosen=COURSES.filter(function(c){ return $("c-"+c.id).checked; }).sort(function(a,b){ return b.price-a.price; });
  var full=0,total=0;
  COURSES.forEach(function(c){ $("pp-"+c.id).textContent="₪"+c.price; });
  chosen.forEach(function(c,i){ var off=discountFor(i+1), p=Math.round(c.price*(100-off)/100); full+=c.price; total+=p;
    var pp=$("pp-"+c.id); pp.textContent=""; if(off){ pp.appendChild(el("s",null,c.price+"")); } pp.appendChild(document.createTextNode(" ₪"+p+(off?"  −"+off+"%":""))); });
  $("total").textContent=total+" ₪";
  var n=chosen.length;
  var ret = lead && lead.prev_participant;
  $("save").textContent = ret ? "كود "+RETURNING_CODE+": وفّرت "+(full-total)+" ₪ · خصم 20% على كل دورة تضيفها" : (n===1 ? "أضف دورة واحدة ووفّر 10% عليها، أو دورتين ووفّر حتى 20%." : "رائع! وفّرت "+(full-total)+" ₪"+(n===2?" · أضف دورة ثالثة ووفّر 20% عليها":""));
  var names=chosen.map(function(c){ return c.name; }).join("، ");
  var txt="مرحبًا، أريد التسجيل"+(lead?"\nالاسم: "+lead.full_name+"\nالهاتف: "+lead.phone+"\nالبريد: "+lead.email+"\nالمرحلة: "+lead.level:"")+(lead&&lead.discount_code?"\nكود الخصم: "+lead.discount_code+" (مشارك/ة سابق/ة)":"")+"\nالدورات: "+names+"\nالمجموع بعد الخصم: "+total+" ₪";
  $("prepayWa").href=waLink(txt);
}
function showPrepay(msg){
  $("prepayOk").textContent=msg;
  $("regForm").hidden=true; $("prepay").hidden=false;
  if(lead && lead.prev_participant){ $("prepayIntro").textContent="كمشارك/ة سابق/ة لك خصم 20% على كل دورة بكود "+RETURNING_CODE+"، بما فيها ChatGPT 2026. أضف دورات أخرى بنفس الخصم:"; }
  renderPick();
  $("prepay").scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
}
function togglePrev(){ $("codeCard").hidden=!$("prev-yes").checked; $("formMsg").textContent=""; }
$("prev-yes").addEventListener("change",togglePrev); $("prev-no").addEventListener("change",togglePrev);
$("codeBtn").addEventListener("click",function(){ var b=this; try{ navigator.clipboard.writeText(RETURNING_CODE).then(function(){ b.textContent="✓ نُسخ"; setTimeout(function(){ b.textContent=RETURNING_CODE; },1400); }); }catch(e){} });
$("regForm").addEventListener("submit",function(e){
  e.preventDefault();
  var f=e.target, msg=$("formMsg"), btn=$("submitBtn");
  var isPrev=$("prev-yes").checked;
  var data={ full_name:f.full_name.value.trim(), phone:f.phone.value.trim(), email:$("f-email").value.trim().toLowerCase(), level:f.level.value, school:f.school.value.trim()||null, notes:f.notes.value.trim()||null, prev_participant:isPrev, discount_code:isPrev?RETURNING_CODE:null };
  if(data.full_name.length<2){ msg.className="form-msg err"; msg.textContent="اكتب الاسم الكامل."; f.full_name.focus(); return; }
  if(data.phone.replace(/\D/g,"").length<9){ msg.className="form-msg err"; msg.textContent="اكتب رقم هاتف صحيح (9 أرقام على الأقل)."; f.phone.focus(); return; }
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)){ msg.className="form-msg err"; msg.textContent="اكتب بريدًا إلكترونيًا صحيحًا."; $("f-email").focus(); return; }
  if(!$("prev-yes").checked && !$("prev-no").checked){ msg.className="form-msg err"; msg.textContent="أجب: هل شاركت في دورة سابقة معنا؟"; $("prev-yes").focus(); return; }
  lead=data;
  if(!CFG.supabaseUrl || !CFG.supabaseAnonKey){ showPrepay("✓ خطوة أخيرة قبل الدفع"); return; }
  btn.disabled=true; btn.textContent="جارٍ الإرسال…";
  fetch(CFG.supabaseUrl.replace(/\/$/,"")+"/rest/v1/chatgpt26_registrations",{method:"POST",headers:{"Content-Type":"application/json","apikey":CFG.supabaseAnonKey,"Authorization":"Bearer "+CFG.supabaseAnonKey,"Prefer":"return=minimal"},body:JSON.stringify(data)})
    .then(function(r){ if(!r.ok) throw new Error(r.status); showPrepay("✓ تم استلام بياناتك، سنتواصل معك قريبًا"); })
    .catch(function(){ showPrepay("✓ خطوة أخيرة: أكمل التسجيل أو أرسل اختيارك عبر واتساب"); })
    .then(function(){ btn.disabled=false; btn.textContent="أرسل طلب التسجيل"; });
});

/* ---------- hero 3D scene ---------- */
(function(){
  var stage=$("stage"), canvas=$("scene");
  if(!window.THREE) return;
  var renderer;
  try{ renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true, alpha:true}); }catch(e){ return; }
  stage.classList.add("gl");
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
  var scene=new THREE.Scene(), cam=new THREE.PerspectiveCamera(45,1,.1,100); cam.position.set(0,0,9);
  scene.add(new THREE.AmbientLight(0x404080,1.2));
  var l1=new THREE.PointLight(0xFF4FD1,2.2,30); l1.position.set(5,4,6); scene.add(l1);
  var l2=new THREE.PointLight(0x22D3F5,2.2,30); l2.position.set(-6,-3,5); scene.add(l2);
  var l3=new THREE.PointLight(0x9B5CFF,1.6,30); l3.position.set(0,6,-4); scene.add(l3);

  var group=new THREE.Group(); scene.add(group);
  var knotGeo=new THREE.TorusKnotGeometry(1.45,.42,220,28,2,3);
  var knot=new THREE.Mesh(knotGeo,new THREE.MeshStandardMaterial({color:0x2A2F8F,metalness:.75,roughness:.22,emissive:0x1A0F4A}));
  group.add(knot);
  var wire=new THREE.Mesh(knotGeo,new THREE.MeshBasicMaterial({color:0xFF4FD1,wireframe:true,transparent:true,opacity:.14}));
  wire.scale.setScalar(1.02); group.add(wire);

  // seven session orbs
  var orbs=[];
  SESSIONS.forEach(function(s,i){
    var col=new THREE.Color(s.c);
    var m=new THREE.Mesh(new THREE.SphereGeometry(.2,24,24),new THREE.MeshStandardMaterial({color:col,emissive:col,emissiveIntensity:.9,roughness:.3}));
    var halo=new THREE.Mesh(new THREE.SphereGeometry(.34,20,20),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.18}));
    m.add(halo); scene.add(m);
    orbs.push({m:m,a:i/7*Math.PI*2,r:3.1+(i%2)*.35,tilt:(i%3-1)*.35,sp:.25+i*.02});
  });
  // ring
  var ring=new THREE.Mesh(new THREE.TorusGeometry(3.25,.012,8,160),new THREE.MeshBasicMaterial({color:0x22D3F5,transparent:true,opacity:.35}));
  ring.rotation.x=Math.PI/2.3; scene.add(ring);
  // stars
  var N=500, pos=new Float32Array(N*3);
  for(var i=0;i<N;i++){ var r=6+Math.random()*10, t=Math.random()*Math.PI*2, p=Math.acos(2*Math.random()-1); pos[i*3]=r*Math.sin(p)*Math.cos(t); pos[i*3+1]=r*Math.sin(p)*Math.sin(t); pos[i*3+2]=r*Math.cos(p)-4; }
  var sg=new THREE.BufferGeometry(); sg.setAttribute("position",new THREE.BufferAttribute(pos,3));
  var stars=new THREE.Points(sg,new THREE.PointsMaterial({color:0xC9CEFF,size:.05,transparent:true,opacity:.8})); scene.add(stars);

  var mx=0,my=0;
  window.addEventListener("pointermove",function(e){ mx=e.clientX/innerWidth-.5; my=e.clientY/innerHeight-.5; });
  function resize(){ var w=stage.clientWidth,h=stage.clientHeight; renderer.setSize(w,h,false); cam.aspect=w/h; cam.updateProjectionMatrix(); }
  resize(); window.addEventListener("resize",resize);
  var t0=performance.now(), visible=true;
  if("IntersectionObserver" in window) new IntersectionObserver(function(es){ visible=es[0].isIntersecting; }).observe(stage);
  function frame(now){
    requestAnimationFrame(frame);
    if(!visible) return;
    var t=(now-t0)/1000*(reduce?0:1);
    group.rotation.x=t*.18+my*.6; group.rotation.y=t*.26+mx*.8;
    stars.rotation.y=t*.02;
    ring.rotation.z=t*.1;
    orbs.forEach(function(o){ var a=o.a+t*o.sp; o.m.position.set(Math.cos(a)*o.r, Math.sin(a*1.3)*.5+o.tilt*Math.sin(a)*2, Math.sin(a)*o.r*.55); });
    cam.position.x+=(mx*1.2-cam.position.x)*.05; cam.position.y+=(-my*1.2-cam.position.y)*.05; cam.lookAt(0,0,0);
    renderer.render(scene,cam);
  }
  requestAnimationFrame(frame);
})();
})();
