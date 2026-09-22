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
  useInView,
  useReducedMotion,
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

const HERO = {
  eyebrow: "A10 Empreendimentos · Balneário Camboriú",
  titleItalic: "Pátio",
  titleUpper: "Estaleiro",
  tagline: "Viver à altura do mar.",
  image: img("patio-estaleiro"),
};

const MANIFESTO =
  "Oito residências erguidas a noventa metros do mar, na Praia do Estaleiro. Arquitetura que emoldura a paisagem, privacidade que se torna endereço, e uma exclusividade reservada a duas famílias.";

const STATS = [
  { value: 8, suffix: "", label: "Residências no condomínio" },
  { value: 2, suffix: "", label: "Ainda disponíveis" },
  { value: 90, suffix: " m", label: "Distância da praia" },
  { value: 344, suffix: " m²", label: "Maior área privativa" },
];

/* Os dois carros-chefe da A10 hoje. */
const DESTAQUES = [
  {
    slug: "patio-estaleiro",
    eyebrow: "Praia do Estaleiro · Balneário Camboriú",
    nome: "Pátio Estaleiro",
    tag: "Casas exclusivas, o mar como quintal.",
    texto:
      "Um conjunto privado de oito residências contemporâneas assinadas pelo arquiteto Marcos Jobim, a noventa metros da areia. Restam duas: a Casa Mar, de 344 m² privativos, e a Casa Brisa, de 299 m². Cada uma com quatro suítes, piscina privativa e três vagas.",
    valor: "R$ 6,89 mi",
    imagem: img("patio-estaleiro"),
    specs: [
      ["Casas", "8 no condomínio, 2 disponíveis"],
      ["Área privativa", "344 e 299 m²"],
      ["Dormitórios", "4 suítes em cada casa"],
      ["Vagas", "3 por residência"],
    ],
    cta: "Falar sobre o Pátio Estaleiro",
  },
  {
    slug: "solenne",
    eyebrow: "Centro · Balneário Camboriú",
    nome: "Solenne",
    tag: "A elegância do singular.",
    texto:
      "Torre neoclássica de herança francesa entre o Centro e a Barra Sul, a setecentos metros da praia. São trinta e cinco pavimentos e mais de cento e dez metros de altura, com lazer estilo home club de mais de mil e seiscentos metros quadrados distribuídos em dezessete ambientes.",
    valor: "Sob consulta",
    imagem: img("solenne-hero"),
    specs: [
      ["Pavimentos", "35, mais de 110 m de altura"],
      ["Área privativa", "138,59 m², duplex até 305 m²"],
      ["Dormitórios", "3 suítes, master de 22,20 m²"],
      ["Vagas", "2 mais hobby box"],
    ],
    cta: "Falar sobre o Solenne",
  },
];

/* O restante do portfólio A10. */
const PORTFOLIO = [
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
  image: img("patio-mar-3"),
  quote: "O mar é o quintal desta casa.",
};

const DIFERENCIAIS = [
  {
    eyebrow: "Privacidade",
    title: "Oito residências, e só.",
    body:
      "Um condomínio fechado desenhado para o resguardo pleno da vida familiar, com jardins e áreas externas protegidas. Restam a Casa Mar e a Casa Brisa.",
    image: img("patio-brisa-2"),
  },
  {
    eyebrow: "Autoria",
    title: "Projeto de Marcos Jobim.",
    body:
      "Linhas puras e materiais nobres em um partido que integra a arquitetura moderna externa ao aconchego dos materiais naturais no interior.",
    image: img("patio-mar-5"),
  },
  {
    eyebrow: "Lazer privativo",
    title: "Piscina, deck e jardim em cada casa.",
    body:
      "A transição entre os espaços internos e externos convida o verde para dentro. Decks de madeira nobre e piscinas particulares cercadas por vegetação nativa.",
    image: img("patio-brisa-7"),
  },
  {
    eyebrow: "Noventa metros",
    title: "A menor distância entre você e a areia.",
    body:
      "A Praia do Estaleiro é reconhecida pelas águas cristalinas, pela restinga preservada e pela certificação Bandeira Azul.",
    image: img("patio-mar-1"),
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
  { src: img("solenne-hero"), legenda: "Solenne" },
  { src: img("solenne-3"), legenda: "Solenne" },
];

const LOCATION = {
  title: "Dois endereços em Balneário Camboriú.",
  body:
    "O Pátio Estaleiro ocupa a Praia do Estaleiro, a noventa metros da areia, uma das faixas mais preservadas do litoral catarinense. O Solenne fica entre o Centro e a Barra Sul, a setecentos metros da praia central.",
  points: [
    "90 m da areia, na Praia do Estaleiro",
    "700 m da praia central, no Centro",
    "12 min do Aeroporto de Navegantes",
    "Acesso direto à BR-101",
  ],
  pinos: [
    {
      nome: "Pátio Estaleiro",
      detalhe: "Praia do Estaleiro",
      lat: -27.026191931412384,
      lng: -48.58221290072425,
      destaque: true,
    },
    {
      nome: "Solenne",
      detalhe: "Centro, praia central",
      lat: -27.00169512068981,
      lng: -48.6268836750322,
      destaque: false,
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
      <span className="block h-full w-px bg-gradient-to-b from-[var(--color-gold)] via-[var(--color-gold)]/40 to-[var(--color-gold)]" />
      <span className="block h-[6px] w-[6px] rounded-full bg-[var(--color-gold)]" />
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-gold-2)]">
      <span className="h-px w-8 bg-[var(--color-gold)]/70" />
      <span>{children}</span>
    </div>
  );
}

/* Animated counter */
function Counter({
  to,
  suffix = "",
  duration = 1600,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [n, setN] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
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
        <a
          href="#top"
          className="font-display text-xl italic tracking-wide text-[var(--color-cream)]"
        >
          A<span className="text-[var(--color-gold-2)]">10</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-sans text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-mist)] transition-colors duration-500 hover:text-[var(--color-gold-2)]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden border border-[var(--color-gold)]/70 px-5 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-gold-2)] transition-all duration-500 hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] md:inline-block"
        >
          WhatsApp
        </a>

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
                  className="font-sans text-xs uppercase tracking-[0.28em] text-[var(--color-mist)]"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block w-fit border border-[var(--color-gold)]/70 px-5 py-2.5 font-sans text-xs uppercase tracking-[0.3em] text-[var(--color-gold-2)]"
              >
                WhatsApp
              </a>
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

  const words = HERO.titleUpper.split("");

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
        <img
          src={HERO.image}
          alt="Casas do Pátio Estaleiro, na Praia do Estaleiro, Balneário Camboriú"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
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
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 h-px w-40 origin-left bg-[var(--color-gold)]"
          />

          <h1 className="font-display leading-[0.9] text-[var(--color-cream)]">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="block italic font-light"
              style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
            >
              {HERO.titleItalic}
            </motion.span>
            <span
              className="block uppercase font-normal tracking-[0.05em] -mt-2 md:-mt-4"
              style={{ fontSize: "clamp(3.4rem, 12vw, 11rem)" }}
            >
              {words.map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.9 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.5 }}
            className="mt-10 font-display italic text-[var(--color-mist)]"
            style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}
          >
            {HERO.tagline}
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
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
/*  MANIFESTO                                                         */
/* ------------------------------------------------------------------ */

function Manifesto() {
  const words = MANIFESTO.split(" ");

  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] py-40 md:py-56">
      <Grain />
      <SignatureLine className="absolute left-8 top-24 h-32 md:left-16" />
      <SignatureLine className="absolute right-8 bottom-24 h-32 md:right-16" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-10">
        <div className="mb-14 flex items-center gap-4">
          <span className="h-px w-14 bg-[var(--color-gold)]" />
          <span className="font-sans text-[0.7rem] uppercase tracking-[0.32em] text-[var(--color-gold-2)]">
            Manifesto
          </span>
        </div>
        <p
          className="font-display leading-[1.25] text-[var(--color-cream)]"
          style={{ fontSize: "clamp(1.6rem, 3.2vw, 3rem)" }}
        >
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.7,
                delay: i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {w}&nbsp;
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  STATS                                                             */
/* ------------------------------------------------------------------ */

function Stats() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-2)] py-20 md:py-28">
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
              <div
                className="font-display font-light leading-none text-[var(--color-cream)]"
                style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-6 h-px w-10 bg-[var(--color-gold)]/70" />
              <div className="mt-4 font-sans text-[0.68rem] uppercase tracking-[0.32em] text-[var(--color-mist-2)]">
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
/*  EMPREENDIMENTOS                                                   */
/* ------------------------------------------------------------------ */

function Empreendimentos() {
  return (
    <section
      id="empreendimentos"
      className="relative overflow-hidden bg-[var(--color-navy)] py-32 md:py-44"
    >
      <Grain />
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-24 max-w-2xl">
          <Eyebrow>Empreendimentos</Eyebrow>
          <h2
            className="mt-6 font-display leading-[1.05] text-[var(--color-cream)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}
          >
            Os endereços <span className="italic">à venda hoje.</span>
          </h2>
          <p className="mt-8 max-w-xl font-sans text-[0.95rem] leading-relaxed text-[var(--color-mist)]">
            O Pátio Estaleiro e o Solenne são os carros-chefe da A10 neste
            momento. Abaixo deles, o restante do portfólio próprio.
          </p>
        </div>

        <div className="flex flex-col gap-32 md:gap-48">
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
                  <div className="flex items-center gap-3">
                    <span className="font-display italic text-[var(--color-gold-2)] text-sm">
                      0{i + 1}
                    </span>
                    <span className="h-px w-10 bg-[var(--color-gold)]/60" />
                    <span className="font-sans text-[0.68rem] uppercase tracking-[0.3em] text-[var(--color-gold-2)]">
                      {e.eyebrow}
                    </span>
                  </div>

                  <h3
                    className="mt-6 font-display leading-[1.1] text-[var(--color-cream)]"
                    style={{ fontSize: "clamp(2rem, 3vw, 3rem)" }}
                  >
                    {e.nome}
                  </h3>
                  <p className="mt-3 font-display italic text-[var(--color-gold-2)]">
                    {e.tag}
                  </p>
                  <p className="mt-6 font-sans text-[0.95rem] leading-relaxed text-[var(--color-mist)]">
                    {e.texto}
                  </p>

                  <dl className="mt-10 flex flex-col">
                    {e.specs.map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-baseline justify-between gap-6 border-b border-[var(--color-line)]/50 py-3"
                      >
                        <dt className="font-sans text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-mist-2)]">
                          {k}
                        </dt>
                        <dd className="text-right font-sans text-sm text-[var(--color-cream)]">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-10 flex flex-wrap items-center gap-6">
                    <span className="font-display text-2xl text-[var(--color-cream)]">
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
                      className="group inline-flex items-center gap-4 border border-[var(--color-gold)]/70 px-7 py-4 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-gold-2)] transition-all duration-500 hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)]"
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

        {/* Restante do portfólio */}
        <div className="mt-32 md:mt-48">
          <div className="mb-12 flex items-center gap-4">
            <span className="h-px w-14 bg-[var(--color-gold)]" />
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.32em] text-[var(--color-gold-2)]">
              Também no portfólio A10
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={p.imagem}
                    alt={p.nome}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/85 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="font-sans text-[0.62rem] uppercase tracking-[0.3em] text-[var(--color-gold-2)]">
                      {p.cidade}
                    </div>
                    <div className="mt-2 font-display text-2xl text-[var(--color-cream)]">
                      {p.nome}
                    </div>
                    <div className="mt-1 font-sans text-sm text-[var(--color-mist)]">
                      {p.valor}
                    </div>
                  </div>
                </div>
                <p className="mt-5 font-sans text-[0.9rem] leading-relaxed text-[var(--color-mist)]">
                  {p.resumo}
                </p>
              </motion.a>
            ))}
          </div>
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
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section
      id="vista"
      ref={ref}
      className="relative h-[110svh] w-full overflow-hidden bg-black"
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-[-10%] will-change-transform"
      >
        <img
          src={VISTA.image}
          alt="Vista das casas do Pátio Estaleiro"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/40 via-transparent to-[var(--color-navy)]/60" />
      <Grain />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-25%" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-center"
        >
          <Eyebrow>Vista</Eyebrow>
          <p
            className="mt-8 font-display italic leading-tight text-[var(--color-cream)]"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
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
    <section className="relative overflow-hidden bg-[var(--color-navy)] py-32 md:py-44">
      <Grain />
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-24 max-w-2xl">
          <Eyebrow>Diferenciais</Eyebrow>
          <h2
            className="mt-6 font-display leading-[1.05] text-[var(--color-cream)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}
          >
            Um endereço definido{" "}
            <span className="italic">pelos detalhes.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-32 md:gap-48">
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
                  <div className="flex items-center gap-3">
                    <span className="font-display italic text-[var(--color-gold-2)] text-sm">
                      0{i + 1}
                    </span>
                    <span className="h-px w-10 bg-[var(--color-gold)]/60" />
                    <span className="font-sans text-[0.68rem] uppercase tracking-[0.3em] text-[var(--color-gold-2)]">
                      {d.eyebrow}
                    </span>
                  </div>
                  <h3
                    className="mt-6 font-display leading-[1.1] text-[var(--color-cream)]"
                    style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.4rem)" }}
                  >
                    {d.title}
                  </h3>
                  <p className="mt-6 font-sans text-[0.95rem] leading-relaxed text-[var(--color-mist)]">
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
              style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
            >
              <span className="italic">Um passeio</span> pelas casas.
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
/*  LOCALIZAÇÃO, mapa real com um pino por empreendimento             */
/*                                                                    */
/*  O Leaflet entra pelo CDN dentro do useEffect, então não precisa   */
/*  instalar pacote nenhum e nada disso roda no servidor.             */
/* ------------------------------------------------------------------ */

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

function carregarLeaflet(): Promise<any> {
  const w = window as any;
  if (w.L) return Promise.resolve(w.L);
  if (w.__leafletPromise) return w.__leafletPromise;

  w.__leafletPromise = new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }
    const s = document.createElement("script");
    s.src = LEAFLET_JS;
    s.async = true;
    s.onload = () => resolve((window as any).L);
    s.onerror = () => reject(new Error("Leaflet não carregou"));
    document.head.appendChild(s);
  });
  return w.__leafletPromise;
}

function Mapa() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mapa: any = null;
    let vivo = true;

    carregarLeaflet()
      .then((L) => {
        if (!vivo || !ref.current) return;

        mapa = L.map(ref.current, {
          scrollWheelZoom: false,
          attributionControl: true,
        });

        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
          {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap, &copy; CARTO",
          },
        ).addTo(mapa);

        const pino = (dourado: boolean) =>
          L.divIcon({
            className: "a10-pino",
            html:
              '<svg width="34" height="46" viewBox="0 0 36 48" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M18 1C9.2 1 2 8.2 2 17c0 11.2 16 30 16 30s16-18.8 16-30C34 8.2 26.8 1 18 1z" fill="' +
              (dourado ? "#E4C987" : "#F2EDE3") +
              '" stroke="#0B1624" stroke-width="2"/>' +
              '<circle cx="18" cy="17" r="6" fill="#0B1624"/></svg>',
            iconSize: [34, 46],
            iconAnchor: [17, 44],
          });

        const pontos: [number, number][] = [];
        LOCATION.pinos.forEach((p) => {
          L.marker([p.lat, p.lng], { icon: pino(p.destaque) })
            .addTo(mapa)
            .bindTooltip(
              '<b>' + p.nome + "</b><br>" + p.detalhe,
              {
                permanent: true,
                direction: "top",
                offset: [0, -44],
                className: "a10-tip",
              },
            );
          pontos.push([p.lat, p.lng]);
        });

        mapa.fitBounds(pontos, { padding: [70, 70], maxZoom: 14 });
        setTimeout(() => mapa && mapa.invalidateSize(), 180);
      })
      .catch(() => {
        /* sem mapa, a seção continua legível pelo texto e pela lista */
      });

    return () => {
      vivo = false;
      if (mapa) mapa.remove();
    };
  }, []);

  return <div ref={ref} className="h-full w-full" />;
}

function Location() {
  return (
    <section
      id="localizacao"
      className="relative overflow-hidden bg-[var(--color-navy)] py-32 md:py-44"
    >
      <Grain />
      <style>{`
        .a10-pino{background:none;border:0;filter:drop-shadow(0 3px 8px rgba(0,0,0,.55))}
        .a10-tip{background:rgba(11,22,36,.92)!important;border:1px solid rgba(228,201,135,.45)!important;
          border-radius:0!important;box-shadow:none!important;color:#F2EDE3!important;
          font-family:inherit!important;font-size:11px!important;line-height:1.5;padding:6px 11px!important;text-align:center}
        .a10-tip b{color:#E4C987;font-size:13px}
        .a10-tip::before{display:none!important}
        .leaflet-control-attribution{background:rgba(11,22,36,.7)!important;color:#7B8697!important;font-size:10px!important}
        .leaflet-control-attribution a{color:#9AA5B5!important}
      `}</style>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <Eyebrow>Localização</Eyebrow>
            <h2
              className="mt-6 font-display leading-[1.08] text-[var(--color-cream)]"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 3rem)" }}
            >
              {LOCATION.title}
            </h2>
            <p className="mt-8 max-w-md font-sans text-[0.95rem] leading-relaxed text-[var(--color-mist)]">
              {LOCATION.body}
            </p>

            <ul className="mt-12 flex flex-col gap-4">
              {LOCATION.points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-4 border-b border-[var(--color-line)]/50 pb-4 font-sans text-sm text-[var(--color-cream)]"
                >
                  <span className="h-px w-6 bg-[var(--color-gold)]" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-col gap-3">
              {LOCATION.pinos.map((p) => (
                <div key={p.nome} className="flex items-center gap-3">
                  <span
                    className="block h-2.5 w-2.5 rounded-full"
                    style={{
                      background: p.destaque ? "#E4C987" : "#F2EDE3",
                    }}
                  />
                  <span className="font-sans text-sm text-[var(--color-cream)]">
                    {p.nome}
                  </span>
                  <span className="font-sans text-xs text-[var(--color-mist-2)]">
                    {p.detalhe}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1 }}
            className="relative md:col-span-7"
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-[var(--color-line-2)]/50">
              <Mapa />
            </div>
            <p className="mt-4 font-sans text-xs italic text-[var(--color-mist-2)]">
              Localização aproximada. Confirme o endereço exato com o corretor.
            </p>
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
    <section className="relative overflow-hidden bg-[var(--color-navy-3)] py-40 md:py-56">
      <Grain />
      <SignatureLine className="absolute left-1/2 top-16 h-24 -translate-x-1/2" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-10">
        <Eyebrow>Convite</Eyebrow>
        <h2
          className="mt-8 font-display leading-[1.05] text-[var(--color-cream)]"
          style={{ fontSize: "clamp(2rem, 5vw, 4.4rem)" }}
        >
          Conheça o Pátio Estaleiro{" "}
          <span className="italic">pessoalmente.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl font-sans text-[0.95rem] leading-relaxed text-[var(--color-mist)]">
          Visitas mediante agendamento. Nossa equipe conduz uma apresentação
          reservada das residências, das plantas e da praia.
        </p>
        <a
          href={wa("Olá! Gostaria de agendar uma visita ao Pátio Estaleiro.")}
          target="_blank"
          rel="noreferrer"
          className="group relative mt-14 inline-flex items-center gap-4 border border-[var(--color-gold)]/70 bg-transparent px-10 py-5 font-sans text-[0.72rem] uppercase tracking-[0.32em] text-[var(--color-gold-2)] transition-all duration-500 hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)]"
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
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="font-display text-3xl italic text-[var(--color-cream)]">
              A<span className="text-[var(--color-gold-2)]">10</span>
            </div>
            <div className="mt-4 font-sans text-[0.68rem] uppercase tracking-[0.32em] text-[var(--color-mist-2)]">
              Vendas exclusivas · A10 Empreendimentos
            </div>
            <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-[var(--color-mist)]">
              {CONTATO.endereco}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-[0.7rem] uppercase tracking-[0.32em] text-[var(--color-gold-2)]"
            >
              WhatsApp {WHATSAPP_LABEL} →
            </a>
            <a
              href={CONTATO.instagram}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-sm text-[var(--color-mist)] transition-colors hover:text-[var(--color-gold-2)]"
            >
              Instagram {CONTATO.instagram_label}
            </a>
          </div>
        </div>
        <div className="mt-14 h-px w-full bg-[var(--color-line-2)]/60" />
        <p className="mt-8 max-w-3xl font-sans text-[0.72rem] leading-relaxed text-[var(--color-mist-2)]">
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
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
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
    </AnimatePresence>
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
      <Manifesto />
      <Stats />
      <Empreendimentos />
      <Vista />
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
