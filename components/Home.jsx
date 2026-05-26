// Home page sections for MAYAM site

const HOME_SERVICES = [
  {
    href: 'agentes-whatsapp.html',
    eyebrow: 'Automatización',
    title: 'Agentes para WhatsApp',
    desc: 'Bots multimodales que leen texto, audio, video, PDF e imagen. Atienden a tus clientes, leen tickets, generan facturas y envían correos — 24/7.',
    bullets: ['Atención multimodal 24/7', 'Lectura de tickets y documentos', 'Integrado a CRM y correo'],
    icon: 'message-circle',
  },
  {
    href: 'capacitacion.html',
    eyebrow: 'Formación corporativa',
    title: 'Capacitación',
    desc: 'Talleres y conferencias para personal operativo, ejecutivo y directivo. AI Coaches que se quedan implant en tu empresa para acelerar la adopción.',
    bullets: ['Microsoft 365 Copilot', 'Gemini en Google Workspace', 'AI Coaches as a service'],
    icon: 'graduation-cap',
  },
  {
    href: 'maquila-video.html',
    eyebrow: 'Producción con IA',
    title: 'Maquila de video con IA',
    desc: 'Producción para agencias de marketing y casas productoras. Casos documentados en sector automotriz. También capacitamos a tu equipo interno.',
    bullets: ['Video con IA generativa', 'Casos en automotriz', 'Capacitación interna'],
    icon: 'video',
  },
  {
    href: 'consultoria.html',
    eyebrow: 'Estrategia',
    title: 'Consultoría',
    desc: 'Recomendación de stack, evaluación de límites técnicos y éticos, definición de hoja de ruta para proyectos de IA con foco en ROI real.',
    bullets: ['Selección de stack', 'Marco ético y técnico', 'Roadmap de adopción'],
    icon: 'compass',
  },
];

const CLIENT_LOGOS = [
  { src: 'assets/fonts/daimler.png',        alt: 'Daimler',  scale: 2.2 },
  { src: 'assets/fonts/bnilogob.svg',       alt: 'BNI',      scale: 0.85 },
  { src: 'assets/fonts/logosan-aire-1.png', alt: 'San Aire', scale: 1.1 },
  { src: 'assets/fonts/sep.png',            alt: 'SEP',      scale: 1.2 },
  { src: 'assets/fonts/smacve-logo.png',    alt: 'SMACVE',   scale: 1.4 },
  { src: 'assets/fonts/uamlogo.gif',        alt: 'UAM',      scale: 0.9 },
];

function HeroSplit() {
  useLucide();
  const Bg = window.ShaderWallpaper;
  const plasma = window.SHADER_PLASMA;
  return (
    <section className="hero" style={{
      paddingTop: 'var(--space-20)', paddingBottom: 'var(--space-16)',
      position: 'relative', overflow: 'hidden', background: '#05080f',
    }}>
      {Bg && plasma && <Bg fragSrc={plasma} />}
      <div className="y-decoration" style={{ right: '-8rem', top: '-4rem', fontSize: '40rem', color: '#fff', opacity: 0.025 }}>Y</div>
      <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }}>
        <div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', marginBottom: 24,
            padding: '6px 14px', borderRadius: 999,
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            fontSize: 12, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.82)',
          }}>IA aplicada · México</span>
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 76px)',
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
            fontWeight: 600,
            margin: '0 0 24px 0',
            color: '#fff',
            textWrap: 'balance',
          }}>
            Inteligencia artificial<br />que <span style={{ color: '#7ec1ff', fontStyle: 'italic', fontWeight: 500 }}>de verdad</span><br />trabaja para ti.
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.55, color: 'rgba(255,255,255,0.68)', maxWidth: 540, margin: '0 0 36px 0' }}>
            10 años haciendo software. 4 implementando IA. Diseñamos, integramos y operamos agentes, capacitación y video con IA para empresas mexicanas.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
            <a className="btn btn-primary" href="contacto.html">
              Agendar diagnóstico <i data-lucide="arrow-right" style={{ width: 18, height: 18 }}></i>
            </a>
            <a className="btn btn-secondary" href="#servicios" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
              Conocer servicios
            </a>
          </div>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            {[
              { num: '10+', label: 'Años en software' },
              { num: '4+',  label: 'Años en IA' },
              { num: 'MX',  label: 'Hecho en México' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 38, fontWeight: 600, color: '#7ec1ff', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.num}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.52)', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <WhatsAppMockup />
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .hero .container { grid-template-columns: 1fr !important; gap: var(--space-12) !important; }
        }
      `}</style>
    </section>
  );
}

function WhatsAppMockup() {
  // Stylized WhatsApp chat showing the agent in action
  const messages = [
    { from: 'them', text: 'Hola, ¿tienen disponibilidad para 50 personas el sábado?', t: '10:42' },
    { from: 'us',   text: '¡Hola! Sí, tenemos sala para 60 personas a las 19:00. Te paso cotización en seguida.', t: '10:42' },
    { from: 'us',   text: 'Cotización-2026-001.pdf', file: true, t: '10:43' },
    { from: 'them', text: 'Perfecto. ¿Puedes mandarme la factura a contabilidad@empresa.mx?', t: '10:45' },
    { from: 'us',   text: 'Listo. Factura emitida y enviada. ¿Confirmamos la reserva?', t: '10:45' },
  ];
  return (
    <div style={{
      background: '#075E54',
      borderRadius: 28,
      padding: 14,
      boxShadow: '0 30px 80px rgba(0, 90, 191, 0.18), 0 8px 24px rgba(21, 23, 26, 0.12)',
      maxWidth: 420,
      marginInline: 'auto',
      position: 'relative',
    }}>
      {/* notch */}
      <div style={{ width: 100, height: 6, background: '#000', borderRadius: 999, margin: '0 auto 10px' }}></div>

      <div style={{ background: '#ECE5DD', borderRadius: 20, overflow: 'hidden', minHeight: 540 }}>
        {/* header */}
        <div style={{ background: '#075E54', color: '#fff', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <i data-lucide="arrow-left" style={{ width: 18, height: 18 }}></i>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'var(--mayam-blue)', color: '#fff',
            display: 'grid', placeItems: 'center', fontWeight: 700, fontFamily: 'var(--font-display)',
            fontSize: 15, letterSpacing: '0.08em',
          }}>M</div>
          <div style={{ flex: 1, lineHeight: 1.2 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Agente MAYAM</div>
            <div style={{ fontSize: 12, opacity: 0.85, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, background: '#4ade80', borderRadius: '50%' }}></span>
              en línea · responde al instante
            </div>
          </div>
          <i data-lucide="video" style={{ width: 20, height: 20 }}></i>
          <i data-lucide="phone" style={{ width: 18, height: 18 }}></i>
        </div>

        {/* messages */}
        <div style={{
          padding: 16, display: 'flex', flexDirection: 'column', gap: 8,
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          minHeight: 460,
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.from === 'us' ? 'flex-end' : 'flex-start',
              background: m.from === 'us' ? '#DCF8C6' : '#fff',
              padding: m.file ? '8px 10px' : '8px 12px',
              borderRadius: 8,
              maxWidth: '78%',
              fontSize: 14,
              boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
              color: '#111',
              lineHeight: 1.4,
            }}>
              {m.file ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, background: '#fff', borderRadius: 8, display: 'grid', placeItems: 'center', border: '1px solid rgba(0,0,0,0.08)' }}>
                    <i data-lucide="file-text" style={{ width: 18, height: 18, color: 'var(--mayam-blue)' }}></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 500 }}>{m.text}</div>
                    <div style={{ fontSize: 11, color: '#667781' }}>PDF · 124 KB</div>
                  </div>
                </div>
              ) : m.text}
              <div style={{ fontSize: 10, color: '#667781', textAlign: 'right', marginTop: 2 }}>{m.t} {m.from === 'us' && '✓✓'}</div>
            </div>
          ))}
          {/* typing indicator */}
          <div style={{ alignSelf: 'flex-start', background: '#fff', padding: '10px 14px', borderRadius: 8, boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)', display: 'flex', gap: 4 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width: 6, height: 6, background: '#999', borderRadius: '50%',
                animation: `bounce 1.2s infinite ${i * 0.15}s`,
              }}></span>
            ))}
          </div>
        </div>
      </div>

      {/* floating badge */}
      <div style={{
        position: 'absolute', top: 32, right: -32,
        background: '#fff', borderRadius: 12, padding: '12px 16px',
        boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 32, height: 32, background: 'var(--blue-050)', borderRadius: 8, display: 'grid', placeItems: 'center' }}>
          <i data-lucide="zap" style={{ width: 18, height: 18, color: 'var(--mayam-blue)' }}></i>
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Tiempo respuesta</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--neutral-900)' }}>1.2 seg</div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 60, left: -28,
        background: '#fff', borderRadius: 12, padding: '10px 14px',
        boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 28, height: 28, background: 'var(--blue-050)', borderRadius: '50%', display: 'grid', placeItems: 'center' }}>
          <i data-lucide="check" style={{ width: 16, height: 16, color: 'var(--mayam-blue)' }}></i>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Cotización emitida</div>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>sin intervención humana</div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function LogoStrip() {
  return (
    <section style={{ background: 'var(--neutral-050)', padding: '40px 0', borderBlock: '1px solid var(--border)' }}>
      <div className="container">
        <p style={{
          textAlign: 'center', fontSize: 12, fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--fg-muted)', margin: '0 0 24px 0',
        }}>
          Empresas que confían en MAYAM
        </p>
        <style>{`
          .logo-item img { filter: grayscale(100%) contrast(0.7); transition: filter 0.3s ease; }
          .logo-item:hover img { filter: none; }
        `}</style>
        <div style={{
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 32, alignItems: 'center',
        }}>
          {CLIENT_LOGOS.map((logo, i) => (
            <div key={i} className="logo-item" style={{
              width: 160, height: 72,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '10px 18px', boxSizing: 'border-box',
            }}>
              <img
                src={logo.src}
                alt={logo.alt}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block', transform: `scale(${logo.scale || 1})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  useLucide();
  const pains = [
    { icon: 'help-circle', text: 'No sabes por dónde empezar a adoptar IA' },
    { icon: 'users-round', text: 'Tu equipo no usa las herramientas que ya pagaste' },
    { icon: 'clock-alert', text: 'Los comerciales no responden a tiempo' },
    { icon: 'eye-off',     text: 'No tienes visibilidad de los leads' },
    { icon: 'split',       text: 'Cada vendedor trabaja distinto' },
    { icon: 'message-square-warning', text: 'WhatsApp es un caos sin control' },
  ];
  return (
    <section className="section section-subtle">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Diagnóstico</span>
          <h2>El problema: tu operación funciona,<br />pero nadie ve el panorama completo.</h2>
          <p>Cada área trabaja a su manera y la tecnología que ya pagaste se usa al 30%. Antes de automatizar, hay que ordenar.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {pains.map((p, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid var(--border)',
              borderRadius: 12, padding: '20px 22px',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: 'var(--blue-050)', color: 'var(--mayam-blue)',
                display: 'grid', placeItems: 'center', flexShrink: 0,
              }}>
                <i data-lucide={p.icon} style={{ width: 22, height: 22 }}></i>
              </div>
              <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--fg-strong)', lineHeight: 1.4 }}>
                {p.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  useLucide();
  return (
    <section id="servicios" className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Nuestros servicios</span>
          <h2>Cuatro formas en que la IA puede trabajar en tu empresa.</h2>
          <p>No vendemos productos. Diseñamos, integramos y operamos. Te quedamos como socio técnico, no como proveedor de SaaS.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {HOME_SERVICES.map((s, i) => (
            <a key={s.href} href={s.href} className="service-card" style={{
              background: i === 0 ? 'var(--mayam-blue)' : '#fff',
              color: i === 0 ? '#fff' : 'inherit',
              border: i === 0 ? 'none' : '1px solid var(--border)',
              borderRadius: 16,
              padding: 32,
              textDecoration: 'none',
              display: 'flex', flexDirection: 'column',
              transition: 'all 200ms cubic-bezier(0.2,0,0,1)',
              position: 'relative', overflow: 'hidden',
              boxShadow: i === 0 ? 'var(--shadow-brand)' : 'none',
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: i === 0 ? 'rgba(255,255,255,0.15)' : 'var(--blue-050)',
                color: i === 0 ? '#fff' : 'var(--mayam-blue)',
                display: 'grid', placeItems: 'center', marginBottom: 24,
              }}>
                <i data-lucide={s.icon} style={{ width: 26, height: 26 }}></i>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: i === 0 ? 'rgba(255,255,255,0.8)' : 'var(--fg-muted)', marginBottom: 8,
              }}>{s.eyebrow}</span>
              <h3 style={{
                fontSize: 26, fontWeight: 600, margin: '0 0 12px 0', letterSpacing: '-0.01em',
                color: i === 0 ? '#fff' : 'var(--neutral-900)',
              }}>{s.title}</h3>
              <p style={{
                fontSize: 15, lineHeight: 1.55, margin: '0 0 20px 0',
                color: i === 0 ? 'rgba(255,255,255,0.9)' : 'var(--fg-muted)',
                flex: 1,
              }}>{s.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0' }}>
                {s.bullets.map(b => (
                  <li key={b} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '6px 0', fontSize: 14, fontWeight: 500,
                    color: i === 0 ? 'rgba(255,255,255,0.95)' : 'var(--fg-strong)',
                  }}>
                    <i data-lucide="check" style={{ width: 16, height: 16, flexShrink: 0 }}></i>
                    {b}
                  </li>
                ))}
              </ul>
              <span style={{
                fontSize: 14, fontWeight: 600,
                color: i === 0 ? '#fff' : 'var(--mayam-blue)',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                Ver detalle <i data-lucide="arrow-right" style={{ width: 16, height: 16 }}></i>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  useLucide();
  return (
    <section className="section section-blue" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="y-decoration" style={{ left: '-10rem', bottom: '-8rem', fontSize: '40rem', color: '#fff', opacity: 0.04 }}>Y</div>
      <div className="container" style={{ position: 'relative' }}>
        <div className="section-header" style={{ maxWidth: 720 }}>
          <span className="eyebrow">Impacto demostrado</span>
          <h2 style={{ color: '#fff' }}>Resultados medibles.</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)' }}>
            Cada implementación se mide. Si no mueve un indicador real de tu negocio, no la hicimos bien.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          {[
            { num: '−65%', label: 'Reducción en tareas manuales', sub: 'Automatización promedio en clientes' },
            { num: '24/7', label: 'Disponibilidad de agentes', sub: 'Respuesta promedio: 1.2 seg' },
            { num: '3.8×', label: 'ROI estimado en 90 días', sub: 'Casos documentados' },
            { num: '+500K', label: 'Conversaciones procesadas', sub: 'Por agentes en producción' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 16,
              padding: 28,
              backdropFilter: 'blur(8px)',
            }}>
              <div style={{ fontSize: 48, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.025em', color: '#fff' }}>
                {s.num}
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, marginTop: 12, color: '#fff' }}>{s.label}</div>
              <div style={{ fontSize: 13, marginTop: 6, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  useLucide();
  const steps = [
    { n: '01', title: 'Entendemos tu operación', desc: 'Mapeamos procesos, identificamos cuellos de botella y definimos dónde la IA aporta y dónde no.' },
    { n: '02', title: 'Implementamos a la medida', desc: 'Definimos flujos, gobernanza de datos e integraciones reales. Sin demos bonitas que se rompen en producción.' },
    { n: '03', title: 'Acompañamos y medimos', desc: 'Probamos, medimos uso, corregimos. Te quedamos con AI Coaches implant hasta que la solución se opera sola.' },
  ];
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Cómo trabajamos</span>
          <h2>Hacemos que la IA trabaje para ti, no al revés.</h2>
          <p>Primero ordenamos, luego automatizamos. Trabajamos bajo marcos internacionales como la ISO/IEC 42001.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, position: 'relative' }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ position: 'relative' }}>
              <div style={{
                fontSize: 80, fontWeight: 600, lineHeight: 1,
                color: 'var(--blue-050)', letterSpacing: '-0.04em',
                fontFamily: 'var(--font-display)',
                marginBottom: 16,
              }}>{s.n}</div>
              <h3 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 12px 0', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0 }}>{s.desc}</p>
              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute', top: 36, right: -16,
                  width: 32, height: 2, background: 'var(--border)',
                  display: 'none',
                }} className="step-arrow"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const NEWSLETTER_URL = 'https://script.google.com/macros/s/AKfycbwa3bed3F5X7SYgQDby2nY1PZRQbUl8NjW4HR-KtkcTsghdfbCffcOWjDuTh89OyCxwOQ/exec';

function NewsletterSection() {
  useLucide();
  const [email,  setEmail]  = React.useState('');
  const [status, setStatus] = React.useState('idle'); // idle | loading | done

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res  = await fetch(NEWSLETTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, source: 'index' }).toString(),
      });
      const data = await res.json();
      setStatus(data.status === 'duplicate' ? 'duplicate' : 'done');
    } catch (_) {
      setStatus('done');
    }
  };

  return (
    <section className="section section-subtle">
      <div className="container">
        <div style={{
          background: '#fff', border: '1px solid var(--border)', borderRadius: 24,
          padding: 'clamp(32px, 5vw, 64px)',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center',
          boxShadow: 'var(--shadow-sm)',
        }} className="newsletter-grid">
          <div>
            <span className="eyebrow">Newsletter MAYAM</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', margin: '8px 0 16px 0', letterSpacing: '-0.015em' }}>
              IA aplicada, Blog y casos de éxito.
            </h2>
            <p style={{ fontSize: 17, color: 'var(--fg-muted)', lineHeight: 1.6, margin: '0 0 24px 0' }}>
              Casos reales, herramientas que probamos en clientes y aprendizajes de implementaciones.
            </p>
            {status === 'done' || status === 'duplicate' ? (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 20px', borderRadius: 10,
                background: status === 'duplicate' ? 'var(--neutral-050)' : 'var(--blue-050)',
                border: `1px solid ${status === 'duplicate' ? 'var(--border)' : 'var(--blue-100)'}`,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: status === 'duplicate' ? 'var(--fg-muted)' : 'var(--mayam-blue)',
                  color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0,
                }}>
                  <i data-lucide={status === 'duplicate' ? 'info' : 'check'} style={{ width: 16, height: 16, strokeWidth: 2.5 }}></i>
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: status === 'duplicate' ? 'var(--fg-strong)' : 'var(--mayam-blue)' }}>
                  {status === 'duplicate'
                    ? 'Este correo ya está suscrito.'
                    : '¡Listo! Te avisamos con cada edición.'}
                </span>
              </div>
            ) : (
              <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <input
                  type="email" placeholder="tu@empresa.mx" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  style={{
                    flex: 1, minWidth: 220, padding: '14px 18px',
                    border: '1px solid var(--border)', borderRadius: 8,
                    fontSize: 15, fontFamily: 'inherit', outline: 'none',
                    transition: 'border-color 200ms',
                    opacity: status === 'loading' ? 0.6 : 1,
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--mayam-blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Enviando…' : 'Suscribirme'}
                </button>
              </form>
            )}
            <p style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 16 }}>
              Cero spam. Cancelas cuando quieras.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{
              background: 'var(--neutral-050)', borderRadius: 12, padding: 24,
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.7,
              color: 'var(--fg-strong)',
            }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <span style={{ width: 10, height: 10, background: '#ff5f57', borderRadius: '50%' }}></span>
                <span style={{ width: 10, height: 10, background: '#febc2e', borderRadius: '50%' }}></span>
                <span style={{ width: 10, height: 10, background: '#28c840', borderRadius: '50%' }}></span>
              </div>
              <div><span style={{ color: 'var(--mayam-blue)' }}>De:</span> hola@mayam.mx</div>
              <div><span style={{ color: 'var(--mayam-blue)' }}>Asunto:</span> Edición #14 — Cómo medimos un agente</div>
              <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '12px 0' }} />
              <div style={{ color: 'var(--fg-muted)' }}>
                Este mes: por qué medir &lt;90 ms latencia es trampa, qué hicimos con un cliente del sector seguros, y la prompt que cambió el tono de un bot…
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 767px) { .newsletter-grid { grid-template-columns: 1fr !important; gap: 24px !important; } }`}</style>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section section-blue" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="y-decoration" style={{ right: '-6rem', top: '-4rem', fontSize: '32rem', color: '#fff', opacity: 0.06 }}>Y</div>
      <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 800 }}>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', margin: '0 0 16px 0', letterSpacing: '-0.02em', fontWeight: 600 }}>
          Todo es posible.
        </h2>
        <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.85)', margin: '0 0 36px 0', lineHeight: 1.5 }}>
          Cuéntanos qué intentas resolver. En una llamada de 30 minutos sabremos si la IA es la respuesta — y si no, te lo decimos.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a className="btn btn-on-blue" href="contacto.html">Agendar diagnóstico</a>
          <a className="btn btn-outline-blue" href="https://api.whatsapp.com/send/?phone=525500000000" target="_blank" rel="noopener">
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  HeroSplit, LogoStrip, ProblemSection, ServicesSection,
  ImpactSection, ProcessSection, NewsletterSection, CTASection,
  HOME_SERVICES,
});
