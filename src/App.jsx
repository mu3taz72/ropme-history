import React, { useState, useMemo, useEffect } from 'react';

// ==========================================
// 1. قاعدة البيانات الأرشيفية الشاملة لـ ROPME (مستخلصة من 1978_2.pdf و 1978 2.pdf)
// ==========================================
const SITE_INFO = {
  title: "المنصة التاريخية الأرشيفية لمنظمة ROPME",
  subtitle: "أرشيف تفاعلي ومركز رصد حي يوثق قرارات وحملات حماية البيئة البحرية (1978 – 2025)",
};

const CATEGORIES = [
  { id: 'الكل', name: 'جميع المجالات', color: 'var(--teal)' },
  { id: 'legal', name: 'اتفاقيات وبروتوكولات', color: 'var(--teal)', badgeBg: 'bg-teal-850' },
  { id: 'env', name: 'بعثات وحملات بيئية', color: 'var(--coral)', badgeBg: 'bg-orange-800' },
  { id: 'admin', name: 'مؤتمرات وقرارات إدارية', color: 'var(--gold)', badgeBg: 'bg-amber-800' },
];

const ERAS = [
  { id: 'all', name: 'جميع الفترات التاريخية' },
  { id: 'era_1', name: 'مرحلة التأسيس والبروتوكولات الأولى (1978 – 1989)' },
  { id: 'era_2', name: 'مرحلة الأزمات البيئية وإعادة التأهيل (1990 – 2005)' },
  { id: 'era_3', name: 'الألفية الجديدة واستدامة العمل المشترك (+2006)' },
];

const TIMELINE_EVENTS = [
  // حقبة التأسيس (1978 - 1989)
  {
    id: 1, year: 1978, era: 'era_1', category: 'legal', icon: '📜',
    title: "خطة العمل لحماية وتنمية البيئة البحرية والمناطق الساحلية",
    desc: "اعتماد خطة العمل الإقليمية الشاملة لحماية البيئة البحرية والمناطق الساحلية لكل من البحرين، إيران، العراق، الكويت، عمان، قطر، السعودية، والإمارات (الكويت 15-23 أبريل 1978)[cite: 5, 7].",
    docType: "كتيب / خطة عمل", libraryRef: "Hard Copy / كتيب معتمد"
  },
  {
    id: 2, year: 1978, era: 'era_1', category: 'legal', icon: '✒️',
    title: "اتفاقية الكويت الإقليمية للتعاون في حماية البيئة من التلوث",
    desc: "التوقيع الرسمي التاريخي على اتفاقية الكويت الإقليمية لعام 1978 كإطار تشريعي ملزم للدول الأعضاء المطلة على النطاق البحري المشترك[cite: 5, 7].",
    docType: "معاهدة رسمية", libraryRef: "Hard Copy / كتيب"
  },
  {
    id: 3, year: 1978, era: 'era_1', category: 'legal', icon: '🚨',
    title: "بروتوكول التعاون الإقليمي للمكافحة في الحالات الطارئة",
    desc: "Protocol concerning Regional Co-operation in Combating Pollution by Oil and other Harmful Substances in cases of Emergency[cite: 5, 7].",
    docType: "بروتوكول قانوني", libraryRef: "Hard Copy / كتيب"
  },
  {
    id: 4, year: 1979, era: 'era_1', category: 'admin', icon: '⚓',
    title: "اجتماع الخبراء الحكوميين لتأسيس الكيان العملياتي لـ MEMAC",
    desc: "انعقاد مجمع الخبراء والمندوبين في المنامة بالبحرين لوضع الترتيبات الهيكلية، الإدارية، والمالية لتشغيل مركز المساعدة المتبادلة للطوارئ البحرية[cite: 5, 7].",
    docType: "اجتماع خبراء", libraryRef: "Hard Copy / تقرير رسمي"
  },
  {
    id: 5, year: 1980, era: 'era_1', category: 'env', icon: '🔬',
    title: "إطلاق بعثات الجرد الشامل والتقييم السريع للملوثات البرية والصناعية",
    desc: "تقارير المسح الشامل لمصادر التلوث الصناعي والمنزلي والصلب وتأثيراتها على المياه الساحلية في الكويت، البحرين، قطر، عمان، شرق السعودية، وجنوب العراق والإمارات[cite: 5, 7].",
    docType: "مسح ميداني", libraryRef: "Hard Copy / تقارير مسحية"
  },
  {
    id: 6, year: 1981, era: 'era_1', category: 'admin', icon: '🏛️',
    title: "الاجتماع الوزاري الأول لمجلس المنظمة الإقليمية (First ROPME Council)",
    desc: "الإنعقاد الرسمي الأول للمجلس الأعلى للمنظمة في دولة الكويت لإقرار الميزانيات، اللوائح الداخلية، واعتماد النظام الأساسي للهيئة القضائية لفض المنازعات[cite: 5, 7].",
    docType: "اجتماع وزاري", libraryRef: "Hard Copy / تقرير"
  },
  {
    id: 7, year: 1982, era: 'era_1', category: 'legal', icon: '⚖️',
    title: "اتفاقيات برنامج رصد وبحوث التلوث البحري (18 شهراً)",
    desc: "توقيع مذكرات التفاهم التفصيلية وبرامج المراقبة والبحوث الخاصة بالتلوث البحري بين ROPME والجهات المعتمدة في العراق، عمان، البحرين، والإمارات[cite: 5, 7].",
    docType: "مذكرات تفاهم", libraryRef: "Hard Copy / مذكرات"
  },
  {
    id: 8, year: 1983, era: 'era_1', category: 'env', icon: '🐳',
    title: "الاجتماعات الفنية الطارئة بشأن حادثة تسرب بقعة زيت حقل نوروز (Nowruz)",
    desc: "Technical Meetings on Nowruz Oil Spill Incident. انعقدت اللجان الفنية في البحرين والكويت لإدارة ومعالجة التلوث النفطي الناجم عن حوادث الحقل[cite: 5, 7].",
    docType: "تقرير طوارئ", libraryRef: "Hard Copy / تقرير فني"
  },
  {
    id: 9, year: 1984, era: 'era_1', category: 'legal', icon: '📜',
    title: "الاجتماع القانوني الفني حول بروتوكول حماية البيئة البحرية من مصادر برية",
    desc: "اجتماع الخبراء المتخصصين لمراجعة نصوص وصياغة مسودة الاتفاقية الملزمة للحد من الصرف الصناعي والصحي الساحلي المباشر (البحرين والكويت)[cite: 5, 7].",
    docType: "اجتماع قانوني", libraryRef: "Hard Copy / مسودة"
  },
  {
    id: 10, year: 1985, era: 'era_1', category: 'env', icon: '📡',
    title: "ندوة رصد البيئة البحرية والبحوث الإقليمية - العين",
    desc: "انعقاد ندوة الرصد والبحوث الكبرى في العين بدولة الإمارات العربية المتحدة لمطابقة آليات التحليل الكيميائي لملوحات المياه والمعادن[cite: 7].",
    docType: "ندوة علمية", libraryRef: "Hard Copy / تقرير"
  },
  {
    id: 11, year: 1986, era: 'era_1', category: 'legal', icon: '🚢',
    title: "الحلقة الدراسية لتجديد وصيانة معايير اتفاقية ماربول 73/78",
    desc: "تنظيم الحلقة المشتركة بالتعاون مع المنظمة البحرية الدولية (IMO) للتفتيش والمراقبة على السفن ومراكز الاستقبال[cite: 7].",
    docType: "حلقة فنية", libraryRef: "Hard Copy / كتيب"
  },
  {
    id: 12, year: 1987, era: 'era_1', category: 'env', icon: '🌪️',
    title: "دراسة ترسبات الغبار والأتربة في المنطقة البحرية الشمالية",
    desc: "Study Of Dust Fallout in the Northern Part of the ROPME Sea Area لمراقبة التأثيرات الجوية على البيئة الفطرية[cite: 7].",
    docType: "بحث علمي", libraryRef: "Hard Copy / دراسة فنية"
  },
  {
    id: 13, year: 1988, era: 'era_1', category: 'admin', icon: '🏅',
    title: "الاجتماع الاستثنائي الثالث لمجلس المنظمة بمرور 10 سنوات",
    desc: "انعقاد الدورة الاستثنائية الثالثة لمراجعة إنجازات العقد الأول للمنظمة (1978-1988م) وإصدار بوستر الاحتفالية[cite: 7].",
    docType: "جلسة طارئة", libraryRef: "Hard Copy / بوستر"
  },
  {
    id: 14, year: 1989, era: 'era_1', category: 'legal', icon: '🏗️',
    title: "توقيع بروتوكول تلوث البحر الناجم عن استكشاف الجرف القاري",
    desc: "توقيع البروتوكول الخاص بالتلوث الناجم عن عمليات استكشاف واستغلال الجرف القاري باللغات الثلاث (العربية، الإنجليزية، الفارسية)[cite: 7].",
    docType: "بروتوكول سيادي", libraryRef: "اتفاقية دولية"
  },
  
  // حقبة الأزمات وإعادة التأهيل (1990 - 2005)
  {
    id: 15, year: 1990, era: 'era_2', category: 'legal', icon: '📝',
    title: "التوقيع الرسمي لبروتوكول حماية البيئة البحرية من مصادر في البر",
    desc: "اجتماع المفوضين في الكويت للتوقيع النهائي على بروتوكول حماية المنطقة البحرية من التلوث الناجم عن مصادر في البر[cite: 7].",
    docType: "بروتوكول ملزم", libraryRef: "نسخة رسمية مطبوعة"
  },
  {
    id: 16, year: 1991, era: 'era_2', category: 'env', icon: '🚨',
    title: "إدارة أكبر كارثة تسرب نفطي في التاريخ وتشكيل فريق الاستجابة",
    desc: "قيادة وتنسيق جهود رصد وتقييم الأثر البيئي المدمر الناتج عن تدفق ملايين براميل النفط خلال حرب تحرير الكويت وحماية المصايد[cite: 7].",
    docType: "إدارة كوارث", libraryRef: "تقرير طوارئ خاص"
  },
  {
    id: 17, year: 1992, era: 'era_2', category: 'env', icon: '🚢',
    title: "إطلاق الرحلة العلمية الاستكشافية لـ 'ماونت ميتشل' بعد الأزمة النفطية",
    desc: "الرحلة العلمية لسفينة الأبحاث (Mt. Mitchell Expedition) بالتعاون مع المؤسسات الدولية لتقييم أضرار الموائل وقاع البحر[cite: 7].",
    docType: "بعثة بحرية", libraryRef: "كتاب فني مصور"
  },
  {
    id: 18, year: 1993, era: 'era_2', category: 'admin', icon: '🏛️',
    title: "الاجتماع الوزاري الثامن لمجلس المنظمة وإصدار تقارير مصفاة ماونت ميتشل",
    desc: "انعقاد الدورة العادية الثامنة لمجلس المنظمة في الكويت، ونشر المجلدات الثلاثة للنتائج العلمية لرحلة ماونت ميتشل[cite: 7].",
    docType: "قرار إداري", libraryRef: "مجلد فني (3 أجزاء)"
  },
  {
    id: 19, year: 1994, era: 'era_2', category: 'env', icon: '🧪',
    title: "المسح الإقليمي لغرب الخليج بالتعاون مع الوكالة الدولية للطاقة الذرية",
    desc: "مشروع ROPME/IAEA Contaminant Screening لتقييم المركبات العضوية والملوثات في الكويت والبحرين والإمارات[cite: 7].",
    docType: "فحص مخبري", libraryRef: "دراسة بحثية"
  },
  {
    id: 20, year: 1995, era: 'era_2', category: 'admin', icon: '🌍',
    title: "الندوة الدولية لمراجعة وضع البيئة البحرية بعد أزمة 1990 - طوكيو",
    desc: "ندوة طوكيو الدولية بالتعاون مع جامعة طوكيو للعلوم السمكية لمراجعة حالة الخليج بعد الأزمة البيئية[cite: 7].",
    docType: "مؤتمر دولي", libraryRef: "كتاب وقائع الندوة"
  },
  {
    id: 21, year: 1996, era: 'era_2', category: 'admin', icon: '📋',
    title: "الاجتماع الوزاري العادي التاسع لمجلس المنظمة - الكويت",
    desc: "انعقاد الدورة التاسعة للمجلس لإقرار أولويات خطة العمل والمشاريع البحثية للفترة 1996-1998م[cite: 7].",
    docType: "مؤتمر مجلس", libraryRef: "وثيقة معتمدة"
  },
  {
    id: 22, year: 1997, era: 'era_2', category: 'legal', icon: '🤝',
    title: "اتفاقية المسح البحري المفتوح مع سفينة الأبحاث الروسية",
    desc: "توقيع عقد المسح مع معهد الرصد الجغرافي الروسي لتشغيل سفينة YUZHMORGEOLOGIYA لمسح مياه عمان والخليج[cite: 7].",
    docType: "معاهدة بحثية", libraryRef: "مذكرة عقد"
  },
  {
    id: 23, year: 1998, era: 'era_2', category: 'legal', icon: '☢️',
    title: "بروتوكول التحكم في النقل البحري للنفايات الخطرة والتخلص منها عبر الحدود",
    desc: "اجتماع المفوضين في طهران للتوقيع الرسمي على بروتوكول حظر نقل النفايات السامة والمشعة في النطاق البحري للمنظمة[cite: 7].",
    docType: "بروتوكول ملزم", libraryRef: "وثيقة قانونية ثلاثية"
  },
  {
    id: 24, year: 1999, era: 'era_2', category: 'legal', icon: '📘',
    title: "تحديث وإصدار الدليل الإقليمي المعياري لطرق الرصد والتحليل (MOOPAM)",
    desc: "إصدار كتاب MOOPAM 1999 المعتمد كمرجع موحد لجميع المختبرات الوطنية في الدول الأعضاء لتوحيد القياسات[cite: 7].",
    docType: "دليل فني", libraryRef: "كتاب مرجعي معتمد"
  },
  {
    id: 25, year: 2000, era: 'era_2', category: 'env', icon: '🛰️',
    title: "إصدار الأطلس الفضائي الرقمي الأول لرصد البيئة البحرية عبر الأقمار",
    desc: "نشر كتاب ATLAS ROPME Region from Space 2000 لتوثيق ومراقبة الموائل البحرية والشعاب بالاستشعار عن بعد[cite: 7].",
    docType: "أطلس جغرافي", libraryRef: "إصدار رسمي مطبوع"
  },
  {
    id: 26, year: 2001, era: 'era_2', category: 'legal', icon: '🌐',
    title: "توقيع اتفاقية الشراكة مع اللجنة الدولية لعلوم المحيطات (IOC/UNESCO)",
    desc: "توقيع مذكرة تفاهم استراتيجية لتعزيز برامج نمذجة ومراقبة العمليات البحرية الساحلية وتدريب الكوادر[cite: 7].",
    docType: "مذكرة دولية", libraryRef: "وثيقة معاهدة"
  },
  {
    id: 27, year: 2002, era: 'era_2', category: 'legal', icon: '🌱',
    title: "ندوة بروتوكول حماية البيئة البحرية من مصادر التلوث البرية - الكويت",
    desc: "عقد ورش العمل الإقليمية لمناقشة تفعيل بنود اتفاقية مصادر البر والتدقيق البيئي على المصارف الساحلية[cite: 7].",
    docType: "ندوة إقليمية", libraryRef: "تقرير فني"
  },
  {
    id: 28, year: 2003, era: 'era_2', category: 'admin', icon: '👑',
    title: "الاجتماع الوزاري الثاني عشر لمجلس المنظمة والاحتفال باليوبيل الفضي",
    desc: "انعقاد الدورة العادية الثانية عشرة في جدة، ونشر تقرير حالة البيئة البحرية SOMER 2003 وكتاب اليوبيل الفضي[cite: 7].",
    docType: "قرار مجلس", libraryRef: "تقرير وزاري + كتاب"
  },
  {
    id: 29, year: 2004, era: 'era_2', category: 'legal', icon: '🧬',
    title: "اجتماعات صياغة بروتوكول المحافظة على التنوع البيولوجي والمحميات",
    desc: "اجتماع الخبراء القانونيين والفنيين في طهران لوضع مسودة بروتوكول حماية التنوع الحيوي وإنشاء المناطق المحمية[cite: 7].",
    docType: "جلسة تشريعية", libraryRef: "مسودة بروتوكول"
  },
  {
    id: 30, year: 2005, era: 'era_2', category: 'legal', icon: '💧',
    title: "إصدار المعايير والمقاييس الإقليمية الموحدة لإدارة مياه الصرف الصناعي والصحي",
    desc: "نشر الدليل الاستراتيجي للمعايير البيئية للتصريفات الساحلية والهندسة القاعية لدول المنظمة[cite: 7].",
    docType: "إصدار تشريعي", libraryRef: "كتاب اللوائح"
  },

  // حقبة الألفية الجديدة واستدامة العمل (+2006)
  {
    id: 31, year: 2006, era: 'era_3', category: 'admin', icon: '🏛️',
    title: "الاجتماع الوزاري العادي الثالث عشر لمجلس المنظمة - مسقط",
    desc: "انعقاد الدورة الثالثة عشرة للمجلس، وإقرار مشاريع التفتيش الإقليمي وحماية البيئة البحرية من الإشعاعات[cite: 7].",
    docType: "مؤتمر رسمي", libraryRef: "وثيقة قرارات"
  },
  {
    id: 32, year: 2007, era: 'era_3', category: 'env', icon: '🔬',
    title: "إطلاق برنامج رصد المحطات الحيوية والتحقيق في نفوق الكائنات (Mussel Watch)",
    desc: "إصدار الدليل الموحد للتحقيق في نفوق الثدييات والأسماك وتدشين برنامج Mussel Watch Concept[cite: 7].",
    docType: "دليل تشغيلي", libraryRef: "كتيب فني معتمد"
  },
  {
    id: 33, year: 2008, era: 'era_3', category: 'admin', icon: '🇶🇦',
    title: "الاجتماع الوزاري الرابع عشر لمجلس المنظمة - الدوحة",
    desc: "اعتماد وثيقة المحافظة على البيئة البحرية من منظور إسلامي ومراجعة خطة العمل الإقليمية[cite: 7].",
    docType: "قرارات مجلس", libraryRef: "تقرير وزاري"
  },
  {
    id: 34, year: 2009, era: 'era_3', category: 'env', icon: '⚠️',
    title: "تأسيس الفريق الإقليمي المشترك لرصد الطحالب الضارة والمد الأحمر",
    desc: "الاجتماع الأول لفريق العمل الإقليمي حول ازدهار الطحالب الضارة وحالات نفوق الأسماك الناتجة عنها[cite: 7].",
    docType: "لجنة فنية", libraryRef: "تقرير"
  },
  {
    id: 35, year: 2010, era: 'era_3', category: 'env', icon: '🐢',
    title: "إطلاق الاستراتيجية الإقليمية الموحدة لمراقبة وحماية السلاحف البحرية",
    desc: "توقيع اتفاقية التعاون مع السكرتارية الدولية لحماية السلاحف البحرية IOSEA وتدشين محطات الرصد[cite: 7].",
    docType: "مذكرة رصد", libraryRef: "اتفاقية دولية"
  },
  {
    id: 36, year: 2011, era: 'era_3', category: 'admin', icon: '🇸🇦',
    title: "الاجتماع الوزاري الخامس عشر لمجلس المنظمة - جدة",
    desc: "انعقاد الدورة الخامسة عشرة للمجلس، وإقرار خطة العمل الإقليمية الاستراتيجية للتوعية ومواجهة تدهور الشعاب المرجانية[cite: 7].",
    docType: "مؤتمر وزاري", libraryRef: "بيان رسمي"
  },
  {
    id: 37, year: 2012, era: 'era_3', category: 'env', icon: '🌳',
    title: "تدشين مشاريع مسح غابات أشجار القرم (المانجروف) في مياه عمان والخليج",
    desc: "إصدار دراسات المسح الميداني وسلسلة البيئة البحرية رقم 2 الخاصة بنظم أشجار القرم وحمايتها[cite: 7].",
    docType: "سلسلة علمية", libraryRef: "كتاب معتمد"
  },
  {
    id: 38, year: 2013, era: 'era_3', category: 'admin', icon: '📊',
    title: "إصدار تقرير حالة البيئة البحرية المحدث الشامل SOMER 2013",
    desc: "انعقاد الدورة السادسة عشرة للمجلس في جدة، والمصادقة على نشر كتاب SOMER 2013 الشامل[cite: 7].",
    docType: "تقرير سيادي", libraryRef: "تقرير حالة البيئة"
  },
  {
    id: 39, year: 2014, era: 'era_3', category: 'legal', icon: '🇯🇵',
    title: "توقيع اتفاقية الشراكة مع الوكالة اليابانية للتعاون الدولي (JICA)",
    desc: "إطلاق برنامج التعاون الفني في مجالات رصد التنوع البيولوجي والموائل البحرية وإدارة البيانات الجغرافية[cite: 7].",
    docType: "اتفاقية دولية", libraryRef: "مذكرة تفاهم"
  },
  {
    id: 40, year: 2015, era: 'era_3', category: 'env', icon: '🌪️',
    title: "إطلاق ورش رصد وتقييم العواصف الرملية والترابية وتأثيراتها البحرية",
    desc: "تنفيذ الورش التقنية الدولية في دبي لربط مسارات الغبار الجوي بمستويات المغذيات والأكسجين في مياه البحر[cite: 7].",
    docType: "ورشة تقنية", libraryRef: "تقرير علمي"
  },
  {
    id: 41, year: 2016, era: 'era_3', category: 'admin', icon: '🇯🇵',
    title: "انعقاد لجان استراتيجية الإدارة القائمة على النظام البيئي (EBM) - طوكيو",
    desc: "الاجتماع الأول لفريق العمل الإقليمي المشترك في طوكيو باليابان لوضع معايير الإدارة الإيكولوجية الساحلية[cite: 7].",
    docType: "وثيقة خطة", libraryRef: "محضر رسمي"
  },
  {
    id: 42, year: 2017, era: 'era_3', category: 'legal', icon: '🇬🇧',
    title: "اتفاقية تقييم مخاطر التغير المناخي والازدهار الطحلبي الضار مع CEFAS",
    desc: "توقيع الشراكة الاستراتيجية مع مركز علوم البيئة ومصايد الأسماك البريطاني لتطوير استراتيجية التكيف والمواجهة[cite: 7].",
    docType: "معاهدة بحثية", libraryRef: "مذكرة عقد دولي"
  },
  {
    id: 43, year: 2018, era: 'era_3', category: 'legal', icon: '🐠',
    title: "مذكرة التفاهم مع الهيئة الإقليمية لمصايد الأسماك (RECOFI)",
    desc: "تكامل حماية التنوع الإحيائي البحري ومواجهة خطر الملوثات والمخلفات البلاستيكية في مياه الخليج[cite: 7].",
    docType: "مذكرة تعاون", libraryRef: "مذكرة معتمدة"
  },
  {
    id: 44, year: 2019, era: 'era_3', category: 'admin', icon: '🔊',
    title: "انعقاد الاجتماع الثالث والثلاثين للجنة التنفيذية للمنظمة - الكويت",
    desc: "إقرار ومراجعة الأطر الفنية الخاصة بحماية الموائل الساحلية وإعادة تأهيلها في المنطقة البحرية المشتركة[cite: 7].",
    docType: "قرار إداري", libraryRef: "تسجيل + محضر"
  },
  {
    id: 45, year: 2020, era: 'era_3', category: 'env', icon: '🌱',
    title: "إصدار التقرير الإقليمي الموحد لتقييم مخزون الكربون الأزرق (Blue Carbon)",
    desc: "نشر كتاب وموجز سياسات تقييم مخاطر التغير المناخي لـ ROPME وتأثيرها على غابات المانجروف والشواطئ[cite: 7].",
    docType: "تقرير استراتيجي", libraryRef: "كتاب السياسات"
  },
  {
    id: 46, year: 2021, era: 'era_3', category: 'admin', icon: '💻',
    title: "انعقاد المؤتمر الطارئ والاجتماع الاستثنائي الخامس للمجلس افتراضياً",
    desc: "إصدار موجز سياسات الكربون الأزرق ومراجعة خطة العمل الإقليمية للتغير المناخي عبر منصة زووم[cite: 7].",
    docType: "مؤتمر طارئ", libraryRef: "وثيقة رقمية"
  },
  {
    id: 47, year: 2022, era: 'era_3', category: 'legal', icon: '🐠',
    title: "إصدار حزمة موجز السياسات لتكيف مصائد الأسماك ومحطات التحلية",
    desc: "تطوير معايير تكيف المنشآت الصناعية الساحلية مع التغير المناخي ونشر كتاب موائل الكربون الأزرق[cite: 7].",
    docType: "موجز السياسات", libraryRef: "كتيبات فنية"
  },
  {
    id: 48, year: 2023, era: 'era_3', category: 'admin', icon: '📅',
    title: "المصادقة على الخطة الاستراتيجية البيئية الخمسية للمنظمة (2024-2028)",
    desc: "انعقاد لجان التوجيه والاجتماع السادس والثلاثين للجنة التنفيذية لإقرار وثيقة الخطة الاستراتيجية المستقبلية[cite: 7].",
    docType: "جلسة تخطيط", libraryRef: "مذكرة الخطة"
  },
  {
    id: 49, year: 2024, era: 'era_3', category: 'env', icon: '🛢️',
    title: "الورشة الإقليمية للنفايات البحرية والاجتماع الثالث عشر لضباط الاستجابة النفطية",
    desc: "تنسيق خطط الاستجابة الإقليمية ومكافحة الانسكابات النفطية الحادة (OSRO-13) المنعقدة في الدوحة بقطر[cite: 7].",
    docType: "ورشة ميدانية", libraryRef: "تقرير فني"
  },
  {
    id: 50, year: 2025, era: 'era_3', category: 'admin', icon: '🌊',
    title: "الاحتفال الرسمي بيوم البيئة الإقليمي تحت شعار 'نبحر للاستدامة'",
    desc: "ورش عمل الأمانة العامة العالية المستوى لمناقشة ارتفاع مستوى سطح البحر والمرونة الساحلية بالتعاون مع KISR وEPA[cite: 7].",
    docType: "فعالية رسمية", libraryRef: "كتيب + ألبوم"
  }
];

// ألبوم المعرض التاريخي المدقق والمرتب تصاعدياً كرونولوجياً
const GALLERY_IMAGES = [
  { id: 1, year: "1978 م", title: "مؤتمر المفوضين التاريخي بالكويت واطلاق خطة العمل الإقليمية", url: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img3.jpg", desc: "اللحظات الأولى لتوقيع معاهدة حماية المنطقة البحرية المشتركة من قبل الدول الثماني الأعضاء[cite: 7]." },
  { id: 2, year: "1982 م", title: "تجهيز وتأسيس الكيان العملياتي لمركز المساعدة المتبادلة MEMAC", url: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img1.jpg", desc: "إرساء غرف المراقبة والاتصال البرقي لتلقي بلاغات انسكابات الزيت والمواد الكيميائية الضارة بالبحرين[cite: 7]." },
  { id: 3, year: "1985 م", title: "بعثات الرصد الحقلي البيئي لمصادر التلوث البرية والصناعية", url: "https://dev.ropme-wp.giscon-development.com/wp-content/uploads/2023/06/slider-img2.jpg", desc: "أخذ الفحوصات المخبرية لدرجات حرارة المياه والرواسب القاعية لحماية الأنظمة الإيكولوجية الساحلية[cite: 7]." },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('timeline');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedEra, setSelectedEra] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedActivityModal, setSelectedActivityModal] = useState(null);

  // شحن وتأمين فلترة السجلات المجمعة حسب الأعوام دون حذف (1978 - 2025)
  const filteredEvents = useMemo(() => {
    return TIMELINE_EVENTS.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.year.toString().includes(searchTerm);
      
      const matchesCategory = selectedCategory === 'الكل' || event.category === selectedCategory;
      const matchesEra = selectedEra === 'all' || event.era === selectedEra;

      return matchesSearch && matchesCategory && matchesEra;
    }).sort((a, b) => a.year - b.year);
  }, [searchTerm, selectedCategory, selectedEra]);

  // استعادة الهوية اللونية التناغمية للمخطوطات التراثية والورق العتيق (Sepia Theme) بدقة 100%
  const bgThemeClass = darkMode 
    ? 'bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950' 
    : 'bg-[#f8f1e5] text-[#3e2723] selection:bg-amber-800 selection:text-amber-50';

  const cardThemeClass = darkMode
    ? 'bg-slate-900 border-slate-800 hover:border-amber-400/80 shadow-md text-white'
    : 'bg-[#f1e6d2] border-[#dac9ad] hover:border-amber-800/80 shadow-sm text-[#3e2723]';

  const inputThemeClass = darkMode
    ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-amber-500'
    : 'bg-[#fcf8f0] border-[#cfbe9f] text-[#3e2723] placeholder-[#8d6e63] focus:border-amber-800';

  return (
    <div dir="rtl" className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${bgThemeClass}`}>
      
      {/* 1. هيدر المنصة التراثي الفخم المتوافق تماماً مع التصميم المرفق */}
      <header className={`border-b sticky top-0 z-40 px-4 py-4 md:px-8 shadow-xs transition-colors duration-500 ${darkMode ? 'border-slate-800 bg-slate-900/85 backdrop-blur-md' : 'border-[#cfbe9f] bg-[#f8f1e5]/90 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#8b4513] text-white font-black flex items-center justify-center text-sm shadow-md flex-shrink-0">
                ROPME
              </div>
              <div className="text-right">
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#3e2723] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-amber-400 dark:to-yellow-500">
                  {SITE_INFO.title}
                </h1>
                <p className={`text-xs mt-0.5 font-bold ${darkMode ? 'text-slate-400' : 'text-[#6d4c41]'}`}>
                  {SITE_INFO.subtitle}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex rounded-lg p-1 ${darkMode ? 'bg-slate-800' : 'bg-[#ebdcb9]/60'}`}>
              <button onClick={() => setActiveTab('timeline')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'timeline' ? 'bg-[#8b4513] text-white shadow' : 'text-[#5d4037]'}`}>الأرشيف والخط الزمني</button>
              <button onClick={() => setActiveTab('info')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'info' ? 'bg-[#8b4513] text-white shadow' : 'text-[#5d4037]'}`}>عن ROPME</button>
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all ${darkMode ? 'bg-[#f1e6d2] border-[#cfbe9f] text-amber-900' : 'bg-slate-900 border-slate-800 text-amber-400'}`}>
              {darkMode ? '📜 مظهر البوستر الأثري' : '✨ النمط الداكن الحديث'}
            </button>
          </div>
        </div>
      </header>

      {/* 2. الـ Dashboard الإحصائي الأرشيفي الدائري النظيف المحاكي للتصميم المرفق */}
      <section className={`border-b py-8 px-4 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#ebdcb9]/40 border-[#cfbe9f]'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#3e2723] bg-white text-[#3e2723]'}`}>
              {TIMELINE_EVENTS.filter(e => e.category === 'legal').length}
            </div>
            <div className="text-xs font-bold">📜 معاهدات وبروتوكولات قانونية</div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#3e2723] bg-white text-[#3e2723]'}`}>
              {TIMELINE_EVENTS.filter(e => e.category === 'env').length}
            </div>
            <div className="text-xs font-bold">🔬 حملات وبعثات مسح بحري ميداني</div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#3e2723] bg-white text-[#3e2723]'}`}>
              {TIMELINE_EVENTS.filter(e => e.category === 'admin').length}
            </div>
            <div className="text-xs font-bold">🏛️ مؤتمرات وقرارات المجلس الوزاري</div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-28 h-28 rounded-full border-[3px] flex items-center justify-center text-3xl font-black mb-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-[#3e2723] bg-white text-[#3e2723]'}`}>
              {TIMELINE_EVENTS.length}
            </div>
            <div className="text-xs font-bold">📂 إجمالي السجلات والوقائع المحققة</div>
          </div>
        </div>
      </section>

      {/* المحتوى والمستكشف التاريخي التفاعلي الشامل */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-6">
        
        {activeTab === 'timeline' && (
          <div className="flex flex-col gap-6">
            
            {/* لوحة التحكم والفرز الأنيقة وعالية التباين */}
            <div className={`p-4 md:p-6 rounded-2xl border shadow-xs ${cardThemeClass}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="text" placeholder="ابحث بالتاريخ، الكلمة المفتاحية، أو نوع القرار البيئي..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all ${inputThemeClass}`} />
                <select value={selectedEra} onChange={(e) => setSelectedEra(e.target.value)} className={`w-full border rounded-xl px-3 py-2.5 text-xs focus:outline-none transition-all ${inputThemeClass}`}>
                  {ERAS.map(era => <option key={era.id} value={era.id}>{era.name}</option>)}
                </select>
                <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="py-2 px-4 rounded-lg border text-xs font-bold bg-[#8b4513] text-white hover:bg-amber-900 transition-colors">
                  {viewMode === 'grid' ? 'عرض السرد المتسلسل (الخطي)' : 'عرض شبكة البوستر المصورة'}
                </button>
              </div>

              <div className="mt-4 border-t border-amber-900/10 pt-3">
                <div className="text-xs font-black mb-2">تصنيفات مجالات الرصد والتاريخ الجغرافي لـ ROPME:</div>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map(cat => (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-1.5 rounded-full text-xs font-black border transition-all ${selectedCategory === cat.id ? 'bg-[#8b4513] text-white border-[#8b4513]' : 'bg-transparent border-amber-900/20'}`}>{cat.name}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* شريط الإحصاء المرن وعرض النتائج */}
            <div className="text-xs font-bold text-amber-950 dark:text-amber-400">
              نتائج الفرز: العثور على <span className="underline text-lg font-mono text-amber-700 dark:text-amber-300">{filteredEvents.length}</span> وثيقة مسجلة في الأرشيف المشترك.
            </div>

            {/* شبكة السجلات الكلاسيكية خالية من التظليل لحفظ جودة الصور والنصوص بنسبة 100% */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {filteredEvents.map(event => (
                  <div key={event.id} onClick={() => setSelectedActivityModal(event)} className={`rounded-2xl border flex flex-col overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300 ${cardThemeClass}`}>
                    <div className="w-full h-40 overflow-hidden relative bg-[#ebdcb9]">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-amber-900/90 text-white font-mono font-black text-xs px-2.5 py-1 rounded shadow">
                        {event.year} م
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between gap-3 bg-[#fdfaf4] dark:bg-slate-900">
                      <div>
                        <h3 className={`text-sm font-black mb-1.5 leading-tight ${darkMode ? 'text-slate-100' : 'text-[#3e2723]'}`}>{event.title}</h3>
                        <p className={`text-[11px] leading-relaxed text-justify line-clamp-3 ${darkMode ? 'text-slate-400' : 'text-[#5d4037]'}`}>{event.desc}</p>
                      </div>
                      <div className="text-[10px] text-amber-800 dark:text-amber-400 font-extrabold text-left group-hover:underline mt-1">انقر للـ Popup وعرض السجلات التفصيلية الكاملة ←</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* السرد الخطي التفاعلي المتسلسل (الخط الزمني الممتد) */
              <div className="relative border-r-2 mr-4 md:mr-8 pl-2 flex flex-col gap-6 border-amber-900/20">
                {filteredEvents.map(event => (
                  <div key={event.id} className="relative pr-8">
                    <div className="absolute right-[-7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 bg-white border-[#8b4513]"></div>
                    <div onClick={() => setSelectedActivityModal(event)} className={`border rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between cursor-pointer transition-all ${cardThemeClass}`}>
                      <div className="text-2xl font-black text-amber-600 font-mono flex-shrink-0">{event.year} م</div>
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-[#3e2723]'}`}>{event.title}</h3>
                        <p className={`text-[11px] mt-1 line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-[#5d4037]'}`}>{event.desc}</p>
                      </div>
                      <span className="text-xl p-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 flex-shrink-0">{event.icon}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. معرض الصور التاريخي التوثيقي المرتب تصاعدياً كرونولوجياً */}
            <div className="pt-8 border-t border-amber-900/10">
              <h2 className="text-base font-black mb-4 text-[#3e2723] dark:text-amber-400">📸 معرض الصور التاريخي والتوثيقي للمنظمة (الترتيب الكرونولوجي والتسلسلي)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {GALLERY_IMAGES.map(img => (
                  <div key={img.id} className={`rounded-xl overflow-hidden border shadow-sm group ${cardThemeClass}`}>
                    <div className="h-44 overflow-hidden relative bg-slate-950">
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-2 right-2 bg-slate-950/90 text-amber-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-800 shadow">{img.year}</span>
                    </div>
                    <div className="p-4 bg-[#fdfaf4] dark:bg-slate-900">
                      <h4 className={`font-bold text-xs mb-1 ${darkMode ? 'text-slate-100' : 'text-[#3e2723]'}`}>{img.title}</h4>
                      <p className={`text-[11px] leading-relaxed ${darkMode ? 'text-slate-400' : 'text-[#5d4037]'}`}>{img.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. لوحة الدول الأعضاء الثماني مع أعلام الدول داخل الدوائر الهندسة المخصصة بدقة */}
            <div className="pt-8 border-t border-amber-900/10">
              <h2 className="text-base font-black mb-4 text-[#3e2723] dark:text-amber-400">🏳️ الدول الثماني الأعضاء الموقعة على ميثاق اتفاقية الكويت الإقليمية لعام 1978 م</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
                {MEMBER_STATES.map(state => (
                  <div key={state.name} className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 shadow-xs ${cardThemeClass}`}>
                    <div className="w-12 h-14 rounded-full bg-white border border-[#cfbe9f] flex items-center justify-center text-2xl select-none shadow-sm">{state.flag}</div>
                    <span className={`text-[10px] font-bold block ${darkMode ? 'text-slate-300' : 'text-[#3e2723]'}`}>{state.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* معلومات عن المنظمة */}
        {activeTab === 'info' && (
          <div class={`p-6 rounded-2xl border shadow-xl animate-scaleIn ${cardThemeClass}`}>
            <h2 className="text-xl font-black mb-3">عن المنظمة الإقليمية لحماية البيئة البحرية (ROPME)</h2>
            <p className="text-sm leading-relaxed text-justify mb-4">
              تأسست المنظمة بناءً على اتفاقية الكويت الإقليمية لعام 1978، وتضم في عضويتها الدول الثماني المطلة على المنطقة البحرية المشتركة، بهدف حمايتها من التلوث وتأمين ثرواتها الإيكولوجية ومصايدها السمكية للأجيال القادمة.
            </p>
            <p className="text-sm leading-relaxed text-justify">
              تعتبر هذه المنصة سجلاً أرشيفياً متكاملاً يرصد جميع المحطات والقرارات والبروتوكولات القانونية الصادرة من الأمانة العامة منذ عام 1978م وحتى عصرنا الحالي.
            </p>
          </div>
        )}
      </main>

      {/* 6. نافذة الـ Popup التفاعلية المجمعة لعرض السجلات التفصيلية الكبرى بدقة عند الضغط (Modal) */}
      {selectedActivityModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className={`border rounded-3xl p-6 max-w-xl w-full shadow-2xl relative ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-[#f5efe4] border-[#cbd4c5] text-[#3e2723]'}`}>
            <button onClick={() => setSelectedActivityModal(null)} className="absolute top-4 left-4 p-1.5 bg-[#8b4513] text-white rounded-full font-bold hover:bg-amber-900 transition-colors">✕</button>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-3xl font-mono font-black text-amber-800">{selectedActivityModal.year} م</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-800 text-white rounded shadow-sm">وثيقة أرشيفية معتمدة</span>
            </div>
            <h3 className="text-sm md:text-md font-black mb-3 border-b border-amber-900/10 pb-2 leading-relaxed text-amber-950">{selectedActivityModal.title}</h3>
            <div className="space-y-3 my-4 p-4 rounded-xl border border-[#dac9ad] bg-[#f1e6d2]/50 text-xs">
              <div>📌 <span class="font-bold">نوع السجل التوثيقي:</span> {selectedActivityModal.type}</div>
              <div>📂 <span class="font-bold">طبيعة الملف بالمكتبة:</span> {selectedActivityModal.docType}</div>
              <div>🗂️ <span class="font-bold">المرجع الأرشيفي:</span> {selectedActivityModal.libraryRef || "Hard Copy / تقرير رسمي"}</div>
              <div className="leading-relaxed text-justify pt-2 border-t border-amber-900/5">
                <span className="font-bold text-amber-950 block mb-1">📝 البيان التاريخي الفني الحقيقي:</span>
                {selectedActivityModal.desc}
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button onClick={() => setSelectedActivityModal(null)} className="px-6 py-2.5 bg-amber-850 text-white text-xs font-extrabold rounded-xl hover:bg-amber-900 transition-colors shadow-md">إغلاق وتأكيد المعاينة</button>
            </div>
          </div>
        </div>
      )}

      {/* تذييل المنصة الأصلي المتناسق */}
      <footer className={`border-t px-4 py-6 text-center text-xs transition-colors duration-500 ${darkMode ? 'border-slate-850 bg-slate-950 text-slate-400' : 'border-[#cfbe9f] bg-[#ebdcb9]/40 text-[#5d4037]'}`}>
        <p className="font-black">حقوق الطبع والنشر © 2026 محفوظة للمنصة الإقليمية لحماية البيئة البحرية (ROPME)</p>
        <p className="text-[10px] mt-1">جميع البيانات والخرائط والصور مستخلصة ومحققة بالكامل من التقارير الفنية للأمانة العامة لدول المنظمة.</p>
      </footer>
    </div>
  );
}