export const CONFIG = {
  api: {
    baseUrl: "https://app-12-5d-backend.dronov-dmitry-bim.workers.dev/",
  },
  apiBase: "",
  /** Public GSI client id; must match Worker GOOGLE_CLIENT_ID. Used if /api/config omits googleClientId. */
  googleClientId:
    "774777564417-3eai00pj02mblh7pc3ntavs2f1cg8n24.apps.googleusercontent.com",
  /** Public Cloudflare Turnstile site key. Leave empty to disable the local gate until configured. */
  turnstileSiteKey: "",
  viewer: {
    backgroundColor: 0xf0f0f0,
    preserveDrawingBuffer: false,
    antialias: true,
  },
  camera: {
    fov: 60,
    near: 0.1,
    far: 5000,
    position: { x: 6, y: 6, z: 8 },
  },
  controls: {
    enableDamping: true,
  },
  lights: {
    ambient: { color: 0xffffff, intensity: 0.55 },
    directional: {
      color: 0xffffff,
      intensity: 0.8,
      position: { x: 10, y: 20, z: 10 },
    },
  },
  fbx: {
    rotationX: -Math.PI / 2,
  },
  playback: {
    intervalMs: 500,
  },
  mesh: {
    colors: {
      active: 0xff3333,
      completed: 0x5bbf5b,
      selected: 0xffd700,
    },
    opacity: {
      active: 0.5,
      completed: 1,
      selected: 1,
    },
    edges: {
      enabled: true,
      color: 0xffffff,
      opacity: 1,
    },
    faces: {
      enabled: true,
    },
  },
  gantt: {
    labelColumnWidth: 250,
    marginTop: 12,
    rowBottomPadding: 25,
    rowHeight: 18,
    rowGap: 6,
    chartRightPadding: 10,
    labelPaddingX: 8,
    labelBaselineOffset: 4,
    rowHighlightPaddingX: 4,
    rowHighlightPaddingTop: 2,
    rowHighlightExtraWidth: 2,
    rowHighlightExtraHeight: 4,
    minDurationLabelWidth: 24,
    durationLabelFontSize: 10,
    durationLabelBaselineOffset: 5,
    dateFontSize: 10,
    dateOffsetFromBottom: 8,
    stageDateOffsetFromBottom: 24,
    dateExtraPadding: 18,
    barColor: "#6aa4ff",
    barSelectedColor: "#ffb347",
    rowHighlightColor: "#fff4c2",
    currentDateLineColor: "#ff3333",
    dashedLineColor: "#666",
    labelColor: "#111",
    dateLabelColor: "#555",
    stageDateLabelColor: "#333",
  },
  costs: {
    margin: { left: 50, right: 12, top: 12, bottom: 28 },
    fontSize: 12,
    lineColor: "#2f6fed",
    axisColor: "#999",
    labelColor: "#555",
    yLabelOffsetX: 6,
    yLabelOffsetY: 4,
    breakpointLineColor: "#666",
    breakpointLabelColor: "#333",
    breakpointMinSpacing: 60,
    axisDateOffsetY: 20,
    breakpointDateOffsetY: 20,
    breakpointCostOffsetY: 6,
    currentDateLineColor: "#ff3333",
  },
  selection: {
    screenProximityPx: 40,
  },
};
