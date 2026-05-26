// components/ParticlesBg.jsx
// WebGL2 shader runner + particle constellation wallpaper. Exposes: ShaderWallpaper, ParticleWallpaper, WallpaperHint

const VERT_SRC = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG_HEADER = `#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_mouseDown;
uniform vec4 u_clicks[8];
`;

function ShaderWallpaper({ fragSrc, hint }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false, premultipliedAlpha: false });
    if (!gl) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#15171a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#b3b7bb";
        ctx.font = "14px Montserrat, sans-serif";
        ctx.fillText("WebGL2 not available", 16, 24);
      }
      return;
    }

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(s));
      }
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT_SRC));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG_HEADER + fragSrc));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Link error:", gl.getProgramInfoLog(prog));
    }

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(prog);
    const uRes       = gl.getUniformLocation(prog, "u_res");
    const uTime      = gl.getUniformLocation(prog, "u_time");
    const uMouse     = gl.getUniformLocation(prog, "u_mouse");
    const uMouseDown = gl.getUniformLocation(prog, "u_mouseDown");
    const uClicks    = gl.getUniformLocation(prog, "u_clicks");

    const state = { mouse: [0, 0], target: 0, mouseDown: 0, clicks: [], start: performance.now() };

    const px = (e) => {
      const r = canvas.getBoundingClientRect();
      const sx = canvas.width / r.width;
      const sy = canvas.height / r.height;
      return [(e.clientX - r.left) * sx, canvas.height - (e.clientY - r.top) * sy];
    };
    const onMove  = (e) => { state.mouse = px(e); state.target = 1; };
    const onEnter = (e) => { onMove(e); };
    const onLeave = ()  => { state.target = 0; };
    const onDown  = (e) => {
      onMove(e);
      state.clicks.push({ x: state.mouse[0], y: state.mouse[1], t0: performance.now() });
      if (state.clicks.length > 8) state.clicks.shift();
    };
    canvas.addEventListener("pointermove",  onMove);
    canvas.addEventListener("pointerenter", onEnter);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown",  onDown);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.max(2, Math.floor(r.width  * dpr));
      canvas.height = Math.max(2, Math.floor(r.height * dpr));
      if (state.mouse[0] === 0 && state.mouse[1] === 0)
        state.mouse = [canvas.width / 2, canvas.height / 2];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const cbuf = new Float32Array(32);
    let raf;
    const frame = () => {
      const now = performance.now();
      const t = (now - state.start) * 0.001;
      state.mouseDown += (state.target - state.mouseDown) * 0.08;
      while (state.clicks.length && (now - state.clicks[0].t0) * 0.001 > 6.0)
        state.clicks.shift();

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, state.mouse[0], state.mouse[1]);
      gl.uniform1f(uMouseDown, state.mouseDown);

      for (let i = 0; i < 8; i++) {
        const c = state.clicks[i];
        if (c) {
          cbuf[i * 4 + 0] = c.x; cbuf[i * 4 + 1] = c.y;
          cbuf[i * 4 + 2] = (now - c.t0) * 0.001; cbuf[i * 4 + 3] = 1.0;
        } else {
          cbuf[i * 4 + 0] = 0; cbuf[i * 4 + 1] = 0;
          cbuf[i * 4 + 2] = -1.0; cbuf[i * 4 + 3] = 0;
        }
      }
      gl.uniform4fv(uClicks, cbuf);
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove",  onMove);
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown",  onDown);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
      gl.deleteVertexArray(vao);
    };
  }, [fragSrc]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#05080f" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%", cursor: "crosshair", touchAction: "none" }}
      />
      {hint ? <WallpaperHint {...hint} /> : null}
    </div>
  );
}

function WallpaperHint({ name, sub, action }) {
  return (
    <div style={{
      position: "absolute", left: 24, bottom: 24,
      color: "rgba(255,255,255,0.92)", fontFamily: "Montserrat, sans-serif",
      pointerEvents: "none", textShadow: "0 1px 12px rgba(0,0,0,0.6)", userSelect: "none",
    }}>
      <div style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, opacity: 0.7, marginBottom: 6 }}>{sub}</div>
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 10 }}>{name}</div>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase",
        padding: "6px 10px", background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.18)", borderRadius: 999, fontWeight: 500,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "#7ec1ff", boxShadow: "0 0 8px #7ec1ff" }}></span>
        {action}
      </div>
    </div>
  );
}

function ParticleWallpaper({ hint }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const state = { particles: [], mouse: { x: 0, y: 0, active: false }, ripples: [], raf: 0 };

    const init = () => {
      state.particles = [];
      const density = (canvas.width * canvas.height) / 6500;
      const N = Math.min(420, Math.max(120, Math.floor(density)));
      for (let i = 0; i < N; i++) {
        state.particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          hue: 200 + Math.random() * 40,
        });
      }
    };

    const resize = () => {
      const r   = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.max(2, Math.floor(r.width  * dpr));
      canvas.height = Math.max(2, Math.floor(r.height * dpr));
      ctx.fillStyle = "#03060f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      init();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const toPx = (e) => {
      const r  = canvas.getBoundingClientRect();
      const sx = canvas.width  / r.width;
      const sy = canvas.height / r.height;
      return [(e.clientX - r.left) * sx, (e.clientY - r.top) * sy];
    };
    const onMove  = (e) => { const [x, y] = toPx(e); state.mouse.x = x; state.mouse.y = y; state.mouse.active = true; };
    const onLeave = ()  => { state.mouse.active = false; };
    const onDown  = (e) => {
      onMove(e);
      state.ripples.push({ x: state.mouse.x, y: state.mouse.y, t0: performance.now() });
      if (state.ripples.length > 6) state.ripples.shift();
    };
    canvas.addEventListener("pointermove",  onMove);
    canvas.addEventListener("pointerenter", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown",  onDown);

    let last = performance.now();
    const frame = (now) => {
      const dt = Math.min(40, now - last);
      last = now;

      ctx.fillStyle = "rgba(3, 6, 15, 0.16)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mx = state.mouse.x, my = state.mouse.y, active = state.mouse.active;
      state.ripples = state.ripples.filter((r) => (now - r.t0) < 4500);

      ctx.globalCompositeOperation = "lighter";

      for (const p of state.particles) {
        if (active) {
          const dx = mx - p.x, dy = my - p.y;
          const d2 = dx * dx + dy * dy + 4000;
          const f  = 22000 / d2;
          p.vx += (-dy / Math.sqrt(d2) * f + dx / Math.sqrt(d2) * f * 0.18) * 0.04;
          p.vy += ( dx / Math.sqrt(d2) * f + dy / Math.sqrt(d2) * f * 0.18) * 0.04;
        }

        for (const r of state.ripples) {
          const age    = (now - r.t0) / 1000;
          const radius = age * 320;
          const dx = p.x - r.x, dy = p.y - r.y;
          const d  = Math.sqrt(dx * dx + dy * dy) + 0.001;
          const band = Math.exp(-Math.pow(d - radius, 2) / 1800) * Math.exp(-age * 0.45);
          if (band > 0.005) { p.vx += (dx / d) * band * 7.0; p.vy += (dy / d) * band * 7.0; }
        }

        const tt = now * 0.00035;
        p.vx += Math.sin(p.y * 0.0035 + tt)        * 0.025;
        p.vy += Math.cos(p.x * 0.0035 + tt * 1.1)  * 0.025;
        p.vx *= 0.965; p.vy *= 0.965;
        p.x  += p.vx * dt * 0.08;
        p.y  += p.vy * dt * 0.08;

        if (p.x < -10) p.x += canvas.width  + 20; else if (p.x > canvas.width  + 10) p.x -= canvas.width  + 20;
        if (p.y < -10) p.y += canvas.height + 20; else if (p.y > canvas.height + 10) p.y -= canvas.height + 20;

        const sp     = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const a      = Math.min(0.95, 0.25 + sp * 0.45);
        const radius = 1.1 + Math.min(2.4, sp * 0.6);

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3.2);
        g.addColorStop(0,   `hsla(${p.hue}, 100%, 78%, ${a})`);
        g.addColorStop(0.5, `hsla(${p.hue}, 100%, 65%, ${a * 0.25})`);
        g.addColorStop(1,   `hsla(${p.hue}, 100%, 60%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const r of state.ripples) {
        const age    = (now - r.t0) / 1000;
        const radius = age * 320;
        const alpha  = Math.exp(-age * 0.6) * 0.55;
        ctx.strokeStyle = `rgba(255, 170, 90, ${alpha})`;
        ctx.lineWidth   = 2 * (window.devicePixelRatio || 1);
        ctx.beginPath(); ctx.arc(r.x, r.y, radius, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = `rgba(255, 220, 160, ${alpha * 0.5})`;
        ctx.lineWidth   = 1 * (window.devicePixelRatio || 1);
        ctx.beginPath(); ctx.arc(r.x, r.y, radius * 0.85, 0, Math.PI * 2); ctx.stroke();
      }

      if (active) {
        const aura = ctx.createRadialGradient(mx, my, 0, mx, my, 140);
        aura.addColorStop(0,   "rgba(120, 180, 255, 0.35)");
        aura.addColorStop(0.5, "rgba(120, 180, 255, 0.08)");
        aura.addColorStop(1,   "rgba(120, 180, 255, 0)");
        ctx.fillStyle = aura;
        ctx.beginPath(); ctx.arc(mx, my, 140, 0, Math.PI * 2); ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      state.raf = requestAnimationFrame(frame);
    };
    state.raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(state.raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove",  onMove);
      canvas.removeEventListener("pointerenter", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown",  onDown);
    };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#03060f" }}>
      <canvas
        ref={ref}
        style={{ display: "block", width: "100%", height: "100%", cursor: "crosshair", touchAction: "none" }}
      />
      {hint ? <WallpaperHint {...hint} /> : null}
    </div>
  );
}

Object.assign(window, { ShaderWallpaper, ParticleWallpaper, WallpaperHint });
