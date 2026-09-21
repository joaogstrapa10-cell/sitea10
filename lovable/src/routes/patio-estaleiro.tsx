import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  LOGO_URL,
  bySlug,
  contato,
  fotoUrl,
  patioLanding,
  waLink,
  type LandingSecao,
} from "@/data/empreendimentos";
import { Lightbox } from "@/components/Lightbox";
import { DetailMapClient } from "@/components/MapClient";

const TITLE = "Pátio Estaleiro Private Residences · A10 Empreendimentos";
const DESC =
  "Oito residências contemporâneas a 90 metros da Praia do Estaleiro, em Balneário Camboriú. Projeto de Marcos Jobim. Restam duas: Casa Mar e Casa Brisa.";

export const Route = createFileRoute("/patio-estaleiro")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/patio-estaleiro" },
      { property: "og:image", content: fotoUrl("patio-estaleiro") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/patio-estaleiro" }],
  }),
  component: Patio,
});

const CTA_WA = "Olá! Gostaria de agendar uma visita ao Pátio Estaleiro.";

const IconePin = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 14.5S3 10.2 3 6.5a5 5 0 1110 0C13 10.2 8 14.5 8 14.5z" />
    <circle cx="8" cy="6.4" r="1.9" />
  </svg>
);

function Patio() {
  const emp = bySlug("patio-estaleiro");
  const L = patioLanding;

  const grupos = useMemo(() => emp?.grupos ?? [], [emp]);
  const todas = useMemo(
    () => (grupos.length ? grupos.reduce<string[]>((a, g) => a.concat(g.fotos || []), []) : (emp?.fotos ?? []).slice(1)),
    [grupos, emp],
  );
  const [lb, setLb] = useState<number | null>(null);

  const sec = (id: string): LandingSecao | undefined => L.secoes.find((s) => s.id === id);
  const foto = (i: number) => fotoUrl(todas[Math.min(i, Math.max(todas.length - 1, 0))] ?? "patio-estaleiro");

  const filosofia = sec("filosofia");
  const residencias = sec("residencias");
  const natureza = sec("natureza");
  const santuario = sec("santuario");
  const localizacao = sec("localizacao");

  const disponiveis = emp?.condominio?.unidades_disponiveis ?? [];

  // Miniaturas por casa, com o deslocamento acumulado para o lightbox.
  let off = 0;
  const blocos = grupos.map((g) => {
    const f = g.fotos || [];
    const inicio = off;
    off += f.length;
    return { nome: g.nome, fotos: f, off: inicio };
  });

  return (
    <div className="pl">
      <header className="pl-hero">
        <div className="pl-hero-bg">
          <img src={fotoUrl("patio-estaleiro")} alt="Pátio Estaleiro" fetchPriority="high" />
        </div>
        <div className="pl-hero-in">
          <div className="wrap">
            <div className="eye">{L.eyebrow}</div>
            <h1>
              {L.titulo}
              <em>{L.titulo_2}</em>
            </h1>
            <p>{L.subtitulo}</p>
            <div className="acts">
              <a className="pl-btn-gold" href={waLink(undefined, CTA_WA)} target="_blank" rel="noopener noreferrer">
                {L.cta}
              </a>
              <a className="pl-btn-line" href="#galeria">
                Ver as fotos
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="pl-disp">
        <div className="wrap pl-disp-in">
          <span className="disp-lb">Disponibilidade</span>
          <span className="tx">{L.disponibilidade}</span>
        </div>
      </div>

      {filosofia && (
        <section className="blk cream" id={filosofia.id}>
          <div className="wrap">
            <div className="k">{filosofia.kicker}</div>
            <h2 className="t">{filosofia.titulo}</h2>
            <p className="lead">{filosofia.texto}</p>
            <div className="pl-valores">
              {(filosofia.valores ?? []).map(([n, tit, tx]) => (
                <div className="pl-valor" key={n}>
                  <div className="n">{n}</div>
                  <h3>{tit}</h3>
                  <p>{tx}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {residencias && (
        <section className="blk" id={residencias.id}>
          <div className="wrap">
            <div className="pl-split">
              <div>
                <div className="k">{residencias.kicker}</div>
                <h2 className="t">{residencias.titulo}</h2>
                <p className="lead">{residencias.texto}</p>
                <div className="pl-stats">
                  {(residencias.stats ?? []).map(([v, l]) => (
                    <div className="pl-stat" key={l}>
                      <div className="v">{v}</div>
                      <div className="l">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pl-split-img">
                <img src={foto(0)} alt="Residências do Pátio Estaleiro" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      )}

      {natureza && (
        <section className="blk navy" id={natureza.id}>
          <div className="wrap">
            <div className="pl-split rev">
              <div className="pl-split-img wide">
                <img src={foto(1)} alt="Jardim, deck e piscina privativa" loading="lazy" />
              </div>
              <div>
                <div className="k">{natureza.kicker}</div>
                <h2 className="t">{natureza.titulo}</h2>
                <p className="lead">{natureza.texto}</p>
                <ul className="pl-bl">
                  {(natureza.bullets ?? []).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {santuario && (
        <section className="blk cream" id={santuario.id}>
          <div className="wrap">
            <div className="pl-max70">
              <div className="k">{santuario.kicker}</div>
              <h2 className="t">{santuario.titulo}</h2>
              <p className="lead">{santuario.texto}</p>
            </div>
            <div className="pl-selos">
              {(santuario.selos ?? []).map(([b, s]) => (
                <div className="pl-selo" key={b}>
                  <b>{b}</b>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            {santuario.citacao && <blockquote className="pl-cit">{santuario.citacao}</blockquote>}
          </div>
        </section>
      )}

      <section className="blk" id="galeria">
        <div className="wrap">
          <div className="k">Galeria de fotos</div>
          <h2 className="t">
            As casas por <em>dentro.</em>
          </h2>
          <p className="lead">
            {todas.length} fotos das {disponiveis.length} residências que ainda estão disponíveis:{" "}
            {disponiveis.join(" e ")}.
          </p>
          <div className="pl-gal-wrap">
            {blocos.length ? (
              blocos.map((b) => (
                <div className="pl-gal-grp" key={b.nome}>
                  <div className="pl-gal-grp-t">
                    {b.nome} · {b.fotos.length} fotos
                  </div>
                  <div className="pl-gal-grid">
                    {b.fotos.map((k, i) => (
                      <button
                        className="gthumb"
                        key={k}
                        onClick={() => setLb(b.off + i)}
                        aria-label={"Ampliar foto " + (b.off + i + 1)}
                      >
                        <img src={fotoUrl(k)} alt={b.nome + " " + (i + 1)} loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="pl-gal-grid">
                {todas.map((k, i) => (
                  <button className="gthumb" key={k} onClick={() => setLb(i)} aria-label={"Ampliar foto " + (i + 1)}>
                    <img src={fotoUrl(k)} alt={"Foto " + (i + 1)} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {localizacao && emp && (
        <section className="blk cream" id={localizacao.id}>
          <div className="wrap">
            <div className="pl-max68">
              <div className="k">{localizacao.kicker}</div>
              <h2 className="t">{localizacao.titulo}</h2>
              {localizacao.subtitulo && <p className="lead sub">{localizacao.subtitulo}</p>}
              <p className="lead">{localizacao.texto}</p>
              <div className="pl-stats">
                {(localizacao.stats ?? []).map(([v, l]) => (
                  <div className="pl-stat" key={l}>
                    <div className="v">{v}</div>
                    <div className="l">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <DetailMapClient e={emp} className="pl-map" pinFill="#B7965A" />
            <div className="pl-mapmeta">
              <div className="pl-endereco">
                <b>Endereço</b>
                {emp.endereco}
              </div>
              <a
                className="pl-maps-link"
                href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(emp.endereco)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconePin /> Ver no Google Maps
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="blk navy" id="contato">
        <div className="wrap pl-ct">
          <div className="k">{L.contato.kicker}</div>
          <h2 className="t">{L.contato.titulo}</h2>
          <p className="lead">{L.contato.texto}</p>

          <div className="pl-ct-grid">
            <div className="pl-ct-card">
              <h3>Endereço</h3>
              <p>{contato.endereco}</p>
            </div>
            <div className="pl-ct-card">
              <h3>Fale com a gente</h3>
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp {contato.whatsapp_label}
              </a>
              <a href={"mailto:" + contato.email}>{contato.email}</a>
            </div>
            <div className="pl-ct-card">
              <h3>Horário de atendimento</h3>
              {contato.horario.map(([dia, hora]) => (
                <div className="hora" key={dia}>
                  <span>{dia}</span>
                  <span>{hora}</span>
                </div>
              ))}
            </div>
            <div className="pl-ct-card">
              <h3>Redes sociais</h3>
              <a href={contato.instagram} target="_blank" rel="noopener noreferrer">
                Instagram {contato.instagram_label}
              </a>
              <a href={contato.youtube} target="_blank" rel="noopener noreferrer">
                YouTube {contato.youtube_label}
              </a>
            </div>
          </div>

          <div className="pl-ct-cta">
            <a className="pl-btn-gold" href={waLink(undefined, CTA_WA)} target="_blank" rel="noopener noreferrer">
              {L.cta}
            </a>
          </div>

          <div className="pl-foot-top" style={{ justifyContent: "center", marginTop: "clamp(40px,5vw,68px)" }}>
            <div style={{ textAlign: "center" }}>
              <img className="pl-foot-logo" src={LOGO_URL} alt="A10 Empreendimentos" loading="lazy" style={{ margin: "0 auto" }} />
              <div className="pl-foot-assin" style={{ margin: "18px auto 0" }}>
                {L.rodape.assinatura}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Lightbox fotos={todas} index={lb} onChange={setLb} />
    </div>
  );
}
