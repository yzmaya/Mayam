/* Componente compartido para páginas individuales de blog.
   Se carga via <script type="text/babel" src="../components/BlogPost.jsx">
   Requiere window.MAYAM_POST con los datos del artículo. */

(function () {
  const { useEffect } = React;

  function AuthorAvatar({ name, size = 42 }) {
    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: 'var(--blue-100)', color: 'var(--mayam-blue)',
        display: 'grid', placeItems: 'center',
        fontWeight: 600, fontSize: size * 0.38, flexShrink: 0,
        border: '2px solid var(--blue-200)',
      }}>{initials}</div>
    );
  }

  function CategoryBadge({ label, icon }) {
    useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'var(--mayam-blue)', background: 'var(--blue-050)',
        padding: '5px 12px', borderRadius: 999,
      }}>
        <i data-lucide={icon} style={{ width: 12, height: 12 }}></i>
        {label}
      </span>
    );
  }

  function renderBlocks(content) {
    if (!Array.isArray(content) || content.length === 0) return null;
    return content.map((block, i) => {
      if (block.type === 'lead') return (
        <p key={i} style={{ fontSize: 18, lineHeight: 1.8, color: 'var(--fg)', margin: '0 0 28px 0', fontWeight: 400 }}>
          {block.text}
        </p>
      );
      if (block.type === 'paragraph') return (
        <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--fg)', margin: '0 0 22px 0' }}>
          {block.text}
        </p>
      );
      if (block.type === 'subheading') return (
        <h2 key={i} style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--neutral-600)', margin: '36px 0 14px 0', textTransform: 'uppercase' }}>
          {block.text}
        </h2>
      );
      if (block.type === 'bullets') return (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '0 0 32px 0' }}>
          {(block.items || []).map((item, j) => (
            <div key={j} style={{
              display: 'flex', gap: 16, alignItems: 'flex-start',
              padding: '18px 20px', borderRadius: 14,
              background: 'var(--neutral-050)', border: '1px solid var(--border)',
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: 'var(--blue-050)', color: 'var(--mayam-blue)',
                display: 'grid', placeItems: 'center',
              }}>
                <i data-lucide={item.icon} style={{ width: 18, height: 18 }}></i>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--neutral-800)', marginBottom: 5 }}>{item.label}</div>
                <div style={{ fontSize: 15, color: 'var(--fg-muted)', lineHeight: 1.65 }}>{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      );
      if (block.type === 'question') return (
        <div key={i} style={{
          borderLeft: '3px solid var(--mayam-blue)',
          paddingLeft: 24, margin: '32px 0',
          color: 'var(--fg-strong)', fontSize: 17, lineHeight: 1.7,
          fontStyle: 'italic',
        }}>
          {block.text}
        </div>
      );
      return null;
    });
  }

  function ArticlePage() {
    const post = window.MAYAM_POST;
    useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

    if (!post) return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--neutral-050)' }}>
        <p style={{ color: 'var(--fg-muted)', fontSize: 15 }}>Artículo no encontrado.</p>
      </div>
    );

    return (
      <>
        <Header active="blog.html" />
        <main>
          {/* Hero con imagen */}
          <div style={{ position: 'relative', height: 'clamp(340px, 45vw, 560px)', overflow: 'hidden', background: 'var(--blue-900)' }}>
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,18,60,0.95) 0%, rgba(0,18,60,0.45) 50%, transparent 100%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 1200, padding: '0 24px 44px' }}>
              <nav aria-label="Breadcrumb" style={{ marginBottom: 18 }}>
                <ol style={{ display: 'flex', gap: 8, alignItems: 'center', listStyle: 'none', padding: 0, margin: 0, flexWrap: 'wrap' }}>
                  <li><a href="../index.html" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, textDecoration: 'none' }}>Inicio</a></li>
                  <li style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>›</li>
                  <li><a href="../blog.html" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, textDecoration: 'none' }}>Blog</a></li>
                  <li style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>›</li>
                  <li style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 500, maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {post.category}
                  </li>
                </ol>
              </nav>
              <div style={{ marginBottom: 16 }}>
                <CategoryBadge label={post.category} icon={post.categoryIcon} />
              </div>
              <h1 style={{ fontSize: 'clamp(22px, 3.2vw, 42px)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#fff', margin: '0 0 22px 0', maxWidth: 860 }}>
                {post.title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <AuthorAvatar name={post.author} size={42} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{post.author}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{post.date} · {post.readTime}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cuerpo del artículo */}
          <div style={{ maxWidth: 820, margin: '0 auto', padding: '56px 24px 80px' }}>
            {renderBlocks(post.content)}

            {/* CTA */}
            <div style={{ marginTop: 64, padding: '40px 44px', borderRadius: 22, background: 'var(--mayam-blue)', color: '#fff' }}>
              <h3 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 10px 0', color: '#fff' }}>
                ¿Quieres implementar IA en tu empresa?
              </h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.82)', margin: '0 0 24px 0', lineHeight: 1.65 }}>
                En MAYAM acompañamos a empresas en México y Latinoamérica a adoptar inteligencia artificial de forma estratégica y responsable.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="../contacto.html" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#fff', color: 'var(--mayam-blue)',
                  borderRadius: 10, padding: '12px 22px',
                  fontWeight: 600, fontSize: 14, textDecoration: 'none',
                }}>
                  Contactar a MAYAM <i data-lucide="arrow-right" style={{ width: 15, height: 15 }}></i>
                </a>
                <a href="../blog.html" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.12)', color: '#fff',
                  border: '1px solid rgba(255,255,255,0.28)',
                  borderRadius: 10, padding: '12px 22px',
                  fontWeight: 600, fontSize: 14, textDecoration: 'none',
                }}>
                  <i data-lucide="arrow-left" style={{ width: 15, height: 15 }}></i> Más artículos
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppFloat />
      </>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<ArticlePage />);
})();
