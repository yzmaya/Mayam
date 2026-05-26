// Shared components for MAYAM site (Header, Footer, WhatsApp Float, Logo)
// Loaded as Babel script. Exposes: Header, Footer, WhatsAppFloat, MayamLogo, useLucide

const { useEffect, useState } = React;

function useLucide(deps = []) {
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, deps);
}

function MayamLogo({ height = 38, color = 'primary' }) {
  // We render the actual PNG logo. 'primary' = blue+gray on white. 'white' = blue version inverted.
  const src = color === 'white'
    ? 'assets/logo-negative-blue.png'
    : 'assets/logo-primary.png';
  return <img src={src} alt="MAYAM" style={{ height, width: 'auto' }} />;
}

const SERVICES_LINKS = [
  { href: 'agentes-whatsapp.html', label: 'Agentes para WhatsApp', icon: 'message-circle', sub: 'Bots multimodales 24/7' },
  { href: 'capacitacion.html',     label: 'Capacitación',          icon: 'graduation-cap', sub: 'Talleres y AI Coaches' },
  { href: 'maquila-video.html',    label: 'Maquila de video con IA', icon: 'video', sub: 'Producción para agencias' },
  { href: 'consultoria.html',      label: 'Consultoría',          icon: 'compass', sub: 'Stack, ética, hoja de ruta' },
];

const NAV_LINKS = [
  { href: 'index.html', label: 'Inicio' },
  { type: 'dropdown', label: 'Servicios', items: SERVICES_LINKS },
  { href: 'nosotros.html', label: 'Nosotros' },
  { href: 'blog.html', label: 'Blog' },
  { href: 'contacto.html', label: 'Contacto' },
];

function Header({ active }) {
  useLucide();
  return (
    <header className="site-header">
      <div className="container">
        <a href="index.html" aria-label="MAYAM" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <MayamLogo />
        </a>
        <nav className="site-nav" aria-label="Principal">
          {NAV_LINKS.map((item, i) => {
            if (item.type === 'dropdown') {
              return (
                <div key={i} className="nav-dropdown">
                  <button className="nav-dropdown-trigger" aria-haspopup="true">
                    {item.label} <i data-lucide="chevron-down" style={{ width: 14, height: 14 }}></i>
                  </button>
                  <div className="nav-dropdown-menu" role="menu">
                    {item.items.map(s => (
                      <a key={s.href} href={s.href} className={active === s.href ? 'active' : ''}>
                        <span className="icon-wrap"><i data-lucide={s.icon} style={{ width: 18, height: 18 }}></i></span>
                        <span>
                          <span style={{ display: 'block' }}>{s.label}</span>
                          <span style={{ display: 'block', fontSize: 12, color: 'var(--fg-muted)', fontWeight: 400 }}>{s.sub}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <a key={item.href} href={item.href} className={active === item.href ? 'active' : ''}>
                {item.label}
              </a>
            );
          })}
        </nav>
        <a className="btn btn-primary" href="contacto.html" style={{ padding: '10px 18px', fontSize: 14 }}>
          Agendar diagnóstico
        </a>
      </div>
    </header>
  );
}

function Footer() {
  useLucide();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ marginBottom: 16 }}>
              <img src="assets/logo-negative-blue.png" alt="MAYAM" style={{ height: 36, opacity: 0.95 }} />
            </div>
            <p style={{ margin: 0, lineHeight: 1.6, fontSize: 14, maxWidth: 320 }}>
              Inteligencia artificial accesible para empresas mexicanas. 10 años haciendo software, 4 implementando IA.
            </p>
            <p style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Todo es posible
            </p>
          </div>
          <div>
            <h4>Servicios</h4>
            {SERVICES_LINKS.map(s => <a key={s.href} href={s.href}>{s.label}</a>)}
          </div>
          <div>
            <h4>Empresa</h4>
            <a href="nosotros.html">Nosotros</a>
            <a href="contacto.html">Contacto</a>
            <a href="#">Casos de éxito</a>
            <a href="blog.html">Blog</a>
          </div>
          <div>
            <h4>Contacto</h4>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>
              Villa Cacama 18,<br />
              Villa de Aragón,<br />
              Gustavo A. Madero,<br />
              07570 CDMX, México
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <a href="#" aria-label="LinkedIn"><i data-lucide="linkedin-icon" style={{ width: 20, height: 20 }}></i></a>
              <a href="#" aria-label="Instagram"><i data-lucide="instagram-icon" style={{ width: 20, height: 20 }}></i></a>
              <a href="#" aria-label="YouTube"><i data-lucide="youtube-icon" style={{ width: 20, height: 20 }}></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MAYAM. Todos los derechos reservados.</span>
          <span>Hecho en México</span>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href="https://api.whatsapp.com/send/?phone=525615016936&text=Hola%20MAYAM,%20me%20interesa%20conocer%20sus%20servicios"
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    </a>
  );
}

Object.assign(window, { Header, Footer, WhatsAppFloat, MayamLogo, useLucide, SERVICES_LINKS });
