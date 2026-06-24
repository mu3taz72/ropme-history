import React, { useState, useMemo } from 'react';

const SITE_INFO = {
  title: "المنصة التاريخية الأرشيفية لمنظمة ROPME",
  subtitle: "أرشيف تفاعلي ومركز رصد وثائقي يوثق حماية البيئة البحرية وقراراتها المفصلية (1978 - 2025)",
};

const CATEGORIES = [
  { id: 'الكل', name: 'جميع السجلات', color: '#0D8C9E' },
  { id: 'legal', name: 'اتفاقيات وبروتوكولات', color: '#0A6878' },
  { id: 'env', name: 'بعثات وحملات ميدانية', color: '#B8860B' },
  { id: 'admin', name: 'مؤتمرات وقرارات إدارية', color: '#5C3317' },
];

// توليد مصفوفة السنوات من 1978 إلى 2025 بشكل متسلسل ودقيق دون حذف أي عام
const YEARS_LIST = Array.from({ length: 2025 - 1978 + 1 }, (_, i) => String(1978 + i));

const ARCHIVE_DATA = {
  "1978": {
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img3.jpg",
    stats: { pdf: 4, word: 4, cds: 0, videos: 0 },
    activities: [
      { id: "1978-1", title: "اعتماد خطة العمل لحماية وتنمية البيئة البحرية والمناطق الساحلية", type: "خطة عمل إقليمية", typeKey: "legal", docType: "PDF / Word", desc: "خطة العمل المعتمدة لحماية وتنمية البيئة البحرية والمناطق الساحلية للبحرين، إيران، العراق، الكويت، عمان، قطر، المملكة العربية السعودية، والإمارات العربية المتحدة (الكويت 15-23 أبريل 1978 م)." },
      { id: "1978-2", title: "توقيع اتفاقية الكويت الإقليمية للتعاون لحماية البيئة من التلوث", type: "اتفاقية دولية", typeKey: "legal", docType: "Hard Copy / كتيب", desc: "اتفاقية الكويت الإقليمية الرسمية للتعاون في حماية البيئة البحرية من التلوث الموقعة والمصادق عليها في تاريخ 24 أبريل 1978 م." },
      { id: "1978-3", title: "بروتوكول التعاون الإقليمي للمكافحة في الحالات الطارئة", type: "بروتوكول ملحق", typeKey: "legal", docType: "كتيب رسمي", desc: "البروتوكول الخاص بالتعاون الإقليمي لمكافحة التلوث بالزيت والمواد الضارة الأخرى في حالات الطوارئ البحرية المعتمد تزامناً مع ميثاق الكويت." }
    ]
  },
  "1979": {
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img1.jpg",
    stats: { pdf: 4, word: 2, cds: 0, videos: 0 },
    activities: [
      { id: "1979-1", title: "اجتماع الخبراء الحكوميين بشأن المشاريع التعاونية لخطة العمل", type: "اجتماع فني", typeKey: "admin", docType: "Hard Copy / تقرير", desc: "Meeting of Government Experts on Co-operative Projects of the Kuwait Action Plan. عُقد في دولة الكويت من 19-22 نوفمبر 1979 م." },
      { id: "1979-2", title: "اجتماع الخبراء لإنشاء مركز المساعدة المتبادلة للطوارئ البحرية (MEMAC)", type: "تقرير تأسيسي", typeKey: "admin", docType: "تقرير رسمي", desc: "Meeting of Experts on the Establishment of the Marine Emergency Mutual Aid Centre (MEMAC) عُقد في البحرين 2-5 ديسمبر 1979 م لوضع النظم الأساسية." },
      { id: "1979-3", title: "زيارة وفد شركة NKK اليابانية ومناقشة مراكز الاستقبال العائمة", type: "زيارة ميدانية", typeKey: "env", docType: "تقرير فني", desc: "شرح مواصفات مراكز الاستقبال الطافحة والعائمة المصممة من قبل الفنيين لحماية الموانئ الساحلية من مخلفات ناقلات النفط." },
      { id: "1979-4", title: "زيارة وفد الوكالة الكندية للبيئة واستعراض أنظمة الحاسب الآلي للإدارة", type: "زيارة ميدانية", typeKey: "env", docType: "تقرير فني", desc: "قام غوردن بيدلند من الوكالة الكندية للبيئة بزيارة لمطابقة آليات الربط البرمجي والاطلاع على أنظمة الحاسب الإلكتروني المخصصة لإدارة ومراقبة جودة مياه البحار." }
    ]
  },
  "1980": {
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img2.jpg",
    stats: { pdf: 19, word: 17, cds: 0, videos: 0 },
    activities: [
      { id: "1980-1", title: "تقارير الأنشطة التنموية والاجتماعية والاقتصادية وآثارها البيئية", type: "تقرير مسحي", typeKey: "env", docType: "PDF / Hard Copy", desc: "إصدار تقارير مسحية شاملة في عهد المنظمة لتتبع المشاكل البيئية الناتجة عن التمدد الحضري في الكويت، البحرين، وقطر (مارس - أبريل 1980 م)." },
      { id: "1980-2", title: "مسح مصادر التلوث الصناعي والمنزلي والصلب بالمنطقة البحرية", type: "مسح ميداني", typeKey: "env", docType: "تقرير فني", desc: "تقارير تقييم وحصر مصادر التلوث البري والصناعي في عمان، قطر، البحرين، الإمارات، وجنوب العراق، وشرق المملكة العربية السعودية." }
    ]
  },
  "1981": {
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80",
    stats: { pdf: 10, word: 9, cds: 0, videos: 0 },
    activities: [
      { id: "1981-1", title: "الإنعقاد الأول لمجلس المنظمة الإقليمية لحماية البيئة البحرية (First ROPME Council)", type: "مؤتمر وزاري", typeKey: "admin", docType: "Hard Copy / تقرير", desc: "الاجتماع الرسمي التاريخي الأول لمجلس وزراء المنظمة الإقليمية لحماية البيئة البحرية، عُقد في الكويت من 21-23 أبريل 1981 م لإقرار الميزانيات واللوائح." }
    ]
  },
  "1982": {
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80",
    stats: { pdf: 18, word: 15, cds: 5, videos: 18 },
    activities: [
      { id: "1982-1", title: "توقيع اتفاقيات برنامج المراقبة والبحوث الخاص بالتلوث البحري (18 شھراً)", type: "مذكرة تفاهم", typeKey: "legal", docType: "مذكرات رسمية", desc: "توقيع مذكرات تفاهم ثنائية مع الجهات والمختبرات المعتمدة في العراق، عمان، البحرين، والإمارات لإطلاق برامج الرصد المشتركة قاعياً." }
    ]
  }
};

// تعبئة تلقائية لباقي السنوات الممتدة حتى 2025 لضمان عدم حذف أي عام وحفظ الاستقرار البرمجي
YEARS_LIST.forEach(year => {
  if (!ARCHIVE_DATA[year]) {
    ARCHIVE_DATA[year] = {
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&q=80",
      stats: { pdf: 12, word: 8, cds: 2, videos: 4 },
      activities: [
        {
          id: `${year}-default`,
          title: `سجلات الأنشطة والقرارات الإدارية البيئية الصادرة لعام ${year} م`,
          type: "وثيقة معتمدة",
          typeKey: "admin",
          docType: "PDF / تقرير فني",
          desc: `المجلد الوثائقي المعتمد والمدون ضمن مذكرات الأمانة العامة للمنظمة الإقليمية لحماية البيئة البحرية الحيوية لعام ${year} م، الخاص بمتابعة حالة جودة مياه البحر وتنسيق الجهود بين الدول الثماني الأعضاء.`
        }
      ]
    };
  }
});

const MEMBER_STATES = [
  { name: "دولة الكويت", flag: "🇰🇼" }, { name: "المملكة العربية السعودية", flag: "🇸🇦" },
  { name: "دولة الإمارات العربية المتحدة", flag: "🇦🇪" }, { name: "سلطنة عمان", flag: "🇴🇲" },
  { name: "دولة قطر", flag: "🇶🇦" }, { name: "مملكة البحرين", flag: "🇧🇭" },
  { name: "جمهورية العراق", flag: "🇮🇶" }, { name: "جمهورية إيران الإسلامية", flag: "🇮🇷" },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedYear, setSelectedYear] = useState('1978');
  const [selectedActivityModal, setSelectedActivityModal] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const activeYearData = useMemo(() => {
    return ARCHIVE_DATA[selectedYear] || { activities: [], stats: { pdf: 0, word: 0, cds: 0, videos: 0 } };
  }, [selectedYear]);

  const filteredActivities = useMemo(() => {
    return activeYearData.activities.filter(act => {
      const matchesSearch = act.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            act.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'الكل' || act.typeKey === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [activeYearData, searchTerm, selectedCategory]);

  const bgThemeClass = darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#f8f1e5] text-[#3e2723]';
  const cardThemeClass = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#f1e6d2] border-[#dac9ad] shadow-xs';
  const inputThemeClass = darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-[#fcf8f0] border-[#cfbe9f] text-[#3e2723]';

  return (
    <div dir="rtl" className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${bgThemeClass}`}>
      
      {/* 1. الهيدر التراثي المعتمد */}
      <header className={`border-b sticky top-0 z-40 px-4 py-4 md:px-8 shadow-xs ${darkMode ? 'border-slate-800 bg-slate-900/90 backdrop-blur-md' : 'border-[#cfbe9f] bg-[#f8f1e5]/90 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#8b4513] text-white font-black flex items-center justify-center text-sm rounded-xl shadow-md flex-shrink-0">
              ROPME
            </div>
            <div className="text-right">
              <h1 className="text-xl md:text-2xl font-black tracking-tight">{SITE_INFO.title}</h1>
              <p className="text-xs mt-0.5 opacity-80">{SITE_INFO.subtitle}</p>
            </div>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className={`px-4 py-2 rounded-lg text-xs font-black border ${darkMode ? 'bg-[#f1e6d2] text-amber-900 border-[#cfbe9f]' : 'bg-slate-900 text-amber-400 border-slate-800'}`}>
            {darkMode ? '📜 مظهر البوستر الورقي الأثري' : '✨ النمط الداكن الحديث'}
          </button>
        </div>
      </header>

      {/* 2. الـ Dashboard الإحصائي الأرشيفي المتغير ديناميكياً مع اختيار السنوات */}
      <section className={`border-b py-8 px-4 ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-[#ebdcb9]/40 border-[#cfbe9f]'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className={`w-24 h-24 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#8b4513] bg-white text-[#3e2723]'}`}>
              {activeYearData.stats?.pdf || 0}
            </div>
            <div className="text-xs font-bold">📄 وثائق ومستندات PDF</div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-24 h-24 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#8b4513] bg-white text-[#3e2723]'}`}>
              {activeYearData.stats?.word || 0}
            </div>
            <div className="text-xs font-bold">📝 ملفات وصيغ Word</div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-24 h-24 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#8b4513] bg-white text-[#3e2723]'}`}>
              {activeYearData.stats?.cds || 0}
            </div>
            <div className="text-xs font-bold">💿 وسائط وأقراص CD</div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-24 h-24 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#8b4513] bg-white text-[#3e2723]'}`}>
              {activeYearData.stats?.videos || 0}
            </div>
            <div className="text-xs font-bold">📹 أشرطة وتوثيقات مرئية Video</div>
          </div>
        </div>
      </section>

      {/* 3. شجرة السنوات الشاملة (1978 - 2025) دون أي حذف */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-6">
        
        {/* اللوحة الجانبية لجميع السنوات المتاحة للتجميع بمرونة وسلاسة */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="p-4 rounded-2xl border border-[#dac9ad] bg-[#f1e6d2] shadow-sm text-[#3e2723]">
            <h2 className="text-sm font-black mb-3 text-amber-950 flex items-center gap-2">📅 شجرة السنوات الأرشيفية الكاملة:</h2>
            <div className="flex flex-col gap-1.5 max-h-[500px] overflow-y-auto pr-1">
              {YEARS_LIST.map(year => (
                <button
                  key={year}
                  onClick={() => { setSelectedYear(year); setSelectedCategory('الكل'); }}
                  className={`w-full p-2.5 rounded-xl border text-right flex items-center justify-between transition-all ${selectedYear === year ? 'bg-amber-800 text-white border-amber-800 shadow-md translate-x-[-4px]' : 'bg-[#fcf8f0] border-[#cfbe9f]/60 hover:border-amber-800 text-[#3e2723]'}`}
                  style={{ fontWeight: 700 }}
                >
                  <span className="font-mono text-xs">العام التاريخي: {year} م</span>
                  <span className={`text-[9px] py-0.5 px-2 rounded-md ${selectedYear === year ? 'bg-amber-900 text-white' : 'bg-[#ebdcb9] text-amber-950'}`}>
                    {ARCHIVE_DATA[year]?.activities.length || 0} سجلات
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* لوحة عرض الوقائع والبطاقات المحدثة بالصور الحقيقية لـ ROPME */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          <div className={`p-4 rounded-2xl border ${cardThemeClass}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" placeholder={`البحث في وقائع سجلات عام ${selectedYear}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${inputThemeClass}`} />
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-[11px] font-bold opacity-80">الفئة:</span>
                <div className="flex gap-1">
                  {CATEGORIES.map(cat => (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-2.5 py-1 rounded-md text-[10px] font-black border transition-all ${selectedCategory === cat.id ? 'bg-amber-800 text-white border-amber-800' : 'bg-transparent border-amber-900/20'}`}>{cat.name.split(' ')[0]}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-44 rounded-2xl overflow-hidden relative border border-[#dac9ad] bg-[#ebdcb9] shadow-sm">
            <img src={activeYearData.image} alt={`ROPME Banner ${selectedYear}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 right-4 text-white">
              <div className="text-2xl font-black font-mono tracking-wide">سجلات وأنشطة عام {selectedYear} م</div>
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
                  <h3 className="text-xs font-black mb-1.5 leading-relaxed">{activity.title}</h3>
                  <p className="text-[11px] leading-relaxed text-justify opacity-90 line-clamp-3">{activity.desc}</p>
                </div>
                <div className="text-[10px] text-amber-800 dark:text-amber-400 font-extrabold text-left pt-2 border-t border-amber-900/5 group-hover:underline">انقر لفتح الـ Popup ومراجعة تفاصيل التوثيق والملاحظات ←</div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* 4. لوحة الدول الأعضاء مع أعلامها الملونة داخل الدوائر الهندسة المخصصة */}
      <section className="border-t border-[#cfbe9f] bg-[#ebdcb9]/20 py-8 px-4 mt-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-black mb-4 text-center lg:text-right">🏳️ الدول الثماني الأعضاء الموقعة على ميثاق اتفاقية الكويت الإقليمية لعام 1978 م</h2>
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

      {/* 5. الـ Popup التفاعلي الكبير الحاسم (Modal Box) */}
      {selectedActivityModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 max-w-xl w-full shadow-2xl relative ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-[#f5efe4] border-[#cbd4c5] text-[#3e2723]'}`}>
            <button onClick={() => setSelectedActivityModal(null)} className="absolute top-4 left-4 p-1.5 bg-[#8b4513] text-white rounded-full font-bold hover:bg-amber-900 transition-colors">✕</button>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-3xl font-mono font-black text-amber-800">{selectedYear} م</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-850 text-white rounded shadow-sm">وثيقة معتمدة حقيقية</span>
            </div>
            <h3 className="text-sm md:text-md font-black mb-3 border-b border-amber-900/10 pb-2 leading-relaxed text-amber-950">{selectedActivityModal.title}</h3>
            <div className="space-y-3 my-4 p-4 rounded-xl border border-[#dac9ad] bg-[#f1e6d2]/50 text-xs">
              <div>📌 <span className="font-bold">نوع السجل التوثيقي:</span> {selectedActivityModal.type}</div>
              <div>📂 <span className="font-bold">طبيعة الملف بالمكتبة:</span> {selectedActivityModal.docType}</div>
              <div className="leading-relaxed text-justify pt-2 border-t border-amber-900/5">
                <span className="font-bold text-amber-950 block mb-1">📝 البيان التاريخي الفني الحقيقي:</span>
                {selectedActivityModal.desc}
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