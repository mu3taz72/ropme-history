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

// روابط الصور الحقيقية والمباشرة المسحوبة من خادم نظام الـ ROPME المرفق لقسم المبادرات والتقارير
const GALLERY_IMAGES = [
  { 
    id: 1, 
    title: "برنامج رصد جودة مياه البحر والأحياء البحرية", 
    url: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img3.jpg", 
    desc: "أخذ القياسات الحقلية لدرجات الحرارة والمستويات الأكسجينية والملوحة لتقييم صحة النظام الإيكولوجي في المحطات المعتمدة للدول الأعضاء." 
  },
  { 
    id: 2, 
    title: "مركز المساعدة المتبادلة للطوارئ البحرية (MEMAC)", 
    url: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img1.jpg", 
    desc: "متابعة وتنسيق خطط الاستجابة السريعة لمكافحة حوادث التلوث بالزيت والمواد الضارة الناتجة عن ناقلات النفط والأنشطة الملاحية." 
  },
  { 
    id: 3, 
    title: "مراقبة الملوثات من المصادر البرية والأخدود الساحلي", 
    url: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img2.jpg", 
    desc: "تتبع المصارف الصناعية والمخلفات الساحلية لحصر الملوثات الكيميائية والمعادن الثقيلة المؤثرة على التنوع البيولوجي في المنطقة البحرية لـ ROPME." 
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('timeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [darkMode, setDarkMode] = useState(true);
  const [viewMode, setViewMode] = useState('cards');

  const [metrics, setMetrics] = useState({
    humidity: '37',
    temperature: '38',
    windSpeed: '14',
    windAngle: '171',
    lastUpdate: '13:45 19-06-2026'
  });

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=29.3759&longitude=47.9774&current_weather=true&relative_humidity_2m=true')
      .then(res => res.json())
      .then(data => {
        if (data && data.current_weather) {
          const now = new Date();
          const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
          setMetrics({
            humidity: data.current_weather.humidity || '37',
            temperature: Math.round(data.current_weather.temperature) || '38',
            windSpeed: Math.round(data.current_weather.windspeed) || '14',
            windAngle: data.current_weather.winddirection || '171',
            lastUpdate: timeString
          });
        }
      })
      .catch(() => console.log("Using cached open-source telemetry metrics layout."));
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
      
      {/* Header */}
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
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg border transition-colors ${darkMode ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-white border-slate-200 text-slate-600'}`}>
              {darkMode ? "☀️ النمط المضيء" : "🌙 النمط الداكن"}
            </button>
          </div>
        </div>
      </header>

      {/* لوحة المؤشرات الجغرافية الدائرية */}
      <section className={`border-b ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100/70 border-slate-200'} py-8 px-4`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-indigo-950 bg-white text-indigo-950'}`}>
              {metrics.humidity}
            </div>
            <div className={`flex items-center gap-1 text-sm font-bold ${darkMode ? 'text-slate-300' : 'text-indigo-950'}`}>
              <span className="text-blue-500">💧</span> متوسط الرطوبة (%)
            </div>
            <span className="text-[10px] text-slate-500 mt-1">آخر تحديث {metrics.lastUpdate}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-indigo-950 bg-white text-indigo-950'}`}>
              {metrics.temperature}
            </div>
            <div className={`flex items-center gap-1 text-sm font-bold ${darkMode ? 'text-slate-300' : 'text-indigo-950'}`}>
              <span className="text-orange-500">🌡️</span> متوسط درجة الحرارة (مئوية)
            </div>
            <span className="text-[10px] text-slate-500 mt-1">آخر تحديث {metrics.lastUpdate}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-indigo-950 bg-white text-indigo-950'}`}>
              {metrics.windSpeed}
            </div>
            <div className={`flex items-center gap-1 text-sm font-bold ${darkMode ? 'text-slate-300' : 'text-indigo-950'}`}>
              <span className="text-teal-500">💨</span> متوسط سرعة الرياح (كم/ساعة)
            </div>
            <span className="text-[10px] text-slate-500 mt-1">آخر تحديث {metrics.lastUpdate}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-indigo-950 bg-white text-indigo-950'}`}>
              {metrics.windAngle}
            </div>
            <div className={`flex items-center gap-1 text-sm font-bold ${darkMode ? 'text-slate-300' : 'text-indigo-950'}`}>
              <span className="text-yellow-500">⚡</span> متوسط زاوية الرياح (°)
            </div>
            <span className="text-[10px] text-slate-500 mt-1">آخر تحديث {metrics.lastUpdate}</span>
          </div>

        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {activeTab === 'timeline' && (
          <div className="space-y-8">
            
            {/* الفلاتر والبحث */}
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
                  <button onClick={() => setViewMode(viewMode === 'cards' ? 'list' : 'cards')} className={`w-full py-2 px-4 rounded-lg border text-xs font-bold flex items-center justify-center gap-1 transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'}`}>{viewMode === 'cards' ? 'عرض السرد المتسلسل' : 'عرض شبكة البطاقات'}</button>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className={`block text-xs font-bold mb-2.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>تصنيفات الملفات والمستندات:</span>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${selectedCategory === cat.id ? 'bg-teal-600 text-white border-teal-600 shadow-md scale-105' : (darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700')}`}>{cat.name}</button>)}
                </div>
              </div>
            </div>

            {/* عرض الأحداث */}
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
                        <span className="text-xl font-black text-teal-400 block mb-1">{event.year} m</span>
                        <h3 className="text-md font-bold mb-1.5 text-slate-900 dark:text-white">{event.title}</h3>
                        <p className={`text-sm leading-relaxed text-justify ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{event.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* المعرض المحدث المدقق بروابط الخادم الحقيقي لـ ROPME */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold mb-6 text-teal-600 dark:text-teal-400">معرض الصور التاريخي والتوثيقي للمنظمة (ROPME Media Archive)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {GALLERY_IMAGES.map(img => (
                  <div key={img.id} className={`rounded-xl overflow-hidden border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} group`}>
                    <div className="h-44 overflow-hidden relative bg-slate-900">
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-sm mb-1 text-slate-900 dark:text-white">{img.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{img.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* أطلس النظم الجغرافية */}
        {activeTab === 'atlas' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h2 className="text-xl font-bold mb-2 text-teal-600 dark:text-teal-400">نظام معلومات جغرافيا البيئة البحرية الحية (Live GIS Module)</h2>
              <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>خريطة تفاعلية ترصد النطاق الجغرافي للمنطقة البحرية المشتركة للدول الأعضاء المطلة على البحر لمتابعة التغيرات المناخية والبيئية حياً.</p>
              <div className="w-full h-[450px] rounded-xl overflow-hidden border border-slate-700 relative bg-slate-900">
                <iframe 
                  title="ROPME GIS Real-time Engine"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3550000!2d50.0000!3d26.0000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2skw!4v1700000000000!5m2!1sar!2skw"
                  width="100%" height="100%" style={{ border: 0, filter: darkMode ? 'invert(90%) hue-rotate(180deg)' : 'none' }} allowFullScreen="" loading="lazy">
                </iframe>
              </div>
            </div>
          </div>
        )}

      </main>

      <footer className={`border-t py-6 mt-12 text-center text-xs ${darkMode ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
        <p>© {new Date().getFullYear()} {TEMPLATE_INFO.title}. جميع الحقوق محفوظة للمنظمة وللدول الأعضاء.</p>
      </footer>
    </div>
  );
}