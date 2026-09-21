import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { bySlug, cover, fotoUrl, gallery, isConf, precoLabel, waLink } from "@/data/empreendimentos";
import { Lightbox } from "@/components/Lightbox";
import { DetailMapClient } from "@/components/MapClient";

export const Route = createFileRoute("/empreendimento/$slug")({
  head: ({ params }) => {
    const e = bySlug(params.slug);
    const title = (e ? e.nome : "Empreendimento") + " · A10 Empreendimentos";
    const desc = e ? e.descricao || e.tag : "Empreendimento do portfólio da A10.";
    const ck = e ? cover(e) : null;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/empreendimento/" + params.slug },
        ...(ck ? [{ property: "og:image", content: fotoUrl(ck) }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/empreendimento/" + params.slug }],
    };
  },
  component: Detalhe,
});

type IconKey = "bed" | "bath" | "car" | "ruler";

const PATHS: Record<IconKey, string> = {
  bed: "M2 12V5h12v7M2 9h12M5 5V3h6v2",
  bath: "M3 9h11M4 9V5a1.6 1.6 0 013.1-.4M14 9v1.5a2.5 2.5 0 01-2.5 2.5h-7A2.5 2.5 0 012 10.5V9",
  car: "M2 10h12l-1-4H3L2 10zM4 10v2m8-2v2M4 7h8",
  ruler: "M2 6h12v4H2zM4 6v2M6 6v3M8 6v2M10 6v3M12 6v2",
};

const Icone = ({ k }: { k: IconKey }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={PATHS[k]} />
  </svg>
);

type Aba = "gal" | "info" | "loc";

function Detalhe() {
  const { slug } = Route.useParams();
  const e = bySlug(slug);

  const ck = e ? cover(e) : null;
  const fotos = useMemo(() => (e ? gallery(e) : []), [e]);

  // A capa pode não estar dentro de `grupos`, como no Pátio Estaleiro. Quando
  // isso acontece ela entra no lightbox na posição 0 e as miniaturas dos grupos
  // começam em 1.
  const solta = !!ck && fotos[0] !== ck;
  const lbFotos = useMemo(() => (solta && ck ? [ck, ...fotos] : fotos), [solta, ck, fotos]);
  const base = solta ? 1 : 0;

  const [aba, setAba] = useState<Aba>(fotos.length ? "gal" : "info");
  const [lb, setLb] = useState<number | null>(null);

  useEffect(() => {
    setAba(fotos.length ? "gal" : "info");
    setLb(null);
    window.scrollTo(0, 0);
  }, [slug, fotos.length]);

  if (!e) {
    return (
      <main>
        <div className="nav-spacer" />
        <div className="wrap">
          <div className="empty">
            <b>Empreendimento não encontrado</b>
            <p>Talvez o endereço tenha mudado.</p>
            <div className="ct-cta">
              <Link to="/empreendimentos" className="btn btn-line">
                Ver o catálogo <span className="arw">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const specs: [IconKey, string][] = [
    ["bed", e.quartos],
    ["bath", e.banheirosNum ? e.banheirosNum + " banheiros" : ""],
    ["car", e.vagas],
    ["ruler", e.metragem],
  ];
  const specsOk = specs.filter(([, v]) => isConf(v));

  const endereco = isConf(e.endereco) ? e.endereco : isConf(e.cidade) ? e.cidade : "Localização a confirmar";
  const buscaMaps = isConf(e.endereco)
    ? e.endereco
    : e.nome + " " + (isConf(e.cidade) ? e.cidade : "Balneário Camboriú");

  // Miniaturas: separadas por casa quando existe `grupos`, senão em bloco único.
  let deslocamento = base;
  const blocos =
    e.grupos && e.grupos.length
      ? e.grupos.map((g) => {
          const f = g.fotos || [];
          const off = deslocamento;
          deslocamento += f.length;
          return { titulo: g.nome + " · " + f.length + " fotos", fotos: f, off };
        })
      : [{ titulo: "", fotos, off: base }];

  // A capa inteira abre o lightbox no clique, e o botão "Ampliar" faz o mesmo
  // pelo teclado, sem aninhar o h1 dentro de um button.
  const abrirCapa = () => ck && setLb(0);

  return (
    <main>
      <div className="d-hero" onClick={abrirCapa}>
        {ck && <img src={fotoUrl(ck)} alt={e.nome} style={{ objectPosition: e.imgpos || "center" }} />}
        <div className="d-hero-in">
          <div className="wrap">
            <div className="kicker">
              {e.tipologia}
              {isConf(e.cidade) ? " · " + e.cidade : ""}
            </div>
            <h1>{e.nome}</h1>
            {e.tag && <div className="dtag">{e.tag}</div>}
            <div className="d-badges">
              {e.categoria === "a10" && <span className="tag light">Empreendimento A10</span>}
              {isConf(e.status) && <span className="tag">{e.status}</span>}
              {e.disponibilidade && <span className="tag gold">{e.disponibilidade}</span>}
            </div>
          </div>
        </div>
        {ck && (
          <button className="btn btn-cream d-zoom" onClick={abrirCapa}>
            Ampliar
          </button>
        )}
      </div>

      <div className="wrap">
        <div className="d-bar">
          <div className="d-price">{precoLabel(e)}</div>
          <a className="btn btn-navy" href={waLink(e.nome)} target="_blank" rel="noopener noreferrer">
            Falar sobre este empreendimento <span className="arw">→</span>
          </a>
        </div>

        <div className="tabs">
          <button className={"tab" + (aba === "gal" ? " on" : "")} onClick={() => setAba("gal")}>
            Galeria de fotos {fotos.length ? <b>{fotos.length}</b> : null}
          </button>
          <button className={"tab" + (aba === "info" ? " on" : "")} onClick={() => setAba("info")}>
            Informações
          </button>
          <button className={"tab" + (aba === "loc" ? " on" : "")} onClick={() => setAba("loc")}>
            Localização
          </button>
        </div>

        {aba === "gal" && (
          <div className="pane">
            {fotos.length ? (
              blocos.map((b) => (
                <div className="gal-grp" key={b.titulo || "unico"}>
                  {b.titulo && <div className="gal-t">{b.titulo}</div>}
                  <div className="gal">
                    {b.fotos.map((k, i) => (
                      <button
                        className="gthumb"
                        key={k}
                        onClick={() => setLb(b.off + i)}
                        aria-label={"Ampliar foto " + (b.off + i + 1)}
                      >
                        <img src={fotoUrl(k)} alt="" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="gvazia">
                <b>Fotos em breve</b>
                <p>Ainda estamos preparando o material deste empreendimento.</p>
              </div>
            )}
          </div>
        )}

        {aba === "info" && (
          <div className="pane">
            {specsOk.length > 0 && (
              <div className="specs">
                {specsOk.map(([k, v]) => (
                  <div className="spec" key={k}>
                    <Icone k={k} />
                    <p>{v}</p>
                  </div>
                ))}
              </div>
            )}
            {e.descricao && (
              <div className="blk">
                <h2>Sobre o empreendimento</h2>
                <p className="lead">{e.descricao}</p>
              </div>
            )}
            {(e.atributos || []).length > 0 && (
              <div className="blk">
                <h2>Atributos e lazer</h2>
                <ul className="attr">
                  {e.atributos.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
            {(e.comodidades || []).length > 0 && (
              <div className="blk">
                <h2>Comodidades</h2>
                <ul className="attr">
                  {e.comodidades.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {aba === "loc" && (
          <div className="pane">
            <DetailMapClient e={e} className="map-box map-det" />
            <div className="mapmeta">
              <div className="endereco">
                <b>Endereço</b>
                <span>{endereco}</span>
              </div>
              <a
                className="btn btn-line"
                href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(buscaMaps)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver no Google Maps <span className="arw">→</span>
              </a>
            </div>
            <p className="aprox">Localização aproximada. Confirme o endereço exato com o corretor.</p>
          </div>
        )}

        <div className="d-end" />
      </div>

      <Lightbox fotos={lbFotos} index={lb} onChange={setLb} />
    </main>
  );
}
