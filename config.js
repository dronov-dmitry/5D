export const CONFIG = {
  api: {
    // Base URL for backend API (empty = same origin)
    baseUrl: "https://confident-dream-67666.pktriot.net/",
  },
  // Backward-compatible alias for API base (use api.baseUrl instead)
  apiBase: "",
  viewer: {
    // Цвет фона сцены
    backgroundColor: 0xf0f0f0,
    // Сохранять буфер рендера (нужно для некоторых операций со скриншотами)
    preserveDrawingBuffer: false,
    // Сглаживание
    antialias: true,
  },
  camera: {
    // Угол обзора камеры
    fov: 60,
    // Ближняя плоскость отсечения
    near: 0.1,
    // Дальняя плоскость отсечения
    far: 5000,
    // Стартовая позиция камеры
    position: { x: 6, y: 6, z: 8 },
  },
  controls: {
    // Плавность управления камерой
    enableDamping: true,
  },
  lights: {
    // Параметры ambient-света
    ambient: { color: 0xffffff, intensity: 0.55 },
    // Параметры направленного света
    directional: {
      color: 0xffffff,
      intensity: 0.8,
      position: { x: 10, y: 20, z: 10 },
    },
  },
  fbx: {
    // Поворот модели по оси X
    rotationX: -Math.PI / 2,
  },
  playback: {
    // Интервал проигрывания таймлайна (мс)
    intervalMs: 500,
  },
  mesh: {
    // Цвета состояния элементов модели
    colors: {
      active: 0xff3333,
      completed: 0x5bbf5b,
      selected: 0xffd700,
    },
    // Прозрачность для состояния элементов
    opacity: {
      active: 0.5,
      completed: 1,
      selected: 1,
    },
    // Настройки отображения рёбер
    edges: {
      // Показывать рёбра у завершенных конструкций
      enabled: true,
      // Цвет рёбер
      color: 0xffffff,
      // Прозрачность рёбер
      opacity: 1,
    },
    // Настройки отображения граней (поверхностей)
    faces: {
      // Показывать грани (поверхности)
      enabled: true,
    },
  },
  gantt: {
    // Ширина первого столбца (название этапа)
    labelColumnWidth: 250,
    // Верхний отступ диаграммы
    marginTop: 12,
    // Отступ последней строки от низа диаграммы
    rowBottomPadding: 25,
    // Высота строки
    rowHeight: 18,
    // Вертикальный зазор между строками
    rowGap: 6,
    // Дополнительный отступ справа от диаграммы
    chartRightPadding: 10,
    // Отступ текста названия этапа слева
    labelPaddingX: 8,
    // Смещение текста названия этапа по Y от низа строки
    labelBaselineOffset: 4,
    // Отступы подсветки выбранной строки
    rowHighlightPaddingX: 4,
    rowHighlightPaddingTop: 2,
    rowHighlightExtraWidth: 2,
    rowHighlightExtraHeight: 4,
    // Минимальная ширина бара для вывода длительности
    minDurationLabelWidth: 24,
    // Размер шрифта подписей длительности на баре
    durationLabelFontSize: 10,
    // Смещение текста длительности по Y от низа бара
    durationLabelBaselineOffset: 5,
    // Размер шрифта дат на оси X
    dateFontSize: 10,
    // Отступ основных дат от нижнего края диаграммы
    dateOffsetFromBottom: 8,
    // Отступ дат начала этапа от нижнего края диаграммы
    stageDateOffsetFromBottom: 24,
    // Дополнительный запас снизу для дат
    dateExtraPadding: 18,
    // Цвет бара этапа
    barColor: "#6aa4ff",
    // Цвет бара выбранного этапа
    barSelectedColor: "#ffb347",
    // Цвет подсветки выбранной строки
    rowHighlightColor: "#fff4c2",
    // Цвет линии текущей даты
    currentDateLineColor: "#ff3333",
    // Цвет пунктирных вертикальных линий
    dashedLineColor: "#666",
    // Цвет текста подписей этапов
    labelColor: "#111",
    // Цвет текста дат на оси X
    dateLabelColor: "#555",
    // Цвет текста дат начала этапов
    stageDateLabelColor: "#333",
  },
  costs: {
    // Отступы графика стоимости
    margin: { left: 50, right: 12, top: 12, bottom: 28 },
    // Размер шрифта подписей
    fontSize: 12,
    // Цвет линии графика стоимости
    lineColor: "#2f6fed",
    // Цвет осей
    axisColor: "#999",
    // Цвет подписей осей
    labelColor: "#555",
    // Смещение подписей по оси Y (влево и вниз)
    yLabelOffsetX: 6,
    yLabelOffsetY: 4,
    // Цвет пунктирных линий переломов
    breakpointLineColor: "#666",
    // Цвет подписей переломов
    breakpointLabelColor: "#333",
    // Минимальное расстояние между подписями переломов
    breakpointMinSpacing: 60,
    // Сдвиг по Y для дат на оси X
    axisDateOffsetY: 20,
    // Сдвиг по Y для дат переломов
    breakpointDateOffsetY: 20,
    // Сдвиг по Y для стоимости перелома
    breakpointCostOffsetY: 6,
    // Цвет линии текущей даты
    currentDateLineColor: "#ff3333",
  },
  selection: {
    // Максимальная дистанция в пикселях для выбора по близости
    screenProximityPx: 40,
  },
};

