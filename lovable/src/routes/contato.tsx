import { createFileRoute } from "@tanstack/react-router";
import { contato, waLink } from "@/data/empreendimentos";

const TITLE = "Contato · A10 Empreendimentos";
const DESC = "Fale com a A10 Empreendimentos. WhatsApp, e-mail, endereço e horário de atendimento em Balneário Camboriú.";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contato" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: Contato,
});

function Contato() {
  return (
    <main>
      <div className="nav-spacer" />
      <div className="sec-head wrap">
        <div className="kicker">Contato</div>
        <h2 className="sec-title ink mt">
          Agende sua <em className="gold">visita.</em>
        </h2>
        <p>Nossa equipe apresenta cada empreendimento em detalhe, com atendimento direto.</p>
      </div>

      <div className="wrap-narrow">
        <div className="ct-grid">
          <div className="ct-card">
            <h3>Endereço</h3>
            <p>{contato.endereco}</p>
          </div>

          <div className="ct-card">
            <h3>Fale com a gente</h3>
            <a href={waLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp {contato.whatsapp_label}
            </a>
            <a href={"mailto:" + contato.email}>{contato.email}</a>
          </div>

          <div className="ct-card">
            <h3>Horário de atendimento</h3>
            {contato.horario.map(([dia, hora]) => (
              <div className="hora" key={dia}>
                <span>{dia}</span>
                <span>{hora}</span>
              </div>
            ))}
          </div>

          <div className="ct-card">
            <h3>Redes sociais</h3>
            <a href={contato.instagram} target="_blank" rel="noopener noreferrer">
              Instagram {contato.instagram_label}
            </a>
            <a href={contato.youtube} target="_blank" rel="noopener noreferrer">
              YouTube {contato.youtube_label}
            </a>
          </div>
        </div>

        <div className="ct-cta">
          <a className="btn btn-navy" href={waLink()} target="_blank" rel="noopener noreferrer">
            Falar no WhatsApp <span className="arw">→</span>
          </a>
        </div>
      </div>
    </main>
  );
}
