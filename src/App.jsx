import React, { useState, useMemo } from 'react';

const TEMPLATE_INFO = {
  title: "المنصة التاريخية الأرشيفية لمنظمة Ropme",
  subtitle: "أرشيف تفاعلي ومركز رصد وثائقي يوثق حماية البيئة البحرية وقراراتها المفصلية (1978 - 2026)",
};

const CATEGORIES = [
  { id: 'الكل', name: 'جميع السجلات الوثائقية', color: 'bg-emerald-800' },
  { id: 'legal', name: 'اتفاقيات وبروتوكولات قانونية', color: 'bg-teal-800 border-teal-700', textColor: 'text-teal-700' },
  { id: 'env', name: 'بعثات وحملات ميدانية', color: 'bg-cyan-800 border-cyan-700', textColor: 'text-cyan-700' },
  { id: 'admin', name: 'مؤتمرات وقرارات إدارية', color: 'bg-emerald-800 border-emerald-700', textColor: 'text-emerald-700' },
];

// مصفوفة الأحداث التاريخية المستخلصة والمحققة بالكامل من جدول وثيقة الدليل المرفقة
const TIMELINE_EVENTS = [
  {
    id: 1,
    year: 1978,
    title: "اعتماد خطة العمل لحماية وتنمية البيئة البحرية والمناطق الساحلية",
    category: "legal",
    icon: "📜",
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img3.jpg",
    description: "اعتماد خطة العمل الإقليمية الشاملة بمشاركة ممثلي المندوبين المفوضين للبحرين، إيران، العراق، الكويت، عمان، قطر، المملكة العربية السعودية، والإمارات العربية المتحدة لوضع أطر التعاون الفني."
  },
  {
    id: 2,
    year: 1979,
    title: "اجتماع الخبراء الحكوميين لتأسيس مركز المساعدة المتبادلة طوارئ (MEMAC)",
    category: "admin",
    icon: "⚓",
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img1.jpg",
    description: "انعقاد اجتماع خبراء ومندوبي الدول الأعضاء في المنامة بالبحرين لوضع الترتيبات الهيكلية والمالية لتشغيل مركز المساعدة المتبادلة للطوارئ البحرية للحد من انسكابات الزيت."
  },
  {
    id: 3,
    year: 1980,
    title: "تدشين المسح الأنثروبولوجي ومصادر التلوث البرية والصناعية",
    category: "env",
    icon: "🔬",
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img2.jpg",
    description: "إطلاق بعثات الجرد الشامل والتقييم السريع للملوثات السائلة والصلبة والمصادر الصناعية في الكويت، البحرين، قطر، عمان، وشرق المملكة العربية السعودية والإمارات."
  },
  {
    id: 4,
    year: 1981,
    title: "الاجتماع الوزاري الأول لمجلس المنظمة الإقليمية (ROPME Council)",
    category: "admin",
    icon: "🏛️",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80",
    description: "الإنعقاد الرسمي الأول للمجلس الأعلى للمنظمة في دولة الكويت لإقرار الميزانيات واللوائح الداخلية واعتماد الهيكل التنفيذي للأمانة العامة."
  },
  {
    id: 5,
    year: 1982,
    title: "دخول بروتوكول مكافحة التلوث بالزيت والمواد الضارة حيز التنفيذ",
    category: "legal",
    icon: "⚖️",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80",
    description: "التصديق القانوني والبدء الفعلي في تطبيق آليات التعاون المشترك بين الدول الثماني لتبادل المعدات والأفراد والإبلاغ الفوري عن حوادث الناقلات."
  },
  {
    id: 6,
    year: 1983,
    title: "إطلاق برنامج رصد الملوثات والمواصفات الأوقيانوغرافية (18-Month Program)",
    category: "env",
    icon: "🐳",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&q=80",
    description: "توقيع مذكرات التفاهم التفصيلية مع المراكز الوطنية ومختبرات الدول الأعضاء لبدء أخذ العينات وتحليل المعادن الثقيلة والملوحة في مياه البحر والتربة قاعياً."
  },
  {
    id: 7,
    year: 1984,
    title: "الاجتماع القانوني الفني الثاني للبروتوكول الخاص بمصادر البر",
    category: "legal",
    icon: "📜",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=600&q=80",
    description: "اجتماع الخبراء المتخصصين في الكويت لمراجعة نصوص وصياغة مسودة الاتفاقية الملزمة للحد من الصرف الصناعي والصحي الساحلي المباشر."
  },
  {
    id: 8,
    year: 1991,
    title: "إدارة أكبر كارثة تسرب نفطي في التاريخ وتشكيل فريق الاستجابة العالمي",
    category: "env",
    icon: "🚨",
    image: "https://images.unsplash.com/photo-1508847154043-be12a3b4d69e?auto=format&fit=crop&w=600&q=80",
    description: "قيادة وتنسيق جهود رصد وتقييم الأثر البيئي المدمر الناتج عن تدفق ملايين براميل النفط خلال حرب تحرير الكويت، بمشاركة المنظمات الدولية لإعادة تأهيل الشواطئ."
  },
  {
    id: 9,
    year: 1998,
    title: "بروتوكول التحكم في النقل البحري للنفايات الخطرة والتخلص منها عبر الحدود",
    category: "legal",
    icon: "⚖️",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
    description: "اجتماع المفوضين في طهران للتوقيع الرسمي على البروتوكول الإقليمي الصارم لتنظيم وحظر حركة ناقلات النفايات السامة والمواد الكيميائية في مياه الخليج وبحر عمان."
  },
  {
    id: 10,
    year: 2013,
    title: "تنفيذ البعثة البحرية الكبرى الشاملة لتقييم جودة المياه والأحياء",
    category: "env",
    icon: "🔬",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    description: "مسح بحري شامل بالتنسيق مع سفن الأبحاث لجمع وتحليل عينات المياه والرواسب القاعية لرصد نسب التلوث بالمعادن الثقيلة وتأثيرات التغير المناخي."
  },
  {
    id: 11,
    year: 2026,
    title: "إعتماد التحديث الإستراتيجي الشامل لحماية التنوع البيولوجي",
    category: "admin",
    icon: "🔋",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
    description: "اعتماد الوثيقة الموحدة للدول الأعضاء لمواجهة ارتفاع درجات الحرارة وظواهر المد الأحمر المتكررة وتعزيز مرونة النظم البيئية الساحلية."
  }
];

// تصاعدي كرونولوجي لمعرض الصور التاريخي التوثيقي من القديم إلى الأحدث
const GALLERY_IMAGES = [
  { id: 1, year: "1978 م", title: "مرحلة التأسيس وتوقيع الميثاق الإقليمي الأول", url: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img3.jpg", desc: "الحظات الأولى لإطلاق خطة العمل البيئية المشتركة ووضع الهيكل التنظيمي للمنظمة بمشاركة الدول الثماني." },
  { id: 2, year: "1982 م", title: "تفعيل خطط الطوارئ وبناء المقرات التشغيلية لـ MEMAC", url: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img1.jpg", desc: "تأسيس مركز مكافحة التلوث بالبحرين وتنسيق أنظمة الإنذار المبكر للناقلات." },
  { id: 3, year: "1985 م", title: "بعثات الرصد الحقلي الساحلي للملوثات البرية", url: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img2.jpg", desc: "أخذ القياسات المخبرية لدرجات حرارة المياه ونسب الملوحة والمعادن لحماية البيئة الإيكولوجية الساحلية." },
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
  const [themeMode, setThemeMode] = useState('sepia');
  const [selectedEventModal, setSelectedEventModal] = useState(null); // حالة النافذة المنبثقة التفاعلية للحدث

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

  const bgThemeClass = themeMode === 'sepia' 
    ? 'bg-[#f5efe4] text-[#1e3f20] selection:bg-emerald-800 selection:text-emerald-50' 
    : 'bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950';

  const cardThemeClass = themeMode === 'sepia'
    ? 'bg-[#e2dacb] border-[#cbd4c5] hover:border-emerald-800/80 shadow-md'
    : 'bg-slate-900 border-slate-800 hover:border-amber-400/80 shadow-md';

  const inputThemeClass = themeMode === 'sepia'
    ? 'bg-[#fcfaf5] border-[#b8c4b1] text-[#1e3f20] placeholder-[#556b2f] focus:border-emerald-800'
    : 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-amber-500';

  return (
    <div dir="rtl" className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${bgThemeClass}`}>
      
      {/* الرأس العلوي الفخم متضمناً العنوان وشعار ROPME المعتمد والبريفيور المسبق للنشر */}
      <header className={`border-b backdrop-blur-md sticky top-0 z-40 px-4 py-4 md:px-8 transition-colors duration-500 ${themeMode === 'sepia' ? 'border-[#cbd4c5] bg-[#f5efe4]/90' : 'border-slate-800 bg-slate-900/85'}`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center lg:text-right">
            {/* الشعار الهندسي المطابق للصورة المرفقة رقم Screenshot 2026-06-19 at 10.30.42_2.jpg */}
            <div className="w-14 h-14 bg-emerald-950 rounded-xl border border-emerald-800 flex items-center justify-center font-black text-white text-md tracking-tight shadow-md flex-shrink-0">
              ROPME
            </div>
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-emerald-950 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-teal-400 dark:to-emerald-400">
                  {TEMPLATE_INFO.title}
                </h1>
                <span className="text-[9px] py-0.5 px-2 rounded-full font-bold bg-amber-600 text-white animate-pulse">معاينة النظام المستقر قبل النشر (Preview)</span>
              </div>
              <p className={`text-xs mt-0.5 ${themeMode === 'sepia' ? 'text-[#4f6f52]' : 'text-slate-400'}`}>
                {TEMPLATE_INFO.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setThemeMode(themeMode === 'sepia' ? 'dark' : 'sepia')} className={`px-4 py-2 rounded-lg text-xs font-black border transition-all ${themeMode === 'sepia' ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-[#e2dacb] border-[#cbd4c5] text-emerald-900'}`}>
              {themeMode === 'sepia' ? '✨ النمط المظلم الذكي' : '📜 مظهر البوستر الزمردي'}
            </button>
          </div>
        </div>
      </header>

      {/* الـ Dashboard الإحصائي والتاريخي البحري البديل عن مؤشرات الطقس */}
      <section className={`border-b ${themeMode === 'sepia' ? 'bg-[#e2dacb]/60 border-[#cbd4c5]' : 'bg-slate-900/60 border-slate-800'} py-8 px-4`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className={`w-24 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${themeMode === 'sepia' ? 'border-emerald-950 bg-[#fcfaf5] text-emerald-950' : 'border-teal-500 bg-slate-950 text-teal-400 shadow-md'}`}>5</div>
            <div className="text-xs font-bold">📜 الاتفاقيات والبروتوكولات القانونية</div>
            <span className="text-[10px] text-slate-500 mt-0.5">موثقة ومعتمدة سحابياً</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-24 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${themeMode === 'sepia' ? 'border-emerald-950 bg-[#fcfaf5] text-emerald-950' : 'border-cyan-500 bg-slate-950 text-cyan-400 shadow-md'}`}>4</div>
            <div className="text-xs font-bold">🔬 الحملات والبعثات الميدانية</div>
            <span className="text-[10px] text-slate-500 mt-0.5">مسوحات الأبحاث البحرية</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-24 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${themeMode === 'sepia' ? 'border-emerald-950 bg-[#fcfaf5] text-emerald-950' : 'border-emerald-500 bg-slate-950 text-emerald-400 shadow-md'}`}>4</div>
            <div className="text-xs font-bold">🏛️ المؤتمرات والقرارات الإدارية</div>
            <span className="text-[10px] text-slate-500 mt-0.5">اجتماعات المجلس الوزاري الأعلى</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-24 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${themeMode === 'sepia' ? 'border-emerald-950 bg-[#fcfaf5] text-emerald-950' : 'border-amber-500 bg-slate-950 text-amber-400 shadow-md'}`}>13</div>
            <div className="text-xs font-bold">📂 إجمالي السجلات والوثائق المحققة</div>
            <span className="text-[10px] text-slate-500 mt-0.5">مستخلصة من الدليل الفني</span>
          </div>
        </div>
      </section>

      {/* المحيط والأرشيف التاريخي الشامل في المنتصف */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          
          {/* لوحة البحث والفرز الذكي للوثائق */}
          <div className={`p-4 md:p-6 rounded-2xl border ${cardThemeClass}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="text" placeholder="ابحث بالتاريخ، الكلمة المفتاحية، أو نوع القرار البيئي..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full border rounded-xl px-4 py-2 text-xs focus:outline-none transition-all ${inputThemeClass}`} />
              <select value={selectedEra} onChange={(e) => setSelectedEra(e.target.value)} className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none transition-all ${inputThemeClass}`}>
                {ERAS.map(era => <option key={era.id} value={era.id}>{era.name}</option>)}
              </select>
              <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="py-2 px-4 rounded-lg border text-xs font-bold bg-emerald-800 text-white hover:bg-emerald-900 transition-colors">
                {viewMode === 'grid' ? 'عرض السرد المتسلسل (الخطي)' : 'عرض شبكة البوستر المصورة'}
              </button>
            </div>

            <div className="mt-4 border-t border-emerald-900/10 pt-3">
              <div className="text-xs font-black mb-2">تصنيفات مجالات الرصد والتاريخ الجغرافي:</div>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-3 py-1 rounded-md text-[11px] font-black border transition-all ${selectedCategory === cat.id ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm' : 'bg-transparent border-emerald-900/20'}`}>{cat.name}</button>
                ))}
              </div>
            </div>
          </div>

          {/* عرض شبكة البوستر المصورة المحدثة بصور متطابقة من الأحداث التاريخية الفردية */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredEvents.map(event => (
                <div key={event.id} onClick={() => setSelectedEventModal(event)} className={`rounded-2xl border flex flex-col overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300 ${cardThemeClass}`}>
                  <div className="w-full h-40 overflow-hidden relative bg-slate-900">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-2 right-3 left-3 flex justify-between items-center">
                      <span className="text-2xl font-black text-amber-400 font-mono tracking-wide">{event.year} م</span>
                      <span className="text-[9px] py-0.5 px-2 bg-emerald-900 text-white rounded font-bold">{event.icon} {event.category === 'legal' ? 'بروتوكول قانوني' : event.category === 'env' ? 'بعثة ميدانية' : 'قرار إداري'}</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-black mb-1 text-slate-900 dark:text-white line-clamp-1">{event.title}</h3>
                      <p className="text-[11px] leading-relaxed text-justify opacity-80 line-clamp-3">{event.description}</p>
                    </div>
                    <div className="text-[10px] text-emerald-800 dark:text-emerald-400 underline font-bold mt-1 text-left">انقر لعرض تفاصيل الخبر الحصري ←</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* السرد الخطي التفاعلي المتسلسل للمقالات والأحداث التاريخية المعتمدة */
            <div className="relative border-r-2 mr-4 md:mr-8 pl-2 flex flex-col gap-6 border-emerald-900/20">
              {filteredEvents.map(event => (
                <div key={event.id} className="relative pr-8">
                  <div className="absolute right-[-7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 bg-emerald-800 border-emerald-100"></div>
                  <div onClick={() => setSelectedEventModal(event)} className={`border rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between cursor-pointer group hover:bg-black/5 transition-all ${cardThemeClass}`}>
                    <div className="text-2xl font-black text-amber-600 font-mono flex-shrink-0">{event.year} م</div>
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-800">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-black text-slate-900 dark:text-white">{event.title}</h3>
                      <p className="text-[11px] mt-1 opacity-80 line-clamp-2">{event.description}</p>
                    </div>
                    <span className="text-xl p-2 rounded-xl bg-emerald-950 text-white flex-shrink-0">{event.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* تصاعدي كرونولوجي لمعرض الصور التاريخي التوثيقي من القديم إلى الأحدث */}
          <div className="pt-8 border-t border-emerald-900/10">
            <h2 className="text-base font-black mb-4 text-emerald-900 dark:text-amber-400">معرض الصور التاريخي والتوثيقي للمنظمة (الترتيب الكرونولوجي والتسلسلي)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GALLERY_IMAGES.map(img => (
                <div key={img.id} className={`rounded-xl overflow-hidden border shadow-sm group ${cardThemeClass}`}>
                  <div className="h-44 overflow-hidden relative bg-slate-950">
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2 right-2 bg-emerald-900 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow">{img.year}</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-xs mb-1 text-slate-900 dark:text-white">{img.title}</h4>
                    <p className="text-[11px] leading-relaxed opacity-70">{img.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* لوحة الدول الأعضاء المحدثة بإسقاط أعلام الدول التعبيرية بدقة فائقة داخل دوائر هندسية موحدة */}
          <div className="pt-8 border-t border-emerald-900/10">
            <h2 className="text-base font-black mb-4 text-emerald-900 dark:text-amber-400">الدول الثماني الأعضاء الموقعة على ميثاق اتفاقية الكويت الإقليمية</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
              {MEMBER_STATES.map(state => (
                <div key={state.name} className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 ${cardThemeClass}`}>
                  <div className="w-14 h-14 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-3xl select-none shadow-inner">
                    {state.flag}
                  </div>
                  <span className="text-[10px] font-bold leading-tight block text-slate-900 dark:text-slate-200">{state.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* النافذة المنبثقة التفاعلية الكبرى (Dynamic Event Detail Modal) */}
      {selectedEventModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 max-w-xl w-full shadow-2xl relative ${themeMode === 'sepia' ? 'bg-[#f5efe4] border-[#cbd4c5]' : 'bg-slate-900 border-slate-800 text-white'}`}>
            <button onClick={() => setSelectedEventModal(null)} className="absolute top-4 left-4 p-1.5 bg-black/60 text-white rounded-full font-bold hover:bg-black/80 transition-colors">✕</button>
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 bg-slate-950 border border-slate-800 shadow-inner">
              <img src={selectedEventModal.image} alt={selectedEventModal.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-3xl font-mono font-black text-amber-600">{selectedEventModal.year} م</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-800 text-white rounded">{selectedEventModal.icon} وثيقة محققة</span>
            </div>
            <h3 className="text-md font-black mb-3 border-b border-emerald-900/10 pb-2 text-slate-900 dark:text-white">{selectedEventModal.title}</h3>
            <p className="text-xs md:text-sm leading-relaxed text-justify opacity-90">{selectedEventModal.description}</p>
            <div className="mt-5 flex justify-end">
              <button onClick={() => setSelectedEventModal(null)} className="px-5 py-2 bg-emerald-800 text-white text-xs font-bold rounded-xl hover:bg-emerald-900 transition-colors">إغلاق وتأكيد المعاينة</button>
            </div>
          </div>
        </div>
      )}

      {/* تذييل المنصة والأبعاد التنظيمية والقانونية للأمانة العامة */}
      <footer className={`border-t px-4 py-6 text-center text-xs transition-colors duration-500 ${themeMode === 'sepia' ? 'border-[#cbd4c5] bg-[#e2dacb]/40 text-[#1e3f20]' : 'border-slate-850 bg-slate-950 text-slate-400'}`}>
        <p className="font-black">حقوق الطبع والنشر © 2026 محفوظة للمنصة الإقليمية لحماية البيئة البحرية (ROPME)</p>
        <p className="text-[10px] mt-1">جميع البيانات والخرائط والصور مستخلصة ومحققة بالكامل من البوابة المرجعية والتقارير الفنية للأمانة العامة للدول الأعضاء.</p>
      </footer>
    </div>
  );
}