// 纳水溪微缩模型效果图导出：在场景出图上叠加四种参考风格的背景、色调与线描，并打包为 ZIP 下载。
(() => {
  const VIEWS = [
    { key: "style", name: "01-风格视角", kind: "scene" },
    { key: "axon", name: "02-鸟瞰轴测", kind: "aerial" },
    { key: "roof", name: "03-屋顶俯视", kind: "plan" },
    { key: "south", name: "04-南立面", kind: "elevation" },
    { key: "east", name: "05-东立面", kind: "elevation" },
    { key: "north", name: "06-北立面", kind: "elevation" },
    { key: "west", name: "07-西立面", kind: "elevation" },
  ];

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const mix = (a, b, t) => a + (b - a) * t;

  function makeCanvas(w, h) {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    return c;
  }
  function seeded(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  // 先缩小再放大实现柔化，兼容不支持 ctx.filter 的浏览器。
  function softened(src, factor) {
    const s = makeCanvas(Math.max(1, Math.round(src.width / factor)), Math.max(1, Math.round(src.height / factor)));
    const sc = s.getContext("2d");
    sc.imageSmoothingQuality = "high";
    sc.drawImage(src, 0, 0, s.width, s.height);
    const out = makeCanvas(src.width, src.height);
    const oc = out.getContext("2d");
    oc.imageSmoothingQuality = "high";
    oc.drawImage(s, 0, 0, out.width, out.height);
    return out;
  }
  // 低频斑驳：纸张、绢本与雾气的明暗起伏。
  function mottle(ctx, w, h, rand, cell, color, alpha, mode = "multiply") {
    const s = makeCanvas(Math.max(2, Math.round(w / cell)), Math.max(2, Math.round(h / cell)));
    const sc = s.getContext("2d");
    const data = sc.createImageData(s.width, s.height);
    for (let i = 0; i < data.data.length; i += 4) {
      const v = rand();
      data.data[i] = color[0]; data.data[i + 1] = color[1]; data.data[i + 2] = color[2];
      data.data[i + 3] = Math.round(v * 255);
    }
    sc.putImageData(data, 0, 0);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.globalCompositeOperation = mode;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(s, 0, 0, w, h);
    ctx.restore();
  }
  // 模型亮度与透明度的 Sobel 边缘，用作墨线。
  function edges(px, w, h, thick) {
    const n = w * h, lum = new Float32Array(n), alpha = new Float32Array(n), out = new Float32Array(n);
    for (let i = 0, j = 0; i < n; i++, j += 4) {
      const a = px[j + 3] / 255;
      alpha[i] = a;
      lum[i] = (a * (0.299 * px[j] + 0.587 * px[j + 1] + 0.114 * px[j + 2]) + (1 - a) * 255) / 255;
    }
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        const gx = lum[i - w + 1] + 2 * lum[i + 1] + lum[i + w + 1] - lum[i - w - 1] - 2 * lum[i - 1] - lum[i + w - 1];
        const gy = lum[i + w - 1] + 2 * lum[i + w] + lum[i + w + 1] - lum[i - w - 1] - 2 * lum[i - w] - lum[i - w + 1];
        const ax = alpha[i - w + 1] + 2 * alpha[i + 1] + alpha[i + w + 1] - alpha[i - w - 1] - 2 * alpha[i - 1] - alpha[i + w - 1];
        const ay = alpha[i + w - 1] + 2 * alpha[i + w] + alpha[i + w + 1] - alpha[i - w - 1] - 2 * alpha[i - w] - alpha[i - w + 1];
        out[i] = Math.max(Math.sqrt(gx * gx + gy * gy), 0.8 * Math.sqrt(ax * ax + ay * ay)) / 4;
      }
    }
    if (!thick) return out;
    // 线宽约两像素，使大尺寸出图缩小查看时墨线仍清晰。
    const wide = new Float32Array(n);
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        wide[i] = Math.max(out[i], out[i - 1], out[i + 1], out[i - w], out[i + w]);
      }
    }
    return wide;
  }
  function verticalGradient(ctx, w, h, stops) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    stops.forEach(([at, c]) => g.addColorStop(at, c));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
  function bloom(canvas, threshold, strength, tint) {
    const w = canvas.width, h = canvas.height;
    const small = makeCanvas(Math.max(1, Math.round(w / 4)), Math.max(1, Math.round(h / 4)));
    const sc = small.getContext("2d");
    sc.drawImage(canvas, 0, 0, small.width, small.height);
    const d = sc.getImageData(0, 0, small.width, small.height);
    for (let i = 0; i < d.data.length; i += 4) {
      const l = (0.299 * d.data[i] + 0.587 * d.data[i + 1] + 0.114 * d.data[i + 2]) / 255;
      const k = smooth(threshold, 1, l);
      d.data[i] = d.data[i] * k * tint[0]; d.data[i + 1] = d.data[i + 1] * k * tint[1]; d.data[i + 2] = d.data[i + 2] * k * tint[2];
    }
    sc.putImageData(d, 0, 0);
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = strength;
    ctx.drawImage(softened(small, 3), 0, 0, w, h);
    ctx.globalAlpha = strength * 0.7;
    ctx.drawImage(softened(small, 9), 0, 0, w, h);
    ctx.restore();
  }
  function vignette(ctx, w, h, color, alpha) {
    const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.32, w / 2, h / 2, Math.hypot(w, h) * 0.62);
    g.addColorStop(0, `rgba(${color},0)`);
    g.addColorStop(1, `rgba(${color},${alpha})`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
  function caption(ctx, w, h, text, color) {
    const size = Math.max(12, Math.round(Math.min(w, h * 3) * 0.011));
    ctx.save();
    ctx.font = `${size}px "Songti SC","STSong","SimSun",serif`;
    ctx.fillStyle = color;
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.fillText(text, w - size * 1.6, h - size * 1.2);
    ctx.restore();
  }
  function ridges(ctx, w, h, rand, layers) {
    for (const layer of layers) {
      const phase = [rand() * 6, rand() * 6, rand() * 6];
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += Math.max(2, w / 240)) {
        const u = x / w;
        const y = layer.base
          - layer.amp * (0.55 * Math.sin(u * 5.2 + phase[0]) + 0.3 * Math.sin(u * 13.7 + phase[1]) + 0.15 * Math.sin(u * 31 + phase[2]))
          - layer.amp * 0.6 * Math.exp(-((u - layer.peak) ** 2) / 0.012);
        ctx.lineTo(x, y * h);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      const g = ctx.createLinearGradient(0, (layer.base - layer.amp * 1.6) * h, 0, h);
      g.addColorStop(0, layer.top);
      g.addColorStop(0.55, layer.bottom);
      g.addColorStop(1, "rgba(250,244,226,0)");
      ctx.fillStyle = g;
      ctx.fill();
    }
  }

  // 四种参考风格：取景、昼夜、背景、模型调色与线描。
  const STYLES = {
    sketch: {
      name: "纸本淡彩",
      view: "street",
      night: 0,
      width: { scene: 1800, plan: 2400, elevation: 2400 },
      background(ctx, w, h, kind, rand) {
        ctx.fillStyle = "#f1ece1";
        ctx.fillRect(0, 0, w, h);
        mottle(ctx, w, h, rand, 9, [176, 160, 136], 0.16);
        mottle(ctx, w, h, rand, 60, [205, 188, 160], 0.22);
      },
      color(r, g, b, out) {
        const l = 0.299 * r + 0.587 * g + 0.114 * b;
        r = mix(l, r, 0.72); g = mix(l, g, 0.72); b = mix(l, b, 0.72);
        if (g > r * 1.08 && g > b) { const k = 0.3; r = mix(r, 206, k); g = mix(g, 142, k); b = mix(b, 82, k); }
        out[0] = r * 0.8 + 46; out[1] = g * 0.8 + 44; out[2] = b * 0.8 + 40;
      },
      paper: 0.3, opacity: 0.94,
      ink: { color: [52, 46, 40], lo: 0.018, hi: 0.08, strength: 0.9, thick: true },
      grain: 10,
      post(canvas, w, h) {
        caption(canvas.getContext("2d"), w, h, "纳水溪 · 纸本淡彩", "rgba(70,62,54,.72)");
      },
    },
    night: {
      name: "夜景鸟瞰",
      view: "nightAerial",
      night: 1,
      width: { scene: 2400, plan: 2400, elevation: 2400 },
      background(ctx, w, h, kind, rand) {
        verticalGradient(ctx, w, h, [[0, "#4f5470"], [0.5, "#8d8fab"], [1, "#c9c8d8"]]);
        mottle(ctx, w, h, rand, 70, [240, 238, 250], 0.28, "screen");
      },
      color(r, g, b, out) {
        const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const shade = (1 - l) * 0.3;
        r = (r - 128) * 1.16 + 128; g = (g - 128) * 1.16 + 128; b = (b - 128) * 1.16 + 128;
        out[0] = mix(r, 38, shade); out[1] = mix(g, 48, shade); out[2] = mix(b, 82, shade);
      },
      paper: 0, opacity: 1,
      ink: { color: [22, 24, 34], lo: 0.08, hi: 0.3, strength: 0.4 },
      grain: 6,
      post(canvas, w, h) {
        bloom(canvas, 0.55, 0.85, [1.15, 0.92, 0.62]);
        const ctx = canvas.getContext("2d");
        const fog = ctx.createLinearGradient(0, h * 0.55, 0, h);
        fog.addColorStop(0, "rgba(214,212,228,0)");
        fog.addColorStop(1, "rgba(214,212,228,.5)");
        ctx.fillStyle = fog;
        ctx.fillRect(0, 0, w, h);
        vignette(ctx, w, h, "20,22,36", 0.42);
        caption(ctx, w, h, "纳水溪 · 夜景鸟瞰", "rgba(236,234,246,.75)");
      },
    },
    jiehua: {
      name: "工笔界画",
      view: "jiehua",
      night: 0,
      width: { scene: 1800, plan: 2400, elevation: 2400 },
      background(ctx, w, h, kind, rand) {
        ctx.fillStyle = "#e7d9bb";
        ctx.fillRect(0, 0, w, h);
        ctx.save();
        ctx.lineWidth = 1;
        for (let i = 0; i < (w + h) * 0.9; i++) {
          const vertical = rand() < 0.5;
          ctx.strokeStyle = `rgba(150,124,84,${0.03 + rand() * 0.05})`;
          ctx.beginPath();
          if (vertical) { const x = rand() * w; ctx.moveTo(x, 0); ctx.lineTo(x + (rand() - 0.5) * 6, h); }
          else { const y = rand() * h; ctx.moveTo(0, y); ctx.lineTo(w, y + (rand() - 0.5) * 6); }
          ctx.stroke();
        }
        ctx.restore();
        mottle(ctx, w, h, rand, 40, [176, 140, 92], 0.26);
        vignette(ctx, w, h, "130,98,60", 0.32);
      },
      color(r, g, b, out) {
        const sr = 0.393 * r + 0.769 * g + 0.189 * b, sg = 0.349 * r + 0.686 * g + 0.168 * b, sb = 0.272 * r + 0.534 * g + 0.131 * b;
        r = mix(r, sr, 0.28); g = mix(g, sg, 0.28); b = mix(b, sb, 0.28);
        const l = 0.299 * r + 0.587 * g + 0.114 * b;
        if (g > r * 1.05 && g > b) { r = mix(r, 96, 0.4); g = mix(g, 150, 0.4); b = mix(b, 132, 0.4); }
        else if (l < 90) { r = mix(r, 82, 0.45); g = mix(g, 94, 0.45); b = mix(b, 100, 0.45); }
        else if (r > g * 1.25) { r = mix(r, 178, 0.35); g = mix(g, 78, 0.35); b = mix(b, 56, 0.35); }
        out[0] = r * 0.95 + 16; out[1] = g * 0.95 + 13; out[2] = b * 0.95 + 8;
      },
      paper: 0.42, opacity: 0.95,
      ink: { color: [64, 48, 34], lo: 0.018, hi: 0.075, strength: 0.92, thick: true },
      grain: 8,
      post(canvas, w, h) {
        const ctx = canvas.getContext("2d");
        const s = Math.round(Math.min(w, h) * 0.06);
        const x = Math.round(w * 0.05), y = Math.round(h - s * 1.6);
        ctx.save();
        ctx.fillStyle = "rgba(170,46,36,.88)";
        ctx.fillRect(x, y, s, s);
        ctx.fillStyle = "rgba(240,224,200,.95)";
        ctx.font = `${Math.round(s * 0.38)}px "KaiTi","STKaiti","Songti SC",serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("纳水", x + s / 2, y + s * 0.3);
        ctx.fillText("溪图", x + s / 2, y + s * 0.72);
        ctx.restore();
        caption(ctx, w, h, "纳水溪 · 工笔界画", "rgba(92,66,40,.7)");
      },
    },
    shanshui: {
      name: "青绿山水",
      view: "upward",
      night: 0.32,
      width: { scene: 1800, plan: 2400, elevation: 2400 },
      background(ctx, w, h, kind, rand) {
        verticalGradient(ctx, w, h, [[0, "#efe3bf"], [0.55, "#f7eed6"], [1, "#f4ecd6"]]);
        if (kind === "plan") {
          mottle(ctx, w, h, rand, 50, [160, 196, 170], 0.22);
          return;
        }
        const sx = w * 0.72, sy = h * (kind === "elevation" ? 0.3 : 0.2), sr = Math.min(w, h * 1.4) * 0.06;
        const halo = ctx.createRadialGradient(sx, sy, sr * 0.6, sx, sy, sr * 5);
        halo.addColorStop(0, "rgba(255,226,170,.9)");
        halo.addColorStop(1, "rgba(255,226,170,0)");
        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "rgba(255,244,214,.95)";
        ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2); ctx.fill();
        const low = kind === "elevation" ? 0.3 : 0;
        ridges(ctx, w, h, rand, [
          { base: 0.36 + low, amp: 0.1, peak: 0.25, top: "rgba(168,198,182,.85)", bottom: "rgba(214,226,206,.6)" },
          { base: 0.44 + low, amp: 0.12, peak: 0.78, top: "rgba(104,156,132,.92)", bottom: "rgba(186,210,184,.55)" },
          { base: 0.54 + low, amp: 0.1, peak: 0.45, top: "rgba(66,120,98,.95)", bottom: "rgba(170,198,168,.4)" },
        ]);
        mottle(ctx, w, h, rand, 80, [255, 252, 240], 0.35, "screen");
      },
      color(r, g, b, out) {
        const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        if (g > r && g > b) { r = mix(r, 74, 0.38); g = mix(g, 146, 0.38); b = mix(b, 120, 0.38); }
        const warm = smooth(0.5, 0.9, l) * 0.2;
        out[0] = mix(r, 255, warm); out[1] = mix(g, 224, warm); out[2] = mix(b, 176, warm);
      },
      paper: 0.12, opacity: 0.98,
      ink: { color: [92, 72, 52], lo: 0.025, hi: 0.11, strength: 0.55, thick: true },
      grain: 7,
      post(canvas, w, h) {
        bloom(canvas, 0.7, 0.35, [1.05, 0.95, 0.78]);
        const ctx = canvas.getContext("2d");
        const mist = ctx.createLinearGradient(0, h * 0.7, 0, h);
        mist.addColorStop(0, "rgba(250,246,232,0)");
        mist.addColorStop(1, "rgba(250,246,232,.55)");
        ctx.fillStyle = mist;
        ctx.fillRect(0, 0, w, h);
        caption(ctx, w, h, "纳水溪 · 青绿山水", "rgba(60,96,80,.75)");
      },
    },
  };

  async function stylize(styleId, shot, kind, seed) {
    const style = STYLES[styleId];
    const { width: w, height: h } = shot;
    const img = new Image();
    img.src = shot.url;
    await img.decode();
    const modelCanvas = makeCanvas(w, h);
    const mc = modelCanvas.getContext("2d", { willReadFrequently: true });
    mc.drawImage(img, 0, 0);
    const model = mc.getImageData(0, 0, w, h).data;
    const ink = edges(model, w, h, style.ink.thick);

    const result = makeCanvas(w, h);
    const ctx = result.getContext("2d", { willReadFrequently: true });
    const rand = seeded(seed);
    style.background(ctx, w, h, kind, rand);
    const frame = ctx.getImageData(0, 0, w, h);
    const px = frame.data;
    const c = [0, 0, 0];
    const { paper, opacity, grain } = style;
    const [ir, ig, ib] = style.ink.color, { lo, hi, strength } = style.ink;
    let noise = seed | 1;
    for (let i = 0, j = 0; i < w * h; i++, j += 4) {
      let r = px[j], g = px[j + 1], b = px[j + 2];
      const a = (model[j + 3] / 255) * opacity;
      if (a > 0) {
        style.color(model[j], model[j + 1], model[j + 2], c);
        const pr = 1 - paper + paper * r / 255, pg = 1 - paper + paper * g / 255, pb = 1 - paper + paper * b / 255;
        r = mix(r, c[0] * pr, a); g = mix(g, c[1] * pg, a); b = mix(b, c[2] * pb, a);
      }
      const e = ink[i];
      if (e > lo) {
        const t = smooth(lo, hi, e) * strength;
        r = mix(r, ir, t); g = mix(g, ig, t); b = mix(b, ib, t);
      }
      noise = (Math.imul(noise, 1664525) + 1013904223) | 0;
      const n = ((noise >>> 8) / 16777216 - 0.5) * grain;
      px[j] = clamp(r + n, 0, 255); px[j + 1] = clamp(g + n, 0, 255); px[j + 2] = clamp(b + n, 0, 255); px[j + 3] = 255;
    }
    ctx.putImageData(frame, 0, 0);
    style.post(result, w, h, kind);
    return new Promise(resolve => result.toBlob(resolve, "image/jpeg", 0.9));
  }

  // 仅存储（不压缩）的 ZIP，文件名按 UTF-8 标记。
  const crcTable = new Uint32Array(256).map((_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });
  function crc32(data) {
    let c = 0xffffffff;
    for (let i = 0; i < data.length; i++) c = crcTable[(c ^ data[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  }
  async function zip(files) {
    const encoder = new TextEncoder();
    const now = new Date();
    const time = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
    const date = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
    const parts = [], central = [];
    let offset = 0;
    for (const file of files) {
      const data = new Uint8Array(await file.blob.arrayBuffer());
      const name = encoder.encode(file.name);
      const crc = crc32(data);
      const local = new DataView(new ArrayBuffer(30));
      local.setUint32(0, 0x04034b50, true); local.setUint16(4, 20, true); local.setUint16(6, 0x0800, true);
      local.setUint16(8, 0, true); local.setUint16(10, time, true); local.setUint16(12, date, true);
      local.setUint32(14, crc, true); local.setUint32(18, data.length, true); local.setUint32(22, data.length, true);
      local.setUint16(26, name.length, true); local.setUint16(28, 0, true);
      parts.push(local.buffer, name, data);
      const entry = new DataView(new ArrayBuffer(46));
      entry.setUint32(0, 0x02014b50, true); entry.setUint16(4, 20, true); entry.setUint16(6, 20, true);
      entry.setUint16(8, 0x0800, true); entry.setUint16(10, 0, true); entry.setUint16(12, time, true);
      entry.setUint16(14, date, true); entry.setUint32(16, crc, true); entry.setUint32(20, data.length, true);
      entry.setUint32(24, data.length, true); entry.setUint16(28, name.length, true);
      entry.setUint32(42, offset, true);
      central.push(entry.buffer, name);
      offset += 30 + name.length + data.length;
    }
    const size = central.reduce((sum, part) => sum + part.byteLength, 0);
    const end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true);
    end.setUint32(12, size, true); end.setUint32(16, offset, true);
    return new Blob([...parts, ...central, end.buffer], { type: "application/zip" });
  }

  async function exportStyle(frame, styleId, report) {
    const scene = frame.contentWindow;
    if (!scene || !scene.__sceneReady || !scene.__exportView) throw new Error("模型尚未载入完成");
    const style = STYLES[styleId];
    const files = [];
    for (let index = 0; index < VIEWS.length; index++) {
      const view = VIEWS[index];
      report(index, VIEWS.length);
      await new Promise(resolve => setTimeout(resolve, 30));
      const width = view.key === "style" ? style.width.scene : style.width[view.kind] ?? 2400;
      const shot = scene.__exportView({ view: view.key === "style" ? style.view : view.key, night: style.night, width });
      const blob = await stylize(styleId, shot, view.kind, 20261119 + index * 97);
      files.push({ name: `${view.name}-${style.name}.jpg`, blob });
    }
    report(VIEWS.length, VIEWS.length);
    return { blob: await zip(files), name: `纳水溪微缩模型-${style.name}.zip`, count: files.length };
  }

  window.NashuixiRender = { STYLES, VIEWS, exportStyle, stylize };
})();
