import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  CONTEÚDO, edite tudo aqui                                         */
/*                                                                    */
/*  As fotos não são empacotadas: vêm por URL do repositório público  */
/*  da A10, que já hospeda as 238 imagens oficiais. Para trocar uma   */
/*  foto basta trocar o slug.                                         */
/* ------------------------------------------------------------------ */

const LOGO =
  "https://raw.githubusercontent.com/joaogstrapa10-cell/sitea10/main/lib/a10-logo.png";

const FOTOS =
  "https://raw.githubusercontent.com/joaogstrapa10-cell/sitea10/main/fotos/img/";
const img = (slug: string) => FOTOS + slug + ".jpg";

const WHATSAPP = "5547991916412";
const WHATSAPP_LABEL = "(47) 99191-6412";
const wa = (texto: string) =>
  "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto);

const WHATSAPP_URL = wa(
  "Olá! Vim pelo site da A10 e gostaria de mais informações.",
);

const NAV_ITEMS = [
  { label: "Empreendimentos", href: "#empreendimentos" },
  { label: "Galeria", href: "#galeria" },
  { label: "Vista", href: "#vista" },
  { label: "Localização", href: "#localizacao" },
];

/* O hero é do Pátio Estaleiro, que é o foco do site. A máquina de carrossel
   fica pronta: com mais de um slide ela alterna sozinha a cada HERO_SEGUNDOS e
   mostra as setas; com um só, some tudo e a abertura fica parada. */
const HERO_SEGUNDOS = 5;

const HERO_SLIDES = [
  {
    slug: "patio-estaleiro",
    // O nome segue o logotipo do empreendimento: as duas palavras em serifada
    // itálica, na mesma linha, a segunda em dourado. No logotipo a primeira é
    // navy, que sumiria sobre a foto escura, então aqui ela vai em creme.
    parte1: "Pátio",
    parte2: "Estaleiro",
    tagline: "Viver à altura do mar.",
    imagem: img("patio-estaleiro"),
    alt: "Casas do Pátio Estaleiro, na Praia do Estaleiro, Balneário Camboriú",
  },
];

/* Os números do Pátio Estaleiro. A unidade fica ao lado do número, menor, na
   mesma linha de base. Quando o valor é uma faixa, vira duas linhas separadas
   por um traço curto, e o contador não roda, porque não há um número só. */
const STATS: {
  numero?: string;
  unidade?: string;
  faixa?: [string, string];
  label: string;
}[] = [
  { numero: "8", unidade: "residências", label: "No condomínio" },
  { numero: "2", label: "Ainda disponíveis" },
  { numero: "90", unidade: "m", label: "Do mar" },
  { faixa: ["350 m²", "402 m²"], label: "Área privativa" },
];

/* O endereço que abre o site. O restante do portfólio vem logo abaixo. */
const DESTAQUES = [
  {
    slug: "patio-estaleiro",
    eyebrow: "Praia do Estaleiro · Balneário Camboriú",
    nome: "Pátio Estaleiro",
    tag: "Casas exclusivas, o mar como quintal.",
    texto:
      "Um conjunto privado de oito residências contemporâneas assinadas pelo arquiteto Marcos Jobim, a 90 metros da areia. Restam duas: a Casa Mar, de 402 m², e a Casa Brisa, de 350 m². Cada uma com quatro suítes, piscina privativa e três vagas.",
    valor: "R$ 6,89 mi",
    imagem: img("patio-estaleiro"),
    specs: [
      ["Casas", "8 no condomínio, 2 disponíveis"],
      ["Área privativa", "350 a 402 m²"],
      ["Dormitórios", "4 suítes em cada uma das 2 casas"],
      ["Vagas", "3 por residência"],
    ],
    cta: "Falar sobre o Pátio Estaleiro",
  },
];

/* O restante do portfólio A10. O Solenne vem na frente, com selo próprio. */
const PORTFOLIO: {
  nome: string; cidade: string; resumo: string; valor: string; imagem: string; selo?: string;
}[] = [
  {
    nome: "Solenne",
    cidade: "Centro · Balneário Camboriú",
    resumo:
      "Torre neoclássica de herança francesa, a 700 m da praia, com 35 pavimentos e lazer estilo home club em 17 ambientes.",
    valor: "Sob consulta",
    imagem: img("solenne-hero"),
    selo: "Pré-lançamento",
  },
  {
    nome: "Holmes",
    cidade: "Balneário Camboriú",
    resumo: "Estética britânica no ponto mais central, com rooftop panorâmico.",
    valor: "R$ 2,5 mi",
    imagem: img("holmes"),
  },
  {
    nome: "Cape Town",
    cidade: "Balneário Camboriú",
    resumo: "Arquitetura contemporânea com atmosfera de destino.",
    valor: "R$ 2,28 mi",
    imagem: img("cape-town"),
  },
  {
    nome: "Florence Garden",
    cidade: "Balneário Camboriú",
    resumo: "Um andar inteiro de lazer no rooftop, com piscina e deck.",
    valor: "R$ 3,2 mi",
    imagem: img("florence-garden"),
  },
];

const VISTA = {
  image: img("praia-estaleiro-drone"),
  quote: "O mar é o quintal deste refúgio.",
};

const DIFERENCIAIS = [
  {
    eyebrow: "Privacidade",
    title: "8 residências, e só.",
    body:
      "Um condomínio fechado desenhado para o resguardo pleno da vida familiar, com jardins e áreas externas protegidas. Restam a Casa Mar e a Casa Brisa.",
    image: img("patio-brisa-4"),
  },
  {
    eyebrow: "Autoria",
    title: "Projeto de Marcos Jobim.",
    body:
      "Linhas puras e materiais nobres em um partido que integra a arquitetura moderna externa ao aconchego dos materiais naturais no interior.",
    image: img("marcos-jobim"),
  },
  {
    eyebrow: "Lazer privativo",
    title: "Piscina, deck e jardim em cada casa.",
    body:
      "A transição entre os espaços internos e externos convida o verde para dentro. Decks de madeira nobre e piscinas particulares cercadas por vegetação nativa.",
    image: img("patio-mar-2"),
  },
  {
    eyebrow: "90 metros",
    title: "A menor distância entre você e a areia.",
    body:
      "A Praia do Estaleiro é reconhecida pelas águas cristalinas, pela restinga preservada e pela certificação Bandeira Azul.",
    // A aérea, que mostra o condomínio e a praia na mesma imagem, é o
    // argumento desta seção. Saiu do bloco de privacidade para não repetir.
    image: img("patio-condominio-aereo"),
  },
];

const GALLERY_IMAGES = [
  { src: img("patio-estaleiro"), legenda: "Pátio Estaleiro" },
  { src: img("patio-mar-1"), legenda: "Casa Mar" },
  { src: img("patio-mar-3"), legenda: "Casa Mar" },
  { src: img("patio-mar-5"), legenda: "Casa Mar" },
  { src: img("patio-mar-7"), legenda: "Casa Mar" },
  { src: img("patio-brisa-2"), legenda: "Casa Brisa" },
  { src: img("patio-brisa-5"), legenda: "Casa Brisa" },
  { src: img("patio-brisa-9"), legenda: "Casa Brisa" },
];

const LOCATION = {
  title: "Praia do Estaleiro, em Balneário Camboriú.",
  body:
    "O Pátio Estaleiro ocupa a Praia do Estaleiro, a 90 metros da areia, uma das faixas mais preservadas do litoral catarinense. Águas cristalinas, restinga preservada e certificação Bandeira Azul, a poucos minutos do centro de Balneário Camboriú.",
  pinos: [
    {
      nome: "Pátio Estaleiro",
      detalhe: "Praia do Estaleiro",
      lat: -27.026191931412384,
      lng: -48.58221290072425,
      destaque: true,
      mapa:
        "https://www.google.com/maps?q=-27.026192,-48.582213&hl=pt-BR&z=17&output=embed",
    },
  ],
};

const CONTATO = {
  endereco:
    "R. 3110, nº 377, sala 2 · Centro · Balneário Camboriú/SC · 88330-287",
  instagram: "https://instagram.com/a10empreendimentos",
  instagram_label: "@a10empreendimentos",
};

/* ------------------------------------------------------------------ */
/*  UTIL                                                              */
/* ------------------------------------------------------------------ */

function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.08] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}

function Mullions({ opacity = 0.35 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{
        opacity,
        backgroundImage:
          "repeating-linear-gradient(to right, transparent 0 calc(100%/12 - 1px), rgba(35,60,88,0.9) calc(100%/12 - 1px) calc(100%/12))",
      }}
    />
  );
}

function SignatureLine({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={`flex flex-col items-center ${className}`}
      style={style}
    >
      <span className="block h-[6px] w-[6px] rounded-full bg-[var(--color-gold)]" />
      <span className="block w-px flex-1 bg-gradient-to-b from-[var(--color-gold)] via-[var(--color-gold)]/40 to-[var(--color-gold)]" />
      <span className="block h-[6px] w-[6px] rounded-full bg-[var(--color-gold)]" />
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="font-sans text-[1rem] font-medium uppercase tracking-[0.26em] text-[var(--color-gold-2)]">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NAVBAR                                                            */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-navy)]/70 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" aria-label="A10 Empreendimentos">
          <img
            src={LOGO}
            alt="A10 Empreendimentos"
            className="h-12 w-auto md:h-14"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-sans text-[0.82rem] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-[var(--color-gold-2)]"
              style={{ textShadow: "0 1px 12px rgba(0,0,0,.55)" }}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <button
          aria-label="Abrir menu"
          className="md:hidden text-[var(--color-cream)]"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-px w-8 bg-current" />
          <span className="mt-1.5 block h-px w-8 bg-current" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-white/5 bg-[var(--color-navy)]/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-5 px-6 py-8">
              {NAV_ITEMS.map((n) => (
                <a
                  key={n.href}
                  onClick={() => setOpen(false)}
                  href={n.href}
                  className="font-sans text-sm uppercase tracking-[0.22em] text-white"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                              */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const total = HERO_SLIDES.length;
  const [i, setI] = useState(0);
  const slide = HERO_SLIDES[i];

  // Troca sozinho. O relógio reinicia a cada mudança, então quem usa a seta
  // ganha os cinco segundos inteiros antes da próxima virada automática.
  useEffect(() => {
    if (total < 2) return;
    const t = setTimeout(() => setI((a) => (a + 1) % total), HERO_SEGUNDOS * 1000);
    return () => clearTimeout(t);
  }, [i, total]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[100svh] w-full overflow-hidden bg-[var(--color-navy)]"
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={slide.slug}
            src={slide.imagem}
            alt={slide.alt}
            fetchPriority="high"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </motion.div>

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-[var(--color-navy)]/50 to-transparent" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 85% 15%, rgba(228,201,135,0.22), transparent 70%)",
        }}
      />
      <Mullions opacity={0.1} />
      <Grain />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full items-end"
      >
        <div className="mx-auto w-full max-w-[1600px] px-6 pb-20 md:px-10 md:pb-24">
          <h1
            className="font-display font-light italic leading-[1.02] text-[var(--color-cream)]"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            <motion.span
              key={slide.slug + "-1"}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {slide.parte1}
            </motion.span>{" "}
            <motion.span
              key={slide.slug + "-2"}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-[var(--color-gold-2)]"
            >
              {slide.parte2}
            </motion.span>
          </h1>

          <motion.p
            key={slide.slug + "-t"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="mt-10 font-display italic text-[var(--color-mist)]"
            style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}
          >
            {slide.tagline}
          </motion.p>
        </div>
      </motion.div>

      {/* Setas e marcadores, no canto, para não brigar com o "Role" do centro */}
      {total > 1 && (
      <div className="absolute bottom-10 right-6 z-20 flex items-center gap-5 md:bottom-12 md:right-10">
        <button
          onClick={() => setI((a) => (a - 1 + total) % total)}
          aria-label="Empreendimento anterior"
          className="font-display text-3xl leading-none text-white/70 transition-colors duration-300 hover:text-[var(--color-gold-2)]"
        >
          ‹
        </button>
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((sl, n) => (
            <button
              key={sl.slug}
              onClick={() => setI(n)}
              aria-label={sl.parte1 + " " + sl.parte2}
              aria-current={n === i}
              className={
                "h-px transition-all duration-500 " +
                (n === i ? "w-12 bg-[var(--color-gold)]" : "w-6 bg-white/40")
              }
            />
          ))}
        </div>
        <button
          onClick={() => setI((a) => (a + 1) % total)}
          aria-label="Próximo empreendimento"
          className="font-display text-3xl leading-none text-white/70 transition-colors duration-300 hover:text-[var(--color-gold-2)]"
        >
          ›
        </button>
      </div>
      )}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-sans text-[0.62rem] uppercase tracking-[0.4em] text-[var(--color-mist-2)]">
          Role
        </span>
        <motion.span
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="block h-10 w-px origin-top bg-[var(--color-gold)]"
        />
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  STATS                                                             */
/* ------------------------------------------------------------------ */

function Stats() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-2)] py-14 md:py-20">
      <Grain />
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-2 gap-y-14 md:grid-cols-4 md:gap-y-0">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`relative px-4 md:px-8 ${
                i > 0 ? "md:border-l md:border-[var(--color-line)]/60" : ""
              }`}
            >
              <div className="font-display font-light leading-none text-[var(--color-cream)]">
                {s.faixa ? (
                  <div
                    className="relative inline-flex flex-col items-center gap-10"
                    style={{ fontSize: "clamp(2rem, 3.4vw, 3rem)" }}
                  >
                    <span className="leading-none">{s.faixa[0]}</span>
                    <span className="leading-none">{s.faixa[1]}</span>
                    {/* Ancorado no centro do bloco. Como as duas linhas têm a
                        mesma altura, o centro do bloco é o centro exato do vão,
                        sem depender das métricas da fonte. */}
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-gold)]/70"
                    />
                  </div>
                ) : (
                  <span
                    className="inline-flex items-baseline gap-3"
                    style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
                  >
                    <span>{s.numero}</span>
                    {s.unidade && (
                      <span style={{ fontSize: "0.34em" }} className="font-sans tracking-wide">
                        {s.unidade}
                      </span>
                    )}
                  </span>
                )}
              </div>
              <div className="mt-6 font-sans text-[0.82rem] uppercase tracking-[0.22em] text-[var(--color-mist)]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PORTFÓLIO                                                         */
/* ------------------------------------------------------------------ */

function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-[var(--color-navy)] py-14 md:py-20"
    >
      <Grain />
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <h2
          className="mb-10 font-display text-[var(--color-cream)]"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.6rem)" }}
        >
          Nosso <span className="italic text-[var(--color-gold-2)]">portfólio.</span>
        </h2>
                  <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {PORTFOLIO.map((p, i) => (
              <motion.a
                key={p.nome}
                href={wa(
                  "Olá! Tenho interesse no " +
                    p.nome +
                    ". Poderia me enviar mais informações?",
                )}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={p.imagem}
                    alt={p.nome}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/85 via-transparent to-transparent" />
                  {p.selo && (
                    <div className="absolute left-6 top-6 bg-[var(--color-gold)] px-4 py-2 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-navy)]">
                      {p.selo}
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="font-sans text-[0.76rem] uppercase tracking-[0.24em] text-[var(--color-gold-2)]">
                      {p.cidade}
                    </div>
                    <div className="mt-2 font-display text-3xl text-[var(--color-cream)]">
                      {p.nome}
                    </div>
                    <div className="mt-1 font-sans text-base text-[var(--color-cream)]">
                      {p.valor}
                    </div>
                  </div>
                </div>
                <p className="mt-5 font-sans text-[1.05rem] leading-[1.7] text-[var(--color-mist)]">
                  {p.resumo}
                </p>
              </motion.a>
            ))}
          </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  EMPREENDIMENTOS                                                   */
/* ------------------------------------------------------------------ */

function Empreendimentos() {
  return (
    <section
      id="empreendimentos"
      className="relative overflow-hidden bg-[var(--color-navy)] py-14 md:py-20"
    >
      <Grain />
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-10 max-w-2xl">
          <h2
            className="font-display leading-[1.05] text-[var(--color-cream)]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.6rem)" }}
          >
            O Pátio{" "}
            <span className="italic text-[var(--color-gold-2)]">Estaleiro.</span>
          </h2>
          <div className="mt-6 font-sans text-[0.98rem] font-medium uppercase tracking-[0.22em] text-[var(--color-gold-2)]">
            {DESTAQUES[0].eyebrow}
          </div>
        </div>

        <div className="flex flex-col gap-14 md:gap-20">
          {DESTAQUES.map((e, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={e.slug}
                className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16"
              >
                <motion.div
                  initial={{ opacity: 0, x: flip ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={e.imagem}
                      alt={e.nome}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[var(--color-navy)]/10" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, delay: 0.15 }}
                  className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}
                >
                  <p className="font-display italic text-2xl text-[var(--color-gold-2)]">
                    {e.tag}
                  </p>
                  <p className="mt-6 font-sans text-[1.12rem] leading-[1.75] text-[var(--color-mist)]">
                    {e.texto}
                  </p>

                  <dl className="mt-10 flex flex-col">
                    {e.specs.map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-baseline justify-between gap-6 border-b border-[var(--color-line)]/50 py-3"
                      >
                        <dt className="font-sans text-[0.8rem] uppercase tracking-[0.18em] text-[var(--color-mist)]">
                          {k}
                        </dt>
                        <dd className="text-right font-sans text-base text-[var(--color-cream)]">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-10 flex flex-wrap items-center gap-6">
                    <span className="font-display text-3xl text-[var(--color-cream)]">
                      {e.valor}
                    </span>
                    <a
                      href={wa(
                        "Olá! Tenho interesse no " +
                          e.nome +
                          ". Poderia me enviar mais informações?",
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-4 border border-[var(--color-gold)]/70 px-9 py-5 font-sans text-[0.84rem] uppercase tracking-[0.22em] text-[var(--color-gold-2)] transition-all duration-500 hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)]"
                    >
                      {e.cta}
                      <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
                    </a>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  VISTA, clímax                                                     */
/* ------------------------------------------------------------------ */

function Vista() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.03, 1]);

  return (
    <section
      id="vista"
      ref={ref}
      className="relative h-[110svh] w-full overflow-hidden bg-black"
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-[-3%] will-change-transform"
      >
        <img
          src={VISTA.image}
          alt="Praia do Estaleiro vista do alto, em Balneário Camboriú"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-25%" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-center"
        >
          <p
            className="font-display italic leading-tight text-white"
            style={{
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              textShadow:
                "0 2px 20px rgba(0,0,0,.55), 0 1px 4px rgba(0,0,0,.45)",
            }}
          >
            {VISTA.quote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  DIFERENCIAIS                                                      */
/* ------------------------------------------------------------------ */

function Diferenciais() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] py-14 md:py-20">
      <Grain />
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-10 max-w-2xl">
          <Eyebrow>Diferenciais</Eyebrow>
          <h2
            className="mt-6 font-display leading-[1.05] text-[var(--color-cream)]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.6rem)" }}
          >
            Um endereço definido{" "}
            <span className="italic text-[var(--color-gold-2)]">pelos detalhes.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-14 md:gap-20">
          {DIFERENCIAIS.map((d, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={d.title}
                className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16"
              >
                <motion.div
                  initial={{ opacity: 0, x: flip ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={d.image}
                      alt={d.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[var(--color-navy)]/10" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, delay: 0.15 }}
                  className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}
                >
                  <div className="font-sans text-[0.98rem] font-medium uppercase tracking-[0.22em] text-[var(--color-gold-2)]">
                    {d.eyebrow}
                  </div>
                  <h3
                    className="mt-6 font-display leading-[1.1] text-[var(--color-cream)]"
                    style={{ fontSize: "clamp(2rem, 3vw, 3rem)" }}
                  >
                    {d.title}
                  </h3>
                  <p className="mt-6 font-sans text-[1.12rem] leading-[1.75] text-[var(--color-mist)]">
                    {d.body}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  GALERIA, scroll horizontal                                        */
/* ------------------------------------------------------------------ */

function Gallery({ onOpen }: { onOpen: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const totalWidth = useMemo(
    () => `-${(GALLERY_IMAGES.length - 1) * 62}vw`,
    [],
  );
  const x = useTransform(scrollYProgress, [0, 1], ["10vw", totalWidth]);

  return (
    <section
      id="galeria"
      ref={ref}
      className="relative bg-[var(--color-navy-2)]"
      style={{ height: `${GALLERY_IMAGES.length * 90}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="mx-auto flex w-full max-w-[1600px] items-end justify-between px-6 pb-8 pt-28 md:px-10">
          <div>
            <Eyebrow>Galeria</Eyebrow>
            <h2
              className="mt-5 font-display leading-none text-[var(--color-cream)]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.4rem)" }}
            >
              <span className="italic text-[var(--color-gold-2)]">Um passeio</span> pelas casas.
            </h2>
          </div>
          <div className="hidden font-sans text-[0.68rem] uppercase tracking-[0.3em] text-[var(--color-mist-2)] md:block">
            Role para revelar →
          </div>
        </div>

        <div className="relative flex-1">
          <motion.div
            style={{ x }}
            className="absolute inset-y-0 flex items-center gap-6 pl-6 pr-[10vw] will-change-transform"
          >
            {GALLERY_IMAGES.map((g, i) => (
              <button
                key={g.src}
                onClick={() => onOpen(i)}
                className="group relative h-[62vh] w-[56vw] shrink-0 overflow-hidden md:w-[46vw]"
              >
                <img
                  src={g.src}
                  alt={g.legenda + " " + (i + 1)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[var(--color-navy)]/0 transition-colors duration-500 group-hover:bg-[var(--color-navy)]/25" />
                <div className="absolute bottom-5 left-5 flex items-center gap-3">
                  <span className="font-display italic text-[var(--color-gold-2)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-8 bg-[var(--color-gold)]/70" />
                  <span className="font-sans text-[0.62rem] uppercase tracking-[0.3em] text-[var(--color-cream)]">
                    {g.legenda}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-navy-3)]/95 backdrop-blur-md"
        >
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-6 top-6 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-mist)] transition-colors hover:text-[var(--color-gold-2)]"
          >
            Fechar ✕
          </button>
          <button
            onClick={onPrev}
            aria-label="Anterior"
            className="absolute left-6 z-10 font-display text-2xl text-[var(--color-mist)] transition-colors hover:text-[var(--color-gold-2)] md:left-10"
          >
            ←
          </button>
          <button
            onClick={onNext}
            aria-label="Próxima"
            className="absolute right-6 z-10 font-display text-2xl text-[var(--color-mist)] transition-colors hover:text-[var(--color-gold-2)] md:right-10"
          >
            →
          </button>
          <motion.img
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={GALLERY_IMAGES[index].src}
            alt={GALLERY_IMAGES[index].legenda}
            className="max-h-[86vh] max-w-[86vw] object-contain"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-mist-2)]">
            {GALLERY_IMAGES[index].legenda} · {String(index + 1).padStart(2, "0")} /{" "}
            {String(GALLERY_IMAGES.length).padStart(2, "0")}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  LOCALIZAÇÃO, um Google Maps por empreendimento                    */
/*                                                                    */
/*  Cada mapa aponta para a coordenada exata e o próprio Google marca */
/*  o ponto, então não precisa de biblioteca nem de pino desenhado.   */
/* ------------------------------------------------------------------ */

function Location() {
  return (
    <section
      id="localizacao"
      className="relative overflow-hidden bg-[var(--color-navy)] py-14 md:py-20"
    >
      <Grain />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <Eyebrow>Localização</Eyebrow>
            <h2
              className="mt-6 font-display leading-[1.08] text-[var(--color-cream)]"
              style={{ fontSize: "clamp(2.3rem, 4.2vw, 3.8rem)" }}
            >
              {LOCATION.title}
            </h2>
            <p className="mt-8 max-w-md font-sans text-[1.12rem] leading-[1.75] text-[var(--color-mist)]">
              {LOCATION.body}
            </p>


          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1 }}
            className="relative md:col-span-7"
          >
            <div className="flex flex-col gap-8">
              {LOCATION.pinos.map((p) => (
                <div key={p.nome}>
                  <div className="mb-3 flex flex-wrap items-baseline gap-3">
                    <span className="font-display text-2xl text-[var(--color-cream)]">
                      {p.nome}
                    </span>
                    <span className="font-sans text-[0.82rem] uppercase tracking-[0.2em] text-[var(--color-gold-2)]">
                      {p.detalhe}
                    </span>
                  </div>
                  <div className="relative aspect-[16/9] overflow-hidden border border-[var(--color-line-2)]/50">
                    <iframe
                      title={"Mapa do " + p.nome}
                      src={p.mapa}
                      className="h-full w-full"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                               */
/* ------------------------------------------------------------------ */

function CTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-3)] py-16 md:py-24">
      <Grain />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-10">
        {/* No fluxo, e não mais posicionado por cima: assim ele acompanha o
            título em qualquer espaçamento e nunca cai sobre o texto. */}
        <SignatureLine className="mx-auto mb-10 h-16" />
        <h2
          className="font-display leading-[1.05] text-[var(--color-cream)]"
          style={{ fontSize: "clamp(2.6rem, 6vw, 5.4rem)" }}
        >
          Conheça o Pátio{" "}
          <span className="italic text-[var(--color-gold-2)]">Estaleiro</span>{" "}
          <span className="italic">pessoalmente.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl font-sans text-[1.12rem] leading-[1.75] text-[var(--color-mist)]">
          Visitas mediante agendamento. Nossa equipe conduz uma apresentação
          reservada das residências, das plantas e da praia.
        </p>
        <a
          href={wa("Olá! Gostaria de agendar uma visita ao Pátio Estaleiro.")}
          target="_blank"
          rel="noreferrer"
          className="group relative mt-14 inline-flex items-center gap-4 border border-[var(--color-gold)]/70 bg-transparent px-14 py-7 font-sans text-[0.92rem] uppercase tracking-[0.26em] text-[var(--color-gold-2)] transition-all duration-500 hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)]"
        >
          Agendar visita
          <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                            */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="bg-[var(--color-navy-3)] pb-14 pt-20">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <img
              src={LOGO}
              alt="A10 Empreendimentos"
              className="h-14 w-auto md:h-16"
              style={{ filter: "brightness(0) invert(1)" }}
              loading="lazy"
            />
            <p className="mt-6 max-w-sm font-sans text-[1.02rem] leading-[1.7] text-[var(--color-mist)]">
              {CONTATO.endereco}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={"WhatsApp " + WHATSAPP_LABEL}
              className="flex h-14 w-14 items-center justify-center border border-[var(--color-gold)]/70 text-[var(--color-gold-2)] transition-all duration-500 hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.695.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.02 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.02 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.51-8.413z" />
              </svg>
            </a>
            <a
              href={CONTATO.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label={"Instagram " + CONTATO.instagram_label}
              className="flex h-14 w-14 items-center justify-center border border-[var(--color-gold)]/70 text-[var(--color-gold-2)] transition-all duration-500 hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-7 w-7"
              >
                <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-14 h-px w-full bg-[var(--color-line-2)]/60" />
        <p className="mx-auto mt-8 max-w-3xl text-center font-sans text-[0.86rem] leading-relaxed text-[var(--color-mist-2)]">
          Imagens meramente ilustrativas. Metragens, valores e disponibilidade
          sujeitos a confirmação. Registro de incorporação sob consulta. ©{" "}
          {new Date().getFullYear()} A10 Empreendimentos. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  WHATSAPP FLUTUANTE                                                */
/* ------------------------------------------------------------------ */

function FloatingWhatsapp() {
  /* Fica sempre na tela, desde o topo. */
  return (
    <>
      {true && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Falar no WhatsApp"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:scale-110 md:h-16 md:w-16"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7 text-white md:h-8 md:w-8"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.695.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.02 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.02 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.51-8.413z" />
          </svg>
        </motion.a>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  PÁGINA                                                            */
/* ------------------------------------------------------------------ */

export default function PatioEstaleiro() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const original = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = original;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-navy)] font-sans text-[var(--color-cream)] antialiased">
      <Navbar />
      <Hero />
      <Portfolio />
      <Empreendimentos />
      <Vista />
      <Stats />
      <Diferenciais />
      <Gallery onOpen={setLightbox} />
      <Location />
      <CTA />
      <Footer />
      <FloatingWhatsapp />
      <Lightbox
        index={lightbox}
        onClose={() => setLightbox(null)}
        onPrev={() =>
          setLightbox((i) =>
            i === null
              ? i
              : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
          )
        }
        onNext={() =>
          setLightbox((i) =>
            i === null ? i : (i + 1) % GALLERY_IMAGES.length,
          )
        }
      />
    </div>
  );
}

export type _MV = MotionValue<number>;
