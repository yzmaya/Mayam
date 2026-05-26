// Layered / overlap visual sections — 3 patterns inspired by user references
// All respect MAYAM identity: blue (#005abf), gray, Montserrat, Y symbol decoration.

const { useEffect: _useEffect } = React;

// =================================================================
// PATTERN 1 — Stacked / overlapping service cards
// 3 cards: middle card taller and elevated, sides slightly back
// =================================================================
function LayeredCards() {
  _useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, []);

  const cards = [
    {
      title: 'Software a la medida',
      desc: 'Construimos plataformas, integraciones y CRMs que se ajustan a tu operación. 10 años haciendo software, ahora con agentes integrados.',
      cta: 'Iniciar proyecto',
      icons: ['code-2', 'database', 'cloud', 'cpu'],
      tone: 'dark',
    },
    {
      title: 'Agentes IA para WhatsApp y ventas',
      desc: 'Imagina agentes que califican leads, agendan visitas y emiten cotizaciones. Reducen tareas manuales hasta un 65% y liberan a tu equipo comercial para cerrar más.',
      cta: 'Solicitar demo gratis',
      icons: ['message-circle', 'play', 'bot', 'workflow'],
      tone: 'brand', // featured
    },
    {
      title: 'Capacitación corporativa',
      desc: 'Programas in-company para que tu equipo adopte IA en su día a día. Conferencias, talleres y AI Coaches implant durante 90 días.',
      cta: 'Diseñar programa',
      icons: ['graduation-cap', 'users', 'share-2', 'thumbs-up'],
      tone: 'dark',
    },
  ];

  return (
    <section className="layered-cards-section">
      <div className="lc-bg-mesh" aria-hidden="true"></div>
      <div className="lc-window" aria-hidden="true">
        <div className="lc-window-bar">
          <span></span><span></span><span></span>
        </div>
      </div>

      <div className="container" style={{ position: 'relative' }}>
        <div className="section-header" style={{ marginBottom: 40, textAlign: 'center', marginInline: 'auto' }}>
          <span className="eyebrow" style={{ color: '#a8c4f5' }}>Soluciones MAYAM</span>
          <h2 style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.015em' }}>
            Tres formas de poner la IA a trabajar
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            Software hecho a la medida, agentes que conversan, equipos que aprenden. Suma las tres y tienes una operación nueva.
          </p>
        </div>

        <div className="lc-stack">
          {cards.map((c, i) => (
            <article
              key={i}
              className={`lc-card ${c.tone === 'brand' ? 'lc-card-brand' : 'lc-card-dark'} lc-card-${i}`}
            >
              <h3 className="lc-card-title">{c.title}</h3>
              <p className="lc-card-desc">{c.desc}</p>
              <a className="lc-card-cta" href="contacto.html">
                {c.cta}
                <span className="lc-card-cta-arrow">»</span>
              </a>
              <div className="lc-card-icons">
                {c.icons.map((ic, j) => (
                  <span key={j} className={`lc-icon-blob lc-icon-blob-${j}`}>
                    <i data-lucide={ic}></i>
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .layered-cards-section {
          position: relative;
          background: #050a1c;
          padding: 96px 0 120px;
          overflow: hidden;
          isolation: isolate;
        }
        .lc-bg-mesh {
          position: absolute; inset: 0;
          background:
            radial-gradient(60% 40% at 20% 10%, rgba(0, 90, 191, 0.35), transparent 60%),
            radial-gradient(50% 50% at 90% 20%, rgba(77, 133, 224, 0.20), transparent 70%),
            radial-gradient(40% 60% at 50% 100%, rgba(0, 75, 160, 0.30), transparent 60%);
          pointer-events: none;
        }
        .lc-window {
          position: absolute; inset: 60px 6vw auto 6vw; height: 80%;
          border-radius: 24px;
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          z-index: 0;
        }
        .lc-window-bar {
          display: flex; gap: 8px;
          padding: 18px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .lc-window-bar span {
          width: 12px; height: 12px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }
        .lc-window-bar span:nth-child(1) { background: #ff5f57; }
        .lc-window-bar span:nth-child(2) { background: #febc2e; }
        .lc-window-bar span:nth-child(3) { background: #28c840; }

        .lc-stack {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
          margin-top: 80px;
          align-items: stretch;
        }

        .lc-card {
          position: relative;
          padding: 40px 28px 36px;
          border-radius: 22px;
          backdrop-filter: blur(14px);
          display: flex; flex-direction: column;
          transition: transform 240ms var(--ease-standard);
        }
        .lc-card-dark {
          background: linear-gradient(180deg, rgba(20, 24, 40, 0.85), rgba(10, 14, 30, 0.92));
          border: 1px solid rgba(255,255,255,0.08);
          color: #fff;
        }
        .lc-card-brand {
          background: linear-gradient(180deg, #2a7fd9 0%, #005abf 100%);
          border: 1px solid rgba(255,255,255,0.18);
          color: #fff;
          box-shadow: 0 30px 80px rgba(0, 90, 191, 0.45), 0 0 0 1px rgba(255,255,255,0.05) inset;
        }
        .lc-card-0 { transform: translateY(40px) translateX(28px); z-index: 2; }
        .lc-card-1 { transform: translateY(-20px); z-index: 3; padding-top: 56px; padding-bottom: 56px; }
        .lc-card-2 { transform: translateY(60px) translateX(-28px); z-index: 1; }

        .lc-card:hover { transform: translateY(-8px) !important; }
        .lc-card-1:hover { transform: translateY(-32px) !important; }

        .lc-card-title {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.15;
          margin: 0 0 16px 0;
          color: #fff;
          text-align: center;
        }
        .lc-card-desc {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255,255,255,0.78);
          margin: 0 0 28px 0;
          text-align: center;
          flex: 1;
        }
        .lc-card-brand .lc-card-desc { color: rgba(255,255,255,0.92); }

        .lc-card-cta {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          align-self: stretch;
          background: rgba(0,0,0,0.35);
          color: #fff;
          padding: 14px 18px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.12);
          margin-bottom: 20px;
          transition: background 200ms;
        }
        .lc-card-brand .lc-card-cta {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.3);
        }
        .lc-card-cta:hover { background: rgba(255,255,255,0.15); color: #fff; text-decoration: none; }
        .lc-card-brand .lc-card-cta:hover { background: rgba(255,255,255,0.28); }
        .lc-card-cta-arrow { font-weight: 400; opacity: 0.85; }

        .lc-card-icons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-top: auto;
        }
        .lc-icon-blob {
          aspect-ratio: 1;
          border-radius: 14px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.08);
          display: grid; place-items: center;
          color: rgba(255,255,255,0.85);
        }
        .lc-card-brand .lc-icon-blob {
          background: rgba(255,255,255,0.16);
          border-color: rgba(255,255,255,0.22);
        }
        .lc-icon-blob i { width: 20px; height: 20px; }

        @media (max-width: 899px) {
          .lc-stack { grid-template-columns: 1fr; gap: 16px; }
          .lc-card-0, .lc-card-1, .lc-card-2 {
            transform: none !important;
          }
          .lc-window { display: none; }
        }
      `}</style>
    </section>
  );
}

// =================================================================
// PATTERN 2 — Team composition with chart bars + floating cards
// Black-and-white silhouettes overlap with bars + 2 floating tags.
// =================================================================
function TeamComposition() {
  _useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, []);

  const team = [
    { name: 'Nombre placeholder', role: 'Director general', svg: 'man-formal' },
    { name: 'Nombre placeholder', role: 'Director de IA', svg: 'man-casual' },
    { name: 'Nombre placeholder', role: 'Directora de operaciones', svg: 'woman-formal' },
  ];

  // Bars heights for the chart
  const bars = [
    { h: 200, x: 18, color: 'rgba(40, 50, 70, 0.7)' },
    { h: 280, x: 32, color: 'rgba(50, 60, 80, 0.75)' },
    { h: 360, x: 46, color: 'rgba(40, 50, 70, 0.7)' },
    { h: 320, x: 60, color: 'rgba(50, 60, 80, 0.65)' },
    { h: 420, x: 74, color: '#003c80' },
  ];

  return (
    <section className="team-composition-section">
      <div className="container" style={{ position: 'relative' }}>
        <div className="tc-stage">
          {/* Floating top-left card */}
          <div className="tc-floater tc-floater-tl">
            <div className="tc-floater-icon">
              <i data-lucide="search-code"></i>
            </div>
            <h3>Soluciones <span style={{ color: 'var(--mayam-blue)' }}>tech-driven</span> para escalar</h3>
            <p>Software con arquitectura de agentes IA</p>
          </div>

          {/* Floating top-right card with image bg */}
          <div className="tc-floater tc-floater-tr">
            <div className="tc-floater-image" aria-hidden="true">
              <svg viewBox="0 0 120 80" width="100%" height="100%">
                <defs>
                  <linearGradient id="tcGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1a66cf"/>
                    <stop offset="100%" stopColor="#001d3f"/>
                  </linearGradient>
                </defs>
                <rect width="120" height="80" fill="url(#tcGrad)"/>
                <g stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" fill="none">
                  {[...Array(12)].map((_,i)=>(
                    <line key={i} x1={i*10} y1="0" x2={i*10} y2="80"/>
                  ))}
                  {[...Array(8)].map((_,i)=>(
                    <line key={'h'+i} x1="0" y1={i*10} x2="120" y2={i*10}/>
                  ))}
                </g>
                <circle cx="60" cy="40" r="14" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8"/>
                <circle cx="60" cy="40" r="5" fill="#fff"/>
              </svg>
            </div>
            <p>Automatización de procesos con <strong>IA para empresas</strong></p>
          </div>

          {/* Trend arrow */}
          <svg className="tc-trend" viewBox="0 0 600 240" aria-hidden="true">
            <path d="M40 200 Q200 180 320 100 T560 30" stroke="var(--mayam-blue)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <polygon points="552,22 568,30 552,42" fill="var(--mayam-blue)" />
          </svg>

          {/* Bars chart */}
          <div className="tc-bars" aria-hidden="true">
            {bars.map((b, i) => (
              <div key={i} className="tc-bar" style={{ height: b.h, left: `${b.x}%`, background: b.color }}></div>
            ))}
          </div>

          {/* Caption tag in the middle */}
          <div className="tc-caption-tag">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--mayam-blue)' }}></span>
            Agentes IA para marketing y ventas
          </div>

          {/* Team silhouettes */}
          <div className="tc-team-row">
            {team.map((m, i) => (
              <div key={i} className={`tc-person tc-person-${i}`}>
                <PersonSilhouette variant={m.svg} />
                <div className="tc-person-meta">
                  <div className="tc-person-role">{m.role}</div>
                  <div className="tc-person-name">{m.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .team-composition-section {
          background: #06081a;
          color: #fff;
          padding: 80px 0 100px;
          overflow: hidden;
          position: relative;
        }
        .team-composition-section::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(60% 50% at 50% 60%, rgba(0,90,191,0.18), transparent 70%);
          pointer-events: none;
        }
        .tc-stage {
          position: relative;
          min-height: 720px;
        }

        .tc-floater {
          position: absolute;
          background: rgba(15, 18, 35, 0.85);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 24px;
          backdrop-filter: blur(14px);
          z-index: 5;
          width: 230px;
        }
        .tc-floater-tl { top: 30px; left: 0; }
        .tc-floater-tl h3 {
          font-family: var(--font-display);
          font-size: 22px; font-weight: 600;
          line-height: 1.15; letter-spacing: -0.01em;
          margin: 16px 0 8px 0; color: #fff;
        }
        .tc-floater-tl p {
          font-size: 12.5px; color: rgba(255,255,255,0.7);
          margin: 0; line-height: 1.5;
        }
        .tc-floater-icon {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, var(--blue-300), var(--mayam-blue));
          border-radius: 14px;
          display: grid; place-items: center;
          box-shadow: 0 12px 28px rgba(0,90,191,0.4);
        }
        .tc-floater-icon i { width: 28px; height: 28px; color: #fff; }

        .tc-floater-tr {
          top: 30px; right: 0;
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 0;
          padding: 0;
          width: 320px;
          overflow: hidden;
        }
        .tc-floater-image { width: 100px; height: 100px; }
        .tc-floater-tr p {
          align-self: center;
          padding: 16px 18px;
          font-size: 14px; line-height: 1.4;
          color: #fff;
          margin: 0;
          background: rgba(255,255,255,0.04);
        }

        .tc-trend {
          position: absolute;
          top: 80px; left: 22%;
          width: 50%;
          height: 240px;
          z-index: 2;
          opacity: 0.8;
        }

        .tc-bars {
          position: absolute;
          left: 0; right: 0; bottom: 90px;
          height: 460px;
          z-index: 1;
        }
        .tc-bar {
          position: absolute; bottom: 0;
          width: 9%;
          border-radius: 6px 6px 0 0;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .tc-caption-tag {
          position: absolute;
          left: 50%; top: 320px;
          transform: translateX(-50%);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          padding: 10px 18px;
          font-size: 14px; font-weight: 500;
          display: inline-flex; align-items: center; gap: 10px;
          backdrop-filter: blur(8px);
          z-index: 6;
          white-space: nowrap;
        }

        .tc-team-row {
          position: absolute;
          inset: auto 0 0 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding: 0 8%;
          z-index: 4;
          align-items: end;
          gap: 0;
        }
        .tc-person {
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
        }
        .tc-person-meta { margin-top: 14px; }
        .tc-person-role {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--blue-300);
          margin-bottom: 4px;
        }
        .tc-person-name {
          font-family: var(--font-display);
          font-size: 18px; font-weight: 600; color: #fff;
          letter-spacing: -0.005em;
        }

        @media (max-width: 899px) {
          .tc-floater-tl, .tc-floater-tr { position: relative; top: auto; left: auto; right: auto; width: 100%; margin-bottom: 16px; }
          .tc-floater-tr { grid-template-columns: 80px 1fr; }
          .tc-trend, .tc-bars, .tc-caption-tag { display: none; }
          .tc-team-row { position: relative; padding: 0; gap: 16px; margin-top: 40px; }
          .tc-stage { min-height: auto; }
        }
      `}</style>
    </section>
  );
}

function PersonSilhouette({ variant }) {
  // Stylized B&W person illustration as SVG
  const id = `pg-${variant}-${Math.random().toString(36).slice(2,7)}`;
  return (
    <svg viewBox="0 0 200 320" width="100%" height="320" style={{ maxWidth: 200 }} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d8d8d8"/>
          <stop offset="60%" stopColor="#888"/>
          <stop offset="100%" stopColor="#1a1a1a"/>
        </linearGradient>
      </defs>
      {/* shadow */}
      <ellipse cx="100" cy="310" rx="60" ry="6" fill="rgba(0,0,0,0.3)"/>
      {/* head */}
      <ellipse cx="100" cy="60" rx="32" ry="36" fill={`url(#${id})`}/>
      {/* neck */}
      <rect x="88" y="92" width="24" height="20" fill={`url(#${id})`}/>
      {/* shoulders / torso */}
      {variant === 'woman-formal' ? (
        <path d="M40 320 L 50 160 Q 100 130 150 160 L 160 320 Z" fill={`url(#${id})`}/>
      ) : (
        <path d="M30 320 L 38 165 Q 100 130 162 165 L 170 320 Z" fill={`url(#${id})`}/>
      )}
      {/* arms crossed (subtle suggestion) */}
      {variant !== 'woman-formal' && (
        <path d="M50 200 Q 100 185 150 200 L 150 220 Q 100 205 50 220 Z" fill="rgba(0,0,0,0.45)"/>
      )}
      {/* highlight */}
      <ellipse cx="92" cy="50" rx="12" ry="14" fill="rgba(255,255,255,0.18)"/>
    </svg>
  );
}

// =================================================================
// PATTERN 3 — Showcase: laptop + mobile + curl + floating shield cards
// =================================================================
function ShowcaseDevices({ title, subtitle, points }) {
  _useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, []);

  const defaultPoints = [
    { num: '10+', headline: 'años en el mercado', body: 'Desarrollando software empresarial y, desde 2022, implementando IA generativa.' },
    { num: '500+', headline: 'agentes y proyectos', body: 'Implementaciones documentadas en banca, retail, automotriz, salud y gobierno.' },
    { num: '98%', headline: 'retención de clientes', body: 'Tasa promedio de continuidad después del primer engagement.' },
  ];
  const items = points || defaultPoints;

  return (
    <section className="showcase-devices-section">
      <div className="container" style={{ position: 'relative' }}>
        <div className="section-header" style={{ marginBottom: 48, textAlign: 'center', marginInline: 'auto' }}>
          <span className="eyebrow" style={{ color: 'var(--blue-300)' }}>{subtitle || 'Casos demostrados'}</span>
          <h2 style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 44px)' }}>
            {title || 'Trabajo entregado, no demos vacías'}
          </h2>
        </div>

        <div className="sd-grid">
          {/* Left: stacked devices */}
          <div className="sd-devices">
            {/* Laptop */}
            <div className="sd-laptop">
              <div className="sd-laptop-screen">
                <div className="sd-browser-bar">
                  <span></span><span></span><span></span>
                  <div className="sd-url">mayam.mx/casos</div>
                </div>
                <div className="sd-laptop-content">
                  <div className="sd-mock-hero"></div>
                  <div className="sd-mock-cards">
                    {[0,1,2,3].map(i => <div key={i} className="sd-mock-card"></div>)}
                  </div>
                </div>
              </div>
              <div className="sd-laptop-base"></div>
            </div>

            {/* Phone overlapping */}
            <div className="sd-phone">
              <div className="sd-phone-notch"></div>
              <div className="sd-phone-screen">
                <div className="sd-phone-header">Caso · Retail</div>
                <div className="sd-phone-product"></div>
                <div className="sd-phone-line w80"></div>
                <div className="sd-phone-line w60"></div>
                <div className="sd-phone-line w70"></div>
                <div className="sd-phone-cta">Ver detalle</div>
              </div>
            </div>

            {/* Curled paper / brochure peek */}
            <div className="sd-curl" aria-hidden="true">
              <svg viewBox="0 0 200 110" width="200" height="110">
                <defs>
                  <linearGradient id="curlGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff"/>
                    <stop offset="50%" stopColor="#e6eefb"/>
                    <stop offset="100%" stopColor="#bfd4f5"/>
                  </linearGradient>
                </defs>
                <path d="M10 20 Q 50 0 100 18 Q 150 36 190 14 L 192 90 Q 150 110 100 92 Q 50 74 8 95 Z"
                      fill="url(#curlGrad)" stroke="rgba(0,0,0,0.06)" strokeWidth="1"/>
                <rect x="30" y="38" width="60" height="6" rx="3" fill="var(--mayam-blue)" opacity="0.6"/>
                <rect x="30" y="50" width="100" height="3" rx="1.5" fill="rgba(0,90,191,0.3)"/>
                <rect x="30" y="58" width="80" height="3" rx="1.5" fill="rgba(0,90,191,0.3)"/>
                <rect x="30" y="66" width="90" height="3" rx="1.5" fill="rgba(0,90,191,0.3)"/>
              </svg>
            </div>
          </div>

          {/* Right: shield cards */}
          <div className="sd-points">
            {items.map((p, i) => (
              <div key={i} className={`sd-point sd-point-${i}`}>
                <div className="sd-shield">
                  <ShieldGlyph num={i + 1} />
                </div>
                <div className="sd-point-text">
                  <div className="sd-point-headline">
                    <strong style={{ color: 'var(--blue-300)' }}>{p.num}</strong> {p.headline}
                  </div>
                  <div className="sd-point-body">{p.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .showcase-devices-section {
          background: #050a1c;
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }
        .showcase-devices-section::before {
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(50% 50% at 0% 50%, rgba(0,90,191,0.20), transparent 60%),
            radial-gradient(40% 60% at 100% 50%, rgba(77,133,224,0.18), transparent 60%);
          pointer-events: none;
        }
        .sd-grid {
          position: relative;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: center;
        }

        /* DEVICES */
        .sd-devices {
          position: relative;
          height: 420px;
        }

        .sd-laptop {
          position: absolute;
          left: 0; top: 30px;
          width: 480px; max-width: 100%;
          z-index: 2;
        }
        .sd-laptop-screen {
          background: #fff;
          border: 8px solid #1a1a1a;
          border-radius: 12px 12px 4px 4px;
          aspect-ratio: 16/10;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }
        .sd-laptop-base {
          height: 14px;
          background: linear-gradient(180deg, #2a2a2a, #1a1a1a);
          border-radius: 0 0 14px 14px;
          margin: 0 -20px;
          position: relative;
        }
        .sd-laptop-base::after {
          content: ''; position: absolute;
          left: 50%; top: 0;
          transform: translateX(-50%);
          width: 90px; height: 4px;
          background: rgba(0,0,0,0.5);
          border-radius: 0 0 6px 6px;
        }
        .sd-browser-bar {
          background: #f0f1f3;
          padding: 8px 12px;
          display: flex; align-items: center; gap: 6px;
          border-bottom: 1px solid #d6d9dc;
        }
        .sd-browser-bar span { width: 10px; height: 10px; border-radius: 50%; }
        .sd-browser-bar span:nth-child(1) { background: #ff5f57; }
        .sd-browser-bar span:nth-child(2) { background: #febc2e; }
        .sd-browser-bar span:nth-child(3) { background: #28c840; }
        .sd-url {
          margin-left: 14px; flex: 1;
          background: #fff;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 11px; color: var(--fg-muted);
          font-family: var(--font-mono);
        }
        .sd-laptop-content { padding: 14px; }
        .sd-mock-hero {
          height: 80px;
          background: linear-gradient(135deg, var(--mayam-blue), var(--blue-700));
          border-radius: 6px;
          margin-bottom: 10px;
        }
        .sd-mock-cards {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;
        }
        .sd-mock-card {
          aspect-ratio: 1;
          background: linear-gradient(180deg, #f6f7f8, #eceef0);
          border-radius: 4px;
          border: 1px solid #d6d9dc;
        }

        .sd-phone {
          position: absolute;
          right: 20px; bottom: 0;
          width: 180px;
          background: #1a1a1a;
          border-radius: 22px;
          padding: 8px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          z-index: 3;
        }
        .sd-phone-notch {
          width: 50px; height: 4px;
          background: #000;
          margin: 0 auto 6px;
          border-radius: 999px;
        }
        .sd-phone-screen {
          background: #fff;
          border-radius: 16px;
          padding: 14px 12px;
          aspect-ratio: 9/17;
        }
        .sd-phone-header {
          font-size: 11px; font-weight: 600;
          color: var(--mayam-blue);
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 10px;
        }
        .sd-phone-product {
          height: 90px;
          background: linear-gradient(135deg, var(--blue-100), var(--blue-300));
          border-radius: 8px;
          margin-bottom: 10px;
        }
        .sd-phone-line {
          height: 6px; background: #eceef0; border-radius: 3px; margin-bottom: 6px;
        }
        .sd-phone-line.w80 { width: 80%; }
        .sd-phone-line.w60 { width: 60%; }
        .sd-phone-line.w70 { width: 70%; }
        .sd-phone-cta {
          margin-top: 10px;
          background: var(--mayam-blue);
          color: #fff;
          font-size: 9px; font-weight: 600;
          text-align: center;
          padding: 6px;
          border-radius: 6px;
        }

        .sd-curl {
          position: absolute;
          left: 200px; bottom: -30px;
          z-index: 4;
          filter: drop-shadow(0 16px 30px rgba(0,0,0,0.45));
          transform: rotate(-4deg);
        }

        /* SHIELDS */
        .sd-points {
          display: flex; flex-direction: column;
          gap: 18px;
          position: relative;
          z-index: 5;
        }
        .sd-point {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 18px;
          align-items: center;
          padding: 18px 22px 18px 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          color: #fff;
        }
        .sd-point-1 {
          /* highlighted middle */
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,0.18);
          transform: translateX(-30px);
          padding-block: 26px;
        }
        .sd-point-1 .sd-point-headline { color: #fff; }
        .sd-point-headline {
          font-size: 16px; font-weight: 500;
          color: rgba(255,255,255,0.85);
          line-height: 1.4;
          margin-bottom: 4px;
        }
        .sd-point-1 .sd-point-headline { font-size: 18px; }
        .sd-point-body {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          line-height: 1.5;
        }
        .sd-shield {
          width: 64px; height: 78px;
          display: grid; place-items: center;
        }
        .sd-shield svg { width: 100%; height: 100%; }

        @media (max-width: 899px) {
          .sd-grid { grid-template-columns: 1fr; }
          .sd-devices { height: 360px; }
          .sd-laptop { width: 100%; }
          .sd-phone { right: 0; }
          .sd-curl { left: auto; right: 10px; bottom: -50px; }
          .sd-point-1 { transform: none; }
        }
      `}</style>
    </section>
  );
}

function ShieldGlyph({ num }) {
  return (
    <svg viewBox="0 0 64 80" aria-hidden="true">
      <defs>
        <linearGradient id={`shield-${num}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfc4cc"/>
          <stop offset="50%" stopColor="#7d8390"/>
          <stop offset="100%" stopColor="#2a3142"/>
        </linearGradient>
      </defs>
      <path d="M32 4 L 60 14 L 60 38 Q 60 60 32 76 Q 4 60 4 38 L 4 14 Z"
            fill={`url(#shield-${num})`} stroke="#0a0e1a" strokeWidth="1"/>
      <path d="M32 18 L 24 36 L 32 32 L 40 36 Z" fill="var(--mayam-blue)"/>
      <path d="M32 4 L 60 14 L 60 38 Q 60 60 32 76 Q 4 60 4 38 L 4 14 Z"
            fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
    </svg>
  );
}

Object.assign(window, { LayeredCards, TeamComposition, ShowcaseDevices });
