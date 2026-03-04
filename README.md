# App 12 5D Viewer — Client Build для GitHub Pages

Эта папка содержит клиентскую часть приложения для публикации на GitHub Pages.

## Содержимое

- `index.html` — главная страница
- `main.js` — основной JavaScript модуль
- `styles.css` — стили приложения
- `config.js` — конфигурация (API endpoint и настройки)
- `settings.txt` — настройки отладки (опционально)
- `vendor/` — библиотеки Three.js и зависимости

## Публикация на GitHub Pages

### 1. Создание репозитория

1. Создай новый репозиторий на GitHub (например, `app-12-5d-viewer-client`)
2. Сделай репозиторий **public**
3. Склонируй репозиторий локально

### 2. Копирование файлов

Скопируй все содержимое папки `gh-pages` в корень репозитория:

```powershell
cd <path-to-repo>
Copy-Item -Path ..\App_12_5D_v2\gh-pages\* -Destination . -Recurse
```

### 3. Настройка API endpoint

Отредактируй файл `config.js` и укажи URL бэкенд-сервера:

```javascript
export const CONFIG = {
  api: {
    // Укажи URL твоего бэкенд-сервера
    baseUrl: "https://your-backend-server.com/",
  },
  // остальные настройки...
}
```

Если у тебя еще нет бэкенда, можешь временно оставить пустую строку `""` для тестирования (но авторизация и парсинг CSV работать не будут).

### 4. Коммит и push

```bash
git add .
git commit -m "Initial client build for GitHub Pages"
git push origin main
```

### 5. Включение GitHub Pages

1. Открой репозиторий на GitHub
2. Перейди в **Settings** → **Pages**
3. В разделе **Source** выбери:
   - Branch: `main`
   - Folder: `/root` (корень репозитория)
4. Нажми **Save**
5. Подожди несколько минут — GitHub Pages автоматически соберет и опубликует сайт
6. URL будет вида: `https://<username>.github.io/<repo-name>/`

### 6. Открытие приложения

После публикации открой:

```
https://<username>.github.io/<repo-name>/index.html
```

или просто:

```
https://<username>.github.io/<repo-name>/
```

## Настройка бэкенда

Для полноценной работы приложения (авторизация Google, парсинг CSV, PayPal) нужен работающий бэкенд.

### Вариант A: Бэкенд на отдельном сервере

1. Разверни бэкенд (`server.js`) на своем сервере (VPS, Heroku, Railway и т.д.)
2. В `config.js` укажи URL сервера:
   ```javascript
   baseUrl: "https://your-backend.com/"
   ```
3. На сервере добавь в `.env`:
   ```
   CORS_ORIGINS=https://<username>.github.io
   ```
4. В Google Cloud Console добавь в **Authorized JavaScript origins**:
   ```
   https://<username>.github.io
   ```

### Вариант B: Прокси через GitHub Pages домен

Если у тебя есть доступ к настройке домена GitHub Pages, можно настроить nginx proxy для `/api/*` запросов.

Пример конфигурации nginx:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:7002/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

В этом случае в `config.js` можно оставить `baseUrl: ""`.

## Тестирование локально

Перед публикацией можно протестировать локально:

```powershell
cd gh-pages
python -m http.server 8000
```

Затем открой `http://localhost:8000/index.html`

## Обновление

Когда нужно обновить клиентскую часть:

1. В основном проекте внеси изменения в `index.html`, `main.js`, `styles.css` и т.д.
2. Запусти скрипт обновления:
   ```powershell
   # Удали старые файлы
   Remove-Item gh-pages\* -Recurse -Force
   
   # Скопируй новые
   Copy-Item -Path index.html -Destination gh-pages\
   Copy-Item -Path main.js -Destination gh-pages\
   Copy-Item -Path styles.css -Destination gh-pages\
   Copy-Item -Path config.js -Destination gh-pages\
   Copy-Item -Path settings.txt -Destination gh-pages\
   Copy-Item -Path vendor -Destination gh-pages\vendor -Recurse
   ```
3. Скопируй обновленные файлы в репозиторий GitHub Pages
4. Закоммить и запушить изменения

## Структура файлов

```
gh-pages/
├── index.html         # Главная страница
├── main.js            # Основной модуль приложения
├── styles.css         # Стили
├── config.js          # Конфигурация (API, настройки)
├── settings.txt       # Настройки отладки (опционально)
├── README.md          # Этот файл
└── vendor/            # Библиотеки Three.js
    ├── three.module.js
    ├── OrbitControls.js
    ├── FBXLoader.js
    ├── libs/
    │   └── fflate.module.js
    └── curves/
        ├── NURBSCurve.js
        └── NURBSUtils.js
```

## Важные замечания

1. **Не добавляй в репозиторий:**
   - `.env` файлы с секретными ключами
   - `server.js` и серверный код
   - База данных `data/`
   - `node_modules/`

2. **Безопасность:**
   - `config.js` публичен — не храни там секретные ключи
   - API ключи PayPal и Google должны быть только на сервере

3. **CORS:**
   - Бэкенд должен разрешать запросы с домена GitHub Pages
   - Добавь домен в `CORS_ORIGINS` на сервере

## Помощь

Если что-то не работает:

1. Проверь DevTools → Console на наличие ошибок
2. Убедись, что `config.js` содержит правильный URL бэкенда
3. Проверь, что бэкенд доступен и отвечает на `/api/config`
4. Убедись, что CORS настроен правильно на сервере
