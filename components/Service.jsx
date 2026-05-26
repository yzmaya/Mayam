// Service-page components: hero, projects grid (with tweak: grid/list/carousel), CTA

const { useEffect, useState } = React;

function ServiceHero({ eyebrow, title, titleAccent, description, bullets, icon }) {
  useLucide([icon]);
  const ShaderBg = window.ShaderBackground;
  return (
    <section style={{ background: 'var(--mayam-blue)', color: '#fff', position: 'relative', overflow: 'hidden', padding: '80px 0 100px', cursor: 'pointer' }}>
      {ShaderBg && <ShaderBg />}
      <div className="y-decoration" style={{ right: '-10rem', top: '-6rem', fontSize: '44rem', color: '#fff', opacity: 0.06 }}>Y</div>
      <div className="container service-hero-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 999,
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
            fontSize: 12, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
            marginBottom: 28,
          }}>
            <i data-lucide={icon} style={{ width: 14, height: 14 }}></i> {eyebrow}
          </span>
          <h1 style={{
            fontSize: 'clamp(36px, 5.5vw, 68px)', lineHeight: 1.05, letterSpacing: '-0.02em',
            fontWeight: 600, color: '#fff', margin: '0 0 20px 0', textWrap: 'balance',
          }}>
            {title} <span style={{ fontStyle: 'italic', fontWeight: 400, opacity: 0.85 }}>{titleAccent}</span>
          </h1>
          <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.88)', lineHeight: 1.55, margin: '0 0 32px 0', maxWidth: 580 }}>
            {description}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="btn btn-on-blue" href="contacto.html">Agendar diagnóstico</a>
            <a className="btn btn-outline-blue" href="#proyectos">Ver proyectos</a>
          </div>
        </div>
        <div>
          <div style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 16, padding: 28, backdropFilter: 'blur(8px)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
              Lo que entregamos
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {bullets.map(b => (
                <li key={b} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.5 }}>
                  <span style={{ width: 24, height: 24, background: '#fff', color: 'var(--mayam-blue)', borderRadius: 6, display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1 }}>
                    <i data-lucide="check" style={{ width: 14, height: 14, strokeWidth: 2.5 }}></i>
                  </span>
                  <span style={{ color: '#fff' }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 1023px) { .service-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
    </section>
  );
}

function igEmbedUrl(url) {
  if (!url) return null;
  const m = url.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
  return m ? `https://www.instagram.com/p/${m[2]}/embed/` : null;
}

function ProjectModal({ project, onClose }) {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    if (!project) return;
    setImgFailed(false);
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  useEffect(() => {
    if (project && window.lucide) window.lucide.createIcons();
  }, [project]);

  if (!project) return null;

  const colors = [
    ['#005abf', '#4d85e0'],
    ['#003c80', '#1a66cf'],
    ['#002c5e', '#005abf'],
    ['#4a4f54', '#8a8e93'],
  ];
  const [c1, c2] = colors[project.idx % colors.length];
  const igUrl = igEmbedUrl(project.video_url);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(8px)',
        display: 'grid', placeItems: 'center',
        padding: 24,
        animation: 'mayam-fade-in 200ms cubic-bezier(0.2,0,0,1)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 1080, maxHeight: '90vh',
          background: '#fff', borderRadius: 20, overflow: 'hidden',
          display: 'flex', flexDirection: 'row',
          boxShadow: '0 40px 80px rgba(0,0,0,0.35)',
          animation: 'mayam-pop-in 280ms cubic-bezier(0.2,0,0,1.05)',
        }}
        className="project-modal"
      >
        {/* Left: visual */}
        <div style={{
          background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
          color: '#fff', padding: 48, position: 'relative',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          flex: '0 0 52%', minHeight: 0,
        }}>
          {igUrl ? (
            <>
              <iframe src={igUrl} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }} scrolling="no" allowFullScreen />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,44,94,0.78) 0%, transparent 38%, transparent 58%, rgba(0,44,94,0.9) 100%)', pointerEvents: 'none' }} />
            </>
          ) : (
            <>
              {project.image_url && !imgFailed && (
                <>
                  <img src={project.image_url} alt={project.client}
                    onError={() => setImgFailed(true)}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${c1}DD 0%, ${c2}BB 100%)` }} />
                </>
              )}
              <svg viewBox="0 0 200 200" width="80%" height="80%" style={{
                opacity: 0.14, position: 'absolute', right: -40, bottom: -40,
              }}>
                <text x="100" y="170" fontSize="220" fontWeight="700" textAnchor="middle" fill="#fff" fontFamily="var(--font-display)">Y</text>
              </svg>
            </>
          )}
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'inline-block',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)',
              padding: '6px 12px', borderRadius: 999, backdropFilter: 'blur(6px)',
            }}>
              {project.industry} · Proyecto {String(project.idx + 1).padStart(2, '0')}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 13, fontWeight: 500, opacity: 0.85, letterSpacing: '0.04em', marginBottom: 12 }}>
              Cliente
            </div>
            <div style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 32 }}>
              {project.client}
            </div>
            <div style={{ display: 'flex', gap: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.22)' }}>
              <div>
                <div style={{ fontSize: 44, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.03em' }}>{project.metric}</div>
                <div style={{ fontSize: 11, opacity: 0.85, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.14em' }}>{project.metricLabel}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: detail */}
        <div style={{ padding: '48px 48px 40px', display: 'flex', flexDirection: 'column', overflowY: 'auto', minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
            <button onClick={onClose} aria-label="Cerrar" style={{
              width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--border)',
              background: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center',
              color: 'var(--fg-strong)',
            }}>
              <i data-lucide="x" style={{ width: 18, height: 18 }}></i>
            </button>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--mayam-blue)', marginBottom: 12 }}>
            Caso de éxito
          </span>
          <h2 id="project-modal-title" style={{
            fontSize: 30, fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.015em',
            margin: '0 0 20px 0', color: 'var(--neutral-900)',
          }}>
            {project.title}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--fg)', margin: '0 0 28px 0' }}>
            {project.summary}
          </p>

          <div style={{
            background: 'var(--neutral-050)', border: '1px dashed var(--border-strong)',
            borderRadius: 12, padding: 20, marginBottom: 28,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 8 }}>
              Agente conversacional
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--fg-muted)' }}>
              Recuerda que las capacidades de un agente se pueden extender, ya que podrían analizar archivos, visitar sitios web, llenar formularios, responder con voz, generar imagenes, entre muchas otras más.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'Industria', value: project.industry },
              { label: 'Resultado clave', value: `${project.metric} ${project.metricLabel}` },
              { label: 'Estatus', value: 'En operación' },
              { label: 'Fase', value: 'Productivo' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--neutral-900)' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 'auto', flexWrap: 'wrap' }}>
            <a href="contacto.html" className="btn btn-primary" style={{ flex: '1 1 auto' }}>
              Quiero un caso así
              <i data-lucide="arrow-right" style={{ width: 16, height: 16, marginLeft: 6 }}></i>
            </a>
            <button onClick={onClose} className="btn btn-ghost">
              Seguir explorando
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes mayam-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mayam-pop-in {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @media (max-width: 880px) {
          .project-modal { flex-direction: column !important; max-height: 92vh; overflow-y: auto !important; overflow-x: hidden !important; -webkit-overflow-scrolling: touch; }
          .project-modal > div:first-child { flex: 0 0 auto !important; min-height: 240px !important; padding: 32px !important; }
          .project-modal > div:last-child { flex: 0 0 auto !important; padding: 32px !important; overflow-y: visible !important; }
        }
      `}</style>
    </div>
  );
}

function ProjectsSection({ projects, layout, setLayout }) {
  useLucide([layout, projects]);
  const [openProject, setOpenProject] = useState(null);
  return (
    <section id="proyectos" className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
          <div className="section-header" style={{ marginBottom: 0 }}>
            <span className="eyebrow">Proyectos</span>
            <h2>Nuestros casos de éxito reales.</h2>
            <p>Te compartimos, como se ahorran horas de operación, cuando implementas soluciones AI.</p>
          </div>
          <div style={{ display: 'inline-flex', background: 'var(--neutral-050)', border: '1px solid var(--border)', borderRadius: 999, padding: 4 }}>
            {[
              { v: 'grid',     icon: 'layout-grid', label: 'Grilla' },
              { v: 'list',     icon: 'list',         label: 'Lista' },
              { v: 'carousel', icon: 'gallery-horizontal-end', label: 'Carrusel' },
            ].map(opt => (
              <button key={opt.v}
                onClick={() => setLayout(opt.v)}
                style={{
                  border: 0, background: layout === opt.v ? '#fff' : 'transparent',
                  color: layout === opt.v ? 'var(--mayam-blue)' : 'var(--fg-muted)',
                  fontWeight: 600, fontSize: 13, padding: '8px 14px', borderRadius: 999,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  boxShadow: layout === opt.v ? 'var(--shadow-sm)' : 'none',
                  cursor: 'pointer', transition: 'all 200ms',
                }}>
                <i data-lucide={opt.icon} style={{ width: 14, height: 14 }}></i>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {layout === 'grid'     && <ProjectsGrid     projects={projects} onOpen={setOpenProject} />}
        {layout === 'list'     && <ProjectsList     projects={projects} onOpen={setOpenProject} />}
        {layout === 'carousel' && <ProjectsCarousel projects={projects} onOpen={setOpenProject} />}

        <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
      </div>
      <style>{`
        .project-card:hover, .project-card:focus-visible {
          border-color: var(--border-strong) !important;
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          outline: none;
        }
        .project-card:hover .project-thumb-overlay,
        .project-card:focus-visible .project-thumb-overlay { opacity: 1 !important; }
        .project-card:hover .project-card-cta { gap: 10px !important; }
      `}</style>
    </section>
  );
}

function ProjectThumb({ project, ratio = '4/3', showOverlay = false }) {
  const [imgFailed, setImgFailed] = useState(false);
  const colors = [
    ['#005abf', '#4d85e0'],
    ['#003c80', '#1a66cf'],
    ['#002c5e', '#005abf'],
    ['#4a4f54', '#8a8e93'],
  ];
  const [c1, c2] = colors[(project.idx || 0) % colors.length];
  const hasImg = !!project.image_url && !imgFailed;
  return (
    <div className="project-thumb" style={{
      aspectRatio: ratio, borderRadius: 12, overflow: 'hidden',
      background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
      position: 'relative', display: 'grid', placeItems: 'center',
      color: '#fff', fontFamily: 'var(--font-display)',
    }}>
      {hasImg ? (
        <img src={project.image_url} alt={project.client || ''}
          onError={() => setImgFailed(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <>
          <svg viewBox="0 0 200 200" width="60%" height="60%" style={{ opacity: 0.18, position: 'absolute' }}>
            <text x="100" y="160" fontSize="180" fontWeight="700" textAnchor="middle" fill="#fff" fontFamily="var(--font-display)">Y</text>
          </svg>
          <div style={{ position: 'relative', textAlign: 'center', padding: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.8, marginBottom: 8 }}>
              Proyecto {String((project.idx || 0) + 1).padStart(2, '0')}
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.01em', maxWidth: 220 }}>
              {project.client}
            </div>
          </div>
        </>
      )}
      {showOverlay && (
        <div className="project-thumb-overlay" style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, rgba(0,44,94,0) ${hasImg ? '25%' : '40%'}, rgba(0,44,94,0.92) 100%)`,
          opacity: 0, transition: 'opacity 220ms cubic-bezier(0.2,0,0,1)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          padding: 20, color: '#fff',
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, letterSpacing: '0.04em' }}>
            <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', color: 'var(--mayam-blue)', display: 'grid', placeItems: 'center' }}>
              <i data-lucide="arrow-up-right" style={{ width: 16, height: 16, strokeWidth: 2.5 }}></i>
            </span>
            Ver caso
          </div>
          <div style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', backdropFilter: 'blur(6px)' }}>
            {project.industry}
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card"
      onClick={() => onOpen && onOpen(project)}
      tabIndex={0}
      role="button"
      onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && onOpen) { e.preventDefault(); onOpen(project); } }}
      style={{
        background: '#fff', border: '1px solid var(--border)', borderRadius: 16,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        transition: 'all 220ms cubic-bezier(0.2,0,0,1)',
        cursor: onOpen ? 'pointer' : 'default',
      }}
    >
      <ProjectThumb project={project} showOverlay />
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--mayam-blue)', marginBottom: 8 }}>
          {project.industry}
        </span>
        <h3 style={{ fontSize: 19, fontWeight: 600, margin: '0 0 8px 0', letterSpacing: '-0.005em', color: 'var(--neutral-900)' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.55, margin: '0 0 20px 0', flex: 1 }}>
          {project.client} · {project.summary}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 'auto' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--mayam-blue)', lineHeight: 1, letterSpacing: '-0.02em' }}>{project.metric}</div>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{project.metricLabel}</div>
          </div>
          <span className="project-card-cta" style={{
            fontSize: 13, fontWeight: 600, color: 'var(--mayam-blue)',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            transition: 'gap 200ms',
          }}>
            Ver caso <i data-lucide="arrow-right" style={{ width: 14, height: 14 }}></i>
          </span>
        </div>
      </div>
    </article>
  );
}

function ProjectsGrid({ projects, onOpen }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
      {projects.map(p => <ProjectCard key={p.idx} project={p} onOpen={onOpen} />)}
    </div>
  );
}

function ProjectsList({ projects, onOpen }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {projects.map(p => (
        <article key={p.idx}
          onClick={() => onOpen && onOpen(p)}
          tabIndex={0}
          role="button"
          onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && onOpen) { e.preventDefault(); onOpen(p); } }}
          className="project-list-item project-card"
          style={{
            background: '#fff', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden',
            display: 'grid', gridTemplateColumns: '320px 1fr', gap: 0,
            cursor: onOpen ? 'pointer' : 'default',
            transition: 'all 220ms cubic-bezier(0.2,0,0,1)',
          }}>
          <div style={{ minHeight: 220 }}><ProjectThumb project={p} ratio="auto" showOverlay /></div>
          <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--mayam-blue)', marginBottom: 8 }}>
              {p.industry}
            </span>
            <h3 style={{ fontSize: 26, fontWeight: 600, margin: '0 0 8px 0', letterSpacing: '-0.01em' }}>{p.title}</h3>
            <p style={{ fontSize: 16, color: 'var(--fg-muted)', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              {p.client} — {p.summary}
            </p>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 600, color: 'var(--mayam-blue)', lineHeight: 1, letterSpacing: '-0.02em' }}>{p.metric}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{p.metricLabel}</div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--mayam-blue)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Ver caso <i data-lucide="arrow-right" style={{ width: 16, height: 16 }}></i>
              </span>
            </div>
          </div>
        </article>
      ))}
      <style>{`@media (max-width: 767px) { .project-list-item { grid-template-columns: 1fr !important; } .project-list-item > div:first-child { min-height: 180px !important; } }`}</style>
    </div>
  );
}

function ProjectsCarousel({ projects, onOpen }) {
  const ref = React.useRef(null);
  const scroll = (dir) => {
    const el = ref.current; if (!el) return;
    el.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };
  return (
    <div style={{ position: 'relative' }}>
      <div ref={ref} style={{
        display: 'flex', gap: 24, overflowX: 'auto', scrollSnapType: 'x mandatory',
        padding: '4px 4px 24px', margin: '-4px',
        scrollbarWidth: 'thin',
      }}>
        {projects.map(p => (
          <div key={p.idx} style={{ flex: '0 0 340px', scrollSnapAlign: 'start' }}>
            <ProjectCard project={p} onOpen={onOpen} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
        <button onClick={() => scroll(-1)} aria-label="Anterior" style={{
          width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--border)',
          background: '#fff', color: 'var(--fg-strong)', display: 'grid', placeItems: 'center', cursor: 'pointer',
        }}>
          <i data-lucide="arrow-left" style={{ width: 18, height: 18 }}></i>
        </button>
        <button onClick={() => scroll(1)} aria-label="Siguiente" style={{
          width: 44, height: 44, borderRadius: '50%', border: 'none',
          background: 'var(--mayam-blue)', color: '#fff', display: 'grid', placeItems: 'center',
          boxShadow: 'var(--shadow-brand)', cursor: 'pointer',
        }}>
          <i data-lucide="arrow-right" style={{ width: 18, height: 18 }}></i>
        </button>
      </div>
    </div>
  );
}

function ServiceFeatures({ title, subtitle, features }) {
  useLucide([features]);
  return (
    <section className="section section-subtle">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Capacidades</span>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid var(--border)',
              borderRadius: 16, padding: 28,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: 'var(--blue-050)', color: 'var(--mayam-blue)',
                display: 'grid', placeItems: 'center', marginBottom: 20,
              }}>
                <i data-lucide={f.icon} style={{ width: 22, height: 22 }}></i>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 8px 0', letterSpacing: '-0.005em' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.55, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Tweaks integration: layout selection persists via localStorage
function useProjectLayoutTweak() {
  const [layout, setLayout] = useState(() => {
    return localStorage.getItem('mayam-projects-layout') || 'grid';
  });

  useEffect(() => {
    localStorage.setItem('mayam-projects-layout', layout);
  }, [layout]);

  // Listen to tweaks panel
  useEffect(() => {
    function onMsg(e) {
      const d = e.data;
      if (!d || typeof d !== 'object') return;
      if (d.type === '__activate_edit_mode') setShowTweaks(true);
      if (d.type === '__deactivate_edit_mode') setShowTweaks(false);
      if (d.type === 'mayam-set-layout' && d.layout) setLayout(d.layout);
    }
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  return [layout, setLayout];
}

const [, setShowTweaks] = [null, () => {}]; // placeholder used above

// Generate placeholder projects for a given service
function makeProjects(service, count = 6) {
  const TEMPLATES = {
    'agentes-whatsapp': [
      { industry: 'Networking', client: 'BNI México', title: 'BNITO Agente 24/7', summary: 'Atiende, las necesidades de los netwrokers en México.', metric: '−82%', metricLabel: 'tiempo de respuesta' },
      { industry: 'Seguros', client: 'Aseguradora placeholder', title: 'Bot de cotización y siniestros', summary: 'Lee fotos, genera cotizaciones y abre folios.', metric: '4.2×', metricLabel: 'leads cualificados' },
      { industry: 'Bienes raíces', client: 'Inmobiliaria placeholder', title: 'Asistente para visitas', summary: 'Pre-califica compradores antes de pasar al asesor.', metric: '+38%', metricLabel: 'cierre de visitas' },
      { industry: 'Automotriz', client: 'Concesionaria placeholder', title: 'Agente de postventa', summary: 'Recordatorios de servicio, agenda de citas y NPS.', metric: '+24 NPS', metricLabel: 'satisfacción' },
      { industry: 'Servicios', client: 'Despacho placeholder', title: 'Recepción virtual de casos', summary: 'Captura datos, lee documentos y crea expediente.', metric: '−65%', metricLabel: 'horas administrativas' },
      { industry: 'Retail', client: 'Tienda placeholder', title: 'Bot omnicanal de pedidos', summary: 'WhatsApp + Instagram con stock y rastreo en vivo.', metric: '24/7', metricLabel: 'cobertura' },
      { industry: 'Salud', client: 'Clínica placeholder', title: 'Agendador de citas', summary: 'Triage inicial, confirmación y recordatorios.', metric: '+52%', metricLabel: 'asistencia a citas' },
      { industry: 'Logística', client: 'Operador placeholder', title: 'Tracking conversacional', summary: 'Estatus de envíos sin saturar al call center.', metric: '−80%', metricLabel: 'llamadas entrantes' },
    ],
    'capacitacion': [
      { industry: 'Banca', client: 'Banco placeholder', title: 'Adopción de Microsoft 365 Copilot', summary: 'Programa para 800 colaboradores en 6 meses.', metric: '92%', metricLabel: 'adopción activa' },
      { industry: 'Manufactura', client: 'Planta placeholder', title: 'IA aplicada a operaciones', summary: 'Talleres por turno y AI Coach implant.', metric: '6 meses', metricLabel: 'implant' },
      { industry: 'Gobierno', client: 'Dependencia placeholder', title: 'IA para servidores públicos', summary: 'Conferencias y casos prácticos sectorizados.', metric: '450', metricLabel: 'capacitados' },
      { industry: 'Educación', client: 'Institución placeholder', title: 'Gemini para Workspace', summary: 'Para directivos, docentes y administrativos.', metric: '3 niveles', metricLabel: 'contenido' },
      { industry: 'Despachos', client: 'Firma placeholder', title: 'IA para abogados y contadores', summary: 'Casos reales de su práctica diaria.', metric: '+34%', metricLabel: 'productividad' },
      { industry: 'Hotelería', client: 'Cadena placeholder', title: 'IA para áreas comerciales', summary: 'Ventas, marketing y revenue management.', metric: '8 hoteles', metricLabel: 'cobertura' },
      { industry: 'Retail', client: 'Cadena placeholder', title: 'AI Coach implant 90 días', summary: 'Mentoría continua a equipos de líderes.', metric: '90 días', metricLabel: 'acompañamiento' },
      { industry: 'Servicios', client: 'Consultora placeholder', title: 'Programa ejecutivo', summary: 'Curso C-level + caso aplicado al negocio.', metric: '12 sesiones', metricLabel: 'programa' },
    ],
    'maquila-video': [
      { industry: 'Automotriz', client: 'Marca placeholder', title: 'Lanzamiento de modelo 2026', summary: 'Video con IA generativa para campaña digital.', metric: '14 piezas', metricLabel: 'entregadas' },
      { industry: 'Agencia creativa', client: 'Agencia placeholder', title: 'Render para spot TV', summary: 'Maquila en pipeline IA + post tradicional.', metric: '−60%', metricLabel: 'tiempo producción' },
      { industry: 'Casa productora', client: 'Productora placeholder', title: 'Capacitación a equipo interno', summary: 'Workshop de IA generativa para video.', metric: '20 personas', metricLabel: 'capacitadas' },
      { industry: 'Automotriz', client: 'Marca placeholder', title: 'Variantes de creatividad', summary: '36 versiones para A/B en redes.', metric: '36×', metricLabel: 'variaciones' },
      { industry: 'Retail', client: 'Cadena placeholder', title: 'Video shoppable', summary: 'Producción para 12 SKUs en redes sociales.', metric: '12 SKUs', metricLabel: 'piezas' },
      { industry: 'Medios', client: 'Editorial placeholder', title: 'Locución y avatar IA', summary: 'Pieza editorial con avatar para podcast visual.', metric: '8 piezas', metricLabel: 'mensuales' },
    ],
    'consultoria': [
      { industry: 'Banca', client: 'Banco placeholder', title: 'Roadmap de IA a 18 meses', summary: 'Selección de stack y marco de gobernanza.', metric: '18 meses', metricLabel: 'roadmap' },
      { industry: 'Seguros', client: 'Aseguradora placeholder', title: 'Evaluación ética y técnica', summary: 'Define qué SÍ y qué NO automatizar con IA.', metric: '12 procesos', metricLabel: 'analizados' },
      { industry: 'Retail', client: 'Cadena placeholder', title: 'Discovery de casos de uso', summary: 'Workshops por área y matriz de prioridad.', metric: '8 casos', metricLabel: 'priorizados' },
      { industry: 'Logística', client: 'Operador placeholder', title: 'Hoja de ruta operativa', summary: 'Antes de automatizar, ordenamos procesos.', metric: '24 SKUs', metricLabel: 'flujo redefinido' },
      { industry: 'Salud', client: 'Hospital placeholder', title: 'Gobernanza de datos para IA', summary: 'Marco ISO/IEC 42001 aplicado.', metric: 'ISO 42001', metricLabel: 'estándar' },
      { industry: 'Gobierno', client: 'Dependencia placeholder', title: 'Evaluación de proveedores', summary: 'Auditoría técnica de stacks propuestos.', metric: '5 stacks', metricLabel: 'evaluados' },
    ],
  };
  const list = TEMPLATES[service] || TEMPLATES['consultoria'];
  return list.slice(0, count).map((p, idx) => ({ ...p, idx }));
}

// Tweaks panel — minimal floating panel, only layout selection
function MayamTweaksPanel({ open, onClose, layout, setLayout }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 96, right: 24, zIndex: 70,
      background: '#fff', border: '1px solid var(--border)', borderRadius: 16,
      boxShadow: 'var(--shadow-xl)', padding: 24, width: 320,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Tweaks</h3>
        <button onClick={onClose} style={{ border: 0, background: 'transparent', cursor: 'pointer', color: 'var(--fg-muted)' }}>
          <i data-lucide="x" style={{ width: 18, height: 18 }}></i>
        </button>
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 10 }}>
          Layout de proyectos
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { v: 'grid', label: 'Grilla', desc: 'Cards en columnas (3 por fila)' },
            { v: 'list', label: 'Lista', desc: 'Imagen grande + texto al lado' },
            { v: 'carousel', label: 'Carrusel', desc: 'Scroll horizontal con flechas' },
          ].map(opt => (
            <button key={opt.v} onClick={() => setLayout(opt.v)} style={{
              border: layout === opt.v ? '2px solid var(--mayam-blue)' : '1px solid var(--border)',
              background: layout === opt.v ? 'var(--blue-050)' : '#fff',
              padding: '12px 14px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--neutral-900)' }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  ServiceHero, ProjectsSection, ServiceFeatures,
  makeProjects, MayamTweaksPanel,
});
