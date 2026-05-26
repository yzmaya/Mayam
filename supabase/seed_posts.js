// Seed: inserta los 3 posts del blog en Supabase
// Ejecutar con: node supabase/seed_posts.js

const SUPABASE_URL = 'https://wbujrdnolbdcleejnrft.supabase.co';
const SERVICE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidWpyZG5vbGJkY2xlZWpucmZ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTcxNTM1NSwiZXhwIjoyMDk1MjkxMzU1fQ.tuTTGAvmq4DXv_UjxcM0MK7fYuxkdLEwR-hYG3U5HN0';

const posts = [
  {
    title: 'Implicaciones del fallo Musk vs. OpenAI: Seguridad jurídica e hitos financieros en la industria de la IA ⚖️📈',
    slug: 'implicaciones-fallo-musk-vs-openai-seguridad-juridica-ia',
    excerpt: 'El reciente fallo unánime de un jurado federal en Oakland a favor de Sam Altman, Greg Brockman y OpenAI marca un hito regulatorio y comercial en el ecosistema tecnológico. Al desestimar la demanda bajo el estatuto de limitaciones, el tribunal valida la viabilidad de los modelos híbridos para sostener la innovación a gran escala.',
    content: [
      { type: 'lead', text: 'El reciente fallo unánime de un jurado federal en Oakland a favor de Sam Altman, Greg Brockman y OpenAI marca un hito regulatorio y comercial en el ecosistema tecnológico. Al desestimar la demanda de Elon Musk bajo el argumento del estatuto de limitaciones (prescripción), el tribunal no solo mitiga la incertidumbre legal que rodeaba a la compañía, sino que valida la viabilidad de los modelos híbridos (for-profit / non-profit) para sostener la innovación a gran escala.' },
      { type: 'bullets', items: [
        { icon: 'scale',        label: 'Gobernanza y Estructura Corporativa', text: 'El fallo ratifica la estabilidad del esquema comercial de OpenAI y asegura la continuidad estratégica de sus alianzas clave, como el partnership con Microsoft.' },
        { icon: 'trending-up',  label: 'Certidumbre para los Inversores',     text: 'La resolución elimina de manera temporal un riesgo sistémico mayor, pavimentando una trayectoria sólida hacia una potencial Oferta Pública Inicial (IPO) proyectada en una valoración histórica de $1 billón de dólares ($1tn).' },
        { icon: 'clock',        label: 'El factor temporal en litigios de tecnología', text: 'La defensa de OpenAI logró demostrar con éxito que el demandante poseía conocimiento de las reestructuraciones corporativas desde 2017, fijando un precedente relevante en la oportunidad procesal dentro del sector.' },
        { icon: 'alert-circle', label: 'Perspectiva de apelación',            text: 'Aunque la representación legal de Musk escalará el caso a la Corte de Apelaciones del Noveno Circuito, analistas corporativos sugieren que revertir un veredicto de hechos dictado por un jurado presenta una alta complejidad jurídica.' },
      ]},
      { type: 'question', text: 'Desde una perspectiva de liderazgo y estrategia de negocio, ¿considera que este fallo acelerará la consolidación de modelos puramente comerciales en el desarrollo de la IA de frontera, o se mantendrá la necesidad de contrapesos éticos y filantrópicos?' },
    ],
    author_name: 'Gibrán Torreblanca',
    category: 'IA & Legal',
    category_icon: 'scale',
    image_url: 'https://media.licdn.com/dms/image/v2/D5622AQG2EHg9wcZtQw/feedshare-shrink_800/B56Z5LfuRSKUAc-/0/1779383068002?e=1781136000&v=beta&t=bK4jkZVeGs9EEt7-RnCBQ_iawbuElePhTWYQgavOn2c',
    og_image: 'https://media.licdn.com/dms/image/v2/D5622AQG2EHg9wcZtQw/feedshare-shrink_800/B56Z5LfuRSKUAc-/0/1779383068002?e=1781136000&v=beta&t=bK4jkZVeGs9EEt7-RnCBQ_iawbuElePhTWYQgavOn2c',
    status: 'published',
    featured: true,
    tags: ['OpenAI', 'Elon Musk', 'legal', 'IPO', 'regulación IA'],
    read_time_minutes: 5,
    meta_title: 'Fallo Musk vs OpenAI: Seguridad jurídica e hitos financieros en IA',
    meta_description: 'El fallo federal a favor de OpenAI valida los modelos híbridos y abre camino a una IPO valorada en $1tn. Análisis de implicaciones para la industria.',
    meta_keywords: ['openai', 'elon musk', 'fallo judicial', 'regulacion', 'inteligencia artificial', 'ipo', 'gobernanza', 'inversores', 'noveno circuito'],
    geo_region: 'MX',
    geo_placename: 'Ciudad de México, México',
    geo_position: '19.4326,-99.1332',
    published_at: '2026-05-20T12:00:00+00:00',
  },
  {
    title: 'El punto de inflexión en la economía creativa: Google DeepMind presenta Gemini Omni y redefine la producción multimodal 📈🌐',
    slug: 'gemini-omni-google-deepmind-produccion-multimodal-economia-creativa',
    excerpt: 'Durante el Google I/O, se oficializó el lanzamiento de Gemini Omni, catalogado como "Modelo del Mundo". Este avance representa un salto cuántico en los procesos de automatización y generación de contenido, fusionando capacidades avanzadas de razonamiento con la creación de video en lenguaje natural.',
    content: [
      { type: 'lead', text: 'Durante el Google I/O, se oficializó el lanzamiento de Gemini Omni, una tecnología catalogada como "Modelo del Mundo". Este avance representa un salto cuántico en los procesos de automatización y generación de contenido, fusionando capacidades avanzadas de razonamiento con la creación y edición de video a través de interfaces conversacionales en lenguaje natural.' },
      { type: 'subheading', text: 'Lo que necesitas saber:' },
      { type: 'bullets', items: [
        { icon: 'zap',          label: 'Optimización de flujos de trabajo',      text: 'La llegada de la variante Gemini Omni Flash democratiza la edición multimedia avanzada, permitiendo a las empresas iterar prototipos visuales y materiales de marketing sin la necesidad de largos procesos de postproducción.' },
        { icon: 'brain',        label: 'Comprensión contextual profunda',        text: 'Al integrar nociones de física del mundo real con conocimiento histórico y cultural, el modelo reduce los errores lógicos habituales de las IA generativas de video tradicionales.' },
        { icon: 'rocket',       label: 'Ventaja competitiva para PYMEs',         text: 'Su próxima integración nativa en plataformas globales como YouTube abre un abanico de posibilidades para la escala de campañas de video de alto impacto con costos de inferencia y producción radicalmente menores.' },
      ]},
      { type: 'paragraph', text: 'Como profesionales y líderes en la industria, nos enfrentamos a un cambio de paradigma donde la barrera técnica de la producción audiovisual se reduce a cero.' },
      { type: 'question', text: '¿Cómo planea su organización integrar la IA conversacional en sus estrategias de comunicación y desarrollo de producto para este año? Compartamos perspectivas e ideas en la sección de comentarios.' },
    ],
    author_name: 'Gibrán Torreblanca',
    category: 'Herramientas de IA',
    category_icon: 'cpu',
    image_url: 'https://media.licdn.com/dms/image/v2/D5622AQHRb4JIKA2J_Q/feedshare-image-high-res/B56Z5L13UgKIAU-/0/1779388872212?e=1781136000&v=beta&t=D4_6MVtV96WTeTqNVz49WmBX6xxnfVn4T_7nRP1sQjo',
    og_image: 'https://media.licdn.com/dms/image/v2/D5622AQHRb4JIKA2J_Q/feedshare-image-high-res/B56Z5L13UgKIAU-/0/1779388872212?e=1781136000&v=beta&t=D4_6MVtV96WTeTqNVz49WmBX6xxnfVn4T_7nRP1sQjo',
    status: 'published',
    featured: false,
    tags: ['Gemini', 'Google', 'video IA', 'multimodal', 'PYMEs'],
    read_time_minutes: 4,
    meta_title: 'Gemini Omni: Google DeepMind redefine la producción multimodal',
    meta_description: 'Gemini Omni fusiona razonamiento avanzado con creación de video en lenguaje natural. Impacto en la economía creativa y ventajas para PYMEs.',
    meta_keywords: ['gemini omni', 'google deepmind', 'produccion video', 'inteligencia artificial', 'multimodal', 'economia creativa', 'pymes', 'youtube', 'automatizacion'],
    geo_region: 'MX',
    geo_placename: 'Ciudad de México, México',
    geo_position: '19.4326,-99.1332',
    published_at: '2026-05-21T10:00:00+00:00',
  },
  {
    title: 'Liderazgo y Equidad: El nuevo estándar en el ecosistema de la IA',
    slug: 'liderazgo-equidad-nuevo-estandar-ecosistema-ia-anthropic-gates',
    excerpt: 'La reciente colaboración entre Anthropic y la Bill & Melinda Gates Foundation marca un punto de inflexión en la industria. Anthropic refuerza su posicionamiento como el líder en "IA con propósito", priorizando la seguridad y el despliegue ético en sectores como la salud, la educación y la infraestructura económica global.',
    content: [
      { type: 'lead', text: 'La reciente colaboración entre Anthropic y la Bill & Melinda Gates Foundation marca un punto de inflexión en la industria. Mientras la carrera por la capacidad de cómputo continúa, Anthropic refuerza su posicionamiento como el líder en "IA con propósito", priorizando la seguridad y el despliegue ético en sectores fundamentales como la salud, la educación y la infraestructura económica global.' },
      { type: 'subheading', text: 'Análisis de impacto:' },
      { type: 'bullets', items: [
        { icon: 'globe',          label: 'Democratización Tecnológica',  text: 'Integración de modelos de lenguaje avanzado en sistemas estatales y de salud en países en desarrollo.' },
        { icon: 'shield-check',   label: 'Seguridad y Ética',           text: 'Un enfoque en el "Constitutional AI" aplicado a contextos de alta sensibilidad social.' },
        { icon: 'bar-chart-2',    label: 'Productividad Exponencial',   text: 'Datos recientes indican que herramientas como Claude Code ya están automatizando hasta el 90% del flujo de trabajo técnico, permitiendo que el talento humano se enfoque en la estrategia.' },
      ]},
      { type: 'question', text: '¿Considera que las alianzas entre Big Tech y fundaciones globales son el camino más eficiente para regular el impacto ético de la IA? Abrimos el debate en los comentarios.' },
    ],
    author_name: 'Gibrán Torreblanca',
    category: 'Liderazgo & Ética',
    category_icon: 'heart-handshake',
    image_url: 'https://media.licdn.com/dms/image/v2/D4E22AQFU5j1z7rvEeA/feedshare-shrink_800/B4EZ4ooAc2IIAc-/0/1778798037125?e=1781136000&v=beta&t=C-xqUctzu0dOm9agdqHGVrC_--5yEGQhpJfRBvpq0W0',
    og_image: 'https://media.licdn.com/dms/image/v2/D4E22AQFU5j1z7rvEeA/feedshare-shrink_800/B4EZ4ooAc2IIAc-/0/1778798037125?e=1781136000&v=beta&t=C-xqUctzu0dOm9agdqHGVrC_--5yEGQhpJfRBvpq0W0',
    status: 'published',
    featured: false,
    tags: ['Anthropic', 'Gates Foundation', 'ética IA', 'salud', 'educación'],
    read_time_minutes: 4,
    meta_title: 'Liderazgo y Equidad: El nuevo estándar en IA — Anthropic y Gates Foundation',
    meta_description: 'La alianza entre Anthropic y la Gates Foundation impulsa la IA con propósito en salud, educación e infraestructura en países en desarrollo.',
    meta_keywords: ['anthropic', 'gates foundation', 'liderazgo', 'equidad', 'inteligencia artificial', 'etica', 'constitutional ai', 'salud', 'educacion', 'claude'],
    geo_region: 'MX',
    geo_placename: 'Ciudad de México, México',
    geo_position: '19.4326,-99.1332',
    published_at: '2026-05-18T09:00:00+00:00',
  },
];

async function seed() {
  const url = `${SUPABASE_URL}/rest/v1/blog_posts`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(posts),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error('❌ Error al insertar posts:', JSON.stringify(data, null, 2));
    process.exit(1);
  }
  console.log(`✅ ${data.length} posts insertados correctamente en Supabase:`);
  data.forEach(p => console.log(`   • [${p.status}] ${p.title.slice(0, 60)}…`));
}

seed();
