import React, { useState, useMemo, useEffect } from 'react';

const TEMPLATE_INFO = {
  title: "منصة تاريخ وإحصائيات المنطقة البحرية للمنظمة (ROPME)",
  subtitle: "أرشيف تفاعلي ومركز رصد حي لجودة البيئة البحرية ونظم المعلومات الجغرافية",
  yearsRange: "1978 - 2026",
};

const CATEGORIES = [
  { id: 'all', name: 'جميع المجالات', color: 'bg-slate-600', borderColor: 'border-slate-500' },
  { id: 'legal', name: 'اتفاقيات وبروتوكولات قانونية', color: 'bg-teal-700', borderColor: 'border-teal-600' },
  { id: 'env', name: 'بعثات وحملات بيئية', color: 'bg-cyan-700', borderColor: 'border-cyan-600' },
  { id: 'admin', name: 'مؤتمرات وقرارات إدارية', color: 'bg-emerald-700', borderColor: 'border-emerald-600' },
  { id: 'crisis', name: 'أزمات وكوارث بيئية', color: 'bg-red-700', borderColor: 'border-red-600' },
];

const ERAS = [
  { id: 'all', name: 'عرض جميع الفترات التاريخية' },
  { id: 'era_1', name: 'مرحلة التأسيس والبروتوكولات الأولى (1978 - 1989)' },
  { id: 'era_2', name: 'مرحلة الأزمات البيئية وإعادة التأهيل (1990 - 2005)' },
  { id: 'era_3', name: 'الألفية الجديدة واستدامة العمل المشترك (+2006)' },
];

const TIMELINE_EVENTS = [
  {
    id: 1, year: 1978, category: 'legal', era: 'era_1',
    title: 'توقيع اتفاقية الكويت الإقليمية التاريخية',
    description: 'تبنّى المؤتمر الإقليمي للمفوضين حماية وتطوير البيئة البحرية والمناطق الساحلية، وتم توقيع اتفاقية الكويت الإقليمية وخطة العمل الإقليمية، مما وضع الحجر الأساس الرسمي لنشأة المنظمة بمشاركة الدول المطلة على المنطقة البحرية.',
    tags: ['التأسيس', 'اتفاقية الكويت', 'خطة العمل'],
    icon: '📜',
  },
  {
    id: 2, year: 1979, category: 'legal', era: 'era_1',
    title: 'الإعلان الرسمي عن تأسيس روبمي',
    description: 'بموجب المادة 16 من اتفاقية الكويت، تأسست المنظمة الإقليمية لحماية البيئة البحرية رسمياً في 1 يوليو 1979. تولّت أمانة مؤقتة تابعة لبرنامج الأمم المتحدة للبيئة إدارة برامجها في سنواتها الأولى.',
    tags: ['تأسيس', 'UNEP', 'روبمي'],
    icon: '🏛️',
  },
  {
    id: 3, year: 1982, category: 'legal', era: 'era_1',
    title: 'دخول بروتوكول مكافحة التلوث بالزيت حيز التنفيذ',
    description: 'تفعيل البروتوكول الخاص بالتعاون الإقليمي للمكافحة في الحالات الطارئة، وتأسيس مركز المساعدة المتبادلة للطوارئ البحرية (MEMAC) في البحرين لتنسيق الاستجابة العاجلة للحوادث والتسربات النفطية الكبرى.',
    tags: ['بروتوكول', 'طوارئ بحرية', 'MEMAC'],
    icon: '⚓',
  },
  {
    id: 4, year: 1984, category: 'admin', era: 'era_1',
    title: 'جائزة روبمي البيئية السنوية',
    description: 'أقرّ مجلس روبمي في اجتماعه الثالث منح جائزة سنوية لأفراد ومؤسسات من الدول الأعضاء حققوا إنجازات بارزة في مجال حماية البيئة البحرية ورفع الوعي البيئي في المنطقة.',
    tags: ['جائزة', 'تكريم', 'بيئة'],
    icon: '🏆',
  },
  {
    id: 5, year: 1989, category: 'legal', era: 'era_1',
    title: 'بروتوكول الجرف القاري',
    description: 'وُقّع بروتوكول التلوث البحري الناتج عن استكشاف واستغلال الجرف القاري في 29 مارس 1989، ودخل حيز التنفيذ في فبراير 1990، لتنظيم أنشطة التنقيب البحري عن النفط.',
    tags: ['بروتوكول', 'جرف قاري', 'نفط'],
    icon: '📋',
  },
  {
    id: 6, year: 1990, category: 'legal', era: 'era_2',
    title: 'بروتوكول المصادر البرية للتلوث',
    description: 'اعتُمد بروتوكول حماية البيئة البحرية من التلوث الناتج عن المصادر البرية، ليوسّع مظلة الحماية القانونية من الأنشطة الساحلية والصناعية المغذية للتلوث البحري.',
    tags: ['بروتوكول', 'مصادر برية', 'صناعة'],
    icon: '🏭',
  },
  {
    id: 7, year: 1991, category: 'crisis', era: 'era_2',
    title: 'مواجهة أكبر تسرب نفطي بحري في التاريخ',
    description: 'قادت المنظمة جهوداً جبارة بالتنسيق مع المؤسسات الدولية لرصد وتقييم الأثر البيئي المدمر الناتج عن تدفق نحو 1.26 مليون طن متري من النفط في مياه الخليج خلال حرب تحرير الكويت، وتدشين خطط إعادة تأهيل الشواطئ.',
    tags: ['كارثة بيئية', 'تسرب نفطي', 'إعادة تأهيل'],
    icon: '🆘',
  },
  {
    id: 8, year: 1998, category: 'legal', era: 'era_2',
    title: 'بروتوكول التحكم في النفايات الخطرة',
    description: 'توقيع بروتوكول ملزم لمراقبة حركة النقل العابر للحدود للنفايات الخطرة والتخلص منها، مستكملاً المنظومة القانونية لروبمي بأربعة بروتوكولات متكاملة.',
    tags: ['حماية السواحل', 'نفايات خطرة', 'تشريعات'],
    icon: '⚠️',
  },
  {
    id: 9, year: 2002, category: 'env', era: 'era_2',
    title: 'رصد ثلاثة عقود من التلوث النفطي',
    description: 'وثّقت تقارير ميماك نحو 1.92 مليون طن من التلوث النفطي في بحر روبمي بين 1965 و2002، أرقام رسّخت موقع المنطقة كواحدة من أعلى مناطق العالم عرضةً لخطر التلوث النفطي.',
    tags: ['رصد', 'تقارير', 'ميماك'],
    icon: '📊',
  },
  {
    id: 10, year: 2013, category: 'env', era: 'era_3',
    title: 'إطلاق البعثة البحرية الشاملة لتقييم جودة المياه والأحياء',
    description: 'تنفيذ مسح بحري شامل باستخدام سفن أبحاث متطورة لجمع عينات من الرواسب والمياه القاعية، لفحص نسب التلوث بالمعادن الثقيلة وتأثير التغير المناخي على التنوع البيولوجي.',
    tags: ['بحث علمي', 'جودة المياه', 'تنوع بيولوجي'],
    icon: '🔬',
  },
  {
    id: 11, year: 2026, category: 'admin', era: 'era_3',
    title: 'تحديث الإستراتيجية الإقليمية لمواجهة التغير المناخي',
    description: 'اعتماد وثيقة إستراتيجية موحدة تجمع الدول الأعضاء لتعزيز مرونة البيئة البحرية أمام ارتفاع درجات حرارة المياه وظواهر المد الأحمر المتكررة، وتنسيق أنظمة الإنذار المبكر.',
    tags: ['رؤية مستقبلية', 'تغير مناخي', 'مد أحمر'],
    icon: '🌍',
  },
];

const GALLERY_IMAGES = [
  {
    id: 1,
    title: 'برنامج رصد جودة مياه البحر والأحياء البحرية',
    url: 'https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img3.jpg',
    desc: 'أخذ القياسات الحقلية لدرجات الحرارة والمستويات الأكسجينية والملوحة لتقييم صحة النظام الإيكولوجي.',
  },
  {
    id: 2,
    title: 'مركز المساعدة المتبادلة للطوارئ البحرية (MEMAC)',
    url: 'https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img1.jpg',
    desc: 'متابعة وتنسيق خطط الاستجابة السريعة لمكافحة حوادث التلوث بالزيت والمواد الضارة الناتجة عن ناقلات النفط.',
  },
  {
    id: 3,
    title: 'مراقبة الملوثات من المصادر البرية والأخدود الساحلي',
    url: 'https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img2.jpg',
    desc: 'تتبع المصارف الصناعية والمخلفات الساحلية لحصر الملوثات الكيميائية والمعادن الثقيلة المؤثرة على التنوع البيولوجي.',
  },
];

const MEMBERS = [
  { code: 'KW', ar: 'الكويت', en: 'Kuwait', hq: true },
  { code: 'BH', ar: 'البحرين', en: 'Bahrain' },
  { code: 'IR', ar: 'إيران', en: 'I.R. Iran' },
  { code: 'IQ', ar: 'العراق', en: 'Iraq' },
  { code: 'OM', ar: 'عُمان', en: 'Oman' },
  { code: 'QA', ar: 'قطر', en: 'Qatar' },
  { code: 'SA', ar: 'السعودية', en: 'Saudi Arabia' },
  { code: 'AE', ar: 'الإمارات', en: 'UAE' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('timeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState('cards');

  const [metrics, setMetrics] = useState({
    humidity: '37',
    temperature: '43',
    windSpeed: '7',
    windAngle: '122',
    lastUpdate: '--:-- --/--/----',
  });

  // جلب بيانات الطقس الحية من API
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=29.3759&longitude=47.9774&current_weather=true&hourly=relativehumidity_2m&forecast_days=1')
      .then(res => res.json())
      .then(data => {
        if (data && data.current_weather) {
          const now = new Date();
          const hour = now.getHours();
          const timeString = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')} ${String(now.getDate()).padStart(2,'0')}-${String(now.getMonth()+1).padStart(2,'0')}-${now.getFullYear()}`;
          setMetrics({
            humidity: data.hourly?.relativehumidity_2m?.[hour] ?? '37',
            temperature: Math.round(data.current_weather.temperature),
            windSpeed: Math.round(data.current_weather.windspeed),
            windAngle: Math.round(data.current_weather.winddirection),
            lastUpdate: timeString,
          });
        }
      })
      .catch(() => {});
  }, []);

  // فلترة الأحداث
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

  // ألوان الثيمين
  const bg      = darkMode ? 'bg-slate-950 text-slate-100'         : 'bg-[#f5efe4] text-[#1e3f20]';
  const headerBg= darkMode ? 'bg-slate-900/90 border-slate-800'    : 'bg-[#f5efe4]/90 border-[#cbd4c5]';
  const gaugeBg = darkMode ? 'bg-slate-950 border-slate-800'        : 'bg-[#e2dacb]/60 border-[#cbd4c5]';
  const circleCl= darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-emerald-900/40 bg-[#fcfaf5] text-emerald-950';
  const cardCl  = darkMode ? 'bg-slate-900 border-slate-800'        : 'bg-[#e2dacb] border-[#cbd4c5]';
  const inputCl = darkMode ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-teal-500'
                           : 'bg-[#fcfaf5] border-[#b8c4b1] text-[#1e3f20] placeholder-[#556b2f] focus:border-emerald-800';
  const labelCl = darkMode ? 'text-slate-400' : 'text-[#4f6f52]';
  const pillBase= darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                           : 'bg-transparent border-emerald-900/20 text-[#1e3f20] hover:border-emerald-800';
  const pillActive = 'bg-emerald-800 text-white border-emerald-800';
  const footerCl= darkMode ? 'bg-slate-950 border-slate-900 text-slate-500' : 'border-[#cbd4c5] bg-[#e2dacb]/40 text-[#1e3f20]';
  const memberCl= darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#f5efe4] border-[#cbd4c5]';

  return (
    <div dir="rtl" className={`min-h-screen flex flex-col transition-colors duration-500 ${bg}`}>

      {/* ─── HEADER ─── */}
      <header className={`border-b backdrop-blur-md sticky top-0 z-40 px-4 py-3 md:px-8 transition-colors duration-500 ${headerBg}`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div>
            <h1 className={`text-xl md:text-2xl font-black tracking-tight ${darkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400' : 'text-emerald-950'}`}>
              {TEMPLATE_INFO.title}
            </h1>
            <p className={`text-xs mt-1 ${labelCl}`}>
              {TEMPLATE_INFO.subtitle} ({TEMPLATE_INFO.yearsRange})
            </p>
          </div>

          <nav className={`flex flex-wrap justify-center items-center gap-1.5 p-1.5 rounded-xl border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-[#d0c9bc] border-[#cbd4c5]'}`}>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${activeTab === 'timeline' ? 'bg-emerald-800 text-white shadow-md' : labelCl}`}>
              الأرشيف والخط الزمني
            </button>
            <button
              onClick={() => setActiveTab('atlas')}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${activeTab === 'atlas' ? 'bg-emerald-800 text-white shadow-md' : labelCl}`}>
              أطلس النظم الجغرافية (GIS)
            </button>
          </nav>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all ${darkMode ? 'bg-[#e2dacb] border-[#cbd4c5] text-emerald-900' : 'bg-slate-900 border-slate-800 text-amber-400'}`}>
            {darkMode ? '📜 النمط الكلاسيكي' : '✨ النمط الداكن الحديث'}
          </button>
        </div>
      </header>

      {/* ─── WEATHER GAUGES ─── */}
      <section className={`border-b py-8 px-4 transition-colors duration-500 ${gaugeBg}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { val: metrics.humidity,    label: '💧 متوسط الرطوبة (%)',              time: metrics.lastUpdate },
            { val: metrics.temperature, label: '🌡️ متوسط درجة الحرارة (مئوية)',    time: metrics.lastUpdate },
            { val: metrics.windSpeed,   label: '💨 متوسط سرعة الرياح (كم/ساعة)',   time: metrics.lastUpdate },
            { val: metrics.windAngle,   label: '⚡ متوسط زاوية الرياح (°)',         time: metrics.lastUpdate },
          ].map((g, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 transition-colors ${circleCl}`}>
                {g.val}
              </div>
              <div className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-[#1e3f20]'}`}>{g.label}</div>
              <span className="text-[9px] text-slate-500 mt-0.5">آخر تحديث {g.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MAIN ─── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-6">

        {/* ══ TAB: TIMELINE ══ */}
        {activeTab === 'timeline' && (
          <div className="flex flex-col gap-6">

            {/* الفلاتر */}
            <div className={`p-4 md:p-6 rounded-2xl border shadow-lg flex flex-col gap-4 ${cardCl}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${labelCl}`}>ابحث في أرشيف الاتفاقيات والمستندات:</label>
                  <input
                    type="text"
                    placeholder="مثال: 1978، اتفاقية، بروتوكول..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className={`w-full border rounded-xl px-4 py-2 text-xs focus:outline-none transition-all ${inputCl}`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${labelCl}`}>تصفية حسب الحقبة التاريخية:</label>
                  <select
                    value={selectedEra}
                    onChange={e => setSelectedEra(e.target.value)}
                    className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none transition-all ${inputCl}`}>
                    {ERAS.map(era => <option key={era.id} value={era.id}>{era.name}</option>)}
                  </select>
                </div>
                <div className="flex flex-col justify-end">
                  <button
                    onClick={() => setViewMode(viewMode === 'cards' ? 'list' : 'cards')}
                    className="py-2 px-4 rounded-xl border text-xs font-bold bg-emerald-800 text-white hover:bg-emerald-900 transition-colors">
                    {viewMode === 'cards' ? 'عرض السرد المتسلسل (الخطي)' : 'عرض شبكة البطاقات'}
                  </button>
                </div>
              </div>

              <div className={`mt-1 pt-3 border-t ${darkMode ? 'border-slate-700' : 'border-emerald-900/10'}`}>
                <div className={`text-xs font-black mb-2 ${darkMode ? 'text-slate-400' : 'text-[#1e3f20]'}`}>تصنيفات مجالات الرصد والحماية:</div>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-black border transition-all ${selectedCategory === cat.id ? pillActive : pillBase}`}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* الأحداث — شبكة البطاقات */}
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16">
                <p className={`font-semibold ${labelCl}`}>لا توجد وثائق أو أحداث تطابق معايير البحث.</p>
              </div>
            ) : viewMode === 'cards' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredEvents.map(event => {
                  const catInfo = CATEGORIES.find(c => c.id === event.category) || CATEGORIES[0];
                  return (
                    <div key={event.id} className={`rounded-2xl border flex flex-col overflow-hidden shadow-md transition-all hover:shadow-xl hover:-translate-y-1 ${cardCl}`}>
                      <div className={`h-1.5 w-full ${catInfo.color}`} />
                      <div className="p-5 flex-1 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <span className={`text-[10px] py-0.5 px-2.5 rounded-full text-white font-bold ${catInfo.color}`}>{catInfo.name}</span>
                          <span className={`text-2xl font-black font-mono ${darkMode ? 'text-teal-400' : 'text-amber-700'}`}>{event.year}</span>
                        </div>
                        <h3 className="text-sm font-black leading-relaxed">{event.title}</h3>
                        <p className={`text-xs leading-relaxed text-justify flex-1 ${darkMode ? 'text-slate-300' : 'opacity-80'}`}>{event.description}</p>
                        {event.tags && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {event.tags.map(tag => (
                              <span key={tag} className={`text-[10px] px-2 py-0.5 rounded ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-emerald-900/10 text-emerald-900'}`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* السرد الخطي */
              <div className={`relative border-r-2 mr-4 pr-6 flex flex-col gap-6 ${darkMode ? 'border-teal-900' : 'border-emerald-900/20'}`}>
                {filteredEvents.map(event => {
                  const catInfo = CATEGORIES.find(c => c.id === event.category) || CATEGORIES[0];
                  return (
                    <div key={event.id} className="relative">
                      <div className={`absolute -right-[31px] top-4 w-4 h-4 rounded-full border-4 ${darkMode ? 'bg-slate-950 border-teal-500' : 'bg-[#f5efe4] border-emerald-800'}`} />
                      <div className={`border rounded-2xl p-5 shadow-md flex flex-col md:flex-row gap-4 items-start md:items-center justify-between ${cardCl}`}>
                        <div className={`text-2xl font-black font-mono min-w-[80px] ${darkMode ? 'text-teal-400' : 'text-amber-700'}`}>{event.year}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`text-[10px] py-0.5 px-2 rounded-full text-white font-bold ${catInfo.color}`}>{catInfo.name}</span>
                          </div>
                          <h3 className="text-sm font-black mb-1">{event.title}</h3>
                          <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'opacity-75'}`}>{event.description}</p>
                        </div>
                        <span className="text-2xl">{event.icon}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* معرض الصور */}
            <div className={`pt-8 border-t ${darkMode ? 'border-slate-800' : 'border-emerald-900/10'}`}>
              <h2 className={`text-base font-black mb-4 ${darkMode ? 'text-teal-400' : 'text-emerald-900'}`}>
                معرض الصور التاريخي والتوثيقي للمنظمة (ROPME Media Archive)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {GALLERY_IMAGES.map(img => (
                  <div key={img.id} className={`rounded-xl overflow-hidden border shadow-sm group ${cardCl}`}>
                    <div className="h-44 overflow-hidden">
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-xs mb-1">{img.title}</h4>
                      <p className={`text-[11px] leading-relaxed ${darkMode ? 'text-slate-400' : 'opacity-70'}`}>{img.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* الدول الأعضاء */}
            <div className={`pt-8 border-t ${darkMode ? 'border-slate-800' : 'border-emerald-900/10'}`}>
              <h2 className={`text-base font-black mb-4 ${darkMode ? 'text-teal-400' : 'text-emerald-900'}`}>
                الدول الأعضاء — Eight Member States
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {MEMBERS.map(m => (
                  <div key={m.code} className={`rounded-xl border p-4 text-center flex flex-col items-center gap-2 transition-colors hover:border-emerald-700 ${memberCl}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white ${m.hq ? 'bg-teal-700' : 'bg-emerald-900'}`}>
                      {m.code}
                    </div>
                    <div className="font-black text-sm">{m.ar}</div>
                    <div className={`text-[10px] italic ${labelCl}`}>{m.en}{m.hq ? ' ★' : ''}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ══ TAB: GIS ══ */}
        {activeTab === 'atlas' && (
          <div className={`p-6 rounded-2xl border shadow-xl ${cardCl}`}>
            <h2 className={`text-base font-black mb-2 ${darkMode ? 'text-teal-400' : 'text-emerald-900'}`}>
              نظام معلومات جغرافيا البيئة البحرية الحية (Live GIS Module)
            </h2>
            <p className={`text-xs mb-6 leading-relaxed ${labelCl}`}>
              خريطة تفاعلية ترصد النطاق الجغرافي للمنطقة البحرية المشتركة للدول الأعضاء لمتابعة التغيرات المناخية والبيئية حياً.
            </p>
            <div className="w-full h-[500px] rounded-xl overflow-hidden border border-slate-700">
              <iframe
                title="ROPME GIS Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3550000!2d54.0!3d24.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sar!2skw!4v1700000000000!5m2!1sar!2skw"
                width="100%"
                height="100%"
                style={{ border: 0, filter: darkMode ? 'invert(90%) hue-rotate(180deg)' : 'none' }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        )}

      </main>

      {/* ─── FOOTER ─── */}
      <footer className={`border-t py-6 mt-4 text-center text-xs transition-colors ${footerCl}`}>
        <p className="font-black">حقوق الطبع والنشر © {new Date().getFullYear()} محفوظة للمنصة الإقليمية لحماية البيئة البحرية (ROPME)</p>
        <p className="text-[10px] mt-1 opacity-70">جميع البيانات والصور موثقة من بوابة المنظمة الإقليمية للدول الأعضاء.</p>
      </footer>

    </div>
  );
}
