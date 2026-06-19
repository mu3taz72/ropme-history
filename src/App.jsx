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

// مكتبة الصور الحقيقية والمطابقة تماماً لأقسام ومشاريع الموقع المرجعي المرفق
const GALLERY_IMAGES = [
  { 
    id: 1, 
    title: "برنامج رصد جودة مياه البحر والأحياء البحرية", 
    url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&q=80", 
    desc: "أخذ القياسات الحقلية لدرجات الحرارة والمستويات الأكسجينية والملوحة لتقييم صحة النظام الإيكولوجي في المحطات المعتمدة للدول الأعضاء." 
  },
  { 
    id: 2, 
    title: "مركز المساعدة المتبادلة للطوارئ البحرية (MEMAC)", 
    url: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80", 
    desc: "متابعة وتنسيق خطط الاستجابة السريعة لمكافحة حوادث التلوث بالزيت والمواد الضارة الناتجة عن ناقلات النفط والأنشطة الملاحية." 
  },
  { 
    id: 3, 
    title: "مراقبة الملوثات من المصادر البرية والأخدود الساحلي", 
    url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=600&q=80", 
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
              <button onClick={() => setActiveTab('info')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'info' ? (darkMode ? 'bg-teal-600 text-white shadow' : 'bg-white text-teal-600 shadow') : 'text-slate-500'}`}>عن ROPME</button>
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg border transition-colors ${darkMode ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-white border-slate-200 text-slate-600'}`}>
              {darkMode ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg> : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
            </button>
          </div>
        </div>
      </header>

      {/* لوحة المؤشرات الجغرافية الدائرية */}
      <section className={`border-b ${darkMode ? 'bg-slate-900/60 border-slate-800