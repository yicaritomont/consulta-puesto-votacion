"use client";
import { useState } from "react";
import {
  Search,
  MapPin,
  Building2,
  ClipboardList,
  Map,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Info,
  ExternalLink,
} from "lucide-react";
import { campaign } from "@/config/campaign";
import type { LookupResponse, VotingPlace } from "@/types/voting";
type State = "form" | "loading" | "success" | "notfound" | "error";
export default function VotingApp() {
  const [document, setDocument] = useState("");
  const [state, setState] = useState<State>("form");
  const [data, setData] = useState<VotingPlace | null>(null);
  const [message, setMessage] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const clean = document.replace(/\D/g, "");
    if (!/^\d{6,12}$/.test(clean)) {
      setMessage("Ingresa un número de cédula válido.");
      return;
    }
    setMessage("");
    setState("loading");
    try {
      const r = await fetch("/api/consultar-puesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document: clean }),
      });
      const j: LookupResponse = await r.json();
      if (j.ok) {
        setData(j.data);
        setState("success");
      } else {
        setMessage(j.message);
        setState(j.code === "NOT_FOUND" ? "notfound" : "error");
      }
    } catch {
      setMessage("No pudimos realizar la consulta.");
      setState("error");
    }
  }
  const reset = () => {
    setState("form");
    setData(null);
    setMessage("");
  };
  return (
    <main
      className="page"
      style={
        {
          "--primary": campaign.branding.primaryColor,
          "--secondary": campaign.branding.secondaryColor,
          "--accent": campaign.branding.accentColor,
        } as React.CSSProperties
      }
    >
      <section className="shell">
        <BrandPanel />
        <div className="content">
          {state === "form" && (
            <form className="card form" onSubmit={submit}>
              <label>Número de cédula</label>
              <div className="inputWrap">
                <ClipboardList />
                <input
                  inputMode="numeric"
                  autoComplete="off"
                  value={document}
                  onChange={(e) =>
                    setDocument(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Ejemplo: 1234567890"
                  aria-label="Número de cédula"
                />
              </div>
              {message && <p className="validation">{message}</p>}
              <button>
                <Search />
                Consultar
              </button>
              <p className="privacy">
                La cédula se usa únicamente para realizar la consulta y no se
                almacena en este prototipo.
              </p>
            </form>
          )}
          {state === "loading" && (
            <div className="status">
              <div className="spinner" />
              <h2>Estamos buscando tu información</h2>
              <p>
                Consultando la información electoral…
                <br />
                Esto puede tardar unos segundos.
              </p>
              <div className="notice">
                <Info />
                Por favor, no cierres esta página y espera el resultado.
              </div>
            </div>
          )}
          {state === "success" && data && (
            <Result data={data} onReset={reset} />
          )}
          {state === "notfound" && (
            <Status
              icon="search"
              title="No encontramos información"
              text={
                message ||
                "No se encontró un puesto de votación asociado al número ingresado."
              }
              button="Volver a intentar"
              onReset={reset}
            />
          )}
          {state === "error" && (
            <Status
              icon="alert"
              title="Servicio temporalmente no disponible"
              text={
                message ||
                "No pudimos realizar la consulta en este momento. Intenta nuevamente en unos minutos."
              }
              button="Reintentar"
              onReset={reset}
            />
          )}
        </div>
      </section>
    </main>
  );
}
function BrandPanel() {
  return (
    <aside className="brand">
      <div className="brandTitle">
        <img src={campaign.branding.logo} alt="" />
        <div>
          <h1>{campaign.branding.title}</h1>
          <p>{campaign.branding.subtitle}</p>
        </div>
      </div>
      <div className="slogan">
        <img
        src={campaign.branding.sloganImage}
        alt={campaign.branding.slogan}
      />
      </div>
      <div className="city" aria-hidden="true" />
    </aside>
  );
}
function Result({ data, onReset }: { data: VotingPlace; onReset: () => void }) {
  const rows = [
    [Map, "Departamento", data.department],
    [MapPin, "Municipio", data.municipality],
    [Building2, "Puesto de votación", data.place],
    [ClipboardList, "Mesa de votación", data.table],
    [MapPin, "Dirección", data.address],
  ] as const;
  return (
    <div className="result">
      <div className="success">
        <CheckCircle2 />
        <div>
          <b>¡Encontramos tu información!</b>
          <p>
            Aquí está el lugar de votación y la mesa asignada para tu cédula.
          </p>
        </div>
      </div>
      <h3>Datos de tu lugar de votación</h3>
      <div>
        <div className="dataCard">
          {rows.map(([Icon, l, v]) => (
            <div className="row" key={l}>
              <Icon />
              <div>
                <small>{l}</small>
                <strong>{v || "No informado"}</strong>
              </div>
            </div>
          ))}
          {data.mapsUrl && (
            <a
              className="maps"
              href={data.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink />
              Cómo llegar
            </a>
          )}
        </div>
      </div>
        <Candidate />
      <div className="notice">
        <Info />
        Recuerda llevar tu cédula de ciudadanía y llegar con anticipación.
      </div>
      <button className="secondary" onClick={onReset}>
        <RotateCcw />
        Nueva consulta
      </button>
    </div>
  );
}
function Candidate() {
  return (
    <div className="candidate">
      <img
        src={campaign.candidate.photo}
        alt={`Foto de ${campaign.candidate.name}`}
      />
      <div>
        <h3>{campaign.candidate.name}</h3>
        <p>{campaign.candidate.position}</p>
        <b className="number">{campaign.candidate.number}</b>
        <div className="miniSlogan"> 
            <img src={campaign.branding.sloganImage} alt={campaign.branding.slogan}/>
        </div>
      </div>
    </div>
  );
}
function Status({
  title,
  text,
  button,
  onReset,
  icon,
}: {
  title: string;
  text: string;
  button: string;
  onReset: () => void;
  icon: "search" | "alert";
}) {
  return (
    <div className="status">
      <div className={`statusIcon ${icon}`}>
        <AlertCircle />
      </div>
      <h2>{title}</h2>
      <p>{text}</p>
      <button onClick={onReset}>
        <RotateCcw />
        {button}
      </button>
    </div>
  );
}
