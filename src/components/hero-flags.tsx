/**
 * Banderas de EE. UU. y Reino Unido detrás del hero: inclinadas en 3D hacia el centro,
 * con pliegues de tela que se mueven despacio y un velo de hielo encima para no competir con el texto.
 */

const US_RED = "#B22234";
const US_BLUE = "#3C3B6E";

// Proporciones oficiales de la bandera de EE. UU. sobre una altura de 1 (hoist).
const US_HEIGHT = 1;
const US_WIDTH = 1.9;
const CANTON_W = 0.76;
const CANTON_H = 7 / 13;
const STAR_R = 0.0616 / 2;

function starPath(cx: number, cy: number, r: number): string {
  const inner = r * 0.382;
  const points = Array.from({ length: 10 }, (_, i) => {
    const radius = i % 2 === 0 ? r : inner;
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    return `${(cx + radius * Math.cos(angle)).toFixed(4)},${(cy + radius * Math.sin(angle)).toFixed(4)}`;
  });
  return `M${points.join("L")}Z`;
}

// 9 filas alternas de 6 y 5 estrellas: 50 en total.
const STARS = Array.from({ length: 9 }, (_, row) =>
  Array.from({ length: row % 2 === 0 ? 6 : 5 }, (_, i) => {
    const column = row % 2 === 0 ? i * 2 : i * 2 + 1;
    return starPath(0.063 + column * 0.063, 0.054 + row * 0.054, STAR_R);
  }),
).flat();

function UsFlag() {
  return (
    <svg viewBox={`0 0 ${US_WIDTH} ${US_HEIGHT}`} className="block h-full w-full" preserveAspectRatio="none">
      <rect width={US_WIDTH} height={US_HEIGHT} fill="#fff" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} y={(i * 2 * US_HEIGHT) / 13} width={US_WIDTH} height={US_HEIGHT / 13} fill={US_RED} />
      ))}
      <rect width={CANTON_W} height={CANTON_H} fill={US_BLUE} />
      <path d={STARS.join("")} fill="#fff" />
    </svg>
  );
}

function UkFlag() {
  return (
    <svg viewBox="0 0 60 30" className="block h-full w-full" preserveAspectRatio="none">
      <defs>
        <clipPath id="uk-flag-clip">
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        {/* Las franjas rojas diagonales van desplazadas: este recorte deja solo la mitad que toca a cada una. */}
        <clipPath id="uk-flag-diagonals">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
      </defs>
      <g clipPath="url(#uk-flag-clip)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-flag-diagonals)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

function Fabric({ children, ratio }: { children: React.ReactNode; ratio: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-[18px] shadow-[0_40px_80px_-30px_var(--drop-lift)]"
      style={{ aspectRatio: ratio }}
    >
      {children}
      {/* Pliegues de tela: luces y sombras en diagonal que se desplazan lentamente. */}
      <div
        className="animate-flag-sheen absolute inset-y-0 -left-[10%] w-[130%] mix-blend-soft-light"
        style={{
          background:
            "repeating-linear-gradient(100deg, rgb(255 255 255 / 0) 0%, rgb(255 255 255 / 0.55) 7%, rgb(0 0 0 / 0.35) 15%, rgb(255 255 255 / 0) 22%)",
        }}
      />
    </div>
  );
}

export function HeroFlags() {
  return (
    <div
      aria-hidden
      // A sangre: ocupa todo el ancho de la ventana aunque el hero esté dentro de una columna centrada.
      className="pointer-events-none absolute -top-28 left-1/2 -z-10 h-[50rem] w-screen -translate-x-1/2 overflow-hidden sm:h-[46rem]"
      style={{
        maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
      }}
    >
      <div className="absolute inset-0" style={{ opacity: "var(--flag-opacity)" }}>
        <div className="absolute top-36 -left-[30vw] w-[110vw] sm:top-28 sm:-left-[8vw] sm:w-[64vw] lg:w-[60vw]">
          <div className="animate-flag-left" style={{ transformOrigin: "left center" }}>
            <Fabric ratio="1.9 / 1">
              <UsFlag />
            </Fabric>
          </div>
        </div>
        <div className="absolute top-[30rem] -right-[30vw] w-[110vw] sm:top-16 sm:-right-[8vw] sm:w-[62vw] lg:w-[58vw]">
          <div className="animate-flag-right" style={{ transformOrigin: "right center" }}>
            <Fabric ratio="2 / 1">
              <UkFlag />
            </Fabric>
          </div>
        </div>
      </div>
      {/* Velo de hielo: aclara las banderas donde va el titular, para que se lea bien. */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(48% 42% at 32% 46%, var(--flag-veil), transparent 85%)" }}
      />
    </div>
  );
}
