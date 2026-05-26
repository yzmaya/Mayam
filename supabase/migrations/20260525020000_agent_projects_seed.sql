-- Seed data: proyectos de agentes WhatsApp (datos de muestra para probar CRUD)
-- Basados en los placeholders hardcodeados en components/Service.jsx → makeProjects()

insert into agent_projects (title, client, industry, summary, metric, metric_label, sort_order, status) values
  ('BNITO Agente 24/7',          'BNI México',                'Networking',     'Atiende las necesidades de los networkers en México a cualquier hora.',             '−82%',    'tiempo de respuesta',  1, 'published'),
  ('Bot de cotización y siniestros', 'Aseguradora ejemplo',   'Seguros',        'Lee fotos de documentos, genera cotizaciones y abre folios de siniestro.',         '4.2×',    'leads cualificados',   2, 'published'),
  ('Asistente para visitas',     'Inmobiliaria ejemplo',      'Bienes raíces',  'Pre-califica compradores antes de pasarlos al asesor humano.',                      '+38%',    'cierre de visitas',    3, 'published'),
  ('Agente de postventa',        'Concesionaria ejemplo',     'Automotriz',     'Recordatorios de servicio, agenda de citas y encuestas NPS automáticas.',           '+24 NPS', 'satisfacción',         4, 'draft'),
  ('Recepción virtual de casos', 'Despacho ejemplo',          'Servicios',      'Captura datos, lee documentos y crea el expediente en el CRM.',                     '−65%',    'horas administrativas',5, 'draft'),
  ('Bot omnicanal de pedidos',   'Tienda ejemplo',            'Retail',         'WhatsApp + Instagram con stock en tiempo real y rastreo de pedido en vivo.',        '24/7',    'cobertura',            6, 'draft');
