export interface ArticleSection {
  heading?: string
  paragraphs: string[]
}

export interface Article {
  slug: string
  title: string
  description: string
  category: string
  readTime: string
  publishedAt: string
  coverEmoji: string
  sections: ArticleSection[]
}

export const articles: Article[] = [
  {
    slug: "como-elegir-el-perfume-ideal",
    title: "Cómo elegir el perfume ideal para cada ocasión",
    description:
      "Descubre qué tipo de fragancia va mejor contigo según el momento del día, el entorno y la temporada. Una guía práctica para no equivocarte al comprar tu próximo perfume.",
    category: "Guía de Compra",
    readTime: "5 min de lectura",
    publishedAt: "15 de junio de 2026",
    coverEmoji: "🌸",
    sections: [
      {
        paragraphs: [
          "Elegir un perfume no se trata solo de encontrar un aroma que te guste: se trata de encontrar la fragancia correcta para el momento correcto. Un perfume puede cambiar cómo te perciben los demás, cómo te sientes contigo mismo y qué mensaje transmites antes de decir una sola palabra. Por eso, conocer qué tipo de fragancia va mejor en cada situación es una de las habilidades más útiles para cualquier amante de los perfumes.",
          "La clave está en entender que ningún perfume es universalmente adecuado para todas las ocasiones. Lo que funciona perfectamente para una reunión de negocios puede resultar excesivo en una mañana de trabajo casual, y lo que enamora en una cena romántica puede ser demasiado intenso para el gimnasio. A continuación, te guiamos por los contextos más comunes y qué familia olfativa se adapta mejor a cada uno.",
        ],
      },
      {
        heading: "Perfumes para el trabajo y entornos cerrados",
        paragraphs: [
          "En el ambiente laboral, especialmente en oficinas o espacios con poca ventilación, lo más recomendable son las fragancias ligeras y frescas. Las familias cítricas, acuáticas y aldehídicas son excelentes opciones porque son discretas, profesionales y raramente molestan a quienes te rodean.",
          "Busca perfumes con notas de bergamota, limón, té verde, agua marina o musgo blanco. Estos aromas transmiten limpieza, orden y energía sin invadir el espacio personal de tus compañeros. Un Eau de Toilette (EDT) con baja concentración suele ser suficiente para el día laboral, ya que durará las horas necesarias sin necesidad de reaplicar.",
        ],
      },
      {
        heading: "Para una cita romántica",
        paragraphs: [
          "Las citas son el territorio natural de los perfumes sensuales y envolventes. En este contexto, puedes permitirte algo más audaz: las familias orientales, florales intensas y amaderadas son perfectas para crear una impresión memorable.",
          "Para ella, fragancias con notas de rosa turca, jazmín, pachulí o sándalo funcionan de maravilla. Para él, los gourmand con vainilla y especias, o los amaderados con oud y cedro, crean una presencia cálida y sofisticada. En una cita, un Eau de Parfum (EDP) es la mejor elección: dura más y proyecta con mayor intensidad.",
        ],
      },
      {
        heading: "Para eventos formales y galas",
        paragraphs: [
          "En bodas, graduaciones, cenas de gala o eventos de etiqueta, el perfume debe ser elegante, atemporal y moderado en proyección. Los clásicos raramente fallan: florales blancos para ellas, fougères sofisticados o chypres para ellos.",
          "Evita las fragancias demasiado dulces o excesivamente especiadas que puedan distraer en un ambiente donde el protocolo importa. La regla de oro es que el perfume te acompañe, no que llegue antes que tú.",
        ],
      },
      {
        heading: "Uso cotidiano y fin de semana",
        paragraphs: [
          "Para el día a día necesitas un perfume versátil, cómodo y que no requiera que pienses demasiado en él. Las fragancias frutales, florales suaves o aromáticas (lavanda, romero, menta) son ideales para acompañarte desde la mañana hasta la tarde sin que resulten agotadoras.",
          "Muchas personas tienen su 'perfume de diario': ese frasco al que siempre vuelven y que parece encajar con todo. No tiene que ser el más caro ni el más complejo; solo tiene que hacerte sentir bien.",
        ],
      },
      {
        heading: "Para salidas nocturnas",
        paragraphs: [
          "La noche es el escenario ideal para los perfumes más atrevidos. Sin el calor del día y con la energía de la música y la compañía, puedes optar por aromas más oscuros, intensos y sensuales: cuero, especias negras, rosa ahumada, iris y oud son notas que brillan de noche.",
          "La concentración también importa: un Eau de Parfum o incluso un Extrait durará toda la noche y te acompañará en cada baile sin necesidad de reaplicar.",
        ],
      },
      {
        heading: "Consejo final: siempre prueba en tu piel",
        paragraphs: [
          "Antes de comprar, aplica el perfume directamente sobre tu muñeca y espera al menos 15 minutos. Los perfumes reaccionan con la química de tu piel y huelen diferente en cada persona. Lo que ves en el frasco y lo que hueles en el papel puede ser muy distinto de lo que el perfume se convierte sobre ti.",
          "En Perfumería y Joyería Ailany contamos con una selección cuidada de fragancias para todas las ocasiones. Consúltanos por WhatsApp y te ayudamos a encontrar el perfume perfecto para cada momento de tu vida.",
        ],
      },
    ],
  },
  {
    slug: "eau-de-parfum-vs-eau-de-toilette",
    title: "Las diferencias entre Eau de Parfum y Eau de Toilette",
    description:
      "¿Por qué algunos perfumes duran todo el día y otros desaparecen en horas? La respuesta está en la concentración. Aprende a leer las etiquetas y elige con inteligencia.",
    category: "Mundo de la Perfumería",
    readTime: "4 min de lectura",
    publishedAt: "18 de junio de 2026",
    coverEmoji: "🧪",
    sections: [
      {
        paragraphs: [
          "Cuando vas a comprar un perfume y ves los términos Eau de Parfum, Eau de Toilette o Extrait de Parfum en la etiqueta, ¿sabes realmente qué significan? No son simplemente nombres de marketing: estas denominaciones indican la concentración de aceites esenciales y aromáticos que contiene la fragancia, lo cual afecta directamente su duración, su intensidad y, en muchos casos, su precio.",
          "Entender estas diferencias te permitirá tomar decisiones más inteligentes al comprar, saber qué esperar de cada frasco y evitar decepciones. A continuación, te explicamos cada categoría de mayor a menor concentración.",
        ],
      },
      {
        heading: "Parfum o Extrait de Parfum (20–40% de concentración)",
        paragraphs: [
          "Es la forma más pura y concentrada de una fragancia. Con entre un 20% y un 40% de aceites aromáticos, el Parfum tiene la duración más larga posible: puede permanecer en tu piel entre 8 y 24 horas, y en algunos casos más. Solo necesitas unas pocas gotas para sentir su efecto completo.",
          "Su precio suele ser considerablemente más alto, pero al gastar tan poco en cada aplicación, un frasco pequeño puede durar meses o incluso un año. Es la opción preferida por coleccionistas y por quienes buscan una experiencia olfativa profunda y envolvente.",
        ],
      },
      {
        heading: "Eau de Parfum – EDP (15–20% de concentración)",
        paragraphs: [
          "El Eau de Parfum es el punto dulce entre lujo y accesibilidad. Con una concentración de entre el 15% y el 20%, ofrece una duración de 6 a 8 horas en la mayoría de las personas, aunque varía según el tipo de piel y el clima.",
          "Es la elección ideal para el uso diario cuando quieres algo que dure sin necesidad de reaplicar constantemente. Proyecta bien, tiene una estela notable y conserva toda la complejidad de la fragancia. La mayoría de los grandes lanzamientos de casas de perfumería de lujo priorizan esta concentración.",
        ],
      },
      {
        heading: "Eau de Toilette – EDT (5–15% de concentración)",
        paragraphs: [
          "El Eau de Toilette es probablemente la concentración más popular y ampliamente disponible en el mercado. Con entre el 5% y el 15% de aceites aromáticos, su duración oscila entre 3 y 5 horas, dependiendo de las condiciones ambientales y el tipo de piel.",
          "Es perfecta para climas cálidos y húmedos, para el trabajo en entornos cerrados donde se prefieren fragancias discretas, o simplemente para quienes disfrutan cambiar de perfume varias veces al día. Al ser menos concentrado, su precio suele ser más accesible que el EDP del mismo perfume.",
        ],
      },
      {
        heading: "Eau de Cologne – EDC (2–4% de concentración)",
        paragraphs: [
          "Con la menor concentración de las categorías principales, el Eau de Cologne tiene una duración de apenas 1 a 2 horas. Surgió históricamente como una fragancia refrescante de uso generoso y repetido. Hoy en día se utiliza principalmente para frescura inmediata más que para una presencia olfativa duradera.",
          "Los splash y las colonias masculinas clásicas suelen pertenecer a esta categoría. Son ideales para después del baño, del deporte o para un toque rápido de frescura sin pretensión de durar toda la jornada.",
        ],
      },
      {
        heading: "¿Cuál elegir según tu situación?",
        paragraphs: [
          "Si vives en un clima tropical o muy cálido, como el de República Dominicana, el calor y la humedad intensifican la proyección de los perfumes. En ese contexto, un EDT puede proyectar tanto como un EDP en un clima frío. Considera empezar con una concentración menor y ajustar según tu experiencia.",
          "Si buscas que tu perfume te acompañe todo el día sin reaplicar, el EDP es tu mejor apuesta. Si prefieres algo más ligero y versátil para el día a día, el EDT es una elección inteligente. Y si quieres reservar algo especial para las noches importantes, un Extrait o Parfum te dará esa experiencia única.",
          "En nuestra tienda encontrarás opciones en distintas concentraciones de las mejores marcas. Escríbenos por WhatsApp y te orientamos según tu presupuesto y tus preferencias olfativas.",
        ],
      },
    ],
  },
  {
    slug: "mejores-perfumes-orientales",
    title: "Los mejores perfumes orientales del momento",
    description:
      "Las fragancias orientales conquistan por su profundidad, sensualidad y misterio. Conoce sus notas características, las tendencias actuales y los imprescindibles para él y para ella.",
    category: "Tendencias",
    readTime: "6 min de lectura",
    publishedAt: "21 de junio de 2026",
    coverEmoji: "🪔",
    sections: [
      {
        paragraphs: [
          "En el mundo de la perfumería, pocas familias olfativas generan tanto debate, pasión y fidelidad como las fragancias orientales. Nacidas de la tradición aromática de Medio Oriente y Asia, estas fragancias se caracterizan por su profundidad, calidez y longevidad excepcional. Son perfumes que no pasan desapercibidos: envuelven, seducen y permanecen.",
          "Durante los últimos años, los orientales han vivido un auténtico renacimiento en el mercado global. Desde grandes casas de lujo hasta marcas de nicho, todos han apostado por estas formulaciones ricas y complejas que conectan con algo primitivo y profundamente humano: el deseo de ser recordado.",
        ],
      },
      {
        heading: "¿Qué hace oriental a un perfume?",
        paragraphs: [
          "La familia oriental no se define por una nota única, sino por un conjunto de ingredientes que trabajan juntos para crear una sensación de calidez, sensualidad y misterio. Las notas más características incluyen el oud (madera de agarwood, una de las materias primas más costosas del mundo), el ámbar, la vainilla, el sándalo, el benjuí, el incienso, el pachulí y diversas especias como la canela, el cardamomo y el clavo.",
          "Lo que distingue a estas fragancias es su proyección y su durabilidad. Gracias a la densidad de sus ingredientes base, los orientales suelen proyectar durante horas y dejar una estela notable que permanece incluso después de que la persona se ha ido.",
        ],
      },
      {
        heading: "Tendencias orientales en 2025-2026",
        paragraphs: [
          "El mercado actual muestra una clara tendencia hacia los orientales gourmand: aquellos que combinan notas cálidas y especiadas con elementos dulces como el caramelo, el cacao, el café y la vainilla. Esta combinación crea fragancias que evocan confort, indulgencia y lujo accesible.",
          "También se observa un auge de los orientales florales, que fusionan la rosa turca o el jazmín con bases de oud y ámbar, creando composiciones que son a la vez románticas y misteriosas. Las fragancias unisex dentro de la familia oriental han ganado terreno de forma significativa, reflejando una tendencia global hacia la perfumería sin género.",
        ],
      },
      {
        heading: "Los mejores orientales para ella",
        paragraphs: [
          "Entre los favoritos femeninos del momento destacan las fragancias que combinan flores intensas con bases ricas y oscuras. Los perfumes con corazón de rosa sobre base de oud y ámbar son protagonistas indiscutibles, creando una feminidad poderosa y sofisticada.",
          "Las composiciones con vainilla negra y musgo se han posicionado como alternativas modernas a los orientales clásicos, ofreciendo calidez sin resultar excesivamente dulces. Para las noches y los eventos especiales, los orientales florales con toques de incienso y sándalo blanco crean una presencia única e inolvidable.",
        ],
      },
      {
        heading: "Los mejores orientales para él",
        paragraphs: [
          "En el segmento masculino, los perfumes de oud puro o oud fusionado con notas de cuero, tabaco y madera de cedro son una declaración de elegancia y poder. Estas fragancias tienen una presencia innegable y hablan de un hombre seguro de sí mismo y con criterio propio.",
          "Los orientales especiados con notas de cardamomo, pimienta negra y benjuí sobre bases amaderadas son otra tendencia sólida: modernos pero con raíces en la tradición aromática árabe. Para ocasiones formales, un oriental cremoso con sándalo y vainilla aporta sofisticación sin resultar excesivo.",
        ],
      },
      {
        heading: "¿Cuándo y cómo usarlos?",
        paragraphs: [
          "Los perfumes orientales brillan especialmente en climas frescos y en la temporada otoño-invierno, aunque en el Caribe y zonas tropicales pueden usarse todo el año con moderación. La regla clave es aplicarlos con parsimonia: una o dos pulsaciones son suficientes dado su poder de proyección.",
          "Son la elección perfecta para noches de gala, reuniones íntimas, cenas románticas y cualquier ocasión donde quieras dejar una impresión duradera. Evítalos en entornos muy cerrados con mucha gente o en contextos laborales donde las fragancias discretas son lo apropiado.",
          "En Perfumería y Joyería Ailany contamos con una selección de fragancias orientales para todos los gustos y presupuestos. Contáctanos por WhatsApp para descubrir el oriental que hará de tu firma personal algo verdaderamente irrepetible.",
        ],
      },
    ],
  },
  {
    slug: "como-hacer-durar-mas-el-perfume",
    title: "Cómo hacer durar más tu perfume todo el día",
    description:
      "¿Tu perfume desaparece a las dos horas? No es culpa del frasco. Con estos trucos sencillos puedes multiplicar la duración de cualquier fragancia y aprovechar cada gota al máximo.",
    category: "Consejos y Trucos",
    readTime: "5 min de lectura",
    publishedAt: "25 de junio de 2026",
    coverEmoji: "⏱️",
    sections: [
      {
        paragraphs: [
          "Una de las quejas más comunes entre los amantes de los perfumes es que su fragancia favorita dura muy poco en su piel. Y aunque la concentración del perfume (EDP vs EDT) juega un papel importante, existen varios factores externos y hábitos de aplicación que determinan en gran medida cuánto tiempo permanecerá el aroma contigo.",
          "La buena noticia es que con algunos cambios sencillos en tu rutina puedes prolongar la duración de cualquier perfume, incluso los más ligeros y económicos. Estos son los trucos que utilizan los expertos y que puedes implementar desde hoy mismo.",
        ],
      },
      {
        heading: "Aplica en los puntos de calor de tu cuerpo",
        paragraphs: [
          "Los puntos de calor son zonas del cuerpo donde los vasos sanguíneos están más cerca de la superficie de la piel, lo que genera más temperatura y ayuda a proyectar y dispersar la fragancia de manera continua. Los más efectivos son: las muñecas, el cuello (a los lados y en la base), el interior de los codos, detrás de las rodillas y el pecho.",
          "Aplica el perfume directamente sobre estos puntos después de ducharte, cuando la piel todavía está ligeramente húmeda y los poros están abiertos. Esto maximiza la absorción y la proyección durante todo el día.",
        ],
      },
      {
        heading: "No frotes el perfume: deja que se seque solo",
        paragraphs: [
          "Uno de los errores más comunes es frotar las muñecas entre sí después de aplicar el perfume. Este gesto, aunque intuitivo, genera calor por fricción que rompe las moléculas aromáticas y altera la estructura de la fragancia, haciendo que las notas de cabeza desaparezcan más rápido y que el perfume pierda parte de su complejidad.",
          "La técnica correcta es dejar que el perfume se seque naturalmente sobre la piel. Si lo aplicaste en las muñecas, mantenlas separadas y quietas durante un minuto. El resultado será una fragancia más completa y duradera.",
        ],
      },
      {
        heading: "Hidrata tu piel antes de aplicar",
        paragraphs: [
          "La piel seca absorbe y agota el perfume mucho más rápido que la piel bien hidratada. Esto se debe a que la humedad y los lípidos de la piel actúan como una base sobre la que las moléculas aromáticas pueden adherirse y proyectarse.",
          "Aplica una loción o crema corporal sin fragancia intensa justo antes de ponerte el perfume. Esto crea una capa que retiene el aroma significativamente más tiempo. Si tienes acceso a una crema del mismo perfumista o con notas complementarias, úsala como base: el efecto de capas de fragancia es uno de los secretos mejor guardados de los aficionados a la perfumería.",
        ],
      },
      {
        heading: "El truco de la vaselina",
        paragraphs: [
          "Aplicar una pequeña cantidad de vaselina (petrolato) en los puntos donde vas a poner el perfume es un truco clásico que funciona sorprendentemente bien. La vaselina es oclusiva: sella la humedad y crea una superficie pegajosa microscópica que literalmente atrapa las moléculas de fragancia y las retiene por más tiempo.",
          "Simplemente aplica una pequeña cantidad en muñecas y cuello antes de rociarte el perfume. Notarás que la fragancia proyecta mejor y dura considerablemente más horas.",
        ],
      },
      {
        heading: "Almacena tu perfume correctamente",
        paragraphs: [
          "Un perfume mal almacenado se degrada rápidamente y pierde tanto su intensidad como su duración en piel. Los tres enemigos principales de las fragancias son el calor, la luz directa y la humedad. Por eso, el baño es en realidad uno de los peores lugares para guardar tus perfumes.",
          "Lo ideal es conservarlos en un lugar fresco, oscuro y estable: un cajón del dormitorio, dentro de su caja original o en una repisa alejada de ventanas. Así preservarás la integridad química de la fragancia y te asegurarás de que cada aplicación sea tan buena como la primera.",
        ],
      },
      {
        heading: "Aplica también sobre la ropa",
        paragraphs: [
          "Las fibras textiles retienen las moléculas aromáticas durante mucho más tiempo que la piel, especialmente en tejidos naturales como el algodón, la lana o el cashmere. Rociar el interior de la ropa (la parte que toca la piel) o el forro de tu abrigo puede extender la duración de la fragancia muchas horas más.",
          "Eso sí, ten cuidado con telas delicadas o claras, ya que algunos perfumes con alto contenido de aceites pueden manchar. Mantén el frasco a una distancia de unos 20-30 cm al aplicar sobre ropa.",
          "Con estos consejos, sacarás el máximo partido a cada frasco de tu colección. Y si necesitas ayuda para elegir una fragancia que se adapte a tu tipo de piel y al clima de tu zona, escríbenos en Perfumería y Joyería Ailany: estamos para ayudarte.",
        ],
      },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
