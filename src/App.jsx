import React, { useState, useMemo } from 'react';

const TEMPLATE_INFO = {
  title: "المنصة التاريخية الأرشيفية لمنظمة Ropme",
  subtitle: "أرشيف تفاعلي يجمع ويوثق أنشطة وسجلات حماية البيئة البحرية حسب السنوات المفصلية",
};

const CATEGORIES = [
  { id: 'الكل', name: 'جميع المجالات', color: 'bg-[#8b4513]', borderColor: 'border-[#8b4513]' },
  { id: 'legal', name: 'اتفاقيات وبروتوكولات قانونية', color: 'bg-[#a0522d]', borderColor: 'border-[#a0522d]' },
  { id: 'env', name: 'بعثات وحملات بيئية', color: 'bg-[#cd853f]', borderColor: 'border-[#cd853f]' },
  { id: 'admin', name: 'مؤتمرات وقرارات إدارية', color: 'bg-[#5c4033]', borderColor: 'border-[#5c4033]' },
];

const ERAS = [
  { id: 'الكل', name: 'عرض جميع الفترات التاريخية' },
  { id: 'era_1', name: 'مرحلة التأسيس والبروتوكولات الأولى (1978 - 1989)' },
  { id: 'era_2', name: 'مرحلة الأزمات البيئية وإعادة التأهيل (1990 - 2005)' },
  { id: 'era_3', name: 'الألفية الجديدة واستدامة العمل المشترك (+2006)' },
];

const ARCHIVE_BY_YEARS = {
  "1978": {
    era: "era_1",
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img3.jpg",
    activities: [
      { id: "1978-1", title: "خطة العمل لحماية وتنمية البيئة البحرية والمناطق الساحلية", type: "كتيب / خطة عمل", typeKey: "legal", docType: "Hard Copy / كتيب", desc: "خطة العمل المعتمدة لحماية وتنمية البيئة البحرية والمناطق الساحلية للبحرين وإيران والعراق والكويت وعمان وقطر والمملكة العربية السعودية والإمارات العربية المتحدة. تم صياغتها في الكويت من 15-23 أبريل 1978 م[cite: 5]." },
      { id: "1978-2", title: "اتفاقية الكويت الإقليمية للتعاون في حماية البيئة من التلوث", type: "معاهدة رسمية", typeKey: "legal", docType: "Hard Copy / كتيب", desc: "اتفاقية الكويت الإقليمية التاريخية الموقعة في 24/4/1978 م للتعاون المشترك في حماية البيئة البحرية من التلوث بين الدول الثماني المطلة على المنطقة البحرية[cite: 5]." },
      { id: "1978-3", title: "البروتوكول الخاص بالتعاون الإقليمي للمكافحة في الحالات الطارئة", type: "بروتوكول قانوني", typeKey: "legal", docType: "Hard Copy / كتيب", desc: "البروتوكول الخاص بالتعاون الإقليمي لمكافحة التلوث بالزيت والمواد الضارة الأخرى في حالات الطوارئ البحرية المعتمد في أبريل 1978 م[cite: 5]." },
      { id: "1978-4", title: "الوثيقة الختامية للمؤتمر الإقليمي للمفوضين لحماية البيئة البحرية", type: "وثيقة ختامية", typeKey: "admin", docType: "Hard Copy", desc: "البيان والوثيقة الختامية (Final Act) للمؤتمر الإقليمي للمفوضين لحماية وتطوير البيئة البحرية والمناطق الساحلية المنعقد بالكويت 15-23 أبريل 1978 م[cite: 5]." }
    ]
  },
  "1979": {
    era: "era_1",
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img1.jpg",
    activities: [
      { id: "1979-1", title: "اجتماع الخبراء الحكوميين بشأن المشاريع التعاونية لخطة عمل الكويت", type: "اجتماع خبراء", typeKey: "admin", docType: "Hard Copy / تقرير", desc: "Meeting of Government Experts on Co-operative Projects of the Kuwait Action Plan. عُقد في دولة الكويت من 19-22 نوفمبر 1979 م[cite: 5]." },
      { id: "1979-2", title: "اجتماع الخبراء لإنشاء مركز المساعدة المتبادلة للطوارئ البحرية (MEMAC)", type: "تقرير تأسيسي", typeKey: "admin", docType: "Hard Copy / تقرير", desc: "Meeting of Experts on the Establishment of the Marine Emergency Mutual Aid Centre (MEMAC). عُقد في مملكة البحرين من 2-5 ديسمبر 1979 م لوضع حجر الأساس[cite: 5]." }
    ]
  },
  "1980": {
    era: "era_1",
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img2.jpg",
    activities: [
      { id: "1980-1", title: "تقارير الأنشطة التنموية والاجتماعية والاقتصادية وآثارها البيئية", type: "سلسلة تقارير بيئية", typeKey: "env", docType: "Hard Copy / تقرير", desc: "مجموعة تقارير مسحية شاملة أعدت في عهد المنظمة لتتبع الأنشطة التنموية وآثارها البيئية الكبرى في دولة الكويت، مملكة البحرين، ودولة قطر في الفترة من مارس إلى أبريل 1980 م[cite: 5]." },
      { id: "1980-2", title: "برنامج الأرصاد الجوية البحرية الإقليمي - الدورة الأولى للمجلس المؤقت", type: "تقرير فني", typeKey: "env", docType: "Hard Copy / تقرير", desc: "Regional Marine Meteorological Program Interim Board - First Session. انعقدت الجلسة في الفترة من 29-30 مايو 1980 م لتأسيس شبكة رصد الطقس البحري[cite: 5]." },
      { id: "1980-3", title: "مسح مصادر التلوث البرية والصناعية والمنزلية في دول المنطقة", type: "مسح ميداني", typeKey: "env", docType: "Hard Copy / تقرير", desc: "تقارير المسح الشامل لمصادر التلوث الصناعي والمنزلي والصلب وتأثيراتها على المياه الساحلية في الكويت، البحرين، قطر، عمان، شرق السعودية، وجنوب العراق والإمارات (سبتمبر - ديسمبر 1980 م)[cite: 5]." }
    ]
  },
  "1981": {
    era: "era_1",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80",
    activities: [
      { id: "1981-1", title: "الاجتماع الأول لمجلس المنظمة الإقليمية لحماية البيئة البحرية (First ROPME Council)", type: "اجتماع وزاري", typeKey: "admin", docType: "Hard Copy / تقرير", desc: "الاجتماع الرسمي التاريخي الأول لمجلس وزراء المنظمة الإقليمية لحماية البيئة البحرية، عُقد في الكويت من 21-23 أبريل 1981 م لإقرار الأنظمة الداخلية واللوائح[cite: 5]." },
      { id: "1981-2", title: "النظام الأساسي للهيئة القضائية لفض المنازعات البيئية البحرية", type: "وثيقة تشريعية", typeKey: "legal", docType: "Hard Copy / مرسوم", desc: "Statute of the Judicial Commission for the Settlement of Disputes. تم إقراره في أبريل 1981 م لتنظيم الجوانب القانونية والقضائية بين الدول الأعضاء[cite: 5]." },
      { id: "1981-3", title: "النص غير الرسمي للنظام الداخلي لمجلس المنظمة الإقليمية", type: "كتيب تنظيمي", typeKey: "legal", docType: "Hard Copy / كتيب", desc: "إصدار الكتيب الرسمي المنظم للاجتماعات والآليات التنفيذية لمجلس المنظمة لعام 1981 م مع توفير النسخة الإنجليزية المعتمدة[cite: 5]." }
    ]
  },
  "1982": {
    era: "era_1",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80",
    activities: [
      { id: "1982-1", title: "اتفاقيات ومذكرات تفاهم برنامج رصد وبحوث التلوث البحري (18 شھراً)", type: "مذكرات تفاهم", typeKey: "legal", docType: "Hard Copy / مذكرات", desc: "توقيع اتفاقيات برنامج المراقبة والبحوث الخاص بالتلوث البحري لمدة 18 شهراً بين ROPME والجهات المعتمدة في العراق، عمان، البحرين، والإمارات (أبريل - سبتمبر 1982 م)[cite: 5]." },
      { id: "1982-2", title: "الاجتماع الأول لخبراء مرافق الاستقبال ومخلفات السفن", type: "اجتماع خبراء", typeKey: "admin", docType: "Hard Copy / تقرير", desc: "First Experts Meeting on Reception Facilities. عُقد في الكويت من 9-11 أكتوبر 1982 م لدراسة تخلص السفن من الفضلات[cite: 5]." },
      { id: "1982-3", title: "إصدار العدد الأول من نشرة 'آفاق البحار' الدورية", type: "نشرة دورية", typeKey: "admin", docType: "Hard Copy / مجلة", desc: "نشرة دورية متخصصة تصدر عن المنظمة الإقليمية لحماية البيئة البحرية، صدر العدد الأول منها في أكتوبر 1982 م لتوعية الرأي العام[cite: 5]." }
    ]
  },
  "1983": {
    era: "era_1",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&q=80",
    activities: [
      { id: "1983-1", title: "الاجتماعات الفنية الطارئة بشأن حادثة تسرب بقعة زيت نوروز (Nowruz)", type: "تقرير طوارئ", typeKey: "env", docType: "Hard Copy / تقرير", desc: "Technical Meetings on Nowruz Oil Spill Incident. عُقدت عدة اجتماعات فنية في البحرين والكويت بين أبريل ويونيو 1983 م لإدارة ومعالجة التلوث النفطي المدمر[cite: 5]." },
      { id: "1983-2", title: "الدورة التدريبية الإقليمية حول جمع ومعالجة البيانات البحرية - الدوحة", type: "ورشة عمل تدريبية", typeKey: "env", docType: "Hard Copy / ألبوم", desc: "ROPME/IOC/UNEP Training Workshop on Oceanographic Sampling, Analysis, Data Handling. عُقدت في قطر من 3-17 ديسمبر 1983 م لتأهيل الكوادر الوطنية على استخدام الأجهزة الحديثة[cite: 5]." }
    ]
  },
  "1984": {
    era: "era_1",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=600&q=80",
    activities: [
      { id: "1984-1", title: "الاجتماع القانوني الفني حول بروتوكول حماية البيئة البحرية من مصادر البر", type: "اجتماع قانوني", typeKey: "legal", docType: "Hard Copy", desc: "الاجتماع القانوني الفني حول البروتوكول الخاص بحماية المنطقة البحرية من التلوث من مصادر البر، عُقد في البحرين من 13-17 فبراير 1984 م والاجتماع الثاني في الكويت في ديسمبر 1984 م[cite: 5]." },
      { id: "1984-2", title: "مسابقة الصور الفوتوغرافية الأولى للدول الأعضاء في منظمة حماية البيئة", type: "فعالية ثقافية", typeKey: "admin", docType: "Hard Copy / كتيب", desc: "إطلاق مسابقة وكتيب الصور الفوتوغرافية للبيئة في دول المنظمة بمناسبة يوم البيئة الإقليمي في 24 أبريل 1984 م لتعزيز الوعي الاجتماعي[cite: 5]." },
      { id: "1984-3", title: "الاجتماع الثالث لمجلس المنظمة الإقليمية (Third Meeting of ROPME Council)", type: "اجتماع مجلس وزاري", typeKey: "admin", docType: "Hard Copy", desc: "انعقاد الاجتماع الثالث لمجلس المنظمة في مقر الأمانة العامة بالكويت من 24-25 أبريل 1984 م لمتابعة لجان دراسة الملوثات والميزانيات[cite: 5]." }
    ]
  }
};

const GALLERY_IMAGES = [
  { id: 1, year: "1978 م", title: "مؤتمر المفوضين التاريخي في الكويت واطلاق ميثاق العمل البيئي الأول", url: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img3.jpg", desc: "اللحظات الأولى لتوقيع معاهدة حماية المنطقة البحرية المشتركة من قبل الدول الثماني الأعضاء وتدشين الأمانة العامة[cite: 5]." },
  { id: 2, year: "1982 م", title: "تجهيز وتشييد الكيان العملياتي لمركز المساعدة المتبادلة MEMAC", url: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img1.jpg", desc: "إرساء غرف المراقبة والاتصال البرقي لتلقي بلاغات انسكابات الزيت والمواد الكيميائية الضارة الناتجة عن السفن[cite: 5]." },
  { id: 3, year: "1985 م", title: "بعثات الرصد الحقلي البيئي لمصادر التلوث البرية والصناعية", url: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img2.jpg", desc: "أخذ الفحوصات المخبرية لدرجات حرارة المياه والرواسب القاعية لحماية مصايد الأسماك والأنظمة الإيكولوجية الساحلية[cite: 5]." },
];

const MEMBER_STATES = [
  { name: "دولة الكويت", flag: "🇰🇼" },
  { name: "المملكة العربية السعودية", flag: "🇸🇦" },
  { name: "دولة الإمارات العربية المتحدة", flag: "🇦🇪" },
  { name: "سلطنة عمان", flag: "🇴🇲" },
  { name: "دولة قطر", flag: "🇶🇦" },
  { name: "مملكة البحرين", flag: "🇧🇭" },
  { name: "جمهورية العراق", flag: "🇮🇶" },
  { name: "جمهورية إيران الإسلامية", flag: "🇮🇷" },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedYear, setSelectedYear] = useState('1978');
  const [selectedActivityModal, setSelectedActivityModal] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const activeYearData = ARCHIVE_BY_YEARS[selectedYear] || { activities: [] };
  
  const filteredActivities = useMemo(() => {
    return activeYearData.activities.filter(act => {
      const matchesSearch = act.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            act.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'الكل' || act.typeKey === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [selectedYear, searchTerm, selectedCategory]);

  const bgThemeClass = darkMode 
    ? 'bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950' 
    : 'bg-[#f8f1e5] text-[#3e2723] selection:bg-amber-800 selection:text-amber-50';

  const cardThemeClass = darkMode
    ? 'bg-slate-900 border-slate-800 hover:border-amber-400/80 shadow-md text-white'
    : 'bg-[#f1e6d2] border-[#dac9ad] hover:border-amber-800/80 shadow-sm text-[#3e2723]';

  const inputThemeClass = darkMode
    ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-amber-500'
    : 'bg-[#fcf8f0] border-[#cfbe9f] text-[#3e2723] placeholder-[#8d6e63] focus:border-amber-800';

  return (
    <div dir="rtl" className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${bgThemeClass}`}>
      
      <header className={`border-b sticky top-0 z-40 px-4 py-4 md:px-8 shadow-xs transition-colors duration-500 ${darkMode ? 'border-slate-800 bg-slate-900/85 backdrop-blur-md' : 'border-[#cfbe9f] bg-[#f8f1e5]/90 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#8b4513] text-white font-black flex items-center justify-center text-sm shadow-md flex-shrink-0">
                ROPME
              </div>
              <div className="text-right">
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#3e2723] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-amber-400 dark:to-yellow-500">
                  {TEMPLATE_INFO.title}
                </h1>
                <p className={`text-xs mt-0.5 font-bold ${darkMode ? 'text-slate-400' : 'text-[#6d4c41]'}`}>
                  {TEMPLATE_INFO.subtitle}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className={`px-4 py-2 rounded-lg text-xs font-black border transition-all ${darkMode ? 'bg-[#f1e6d2] border-[#cfbe9f] text-amber-900' : 'bg-slate-900 border-slate-800 text-amber-400'}`}>
              {darkMode ? '📜 مظهر البوستر الورقي الأثري' : '✨ النمط الداكن الحديث'}
            </button>
          </div>
        </div>
      </header>

      <section className={`border-b py-8 px-4 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#ebdcb9]/40 border-[#cfbe9f]'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#8b4513] bg-white text-[#3e2723] shadow-inner'}`}>5</div>
            <div className="text-xs font-bold">📜 معاهدات وبروتوكولات قانونية</div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#8b4513] bg-white text-[#3e2723] shadow-inner'}`}>4</div>
            <div className="text-xs font-bold">🔬 حملات وبعثات مسح بحري ميداني</div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#8b4513] bg-white text-[#3e2723] shadow-inner'}`}>4</div>
            <div className="text-xs font-bold">🏛️ مؤتمرات وقرارات المجلس الإداري</div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#8b4513] bg-white text-[#3e2723] shadow-inner'}`}>13</div>
            <div className="text-xs font-bold">📂 إجمالي سجلات الأرشيف المدمجة</div>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="p-4 rounded-2xl border border-[#dac9ad] bg-[#f1e6d2] shadow-sm">
            <h2 className="text-sm font-black mb-3 text-amber-950 flex items-center gap-2">📅 تجميع السجلات حسب السنوات:</h2>
            <div className="flex flex-col gap-2">
              {Object.keys(ARCHIVE_BY_YEARS).map(year => (
                <button
                  key={year}
                  onClick={() => { setSelectedYear(year); setSelectedCategory('الكل'); }}
                  className={`w-full p-3.5 rounded-xl border text-right flex items-center justify-between transition-all ${selectedYear === year ? 'bg-amber-800 text-white border-amber-800 shadow-md translate-x-[-4px]' : 'bg-[#fcf8f0] border-[#cfbe9f]/60 hover:border-amber-800 text-[#3e2723]'}`}
                >
                  <span className="font-mono font-black text-sm">العام التاريخي: {year} م</span>
                  <span className={`text-[10px] py-0.5 px-2 rounded-md font-bold ${selectedYear === year ? 'bg-amber-900 text-white' : 'bg-[#ebdcb9] text-amber-950'}`}>
                    {ARCHIVE_BY_YEARS[year].activities.length} سجلات[cite: 5]
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className={`p-4 rounded-2xl border ${cardThemeClass}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" placeholder={`البحث في وقائع عام ${selectedYear}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full border rounded-xl px-4 py-2 text-xs focus:outline-none transition-all ${inputThemeClass}`} />
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-[11px] font-bold">الفئة الفرعية:</span>
                <div className="flex gap-1">
                  {CATEGORIES.map(cat => (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-2.5 py-1 rounded-md text-[10px] font-black border transition-all ${selectedCategory === cat.id ? 'bg-amber-800 text-white border-amber-800 shadow-xs' : 'bg-transparent border-amber-900/20 text-[#5d4037]'}`}>{cat.name.split(' ')[0]}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-44 rounded-2xl overflow-hidden relative border border-[#dac9ad] bg-[#ebdcb9] shadow-sm">
            <img src={ARCHIVE_BY_YEARS[selectedYear]?.image} alt={`ROPME Year ${selectedYear}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 right-4 text-white">
              <div className="text-3xl font-black font-mono tracking-wide drop-shadow-md">سجلات عام {selectedYear} م[cite: 5]</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredActivities.map(activity => (
              <div key={activity.id} onClick={() => setSelectedActivityModal(activity)} className={`rounded-2xl border flex flex-col justify-between p-4 cursor-pointer group hover:scale-[1.01] transition-all shadow-xs ${cardThemeClass}`}>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-850 text-white rounded shadow-xs">{activity.type}</span>
                    <span className="text-[10px] font-mono font-bold opacity-80">{activity.docType}</span>
                  </div>
                  <h3 className="text-xs font-black mb-1.5 leading-relaxed">{activity.title}[cite: 5]</h3>
                  <p className="text-[11px] leading-relaxed text-justify opacity-90 line-clamp-3">{activity.desc}[cite: 5]</p>
                </div>
                <div className="text-[10px] text-amber-800 font-extrabold text-left pt-2 border-t border-amber-900/5 group-hover:underline">انقر للـ Popup ومراجعة تفاصيل التوثيق والملاحظات ←</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* لوحة الدول الأعضاء */}
      <section className="border-t border-[#cfbe9f] bg-[#ebdcb9]/20 py-8 px-4 mt-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-black mb-4 text-[#3e2723] text-center lg:text-right">🏳️ الدول الثماني الأعضاء الموقعة على ميثاق اتفاقية الكويت الإقليمية لعام 1978 م[cite: 5]</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
            {MEMBER_STATES.map(state => (
              <div key={state.name} className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 shadow-xs ${cardThemeClass}`}>
                <div className="w-12 h-14 rounded-full bg-white border border-[#cfbe9f] flex items-center justify-center text-2xl select-none shadow-sm">{state.flag}</div>
                <span className="text-[10px] font-bold block">{state.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. نافذة الـ Popup التفاعلية المجمعة (Modal) */}
      {selectedActivityModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 max-w-xl w-full shadow-2xl relative ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-[#f5efe4] border-[#cbd4c5] text-[#3e2723]'}`}>
            <button onClick={() => setSelectedActivityModal(null)} className="absolute top-4 left-4 p-1.5 bg-[#8b4513] text-white rounded-full font-bold hover:bg-amber-900 transition-colors">✕</button>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-3xl font-mono font-black text-amber-800">{selectedYear} م</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-850 text-white rounded shadow-sm">وثيقة معتمدة[cite: 5]</span>
            </div>
            <h3 className="text-sm md:text-md font-black mb-3 border-b border-amber-900/10 pb-2 leading-relaxed text-amber-950">{selectedActivityModal.title}[cite: 5]</h3>
            <div className="space-y-3 my-4 p-4 rounded-xl border border-[#dac9ad] bg-[#f1e6d2]/50 text-xs">
              <div>📌 <span className="font-bold">نوع السجل التوثيقي:</span> {selectedActivityModal.type}[cite: 5]</div>
              <div>📂 <span className="font-bold">طبيعة الملف بالمكتبة:</span> {selectedActivityModal.docType}[cite: 5]</div>
              <div className="leading-relaxed text-justify pt-2 border-t border-amber-900/5">
                <span className="font-bold text-amber-950 block mb-1">📝 البيان التاريخي الفني الحقيقي:</span>
                {selectedActivityModal.desc}[cite: 5]
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button onClick={() => setSelectedActivityModal(null)} className="px-6 py-2.5 bg-amber-850 text-white text-xs font-extrabold rounded-xl hover:bg-amber-900 transition-colors shadow-md">إغلاق وتأكيد القراءة والأرشفة</button>
            </div>
          </div>
        </div>
      )}

      <footer className={`border-t py-6 text-center text-xs bg-[#ebdcb9]/40 text-[#5d4037] ${darkMode ? 'border-slate-850 bg-slate-950 text-slate-400' : 'border-[#cfbe9f]'}`}>
        <p className="font-black">حقوق الطبع والنشر © 2026 محفوظة للمنصة الإقليمية لحماية البيئة البحرية (ROPME)</p>
      </footer>
    </div>
  );
}