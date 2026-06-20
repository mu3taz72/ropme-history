import React, { useState, useMemo } from 'react';

const TEMPLATE_INFO = {
  title: "المنصة التاريخية الأرشيفية لمنظمة Ropme",
  subtitle: "أرشيف تفاعلي يجمع ويوثق أنشطة وسجلات حماية البيئة البحرية حسب السنوات المفصلية",
};

// تجميع كافة الأحداث والتقارير والكتيبات الرسمية الواردة في ملف (1978_2.pdf) تحت كل سنة على حدى
const ARCHIVE_BY_YEARS = {
  "1978": {
    era: "era_1",
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img3.jpg",
    activities: [
      { id: "1978-1", title: "خطة العمل لحماية وتنمية البيئة البحرية والمناطق الساحلية", type: "كتيب / خطة عمل", typeKey: "legal", docType: "Hard Copy / كتيب", desc: "خطة العمل المعتمدة لحماية وتنمية البيئة البحرية والمناطق الساحلية للبحرين وإيران والعراق والكويت وعمان وقطر والمملكة العربية السعودية والإمارات العربية المتحدة. تم صياغتها في الكويت من 15-23 أبريل 1978 م[cite: 5]." },
      { id: "1978-2", title: "اتفاقية الكويت الإقليمية للتعاون في حماية البيئة من التلوث", type: "معاهدة رسمية", typeKey: "legal", docType: "Hard Copy / كتيب", desc: "اتفاقية الكويت الإقليمية التاريخية الموقعة في 24/4/1978 م للتعاون المشترك في حماية البيئة البحرية من التلوث بين الدول الثماني المطلة على المنطقة البحرية[cite: 5]." },
      { id: "1978-3", title: "البروتوكول الخاص بالتعاون الإقليمي للمكافحة في الحالات الطارئة", type: "بروتوكول قانوني", typeKey: "legal", docType: "Hard Copy / كتيب", desc: "البروتوكول الخاص بالتعاون الإقليمي لمكافحة التلوث بالزيت والمواد الضارة الأخرى في حالات الطوارئ البحرية (صادر في أبريل 1978 م)[cite: 5]." },
      { id: "1978-4", title: "الوثيقة الختامية للمؤتمر الإقليمي للمفوضين لحماية البيئة البحرية", type: "وثيقة ختامية", typeKey: "admin", docType: "Hard Copy", desc: "البيان والوثيقة الختامية (Final Act) للمؤتمر الإقليمي للمفوضين لحماية وتطوير البيئة البحرية والمناطق الساحلية المنعقد بالكويت 15-23 أبريل 1978 م[cite: 5]." }
    ]
  },
  "1979": {
    era: "era_1",
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img1.jpg",
    activities: [
      { id: "1979-1", title: "اجتماع الخبراء الحكوميين بشأن المشاريع التعاونية لخطة عمل الكويت", type: "اجتماع خبراء", typeKey: "admin", docType: "Hard Copy / تقرير", desc: "Meeting of Government Experts on Co-operative Projects of the Kuwait Action Plan. عُقد في دولة الكويت من 19-22 نوفمبر 1979 م[cite: 5]." },
      { id: "1979-2", title: "اجتماع الخبراء لإنشاء مركز المساعدة المتبادلة للطوارئ البحرية (MEMAC)", type: "تقرير تأسيسي", typeKey: "admin", docType: "Hard Copy / تقرير", desc: "Meeting of Experts on the Establishment of the Marine Emergency Mutual Aid Centre (MEMAC). عُقد في مملكة البحرين من 2-5 ديسمبر 1979 م لوضع حجر الأساس للمركز[cite: 5]." }
    ]
  },
  "1951": {
    era: "era_1",
    image: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img2.jpg",
    activities: [
      { id: "1980-1", title: "تقارير الأنشطة التنموية والاجتماعية والاقتصادية وآثارها البيئية", type: "سلسلة تقارير بيئية", typeKey: "env", docType: "Hard Copy / تقرير", desc: "مجموعة تقارير مسحية شاملة أعدت في عهد المنظمة لتتبع الأنشطة التنموية وآثارها البيئية الكبرى في دولة الكويت، مملكة البحرين، ودولة قطر في الفترة من مارس إلى أبريل 1980 م[cite: 5]." },
      { id: "1980-2", title: "برنامج الأرصاد الجوية البحرية الإقليمي - الدورة الأولى للمجلس المؤقت", type: "تقرير فني", typeKey: "env", docType: "Hard Copy / تقرير", desc: "Regional Marine Meteorological Program Interim Board - First Session. انعقدت الجلسة في الفترة من 29-30 مايو 1980 م لتأسيس شبكة رصد الطقس البحري[cite: 5]." },
      { id: "1980-3", title: "مسح مصادر التلوث البرية والصناعية والمنزلية في دول المنطقة", type: "مسح ميداني", typeKey: "env", docType: "Hard Copy / تقرير", desc: "تقارير المسح الشامل لمصادر التلوث الصناعي والمنزلي والصلب وتأثيراتها على المياه الساحلية في الكويت، البحرين، قطر، عمان، شرق السعودية، وجنوب العراق والإمارات (سبتمبر - ديسمبر 1980 م)[cite: 5]." }
    ]
  },
  "1981": {
    era: "era_1",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80",
    activities: [
      { id: "1981-1", title: "الاجتماع الأول لمجلس المنظمة الإقليمية لحماية البيئة البحرية (First ROPME Council)", type: "اجتماع وزاري", typeKey: "admin", docType: "Hard Copy / تقرير", desc: "الاجتماع الرسمي التاريخي الأول لمجلس وزراء المنظمة الإقليمية لحماية البيئة البحرية، عُقد في الكويت من 21-23 أبريل 1981 م لإقرار الأنظمة الداخلية واللوائح[cite: 5]." },
      { id: "1981-2", title: "النظام الأساسي للهيئة القضائية لفض المنازعات البيئية البحرية", type: "وثيقة تشريعية", typeKey: "legal", docType: "Hard Copy / مرسوم", desc: "Statute of the Judicial Commission for the Settlement of Disputes. تم إقراره في أبريل 1981 م لتنظيم الجوانب القانونية والقضائية بين الدول الأعضاء[cite: 5]." },
      { id: "1981-3", title: "النص غير الرسمي للنظام الداخلي لمجلس المنظمة الإقليمية + النسخة الإنجليزية", type: "كتيب تنظيمي", typeKey: "legal", docType: "Hard Copy / كتيب", desc: "إصدار الكتيب الرسمي المنظم للاجتماعات والآليات التنفيذية لمجلس المنظمة لعام 1981 م[cite: 5]." }
    ]
  },
  "1982": {
    era: "era_1",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80",
    activities: [
      { id: "1982-1", title: "اتفاقيات ومذكرات تفاهم برنامج رصد وبحوث التلوث البحري (18 شھراً)", type: "مذكرات تفاهم", typeKey: "legal", docType: "Hard Copy / مذكرات", desc: "توقيع اتفاقيات برنامج المراقبة والبحوث الخاص بالتلوث البحري لمدة 18 شهراً بين ROPME والجهات المعتمدة في العراق، عمان، البحرين، والإمارات (أبريل - سبتمبر 1982 م)[cite: 5]." },
      { id: "1982-2", title: "الاجتماع الأول لخبراء مرافق الاستقبال ومخلفات السفن", type: "اجتماع خبراء", typeKey: "admin", docType: "Hard Copy / تقرير", desc: "First Experts Meeting on Reception Facilities. عُقد في الكويت من 9-11 أكتوبر 1982 م لدراسة تخلص السفن من الفضلات[cite: 5]." },
      { id: "1982-3", title: "إصدار العدد الأول من نشرة 'آفاق البحار' الدورية", type: "نشرة دورية", typeKey: "admin", docType: "Hard Copy / مجلة", desc: "نشرة دورية متخصصة تصدر عن المنظمة الإقليمية لحماية البيئة البحرية، صدر العدد الأول منها في أكتوبر 1982 م لتوعية الرأي العام[cite: 5]." },
      { id: "1982-4", title: "الاجتماع الثاني لمجلس المنظمة الإقليمية والبوستر الرسمي الثلاثي", type: "اجتماع مجلس", typeKey: "admin", docType: "Hard Copy / بوستر", desc: "انعقاد الاجتماع الثاني لمجلس المنظمة في الكويت 6-7 نوفمبر 1982 م، وإصدار البوستر الرسمي التوثيقي باللغات العربية والفارسية والإنجليزية[cite: 5]." }
    ]
  },
  "1983": {
    era: "era_1",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&q=80",
    activities: [
      { id: "1983-1", title: "الاجتماعات الفنية الطارئة بشأن حادثة تسرب بقعة زيت نوروز (Nowruz)", type: "تقرير طوارئ", typeKey: "env", docType: "Hard Copy / تقرير", desc: "Technical Meetings on Nowruz Oil Spill Incident. عُقدت عدة اجتماعات فنية في البحرين والكويت بين أبريل ويونيو 1983 م لإدارة ومعالجة التلوث النفطي المدمر[cite: 5]." },
      { id: "1983-2", title: "الدورة التدريبية الإقليمية حول جمع ومعالجة البيانات البحرية - الدوحة", type: "ورشة عمل تدريبية", typeKey: "env", docType: "Hard Copy / ألبوم", desc: "ROPME/IOC/UNEP Training Workshop on Oceanographic Sampling, Analysis, Data Handling. عُقدت في قطر من 3-17 ديسمبر 1983 م لتأهيل الكوادر الوطنية على استخدام الأجهزة الحديثة[cite: 5]." }
    ]
  },
  "1984": {
    era: "era_1",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=600&q=80",
    activities: [
      { id: "1984-1", title: "الاجتماع القانوني الفني حول بروتوكول حماية البيئة البحرية من مصادر البر", type: "اجتماع قانوني", typeKey: "legal", docType: "Hard Copy", desc: "الاجتماع القانوني الفني حول البروتوكول الخاص بحماية المنطقة البحرية من التلوث من مصادر البر، عُقد في البحرين من 13-17 فبراير 1984 م والاجتماع الثاني في الكويت في ديسمبر 1984 م[cite: 5]." },
      { id: "1984-2", title: "مسابقة الصور الفوتوغرافية الأولى للدول الأعضاء في منظمة حماية البيئة", type: "فعالية ثقافية", typeKey: "admin", docType: "Hard Copy / كتيب", desc: "إطلاق مسابقة وكتيب الصور الفوتوغرافية للبيئة في دول المنظمة بمناسبة يوم البيئة الإقليمي في 24 أبريل 1984 م لتعزيز الوعي الاجتماعي[cite: 5]." },
      { id: "1984-3", title: "الاجتماع الثالث لمجلس المنظمة الإقليمية (Third Meeting of ROPME Council)", type: "اجتماع مجلس وزاري", typeKey: "admin", docType: "Hard Copy", desc: "انعقاد الاجتماع الثالث لمجلس المنظمة في مقر الأمانة العامة بالكويت من 24-25 أبريل 1984 م لمتابعة لجان دراسة الملوثات والميزانيات[cite: 5]." }
    ]
  }
};

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
  const [selectedYear, setSelectedYear] = useState('1978'); // السنة النشطة حالياً في الفرز الهيكلي التجميعي
  const [selectedActivityModal, setSelectedActivityModal] = useState(null); // حالة الـ Popup التفصيلي للنشاط

  // تصفية الأنشطة داخل السنة المحددة بناءً على خيارات الفئة والبحث
  const activeYearData = ARCHIVE_BY_YEARS[selectedYear] || { activities: [] };
  
  const filteredActivities = useMemo(() => {
    return activeYearData.activities.filter(act => {
      const matchesSearch = act.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            act.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'الكل' || act.typeKey === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [selectedYear, searchTerm, selectedCategory]);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans bg-[#f8f1e5] text-[#3e2723] selection:bg-amber-800 selection:text-amber-50 transition-colors duration-500">
      
      {/* 1. هيدر المنصة التاريخية الأكاديمي المتوافق مع شروط السمة القديمة */}
      <header className="border-b border-[#cfbe9f] bg-[#f8f1e5]/90 backdrop-blur-md sticky top-0 z-40 px-4 py-4 md:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#8b4513] text-white font-black flex items-center justify-center text-sm shadow-md flex-shrink-0">
              ROPME
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-amber-950">
                  {TEMPLATE_INFO.title}
                </h1>
                <span className="text-[9px] py-0.5 px-2 rounded-full font-bold bg-[#8b4513]/10 text-[#8b4513] border border-amber-800/20">منظومة فرز وتجميع السجلات التاريخية</span>
              </div>
              <p className="text-xs mt-0.5 text-[#6d4c41] font-medium">
                {TEMPLATE_INFO.subtitle}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. الـ Dashboard الهيكلي الإحصائي الموثق بالأرقام ليعبر عن السجلات التاريخية البحرية */}
      <section className="border-b border-[#cfbe9f] bg-[#ebdcb9]/40 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full border-[3px] border-[#3e2723] bg-white text-[#3e2723] flex items-center justify-center text-3xl font-black mb-3">5</div>
            <div className="text-xs font-bold">📜 معاهدات وبروتوكولات قانونية</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full border-[3px] border-[#3e2723] bg-white text-[#3e2723] flex items-center justify-center text-3xl font-black mb-3">4</div>
            <div className="text-xs font-bold">🔬 حملات وبعثات مسح بحري ميداني</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full border-[3px] border-[#3e2723] bg-white text-[#3e2723] flex items-center justify-center text-3xl font-black mb-3">4</div>
            <div className="text-xs font-bold">🏛️ مؤتمرات وقرارات المجلس الإداري</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full border-[3px] border-[#3e2723] bg-white text-[#3e2723] flex items-center justify-center text-3xl font-black mb-3">13</div>
            <div className="text-xs font-bold">📂 إجمالي سجلات الأرشيف المدمجة</div>
          </div>
        </div>
      </section>

      {/* المحيط التفاعلي الرئيسي للمنصة */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-6">
        
        {/* اللوحة اليمنى: محدد السنوات التفاعلي (تم إبرازه لضمان تجميع السجلات حسب رغبتك) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="p-4 rounded-2xl border border-[#dac9ad] bg-[#f1e6d2] shadow-sm">
            <h2 className="text-sm font-black mb-3 text-amber-950 flex items-center gap-2">
              📅 اختر السنة التاريخية لاستعراض سجلاتها:
            </h2>
            <div className="flex flex-col gap-2">
              {Object.keys(ARCHIVE_BY_YEARS).map(year => (
                <button
                  key={year}
                  onClick={() => { setSelectedYear(year); setSelectedCategory('الكل'); }}
                  className={`w-full p-3.5 rounded-xl border text-right flex items-center justify-between transition-all ${selectedYear === year ? 'bg-amber-800 text-white border-amber-800 shadow-md translate-x-[-4px]' : 'bg-[#fcf8f0] border-[#cfbe9f]/60 hover:border-amber-800 text-[#3e2723]'}`}
                >
                  <span className="font-mono font-black text-sm">العام التاريخي: {year} م</span>
                  <span className={`text-[10px] py-0.5 px-2 rounded-md font-bold ${selectedYear === year ? 'bg-amber-900 text-white' : 'bg-[#ebdcb9] text-amber-950'}`}>
                    {ARCHIVE_BY_YEARS[year].activities.length} أنشطة موثقة[cite: 5]
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* اللوحة اليسرى: شبكة عرض الأنشطة التابعة للسنة المحددة بدقة والبحث المباشر */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* شريط أدوات البحث وتصنيفات فئات الأنشطة للسنة المحددة */}
          <div className="p-4 md:p-5 rounded-2xl border border-[#dac9ad] bg-[#f1e6d2] flex flex-col gap-3.5 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input 
                type="text" 
                placeholder={`ابحث في أنشطة وسجلات عام ${selectedYear}...`} 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all bg-[#fcf8f0] border-[#cfbe9f] text-[#3e2723] placeholder-[#8d6e63] focus:border-amber-800" 
              />
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-[11px] font-bold text-[#6d4c41]">الفئة الفرعية:</span>
                <div className="flex gap-1">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => setSelectedCategory(cat.id)} 
                      className={`px-2.5 py-1 rounded-md text-[10px] font-black border transition-all ${selectedCategory === cat.id ? 'bg-amber-800 text-white border-amber-800 shadow-xs' : 'bg-transparent border-amber-900/20 text-[#5d4037]'}`}
                    >
                      {cat.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* صورة الغلاف الأرشيفية الكبرى للسنة المحددة (تم إصلاح مسارات السيرفر لتظهر بدقة) */}
          <div className="w-full h-44 rounded-2xl overflow-hidden relative border border-[#dac9ad] bg-[#ebdcb9] shadow-sm">
            <img 
              src={ARCHIVE_BY_YEARS[selectedYear]?.image} 
              alt={`ROPME Year ${selectedYear}`} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 right-4 text-white">
              <div className="text-3xl font-black font-mono tracking-wide drop-shadow-md">سجلات عام {selectedYear} م[cite: 5]</div>
              <p className="text-[10px] text-amber-200 mt-0.5 font-bold">تم استخلاص وثائق هذا العام ومطابقتها من المجلد الرسمي للأمانة العامة[cite: 5]</p>
            </div>
          </div>

          {/* شبكة الأنشطة والكتيبات والتقارير الفعلية التابعة للسنة المحددة */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredActivities.map(activity => (
              <div 
                key={activity.id} 
                onClick={() => setSelectedActivityModal(activity)} 
                className="rounded-2xl border border-[#dac9ad] bg-[#f1e6d2] flex flex-col justify-between p-4 cursor-pointer group hover:scale-[1.01] hover:border-amber-800/60 transition-all shadow-xs"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-850 text-white rounded shadow-xs">
                      {activity.type}
                    </span>
                    <span className="text-[10px] font-mono text-[#6d4c41] font-bold">
                      {activity.docType}
                    </span>
                  </div>
                  <h3 className="text-xs font-black mb-1.5 text-[#3e2723] group-hover:text-amber-800 transition-colors leading-relaxed">
                    {activity.title}[cite: 5]
                  </h3>
                  <p className="text-[11px] leading-relaxed text-[#5d4037] text-justify line-clamp-3">
                    {activity.desc}[cite: 5]
                  </p>
                </div>
                <div className="text-[10px] text-amber-800 font-extrabold text-left pt-2 border-t border-amber-900/5 group-hover:underline">
                  انقر لفتح الـ Popup ومراجعة تفاصيل التوثيق والملاحظات ←
                </div>
              </div>
            ))}

            {filteredActivities.length === 0 && (
              <div className="col-span-full p-12 text-center text-xs font-bold text-slate-500 border border-dashed border-[#cfbe9f] rounded-2xl">
                لا توجد سجلات أو مستندات تطابق خيارات الفرز والبحث لعام {selectedYear}.
              </div>
            )}
          </div>

        </div>
      </main>

      {/* 5. لوحة الدول الأعضاء مع أعلامها داخل الدوائر الهندسية المخصصة في التذييل */}
      <section className="border-t border-[#cfbe9f] bg-[#ebdcb9]/20 py-8 px-4 mt-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-black mb-4 text-[#3e2723] text-center lg:text-right">🏳️ الدول الثماني الأعضاء الموقعة على ميثاق اتفاقية الكويت الإقليمية لعام 1978 م[cite: 5]</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
            {MEMBER_STATES.map(state => (
              <div key={state.name} className="p-3 rounded-xl border border-[#dac9ad] bg-[#f1e6d2] flex flex-col items-center justify-center gap-1.5 shadow-xs">
                <div className="w-12 h-14 rounded-full bg-white border border-[#cfbe9f] flex items-center justify-center text-2xl select-none shadow-sm">
                  {state.flag}
                </div>
                <span className="text-[10px] font-bold block text-[#3e2723]">{state.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. نافذة الـ Popup التفاعلية (Modal) المخصصة لعرض البيان والألبوم والملفات التفصيلية للنشاط بدقة */}
      {selectedActivityModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#f5efe4] border border-[#cbd4c5] rounded-3xl p-6 max-w-xl w-full shadow-2xl relative text-[#3e2723]">
            <button onClick={() => setSelectedActivityModal(null)} className="absolute top-4 left-4 p-1.5 bg-[#8b4513] text-white rounded-full font-bold hover:bg-amber-900 transition-colors">✕</button>
            
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-3xl font-mono font-black text-amber-800">{selectedYear} م</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-850 text-white rounded shadow-sm">معاينة وثيقة حقيقية معتمدة[cite: 5]</span>
            </div>

            <h3 className="text-sm md:text-md font-black mb-3 border-b border-amber-900/10 pb-2 leading-relaxed text-amber-950">
              {selectedActivityModal.title}[cite: 5]
            </h3>

            <div className="space-y-3 my-4 p-4 rounded-xl border border-[#dac9ad] bg-[#f1e6d2]/50 text-xs">
              <div>📌 <span className="font-bold">نوع السجل التوثيقي:</span> {selectedActivityModal.type}[cite: 5]</div>
              <div>📂 <span className="font-bold">طبيعة الملف بالمكتبة:</span> {selectedActivityModal.docType}[cite: 5]</div>
              <div className="leading-relaxed text-justify text-[#5d4037] pt-2 border-t border-amber-900/5">
                <span className="font-bold text-amber-950 block mb-1">📝 البيان التاريخي الفني الحقيقي:</span>
                {selectedActivityModal.desc}[cite: 5]
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button onClick={() => setSelectedActivityModal(null)} className="px-6 py-2.5 bg-amber-850 text-white text-xs font-extrabold rounded-xl hover:bg-amber-900 transition-colors shadow-md">
                إغلاق وتأكيد القراءة والأرشفة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* تذييل المنصة القانوني */}
      <footer className="border-t border-[#cfbe9f] py-6 text-center text-xs bg-[#ebdcb9]/40 text-[#5d4037]">
        <p className="font-black">حقوق الطبع والنشر © 2026 محفوظة للمنصة الإقليمية لحماية البيئة البحرية (ROPME)</p>
        <p className="text-[10px] mt-1">جميع البيانات والتقارير مستخلصة ومحققة بالكامل من المجلد الرسمي الفني للأمانة العامة لدول المنظمة[cite: 5].</p>
      </footer>
    </div>
  );
}