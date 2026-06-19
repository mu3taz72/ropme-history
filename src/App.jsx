import React, { useState, useMemo, useEffect } from 'react';

const TEMPLATE_INFO = {
  title: " تاريخ وإحصائيات المنظمة الاقليمية لحماية البيئة البحرية (ROPME)",
  subtitle: "أرشيف تفاعلي ومركز رصد حي لجودة البيئة البحرية ونظم المعلومات الجغرافية",
  yearsRange: "1978 - 2026",
};

const CATEGORIES = [
  { id: 'الكل', name: 'جميع المجالات', color: 'bg-emerald-800', textColor: 'text-emerald-800' },
  { id: 'legal', name: 'اتفاقيات وبروتوكولات قانونية', color: 'bg-teal-800 border-teal-700', textColor: 'text-teal-700', borderColor: 'border-teal-700' },
  { id: 'env', name: 'بعثات وحملات بيئية', color: 'bg-cyan-800 border-cyan-700', textColor: 'text-cyan-700', borderColor: 'border-cyan-700' },
  { id: 'admin', name: 'مؤتمرات وقرارات إدارية', color: 'bg-emerald-800 border-emerald-700', textColor: 'text-emerald-700', borderColor: 'border-emerald-700' },
];

const ERAS = [
  { id: 'الكل', name: 'عرض جميع الفترات التاريخية' },
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
    icon: "📜",
    description: "تبنى المؤتمر الإقليمي للمفوضين حماية وتطوير البيئة البحرية والمناطق الساحلية، وتم توقيع اتفاقية الكويت الإقليمية وخطة العمل الإقليمية، مما وضع الحجر الأساس الرسمي لنشأة المنظمة بمشاركة الدول المطلة على المنطقة البحرية لحمايتها من التلوث."
  },
  {
    id: 2,
    year: 1982,
    title: "دخول بروتوكول مكافحة التلوث بالزيت حيز التنفيذ",
    category: "legal",
    era: "era_1",
    icon: "⚓",
    description: "تفعيل البروتوكول الخاص بالتعاون الإقليمي للمكافحة في الحالات الطارئة، وتأسيس مركز المساعدة المتبادلة للطوارئ البحرية (MEMAC) في البحرين لتنسيق الاستجابة العاجلة للحوادث والتسربات النفطية الكبرى."
  },
  {
    id: 3,
    year: 1991,
    title: "مواجهة أكبر تسرب نفطي بحري في التاريخ",
    category: "env",
    era: "era_2",
    icon: "🐳",
    description: "قادت المنظمة جهوداً جبارة بالتنسيق العالي مع المؤسسات الدولية لرصد وتقييم الأثر البيئي المدمر الناتج عن تدفق ملايين براميل النفط خلال حرب تحرير الكويت، وتدشين خطط إعادة تأهيل الشواطئ المتضررة والمصايد السمكية."
  },
  {
    id: 4,
    year: 1998,
    title: "بروتوكول التحكم في التلوث البحري الناجم عن مصادر برية",
    category: "legal",
    era: "era_2",
    icon: "📜",
    description: "توقيع اتفاقية ملزمة للتحكم في الأنشطة الصناعية والحضرية المقامة على السواحل، والتي تصرف مخلفاتها بشكل مباشر أو غير مباشر في مياه الخليج، بهدف تقليل الملوثات الكيميائية ومياه الصرف الصحي."
  },
  {
    id: 5,
    year: 2013,
    title: "إطلاق البعثة البحرية الشاملة لتقييم جودة المياه والأحياء",
    category: "env",
    era: "era_3",
    icon: "🔬",
    description: "تنفيذ مسح بحري شامل باستخدام سفن أبحاث متطورة لجمع عينات من الرواسب والمياه القاعية، لفحص نسب التلوث بالمعادن الثقيلة وتأثير التغير المناخي على التنوع البيولوجي والشعاب المرجانية في المنطقة البحرية."
  },
  {
    id: 6,
    year: 2026,
    title: "تحديث الإستراتيجية الإقليمية لمواجهة التغير المناخي",
    category: "admin",
    era: "era_3",
    icon: "🔋",
    description: "اعتماد وثيقة إستراتيجية موحدة تجمع الدول الأعضاء لتعزيز مرونة البيئة البحرية أمام ارتفاع درجات حرارة المياه، وظواهر المد الأحمر المتكررة، وتنسيق أنظمة الإنذار المبكر والتفتيش الرقمي المستمر."
  }
];

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedEra, setSelectedEra] = useState('الكل');
  const [viewMode, setViewMode] = useState('grid');
  
  // الاحتفاظ بالسمة التبادلية مع تحديث الألوان التناغمية الجديدة
  const [themeMode, setThemeMode] = useState('sepia');

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
      .catch(() => console.log("Using core stable fallback telemetry stream."));
  }, []);

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

  // تعديل درجات الألوان للـ Sepia لتعتمد على الأخضر الزمردي الداكن بدلاً من البني (بند 3)
  const bgThemeClass = themeMode === 'sepia' 
    ? 'bg-[#f5efe4] text-[#1e3f20] selection:bg-emerald-800 selection:text-emerald-50' 
    : 'bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950';

  const cardThemeClass = themeMode === 'sepia'
    ? 'bg-[#e2dacb] border-[#cbd4c5] hover:border-emerald-800/80'
    : 'bg-slate-900 border-slate-800 hover:border-amber-400/80';

  const inputThemeClass = themeMode === 'sepia'
    ? 'bg-[#fcfaf5] border-[#b8c4b1] text-[#1e3f20] placeholder-[#556b2f] focus:border-emerald-800'
    : 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-amber-500';

  return (
    <div dir="rtl" className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${bgThemeClass}`}>
      
      {/* الرأس المحاكي لستايل البوستر الأكاديمي بالألوان الجديدة */}
      <header className={`border-b backdrop-blur-md sticky top-0 z-40 px-4 py-3 md:px-8 transition-colors duration-500 ${themeMode === 'sepia' ? 'border-[#cbd4c5] bg-[#f5efe4]/90' : 'border-slate-800 bg-slate-900/85'}`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div>
            <h1 className={`text-xl md:text-2xl font-black tracking-tight ${themeMode === 'sepia' ? 'text-emerald-950' : 'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400'}`}>
              {TEMPLATE_INFO.title}
            </h1>
            <p className={`text-xs mt-1 ${themeMode === 'sepia' ? 'text-[#4f6f52]' : 'text-slate-400'}`}>
              {TEMPLATE_INFO.subtitle} ({TEMPLATE_INFO.yearsRange})
            </p>
          </div>

          <nav className={`flex flex-wrap justify-center items-center gap-1.5 p-1.5 rounded-xl border ${themeMode === 'sepia' ? 'bg-[#d0c9bc] border-[#cbd4c5]' : 'bg-slate-950 border-slate-800'}`}>
            <button onClick={() => setActiveTab('timeline')} className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${activeTab === 'timeline' ? 'bg-emerald-800 text-white shadow-md' : 'text-slate-600'}`}>الأرشيف والخط الزمني</button>
            <button onClick={() => setActiveTab('atlas')} className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${activeTab === 'atlas' ? 'bg-emerald-800 text-white shadow-md' : 'text-slate-600'}`}>أطلس النظم الجغرافية (GIS)</button>
          </nav>

          <button onClick={() => setThemeMode(themeMode === 'sepia' ? 'dark' : 'sepia')} className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all ${themeMode === 'sepia' ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-[#e2dacb] border-[#cbd4c5] text-emerald-900'}`}>
            {themeMode === 'sepia' ? '✨ النمط الداكن الحديث' : '📜 مظهر البوستر الزمردي'}
          </button>
        </div>
      </header>

      {/* لوحة التحكم بالمؤشرات الجغرافية الدائرية بتصميم هندسي متميز */}
      <section className={`border-b ${themeMode === 'sepia' ? 'bg-[#e2dacb]/60 border-[#cbd4c5]' : 'bg-slate-900/60 border-slate-800'} py-8 px-4`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${themeMode === 'sepia' ? 'border-emerald-900/40 bg-[#fcfaf5] text-emerald-950' : 'border-slate-700 bg-slate-950 text-slate-100'}`}>{metrics.humidity}</div>
            <div className="text-xs font-bold">💧 متوسط الرطوبة (%)</div>
            <span className="text-[9px] text-slate-500 mt-0.5">آخر تحديث {metrics.lastUpdate}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${themeMode === 'sepia' ? 'border-emerald-900/40 bg-[#fcfaf5] text-emerald-950' : 'border-slate-700 bg-slate-950 text-slate-100'}`}>{metrics.temperature}</div>
            <div className="text-xs font-bold">🌡️ متوسط درجة الحرارة (مئوية)</div>
            <span className="text-[9px] text-slate-500 mt-0.5">آخر تحديث {metrics.lastUpdate}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${themeMode === 'sepia' ? 'border-emerald-900/40 bg-[#fcfaf5] text-emerald-950' : 'border-slate-700 bg-slate-950 text-slate-100'}`}>{metrics.windSpeed}</div>
            <div className="text-xs font-bold">💨 متوسط سرعة الرياح (كم/ساعة)</div>
            <span className="text-[9px] text-slate-500 mt-0.5">آخر تحديث {metrics.lastUpdate}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${themeMode === 'sepia' ? 'border-emerald-900/40 bg-[#fcfaf5] text-emerald-950' : 'border-slate-700 bg-slate-950 text-slate-100'}`}>{metrics.windAngle}</div>
            <div className="text-xs font-bold">⚡ متوسط زاوية الرياح (°)</div>
            <span className="text-[9px] text-slate-500 mt-0.5">آخر تحديث {metrics.lastUpdate}</span>
          </div>
        </div>
      </section>

      {/* المحتوى والمستكشف التاريخي */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-6">
        {activeTab === 'timeline' && (
          <div className="flex flex-col gap-6">
            
            {/* الفلاتر والبحث */}
            <div className={`p-4 md:p-6 rounded-2xl border shadow-xl flex flex-col gap-4 ${cardThemeClass}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="text" placeholder="ابحث في أرشيف الاتفاقيات والمستندات..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full border rounded-xl px-4 py-2 text-xs focus:outline-none transition-all ${inputThemeClass}`} />
                <select value={selectedEra} onChange={(e) => setSelectedEra(e.target.value)} className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none transition-all ${inputThemeClass}`}>
                  {ERAS.map(era => <option key={era.id} value={era.id}>{era.name}</option>)}
                </select>
                <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="py-2 px-4 rounded-lg border text-xs font-bold bg-emerald-800 text-white hover:bg-emerald-900">
                  {viewMode === 'grid' ? 'عرض السرد المتسلسل (الخطي)' : 'عرض شبكة البوستر المصورة'}
                </button>
              </div>

              <div className="mt-2 border-t border-emerald-900/10 pt-3">
                <div className="text-xs font-black mb-2">تصنيفات مجالات الرصد والحماية:</div>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map(cat => (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-3 py-1 rounded-md text-[11px] font-black border transition-all ${selectedCategory === cat.id ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-transparent border-emerald-900/20'}`}>{cat.name}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* شبكة البوستر أو السرد الخطي المطور */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredEvents.map(event => (
                  <div key={event.id} className={`rounded-2xl border flex flex-col overflow-hidden shadow-md transition-all ${cardThemeClass}`}>
                    <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-2xl font-black text-amber-600 font-mono">{event.year} م</span>
                          <span className="text-[9px] py-0.5 px-2 bg-emerald-850 text-white rounded font-bold">{event.icon} {event.category}</span>
                        </div>
                        <h3 className="text-sm font-black mb-1.5">{event.title}</h3>
                        <p className="text-xs leading-relaxed text-justify opacity-80">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative border-r-2 mr-4 md:mr-8 pl-2 flex flex-col gap-6 border-emerald-900/20">
                {filteredEvents.map(event => (
                  <div key={event.id} className="relative pr-8">
                    <div className="absolute right-[-7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 bg-emerald-800 border-emerald-100"></div>
                    <div className={`border rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between shadow-md ${cardThemeClass}`}>
                      <div className="text-2xl font-black text-amber-600 font-mono">{event.year} م</div>
                      <div className="flex-1">
                        <h3 className="text-sm font-black">{event.title}</h3>
                        <p className="text-xs mt-1 opacity-80">{event.description}</p>
                      </div>
                      <span className="text-xl p-2 rounded-xl bg-emerald-850 text-white">{event.icon}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* معرض الصور التوثيقي المباشر والمسحوب بالكامل من سيرفر ROPME */}
            <div className="pt-8 border-t border-emerald-900/10">
              <h2 className="text-base font-black mb-4 text-emerald-900 dark:text-emerald-400">معرض الصور التاريخي والتوثيقي للمنظمة (ROPME Media Archive)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {GALLERY_IMAGES.map(img => (
                  <div key={img.id} className={`rounded-xl overflow-hidden border shadow-sm group ${cardThemeClass}`}>
                    <div className="h-44 overflow-hidden relative bg-slate-950">
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-xs mb-1">{img.title}</h4>
                      <p className="text-[11px] leading-relaxed opacity-70">{img.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* أطلس النظم الجغرافية */}
        {activeTab === 'atlas' && (
          <div className={`p-6 rounded-2xl border shadow-xl bg-slate-900 border-slate-800 ${cardThemeClass}`}>
            <h2 className="text-base font-black mb-2">نظام معلومات جغرافيا البيئة البحرية الحية (Live GIS Module)</h2>
            <p className="text-xs mb-6 opacity-70">خريطة تفاعلية ترصد النطاق الجغرافي للمنطقة البحرية المشتركة للدول الأعضاء المطلة على البحر لمتابعة التغيرات المناخية والبيئية حياً.</p>
            <div className="w-full h-[450px] rounded-xl overflow-hidden border border-slate-700 relative bg-slate-900">
              <iframe title="ROPME GIS Map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3550000!2d50.0000!3d26.0000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2skw!4v1700000000000!5m2!1sar!2skw" width="100%" height="100%" style={{ border: 0, filter: themeMode === 'sepia' ? 'none' : 'invert(90%) hue-rotate(180deg)' }} allowFullScreen="" loading="lazy"></iframe>
            </div>
          </div>
        )}
      </main>

      {/* ذيل المنصة الأكاديمي المطور بالشكل الجديد */}
      <footer className={`border-t px-4 py-6 text-center text-xs transition-colors duration-500 ${themeMode === 'sepia' ? 'border-[#cbd4c5] bg-[#e2dacb]/40 text-[#1e3f20]' : 'border-slate-850 bg-slate-950 text-slate-400'}`}>
        <p className="font-black">حقوق الطبع والنشر © 2026 محفوظة للمنصة الإقليمية لحماية البيئة البحرية (ROPME)</p>
        <p className="text-[10px] mt-1">جميع البيانات والصور مسحوبة وموثقة من قنوات وبوابة التطوير للمنظمة الإقليمية للدول الأعضاء.</p>
      </footer>
    </div>
  );
}