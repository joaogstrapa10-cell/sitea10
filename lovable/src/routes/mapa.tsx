import { createFileRoute } from "@tanstack/react-router";
import { empreendimentos } from "@/data/empreendimentos";
import { FullMapClient } from "@/components/MapClient";

const TITLE = "Mapa · A10 Empreendimentos";
const DESC = "Veja no mapa os empreendimentos da A10 em Balneário Camboriú, Itapema e Porto Belo.";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/mapa" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/mapa" }],
  }),
  component: Mapa,
});

function Mapa() {
  // Só entra no mapa quem tem coordenada. O enquadramento em si é feito pelo
  // FullMap, que ignora o que estiver fora do litoral catarinense.
  const comCoord = empreendimentos.filter((e) => e.lat != null && e.lng != null);

  return (
    <main>
      <div className="nav-spacer" />
      <div className="sec-head wrap">
        <div className="kicker">Localização</div>
        <h2 className="sec-title ink mt">Explore no mapa</h2>
        <p>
          {comCoord.length} empreendimentos no mapa. Toque em um pino para abrir a página dele.
        </p>
      </div>
      <div className="wrap mapwrap">
        <FullMapClient data={comCoord} className="map-box map-full" />
      </div>
    </main>
  );
}
