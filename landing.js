// ── i18n ──────────────────────────────────────────────────────────────────
const I18N = {
  en: {
    navFeatures:   "Features",
    navHow:        "How it works",
    navPricing:    "Pricing",
    navOpen:       "Open app",
    badge:         "4D / 5D Construction Viewer",
    heroTitle:     "Your construction<br>project — <em>in motion</em>",
    heroSub:       "Load a 3D model and schedule — and watch the building go up day by day. Gantt chart, cost curve and interactive 3D view in one window.",
    heroCta:       "Try for free",
    heroDemo:      "Watch demo",
    metaTrial:     "3 days free",
    metaPrice:     "€10 / month",
    metaNoInstall: "No install",
    stat3dLabel:   "Interactive model<br>on WebGL / Three.js",
    stat4dLabel:   "Timeline<br>and Gantt chart",
    stat5dLabel:   "Cost curve<br>by stage",
    statFbxLabel:  "Model support<br>from Revit, ArchiCAD, Navisworks",
    featTag:       "Features",
    featTitle:     "Everything you need<br>to control construction",
    featSub:       "One tool instead of three: 3D viewer, scheduling and finance.",
    feat1Title:    "Gantt Chart",
    feat1Text:     "All construction stages on one screen. Select a task — and the corresponding model elements highlight in 3D.",
    feat1Tag:      "Interactive",
    feat2Title:    "Cost Curve",
    feat2Text:     "Cumulative expenses by day. See where the plan diverges from reality.",
    feat3Title:    "Timeline",
    feat3Text:     "Rewind the project forward or back. Step from 1 day to any period.",
    feat4Title:    "3D Navigation",
    feat4Text:     "Rotate, zoom, pan. Click an element — see its task and cost.",
    feat5Title:    "Runs in the browser",
    feat5Text:     "No installation. Open the link and start working. Supports Chrome, Firefox, Edge. Data never leaves your computer.",
    feat5Tag:      "No install",
    feat6Title:    "Google Sign-In",
    feat6Text:     "One-click login. 3 days of free access right after sign-in — no card required.",
    feat6Tag:      "Free",
    howTag:        "How it works",
    howTitle:      "Three steps to<br>a live model",
    how1Title:     "Load the FBX model",
    how1Text:      "Export the 3D model from Revit, ArchiCAD or any BIM tool in FBX format. Each element must have a unique ID in its name.",
    how2Title:     "Add the CSV schedule",
    how2Text:      "A table with columns: element ID, task name, start date, end date, cost. Simple format — Excel or Google Sheets.",
    how3Title:     "Click Load and watch",
    how3Text:      "The app links the model to the schedule. Move the slider and watch the building rise, costs grow and the Gantt fill in.",
    pricingTag:    "Pricing",
    pricingTitle:  "Simple and honest",
    pricingSub:    "Start free, pay only when you need to.",
    trialName:     "Trial",
    trialPeriod:   "3 days free",
    trialF1:       "Full access to all features",
    trialF2:       "FBX + CSV unlimited",
    trialF3:       "3D, Gantt, costs",
    trialF4:       "Sign in with Google",
    trialCta:      "Start for free",
    proName:       "Pro",
    proPeriod:     "per month",
    proF1:         "Everything in Trial",
    proF2:         "Unlimited use",
    proF3:         "Payment via PayPal",
    proF4:         "Priority support",
    proCta:        "Get Pro",
    proBadge:      "Popular",
    ctaTitle:      "Ready to see your<br>project in motion?",
    ctaSub:        "Upload a model right now — no registration needed for the first run.",
    ctaOpen:       "Open app",
    footerApp:     "App",
  },
  de: {
    navFeatures:   "Funktionen",
    navHow:        "So funktioniert's",
    navPricing:    "Preise",
    navOpen:       "App öffnen",
    badge:         "4D / 5D Bau-Viewer",
    heroTitle:     "Ihr Bauprojekt —<br><em>in Bewegung</em>",
    heroSub:       "Laden Sie ein 3D-Modell und einen Zeitplan — und beobachten Sie, wie das Gebäude Tag für Tag entsteht. Gantt-Diagramm, Kostenkurve und interaktive 3D-Ansicht in einem Fenster.",
    heroCta:       "Kostenlos testen",
    heroDemo:      "Demo ansehen",
    metaTrial:     "3 Tage kostenlos",
    metaPrice:     "€10 / Monat",
    metaNoInstall: "Keine Installation",
    stat3dLabel:   "Interaktives Modell<br>mit WebGL / Three.js",
    stat4dLabel:   "Zeitachse<br>und Gantt-Diagramm",
    stat5dLabel:   "Kostenkurve<br>nach Bauabschnitt",
    statFbxLabel:  "Modellunterstützung<br>aus Revit, ArchiCAD, Navisworks",
    featTag:       "Funktionen",
    featTitle:     "Alles, was Sie für die<br>Baukontrolle brauchen",
    featSub:       "Ein Werkzeug statt drei: 3D-Viewer, Planung und Finanzen.",
    feat1Title:    "Gantt-Diagramm",
    feat1Text:     "Alle Bauphasen auf einem Bildschirm. Wählen Sie eine Aufgabe — die entsprechenden Modellelemente werden in 3D hervorgehoben.",
    feat1Tag:      "Interaktiv",
    feat2Title:    "Kostenkurve",
    feat2Text:     "Kumulierte Ausgaben nach Tag. Sehen Sie, wo der Plan von der Realität abweicht.",
    feat3Title:    "Zeitachse",
    feat3Text:     "Spulen Sie das Projekt vor oder zurück. Schrittweite von 1 Tag bis zu beliebigen Zeiträumen.",
    feat4Title:    "3D-Navigation",
    feat4Text:     "Drehen, zoomen, schwenken. Klicken Sie auf ein Element — sehen Sie seine Aufgabe und Kosten.",
    feat5Title:    "Läuft im Browser",
    feat5Text:     "Keine Installation. Link öffnen und sofort arbeiten. Unterstützt Chrome, Firefox, Edge. Daten verlassen Ihren Computer nicht.",
    feat5Tag:      "Keine Installation",
    feat6Title:    "Google-Anmeldung",
    feat6Text:     "Ein-Klick-Login. 3 Tage kostenloser Zugang direkt nach der Anmeldung — keine Karte erforderlich.",
    feat6Tag:      "Kostenlos",
    howTag:        "So funktioniert's",
    howTitle:      "Drei Schritte zum<br>lebendigen Modell",
    how1Title:     "FBX-Modell laden",
    how1Text:      "Exportieren Sie das 3D-Modell aus Revit, ArchiCAD oder einem anderen BIM-Tool im FBX-Format. Jedes Element muss eine eindeutige ID im Namen haben.",
    how2Title:     "CSV-Zeitplan hinzufügen",
    how2Text:      "Eine Tabelle mit Spalten: Element-ID, Aufgabenname, Startdatum, Enddatum, Kosten. Einfaches Format — Excel oder Google Sheets.",
    how3Title:     "Load klicken und zuschauen",
    how3Text:      "Die App verknüpft das Modell mit dem Zeitplan. Bewegen Sie den Schieberegler und beobachten Sie, wie das Gebäude entsteht.",
    pricingTag:    "Preise",
    pricingTitle:  "Einfach und fair",
    pricingSub:    "Kostenlos starten, nur zahlen wenn nötig.",
    trialName:     "Trial",
    trialPeriod:   "3 Tage kostenlos",
    trialF1:       "Vollzugriff auf alle Funktionen",
    trialF2:       "FBX + CSV unbegrenzt",
    trialF3:       "3D, Gantt, Kosten",
    trialF4:       "Mit Google anmelden",
    trialCta:      "Kostenlos starten",
    proName:       "Pro",
    proPeriod:     "pro Monat",
    proF1:         "Alles aus Trial",
    proF2:         "Unbegrenzte Nutzung",
    proF3:         "Zahlung per PayPal",
    proF4:         "Prioritätssupport",
    proCta:        "Pro holen",
    proBadge:      "Beliebt",
    ctaTitle:      "Bereit, Ihr Projekt<br>in Bewegung zu sehen?",
    ctaSub:        "Laden Sie jetzt ein Modell hoch — keine Registrierung für den ersten Start nötig.",
    ctaOpen:       "App öffnen",
    footerApp:     "App",
  },
  ru: {
    navFeatures:   "Возможности",
    navHow:        "Как работает",
    navPricing:    "Тарифы",
    navOpen:       "Открыть приложение",
    badge:         "4D / 5D просмотр строительства",
    heroTitle:     "Ваш строительный<br>проект — <em>в движении</em>",
    heroSub:       "Загрузите 3D-модель и расписание — и наблюдайте, как объект строится день за днём. График Ганта, кривая затрат и интерактивный 3D-вид в одном окне.",
    heroCta:       "Попробовать бесплатно",
    heroDemo:      "Смотреть демо",
    metaTrial:     "3 дня бесплатно",
    metaPrice:     "€10 / месяц",
    metaNoInstall: "Без установки",
    stat3dLabel:   "Интерактивная модель<br>на WebGL / Three.js",
    stat4dLabel:   "Временна́я шкала<br>и диаграмма Ганта",
    stat5dLabel:   "График затрат<br>по этапам",
    statFbxLabel:  "Поддержка моделей<br>из Revit, ArchiCAD, Navisworks",
    featTag:       "Возможности",
    featTitle:     "Всё, что нужно для<br>контроля строительства",
    featSub:       "Один инструмент вместо трёх: 3D-просмотр, планирование и финансы.",
    feat1Title:    "Диаграмма Ганта",
    feat1Text:     "Все этапы строительства на одном экране. Выберите задачу — и соответствующие элементы модели подсветятся в 3D.",
    feat1Tag:      "Интерактивная",
    feat2Title:    "Кривая затрат",
    feat2Text:     "Накопленные расходы по дням. Видите, где план расходится с фактом.",
    feat3Title:    "Временна́я шкала",
    feat3Text:     "Перемотайте проект вперёд или назад. Шаг — от 1 дня до любого периода.",
    feat4Title:    "3D-навигация",
    feat4Text:     "Вращение, масштаб, панорама. Кликните на элемент — увидите его задачу и стоимость.",
    feat5Title:    "Работает в браузере",
    feat5Text:     "Никакой установки. Откройте ссылку — и сразу работайте. Поддерживает Chrome, Firefox, Edge. Данные не покидают ваш компьютер.",
    feat5Tag:      "Без установки",
    feat6Title:    "Вход через Google",
    feat6Text:     "Авторизация за один клик. 3 дня бесплатного доступа сразу после входа — без карты.",
    feat6Tag:      "Бесплатно",
    howTag:        "Как работает",
    howTitle:      "Три шага до<br>живой модели",
    how1Title:     "Загрузите FBX-модель",
    how1Text:      "Экспортируйте 3D-модель из Revit, ArchiCAD или любого BIM-инструмента в формате FBX. Каждый элемент должен иметь уникальный ID в имени.",
    how2Title:     "Добавьте CSV-расписание",
    how2Text:      "Таблица с колонками: ID элемента, название задачи, дата начала, дата окончания, стоимость. Формат простой — Excel или Google Sheets.",
    how3Title:     "Нажмите Load и смотрите",
    how3Text:      "Приложение свяжет модель с расписанием. Двигайте ползунок — и наблюдайте, как строится объект, растут затраты и заполняется Гантт.",
    pricingTag:    "Тарифы",
    pricingTitle:  "Просто и честно",
    pricingSub:    "Начните бесплатно, платите только когда нужно.",
    trialName:     "Trial",
    trialPeriod:   "3 дня бесплатно",
    trialF1:       "Полный доступ ко всем функциям",
    trialF2:       "FBX + CSV без ограничений",
    trialF3:       "3D, Ганта, затраты",
    trialF4:       "Вход через Google",
    trialCta:      "Начать бесплатно",
    proName:       "Pro",
    proPeriod:     "в месяц",
    proF1:         "Всё из Trial",
    proF2:         "Неограниченное использование",
    proF3:         "Оплата через PayPal",
    proF4:         "Приоритетная поддержка",
    proCta:        "Подключить Pro",
    proBadge:      "Популярный",
    ctaTitle:      "Готовы увидеть свой<br>проект в движении?",
    ctaSub:        "Загрузите модель прямо сейчас — никакой регистрации для первого запуска не нужно.",
    ctaOpen:       "Открыть приложение",
    footerApp:     "Приложение",
  },
  uk: {
    navFeatures:   "Можливості",
    navHow:        "Як працює",
    navPricing:    "Тарифи",
    navOpen:       "Відкрити застосунок",
    badge:         "4D / 5D перегляд будівництва",
    heroTitle:     "Ваш будівельний<br>проєкт — <em>у русі</em>",
    heroSub:       "Завантажте 3D-модель і розклад — і спостерігайте, як об'єкт будується день за днем. Графік Ганта, крива витрат та інтерактивний 3D-вид в одному вікні.",
    heroCta:       "Спробувати безкоштовно",
    heroDemo:      "Дивитися демо",
    metaTrial:     "3 дні безкоштовно",
    metaPrice:     "€10 / місяць",
    metaNoInstall: "Без встановлення",
    stat3dLabel:   "Інтерактивна модель<br>на WebGL / Three.js",
    stat4dLabel:   "Часова шкала<br>і діаграма Ганта",
    stat5dLabel:   "Графік витрат<br>по етапах",
    statFbxLabel:  "Підтримка моделей<br>з Revit, ArchiCAD, Navisworks",
    featTag:       "Можливості",
    featTitle:     "Все, що потрібно для<br>контролю будівництва",
    featSub:       "Один інструмент замість трьох: 3D-перегляд, планування та фінанси.",
    feat1Title:    "Діаграма Ганта",
    feat1Text:     "Всі етапи будівництва на одному екрані. Оберіть задачу — і відповідні елементи моделі підсвітяться в 3D.",
    feat1Tag:      "Інтерактивна",
    feat2Title:    "Крива витрат",
    feat2Text:     "Накопичені витрати по днях. Бачите, де план розходиться з фактом.",
    feat3Title:    "Часова шкала",
    feat3Text:     "Перемотайте проєкт вперед або назад. Крок — від 1 дня до будь-якого періоду.",
    feat4Title:    "3D-навігація",
    feat4Text:     "Обертання, масштаб, панорама. Клікніть на елемент — побачите його задачу і вартість.",
    feat5Title:    "Працює у браузері",
    feat5Text:     "Жодного встановлення. Відкрийте посилання — і одразу працюйте. Підтримує Chrome, Firefox, Edge. Дані не залишають ваш комп'ютер.",
    feat5Tag:      "Без встановлення",
    feat6Title:    "Вхід через Google",
    feat6Text:     "Авторизація за один клік. 3 дні безкоштовного доступу одразу після входу — без картки.",
    feat6Tag:      "Безкоштовно",
    howTag:        "Як працює",
    howTitle:      "Три кроки до<br>живої моделі",
    how1Title:     "Завантажте FBX-модель",
    how1Text:      "Експортуйте 3D-модель з Revit, ArchiCAD або будь-якого BIM-інструменту у форматі FBX. Кожен елемент повинен мати унікальний ID у назві.",
    how2Title:     "Додайте CSV-розклад",
    how2Text:      "Таблиця з колонками: ID елемента, назва задачі, дата початку, дата закінчення, вартість. Простий формат — Excel або Google Sheets.",
    how3Title:     "Натисніть Load і дивіться",
    how3Text:      "Застосунок пов'яже модель з розкладом. Рухайте повзунок — і спостерігайте, як будується об'єкт, зростають витрати і заповнюється Гантт.",
    pricingTag:    "Тарифи",
    pricingTitle:  "Просто і чесно",
    pricingSub:    "Починайте безкоштовно, платіть лише коли потрібно.",
    trialName:     "Trial",
    trialPeriod:   "3 дні безкоштовно",
    trialF1:       "Повний доступ до всіх функцій",
    trialF2:       "FBX + CSV без обмежень",
    trialF3:       "3D, Ганта, витрати",
    trialF4:       "Вхід через Google",
    trialCta:      "Почати безкоштовно",
    proName:       "Pro",
    proPeriod:     "на місяць",
    proF1:         "Все з Trial",
    proF2:         "Необмежене використання",
    proF3:         "Оплата через PayPal",
    proF4:         "Пріоритетна підтримка",
    proCta:        "Підключити Pro",
    proBadge:      "Популярний",
    ctaTitle:      "Готові побачити свій<br>проєкт у русі?",
    ctaSub:        "Завантажте модель прямо зараз — жодної реєстрації для першого запуску не потрібно.",
    ctaOpen:       "Відкрити застосунок",
    footerApp:     "Застосунок",
  },
};

// ── language helpers ───────────────────────────────────────────────────────
function detectLang() {
  const stored = localStorage.getItem("app_lang");
  if (stored && I18N[stored]) return stored;
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return I18N[nav] ? nav : "en";
}

let currentLang = detectLang();

function t(key) {
  return (I18N[currentLang] || I18N.en)[key] || (I18N.en[key] || key);
}

// ── apply translations to DOM ──────────────────────────────────────────────
function applyTranslations() {
  document.documentElement.lang = currentLang;

  // helper: set innerHTML (allows <br> and <em>)
  const setHtml = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = t(key);
  };
  const setText = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  };

  setText("nav-features",    "navFeatures");
  setText("nav-how",         "navHow");
  setText("nav-pricing",     "navPricing");
  setText("nav-open",        "navOpen");
  setText("nav-open-mob",    "navOpen");

  setText("hero-badge",      "badge");
  setHtml("hero-title",      "heroTitle");
  setText("hero-sub",        "heroSub");
  setText("hero-cta",        "heroCta");
  setText("hero-demo",       "heroDemo");
  setText("meta-trial",      "metaTrial");
  setText("meta-price",      "metaPrice");
  setText("meta-noinstall",  "metaNoInstall");

  setHtml("stat-3d-label",   "stat3dLabel");
  setHtml("stat-4d-label",   "stat4dLabel");
  setHtml("stat-5d-label",   "stat5dLabel");
  setHtml("stat-fbx-label",  "statFbxLabel");

  setText("feat-tag",        "featTag");
  setHtml("feat-title",      "featTitle");
  setText("feat-sub",        "featSub");
  setText("feat1-title",     "feat1Title");
  setText("feat1-text",      "feat1Text");
  setText("feat1-tag",       "feat1Tag");
  setText("feat2-title",     "feat2Title");
  setText("feat2-text",      "feat2Text");
  setText("feat3-title",     "feat3Title");
  setText("feat3-text",      "feat3Text");
  setText("feat4-title",     "feat4Title");
  setText("feat4-text",      "feat4Text");
  setText("feat5-title",     "feat5Title");
  setText("feat5-text",      "feat5Text");
  setText("feat5-tag",       "feat5Tag");
  setText("feat6-title",     "feat6Title");
  setText("feat6-text",      "feat6Text");
  setText("feat6-tag",       "feat6Tag");

  setText("how-tag",         "howTag");
  setHtml("how-title",       "howTitle");
  setText("how1-title",      "how1Title");
  setText("how1-text",       "how1Text");
  setText("how2-title",      "how2Title");
  setText("how2-text",       "how2Text");
  setText("how3-title",      "how3Title");
  setText("how3-text",       "how3Text");

  setText("pricing-tag",     "pricingTag");
  setText("pricing-title",   "pricingTitle");
  setText("pricing-sub",     "pricingSub");
  setText("trial-name",      "trialName");
  setText("trial-period",    "trialPeriod");
  setText("trial-f1",        "trialF1");
  setText("trial-f2",        "trialF2");
  setText("trial-f3",        "trialF3");
  setText("trial-f4",        "trialF4");
  setText("trial-cta",       "trialCta");
  setText("pro-name",        "proName");
  setText("pro-period",      "proPeriod");
  setText("pro-f1",          "proF1");
  setText("pro-f2",          "proF2");
  setText("pro-f3",          "proF3");
  setText("pro-f4",          "proF4");
  setText("pro-cta",         "proCta");
  setText("pro-badge",       "proBadge");

  setHtml("cta-title",       "ctaTitle");
  setText("cta-sub",         "ctaSub");
  setText("cta-open",        "ctaOpen");

  setText("footer-app",      "footerApp");

  // sync switcher value
  const sel = document.getElementById("lang-select");
  if (sel) sel.value = currentLang;
}

function setLang(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  localStorage.setItem("app_lang", lang);
  applyTranslations();
}

// ── nav scroll ─────────────────────────────────────────────────────────────
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

// ── scroll reveal ──────────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".stat-card, .feature-card, .step, .pricing-card").forEach((el, i) => {
  el.classList.add("reveal");
  el.style.transitionDelay = `${(i % 4) * 60}ms`;
  observer.observe(el);
});

const revealStyle = document.createElement("style");
revealStyle.textContent = ".reveal{opacity:0;transform:translateY(20px);transition:opacity .45s ease,transform .45s ease}.reveal.visible{opacity:1;transform:none}";
document.head.appendChild(revealStyle);

// ── init ───────────────────────────────────────────────────────────────────

// Read ?lang= from URL and apply (useful for hreflang links)
(function () {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  if (urlLang && I18N[urlLang]) {
    currentLang = urlLang;
    localStorage.setItem('app_lang', urlLang);
  }
}());

applyTranslations();

// expose for inline onchange
window.setLang = setLang;

// ── font loading: hide text until Inter is ready, then fade in ─────────────
(function () {
  // Add loading class immediately — CSS will apply shimmer
  document.documentElement.classList.add('fonts-loading');

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      document.documentElement.classList.remove('fonts-loading');
      document.documentElement.classList.add('fonts-loaded');
    });
  } else {
    // Fallback: just remove after short delay
    setTimeout(() => {
      document.documentElement.classList.remove('fonts-loading');
      document.documentElement.classList.add('fonts-loaded');
    }, 800);
  }
}());

// ── backend warm-up: silent ping so the server is hot when user opens app ──
(function () {
  const BACKEND = 'https://app-12-5d-backend.dronov-dmitry-bim.workers.dev/api/config';
  try {
    fetch(BACKEND, { method: 'GET', cache: 'no-store', keepalive: true })
      .catch(() => {});
  } catch (_) {}
}());
