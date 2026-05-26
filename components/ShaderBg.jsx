// components/ShaderBg.jsx
// WebGL2 Liquid Ripples animated background. Exposes: ShaderBackground

const _VERT = `#version 300 es
in vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const _FRAG = `#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform float u_mouseDown;
uniform vec4  u_clicks[8];

float ripple(vec2 uv, vec2 c, float age){
  float d     = length(uv - c);
  float front = exp(-pow(d - age * 0.6, 2.0) * 28.0);
  float wave  = sin(d * 38.0 - age * 9.5);
  return wave * front * exp(-age * 0.45);
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.y;
  vec2 mp = u_mouse / u_res.y;

  float h = 0.0;
  h += 0.012 * sin(uv.x * 9.0 + u_time * 0.8) * cos(uv.y * 7.0 + u_time * 0.55);

  float md = length(uv - mp);
  h += 0.035 * sin(md * 42.0 - u_time * 5.5) * exp(-md * 5.0) * u_mouseDown;

  for (int i = 0; i < 8; i++){
    vec4 c = u_clicks[i];
    if (c.z < 0.0) continue;
    vec2 cp = c.xy / u_res.y;
    h += ripple(uv, cp, c.z) * 0.5;
  }

  vec2 g = vec2(dFdx(h), dFdy(h)) * 60.0;
  vec3 n = normalize(vec3(-g, 1.0));

  vec3 lightDir = normalize(vec3(0.4, 0.7, 0.9));
  float diff = clamp(dot(n, lightDir), 0.0, 1.0);
  vec3 ref  = reflect(-lightDir, n);
  float spec = pow(clamp(dot(ref, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 28.0);

  /* MAYAM blue palette */
  vec3 deep    = vec3(0.0,  0.10, 0.38);
  vec3 shallow = vec3(0.0,  0.32, 0.72);
  vec3 base = mix(deep, shallow, smoothstep(0.0, 1.5, uv.y + 0.4));
  base *= 0.55 + 0.55 * diff;

  vec3 hi   = vec3(0.55, 0.85, 1.0);
  vec3 warm = vec3(1.0,  0.72, 0.32);

  vec3 col = base;
  col += hi   * spec;
  col += warm * spec * spec * 0.7;

  float caustic = pow(max(0.0, sin(h * 26.0 + u_time * 1.3) * 0.5 + 0.5), 10.0);
  col += vec3(0.3, 0.65, 1.0) * caustic * 0.22;
  col += vec3(0.25, 0.55, 0.95) * exp(-md * 8.0) * 0.18 * u_mouseDown;

  outColor = vec4(col, 1.0);
}`;

function ShaderBackground() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) return; // fallback: hero solid color shows through

    function mkShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }
    const prog = gl.createProgram();
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER,   _VERT));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, _FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes    = gl.getUniformLocation(prog, 'u_res');
    const uTime   = gl.getUniformLocation(prog, 'u_time');
    const uMouse  = gl.getUniformLocation(prog, 'u_mouse');
    const uMD     = gl.getUniformLocation(prog, 'u_mouseDown');
    const uClicks = Array.from({length: 8}, (_, i) => gl.getUniformLocation(prog, `u_clicks[${i}]`));

    let mouse = [0, 0], mouseDown = 0;
    let clicks = Array.from({length: 8}, () => [-1, -1, -1, -1]);
    let lastT = performance.now(), startT = lastT, rafId;

    function resize() {
      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function toGL(clientX, clientY) {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio, 2);
      return [(clientX - r.left) * dpr, (r.height - (clientY - r.top)) * dpr];
    }

    function onMove(e) { mouse = toGL(e.clientX, e.clientY); }
    function onDown(e) {
      mouseDown = 1;
      mouse = toGL(e.clientX, e.clientY);
      const r = canvas.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right &&
          e.clientY >= r.top  && e.clientY <= r.bottom) {
        const slot = clicks.findIndex(c => c[2] < 0);
        if (slot >= 0) clicks[slot] = [mouse[0], mouse[1], 0, 0];
      }
    }
    function onUp() { mouseDown = 0; }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);

    function frame(now) {
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      clicks = clicks.map(c => {
        if (c[2] < 0) return c;
        const a = c[2] + dt;
        return a > 5 ? [-1, -1, -1, -1] : [c[0], c[1], a, 0];
      });
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - startT) / 1000);
      gl.uniform2fv(uMouse, mouse);
      gl.uniform1f(uMD, mouseDown);
      clicks.forEach((c, i) => gl.uniform4fv(uClicks[i], c));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      display: 'block', pointerEvents: 'none',
    }} />
  );
}

Object.assign(window, { ShaderBackground });
