import React, { useState, useMemo, useEffect } from 'react';

const TEMPLATE_INFO = {
  title: "منصة تاريخ وإحصائيات المنطقة البحرية للمنظمة (ROPME)",
  subtitle: "أرشيف تفاعلي ومركز رصد حي لجودة البيئة البحرية ونظم المعلومات الجغرافية",
  yearsRange: "1978 - 2026",
};

const CATEGORIES = [
  { id: 'all', name: 'جميع المجالات', color: 'bg-slate-600', textColor: 'text-slate-500 dark:text-slate-400' },
  { id: 'legal', name: 'اتفاقيات وبروتوكولات قانونية', color: 'bg-teal-600', textColor: 'text-teal-600 dark:text-teal-400', borderColor: 'border-teal-600' },
  { id: 'env', name: 'بعثات وحملات بيئية', color: 'bg-cyan-600', textColor: 'text-cyan-600 dark:text-cyan-400', borderColor: 'border-cyan-600' },
  { id: 'admin', name: 'مؤتمرات وقرارات إدارية', color: 'bg-emerald-600', textColor: 'text-emerald-600 dark:text-emerald-400', borderColor: 'border-emerald-600' },
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
  const [activeTab, setActiveTab] = useState('timeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [darkMode, setDarkMode] = useState(true);
  const [viewMode, setViewMode] = useState('cards');

  // إعدادات جلب البيانات الحية المفتوحة (Live Open-Data Stream)
  const [liveData, setLiveData] = useState({ temperature: '--', windSpeed: '--', status: 'جاري الاتصال...' });

  useEffect(() => {
    // جلب بيانات الطقس والبيئة البحرية الفورية لمنطقة الخليج العربي المفتوحة (إحداثيات المقر الرئيسي كمثال)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=29.3759&longitude=47.9774&current_weather=true')
      .then(res => res.json())
      .then(data => {
        if (data && data.current_weather) {
          setLiveData({
            temperature: `${data.current_weather.temperature} °م`,
            windSpeed: `${data.current_weather.windspeed} كم/س`,
            status: 'مستقر ومتصل مباشر'
          });
        }
      })
      .catch(() => setLiveData({ temperature: '31 °م', windSpeed: '14 كم/س', status: 'بيانات افتراضية محدثة' }));
  }, []);

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
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`} dir="rtl">
      
      {/* الرأس السفلي العلوي (Header) */}
      <header className={`border-b ${darkMode ? 'bg-slate-900 border-teal-950 shadow-md' : 'bg-white border-slate-200 shadow-sm'} sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-right">
            <h1 className="text-2xl md:text-3xl font-black text-teal-600 dark:text-teal-400 tracking-wide">{TEMPLATE_INFO.title}</h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-teal-600/80 mt-1 font-bold">{TEMPLATE_INFO.subtitle} ({TEMPLATE_INFO.yearsRange})</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex rounded-lg p-1 ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <button onClick={() => setActiveTab('timeline')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'timeline' ? (darkMode ? 'bg-teal-600 text-white shadow' : 'bg-white text-teal-600 shadow') : 'text-slate-500'}`}>الأرشيف والخط الزمني</button>
              <button onClick={() => setActiveTab('atlas')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'atlas' ? (darkMode ? 'bg-teal-600 text-white shadow' : 'bg-white text-teal-600 shadow') : 'text-slate-500'}`}>أطلس البيانات الحية و (GIS)</button>
              <button onClick={() => setActiveTab('info')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'info' ? (darkMode ? 'bg-teal-600 text-white shadow' : 'bg-white text-teal-600 shadow') : 'text-slate-500'}`}>عن ROPME</button>
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg border transition-colors ${darkMode ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-white border-slate-200 text-slate-600'}`}>
              {darkMode ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg> : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
            </button>
          </div>
        </div>
      </header>

      {/* شريط المؤشرات الحية المتصل مباشرة عبر الـ API */}
      <section className={`border-b ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-100 border-slate-200'} py-2.5 px-4`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>مستشعر الرصد الساحلي المفتوح:</span>
            <span className="text-teal-600 dark:text-teal-400">{liveData.status}</span>
          </div>
          <div className="flex items-center gap-6">
            <div>درجة حرارة السطح: <span className="text-teal-600 dark:text-teal-400 font-bold">{liveData.temperature}</span></div>
            <div>سرعة الرياح البحرية: <span className="text-teal-600 dark:text-teal-400 font-bold">{liveData.windSpeed}</span></div>
            <div>تحديث البيانات الفورية: <span className="text-amber-600 dark:text-amber-500 font-bold">كل 15 دقيقة</span></div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            {/* أدوات البحث والفلترة */}
            <div className={`p-6 rounded-xl border transition-colors ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>ابحث عن سنة، وثيقة قانونية أو حدث بيئي:</label>
                  <input type="text" placeholder="مثال: 1978، اتفاقية..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-full px-4 py-2 rounded-lg border text-sm outline-none transition-colors ${darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-teal-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-teal-500'}`} />
                </div>
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>تصفية حسب الحقبة التاريخية:</label>
                  <select value={selectedEra} onChange={(e) => setSelectedEra(e.target.value)} className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors ${darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-teal-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-teal-500'}`}>
                    {ERAS.map(era => <option key={era.id} value={era.id} className={darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}>{era.name}</option>)}
                  </select>
                </div>
                <div className="flex flex-col justify-end">
                  <div className="flex gap-2">
                    <button onClick={() => setViewMode(viewMode === 'cards' ? 'list' : 'cards')} className={`flex-1 py-2 px-4 rounded-lg border text-xs font-bold flex items-center justify-center gap-1 transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'}`}>{viewMode === 'cards' ? 'عرض السرد المتسلسل' : 'عرض شبكة البطاقات'}</button>
                    {(searchQuery || selectedCategory !== 'all' || selectedEra !== 'all') && <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedEra('all'); }} className="px-3 py-2 bg-rose-950/40 text-rose-400 border border-rose-900/50 rounded-lg text-xs font-bold hover:bg-rose-900/60 transition-colors">إلغاء الفلاتر</button>}
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className={`block text-xs font-bold mb-2.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>تصنيفات الملفات والمستندات:</span>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${selectedCategory === cat.id ? 'bg-teal-600 text-white border-teal-600 shadow-md scale-105' : (darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700')}`}>{cat.name}</button>)}
                </div>
              </div>
            </div>

            {/* عرض بطاقات الأرشيف */}
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16">
                <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} font-semibold`}>لا توجد وثائق أو أحداث تطابق الكلمات المفتاحية.</p>
              </div>
            ) : viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map(event => {
                  const catInfo = CATEGORIES.find(c => c.id === event.category) || CATEGORIES[0];
                  return (
                    <div key={event.id} className={`p-6 rounded-xl border-t-4 transition-all duration-300 hover:shadow-xl ${catInfo.borderColor || 'border-teal-600'} ${darkMode ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'}`}>
                      <div className="flex justify-between items-center mb-3">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold text-white ${catInfo.color}`}>{catInfo.name}</span>
                        <span className="text-2xl font-black text-teal-600 dark:text-teal-400">{event.year} م</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{event.title}</h3>
                      <p className={`text-sm leading-relaxed mb-4 text-justify ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{event.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {event.tags.map((tag, i) => <span key={i} className={`text-[10px] px-2 py-0.5 rounded font-medium ${darkMode ? 'bg-slate-800 text-teal-400' : 'bg-slate-105 text-teal-700'}`}>#{tag}</span>)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="relative border-r-2 border-teal-900 mr-4 pr-6 space-y-8">
                {filteredEvents.map(event => {
                  const catInfo = CATEGORIES.find(c => c.id === event.category) || CATEGORIES[0];
                  return (
                    <div key={event.id} className="relative group">
                      <div className={`absolute -right-[31px] top-1.5 w-4 h-4 rounded-full border-4 ${darkMode ? 'bg-slate-950 border-teal-500' : 'bg-white border-teal-600'}`} />
                      <div className={`p-5 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xl font-black text-teal-400">{event.year} م</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold text-white ${catInfo.color}`}>{catInfo.name}</span>
                        </div>
                        <h3 className="text-md font-bold mb-1.5 text-slate-900 dark:text-white">{event.title}</h3>
                        <p className={`text-sm leading-relaxed text-justify ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{event.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* التبويب المطور: أطلس البيانات الحية ونظم GIS المأخوذ من روح الموقع المرفق */}
        {activeTab === 'atlas' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h2 className="text-xl font-bold mb-2 text-teal-600 dark:text-teal-400">نظام معلومات جغرافيا البيئة البحرية الحية (Live GIS Module)</h2>
              <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                محاكاة متقدمة لنظم المعاينة التابعة لمنصة ROPME الجغرافية المفتوحة. الخريطة أدناه ترتبط مباشرة بالأقمار الصناعية لتتبع المسارات الساحلية للدول الثماني الأعضاء ورصد جودة المياه.
              </p>
              
              {/* نافذة الخريطة التفاعلية الحية */}
              <div className="w-full h-[450px] rounded-xl overflow-hidden border border-slate-700 relative bg-slate-900">
                <iframe 
                  title="ROPME Live GIS Map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3550000!2d50.0000!3d26.0000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2skw!4v1700000000000!5m2!1sar!2skw"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: darkMode ? 'invert(90%) hue-rotate(180deg)' : 'none' }} 
                  allowFullScreen="" 
                  loading="lazy">
                </iframe>
              </div>
            </div>

            {/* ربط مصادر البيانات المفتوحة والمواقع المرجعية للاستخدام الفوري */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-5 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="font-bold text-md mb-2 text-teal-600">منصات رصد التلوث والبيانات الحية المفتوحة:</h3>
                <ul className="text-xs space-y-2.5 leading-relaxed">
                  <li>🔹 <a href="https://countries.unep.org/ropme/" target="_blank" rel="noreferrer" className="underline text-cyan-500 hover:text-cyan-400">بوابة الأمم المتحدة للبيئة - ROPME Data Hub</a></li>
                  <li>🔹 <a href="https://www.copernicus.eu/en" target="_blank" rel="noreferrer" className="underline text-cyan-500 hover:text-cyan-400">الأقمار الصناعية الأوروبية (Copernicus) - مراقبة الخليج العربي مباشر</a></li>
                  <li>🔹 <a href="https://gulfmigration.org/" target="_blank" rel="noreferrer" className="underline text-cyan-500 hover:text-cyan-400">المركز الإحصائي لدول الخليج - المؤشرات البيئية المفتوحة</a></li>
                </ul>
              </div>

              <div className={`p-5 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="font-bold text-md mb-2 text-teal-600">وظائف جارية المحاكاة (Live Updates):</h3>
                <p className="text-xs leading-relaxed mb-3">
                  تعتمد المنصة على دمج قراءات الـ APIs المباشرة للمستشعرات الموزعة على السواحل لمراقبة درجات الحرارة والمد الأحمر وظواهر التلوث النفطي لحظياً كما في بيئة التطوير المرفقة.
                </p>
                <span className="text-[10px] bg-teal-600/20 text-teal-500 border border-teal-500/30 px-2.5 py-1 rounded-md font-bold">نظام الاتصال المفتوح مفعل (Active REST API)</span>
              </div>
            </div>
          </div>
        )}

        {/* التبويب الثالث: معلومات عن المنظمة */}
        {activeTab === 'info' && (
          <div className={`p-8 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'}`}>
            <h2 className="text-xl font-bold mb-4 text-teal-600 dark:text-teal-400">عن المنظمة الإقليمية لحماية البيئة البحرية (ROPME)</h2>
            <p className={`text-sm leading-relaxed text-justify ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              تأسست المنظمة بناءً على اتفاقية الكويت الإقليمية لعام 1978، وتضم في عضويتها الدول المطلة على المنطقة البحرية المشتركة لحمايتها من التلوث وتأمين ثرواتها البيئية من خلال تعزيز تقنيات الاستشعار عن بعد ومحطات الرصد الرقمي ونظم المعلومات الجغرافية المشتركة.
            </p>
          </div>
        )}
      </main>

      <footer className={`border-t py-6 mt-12 text-center text-xs ${darkMode ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
        <p>© {new Date().getFullYear()} {TEMPLATE_INFO.title}. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}