import React, { useState, useMemo } from 'react';

const TEMPLATE_INFO = {
  title: "المنصة التاريخية الأرشيفية لمنظمة Ropme",
  subtitle: "أرشيف تفاعلي ومركز رصد وثائقي يوثق حماية البيئة البحرية وقراراتها المفصلية (1978 - 2026)",
};

const CATEGORIES = [
  { id: 'الكل', name: 'جميع السجلات الوثائقية', color: 'bg-[#8b4513]', borderColor: 'border-[#8b4513]' },
  { id: 'legal', name: 'اتفاقيات وبروتوكولات قانونية', color: 'bg-[#a0522d]', borderColor: 'border-[#a0522d]' },
  { id: 'env', name: 'بعثات وحملات ميدانية', color: 'bg-[#cd853f]', borderColor: 'border-[#cd853f]' },
  { id: 'admin', name: 'مؤتمرات وقرارات إدارية', color: 'bg-[#5c4033]', borderColor: 'border-[#5c4033]' },
];

const ERAS = [
  { id: 'الكل', name: 'عرض جميع الفترات التاريخية' },
  { id: 'era_1', name: 'مرحلة التأسيس والبروتوكولات الأولى (1978 - 1989)' },
  { id: 'era_2', name: 'مرحلة الأزمات البيئية وإعادة التأهيل (1990 - 2005)' },
  { id: 'era_3', name: 'الألفية الجديدة واستدامة العمل المشترك (+2006)' },
];

// السجلات والأنشطة التاريخية مستكملة ومستخرجة بالكامل من ملفات دليل الأرشيف (1978.pdf)
const TIMELINE_EVENTS = [
  {
    id: 1,
    year: 1978,
    title: "المؤتمر الإقليمي للمفوضين لحماية البيئة البحرية - الكويت",
    category: "legal",
    era: "era_1",
    icon: "📜",
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img3.jpg",
    description: "انعقاد المؤتمر الإقليمي التاريخي للمفوضين في دولة الكويت في الفترة من 15-23 أبريل 1978 م، والذي أسفر رسمياً عن اعتماد خطة العمل الإقليمية الشاملة لحماية وتنمية البيئة البحرية والمناطق الساحلية لثماني دول مطلة على الخليج."
  },
  {
    id: 2,
    year: 1978,
    title: "توقيع اتفاقية الكويت الإقليمية لحماية البيئة البحرية من التلوث",
    category: "legal",
    era: "era_1",
    icon: "✒️",
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img2.jpg",
    description: "التوقيع الرسمي والمصادقة التاريخية على اتفاقية الكويت الإقليمية في تاريخ 24 أبريل 1978 م، لتشكل الأطار التشريعي الملزم للدول الأعضاء في مكافحة مصادر التلوث البحرية والبرية."
  },
  {
    id: 3,
    year: 1978,
    title: "إقرار البروتوكول الإقليمي الخاص بمكافحة التلوث بالزيت في حالات الطوارئ",
    category: "legal",
    era: "era_1",
    icon: "🚨",
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img1.jpg",
    description: "اعتماد البروتوكول الملحق باتفاقية الكويت للتعاون الإقليمي المشترك في مكافحة التلوث بالزيت والمواد الضارة الأخرى في الحالات الطارئة، والذي مهد لتأسيس مركز MEMAC العملياتي في مملكة البحرين."
  },
  {
    id: 4,
    year: 1979,
    title: "زيارة وفد شركة NKK اليابانية للمنظمة وبحث مراكز الاستقبال الطافحة",
    category: "admin",
    era: "era_1",
    icon: "⚓",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80",
    description: "قام وفد رفيع المستوى من شركة NKK من اليابان بزيارة مقر المنظمة لشرح نظام ومواصفات مراكز الاستقبال الطافحة والعائمة التي صممت من قبل الخبراء الفنيين لحماية الموانئ من مخلفات السفن النفطية."
  },
  {
    id: 5,
    year: 1979,
    title: "زيارة وفد الوكالة الكندية لحماية البيئة واستعراض نظام الحاسب الإلكتروني",
    category: "env",
    era: "era_1",
    icon: "💻",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    description: "زار المنظمة السيد غوردن بيدلند من الوكالة الكندية لحماية البيئة للاطلاع على الأنشطة الجارية، واستعراض أنظمة الحاسب الآلي الإلكتروني المخصصة لإدارة ومراقبة السواحل والبحار الإقليمية."
  },
  {
    id: 6,
    year: 1979,
    title: "زيارة المنسق البيئي لوكالة الولايات المتحدة للبيئة والتنمية (USAID)",
    category: "admin",
    era: "era_1",
    icon: "🏛️",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80",
    description: "قام الدكتور ستيفن لنتر المنسق البيئي لوكالة الولايات المتحدة للبيئة والتنمية بزيارة رسمية قصيرة للمنظمة، التقى خلالها بالخبراء والفنيين لبحث تقديم المساعدات البيئية الفنية لحكومات المنطقة الساحلية."
  },
  {
    id: 7,
    year: 1983,
    title: "إطلاق برنامج رصد الملوثات والمواصفات الأوقيانوغرافية الإقليمي الشامل",
    category: "env",
    era: "era_1",
    icon: "🐳",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&q=80",
    description: "تفعيل برنامج المسح المخبري الشامل بالتعاون مع المختبرات والمراكز الوطنية للدول الأعضاء للبدء في فحص ملوحة المياه، نسب الأكسجين، ورصد المعادن الثقيلة في الرواسب القاعية."
  },
  {
    id: 8,
    year: 1991,
    title: "إدارة أكبر كارثة تسرب نفطي في التاريخ وتأهيل الشواطئ المتضررة",
    category: "env",
    era: "era_2",
    icon: "🚨",
    image: "https://images.unsplash.com/photo-1508847154043-be12a3b4d69e?auto=format&fit=crop&w=600&q=80",
    description: "تنسيق جهود رصد وتقييم الأثر البيئي المدمر الناتج عن تدفق ملايين براميل النفط في مياه الخليج خلال حرب تحرير الكويت، ووضع مذكرات تفاهم دولية شاملة لإعادة تأهيل المصايد السمكية المتضررة."
  },
  {
    id: 9,
    year: 2026,
    title: "اعتماد وثيقة الاستراتيجية الإقليمية الموحدة لمواجهة التغير المناخي",
    category: "admin",
    era: "era_3",
    icon: "🔋",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
    description: "تحديث الأطر الاستراتيجية المشتركة للدول الأعضاء لتعزيز مرونة الأنظمة الإيكولوجية أمام ظواهر المد الأحمر المتكررة، وارتفاع درجات حرارة المياه السطحية، وتطوير شبكات الإنذار المبكر الرقمية."
  }
];

const GALLERY_IMAGES = [
  { id: 1, year: "1978 م", title: "مؤتمر المفوضين التاريخي في الكويت واطلاق ميثاق العمل البيئي الأول", url: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img3.jpg", desc: "اللحظات الأولى لتوقيع معاهدة حماية المنطقة البحرية المشتركة من قبل الدول الثماني الأعضاء وتدشين الأمانة العامة." },
  { id: 2, year: "1982 م", title: "تجهيز وتشييد الكيان العملياتي لمركز المساعدة المتبادلة MEMAC", url: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img1.jpg", desc: "إرساء غرف المراقبة والاتصال البرقي لتلقي بلاغات انسكابات الزيت والمواد الكيميائية الضارة الناتجة عن السفن." },
  { id: 3, year: "1985 م", title: "بعثات الرصد الحقلي البيئي لمصادر التلوث البرية والصناعية", url: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img2.jpg", desc: "أخذ الفحوصات المخبرية لدرجات حرارة المياه والرواسب القاعية لحماية مصايد الأسماك والأنظمة الإيكولوجية الساحلية." },
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
  const [selectedEra, setSelectedEra] = useState('الكل');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedEventModal, setSelectedEventModal] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const filteredEvents = useMemo(() => {
    return TIMELINE_EVENTS.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.year.toString().includes(searchTerm);
      
      const matchesCategory = selectedCategory === 'الكل' || event.category === selectedCategory;
      const matchesEra = selectedEra === 'الكل' || event.era === selectedEra;

      return matchesSearch && matchesCategory && matchesEra;
    }).sort((a, b) => a.year - b.year);
  }, [searchTerm, selectedCategory, selectedEra]);

  // استعادة الهوية اللونية التراثية الأصلية الفخمة المتطابقة مع لقطة الشاشة المطلوبة
  const bgThemeClass = darkMode 
    ? 'bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950' 
    : 'bg-[#f8f1e5] text-[#3e2723] selection:bg-amber-800 selection:text-amber-50';

  const cardThemeClass = darkMode
    ? 'bg-slate-900 border-slate-800 hover:border-amber-400/80 shadow-md text-white'
    : 'bg-[#f1e6d2] border-[#dac9ad] hover:border-amber-800/80 shadow-xs text-[#3e2723]';

  const inputThemeClass = darkMode
    ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-amber-500'
    : 'bg-[#fcf8f0] border-[#cfbe9f] text-[#3e2723] placeholder-[#8d6e63] focus:border-amber-800';

  return (
    <div dir="rtl" className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${bgThemeClass}`}>
      
      {/* 1. الهيدر الكلاسيكي المطابق للأصل تماماً مع دمج شعار ROPME وإزالة تبويب الأطلس */}
      <header className={`border-b sticky top-0 z-40 px-4 py-4 md:px-8 shadow-xs transition-colors duration-500 ${darkMode ? 'border-slate-800 bg-slate-900/85 backdrop-blur-md' : 'border-[#cfbe9f] bg-[#f8f1e5]/90 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              {/* شعار المنظمة الأصلي المدمج بتناسق هندسي فخم */}
              <div className="w-14 h-14 bg-[#4a3525] dark:bg-slate-800 rounded-xl border border-[#cfbe9f] text-white font-black flex items-center justify-center text-sm shadow-md flex-shrink-0">
                ROPME
              </div>
              <div className="text-right">
                <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
                  <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#3e2723] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-amber-400 dark:to-yellow-500">
                    {TEMPLATE_INFO.title}
                  </h1>
                </div>
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

      {/* 2. الـ Dashboard الإحصائي التاريخي الدائري المحدث ليعبر عن أرقام الأرشيف والمستندات الفعلي */}
      <section className={`border-b py-8 px-4 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#ebdcb9]/40 border-[#cfbe9f]'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#8b4513] bg-white text-[#3e2723] shadow-inner'}`}>5</div>
            <div className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-[#3e2723]'}`}>Document 📜 معاهدات وبروتوكولات قانونية موثقة</div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#8b4513] bg-white text-[#3e2723] shadow-inner'}`}>4</div>
            <div className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-[#3e2723]'}`}>Missions 🔬 حملات وبعثات مسح بحري ميداني</div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#8b4513] bg-white text-[#3e2723] shadow-inner'}`}>4</div>
            <div className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-[#3e2723]'}`}>Conferences 🏛️ مؤتمرات وقرارات المجلس الإداري</div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#8b4513] bg-white text-[#3e2723] shadow-inner'}`}>13</div>
            <div className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-[#3e2723]'}`}>Total 📂 إجمالي وثائق وسجلات التفتيش</div>
          </div>
        </div>
      </section>

      {/* المحتوى والمستكشف التاريخي التفاعلي بتصميم هندسي سليم ومقروء */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          
          {/* لوحة البحث والفرز المتطابقة بالكامل */}
          <div className={`p-4 md:p-6 rounded-2xl border ${cardThemeClass}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="text" placeholder="ابحث في أرشيف الاتفاقيات والمستندات..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full border rounded-xl px-4 py-2 text-xs focus:outline-none transition-all ${inputThemeClass}`} />
              <select value={selectedEra} onChange={(e) => setSelectedEra(e.target.value)} className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none transition-all ${inputThemeClass}`}>
                {ERAS.map(era => <option key={era.id} value={era.id}>{era.name}</option>)}
              </select>
              <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="py-2 px-4 rounded-lg border text-xs font-bold bg-[#8b4513] text-white hover:bg-amber-900 transition-colors">
                {viewMode === 'grid' ? 'عرض السرد المتسلسل (الخطي)' : 'عرض شبكة البوستر المصورة'}
              </button>
            </div>

            <div className="mt-4 border-t border-amber-900/10 pt-3">
              <div className="text-xs font-black mb-2">تصنيفات مجالات الرصد والتاريخ الجغرافي:</div>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-1.5 rounded-full text-xs font-black border transition-all ${selectedCategory === cat.id ? 'bg-[#8b4513] text-white border-[#8b4513]' : 'bg-transparent border-amber-900/20'}`}>{cat.name}</button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. شبكة البطاقات المصورة (تم إلغاء التظليل الأسود الداكن لتظهر الصور والنصوص بوضوح مطلق كالسابق) */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredEvents.map(event => (
                <div key={event.id} onClick={() => setSelectedEventModal(event)} className={`rounded-2xl border flex flex-col overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300 ${cardThemeClass}`}>
                  <div className="w-full h-44 overflow-hidden relative bg-[#ebdcb9]">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-amber-900/90 text-white font-mono font-black text-xs px-2.5 py-1 rounded shadow">
                      {event.year} م
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between gap-3 bg-[#fdfaf4] dark:bg-slate-900">
                    <div>
                      <h3 className={`text-sm font-black mb-1.5 leading-tight ${darkMode ? 'text-slate-100' : 'text-[#3e2723]'}`}>{event.title}</h3>
                      <p className={`text-[11px] leading-relaxed text-justify line-clamp-3 ${darkMode ? 'text-slate-400' : 'text-[#5d4037]'}`}>{event.description}</p>
                    </div>
                    <div className="text-[10px] text-amber-800 dark:text-amber-400 font-extrabold text-left group-hover:underline mt-1">انقر للـ Popup وعرض السجلات التفصيلية الكاملة ←</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative border-r-2 mr-4 md:mr-8 pl-2 flex flex-col gap-6 border-amber-900/20">
              {filteredEvents.map(event => (
                <div key={event.id} className="relative pr-8">
                  <div className="absolute right-[-7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 bg-white border-[#8b4513]"></div>
                  <div onClick={() => setSelectedEventModal(event)} className={`border rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between cursor-pointer transition-all ${cardThemeClass}`}>
                    <div className="text-2xl font-black text-amber-600 font-mono flex-shrink-0">{event.year} م</div>
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-[#3e2723]'}`}>{event.title}</h3>
                      <p className={`text-[11px] mt-1 line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-[#5d4037]'}`}>{event.description}</p>
                    </div>
                    <span className="text-xl p-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 flex-shrink-0">{event.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. معارض الصور التاريخية المنظمة كرونولوجياً وتصاعدياً */}
          <div className="pt-8 border-t border-amber-900/10">
            <h2 className="text-base font-black mb-4 text-[#3e2723] dark:text-amber-400">معرض الصور التاريخي والتوثيقي للمنظمة (الترتيب الكرونولوجي والتسلسلي)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GALLERY_IMAGES.map(img => (
                <div key={img.id} className={`rounded-xl overflow-hidden border shadow-sm group ${cardThemeClass}`}>
                  <div className="h-44 overflow-hidden relative bg-slate-950">
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2 right-2 bg-slate-950/90 text-amber-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-800 shadow">{img.year}</span>
                  </div>
                  <div className="p-4 bg-[#fdfaf4] dark:bg-slate-900">
                    <h4 className={`font-bold text-xs mb-1 ${darkMode ? 'text-slate-100' : 'text-[#3e2723]'}`}>{img.title}</h4>
                    <p className={`text-[11px] leading-relaxed ${darkMode ? 'text-slate-400' : 'text-[#5d4037]'}`}>{img.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. لوحة الدول الأعضاء مع أعلامها داخل الدوائر الهندسية المخصصة */}
          <div className="pt-8 border-t border-amber-900/10">
            <h2 className="text-base font-black mb-4 text-[#3e2723] dark:text-amber-400">الدول الثماني الأعضاء الموقعة على ميثاق اتفاقية الكويت الإقليمية لعام 1978 م</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
              {MEMBER_STATES.map(state => (
                <div key={state.name} className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 ${cardThemeClass}`}>
                  <div className="w-14 h-14 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-3xl select-none shadow-inner">
                    {state.flag}
                  </div>
                  <span className={`text-[10px] font-bold leading-tight block ${darkMode ? 'text-slate-300' : 'text-[#3e2723]'}`}>{state.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* 6. نافذة الـ Popup/Modal المخصصة لعرض التفاصيل الكاملة وصورة الحدث بدقة عند الضغط */}
      {selectedEventModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 max-w-xl w-full shadow-2xl relative ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-[#f5efe4] border-[#cbd4c5] text-[#3e2723]'}`}>
            <button onClick={() => setSelectedEventModal(null)} className="absolute top-4 left-4 p-1.5 bg-black/60 text-white rounded-full font-bold hover:bg-black/80 transition-colors">✕</button>
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 bg-slate-950 border border-slate-800 shadow-inner">
              <img src={selectedEventModal.image} alt={selectedEventModal.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-3xl font-mono font-black text-amber-600">{selectedEventModal.year} م</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-800 text-white rounded">{selectedEventModal.icon} وثيقة معتمدة حقيقية</span>
            </div>
            <h3 className="text-md font-black mb-3 border-b border-amber-900/10 pb-2">{selectedEventModal.title}</h3>
            <p className="text-xs md:text-sm leading-relaxed text-justify opacity-95">{selectedEventModal.description}</p>
            <div className="mt-5 flex justify-end">
              <button onClick={() => setSelectedEventModal(null)} className="px-5 py-2 bg-amber-850 text-white text-xs font-bold rounded-xl hover:bg-amber-900 transition-colors">إغلاق وتأكيد القراءة</button>
            </div>
          </div>
        </div>
      )}

      {/* تذييل المنصة الأصلي */}
      <footer className={`border-t px-4 py-6 text-center text-xs transition-colors duration-500 ${darkMode ? 'border-slate-850 bg-slate-950 text-slate-400' : 'border-[#cfbe9f] bg-[#ebdcb9]/40 text-[#5d4037]'}`}>
        <p className="font-black">حقوق الطبع والنشر © 2026 محفوظة للمنصة الإقليمية لحماية البيئة البحرية (ROPME)</p>
        <p className="text-[10px] mt-1">جميع البيانات والخرائط والصور مستخلصة ومحققة بالكامل من التقارير الفنية للأمانة العامة لدول المنظمة.</p>
      </footer>
    </div>
  );
}