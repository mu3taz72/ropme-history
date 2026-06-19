import React, { useState, useMemo } from 'react';

// ==========================================
// 1. قاعدة بيانات المنصة الإقليمية لحماية البيئة البحرية (ROPME)
// ==========================================
const TEMPLATE_INFO = {
  title: "منصة تاريخ المنطقة البحرية للمنظمة (ROPME)",
  subtitle: "أرشيف تاريخي رقمي تفاعلي يوثق حماية البيئة البحرية وقراراتها المفصلية",
  yearsRange: "1978 - 2026",
};

const CATEGORIES = [
  { id: 'all', name: 'جميع المجالات', color: 'bg-slate-600', textColor: 'text-slate-400' },
  { id: 'legal', name: 'اتفاقيات وبروتوكولات قانونية', color: 'bg-teal-600', textColor: 'text-teal-500', borderColor: 'border-teal-600' },
  { id: 'env', name: 'بعثات وحملات بيئية', color: 'bg-cyan-600', textColor: 'text-cyan-500', borderColor: 'border-cyan-600' },
  { id: 'admin', name: 'مؤتمرات وقرارات إدارية', color: 'bg-emerald-600', textColor: 'text-emerald-500', borderColor: 'border-emerald-600' },
];

const ERAS = [
  { id: 'all', name: 'عرض جميع الفترات التاريخية' },
  { id: 'era_1', name: 'مرحلة التأسيس والبروتوكولات الأولى (1978 - 1989)' },
  { id: 'era_2', name: 'مرحلة الأزمات البيئية وإعادة التأهيل (1990 - 2005)' },
  { id: 'era_3', name: 'الألفية الجديدة واستدامة العمل المشترك (+2006)' },
];

const TIMELINE_EVENTS = [
  {
    id: 1,
    year: 1978,
    title: "توقيع اتفاقية الكويت الإقليمية التاريخية",
    category: "legal",
    era: "era_1",
    description: "تبنى المؤتمر الإقليمي للمفوضين حماية وتطوير البيئة البحرية والمناطق الساحلية، وتم توقيع اتفاقية الكويت الإقليمية وخطة العمل الإقليمية، مما وضع الحجر الأساس الرسمي لنشأة المنظمة بمشاركة الدول المطلة على المنطقة البحرية لحمايتها من التلوث.",
    tags: ["التأسيس", "اتفاقية_الكويت", "خطة_العمل"],
  },
  {
    id: 2,
    year: 1982,
    title: "دخول بروتوكول مكافحة التلوث بالزيت حيز التنفيذ",
    category: "legal",
    era: "era_1",
    description: "تفعيل البروتوكول الخاص بالتعاون الإقليمي للمكافحة في الحالات الطارئة، وتأسيس مركز المساعدة المتبادلة للطوارئ البحرية (MEMAC) في البحرين لتنسيق الاستجابة العاجلة للحوادث والتسربات النفطية الكبرى.",
    tags: ["بروتوكول", "طوارئ_بحرية", "MEMAC"],
  },
  {
    id: 3,
    year: 1991,
    title: "مواجهة أكبر تسرب نفطي بحري في التاريخ",
    category: "env",
    era: "era_2",
    description: "قادت المنظمة جهوداً جبارة بالتنسيق العالي مع المؤسسات الدولية لرصد وتقييم الأثر البيئي المدمر الناتج عن تدفق ملايين براميل النفط خلال حرب تحرير الكويت، وتدشين خطط إعادة تأهيل الشواطئ المتضررة والمصايد السمكية.",
    tags: ["كوارث_بيئية", "تسرب_نفطي", "إعادة_تأهيل"],
  },
  {
    id: 4,
    year: 1998,
    title: "بروتوكول التحكم في التلوث البحري الناجم عن مصادر برية",
    category: "legal",
    era: "era_2",
    description: "توقيع اتفاقية ملزمة للتحكم في الأنشطة الصناعية والحضرية المقامة على السواحل، والتي تصرف مخلفاتها بشكل مباشر أو غير مباشر في مياه الخليج، بهدف تقليل الملوثات الكيميائية ومياه الصرف الصحي.",
    tags: ["حماية_السواحل", "ملوثات_برية", "تشريعات"],
  },
  {
    id: 5,
    year: 2013,
    title: "إطلاق البعثة البحرية الشاملة لتقييم جودة المياه والأحياء",
    category: "env",
    era: "era_3",
    description: "تنفيذ مسح بحري شامل باستخدام سفن أبحاث متطورة لجمع عينات من الرواسب والمياه القاعية، لفحص نسب التلوث بالمعادن الثقيلة وتأثير التغير المناخي على التنوع البيولوجي والشعاب المرجانية في المنطقة البحرية.",
    tags: ["بحث_علمي", "جودة_المياه", "تنوع_بيولوجي"],
  },
  {
    id: 6,
    year: 2026,
    title: "تحديث الإستراتيجية الإقليمية لمواجهة التغير المناخي",
    category: "admin",
    era: "era_3",
    description: "اعتماد وثيقة إستراتيجية موحدة تجمع الدول الأعضاء لتعزيز مرونة البيئة البحرية أمام ارتفاع درجات حرارة المياه، وظواهر المد الأحمر المتكررة، وتنسيق أنظمة الإنذار المبكر والتفتيش الرقمي المستمر.",
    tags: ["رؤية_مستقبلية", "التغير_المناخي", "المد_الأحمر"],
  }
];

export default function App() {
  // ==========================================
  // 2. إدارة الحالة (State Management)
  // ==========================================
  const [activeTab, setActiveTab] = useState('timeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [darkMode, setDarkMode] = useState(true); // تم جعل الوضع المظلم افتراضياً ليناسب الهوية البحرية الفخمة
  const [viewMode, setViewMode] = useState('cards');

  // ==========================================
  // 3. منطق الفرز والبحث (Search & Filter Logic)
  // ==========================================
  const filteredEvents = useMemo(() => {
    return TIMELINE_EVENTS.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.year.toString().includes(searchQuery);
      
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const matchesEra = selectedEra === 'all' || event.era === selectedEra;

      return matchesSearch && matchesCategory && matchesEra;
    }).sort((a, b) => a.year - b.year);
  }, [searchQuery, selectedCategory, selectedEra]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`} dir="rtl">
      
      {/* الرأس (Header) */}
      <header className={`border-b ${darkMode ? 'bg-slate-900 border-teal-950' : 'bg-white border-slate-200'} sticky top-0 z-40 shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* عنوان الموقع المحدث */}
          <div className="text-center md:text-right">
            <h1 className="text-2xl md:text-3xl font-black text-teal-500 dark:text-teal-400 tracking-wide">
              {TEMPLATE_INFO.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-teal-600/80 mt-1 font-bold">
              {TEMPLATE_INFO.subtitle} ({TEMPLATE_INFO.yearsRange})
            </p>
          </div>

          {/* أزرار التنقل الرئيسية ومبدل الوضع المظلم */}
          <div className="flex items-center gap-3">
            <div className={`flex rounded-lg p-1 ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <button 
                onClick={() => setActiveTab('timeline')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'timeline' ? (darkMode ? 'bg-teal-600 text-white shadow' : 'bg-white text-teal-600 shadow') : 'text-slate-500'}`}
              >
                الأرشيف والخط الزمني
              </button>
              <button 
                onClick={() => setActiveTab('atlas')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'atlas' ? (darkMode ? 'bg-teal-600 text-white shadow' : 'bg-white text-teal-600 shadow') : 'text-slate-500'}`}
              >
                أطلس المعالم والمنطقة البحرية
              </button>
              <button 
                onClick={() => setActiveTab('info')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'info' ? (darkMode ? 'bg-teal-600 text-white shadow' : 'bg-white text-teal-600 shadow') : 'text-slate-500'}`}
              >
                عن ROPME
              </button>
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg border transition-colors ${darkMode ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-white border-slate-200 text-slate-600'}`}
              title="تغيير نمط الإضاءة"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* المحتوى الرئيسي للمنصة */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* التبويب الأول: المستكشف الزمني */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            
            {/* أدوات البحث والفلترة */}
            <div className={`p-6 rounded-xl border transition-colors ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* حقل البحث بالكلمات والسنوات */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">ابحث عن سنة، وثيقة قانونية أو حدث بيئي:</label>
                  <input 
                    type="text" 
                    placeholder="مثال: 1978، اتفاقية، تسرب نفطي..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border text-sm outline-none transition-colors ${darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-teal-500' : 'bg-slate-50 border-slate-200 focus:border-teal-500'}`}
                  />
                </div>

                {/* قائمة اختيار الفترة الزمنية */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">تصفية حسب الحقبة التاريخية:</label>
                  <select 
                    value={selectedEra}
                    onChange={(e) => setSelectedEra(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors ${darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-teal-500' : 'bg-slate-50 border-slate-200 focus:border-teal-500'}`}
                  >
                    {ERAS.map(era => (
                      <option key={era.id} value={era.id} className={darkMode ? 'bg-slate-950' : 'bg-white'}>{era.name}</option>
                    ))}
                  </select>
                </div>

                {/* أزرار اختيار طريقة العرض والتصفير السريع */}
                <div className="flex flex-col justify-end">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setViewMode(viewMode === 'cards' ? 'list' : 'cards')}
                      className={`flex-1 py-2 px-4 rounded-lg border text-xs font-bold flex items-center justify-center gap-1 transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'}`}
                    >
                      {viewMode === 'cards' ? 'عرض السرد المتسلسل (خطي)' : 'عرض شبكة البطاقات'}
                    </button>
                    {(searchQuery || selectedCategory !== 'all' || selectedEra !== 'all') && (
                      <button 
                        onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedEra('all'); }}
                        className="px-3 py-2 bg-rose-950/40 text-rose-400 border border-rose-900/50 rounded-lg text-xs font-bold hover:bg-rose-900/60 transition-colors"
                      >
                        إلغاء الفلاتر
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* أزرار فرز تصنيفات المجالات بيئية/قانونية */}
              <div className="mt-6 pt-4 border-t border-slate-800 dark:border-slate-800">
                <span className="block text-xs font-bold text-slate-400 mb-2.5">تصنيفات الملفات والمستندات:</span>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${selectedCategory === cat.id ? 'bg-teal-600 text-white border-teal-600 shadow-md scale-105' : (darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700')}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* حالة عدم وجود نتائج */}
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-12 h-12 text-slate-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-slate-400 font-semibold">لا توجد وثائق أو أحداث تطابق الكلمات المفتاحية أو الفلاتر المختارة.</p>
                <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedEra('all'); }} className="text-sm text-teal-400 font-bold mt-2 hover:underline">إعادة عرض الأرشيف كاملاً</button>
              </div>
            ) : (
              /* عرض البيانات حسب النمط المختار */
              viewMode === 'cards' ? (
                /* عرض شبكة بطاقات متجاوبة */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredEvents.map(event => {
                    const catInfo = CATEGORIES.find(c => c.id === event.category) || CATEGORIES[0];
                    return (
                      <div 
                        key={event.id}
                        className={`p-6 rounded-xl border-t-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${catInfo.borderColor || 'border-teal-600'} ${darkMode ? 'bg-slate-900 border-x-slate-900 border-b-slate-900 text-white' : 'bg-white border-x-slate-200 border-b-slate-200 shadow-sm'}`}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold tracking-wider text-white ${catInfo.color}`}>
                            {catInfo.name}
                          </span>
                          <span className="text-2xl font-black text-teal-400 dark:text-teal-400">
                            {event.year} م
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-slate-100 dark:text-white">{event.title}</h3>
                        <p className={`text-sm leading-relaxed mb-4 text-justify ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{event.description}</p>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {event.tags.map((tag, i) => (
                            <span key={i} className={`text-[10px] px-2 py-0.5 rounded font-medium ${darkMode ? 'bg-slate-800 text-teal-400' : 'bg-slate-100 text-teal-700'}`}>
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* عرض سرد متسلسل (خط زمني كلاسيكي) */
                <div className="relative border-r-2 border-teal-900 dark:border-teal-900 mr-4 pr-6 space-y-8">
                  {filteredEvents.map(event => {
                    const catInfo = CATEGORIES.find(c => c.id === event.category) || CATEGORIES[0];
                    return (
                      <div key={event.id} className="relative group">
                        
                        {/* النقطة الدليليلة على الخط الزمني */}
                        <div className={`absolute -right-[31px] top-1.5 w-4 h-4 rounded-full border-4 ${darkMode ? 'bg-slate-950 border-teal-500' : 'bg-white border-teal-600'} transition-transform group-hover:scale-125`} />
                        
                        <div className={`p-5 rounded-xl border transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 shadow-xs'}`}>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xl font-black text-teal-400 dark:text-teal-400">{event.year} م</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold text-white ${catInfo.color}`}>{catInfo.name}</span>
                          </div>
                          <h3 className="text-md font-bold mb-1.5">{event.title}</h3>
                          <p className={`text-sm leading-relaxed text-justify ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{event.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}

          </div>
        )}

        {/* التبويب الثاني: أطلس معالم المنطقة البحرية */}
        {activeTab === 'atlas' && (
          <div className={`p-8 rounded-xl border text-center transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <svg className="w-16 h-16 text-teal-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <h2 className="text-xl font-bold mb-2">الخريطة الجغرافية التفاعلية للمنطقة البحرية (ROPME Sea Area)</h2>
            <p className={`text-sm max-w-xl mx-auto leading-relaxed mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              هذا القسم مجهز لربطه بخرائط النظم الجغرافية الحية (GIS) لرصد البقع النفطية، محطات المراقبة الوطنية، والمنشآت الساحلية للدول الثماني الأعضاء الموقعة على اتفاقية الكويت.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className={`px-4 py-2 rounded-lg text-xs font-semibold ${darkMode ? 'bg-slate-850 text-teal-400 border border-slate-800' : 'bg-slate-100 text-slate-600'}`}>مركز الطوارئ (البحرين)</span>
              <span className={`px-4 py-2 rounded-lg text-xs font-semibold ${darkMode ? 'bg-slate-850 text-teal-400 border border-slate-800' : 'bg-slate-100 text-slate-600'}`}>مقر الأمانة العامة (الكويت)</span>
              <span className={`px-4 py-2 rounded-lg text-xs font-semibold ${darkMode ? 'bg-slate-850 text-teal-400 border border-slate-800' : 'bg-slate-100 text-slate-600'}`}>محطات الرصد القارية</span>
            </div>
          </div>
        )}

        {/* التبويب الثالث: حول المنظمة */}
        {activeTab === 'info' && (
          <div className={`p-8 rounded-xl border transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className="text-xl font-bold mb-4 text-teal-400">عن المنظمة الإقليمية لحماية البيئة البحرية (ROPME)</h2>
            <div className="space-y-4 text-sm leading-relaxed text-justify">
              <p className={darkMode ? 'text-slate-300' : 'text-slate-600'}>
                تأسست المنظمة بناءً على اتفاقية الكويت الإقليمية لعام 1978، وتضم في عضويتها ثماني دول مطلة على المنطقة البحرية المشتركة: الإمارات العربية المتحدة، مملكة البحرين، المملكة العربية السعودية، سلطة عمان، دولة قطر، دولة الكويت، جمهورية العراق، والجمهورية الإسلامية الإيرانية.
              </p>
              <p className={darkMode ? 'text-slate-300' : 'text-slate-600'}>
                يهدف هذا الأرشيف التاريخي المستوحى من هندسة المنصات الوطنية التوثيقية المتقدمة إلى حصر وتصنيف كل قرار وزاري، أو بروتوكول بيئي، أو مسح بحري علمي جرى تنفيذه لحماية الثروة السمكية والمائية الفريدة للمنطقة البحرية وتأمينها للأجيال القادمة.
              </p>
            </div>
          </div>
        )}

      </main>

      {/* التذييل الثابت (Footer) */}
      <footer className={`border-t py-6 mt-12 text-center text-xs ${darkMode ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
        <p>© {new Date().getFullYear()} {TEMPLATE_INFO.title}. جميع الحقوق محفوظة للمنظمة وللدول الأعضاء.</p>
      </footer>

    </div>
  );
}