// components/Admin.jsx
// Panel CRUD compartido para páginas de servicio MAYAM.
// Requiere: React, useLucide (Shared.jsx), makeProjects (Service.jsx)

const ADMIN_EMPTY = {
  client: '', title: '', summary: '', industry: '',
  metric: '', metric_label: '', image_url: '', video_url: '',
  sort_order: 0, status: 'published', service: '',
};

function AdminProjectForm({ project, service, onSave, onClose, saving, showVideo }) {
  const [form, setForm] = React.useState({ ...ADMIN_EMPTY, service, ...project });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  useLucide([]);

  const inputStyle = {
    width: '100%', border: '1px solid var(--border)', borderRadius: 8,
    padding: '9px 12px', fontSize: 14, boxSizing: 'border-box',
    outline: 'none', fontFamily: 'inherit',
  };

  const fields = [
    { key: 'title',        label: 'Título'                },
    { key: 'client',       label: 'Cliente'               },
    { key: 'industry',     label: 'Industria'             },
    { key: 'metric',       label: 'Métrica (ej: −82%)'   },
    { key: 'metric_label', label: 'Etiqueta métrica'      },
    { key: 'image_url',    label: 'URL imagen (opcional)' },
    ...(showVideo ? [{ key: 'video_url', label: 'URL video Instagram (Reel / Post)' }] : []),
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 110, display: 'grid', placeItems: 'center',
      padding: 24, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: 540,
        maxHeight: '92vh', overflow: 'auto', padding: 32,
        boxShadow: '0 32px 64px rgba(0,0,0,0.25)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
            {form.id ? 'Editar proyecto' : 'Nuevo proyecto'}
          </h3>
          <button onClick={onClose} style={{ border: '1px solid var(--border)', background: '#fff', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
            <i data-lucide="x" style={{ width: 16, height: 16 }}></i>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {fields.map(({ key, label }) => (
            <label key={key} style={{ display: 'block' }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>{label}</span>
              <input value={form[key] || ''} onChange={e => set(key, e.target.value)} style={inputStyle} />
            </label>
          ))}

          <label>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>Resumen</span>
            <textarea rows={3} value={form.summary || ''} onChange={e => set('summary', e.target.value)}
              style={{ ...inputStyle, resize: 'vertical' }} />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <label>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>Orden</span>
              <input type="number" value={form.sort_order ?? 0} onChange={e => set('sort_order', Number(e.target.value))} style={inputStyle} />
            </label>
            <label>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>Estatus</span>
              <select value={form.status || 'published'} onChange={e => set('status', e.target.value)} style={inputStyle}>
                <option value="published">published</option>
                <option value="draft">draft</option>
              </select>
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button onClick={() => onSave(form)} disabled={saving}
            style={{ flex: 1, background: 'var(--mayam-blue)', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 0', fontSize: 14, fontWeight: 600, cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.7 : 1, fontFamily: 'inherit' }}>
            {saving ? 'Guardando…' : 'Guardar'}
          </button>
          <button onClick={onClose}
            style={{ border: '1px solid var(--border)', background: '#fff', borderRadius: 8, padding: '11px 18px', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminProjectPanel({ sb, service, onProjectsChange, showVideo }) {
  const [open, setOpen]       = React.useState(false);
  const [list, setList]       = React.useState([]);
  const [editing, setEditing] = React.useState(null);
  const [saving, setSaving]   = React.useState(false);

  useLucide([open, list]);

  React.useEffect(() => {
    function onKey(e) { if (e.ctrlKey && e.shiftKey && e.key === 'E') setOpen(o => !o); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const loadAll = async () => {
    const { data } = await sb.from('agent_projects').select('*')
      .eq('service', service).order('sort_order', { ascending: true });
    setList(data || []);
  };

  const refreshPage = async () => {
    const { data } = await sb.from('agent_projects').select('*')
      .eq('service', service).eq('status', 'published').order('sort_order', { ascending: true });
    if (data && data.length > 0)
      onProjectsChange(data.map((p, i) => ({ ...p, idx: i, metricLabel: p.metric_label || '' })));
    else
      onProjectsChange(makeProjects(service, 6));
  };

  React.useEffect(() => { if (open) loadAll(); }, [open]);

  const handleSave = async (form) => {
    setSaving(true);
    const { id, idx, metricLabel, ...fields } = form;
    fields.service = service;
    if (id) {
      await sb.from('agent_projects').update(fields).eq('id', id);
    } else {
      await sb.from('agent_projects').insert(fields);
    }
    await loadAll();
    await refreshPage();
    setSaving(false);
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este proyecto? Esta acción no se puede deshacer.')) return;
    await sb.from('agent_projects').delete().eq('id', id);
    await loadAll();
    await refreshPage();
  };

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        title="Admin proyectos (Ctrl+Shift+E)"
        style={{
          position: 'fixed', bottom: 88, left: 24, zIndex: 60,
          width: 44, height: 44, borderRadius: '50%',
          background: '#1e293b', color: '#fff',
          border: 'none', cursor: 'pointer', display: 'grid', placeItems: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          opacity: 0.55, transition: 'opacity 200ms',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = 1}
        onMouseLeave={e => e.currentTarget.style.opacity = 0.55}
      >
        <i data-lucide="database" style={{ width: 18, height: 18 }}></i>
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 80, background: 'rgba(0,0,0,0.3)' }} />
          <div style={{
            position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 90,
            width: 480, background: '#fff', overflowY: 'auto',
            boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              padding: '20px 24px', borderBottom: '1px solid var(--border)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: '#fff', position: 'sticky', top: 0, zIndex: 1,
            }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Admin — Proyectos</div>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>
                  {service} · {list.length} registro{list.length !== 1 ? 's' : ''}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setEditing({ ...ADMIN_EMPTY, service })}
                  style={{ fontSize: 13, fontWeight: 600, background: 'var(--mayam-blue)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'inherit' }}>
                  <i data-lucide="plus" style={{ width: 14, height: 14 }}></i> Nuevo
                </button>
                <button onClick={() => setOpen(false)} style={{ border: '1px solid var(--border)', background: '#fff', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
                  <i data-lucide="x" style={{ width: 16, height: 16 }}></i>
                </button>
              </div>
            </div>

            <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {list.length === 0 && (
                <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--fg-muted)' }}>
                  <div style={{ fontSize: 14, marginBottom: 6 }}>Sin proyectos en la base de datos.</div>
                  <div style={{ fontSize: 12 }}>Crea el primero con el botón "Nuevo".</div>
                </div>
              )}
              {list.map(p => (
                <div key={p.id} style={{
                  border: '1px solid var(--border)', borderRadius: 12, padding: '14px 18px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.title || '(sin título)'}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 6 }}>
                      {[p.client, p.industry, `orden: ${p.sort_order ?? '—'}`].filter(Boolean).join(' · ')}
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{
                        display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                        textTransform: 'uppercase', padding: '2px 8px', borderRadius: 999,
                        background: p.status === 'published' ? '#dcfce7' : '#f1f5f9',
                        color: p.status === 'published' ? '#16a34a' : '#64748b',
                      }}>{p.status}</span>
                      {p.video_url && (
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 999, background: '#fce7f3', color: '#be185d' }}>VIDEO</span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <button onClick={() => setEditing(p)} title="Editar"
                      style={{ border: '1px solid var(--border)', background: '#fff', borderRadius: 8, padding: '6px 9px', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
                      <i data-lucide="pencil" style={{ width: 14, height: 14 }}></i>
                    </button>
                    <button onClick={() => handleDelete(p.id)} title="Eliminar"
                      style={{ border: '1px solid #fecaca', background: '#fff', borderRadius: 8, padding: '6px 9px', cursor: 'pointer', display: 'grid', placeItems: 'center', color: '#dc2626' }}>
                      <i data-lucide="trash-2" style={{ width: 14, height: 14 }}></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {editing && (
        <AdminProjectForm
          project={editing}
          service={service}
          onSave={handleSave}
          onClose={() => setEditing(null)}
          saving={saving}
          showVideo={showVideo}
        />
      )}
    </>
  );
}

Object.assign(window, { AdminProjectPanel });
