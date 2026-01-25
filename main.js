import * as THREE from "./vendor/three.module.js";
import { OrbitControls } from "./vendor/OrbitControls.js";
import { FBXLoader } from "./vendor/FBXLoader.js";
import { CONFIG } from "./config.js";

const dom = {
  fbxBtn: document.getElementById("fbxBtn"),
  fbxInput: document.getElementById("fbxInput"),
  fbxPath: document.getElementById("fbxPath"),
  csvBtn: document.getElementById("csvBtn"),
  csvInput: document.getElementById("csvInput"),
  csvPath: document.getElementById("csvPath"),
  loadBtn: document.getElementById("loadBtn"),
  downloadIdsBtn: document.getElementById("downloadIdsBtn"),
  authStatus: document.getElementById("authStatus"),
  accountMenuBtn: document.getElementById("accountMenuBtn"),
  accountMenu: document.getElementById("accountMenu"),
  menuUserLine: document.getElementById("menuUserLine"),
  signInBtn: document.getElementById("signInBtn"),
  logoutBtn: document.getElementById("logoutBtn"),
  paypalBtn: document.getElementById("paypalBtn"),
  languageLabel: document.getElementById("languageLabel"),
  languageSelect: document.getElementById("languageSelect"),
  accessBanner: document.getElementById("accessBanner"),
  serverStatusBanner: document.getElementById("serverStatusBanner"),
  adminPanel: document.getElementById("adminPanel"),
  adminTitle: document.getElementById("adminTitle"),
  adminUserInput: document.getElementById("adminUserInput"),
  adminRoleSelect: document.getElementById("adminRoleSelect"),
  adminRoleBtn: document.getElementById("adminRoleBtn"),
  adminListBtn: document.getElementById("adminListBtn"),
  adminListOutput: document.getElementById("adminListOutput"),
  playBtn: document.getElementById("playBtn"),
  stepInput: document.getElementById("stepInput"),
  stepLabel: document.getElementById("stepLabel"),
  dateLabelTitle: document.getElementById("dateLabelTitle"),
  selectedLabelTitle: document.getElementById("selectedLabelTitle"),
  stageCostLabelTitle: document.getElementById("stageCostLabelTitle"),
  dateLabel: document.getElementById("dateLabel"),
  selectedLabel: document.getElementById("selectedLabel"),
  stageCostLabel: document.getElementById("stageCostLabel"),
  timeline: document.getElementById("timeline"),
  rangeLabel: document.getElementById("rangeLabel"),
  ganttCanvas: document.getElementById("ganttCanvas"),
  costsCanvas: document.getElementById("costsCanvas"),
  ganttTitle: document.getElementById("ganttTitle"),
  costsTitle: document.getElementById("costsTitle"),
  viewTitle: document.getElementById("viewTitle"),
  viewer: document.getElementById("viewer"),
};

window.addEventListener("error", () => {
  const warning = document.getElementById("initWarning");
  if (warning) warning.classList.remove("hidden");
});

window.addEventListener("unhandledrejection", () => {
  const warning = document.getElementById("initWarning");
  if (warning) warning.classList.remove("hidden");
});

const state = {
  fbxFile: null,
  csvFile: null,
  fbxObject: null,
  meshes: [],
  idToMeshes: new Map(),
  tasks: [],
  tasksById: new Map(),
  ganttTasks: [],
  ganttIndex: new Map(),
  costSeries: [],
  projectStart: null,
  projectEnd: null,
  currentDate: null,
  isPlaying: false,
  timer: null,
  stepDays: 1,
  selectedMesh: null,
  selectedGanttTask: null,
  selectedGanttKey: "",
  selectedTaskMeshes: [],
  selectedTaskCost: 0,
  fbxIdsText: "",
  hasMatchedIds: true,
  auth: {
    token: "",
    user: null,
    config: null,
    access: null,
    googleReady: false,
    googleInitPromise: null,
    configError: "",
    serverAvailable: true,
  },
  locale: "en",
};

const I18N = {
  en: {
    account: "Account ▾",
    notSignedIn: "Not signed in",
    signIn: "Sign in with Google",
    signOut: "Sign out",
    language: "Language",
    fbxPlaceholder: "FBX file path",
    csvPlaceholder: "CSV file path",
    load: "Load",
    downloadIds: "Download FBX IDs",
    play: "Play",
    pause: "Pause",
    stepDays: "Step (days)",
    date: "Date:",
    selected: "Selected:",
    stageCost: "Stage cost:",
    gantt: "Gantt",
    costs: "Costs",
    view3d: "3D View",
    adminTools: "Admin tools",
    adminInputPlaceholder: "User email or Google ID",
    setRole: "Set role",
    loadUsers: "Load users",
    loadUsersFailed: "Failed to load users",
    loading: "Loading...",
    roleUpdated: "Role updated",
    authRequired: "Sign in first.",
    selectFiles: "Select both FBX and CSV files.",
    noFbxIds: "No FBX IDs to download yet.",
    serverCsvFailed: "Server CSV parsing failed.",
    serverUnreachable: "Server is not reachable. Falling back to local CSV parsing.",
    googleAuthFailed: "Google auth failed",
    googleAuthExpired: "Session expired. Please sign in again.",
    googleNotConfigured: "Google auth is not configured",
    googleNotAvailable: "Google auth is not available. Check network/adblock.",
    roleUpdatePrompt: "Enter user email or id and select role.",
    roleUpdateFailed: "Role update failed",
    missingFbxIds: "Missing FBX IDs: {ids}",
    noCsvMatch:
      "No CSV IDs matched the FBX. Showing all elements as completed.",
    payPalOrderFailed: "PayPal order failed",
    payPalApprovalMissing: "PayPal approval link not found",
    payPalCaptureFailed: "PayPal capture failed",
    payPalCompleted: "Payment completed.",
    trialInvite: "Sign in to start your 3-day free trial.",
    trialExpired: "Trial expired. Please subscribe for {price} {currency} / month.",
    upgradeButton: "Upgrade {price} {currency} / month",
    serverUnavailable:
      "Server is unavailable. The site works from 07:00 to 23:00 Berlin time.",
    berlinNow: "Berlin time now: {time}.",
  },
  de: {
    account: "Konto ▾",
    notSignedIn: "Nicht angemeldet",
    signIn: "Mit Google anmelden",
    signOut: "Abmelden",
    language: "Sprache",
    fbxPlaceholder: "FBX-Dateipfad",
    csvPlaceholder: "CSV-Dateipfad",
    load: "Laden",
    downloadIds: "FBX-IDs herunterladen",
    play: "Abspielen",
    pause: "Pause",
    stepDays: "Schritt (Tage)",
    date: "Datum:",
    selected: "Ausgewählt:",
    stageCost: "Stufenkosten:",
    gantt: "Gantt",
    costs: "Kosten",
    view3d: "3D-Ansicht",
    adminTools: "Admin-Werkzeuge",
    adminInputPlaceholder: "E-Mail oder Google-ID",
    setRole: "Rolle setzen",
    loadUsers: "Benutzer laden",
    loadUsersFailed: "Benutzer konnten nicht geladen werden",
    loading: "Laden...",
    roleUpdated: "Rolle aktualisiert",
    authRequired: "Bitte zuerst anmelden.",
    selectFiles: "Wähle FBX- und CSV-Datei.",
    noFbxIds: "Noch keine FBX-IDs zum Download.",
    serverCsvFailed: "CSV-Parsing auf dem Server fehlgeschlagen.",
    serverUnreachable:
      "Server nicht erreichbar. Lokales CSV-Parsing wird verwendet.",
    googleAuthFailed: "Google-Authentifizierung fehlgeschlagen",
    googleAuthExpired: "Sitzung abgelaufen. Bitte erneut anmelden.",
    googleNotConfigured: "Google-Authentifizierung ist nicht konfiguriert",
    googleNotAvailable:
      "Google-Authentifizierung ist nicht verfügbar. Netzwerk/Adblock prüfen.",
    roleUpdatePrompt: "E-Mail/ID eingeben und Rolle wählen.",
    roleUpdateFailed: "Rollen-Update fehlgeschlagen",
    missingFbxIds: "Fehlende FBX-IDs: {ids}",
    noCsvMatch:
      "Keine CSV-IDs passen zum FBX. Alle Elemente als abgeschlossen.",
    payPalOrderFailed: "PayPal-Bestellung fehlgeschlagen",
    payPalApprovalMissing: "PayPal-Freigabelink nicht gefunden",
    payPalCaptureFailed: "PayPal-Zahlung fehlgeschlagen",
    payPalCompleted: "Zahlung abgeschlossen.",
    trialInvite: "Melde dich an, um die 3-Tage-Testphase zu starten.",
    trialExpired:
      "Testzeit abgelaufen. Bitte {price} {currency} / Monat abonnieren.",
    upgradeButton: "Upgrade {price} {currency} / Monat",
    serverUnavailable:
      "Server nicht erreichbar. Die Seite läuft von 07:00 bis 23:00 (Berlin).",
    berlinNow: "Berliner Zeit: {time}.",
  },
  ru: {
    account: "Аккаунт ▾",
    notSignedIn: "Не выполнен вход",
    signIn: "Войти через Google",
    signOut: "Выйти",
    language: "Язык",
    fbxPlaceholder: "Путь к FBX",
    csvPlaceholder: "Путь к CSV",
    load: "Загрузить",
    downloadIds: "Скачать FBX IDs",
    play: "Старт",
    pause: "Пауза",
    stepDays: "Шаг (дни)",
    date: "Дата:",
    selected: "Выбрано:",
    stageCost: "Стоимость этапа:",
    gantt: "Гантт",
    costs: "Затраты",
    view3d: "3D вид",
    adminTools: "Админ-инструменты",
    adminInputPlaceholder: "Email пользователя или Google ID",
    setRole: "Установить роль",
    loadUsers: "Загрузить пользователей",
    loadUsersFailed: "Не удалось загрузить пользователей",
    loading: "Загрузка...",
    roleUpdated: "Роль обновлена",
    authRequired: "Сначала выполните вход.",
    selectFiles: "Выберите FBX и CSV файлы.",
    noFbxIds: "Нет FBX IDs для скачивания.",
    serverCsvFailed: "Разбор CSV на сервере не удался.",
    serverUnreachable:
      "Сервер недоступен. Используется локальный разбор CSV.",
    googleAuthFailed: "Ошибка авторизации Google",
    googleAuthExpired: "Сессия истекла. Войдите снова.",
    googleNotConfigured: "Google авторизация не настроена",
    googleNotAvailable:
      "Google авторизация недоступна. Проверь сеть/AdBlock.",
    roleUpdatePrompt: "Введите email/ID и выберите роль.",
    roleUpdateFailed: "Не удалось обновить роль",
    missingFbxIds: "Отсутствуют FBX IDs: {ids}",
    noCsvMatch:
      "ID из CSV не совпали с FBX. Показываю все элементы как завершенные.",
    payPalOrderFailed: "Ошибка создания заказа PayPal",
    payPalApprovalMissing: "Ссылка PayPal не найдена",
    payPalCaptureFailed: "Ошибка оплаты PayPal",
    payPalCompleted: "Платеж завершен.",
    trialInvite: "Войдите, чтобы начать бесплатные 3 дня.",
    trialExpired:
      "Пробный период закончился. Подписка {price} {currency} / месяц.",
    upgradeButton: "Подписка {price} {currency} / месяц",
    serverUnavailable:
      "Сервер недоступен. Сайт работает с 7:00 до 23:00 по Берлину.",
    berlinNow: "Сейчас в Берлине: {time}.",
  },
  uk: {
    account: "Акаунт ▾",
    notSignedIn: "Вхід не виконано",
    signIn: "Увійти через Google",
    signOut: "Вийти",
    language: "Мова",
    fbxPlaceholder: "Шлях до FBX",
    csvPlaceholder: "Шлях до CSV",
    load: "Завантажити",
    downloadIds: "Завантажити FBX IDs",
    play: "Старт",
    pause: "Пауза",
    stepDays: "Крок (дні)",
    date: "Дата:",
    selected: "Вибрано:",
    stageCost: "Вартість етапу:",
    gantt: "Гантт",
    costs: "Витрати",
    view3d: "3D вигляд",
    adminTools: "Адмін-інструменти",
    adminInputPlaceholder: "Email користувача або Google ID",
    setRole: "Встановити роль",
    loadUsers: "Завантажити користувачів",
    loadUsersFailed: "Не вдалося завантажити користувачів",
    loading: "Завантаження...",
    roleUpdated: "Роль оновлено",
    authRequired: "Спочатку увійдіть.",
    selectFiles: "Оберіть FBX та CSV файли.",
    noFbxIds: "Немає FBX IDs для завантаження.",
    serverCsvFailed: "Розбір CSV на сервері не вдався.",
    serverUnreachable:
      "Сервер недоступний. Використовується локальний розбір CSV.",
    googleAuthFailed: "Помилка авторизації Google",
    googleAuthExpired: "Сесія закінчилась. Увійдіть знову.",
    googleNotConfigured: "Google авторизацію не налаштовано",
    googleNotAvailable:
      "Google авторизація недоступна. Перевірте мережу/AdBlock.",
    roleUpdatePrompt: "Введіть email/ID і виберіть роль.",
    roleUpdateFailed: "Не вдалося оновити роль",
    missingFbxIds: "Відсутні FBX IDs: {ids}",
    noCsvMatch:
      "ID з CSV не збіглися з FBX. Показую всі елементи як завершені.",
    payPalOrderFailed: "Помилка створення PayPal замовлення",
    payPalApprovalMissing: "Посилання PayPal не знайдено",
    payPalCaptureFailed: "Помилка оплати PayPal",
    payPalCompleted: "Оплату завершено.",
    trialInvite: "Увійдіть, щоб почати 3 дні безкоштовно.",
    trialExpired:
      "Пробний період завершено. Підписка {price} {currency} / місяць.",
    upgradeButton: "Підписка {price} {currency} / місяць",
    serverUnavailable:
      "Сервер недоступний. Сайт працює з 7:00 до 23:00 за Берліном.",
    berlinNow: "Зараз у Берліні: {time}.",
  },
};

function t(key, vars = {}) {
  const lang = state.locale || "en";
  const dict = I18N[lang] || I18N.en;
  const template = dict[key] || I18N.en[key] || key;
  return template.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "");
}

function detectLanguage() {
  const stored = localStorage.getItem("app_lang");
  if (stored && I18N[stored]) return stored;
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return I18N[nav] ? nav : "en";
}

function setLanguage(lang) {
  state.locale = I18N[lang] ? lang : "en";
  localStorage.setItem("app_lang", state.locale);
  if (dom.languageSelect) {
    dom.languageSelect.value = state.locale;
  }
  applyTranslations();
}

function applyTranslations() {
  if (dom.accountMenuBtn) dom.accountMenuBtn.textContent = t("account");
  if (dom.menuUserLine && !state.auth.user) {
    dom.menuUserLine.textContent = t("notSignedIn");
  }
  if (dom.authStatus && !state.auth.user) {
    dom.authStatus.textContent = t("notSignedIn");
  }
  if (dom.signInBtn) dom.signInBtn.textContent = t("signIn");
  if (dom.logoutBtn) dom.logoutBtn.textContent = t("signOut");
  if (dom.languageLabel) dom.languageLabel.textContent = t("language");
  if (dom.fbxPath) dom.fbxPath.placeholder = t("fbxPlaceholder");
  if (dom.csvPath) dom.csvPath.placeholder = t("csvPlaceholder");
  if (dom.loadBtn) dom.loadBtn.textContent = t("load");
  if (dom.downloadIdsBtn) dom.downloadIdsBtn.textContent = t("downloadIds");
  if (dom.stepLabel) dom.stepLabel.textContent = t("stepDays");
  if (dom.dateLabelTitle) dom.dateLabelTitle.textContent = t("date");
  if (dom.selectedLabelTitle) dom.selectedLabelTitle.textContent = t("selected");
  if (dom.stageCostLabelTitle)
    dom.stageCostLabelTitle.textContent = t("stageCost");
  if (dom.ganttTitle) dom.ganttTitle.textContent = t("gantt");
  if (dom.costsTitle) dom.costsTitle.textContent = t("costs");
  if (dom.viewTitle) dom.viewTitle.textContent = t("view3d");
  if (dom.adminTitle) dom.adminTitle.textContent = t("adminTools");
  if (dom.adminRoleBtn) dom.adminRoleBtn.textContent = t("setRole");
  if (dom.adminListBtn) dom.adminListBtn.textContent = t("loadUsers");
  if (dom.adminUserInput)
    dom.adminUserInput.placeholder = t("adminInputPlaceholder");
  if (state.isPlaying && dom.playBtn) dom.playBtn.textContent = t("pause");
  if (!state.isPlaying && dom.playBtn) dom.playBtn.textContent = t("play");
  updateAccessUi();
  updateServerStatusBanner();
}

initConfig();
initAuth();
setLanguage(detectLanguage());

const renderer = new THREE.WebGLRenderer({
  antialias: CONFIG.viewer.antialias,
  preserveDrawingBuffer: CONFIG.viewer.preserveDrawingBuffer,
});
renderer.setPixelRatio(window.devicePixelRatio || 1);
dom.viewer.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(CONFIG.viewer.backgroundColor);

const camera = new THREE.PerspectiveCamera(
  CONFIG.camera.fov,
  1,
  CONFIG.camera.near,
  CONFIG.camera.far
);
camera.position.set(
  CONFIG.camera.position.x,
  CONFIG.camera.position.y,
  CONFIG.camera.position.z
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = CONFIG.controls.enableDamping;

scene.add(
  new THREE.AmbientLight(
    CONFIG.lights.ambient.color,
    CONFIG.lights.ambient.intensity
  )
);
const dirLight = new THREE.DirectionalLight(
  CONFIG.lights.directional.color,
  CONFIG.lights.directional.intensity
);
dirLight.position.set(
  CONFIG.lights.directional.position.x,
  CONFIG.lights.directional.position.y,
  CONFIG.lights.directional.position.z
);
scene.add(dirLight);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function resizeAll() {
  const { clientWidth, clientHeight } = dom.viewer;
  renderer.setSize(clientWidth, clientHeight);
  camera.aspect = clientWidth / Math.max(1, clientHeight);
  camera.updateProjectionMatrix();
  resizeCanvas(dom.ganttCanvas);
  resizeCanvas(dom.costsCanvas);
  drawGantt();
  drawCosts();
}

function resizeCanvas(canvas) {
  const { clientWidth, clientHeight } = canvas;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(clientWidth * ratio));
  canvas.height = Math.max(1, Math.floor(clientHeight * ratio));
}

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
resizeAll();
window.addEventListener("resize", resizeAll);

async function initConfig() {
  const isDebug = await loadDebugFlag();
  dom.downloadIdsBtn.style.display = isDebug ? "inline-block" : "none";
}

async function loadDebugFlag() {
  try {
    const response = await fetch(staticUrl("settings.txt"), {
      cache: "no-store",
    });
    if (!response.ok) return false;
    const text = await response.text();
    const value = parseSetting(text, "isDebug");
    return value === "true" || value === "1" || value === "yes";
  } catch (error) {
    return false;
  }
}

function parseSetting(text, key) {
  const lines = String(text || "").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [name, rawValue] = trimmed.split("=");
    if (!name || !rawValue) continue;
    if (name.trim().toLowerCase() === key.toLowerCase()) {
      return rawValue.trim().toLowerCase();
    }
  }
  return "";
}

function apiUrl(pathname) {
  const base = CONFIG.api?.baseUrl || CONFIG.apiBase || "";
  if (!base) return pathname;
  if (base.endsWith("/") && pathname.startsWith("/")) {
    return `${base.slice(0, -1)}${pathname}`;
  }
  if (!base.endsWith("/") && !pathname.startsWith("/")) {
    return `${base}/${pathname}`;
  }
  return `${base}${pathname}`;
}

function staticUrl(pathname) {
  const current = window.location.pathname;
  const basePath = current.endsWith("/")
    ? current
    : current.slice(0, current.lastIndexOf("/") + 1);
  return `${basePath}${pathname}`;
}

async function initAuth() {
  const config = await fetchConfig();
  state.auth.config = config;
  setupGoogleAuthMenu(config?.googleClientId);
  attachAuthHandlers();
  await restoreAuthSession();
  await handlePaypalReturn();
  updateAuthUi();
  scheduleServerCheck();
}

async function fetchConfig() {
  try {
    const response = await fetch(apiUrl("/api/config"), { cache: "no-store" });
    if (!response.ok) {
      state.auth.configError = `HTTP ${response.status}`;
      state.auth.serverAvailable = false;
      updateServerStatusBanner();
      return {};
    }
    state.auth.configError = "";
    state.auth.serverAvailable = true;
    updateServerStatusBanner();
    return await response.json();
  } catch (error) {
    state.auth.configError = "Fetch failed";
    state.auth.serverAvailable = false;
    updateServerStatusBanner();
    return {};
  }
}

function setupGoogleAuthMenu(clientId) {
  state.auth.googleReady = false;
  if (!clientId) return;
  ensureGoogleReady(clientId);
}

function loadGoogleScript() {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (state.auth.googleInitPromise) return state.auth.googleInitPromise;
  state.auth.googleInitPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );
    if (existing) {
      const check = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(check);
          resolve();
        }
      }, 200);
      setTimeout(() => {
        clearInterval(check);
        if (!window.google?.accounts?.id) reject(new Error("Google script load timeout"));
      }, 6000);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google script failed to load"));
    document.head.appendChild(script);
  });
  return state.auth.googleInitPromise;
}

async function ensureGoogleReady(clientId) {
  if (!clientId) return false;
  try {
    await loadGoogleScript();
    if (!window.google?.accounts?.id) return false;
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleCredential,
    });
    state.auth.googleReady = true;
    return true;
  } catch (error) {
    state.auth.googleReady = false;
    return false;
  }
}

function attachAuthHandlers() {
  if (dom.accountMenuBtn && dom.accountMenu) {
    dom.accountMenuBtn.addEventListener("click", () => {
      dom.accountMenu.classList.toggle("hidden");
    });
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!dom.accountMenu.contains(target) && target !== dom.accountMenuBtn) {
        dom.accountMenu.classList.add("hidden");
      }
    });
  }
  if (dom.signInBtn) {
    dom.signInBtn.addEventListener("click", async () => {
      let clientId = state.auth.config?.googleClientId;
      if (!clientId) {
        const latest = await fetchConfig();
        state.auth.config = latest;
        clientId = latest?.googleClientId;
      }
      if (!clientId) {
        const hint = state.auth.configError
          ? ` (${state.auth.configError})`
          : "";
        alert(`${t("googleNotConfigured")}${hint}.`);
        return;
      }
      const ready =
        state.auth.googleReady || (await ensureGoogleReady(clientId));
      if (!ready) {
        alert(t("googleNotAvailable"));
        return;
      }
      window.google?.accounts?.id?.prompt?.();
    });
  }
  if (dom.languageSelect) {
    dom.languageSelect.addEventListener("change", (event) => {
      setLanguage(event.target.value);
    });
  }
  if (dom.logoutBtn) {
    dom.logoutBtn.addEventListener("click", () => {
      clearAuthSession();
    });
  }
  if (dom.paypalBtn) {
    dom.paypalBtn.addEventListener("click", async () => {
      await startPaypalCheckout();
    });
  }
  if (dom.adminRoleBtn) {
    dom.adminRoleBtn.addEventListener("click", async () => {
      await setUserRoleFromUi();
    });
  }
  if (dom.adminListBtn) {
    dom.adminListBtn.addEventListener("click", async () => {
      await loadUserList();
    });
  }
}

async function handleGoogleCredential(response) {
  const credential = response?.credential;
  if (!credential) return;
  await exchangeGoogleCredential(credential);
}

async function exchangeGoogleCredential(credential, options = {}) {
  const silent = options.silent === true;
  try {
    const response = await fetch(apiUrl("/api/auth/google"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential }),
    });
    const payload = await response.json();
    if (!response.ok) {
      if (silent) {
        clearAuthSession();
        return;
      }
      const rawError = String(payload.error || "");
      if (rawError.toLowerCase().includes("token used too late")) {
        alert(t("googleAuthExpired"));
      } else {
        alert(t("googleAuthFailed"));
      }
      if (rawError) {
        console.warn("Google auth error:", rawError);
      }
      return;
    }
    setAuthSession(credential, payload.user);
    await refreshMe();
  } catch (error) {
    if (!silent) {
      alert(t("googleAuthFailed"));
    }
  }
}

function setAuthSession(token, user) {
  state.auth.token = token;
  state.auth.user = user || null;
  if (token) {
    localStorage.setItem("id_token", token);
  }
  if (user) {
    localStorage.setItem("user_profile", JSON.stringify(user));
  }
  updateAuthUi();
  const pendingSubscription = localStorage.getItem(
    "paypal_pending_subscription"
  );
  if (pendingSubscription && token) {
    capturePaypalSubscription(pendingSubscription);
  }
}

function clearAuthSession() {
  state.auth.token = "";
  state.auth.user = null;
  state.auth.access = null;
  localStorage.removeItem("id_token");
  localStorage.removeItem("user_profile");
  updateAuthUi();
}

async function restoreAuthSession() {
  const token = localStorage.getItem("id_token") || "";
  if (!token) return;
  await exchangeGoogleCredential(token, { silent: true });
}

async function refreshMe() {
  if (!state.auth.token) return;
  try {
    const response = await apiFetch("/api/me");
    const payload = await response.json();
    if (!response.ok) {
      return;
    }
    state.auth.user = payload.user || state.auth.user;
    state.auth.access = payload.access || null;
    localStorage.setItem("user_profile", JSON.stringify(state.auth.user));
    updateAuthUi();
  } catch (error) {
    // ignore
  }
}

function updateAuthUi() {
  const user = state.auth.user;
  if (dom.authStatus) {
    dom.authStatus.textContent = user
      ? `${user.name || user.email || "User"} (${user.role || "user"})`
      : t("notSignedIn");
  }
  if (dom.menuUserLine) {
    dom.menuUserLine.textContent = user
      ? `${user.name || user.email || "User"} (${user.role || "user"})`
      : t("notSignedIn");
  }
  if (dom.signInBtn) {
    dom.signInBtn.classList.toggle("hidden", !!user);
  }
  if (dom.logoutBtn) {
    dom.logoutBtn.classList.toggle("hidden", !user);
  }
  if (dom.paypalBtn) {
    const canUpgrade =
      user && !["admin", "paid", "free"].includes(user.role || "");
    dom.paypalBtn.classList.toggle("hidden", !canUpgrade);
    const price = state.auth.config?.paypalPrice ?? 10;
    const currency = state.auth.config?.paypalCurrency ?? "EUR";
    dom.paypalBtn.textContent = t("upgradeButton", { price, currency });
  }
  if (dom.adminPanel) {
    const isAdmin = user && user.role === "admin";
    dom.adminPanel.classList.toggle("hidden", !isAdmin);
  }
  updateAccessUi();
  updateServerStatusBanner();
}

function updateAccessUi() {
  const user = state.auth.user;
  const access = state.auth.access;
  const hasAccess = access?.hasAccess || false;
  if (dom.loadBtn) {
    dom.loadBtn.disabled = !user || !hasAccess;
  }
  if (!dom.accessBanner) return;
  if (!user) {
    dom.accessBanner.textContent = t("trialInvite");
    dom.accessBanner.classList.remove("hidden");
    return;
  }
  if (hasAccess) {
    dom.accessBanner.classList.add("hidden");
    return;
  }
  const price = state.auth.config?.paypalPrice ?? 10;
  const currency = state.auth.config?.paypalCurrency ?? "EUR";
  dom.accessBanner.textContent = t("trialExpired", { price, currency });
  dom.accessBanner.classList.remove("hidden");
}

function scheduleServerCheck() {
  setInterval(async () => {
    if (state.auth.serverAvailable) return;
    const latest = await fetchConfig();
    if (latest?.googleClientId) {
      state.auth.config = latest;
    }
  }, 60000);
}

function getBerlinTimeString() {
  try {
    const formatter = new Intl.DateTimeFormat("de-DE", {
      timeZone: "Europe/Berlin",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    return formatter.format(new Date());
  } catch (error) {
    return "";
  }
}

function updateServerStatusBanner() {
  if (!dom.serverStatusBanner) return;
  if (state.auth.serverAvailable) {
    dom.serverStatusBanner.classList.add("hidden");
    return;
  }
  const nowBerlin = getBerlinTimeString();
  const timeSuffix = nowBerlin ? ` ${t("berlinNow", { time: nowBerlin })}` : "";
  dom.serverStatusBanner.textContent = `${t("serverUnavailable")}${timeSuffix}`;
  dom.serverStatusBanner.classList.remove("hidden");
}

async function apiFetch(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (state.auth.token) {
    headers.Authorization = `Bearer ${state.auth.token}`;
  }
  const response = await fetch(apiUrl(path), { ...options, headers });
  return response;
}

async function loadUserList() {
  if (!dom.adminListOutput) return;
  dom.adminListOutput.textContent = t("loading");
  try {
    const response = await apiFetch("/api/users");
    const payload = await response.json();
    if (!response.ok) {
      dom.adminListOutput.textContent =
        payload.error || t("loadUsersFailed");
      return;
    }
    dom.adminListOutput.textContent = JSON.stringify(payload.users, null, 2);
  } catch (error) {
    dom.adminListOutput.textContent = t("loadUsersFailed");
  }
}

async function setUserRoleFromUi() {
  const input = dom.adminUserInput?.value?.trim() || "";
  const role = dom.adminRoleSelect?.value || "";
  if (!input || !role) {
    alert(t("roleUpdatePrompt"));
    return;
  }
  const body = input.includes("@")
    ? { email: input, role }
    : { userId: input, role };
  try {
    const response = await apiFetch("/api/users/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = await response.json();
    if (!response.ok) {
      alert(payload.error || t("roleUpdateFailed"));
      return;
    }
    alert(t("roleUpdated"));
    await loadUserList();
  } catch (error) {
    alert(t("roleUpdateFailed"));
  }
}

async function startPaypalCheckout() {
  if (!state.auth.token) {
    alert(t("authRequired"));
    return;
  }
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("paypal_sub", "1");
  const cancelUrl = new URL(window.location.href);
  cancelUrl.searchParams.set("paypal_cancel", "1");
  try {
    const response = await apiFetch("/api/paypal/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        returnUrl: currentUrl.toString(),
        cancelUrl: cancelUrl.toString(),
      }),
    });
    const payload = await response.json();
    if (!response.ok) {
      alert(payload.error || t("payPalOrderFailed"));
      return;
    }
    const approveLink = payload.subscription?.links?.find(
      (link) => link.rel === "approve"
    );
    if (!approveLink?.href) {
      alert(t("payPalApprovalMissing"));
      return;
    }
    window.location.href = approveLink.href;
  } catch (error) {
    alert(t("payPalOrderFailed"));
  }
}

async function handlePaypalReturn() {
  const params = new URLSearchParams(window.location.search);
  const subscriptionId = params.get("subscription_id");
  if (!subscriptionId) return;
  localStorage.setItem("paypal_pending_subscription", subscriptionId);
  if (!state.auth.token) {
    return;
  }
  await capturePaypalSubscription(subscriptionId);
  await refreshMe();
}

async function capturePaypalSubscription(subscriptionId) {
  try {
    const response = await apiFetch(
      `/api/paypal/subscription/${encodeURIComponent(subscriptionId)}`
    );
    const payload = await response.json();
    if (!response.ok) {
      alert(payload.error || t("payPalCaptureFailed"));
      return;
    }
    localStorage.removeItem("paypal_pending_subscription");
    await refreshMe();
    alert(t("payPalCompleted"));
  } catch (error) {
    alert(t("payPalCaptureFailed"));
  }
}

dom.fbxInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  state.fbxFile = file || null;
  dom.fbxPath.value = file ? file.name : "";
});

dom.csvInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  state.csvFile = file || null;
  dom.csvPath.value = file ? file.name : "";
});

dom.stepInput.addEventListener("change", () => {
  const value = Number.parseInt(dom.stepInput.value, 10);
  state.stepDays = Number.isFinite(value) && value > 0 ? value : 1;
  dom.stepInput.value = state.stepDays;
});

dom.timeline.addEventListener("input", () => {
  if (!state.projectStart) return;
  const offset = Number.parseInt(dom.timeline.value, 10);
  state.currentDate = addDays(state.projectStart, offset);
  updateViews();
});

dom.playBtn.addEventListener("click", () => {
  if (!state.projectStart || !state.projectEnd) return;
  state.isPlaying = !state.isPlaying;
  dom.playBtn.textContent = state.isPlaying ? t("pause") : t("play");
  if (state.isPlaying) {
    startPlayback();
  } else {
    stopPlayback();
  }
});

dom.loadBtn.addEventListener("click", async () => {
  if (!state.fbxFile || !state.csvFile) {
    alert(t("selectFiles"));
    return;
  }
  await loadAll();
});

dom.downloadIdsBtn.addEventListener("click", () => {
  if (!state.fbxIdsText) {
    alert(t("noFbxIds"));
    return;
  }
  const blob = new Blob([state.fbxIdsText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "App_12_5D_fbx_ids.txt";
  link.click();
  URL.revokeObjectURL(url);
});

renderer.domElement.addEventListener("click", (event) => {
  if (!state.meshes.length) return;
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  selectMeshAtMouse();
});

dom.ganttCanvas.addEventListener("click", (event) => {
  if (!state.ganttTasks.length) return;
  const task = getGanttTaskAtPoint(event);
  if (!task) {
    clearGanttSelection();
    updateViews();
    return;
  }
  selectGanttTask(task);
});

async function loadAll() {
  stopPlayback();
  dom.playBtn.textContent = t("play");
  state.isPlaying = false;
  const [csvText, fbxObject] = await Promise.all([
    readFileAsText(state.csvFile),
    loadFbx(state.fbxFile),
  ]);
  const schedule = await fetchSchedule(csvText);
  if (schedule) {
    applySchedule(schedule);
  } else {
    const parsed = parseCsv(csvText);
    applyCsv(parsed);
  }
  applyFbx(fbxObject);
  setupTimeline();
  updateViews();
}

async function fetchSchedule(csvText) {
  try {
    const response = await fetch(apiUrl("/api/parse-csv"), {
      method: "POST",
      headers: { "Content-Type": "text/csv" },
      body: csvText,
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      alert(payload.error || t("serverCsvFailed"));
      return null;
    }
    return await response.json();
  } catch (error) {
    alert(t("serverUnreachable"));
    return null;
  }
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

function loadFbx(file) {
  return new Promise((resolve, reject) => {
    const loader = new FBXLoader();
    const url = URL.createObjectURL(file);
    loader.load(
      url,
      (object) => {
        URL.revokeObjectURL(url);
        resolve(object);
      },
      undefined,
      (error) => {
        URL.revokeObjectURL(url);
        reject(error);
      }
    );
  });
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/);
  const delimiters = [",", ";", "\t"];
  let headerIndex = -1;
  let delimiter = ",";
  let header = [];

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    if (!raw || !raw.trim()) continue;
    for (const candidate of delimiters) {
      const cols = parseCsvLine(raw, candidate);
      const upper = cols.map((value) => value.trim().toUpperCase());
      if (upper.includes("START") && upper.includes("END")) {
        headerIndex = i;
        delimiter = candidate;
        header = cols;
        break;
      }
    }
    if (headerIndex >= 0) break;
  }

  if (headerIndex < 0) {
    throw new Error("CSV header not found (missing START/END).");
  }

  const headerMap = new Map(
    header.map((value, index) => [value.trim().toUpperCase(), index])
  );
  const rows = [];

  for (let i = headerIndex + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line || !line.trim()) continue;
    const cols = parseCsvLine(line, delimiter);
    const row = (name) => {
      const index = headerMap.get(name);
      return index === undefined ? "" : cols[index] || "";
    };
    const start = parseDate(row("START"));
    const end = parseDate(row("END"));
    if (!start || !end) continue;
    rows.push({
      id: normalizeId(row("ID")),
      buildCode: row("BUILD_CODE").trim(),
      workType: row("WORK_TYPE").trim(),
      start,
      end,
      cost: parseNumber(row("COST")),
    });
  }

  return rows;
}

function parseCsvLine(line, delimiter) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function parseDate(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  const parts = raw.split(/[.\-\/]/).map((part) => part.trim());
  if (parts.length === 3) {
    const [a, b, c] = parts;
    if (a.length === 4) {
      const year = Number.parseInt(a, 10);
      const month = Number.parseInt(b, 10) - 1;
      const day = Number.parseInt(c, 10);
      return safeDate(year, month, day);
    }
    const day = Number.parseInt(a, 10);
    const month = Number.parseInt(b, 10) - 1;
    const year = Number.parseInt(c, 10);
    return safeDate(year, month, day);
  }
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function safeDate(year, month, day) {
  const date = new Date(year, month, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseNumber(value) {
  const num = Number.parseFloat(String(value || "").replace(",", "."));
  return Number.isFinite(num) ? num : 0;
}

function normalizeId(value) {
  if (!value) return "";
  const raw = String(value).trim();
  return raw.endsWith(".0") ? raw.slice(0, -2) : raw;
}

function applyCsv(rows) {
  state.tasks = rows;
  state.tasksById = new Map();
  state.ganttTasks = [];
  state.costSeries = [];

  let minDate = null;
  let maxDate = null;
  const ganttKeySet = new Set();

  for (const task of rows) {
    minDate = minDate ? new Date(Math.min(minDate, task.start)) : task.start;
    maxDate = maxDate ? new Date(Math.max(maxDate, task.end)) : task.end;

    if (task.id) {
      const existing = state.tasksById.get(task.id) || [];
      existing.push(task);
      state.tasksById.set(task.id, existing);
    }

    const key = `${task.buildCode}|${task.workType}|${task.start.toISOString()}|${task.end.toISOString()}`;
    if (!ganttKeySet.has(key)) {
      ganttKeySet.add(key);
      state.ganttTasks.push(task);
    }
  }

  state.projectStart = minDate;
  state.projectEnd = maxDate;
  state.currentDate = minDate;
  buildCostSeries();
  buildGanttIndex();
  clearGanttSelection();
}

function applySchedule(payload) {
  const tasks = (payload.tasks || []).map((task) => ({
    ...task,
    start: new Date(task.startMs),
    end: new Date(task.endMs),
  }));
  state.tasks = tasks;
  state.tasksById = new Map();
  for (const task of tasks) {
    if (!task.id) continue;
    const list = state.tasksById.get(task.id) || [];
    list.push(task);
    state.tasksById.set(task.id, list);
  }

  state.ganttTasks = (payload.ganttTasks || []).map((task) => ({
    ...task,
    start: new Date(task.startMs),
    end: new Date(task.endMs),
  }));

  state.costSeries = payload.costSeries || [];
  state.projectStart = payload.projectStart
    ? new Date(payload.projectStart)
    : null;
  state.projectEnd = payload.projectEnd ? new Date(payload.projectEnd) : null;
  state.currentDate = state.projectStart;
  buildGanttIndex();
  clearGanttSelection();
}

function applyFbx(object) {
  if (state.fbxObject) {
    scene.remove(state.fbxObject);
  }
  state.fbxObject = object;
  state.fbxObject.rotation.x = CONFIG.fbx.rotationX;
  scene.add(object);
  state.meshes = [];
  state.idToMeshes = new Map();
  state.selectedMesh = null;
  state.hasMatchedIds = false;

  const idLines = [];

  object.traverse((child) => {
    if (child.isMesh) {
      child.geometry.computeBoundingBox();
      const center = new THREE.Vector3();
      child.geometry.boundingBox.getCenter(center);
      center.applyMatrix4(child.matrixWorld);

      const id = chooseMeshId(child.name, child.parent?.name || "");
      storeMaterialState(child);
      child.userData.id = id;

      state.meshes.push(child);
      if (id) {
        const list = state.idToMeshes.get(id) || [];
        list.push(child);
        state.idToMeshes.set(id, list);
      }

      idLines.push(`${id || "NO_ID"} :: ${child.name}`);
    }
  });

  state.fbxIdsText = idLines.join("\n");

  const missingIds = [];
  for (const id of state.tasksById.keys()) {
    if (!state.idToMeshes.has(id)) missingIds.push(id);
    else state.hasMatchedIds = true;
  }
  if (missingIds.length) {
    alert(t("missingFbxIds", { ids: missingIds.join(", ") }));
  }

  if (!state.hasMatchedIds && state.meshes.length) {
    alert(t("noCsvMatch"));
  }

  frameObject(object);
}

function setupTimeline() {
  if (!state.projectStart || !state.projectEnd) return;
  const totalDays = daysBetween(state.projectStart, state.projectEnd);
  dom.timeline.min = 0;
  dom.timeline.max = totalDays;
  dom.timeline.value = 0;
  dom.rangeLabel.textContent = `${formatDate(
    state.projectStart
  )} → ${formatDate(state.projectEnd)}`;
}

function updateViews() {
  updateDateLabel();
  updateSelectionLabel();
  updateStageCostLabel();
  updateTimelineValue();
  updateMeshVisibility();
  drawGantt();
  drawCosts();
}

function updateDateLabel() {
  dom.dateLabel.textContent = state.currentDate
    ? formatDate(state.currentDate)
    : "-";
}

function updateSelectionLabel() {
  dom.selectedLabel.textContent = state.selectedMesh?.userData?.id || "-";
}

function updateStageCostLabel() {
  if (!dom.stageCostLabel) return;
  dom.stageCostLabel.textContent = state.selectedGanttTask
    ? formatCostFull(state.selectedTaskCost)
    : "-";
}

function updateTimelineValue() {
  if (!state.projectStart || !state.currentDate) return;
  dom.timeline.value = String(
    daysBetween(state.projectStart, state.currentDate)
  );
}

function updateMeshVisibility() {
  if (!state.currentDate || !state.projectEnd) return;
  if (!state.hasMatchedIds) {
    for (const mesh of state.meshes) {
      setMeshState(mesh, "completed");
    }
    return;
  }
  const date = state.currentDate;

  for (const mesh of state.meshes) {
    const id = mesh.userData.id;
    const tasks = id ? state.tasksById.get(id) : null;

    if (!tasks || !tasks.length) {
      const visible = date >= state.projectEnd;
      setMeshState(mesh, visible ? "completed" : "hidden");
      continue;
    }

    const range = getTaskRange(tasks);
    if (date < range.start) {
      setMeshState(mesh, "hidden");
    } else if (date >= range.start && date <= range.end) {
      setMeshState(mesh, "active");
    } else {
      setMeshState(mesh, "completed");
    }
  }

  if (state.selectedMesh) {
    setMeshState(state.selectedMesh, "selected");
  }

  if (state.selectedTaskMeshes.length) {
    for (const mesh of state.selectedTaskMeshes) {
      setMeshState(mesh, "selected");
    }
  }
}

function frameObject(object) {
  const box = new THREE.Box3().setFromObject(object);
  if (box.isEmpty()) return;
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z);
  const distance = maxDim * 1.6 || 10;

  camera.near = Math.max(0.1, distance / 100);
  camera.far = distance * 100;
  camera.updateProjectionMatrix();
  camera.position.set(center.x + distance, center.y + distance, center.z + distance);
  controls.target.copy(center);
  controls.update();
}

function storeMaterialState(mesh) {
  const materials = Array.isArray(mesh.material)
    ? mesh.material
    : [mesh.material];
  mesh.userData.baseMaterials = materials.map((mat) => ({
    material: mat,
    color: mat.color ? mat.color.clone() : new THREE.Color(0xffffff),
    opacity: mat.opacity ?? 1,
    transparent: mat.transparent ?? false,
    wireframe: mat.wireframe ?? false,
  }));
  if (!mesh.userData.edgeHelper && mesh.geometry) {
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: CONFIG.mesh.edges.color,
      transparent: true,
      opacity: CONFIG.mesh.edges.opacity,
    });
    const edgeHelper = new THREE.LineSegments(edges, edgeMaterial);
    edgeHelper.visible = false;
    mesh.add(edgeHelper);
    mesh.userData.edgeHelper = edgeHelper;
  }
}

function setMeshState(mesh, stateName) {
  if (!mesh.userData.baseMaterials) return;
  if (stateName === "hidden") {
    mesh.visible = false;
    if (mesh.userData.edgeHelper) {
      mesh.userData.edgeHelper.visible = false;
    }
    return;
  }
  mesh.visible = true;
  const colorMap = {
    active: new THREE.Color(CONFIG.mesh.colors.active),
    completed: new THREE.Color(CONFIG.mesh.colors.completed),
    selected: new THREE.Color(CONFIG.mesh.colors.selected),
  };
  const opacityMap = {
    active: CONFIG.mesh.opacity.active,
    completed: CONFIG.mesh.opacity.completed,
    selected: CONFIG.mesh.opacity.selected,
  };
  const color = colorMap[stateName] || new THREE.Color(0xffffff);
  const opacity = opacityMap[stateName] ?? 1;
  for (const entry of mesh.userData.baseMaterials) {
    entry.material.color?.copy(color);
    entry.material.opacity = opacity;
    entry.material.transparent = opacity < 1;
    entry.material.wireframe = !CONFIG.mesh.faces.enabled;
  }
  if (mesh.userData.edgeHelper) {
    const edge = mesh.userData.edgeHelper;
    edge.visible = CONFIG.mesh.edges.enabled && stateName === "completed";
    edge.material.color?.setHex(CONFIG.mesh.edges.color);
    edge.material.opacity = CONFIG.mesh.edges.opacity;
    edge.material.transparent = CONFIG.mesh.edges.opacity < 1;
  }
}

function getTaskRange(tasks) {
  let min = null;
  let max = null;
  for (const task of tasks) {
    min = min ? new Date(Math.min(min, task.start)) : task.start;
    max = max ? new Date(Math.max(max, task.end)) : task.end;
  }
  return { start: min, end: max };
}

function extractIdFromUnderscore(name) {
  const raw = String(name || "").trim();
  if (!raw) return "";
  const parts = raw.split("_").filter((part) => part !== "");
  if (!parts.length) return "";
  return normalizeId(parts[parts.length - 1]);
}

function chooseMeshId(name, parentName) {
  const candidates = [
    extractIdFromUnderscore(name),
    extractIdFromUnderscore(parentName),
  ].filter(Boolean);
  if (!candidates.length) return "";
  for (const candidate of candidates) {
    if (state.tasksById.has(candidate)) return candidate;
  }
  return candidates[0];
}

function selectMeshAtMouse() {
  const visibleMeshes = state.meshes.filter((mesh) => mesh.visible);
  if (!visibleMeshes.length) return;
  raycaster.setFromCamera(mouse, camera);
  const ray = raycaster.ray;
  let nearest = null;
  let nearestDistance = Infinity;

  for (const mesh of visibleMeshes) {
    mesh.geometry.computeBoundingBox();
    const box = mesh.geometry.boundingBox.clone();
    box.applyMatrix4(mesh.matrixWorld);
    const hitPoint = ray.intersectBox(box, new THREE.Vector3());
    if (hitPoint) {
      const dist = ray.origin.distanceTo(hitPoint);
      if (dist < nearestDistance) {
        nearestDistance = dist;
        nearest = mesh;
      }
    }
  }

  if (!nearest) {
    nearest = nearestByScreenProximity(visibleMeshes);
  }

  if (nearest) {
    state.selectedMesh = nearest;
    updateViews();
  }
}

function nearestByScreenProximity(meshes) {
  let best = null;
  let bestDist = Infinity;
  const canvasRect = renderer.domElement.getBoundingClientRect();
  const targetX = ((mouse.x + 1) / 2) * canvasRect.width;
  const targetY = ((-mouse.y + 1) / 2) * canvasRect.height;
  const projection = new THREE.Vector3();

  for (const mesh of meshes) {
    mesh.geometry.computeBoundingBox();
    const center = mesh.geometry.boundingBox.getCenter(new THREE.Vector3());
    center.applyMatrix4(mesh.matrixWorld);
    projection.copy(center).project(camera);
    const screenX = ((projection.x + 1) / 2) * canvasRect.width;
    const screenY = ((-projection.y + 1) / 2) * canvasRect.height;
    const dist = Math.hypot(screenX - targetX, screenY - targetY);
    if (dist < bestDist) {
      bestDist = dist;
      best = mesh;
    }
  }
  return bestDist < CONFIG.selection.screenProximityPx ? best : null;
}

function startPlayback() {
  stopPlayback();
  state.timer = setInterval(() => {
    const next = addDays(state.currentDate, state.stepDays);
    if (next > state.projectEnd) {
      state.currentDate = state.projectEnd;
      stopPlayback();
      dom.playBtn.textContent = t("play");
      state.isPlaying = false;
    } else {
      state.currentDate = next;
    }
    updateViews();
  }, CONFIG.playback.intervalMs);
}

function stopPlayback() {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
}

function buildCostSeries() {
  if (!state.projectStart || !state.projectEnd) return;
  const totalDays = daysBetween(state.projectStart, state.projectEnd);
  const dailyCosts = new Array(totalDays + 1).fill(0);

  for (const task of state.tasks) {
    if (!task.cost) continue;
    const startIndex = daysBetween(state.projectStart, task.start);
    const endIndex = daysBetween(state.projectStart, task.end);
    const span = Math.max(1, endIndex - startIndex + 1);
    const costPerDay = task.cost / span;
    for (let i = startIndex; i <= endIndex; i += 1) {
      dailyCosts[i] += costPerDay;
    }
  }

  const cumulative = [];
  let total = 0;
  for (const daily of dailyCosts) {
    total += daily;
    cumulative.push(total);
  }

  state.costSeries = cumulative;
}

function buildGanttIndex() {
  state.ganttIndex = new Map();
  for (const task of state.tasks) {
    if (!task.start || !task.end) continue;
    const key = getGanttKey(task);
    if (!key) continue;
    const entry = state.ganttIndex.get(key) || { tasks: [], cost: 0 };
    entry.tasks.push(task);
    entry.cost += task.cost || 0;
    state.ganttIndex.set(key, entry);
  }
}

function drawGantt() {
  const canvas = dom.ganttCanvas;
  const ctx = canvas.getContext("2d");
  if (!ctx || !state.projectStart || !state.projectEnd) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const ratio = window.devicePixelRatio || 1;
  const width = canvas.width / ratio;
  const height = canvas.height / ratio;
  const marginLeft = CONFIG.gantt.labelColumnWidth;
  const marginTop = CONFIG.gantt.marginTop;
  const rowBottomPadding = CONFIG.gantt.rowBottomPadding;
  const dateFontSize = CONFIG.gantt.dateFontSize;
  const dateOffsetFromBottom = CONFIG.gantt.dateOffsetFromBottom;
  const stageDateOffsetFromBottom = CONFIG.gantt.stageDateOffsetFromBottom;
  const dateReserved =
    Math.max(dateOffsetFromBottom, stageDateOffsetFromBottom) +
    dateFontSize +
    CONFIG.gantt.dateExtraPadding;
  const rowHeight = CONFIG.gantt.rowHeight;
  const gap = CONFIG.gantt.rowGap;

  const chartWidth =
    width - marginLeft - CONFIG.gantt.chartRightPadding;
  const chartHeight =
    height - marginTop - rowBottomPadding - dateReserved;
  const totalDays = daysBetween(state.projectStart, state.projectEnd);
  const visibleTasks = state.ganttTasks.filter(
    (task) => task.start <= state.currentDate
  );

  const parentHeight = canvas.parentElement?.clientHeight || 0;
  const rowsCount = Math.max(1, visibleTasks.length);
  const contentHeight =
    marginTop +
    rowBottomPadding +
    dateReserved +
    rowsCount * (rowHeight + gap) -
    gap;
  const targetHeight = Math.max(parentHeight, contentHeight);
  if (Math.abs(canvas.clientHeight - targetHeight) > 1) {
    canvas.style.height = `${targetHeight}px`;
    resizeCanvas(canvas);
  }

  ctx.save();
  ctx.scale(ratio, ratio);
  ctx.fillStyle = CONFIG.gantt.labelColor;
  ctx.font = "12px Arial";

  let y = marginTop;
  const startOffsets = [];
  for (const task of visibleTasks) {
    if (y + rowHeight > marginTop + chartHeight) break;
    const startOffset = daysBetween(state.projectStart, task.start);
    const endOffset = daysBetween(state.projectStart, task.end);
    const x = marginLeft + (startOffset / totalDays) * chartWidth;
    const barWidth =
      ((endOffset - startOffset + 1) / totalDays) * chartWidth;
    const isSelected = getGanttKey(task) === state.selectedGanttKey;
    if (isSelected) {
      ctx.fillStyle = CONFIG.gantt.rowHighlightColor;
      ctx.fillRect(
        CONFIG.gantt.rowHighlightPaddingX,
        y - CONFIG.gantt.rowHighlightPaddingTop,
        marginLeft + chartWidth + CONFIG.gantt.rowHighlightExtraWidth,
        rowHeight + CONFIG.gantt.rowHighlightExtraHeight
      );
    }
    const label = `${task.buildCode || "-"} - ${task.workType || "-"}`;
    ctx.fillStyle = CONFIG.gantt.labelColor;
    ctx.fillText(
      label,
      CONFIG.gantt.labelPaddingX,
      y + rowHeight - CONFIG.gantt.labelBaselineOffset
    );
    ctx.fillStyle = isSelected
      ? CONFIG.gantt.barSelectedColor
      : CONFIG.gantt.barColor;
    ctx.fillRect(x, y, barWidth, rowHeight);
    if (barWidth >= CONFIG.gantt.minDurationLabelWidth) {
      const daysCount = Math.max(1, endOffset - startOffset + 1);
      ctx.fillStyle = "#fff";
      ctx.font = `${CONFIG.gantt.durationLabelFontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.fillText(
        `${daysCount}d`,
        x + barWidth / 2,
        y + rowHeight - CONFIG.gantt.durationLabelBaselineOffset
      );
      ctx.font = "12px Arial";
      ctx.textAlign = "left";
    }
    startOffsets.push(startOffset);
    y += rowHeight + gap;
  }

  if (state.currentDate) {
    const currentOffset = daysBetween(state.projectStart, state.currentDate);
    const lineX = marginLeft + (currentOffset / totalDays) * chartWidth;
    ctx.strokeStyle = CONFIG.gantt.currentDateLineColor;
    ctx.beginPath();
    ctx.moveTo(lineX, 0);
    ctx.lineTo(lineX, height);
    ctx.stroke();
  }

  const axisY = marginTop + chartHeight + rowBottomPadding;
  const midOffset = Math.floor(totalDays / 2);
  const ticks = [
    { label: formatDate(state.projectStart), offset: 0, align: "left" },
    {
      label: formatDate(addDays(state.projectStart, midOffset)),
      offset: midOffset,
      align: "center",
    },
    { label: formatDate(state.projectEnd), offset: totalDays, align: "right" },
  ];
  const dateFont = `${dateFontSize}px Arial`;
  const tickDateY = height - dateOffsetFromBottom;
  const stageDateY = height - stageDateOffsetFromBottom;
  ctx.fillStyle = CONFIG.gantt.dateLabelColor;


  if (startOffsets.length) {
    const uniqueOffsets = Array.from(new Set(startOffsets)).sort((a, b) => a - b);
    ctx.save();
    ctx.strokeStyle = CONFIG.gantt.dashedLineColor;
    ctx.setLineDash([3, 4]);
    ctx.fillStyle = CONFIG.gantt.stageDateLabelColor;
    for (const offset of uniqueOffsets) {
      const x = marginLeft + (offset / totalDays) * chartWidth;
      ctx.beginPath();
      ctx.moveTo(x, marginTop);
      ctx.lineTo(x, marginTop + chartHeight);
      ctx.stroke();
      const date = formatDate(addDays(state.projectStart, offset));
      ctx.save();
      ctx.font = dateFont;
      ctx.translate(x, stageDateY);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(date, 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }

  ctx.restore();
}

function drawCosts() {
  const canvas = dom.costsCanvas;
  const ctx = canvas.getContext("2d");
  if (!ctx || !state.costSeries.length) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const ratio = window.devicePixelRatio || 1;
  const width = canvas.width / ratio;
  const height = canvas.height / ratio;
  const margin = CONFIG.costs.margin;
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const maxCost = Math.max(...state.costSeries, 1);
  const totalDays = state.costSeries.length - 1;

  ctx.save();
  ctx.scale(ratio, ratio);
  ctx.font = `${CONFIG.costs.fontSize}px Arial`;
  ctx.strokeStyle = CONFIG.costs.lineColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  state.costSeries.forEach((value, index) => {
    const x = margin.left + (index / totalDays) * chartWidth;
    const y = margin.top + chartHeight - (value / maxCost) * chartHeight;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.strokeStyle = CONFIG.costs.axisColor;
  ctx.beginPath();
  ctx.moveTo(margin.left, margin.top);
  ctx.lineTo(margin.left, margin.top + chartHeight);
  ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
  ctx.stroke();

  const yTicks = [
    { value: maxCost, y: margin.top },
    { value: maxCost / 2, y: margin.top + chartHeight / 2 },
    { value: 0, y: margin.top + chartHeight },
  ];
  ctx.fillStyle = CONFIG.costs.labelColor;
  ctx.textAlign = "right";
  for (const tick of yTicks) {
    const label = formatCost(tick.value);
    ctx.fillText(
      label,
      margin.left - CONFIG.costs.yLabelOffsetX,
      tick.y + CONFIG.costs.yLabelOffsetY
    );
  }

  if (state.projectStart) {
    const midOffset = Math.floor(totalDays / 2);
    const xTicks = [
      { label: formatDate(state.projectStart), offset: 0, align: "left" },
      {
        label: formatDate(addDays(state.projectStart, midOffset)),
        offset: midOffset,
        align: "center",
      },
      { label: formatDate(state.projectEnd), offset: totalDays, align: "right" },
    ];
    // ctx.textAlign = "center";
    // for (const tick of xTicks) {
    //   const x = margin.left + (tick.offset / totalDays) * chartWidth;
    //   ctx.textAlign = tick.align;
    //   ctx.fillText(tick.label, x, margin.top + chartHeight + 20);
    // }
  }

  if (state.projectStart) {
    const breakpoints = getCostBreakpoints(state.costSeries);
    ctx.save();
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = CONFIG.costs.breakpointLineColor;
    ctx.fillStyle = CONFIG.costs.breakpointLabelColor;
    ctx.textAlign = "center";
    let lastLabelX = -Infinity;
    const minSpacing = CONFIG.costs.breakpointMinSpacing;
    for (const index of breakpoints) {
      const value = state.costSeries[index];
      const x = margin.left + (index / totalDays) * chartWidth;
      const y = margin.top + chartHeight - (value / maxCost) * chartHeight;
      if (x - lastLabelX < minSpacing) {
        continue;
      }
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, margin.top + chartHeight);
      ctx.stroke();
      ctx.fillText(
        formatCostFull(value),
        x,
        y - CONFIG.costs.breakpointCostOffsetY
      );
      const date = formatDate(addDays(state.projectStart, index));
      ctx.fillText(
        date,
        x,
        margin.top + chartHeight + CONFIG.costs.breakpointDateOffsetY
      );
      lastLabelX = x;
    }
    ctx.restore();
  }

  if (state.currentDate && state.projectStart) {
    const currentOffset = daysBetween(state.projectStart, state.currentDate);
    const lineX = margin.left + (currentOffset / totalDays) * chartWidth;
    ctx.strokeStyle = CONFIG.costs.currentDateLineColor;
    ctx.beginPath();
    ctx.moveTo(lineX, margin.top);
    ctx.lineTo(lineX, margin.top + chartHeight);
    ctx.stroke();
  }
  ctx.restore();
}

function formatCost(value) {
  if (!Number.isFinite(value)) return "0";
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return value.toFixed(0);
}

function formatCostFull(value) {
  if (!Number.isFinite(value)) return "0";
  const rounded = Math.round(value);
  return String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function getCostBreakpoints(series) {
  const breakpoints = [];
  let prevDelta = null;
  const epsilon = 1e-6;
  for (let i = 1; i < series.length; i += 1) {
    const delta = series[i] - series[i - 1];
    if (prevDelta === null) {
      prevDelta = delta;
      continue;
    }
    if (delta - prevDelta > epsilon) {
      breakpoints.push(i);
    }
    prevDelta = delta;
  }
  return breakpoints;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function daysBetween(start, end) {
  const ms = end.getTime() - start.getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}


function clearGanttSelection() {
  state.selectedGanttTask = null;
  state.selectedGanttKey = "";
  state.selectedTaskMeshes = [];
  state.selectedTaskCost = 0;
}

function getGanttKey(task) {
  const start = task.start instanceof Date ? task.start.toISOString() : "";
  const end = task.end instanceof Date ? task.end.toISOString() : "";
  return `${task.buildCode || ""}|${task.workType || ""}|${start}|${end}`;
}

function getGanttTaskAtPoint(event) {
  if (!state.projectStart || !state.projectEnd) return null;
  const rect = dom.ganttCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const width = rect.width;
  const height = rect.height;
  const marginLeft = 140;
  const marginTop = 12;
  const marginBottom = 20;
  const rowHeight = 18;
  const gap = 6;
  const chartHeight = height - marginTop - marginBottom;
  if (x < 0 || x > width || y < marginTop || y > marginTop + chartHeight) {
    return null;
  }
  const rowIndex = Math.floor((y - marginTop) / (rowHeight + gap));
  if (rowIndex < 0) return null;
  const rowTop = marginTop + rowIndex * (rowHeight + gap);
  if (y > rowTop + rowHeight) return null;
  const visibleTasks = state.ganttTasks.filter(
    (task) => task.start <= state.currentDate
  );
  if (rowIndex >= visibleTasks.length) return null;
  return visibleTasks[rowIndex] || null;
}

function selectGanttTask(task) {
  state.selectedGanttTask = task;
  state.selectedGanttKey = getGanttKey(task);
  const entry = state.ganttIndex.get(state.selectedGanttKey);
  const matchingTasks = entry?.tasks || [task];
  state.selectedTaskCost = entry?.cost ?? task.cost ?? 0;
  const meshSet = new Set();
  for (const item of matchingTasks) {
    if (!item.id) continue;
    const meshes = state.idToMeshes.get(item.id);
    if (!meshes) continue;
    for (const mesh of meshes) {
      meshSet.add(mesh);
    }
  }
  state.selectedTaskMeshes = Array.from(meshSet);
  updateViews();
}

function bootApp() {
  initConfig();
  initAuth();
  setLanguage(detectLanguage());
}

window.addEventListener("load", bootApp);

window.__appReady = true;
