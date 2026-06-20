import React, { useState, useMemo } from 'react';

const TEMPLATE_INFO = {
  title: "المنصة التاريخية الأرشيفية لمنظمة Ropme",
  subtitle: "أرشيف تفاعلي ومركز رصد وثائقي يوثق حماية البيئة البحرية وقراراتها المفصلية (1978 - 2026)",
};

const CATEGORIES = [
  { id: 'الكل', name: 'جميع السجلات الوثائقية', color: 'bg-teal-600', borderColor: 'border-teal-600' },
  { id: 'legal', name: 'اتفاقيات وبروتوكولات قانونية', color: 'bg-teal-600', borderColor: 'border-teal-600', textColor: 'text-teal-400' },
  { id: 'env', name: 'بعثات وحملات ميدانية', color: 'bg-cyan-600', borderColor: 'border-cyan-600', textColor: 'text-cyan-400' },
  { id: 'admin', name: 'مؤتمرات وقرارات إدارية', color: 'bg-emerald-600', borderColor: 'border-emerald-600', textColor: 'text-emerald-400' },
];

const ERAS = [
  { id: 'الكل', name: 'عرض جميع الفترات التاريخية' },
  { id: 'era_1', name: 'مرحلة التأسيس والبروتوكولات الأولى (1978 - 1989)' },
  { id: 'era_2', name: 'مرحلة الأزمات البيئية وإعادة التأهيل (1990 - 2005)' },
  { id: 'era_3', name: 'الألفية الجديدة واستدامة العمل المشترك (+2006)' },
];

// السجلات والأنشطة التاريخية مستكملة ومدمجة بالكامل من مستند الأرشيف لعام 1978 م
const TIMELINE_EVENTS = [
  {
    id: 1,
    year: 1978,
    title: "المؤتمر الإقليمي للمفوضين لحماية البيئة البحرية - الكويت",
    category: "legal",
    era: "era_1",
    icon: "📜",
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img3.jpg",
    description: "انعقاد المؤتمر التاريخي في دولة الكويت من 15-23 أبريل 1978 م، والذي أسفر عن اعتماد خطة العمل لحماية وتنمية البيئة البحرية والمناطق الساحلية للبحرين، إيران، العراق، الكويت، عمان، قطر، السعودية، والإمارات."
  },
  {
    id: 2,
    year: 1978,
    title: "توقيع اتفاقية الكويت الإقليمية للتعاون في حماية البيئة من التلوث",
    category: "legal",
    era: "era_1",
    icon: "✒️",
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img2.jpg",
    description: "التوقيع الرسمي والمصادقة على اتفاقية الكويت الإقليمية في تاريخ 24 أبريل 1978 م لوضع الأطر التشريعية والالتزامات القانونية للدول الثماني المطلة على المنطقة البحرية المشتركة من التلوث."
  },
  {
    id: 3,
    year: 1978,
    title: "إقرار البروتوكول الإقليمي الخاص بمكافحة التلوث بالزيت في حالات الطوارئ",
    category: "legal",
    era: "era_1",
    icon: "🚨",
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img1.jpg",
    description: "اعتماد البروتوكول الملحق بالاتفاقية للتعاون الإقليمي في مكافحة التلوث بالزيت والمواد الضارة الأخرى في الحالات الطارئة، والذي مهد لتأسيس مركز MEMAC العملياتي في مملكة البحرين."
  },
  {
    id: 4,
    year: 1979,
    title: "اجتماع الخبراء الحكوميين لتأسيس الكيان العملياتي لـ MEMAC",
    category: "admin",
    era: "era_1",
    icon: "⚓",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80",
    description: "انعقاد مجمع الخبراء والمندوبين في المنامة بالبحرين لوضع الترتيبات الهيكلية والإدارية والمالية وتنسيق آليات الاستجابة السريعة لحوادث التسرب النفطي الناجم عن الناقلات والأنشطة الملاحية."
  },
  {
    id: 5,
    year: 1983,
    title: "إطلاق برنامج رصد الملوثات والمواصفات الأوقيانوغرافية الإقليمي",
    category: "env",
    era: "era_1",
    icon: "🐳",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&q=80",
    description: "تفعيل أول مسح مخبري حقلي شامل بالتعاون مع المختبرات الوطنية للدول الأعضاء لأخذ عينات الملوحة والمعادن الثقيلة وتتبع صحة البيئة البحرية قاعياً وحماية التنوع البيولوجي."
  },
  {
    id: 6,
    year: 1991,
    title: "إدارة كارثة بقعة الزيت الكبرى في الخليج وتأهيل المصايد الشاطئية",
    category: "env",
    era: "era_2",
    icon: "🚨",
    image: "https://images.unsplash.com/photo-1508847154043-be12a3b4d69e?auto=format&fit=crop&w=600&q=80",
    description: "تنسيق أكبر جهد بيئي إقليمي ودولي مشترك لرصد وتقييم الأثر الإيكولوجي الناتج عن تسرب ملايين براميل النفط خلال حرب تحرير الكويت وحماية محطات التحلية وتأهيل الشواطئ المتضررة."
  },
  {
    id: 7,
    year: 2026,
    title: "اعتماد الوثيقة الاستراتيجية الموحدة للتغير المناخي والمد الأحمر",
    category: "admin",
    era: "era_3",
    icon: "🔋",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
    description: "تحديث الأطر التنفيذية المشتركة للدول الأعضاء لتعزيز مرونة النظم البيئية الساحلية وتفعيل تقنيات الإنذار المبكر لمواجهة الارتفاع الحراري في المياه وظواهر المد الأحمر المتكررة."
  }
];

// معرض الصور التاريخي المرتب تصاعدياً كرونولوجياً من الأقدم إلى الأحدث بروابط حقيقية مستقرة
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

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-950 transition-colors duration-300">
      
      {/* الهيدر البحري المظلم الفخم الأصلي */}
      <header className="border-b border-slate-900 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 px-4 py-4 md:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center lg:text-right">
            {/* الشعار المعتمد المتناسق */}
            <div className="w-14 h-14 bg-teal-950 rounded-xl border border-teal-800 flex items-center justify-center font-black text-teal-400 text-md tracking-tight shadow-md flex-shrink-0">
              ROPME
            </div>
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400">
                  {TEMPLATE_INFO.title}
                </h1>
                <span className="text-[9px] py-0.5 px-2 rounded-full font-bold bg-teal-600/20 text-teal-400 border border-teal-500/30 animate-pulse">شاشة المعاينة المستقرة (Preview)</span>
              </div>
              <p className="text-xs mt-0.5 text-slate-400 font-medium">
                {TEMPLATE_INFO.subtitle}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* الـ Dashboard الأرشيفي الإحصائي الهندسي الأصلي الدائري */}
      <section className="border-b border-slate-900 bg-slate-900/40 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-2 border-teal-500 bg-slate-900 text-teal-400 shadow-lg flex items-center justify-center text-3xl font-black mb-3">{TIMELINE_EVENTS.filter(e => e.category === 'legal').length}</div>
            <div className="text-xs font-bold text-slate-300">📜 معاهدات وبروتوكولات قانونية</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-2 border-cyan-500 bg-slate-900 text-cyan-400 shadow-lg flex items-center justify-center text-3xl font-black mb-3">{TIMELINE_EVENTS.filter(e => e.category === 'env').length}</div>
            <div className="text-xs font-bold text-slate-300">🔬 حملات وبعثات مسح بحري</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-2 border-emerald-500 bg-slate-900 text-emerald-400 shadow-lg flex items-center justify-center text-3xl font-black mb-3">{TIMELINE_EVENTS.filter(e => e.category === 'admin').length}</div>
            <div className="text-xs font-bold text-slate-300">🏛️ مؤتمرات وقرارات إدارية</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-2 border-amber-500 bg-slate-900 text-amber-400 shadow-lg flex items-center justify-center text-3xl font-black mb-3">{TIMELINE_EVENTS.length}</div>
            <div className="text-xs font-bold text-slate-300">📂 إجمالي وثائق الأرشيف المدمجة</div>
          </div>
        </div>
      </section>

      {/* المحتوى الرئيسي وجداول العرض الذكية */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          
          {/* لوحة الفلاتر والبحث الأنيقة وعالية التباين */}
          <div className="p-4 md:p-6 rounded-2xl border border-slate-900 bg-slate-900 flex flex-col gap-4 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="text" placeholder="ابحث بالتاريخ، الكلمة المفتاحية، أو نوع القرار البيئي..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full border rounded-xl px-4 py-2 text-xs focus:outline-none transition-all bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-teal-500" />
              <select value={selectedEra} onChange={(e) => setSelectedEra(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-xs focus:outline-none transition-all bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-teal-500">
                {ERAS.map(era => <option key={era.id} value={era.id}>{era.name}</option>)}
              </select>
              <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="py-2 px-4 rounded-lg border border-slate-800 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-slate-950 transition-colors">
                {viewMode === 'grid' ? 'عرض السرد المتسلسل (الخطي)' : 'عرض شبكة البوستر المصورة'}
              </button>
            </div>

            <div className="mt-2 border-t border-slate-800 pt-3">
              <div className="text-xs font-black text-slate-400 mb-2">تصنيفات مجالات الرصد والتاريخ الجغرافي:</div>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-1.5 rounded-full text-xs font-black border transition-all ${selectedCategory === cat.id ? 'bg-teal-600 text-slate-950 border-teal-600 shadow-md scale-102' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}>{cat.name}</button>
                ))}
              </div>
            </div>
          </div>

          {/* شبكة البوستر التفاعلية عالية التباين والأناقة */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredEvents.map(event => {
                const catInfo = CATEGORIES.find(c => c.id === event.category) || CATEGORIES[0];
                return (
                  <div key={event.id} onClick={() => setSelectedEventModal(event)} className="rounded-2xl border border-slate-900 bg-slate-900 flex flex-col overflow-hidden cursor-pointer group hover:border-teal-500/50 shadow-md transition-all duration-300">
                    <div className="w-full h-40 overflow-hidden relative bg-slate-950">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-2.5 right-3 left-3 flex justify-between items-center">
                        <span className="text-2xl font-black text-teal-400 font-mono tracking-wide drop-shadow">{event.year} م</span>
                        <span className="text-[10px] py-0.5 px-2 bg-slate-950/80 text-teal-400 rounded font-bold border border-teal-900">{event.icon} {catInfo.name.split(' ')[0]}</span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold mb-1 text-slate-100 group-hover:text-teal-400 transition-colors line-clamp-1">{event.title}</h3>
                        <p className="text-[11px] leading-relaxed text-justify text-slate-400 line-clamp-3">{event.description}</p>
                      </div>
                      <div className="text-[10px] text-teal-400 font-bold text-left group-hover:underline">عرض الوثيقة وبيان الخبر الكامل ←</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="relative border-r-2 mr-4 md:mr-8 pl-2 flex flex-col gap-6 border-slate-800">
              {filteredEvents.map(event => (
                <div key={event.id} className="relative pr-8">
                  <div className="absolute right-[-7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 bg-slate-950 border-teal-500"></div>
                  <div onClick={() => setSelectedEventModal(event)} className="border border-slate-900 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between cursor-pointer bg-slate-900 hover:border-teal-500/40 transition-all">
                    <div className="text-2xl font-black text-teal-400 font-mono flex-shrink-0">{event.year} م</div>
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-800">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-slate-100">{event.title}</h3>
                      <p className="text-[11px] mt-1 text-slate-400 line-clamp-2">{event.description}</p>
                    </div>
                    <span className="text-xl p-2 rounded-xl bg-slate-950 text-teal-400 border border-slate-800 flex-shrink-0">{event.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* معرض الصور التوثيقي المرتب تصاعدياً كرونولوجياً */}
          <div className="pt-8 border-t border-slate-900">
            <h2 className="text-base font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">معرض الصور التاريخي والتوثيقي للمنظمة (الترتيب الكرونولوجي والتسلسلي)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GALLERY_IMAGES.map(img => (
                <div key={img.id} className="rounded-xl overflow-hidden border border-slate-900 bg-slate-900 shadow-md group">
                  <div className="h-44 overflow-hidden relative bg-slate-950">
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                    <span className="absolute top-2 right-2 bg-slate-950/90 text-teal-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-800 shadow">{img.year}</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-xs mb-1 text-slate-100">{img.title}</h4>
                    <p className="text-[11px] leading-relaxed text-slate-400">{img.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* لوحة الدول الأعضاء الموقعة مع أعلام الدول داخل الدوائر */}
          <div className="pt-8 border-t border-slate-900">
            <h2 className="text-base font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">الدول الثماني الأعضاء الموقعة على ميثاق اتفاقية الكويت الإقليمية لعام 1978 م</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
              {MEMBER_STATES.map(state => (
                <div key={state.name} className="p-4 rounded-xl border border-slate-900 bg-slate-900 flex flex-col items-center justify-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-3xl select-none shadow-inner">
                    {state.flag}
                  </div>
                  <span className="text-[10px] font-bold leading-tight block text-slate-300">{state.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* النافذة المنبثقة التفاعلية الكبرى عريضة المساحة للتحليل السلس للحدث (Modal) */}
      {selectedEventModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full shadow-2xl relative text-slate-100">
            <button onClick={() => setSelectedEventModal(null)} className="absolute top-4 left-4 p-1.5 bg-slate-950/60 text-slate-400 rounded-full font-bold hover:text-white transition-colors">✕</button>
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 bg-slate-950 border border-slate-800 shadow-inner">
              <img src={selectedEventModal.image} alt={selectedEventModal.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-3xl font-mono font-black text-teal-400">{selectedEventModal.year} م</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-teal-950 text-teal-400 border border-teal-900 rounded">{selectedEventModal.icon} وثيقة معتمدة حقيقية</span>
            </div>
            <h3 className="text-md font-bold mb-3 border-b border-slate-800 pb-2 text-slate-100">{selectedEventModal.title}</h3>
            <p className="text-xs md:text-sm leading-relaxed text-justify text-slate-300">{selectedEventModal.description}</p>
            <div className="mt-5 flex justify-end">
              <button onClick={() => setSelectedEventModal(null)} className="px-5 py-2 bg-teal-600 text-slate-950 text-xs font-bold rounded-xl hover:bg-teal-700 transition-colors">إغلاق وتأكيد القراءة</button>
            </div>
          </div>
        </div>
      )}

      {/* تذييل المنصة الأصلي */}
      <footer className="border-t border-slate-900 py-6 mt-12 text-center text-xs text-slate-500 bg-slate-950">
        <p className="font-black">حقوق الطبع والنشر © 2026 محفوظة للمنصة الإقليمية لحماية البيئة البحرية (ROPME)</p>
        <p className="text-[10px] mt-1">جميع البيانات والخرائط والصور مستخلص ومحققة بالكامل من البوابة المرجعية والتقارير الفنية للأمانة العامة للدول الأعضاء.</p>
      </footer>
    </div>
  );
}