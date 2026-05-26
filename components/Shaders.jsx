// components/Shaders.jsx
// Fragment-shader sources. Header (version, precision, outColor, uniforms) injected by ShaderWallpaper.
// Exposes: SHADER_PLASMA, SHADER_VORONOI, SHADER_RIPPLES, SHADER_FIELD

const SHADER_PLASMA = `
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f*f*(3.0 - 2.0*f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){
    v += a * vnoise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}
void main(){
  float mn = min(u_res.x, u_res.y);
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / mn;
  vec2 mp = (u_mouse - 0.5 * u_res) / mn;
  float t = u_time * 0.13;

  vec2 toM = mp - uv;
  float md = length(toM);
  vec2 warp = toM * (0.45 / (1.0 + md * 8.0)) * (0.35 + 0.65 * u_mouseDown);

  float shock = 0.0;
  vec3 shockTint = vec3(0.0);
  for (int i = 0; i < 8; i++){
    vec4 c = u_clicks[i];
    if (c.z < 0.0) continue;
    vec2 cp = (c.xy - 0.5 * u_res) / mn;
    float d = length(uv - cp);
    float age = c.z;
    float ring = exp(-pow(d - age * 0.55, 2.0) * 12.0) * exp(-age * 0.55);
    float w = sin(d * 24.0 - age * 7.5) * ring;
    shock += w * 0.55;
    shockTint += vec3(1.0, 0.55, 0.22) * ring * 0.9;
  }

  vec2 p = uv * 1.45 + warp;
  vec2 q1 = vec2(fbm(p + vec2(0.0, t * 2.0)), fbm(p + vec2(5.2, -t * 2.0)));
  vec2 q2 = vec2(fbm(p + 3.4 * q1 + vec2(1.7 + t * 1.3, 9.2)),
                 fbm(p + 3.4 * q1 + vec2(8.3, 2.8 - t * 1.5)));
  float n = fbm(p + 3.6 * q2);
  n += shock;
  n += 0.22 * exp(-md * 4.5) * u_mouseDown;

  vec3 deep  = vec3(0.005, 0.020, 0.085);
  vec3 mid   = vec3(0.0,   0.22,  0.55);
  vec3 hi    = vec3(0.25,  0.85,  1.0);
  vec3 crest = vec3(1.0,   0.62,  0.28);

  vec3 col = mix(deep, mid, smoothstep(0.10, 0.55, n));
  col = mix(col, hi,    smoothstep(0.62, 0.92, n));
  col = mix(col, crest, smoothstep(0.92, 1.10, n) * 0.85);
  col += shockTint * 0.35;

  col += vec3(0.04, 0.10, 0.20) * smoothstep(0.4, -0.6, uv.y);
  col *= 1.0 - 0.32 * dot(uv, uv);

  outColor = vec4(col, 1.0);
}
`;

const SHADER_VORONOI = `
vec2 hash22(vec2 p){
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.y;
  vec2 mp = u_mouse / u_res.y;

  float scale = 7.5;
  vec2 p = uv * scale;
  vec2 ip = floor(p), fp = fract(p);

  float d1 = 8.0, d2 = 8.0;
  vec2 closest = vec2(0.0);
  for (int j = -1; j <= 1; j++){
    for (int i = -1; i <= 1; i++){
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash22(ip + g);
      o = 0.5 + 0.45 * sin(u_time * 0.55 + 6.2831 * o);
      vec2 r = g + o - fp;
      float d = dot(r, r);
      if (d < d1){ d2 = d1; d1 = d; closest = ip + g + o; }
      else if (d < d2){ d2 = d; }
    }
  }
  float edge = sqrt(d2) - sqrt(d1);
  vec2 cellCenter = closest / scale;

  float dM = length(cellCenter - mp);
  float mouseEnergy = exp(-dM * 4.5) * (0.25 + 0.75 * u_mouseDown);

  float pulse = 0.0;
  for (int i = 0; i < 8; i++){
    vec4 c = u_clicks[i];
    if (c.z < 0.0) continue;
    vec2 cp = c.xy / u_res.y;
    float d = length(cellCenter - cp);
    float wave = exp(-pow(d - c.z * 0.42, 2.0) * 40.0) * exp(-c.z * 0.6);
    pulse += wave;
  }

  float energy = clamp(mouseEnergy + pulse, 0.0, 1.4);
  float cellId = fract(sin(dot(closest, vec2(127.1, 311.7))) * 43758.5453);

  float cellMask = smoothstep(0.0, 0.022, edge);
  float edgeGlow = 1.0 - smoothstep(0.0, 0.045, edge);

  vec3 bg     = vec3(0.005, 0.018, 0.07);
  vec3 cellLo = vec3(0.04,  0.11,  0.30);
  vec3 cellHi = vec3(0.22,  0.65,  1.0);
  vec3 warm   = vec3(1.0,   0.62,  0.28);

  vec3 cellCol = mix(cellLo, cellHi, energy);
  cellCol = mix(cellCol, warm, clamp(pulse * 0.95, 0.0, 1.0));
  cellCol *= 0.82 + 0.32 * cellId;

  vec3 col = mix(bg, cellCol, cellMask * (0.32 + 0.68 * energy));
  col += vec3(0.55, 0.85, 1.0) * edgeGlow * (0.22 + 0.95 * energy);
  col += warm * edgeGlow * pulse * 0.65;

  vec2 vc = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  col *= 1.0 - 0.28 * dot(vc, vc);

  outColor = vec4(col, 1.0);
}
`;

const SHADER_RIPPLES = `
float ripple(vec2 uv, vec2 c, float age){
  float d = length(uv - c);
  float front = exp(-pow(d - age * 0.6, 2.0) * 28.0);
  float wave = sin(d * 38.0 - age * 9.5);
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
  vec3 ref = reflect(-lightDir, n);
  float spec = pow(clamp(dot(ref, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 28.0);

  vec3 deep    = vec3(0.005, 0.025, 0.10);
  vec3 shallow = vec3(0.02,  0.20,  0.45);
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
}
`;

const SHADER_FIELD = `
float hashF(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noiseF(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hashF(i);
  float b = hashF(i + vec2(1.0, 0.0));
  float c = hashF(i + vec2(0.0, 1.0));
  float d = hashF(i + vec2(1.0, 1.0));
  vec2 u = f*f*(3.0 - 2.0*f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
vec2 fieldAt(vec2 p){
  vec2 mp = u_mouse / u_res.y;
  vec2 f = vec2(0.0);
  vec2 dM = p - mp;
  float r2 = dot(dM, dM) + 0.006;
  f += dM / r2 * (0.35 + 0.75 * u_mouseDown);
  for (int i = 0; i < 8; i++){
    vec4 c = u_clicks[i];
    if (c.z < 0.0) continue;
    vec2 cp = c.xy / u_res.y;
    vec2 dd = p - cp;
    float rr = dot(dd, dd) + 0.006;
    f -= dd / rr * exp(-c.z * 0.45) * 1.8;
  }
  f += vec2(sin(u_time * 0.18 + p.y * 1.8), cos(u_time * 0.22 + p.x * 1.8)) * 0.18;
  return f;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.y;

  float acc = 0.0;
  float wsum = 0.0;
  float step = 0.009;
  vec2 p = uv;
  for (int i = 0; i < 12; i++){
    vec2 F = fieldAt(p);
    F = F / (length(F) + 1e-5);
    p += F * step;
    float w = exp(-float(i) * 0.16);
    acc += noiseF(p * 78.0 + u_time * 0.4) * w;
    wsum += w;
  }
  p = uv;
  for (int i = 0; i < 12; i++){
    vec2 F = fieldAt(p);
    F = F / (length(F) + 1e-5);
    p -= F * step;
    float w = exp(-float(i) * 0.16);
    acc += noiseF(p * 78.0 + u_time * 0.4) * w;
    wsum += w;
  }
  acc /= wsum * 2.0;
  acc = smoothstep(0.36, 0.66, acc);

  vec2 mp = u_mouse / u_res.y;
  float mGlow = 0.032 / (length(uv - mp) + 0.07) * u_mouseDown;
  float cGlow = 0.0;
  for (int i = 0; i < 8; i++){
    vec4 c = u_clicks[i];
    if (c.z < 0.0) continue;
    vec2 cp = c.xy / u_res.y;
    cGlow += 0.035 / (length(uv - cp) + 0.07) * exp(-c.z * 0.35);
  }

  vec3 bg   = vec3(0.005, 0.018, 0.07);
  vec3 line = vec3(0.52, 0.78, 1.0);
  vec3 warm = vec3(1.0,  0.6,  0.28);

  vec3 col = mix(bg, line, acc);
  col += line * mGlow * 0.55;
  col += warm * cGlow * 0.85;

  vec2 vc = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  col *= 1.0 - 0.30 * dot(vc, vc);

  outColor = vec4(col, 1.0);
}
`;

Object.assign(window, { SHADER_PLASMA, SHADER_VORONOI, SHADER_RIPPLES, SHADER_FIELD });
